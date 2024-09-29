import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './en.json';
import translationZH from './zh.json';

// 语言资源
const resources = {
    en: {
        translation: translationEN,
    },
    zh: {
        translation: translationZH,
    },
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: 'zh', // 中文作为默认语言，且不带前缀
        detection: {
            order: ['path', 'cookie', 'htmlTag'],
            lookupFromPathIndex: 0, // 从路径中检测语言
            // 自定义检测规则，确保只有 /en 前缀被检测为英文
            lookupPath: (path) => {
                const segments = path.split('/');
                const potentialLang = segments[1] || '';  // 处理根路径
                console.log('Detected path:', path, 'Language detected:', potentialLang);
                return potentialLang === 'en' ? 'en' : 'zh'; // 中文默认不带前缀
            }


        },
        whitelist: ['en', 'zh'], // 支持的语言
        interpolation: {
            escapeValue: false, // react已经安全转义
        },
    });

export default i18n;
