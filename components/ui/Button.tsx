
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'secondary', children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  
  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${props.className || ''}`}
    >
      {children}
    </button>
  );
};
