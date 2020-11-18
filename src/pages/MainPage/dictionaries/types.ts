export interface IDictionaryItem {
  word: string;
  translate: string;
}

interface IDictionary {
  name: string;
  items: IDictionaryItem[];
}

export default IDictionary;
