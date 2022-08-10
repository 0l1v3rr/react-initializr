import Languages from "../components/Languages";
import PackageInformation from "../components/PackageInformation";
import Template from "../components/Template";
import Title from "../components/Title";

const ProjectInfo = () => {
  return (
    <div className="md:border-r-2 md:border-b-0 border-r-0 border-b-2 border-solid border-zinc-700 
      flex flex-col md:w-[50%] w-full md:px-10 px-5 py-5 min-h-full">
      <Title text="Project Configuration" />

      <div className="flex justify-between">
        <Languages />
        <Template />
      </div>

      <PackageInformation />
    </div>
  );
};

export default ProjectInfo;