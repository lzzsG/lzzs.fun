// src/layouts/MainLayout.js
import React from 'react';
import Header from '../components/Headers/Header';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
    </div>
);

export default MainLayout;
