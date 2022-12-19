import Countdown from "./components/Countdown";
import Folder from "./components/Folder";
import { useExplorer } from "./Providers/ExplorerProvider";

const App = () => {
  const { explorer } = useExplorer();

  // return <Countdown />;
  return (
    <div className="space-y-1 select-none max-w-[350px] mx-auto my-10 border border-gray-100">
      <Folder explorer={explorer} />
    </div>
  );
};

export default App;
