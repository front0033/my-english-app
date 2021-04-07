import one from './dictionary0';
import two from './dictionary1';
import three from './dictionary2';
import four from './dictionary3';
import five from './dictionary4';
import preposition from './prepositions';
import irregular from './irregularVerbs';
import irregular1 from './irregularVerbs1';
import eith from './lightEnglish';
import nine from './airport';
import ten from './transport';
import eleven from './bbc_b1';
import twelve from './bbc_b2';
import modal from './modal';
import code from './code';
import passive from './passiveVoice';
import bbc1 from './bbc2021_1';
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
import crime from './crime';
import catchenglish from './catchenglish';
import phrasalVerbs from './phrasalVerbs';
import AE2 from './ActiveEnglish2';
import VERBS from './verbs';
import weather from './weather';
import IDictionary, {IDictionaryItem} from './types';

export const dictionary: Record<string, IDictionary> = {
  weather,
  VERBS,
  AE2,
  catchenglish,
  phrasalVerbs,
  preposition,
  dailyesl,
  bank,
  newTranslates,
  crime,
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
  modal,
  code,
  passive,
};

export type {IDictionaryItem};
export default dictionary;
