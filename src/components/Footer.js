// src/components/Footer.js
import React from 'react';
import { ReactComponent as GithubIcon } from '../assets/svg/github.svg';

const Footer = () => (
    <footer className="flex space-x-2 px-4 h-24 md:h-12 pb-12 sm:pb-0  justify-center items-center bg-base-200" >
        <p className="">© 2024 LzzsSite</p>
        <a className="tooltip " data-tip="GitHub: LzzsG" href="https://github.com/lzzsG" target="_blank" rel="noopener noreferrer"><GithubIcon className="size-6" /></a>
    </footer >
);

export default Footer;
