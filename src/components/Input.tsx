import { Dispatch, FC, SetStateAction, useId } from "react"
import { MdOutlineClear } from "react-icons/md"
import HoverContainer from "./HoverContainer"

interface InputProps {
  label: string
  placeholder: string
  value: string
  setValue: Dispatch<SetStateAction<any>>
  type: "text" | "password" | "number" | "url"
  required: boolean
}

const Input: FC<InputProps> = (props) => {
  const id = `${props.label}-${useId()}`

  return (
    <div className="flex gap-2 items-center text-base relative my-2 w-full">
      <label
        htmlFor={id}
        className="whitespace-nowrap absolute bg-zinc-900 px-2 -top-4 left-2 color-react"
      >
        {props.label}
      </label>

      <input
        type={props.type}
        placeholder={props.placeholder}
        id={id}
        value={props.value}
        required={props.required}
        className="w-full outline-none border-2 border-zinc-800 bg-zinc-900
          rounded-md pl-2 pr-7 py-1 border-react-active transition-all text-zinc-300
          placeholder:text-zinc-600 shadow-md active:shadow-none focus:shadow-none peer"
        onChange={(e) => props.setValue(e.target.value)}
        autoComplete="off"
      />

      <button
        className="absolute top-1/2 -translate-y-1/2 cursor-pointer right-2
        color-react peer-focus:scale-100 peer-active:scale-100 scale-0
        transition-all duration-150"
        onMouseDown={() => props.setValue("")}
        type="button"
      >
        <HoverContainer hoverText="Clear">
          <MdOutlineClear />
        </HoverContainer>
      </button>
    </div>
  )
}

export default Input
