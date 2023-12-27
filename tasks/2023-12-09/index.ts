export interface Tool {
  init: () => void;
  update: () => void;
  dispose: () => void;
}

export class Equipment {
  #tools: Tool[] = [];
  #initializedTools: Set<Tool> = new Set();

  registerTools(tool: Tool) {
    this.#tools = [...this.#tools, tool];
  }

  initializeTools() {
    this.#tools.forEach(tool => {
      this.#initializedTools.add(tool);
      tool.init()
    });
  }

  updateTools() {
    this.#tools.some(tool => {
      if (!this.#initializedTools.has(tool)) {
        throw new Error('Cannot update any tools before initialization.')
      }
    });
    
    this.#tools.forEach(tool => tool.update());
  }

  disposeTools() {
    this.#tools.forEach(tool => tool.dispose());
  }
}
