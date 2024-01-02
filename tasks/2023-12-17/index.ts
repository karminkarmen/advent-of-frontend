export const GSL_DEMO_SNIPPET = `
Gift(ribbon: "gold curly", label: "Merry Christmas!") {
    Wearable(type: "socks", size: "small", color: "red").if(winterSeason: true) {
      pattern: "snowflakes"
    }

    Wearable(type: "scarf", size: "medium", color: "green") {
      pattern: "snowflakes"
    }

    Literary(type: "book", size: "15cm 22cm 2cm", title: "Christmas Stories", author: "C. Claus")
}
`;

interface Item {
  type: string;
}

export interface Wearable extends Item {
  size: string;
  color: string;
  pattern?: string;
}

export interface Literary extends Item {
  size: string;
  title: string;
  author: string;
}

export type Gift = {
  ribbon: string;
  label: string;
  items: Array<Literary|Wearable>
}


const isValidGift = (obj: any): obj is Gift => {
  return 'ribbon' in obj && 'label' in obj;
}

const isValidLiteraryItem = (obj: any): obj is Literary => {
  return 'type' in obj && 'size' in obj && 'title' in obj && 'author' in obj;
}


const isValidWearableItem = (obj: any): obj is Wearable => {
  return 'type' in obj && 'size' in obj && 'color' in obj;
}


const parseObjDefinition = (objDefinition: string): {} => {
  const properties = objDefinition.split(',').map((propertyWithValue) => propertyWithValue.split(':').map(value => value.trim()));

  return properties.reduce((acc, property) => {
    const [key, value] = property;
    acc = {
      ...acc,
      [key]: value,
    };

    return acc;
  }, {});
}


const parseItems = (script: string): Array<Literary|Wearable> => {
  const itemRegex = /(Wearable|Literary)\((.*?)\)/g;

  const parsedItems = [...script.matchAll(itemRegex)].map((itemDefinition) => parseObjDefinition(itemDefinition[2]));

  if(!parsedItems.every(item => isValidWearableItem(item) || isValidLiteraryItem(item))) {
    throw new Error('Some of the items are not valid')
  }

  return parsedItems as Array<Literary|Wearable>;
}

const parseGift = (script: string): Gift => {
  const giftRegex = /Gift\((.*?)\)/g;

  const giftPropertiesMatch = giftRegex.exec(script);
  const items = parseItems(script);

  if (!giftPropertiesMatch) {
    throw new Error('Gift should be defined');
  } else {
    const gift = parseObjDefinition(giftPropertiesMatch[1]);

    if (!isValidGift(gift)) {
      throw new Error('Gift definition is not valid');
    };

    return {...gift, items};
  }
  
}

export const parseGSL = (gslScript: string): Gift => {
  const cleanedScript = gslScript.trim().replace(/(\r\n|\n|\r|")/gm, "");
  return parseGift(cleanedScript);  
}