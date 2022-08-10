import { Dispatch, FC, SetStateAction, useId } from "react";

interface InputProps {
  label: string,
  placeholder: string,
  value: string,
  setValue: Dispatch<SetStateAction<any>>,
  type: "text" | "password" | "number" | "url",
  required: boolean,
}

const Input:FC<InputProps> = (props) => {
  const id = `${props.label}-${useId()}`;
  
  return (
    <div className="flex gap-2 items-center text-base relative my-2">
      <label htmlFor={id} className="whitespace-nowrap absolute bg-zinc-900 px-2 -top-4 left-2 color-react">
        {props.label}
      </label>

      <input 
        type={props.type} 
        placeholder={props.placeholder} 
        id={id} 
        value={props.value} 
        required={props.required} 
        className="w-full outline-none border-2 border-zinc-800 bg-zinc-900 
          rounded-md px-2 py-1 border-react-active transition-all text-zinc-300 
          placeholder:text-zinc-600 shadow-md active:shadow-none focus:shadow-none"
        onChange={(e) => props.setValue(e.target.value)}
      />
    </div>
  );
}

export default Input;