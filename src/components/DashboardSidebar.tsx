import { sidebarItems } from "../utils/const";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";

import { useSelector } from "../redux/store";
import { RxCross1 } from "react-icons/rx";
import { ToggleSidebar } from "../redux/actions/app";
import { useDispatch } from "react-redux";
const DashboardSidebar = () => {
  const { sideBarVisibility } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <>
      <Sidebar
        className="lg:hidden"
        visible={sideBarVisibility}
        modal={false}
        onHide={() => {
          dispatch(ToggleSidebar() as any);
        }}
        content={({ hide }) => (
          <div className="relative flex flex-col min-h-screen surface-ground">
            <button className="flex justify-end w-full pt-4 pr-6 hover:text-carrot-100 lg:hidden">
              <RxCross1 size={22} onClick={hide} />
            </button>
            <div
              id="app-sidebar-2"
              className="flex flex-col items-center h-screen gap-4 p-4 mt-10 bg-white w-72"
              style={{ width: "280px" }}
            >
              <p className="mb-6 ">Sidebar</p>

              {sidebarItems.map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  className={`${
                    pathName === item.link
                      ? "bg-carrot text-white font-semibold shadow-sm"
                      : " text-gray-500 hover:bg-carrot/20 hover:text-black"
                  } flex items-center gap-2    w-full text-left py-1.5 px-6 rounded-lg   text-sm`}
                >
                  {item.icon}
                  <p>{item.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      ></Sidebar>

      <div className="fixed top-0 left-0 z-50 flex-col items-center hidden h-screen gap-4 p-4 mt-10 bg-white w-72 lg:flex">
        <p className="mb-6">Sidebar</p>

        {sidebarItems.map((item) => (
          <Link
            key={item.link}
            to={item.link}
            className={`${
              pathName === item.link
                ? "bg-carrot text-white font-semibold shadow-sm"
                : " text-gray-500 hover:bg-carrot/20 hover:text-black"
            } flex items-center gap-2    w-full text-left py-1.5 px-6 rounded-lg   text-sm`}
          >
            {item.icon}
            <p>{item.title}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default DashboardSidebar;
