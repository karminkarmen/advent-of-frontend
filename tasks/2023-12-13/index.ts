const decodeBase64 = (encodedValue: string) => atob(encodedValue);

const decodeUri = (encodedValue: string) => decodeURIComponent(encodedValue);

const decodeCesarsCipher = (encodedValue: string, shift: number) => {
  const ASCII_LETTERS_COUNT = 26;
  const ASCII_LETTER_LOWERCASE_START = 97;
  const ASCII_LETTER_LOWERCASE_END = 122;

  return [...encodedValue].map((char) => {
    const code = char.charCodeAt(0);

    if (code >= ASCII_LETTER_LOWERCASE_START && code <= ASCII_LETTER_LOWERCASE_END) {
      const shiftToDecrypt = (ASCII_LETTERS_COUNT - shift) % ASCII_LETTERS_COUNT;
      const shiftToDecryptInRange = shiftToDecrypt > 0 
        ? shiftToDecrypt 
        : ASCII_LETTERS_COUNT + (shift % ASCII_LETTERS_COUNT);
      const decodedChar = String.fromCharCode(((code - ASCII_LETTER_LOWERCASE_START + shiftToDecryptInRange) % ASCII_LETTERS_COUNT) + ASCII_LETTER_LOWERCASE_START);

      return decodedChar;
    }

    return '';
  }).join('');
}

const decodeValue = (value: string, method?: string): string => {
  switch(method) {
    case 'b64':
      return decodeBase64(value);
    case 'uri':
      return decodeUri(value);
    case 'c13':
      return decodeCesarsCipher(value, 13);
    default:
      return ''; 
  }
}

export const decodeMessage = (template: string, values: Record<string, string>): string => {
  const keyRegex = /{{ ([a-z]+) }}/g;
  const templateKeys = Array.from(template.matchAll(keyRegex), (match) => match[1]);
  const decodedValues: Record<string, string> = {};

  Object.keys(values).reduce((acc, valueKey) => {
    const valueMethodSeparator = ':';
    const [encodingMethod, encodedValue] = values[valueKey].split(valueMethodSeparator, 2);

    acc[valueKey] = decodeValue(encodedValue, encodingMethod);

    return acc;
  }, decodedValues);

  return templateKeys.reduce((acc, key) => acc.replaceAll(`{{ ${key} }}`, decodedValues[key] || ''), template);
}
