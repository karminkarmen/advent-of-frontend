type MachineOrder = string;
type MachineState = MachineOrder | null;
type MachineOrderHistory = MachineOrder[];

export class OrderController {
  #machines = new Set<Machine>();

  public registerMachine(machine: Machine) {
    this.#machines.add(machine);
  }

  public unregisterMachine(machine: Machine) {
    this.#machines.delete(machine);
  }
  
  public setState(newOrder: MachineOrder) {
    if (this.#machines.size === 0) {
      throw new Error('Invalid state provided');
    }

    this.#machines.forEach(machine => machine.state = newOrder);
  }
}

export class Machine {
  #state: MachineState = null;
  #stateHistory: MachineOrderHistory = [];

  get state(): MachineState {
    return this.#state;
  }

  set state(stateChange: MachineOrder) {
    this.#state = stateChange;
    this.#stateHistory = [...this.#stateHistory, stateChange];
  }

  public performAudit(): string[] {
    return this.#stateHistory.map((state, key) => `Order #${key + 1} - ${state}`)
  }
}