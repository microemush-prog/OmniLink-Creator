
import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select: React.FC<SelectProps> = (props) => {
  return (
    <select
      {...props}
      className={`
        w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
        rounded-md shadow-sm text-sm text-gray-900 dark:text-gray-100 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        transition duration-150 ease-in-out
        ${props.className || ''}
      `}
    />
  );
};
