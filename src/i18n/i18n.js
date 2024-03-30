import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './en.json';
import translationZH from './zh.json';

// 语言资源
const resources = {
    en: {
        translation: translationEN
    },
    zh: {
        translation: translationZH
    }
};

i18n
    .use(initReactI18next) // 通过react-i18next传递i18n实例
    .init({
        resources,
        lng: 'zh', // 默认语言
        keySeparator: false, // 不使用keys中的点符号
        interpolation: {
            escapeValue: false, // react已经安全地转义了
        },
    });

export default i18n;
