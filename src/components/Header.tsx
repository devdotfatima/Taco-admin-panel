import { BiBell } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { Menu } from "primereact/menu";
import { useRef } from "react";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";

import { HiMenuAlt2 } from "react-icons/hi";
import { ToggleSidebar, logoutUser } from "../redux/actions/app";
import { useDispatch } from "../redux/store";

type Props = {
  pageTitle: string;
};

const Header = ({ pageTitle }: Props) => {
  const menuLeft = useRef<Menu>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items: MenuItem[] = [
    {
      items: [
        {
          label: "Profile",
          command: () => {
            navigate("/profile");
          },
        },
        {
          label: "Logout",
          command: () => {
            dispatch(logoutUser()); // Dispatch the logoutUser action
          },
        },
      ],
    },
  ];

  return (
    <>
      <div className="block lg:hidden">
        <button
          className="mb-10 text-gray-200 hover:text-white"
          onClick={() => dispatch(ToggleSidebar())}
        >
          <HiMenuAlt2 size={30} />
        </button>
      </div>
      <div className="flex items-center justify-between mb-16 text-white">
        <h2 className="text-lg font-bold uppercase md:text-2xl">{pageTitle}</h2>
        <div className="flex items-center gap-3">
          <button className="">
            <BiBell size={32} />
          </button>
          <button
            onClick={(event) => {
              menuLeft.current && menuLeft.current.toggle(event);
            }}
            className="flex items-center gap-3 "
          >
            <RxAvatar size={32} />
            <p className="hidden text-sm md:block ">Jane Doe</p>
          </button>
          <Menu
            model={items}
            pt={{
              menuitem: {
                className: "hover:bg-carrot hover:text-white  mx-2 ",
              },
              action: {
                className: " p-0 rounded-md ",
              },

              submenuHeader: {
                className: "hidden",
              },
              label: {
                className:
                  "hover:bg-carrot hover:text-white  py-3 px-5  w-full h-full ",
              },
            }}
            popup
            className="mt-4 bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20"
            ref={menuLeft}
            id="popup_menu_left"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
