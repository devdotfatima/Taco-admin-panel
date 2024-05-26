import { Outlet } from "react-router-dom";
import "./App.css";
import DashboardSidebar from "./components/DashboardSidebar";

function App() {
  return (
    <div className="relative flex w-full">
      <DashboardSidebar />
      <div className="relative flex flex-col w-full h-screen gap-6 px-8 py-3 overflow-y-auto bg-gray-100 lg:ml-80 lg:py-10">
        <div className="absolute top-0 left-0 w-full bg-gradient-to-l from-carrot to-carrot-100 rounded-b-xl h-96"></div>
        <div className="z-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
