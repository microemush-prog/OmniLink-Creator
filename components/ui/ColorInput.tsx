import React from 'react';

interface ColorInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const ColorInput: React.FC<ColorInputProps> = ({ value, onChange, className }) => {
  return (
    <div className={`relative flex items-center h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm overflow-hidden ${className}`}>
      <input
        type="color"
        value={value}
        onChange={onChange}
        className="absolute inset-0 w-10 h-full opacity-100 cursor-pointer p-0 border-none"
        style={{backgroundColor: value}}
        aria-label="Color picker"
      />
      <div className="w-10 h-10 border-r border-gray-300 dark:border-gray-600" style={{ backgroundColor: value }} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full h-full px-3 text-sm bg-transparent focus:outline-none text-gray-900 dark:text-gray-100"
        aria-label="Color hex value"
      />
    </div>
  );
};