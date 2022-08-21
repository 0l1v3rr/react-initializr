import { FC, ReactElement } from "react"

interface HoverContainerProps {
  children: ReactElement
  hoverText: string
}

const HoverContainer: FC<HoverContainerProps> = ({ children, hoverText }) => {
  return (
    <div className="relative flex show-child-on-hover">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-10 
        bg-zinc-900 px-4 py-1 z-[5] border-2 border-solid border-zinc-800 shadow-lg 
        rounded-md before:content-[''] before:w-3 before:h-3 before:bg-zinc-900 
        before:absolute before:top-full before:left-1/2 before:-translate-x-1/2
        before:rotate-45 before:translate-y-[-40%] before:border-solid before:border-r-2 
        before:border-zinc-800 before:border-b-2 before:shadow-none text-sm text-zinc-400
        select-none pointer-events-none flex-nowrap w-fit text-center transition-all
        duration-300 opacity-0"
      >
        {hoverText}
      </div>

      {children}
    </div>
  )
}

export default HoverContainer
