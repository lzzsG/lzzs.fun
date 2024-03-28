import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ThemeSwitcher = () => {
    const { t } = useTranslation();
    const [theme, setTheme] = useState('default'); // 默认主题为 light

    const themes = [
        "business",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",];

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <div className="flex flex-col p-0   ">
            <input className="btn btn-xs  bg-base-200" name="radio-1" type="radio" checked={theme === 'default'} aria-label={t('defaultTheme')} onClick={() => changeTheme('default')} />
            <input className="btn btn-xs bg-base-200" name="radio-1" type="radio" checked={theme === 'light'} aria-label={t('lightTheme')} onClick={() => changeTheme('light')} />
            <input className="btn btn-xs bg-base-200" name="radio-1" type="radio" checked={theme === 'dark'} aria-label={t('darkTheme')} onClick={() => changeTheme('dark')} />
            <div className="dropdown -mt-0.5">
                <input tabIndex={0} role="button" className="btn btn-xs w-24 bg-base-200" name="radio-1" type="radio" checked={theme === 'black'} aria-label={t('blackTheme')} onClick={() => changeTheme('black')} />
                <div tabIndex={0} className="dropdown-content">
                    <div className="flex flex-col -0p w-24 ">
                        {themes.map((themeName) => (
                            <input
                                key={themeName}
                                className="btn btn-xs bg-base-200"
                                name="radio-1"
                                type="radio"
                                checked={theme === themeName}
                                aria-label={themeName}
                                onClick={() => changeTheme(themeName)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeSwitcher;