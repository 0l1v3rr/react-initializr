import { FC, useId } from "react";
import { RecoilState, useRecoilState } from "recoil";

interface RadioProps {
  value: string,
  checked: boolean,
  formName: string,
  state: RecoilState<any>
}

const RadioInput:FC<RadioProps> = (props) => {
  const [state, setState] = useRecoilState(props.state);
  const id = `${props.value}-${useId()}`;

  const handleChange = () => {
    setState(props.value);
  };

  return (
    <div className="flex items-center gap-1 radio relative">
      <input 
        type="radio" 
        id={id} 
        value={props.value} 
        name={props.formName} 
        defaultChecked={props.checked} 
        onChange={handleChange}
      />

      <label htmlFor={id}>{props.value}</label>
    </div>
  );
}

export default RadioInput;