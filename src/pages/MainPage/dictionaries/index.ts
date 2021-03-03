import one from './dictionary0';
import two from './dictionary1';
import three from './dictionary2';
import four from './dictionary3';
import five from './dictionary4';
import six from './dictionary5';
import irregular from './irregularVerbs';
import irregular1 from './irregularVerbs1';
import eith from './dictionary7';
import nine from './dictionary8';
import ten from './dictionary9';
import eleven from './dictionary10';
import twelve from './dictionary11';
import modal from './modal';
import code from './code';
import passive from './passiveVoice';
import bbc1 from './dictionary12';
import direction from './direction';
import bbc2 from './bbc2';
import bbc3 from './bbc3';
import bbc4 from './bbc4';
import le02 from './lightEnglish1';
import film from './film';
import le1002 from './lightEnglish2';
import lingoaleo from './lingoaleo';
import body from './body';
import activeEnglish1 from './ActiveEnglish1';
import different1 from './differendActiveEnglish';
import newTranslates from './newTransatedWords';
import dailyesl from './dailyesl';
import bank from './bank';

import IDictionary, {IDictionaryItem} from './types';

export const dictionary: Record<string, IDictionary> = {
  dailyesl,
  bank,
  newTranslates,
  irregular,
  irregular1,
  lingoaleo,
  le1002,
  activeEnglish1,
  different1,
  body,
  bbc1,
  bbc2,
  bbc3,
  bbc4,
  le02,
  direction,
  film,
  eleven,
  twelve,
  eith,
  nine,
  ten,
  one,
  two,
  three,
  four,
  five,
  six,
  modal,
  code,
  passive,
};

export type {IDictionaryItem};
export default dictionary;
