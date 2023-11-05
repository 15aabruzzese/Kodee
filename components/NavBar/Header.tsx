// Header.tsx

import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Sidebar from './Sidebar';

type HeaderState = 'home' | 'projects' | 'skills';

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HeaderState>('home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);


  const handleMenuToggle = () => setIsMenuOpen(prevState => !prevState);


  const handleTabClick = (tab: HeaderState) => {
    setActiveTab(tab);
  };

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            {/* Hamburger Icon */}
            <div className="flex items-center py-4 px-2">
              <button
                className="h-6 w-6 md"
                onClick={handleMenuToggle}
              >
                {/* Hamburger icon SVG */}
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16m-4 6h4"></path>
                </svg>
              </button>
              <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            </div>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <button onClick={() => handleTabClick('home')} className={`py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 ${activeTab === 'home' ? 'text-green-500 border-b-4 border-green-500' : ''}`}>
                Home
              </button>
              <button onClick={() => handleTabClick('skills')} className={`py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 ${activeTab === 'skills' ? 'text-green-500 border-b-4 border-green-500' : ''}`}>
                Skills
              </button>
              <button onClick={() => handleTabClick('projects')} className={`py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 ${activeTab === 'projects' ? 'text-green-500 border-b-4 border-green-500' : ''}`}>
                Projects
              </button>
            </div>
          </div>
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <button onClick={() => openInNewTab('https://github.com/15aabruzzese?tab=repositories')} className="rounded-lg text-gray-600 hover:text-blue-600 focus:outline-none">
              {/* GitHub SVG */}
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.15 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-1.04-.01-1.89-2.45.54-3.17-.61-3.38-1.18-.12-.32-.64-1.18-1.09-1.42-.37-.18-.9-.63-.01-.65.84-.01 1.44.78 1.64 1.1.96 1.6 2.5 1.15 3.11.88.1-.7.38-1.15.68-1.41-2.17-.25-4.45-1.09-4.45-4.85 0-1.07.38-1.95 1-2.63-.1-.25-.43-1.23.1-2.56 0 0 .82-.26 2.68 1.02a9.42 9.42 0 012.44-.33c.83.01 1.66.11 2.44.33 1.86-1.28 2.68-1.02 2.68-1.02.53 1.33.2 2.31.1 2.56.62.68 1 1.56 1 2.63 0 3.77-2.29 4.6-4.48 4.84.38.33.72.97.72 1.95 0 1.41-.01 2.55-.01 2.9 0 .27.18.58.69.48A11.96 11.96 0 0022 12c0-5.52-4.48-10-10-10z"/>
              </svg>
              <span className="sr-only">GitHub</span>
            </button>
            <button onClick={() => openInNewTab('https://www.linkedin.com')} className="rounded-lg text-gray-600 hover:text-blue-600 focus:outline-none">
              {/* LinkedIn SVG */}
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span className="sr-only">LinkedIn</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
