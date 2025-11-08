
import React from 'react';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = (props) => {
  return (
    <label
      {...props}
      className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${props.className || ''}`}
    >
      {props.children}
    </label>
  );
};
