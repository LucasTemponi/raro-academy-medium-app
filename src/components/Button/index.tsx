import React from "react";

export type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  primaryColor?:'red'|'blue'|'gray'
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  // disabled:boolean;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  // disabled,
  children,
  primaryColor='blue',
  onClick,
}) => {
  return (
      <button
        type={ type }
        className={
          {'blue':'w-full mt-6 tracking-widest border-b-blue-600 bg-blue-500 py-3 text-white font-bold hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400',
          'gray':'w-full mt-6 tracking-widest border-b-gray-600 bg-gray-500 py-3 text-white font-bold hover:bg-gray-400 active:translate-y-[0.125rem] active:border-b-gray-400',
          'red':'w-full mt-6 tracking-widest border-b-red-600 bg-red-500 py-3 text-white font-bold hover:bg-red-400 active:translate-y-[0.125rem] active:border-b-red-400'}        
          [primaryColor]} //Obrigado TailwindCSS por não me permitir concatenar strings em classes
        onClick={onClick}
      >
        { children }
      </button>
  );
};