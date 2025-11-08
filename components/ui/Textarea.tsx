
import React from 'react';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <textarea
      {...props}
      className={`
        w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
        rounded-md shadow-sm text-sm text-gray-900 dark:text-gray-100 
        placeholder-gray-400 dark:placeholder-gray-500 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        transition duration-150 ease-in-out
        resize-y
        ${props.className || ''}
      `}
    />
  );
};
