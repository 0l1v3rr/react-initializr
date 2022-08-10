import RadioInput from "./RadioInput";
import { templateState } from "../atoms";

const Template = () => {
	return (
		<div>
			<div className="font-semibold italic">Project template</div>
			<form className="flex flex-col mt-1">
				<RadioInput 
					checked={true} 
          formName="template" 
          value="create-react-app" 
          state={templateState}
        />
			</form>
		</div>
	);
}

export default Template;