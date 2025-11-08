import React from 'react';

type RangeInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const RangeInput: React.FC<RangeInputProps> = (props) => {
  return (
    <input
      type="range"
      {...props}
      className={`
        w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-indigo-500
        [&::-moz-range-thumb]:w-4
        [&::-moz-range-thumb]:h-4
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:bg-indigo-500
        ${props.className || ''}
      `}
    />
  );
};