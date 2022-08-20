import RadioInput from "./RadioInput";
import { pmState } from "../atoms";

const PackageManager = () => {
	return (
		<div>
			<div className="font-semibold italic">Package manager</div>
			<form className="flex flex-col mt-1">
				<RadioInput 
					checked={true} 
					formName="manager" 
					value="npm" 
					state={pmState}
				/>
			</form>
		</div>
	);
}

export default PackageManager;