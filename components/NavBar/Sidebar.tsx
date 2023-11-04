import React, { useState } from 'react';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  // Sidebar container style
  const sidebarStyle = {
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out'
  };

  return (
    <div style={sidebarStyle} className="fixed left-0 top-0 z-50 h-full bg-white shadow-lg w-64">
      <button onClick={onClose} className="p-4 text-black">
        {/* Close Icon */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      {/* Sidebar Links */}
      <nav>
        <a href="#home" onClick={onClose} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Home</a>
        <a href="#portfolio" onClick={onClose} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Portfolio</a>
        <a href="#career" onClick={onClose} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Career</a>
        <a href="#services" onClick={onClose} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Services</a>
        <a href="#contact" onClick={onClose} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Contact</a>
      </nav>
    </div>
  );
};

export default Sidebar;
