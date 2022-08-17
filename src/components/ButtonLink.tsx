import { FC } from "react";
import { IconType } from "react-icons/lib";

interface ButtonLinkProps {
  text: string,
  icon: IconType
  to: string
}

const ButtonLink:FC<ButtonLinkProps> = (props) => {
  return (
    <a href={props.to} rel="noreferrer" target="_blank" className="font-semibold px-4 
      py-2 border-2 border-solid border-zinc-800 rounded-md flex items-center justify-center 
      gap-2 leading-7 hover:border-zinc-700 color-react-hover hover:bg-white/[0.04] 
      transition-all hover:scale-[103%] hover:shadow-md text-[1em]">
      <props.icon />

      <span className="text-zinc-200">{props.text.toUpperCase()}</span>
    </a>
  );
};

export default ButtonLink;