type ComplexCalculation<ParamType, ReturnType> = (param: ParamType) => ReturnType;

export function memoize<ParamType, ReturnType>(complexCalculation: ComplexCalculation<ParamType, ReturnType>): ComplexCalculation<ParamType, ReturnType> {

  if (typeof complexCalculation !== 'function') {
    throw Error('Function to be memoized must be a function.');
  };

  const cache = new Map<ParamType, ReturnType>;

  return (param: ParamType): ReturnType => {
    const cachedValue = cache.get(param);
    
    if (cachedValue) {
      return cachedValue;
    }

    const complexCalculationResult = complexCalculation(param);
    cache.set(param, complexCalculationResult);

    return complexCalculationResult;
  }
}
