import "./App.css";
import { useState, useEffect } from "react";
import { Sidebar, Conversation } from "./components";
import { MenuIcon, PlusIcon } from "./constant";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function App() {
  const [theme, setTheme] = useState("light");
  const [show, setShow] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [newChat, setNewChat] = useState({});
  const uniqueToken = uuidv4();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const postData = async () => {
      try {
        // if either of prompt or id is not defined or empty return
        if (!newChat.prompt || !newChat.id) {
          return;
        }
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/generatestory`,
          { newChat }
        );
        console.log("response", response.data);

        setChatLog((prevChatLog) => [...prevChatLog]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    if (newChat.id) {
      postData();
    }
  }, [newChat]);

  useEffect(() => {
    console.log("Loading prop changed:", loading);
    // Your logic here
  }, [loading]);
  

  useEffect(() => {
    //fetch all chatlogs and update the state
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/getstory/all`
        );
        setLoading(false)
        setChatLog(response.data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (prompt) => {
    if (prompt === "") return;

    const newUserChatItem = {
      id: uniqueToken,
      prompt: prompt,
      bot: [],
      upvotes: { count: 0, users: [] },
    };
    setNewChat(newUserChatItem);
    setChatLog((prevChatLog) => [...prevChatLog, newUserChatItem]);
    try {
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
        <button
          type="button"
          className={`-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center outline-none justify-center rounded-md focus:ring-1 focus:ring-white ${
            !show && "!ring-0"
          } dark:hover:text-white text-gray-100`}
          onClick={() => setShow(!show)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon />
        </button>
        <h1 className="flex-1 text-center text-base font-normal">New chat</h1>
        <button type="button" className="px-3">
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      <Sidebar
        {...{ show }}
        setTheme={() => setTheme(theme === "light" ? "dark" : "light")}
        chatLog={chatLog}
        currentTheme={theme}
        currentChat={(id) =>
          setNewChat((prev) => (prev.id === id ? prev : { ...prev, id }))
        }
      />
      <Conversation
        handlePrompt={handleSubmit}
        id={newChat.id}
        loading={loading}
        // chatLog={chatLog}
        // upvote={handleUpvote}
      />
    </div>
  );
}

export default App;
