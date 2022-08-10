import Header from "./components/Header";
import Packages from "./containers/Packages";
import ProjectInfo from "./containers/ProjectInfo";

const App = () => {
  return (
    <div className="bg-zinc-800 min-h-screen w-screen text-zinc-100 select-none">
      <Header />

      <div className="flex flex-col md:flex-row text-lg min-h-full">
        <ProjectInfo />
        <Packages />
      </div>
    </div>
  );
}

export default App;
