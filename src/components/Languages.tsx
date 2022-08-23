import RadioInput from "./RadioInput";
import { languageState } from "../atoms";

const Languages = () => {
  // parsing the query parameters
  const params = new URLSearchParams(window.location.search);
  const language = params.get("language");

  return (
    <section>
      <div className="font-semibold italic">Language</div>
      <form className="flex flex-col mt-1">
        <RadioInput
          checked={language === null || language.toLowerCase() === "javascript"}
          state={languageState}
          formName="language"
          value="JavaScript"
        />

        <RadioInput
          checked={language?.toLowerCase() === "typescript"}
          formName="language"
          value="TypeScript"
          state={languageState}
        />
      </form>
    </section>
  );
};

export default Languages;
