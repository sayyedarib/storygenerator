import React from "react";
import { LogOutIcon, PlusIcon, SunIcon } from "../constant";

const Sidebar = ({
  show = false,
  setTheme,
  currentTheme,
  chatLog,
  currentChat,
}) => {
  console.log("chatLog sidebar", chatLog);
  return (
    <div
      className={`${show && " flex flex-col"} ${
        !show && "hidden"
      } dark:bg-black dark:text-white text-black first-letter: bg-white md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col`}
    >
      <div className="flex h-full min-h-0 flex-col ">
        <div className="scrollbar-trigger flex h-full w-full flex-1 items-start dark:border-white/20 border-black/20">
          <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
            <button
              onClick={() => currentChat("")}
              className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 dark:text-white  cursor-pointer text-sm mb-2 flex-shrink-0 border dark:border-white/20"
            >
              <PlusIcon />
              New chat
            </button>
            <div className="flex-col flex-1 overflow-y-auto border-b dark:border-white/20 border-black/20">
              {chatLog.map((item) => (
                <div
                  key={item.id}
                  onClick={() => currentChat(item.id)}
                  className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 dark:text-white  cursor-pointer text-sm mb-2 flex-shrink-0 border dark:border-white/20"
                >
                  {item.prompt}
                </div>
              ))}
            </div>
            {[
              {
                icon: (
                  <SunIcon
                    className="h-4 w-4 dark:text-white text-black font-bold"
                    strokeWidth="2"
                  />
                ),
                text: currentTheme === "light" ? "Dark mode" : "Light mode",
              },
              { icon: <LogOutIcon />, text: "Log out" },
            ].map((item, index) => (
              <button
                onClick={setTheme}
                className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 dark:text-white text-black cursor-pointer text-sm"
                key={index}
              >
                {item.icon}
                {item.text}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
