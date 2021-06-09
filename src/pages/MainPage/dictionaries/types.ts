export interface IDictionaryItem {
  word: string;
  translate: string;
  example?: string;
}

interface IDictionary {
  name: string;
  items: IDictionaryItem[];
}

export type IDictionaries = Record<string, IDictionary>;

export default IDictionary;
