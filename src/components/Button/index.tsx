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
    <div className="w-full w-full md:w-1/3 px-3">
      <button
        type={ type }
        className={`
          w-full mt-6 tracking-widest    
          border-b-${primaryColor}-600 bg-${primaryColor}-500 py-3 text-white font-bold
          hover:bg-${primaryColor}-400 active:translate-y-[0.125rem] active:border-b-${primaryColor}-400
        `}
        onClick={onClick}
      >
        { children }
      </button>
    </div>
  );
};