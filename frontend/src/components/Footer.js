import React, { useEffect, useState } from "react";
import { PlaneIcon, UserIcon } from "../constant";

const Footer = ({ handlePrompt, example }) => {
  const [message, setMessage] = useState(example);

  useEffect(() => {
    setMessage(example);
  }, [example]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    handlePrompt(message);
    setMessage("");
  };

  return (
    <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0  dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-gray-800 md:!bg-transparent">
      <form className="mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
        <div className="relative flex h-full flex-1 md:flex-col">
          <div className="ml-1 mt-1.5 md:w-full md:m-auto md:flex md:mb-2 gap-2 justify-center">
            <div className="text-gray-100 p-1 md:hidden">
              <UserIcon />
            </div>
          </div>
          {/* Input */}
          <div className="flex flex-col w-full py-2 pl-3 flex-grow md:py-3 md:pl-4 relative border border-black/20 dark:bg-slate-500 bg-white dark:border-gray-900/50 dark:text-white rounded-md bg-[rgba(64,65,79,var(--tw-bg-opacity))]">
            <textarea
              tabIndex="0"
              data-id="root"
              rows="1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.keyCode === 13 && !e.shiftKey) {
                  handleSubmit();
                }
              }}
              className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none overflow-y-hidden h-[23px] bg-white dark:bg-slate-500"
            />
            <button
              onClick={handleSubmit}
              className="absolute p-1 rounded-md text-gray-400 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-black"
            >
              <PlaneIcon />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Footer;
