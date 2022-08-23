import RadioInput from "./RadioInput";
import { pmState } from "../atoms";

const PackageManager = () => {
  return (
    <section>
      <div className="font-semibold italic">Package manager</div>
      <form className="flex flex-col mt-1">
        <RadioInput
          checked={true}
          formName="manager"
          value="npm"
          state={pmState}
        />
      </form>
    </section>
  );
};

export default PackageManager;
