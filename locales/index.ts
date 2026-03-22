import en from './en';
import fi from './fi';
import de from './de';


export type Language = 'en' | 'fi' | 'de';
export type Translations = typeof en;

const translations: Record<Language, Translations> = { en, fi, de };

export default translations;