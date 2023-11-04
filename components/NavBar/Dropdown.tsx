import React, { useState } from 'react';

type DropdownProps = {
  toggleMenu: () => void; // Function to toggle the menu in the parent component
};

const Dropdown: React.FC<DropdownProps> = ({ toggleMenu }) => {
  // State to manage open/close of the dropdown within the component
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false); // Close the dropdown
    toggleMenu(); // Also invoke the parent component's toggle to sync state
  };

  // When the component mounts, set its open state to true
  useState(() => {
    setIsOpen(true);
  }, );

  // If the dropdown is not open, don't render the component
  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute bg-white shadow-md rounded-lg py-2 mt-6 z-50">
      {/* Dropdown items, when clicked, will close the dropdown */}
      <a href="#portfolio" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" onClick={handleClose}>Portfolio</a>
      <a href="#career" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" onClick={handleClose}>Career</a>
      {/* Additional placeholder links */}
      <a href="#services" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" onClick={handleClose}>Services</a>
      <a href="#contact" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" onClick={handleClose}>Contact</a>
    </div>
  );
};

export default Dropdown;
