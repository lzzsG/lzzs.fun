import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
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
    .use(LanguageDetector) // 使用语言检测插件
    .init({
        resources,
        fallbackLng: 'zh', // 默认语言/备选语言
        detection: {
            order: ['path', 'cookie', 'htmlTag'], // 定义语言检测的顺序
            lookupFromPathIndex: 0, // 从URL路径中获取语言设置
        },
        // keySeparator: false, // 不使用keys中的点符号
        interpolation: {
            escapeValue: false, // react已经安全地转义了
        },
    });

export default i18n;
