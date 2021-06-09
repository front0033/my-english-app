import {IDictionaryItem} from './dictionaries';
import {IDictionaries} from './dictionaries/types';

// вспомогательная функция
const putToCache = (elem: IDictionaryItem, cache: any) => {
  if (cache.indexOf(elem) !== -1) {
    return;
  }
  const i = Math.floor(Math.random() * (cache.length + 1));
  cache.splice(i, 0, elem);
};

// функция, возвращающая свеженький, девственный компаратор
const madness = () => {
  const cache: string | any[] = [];
  return (a: IDictionaryItem, b: IDictionaryItem) => {
    putToCache(a, cache);
    putToCache(b, cache);
    return cache.indexOf(b) - cache.indexOf(a);
  };
};

// собственно функция перемешивания
export const shuffle = (arr: IDictionaryItem[]) => {
  const compare = madness();
  return arr.sort(compare);
};

export const filterDictionaries = (data: IDictionaries): IDictionaries => {
  const result: IDictionaries = {};

  Object.keys(data).forEach(key => {
    const {name, items} = data[key];
    const filteredItems = items.filter(item => item.word !== 'empty');

    result[key] = {
      name,
      items: filteredItems,
    };
  });

  return result;
};
