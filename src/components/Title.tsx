import { FC } from "react"

interface TitleProps {
  text: string
}

const Title: FC<TitleProps> = ({ text }) => {
  return (
    <div
      className="font-semibold my-2 border-b-2 border-solid 
      border-zinc-800 w-full pb-3 text-xl"
    >
      {text}
    </div>
  )
}

export default Title
