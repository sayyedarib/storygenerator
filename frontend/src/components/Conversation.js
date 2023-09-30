import { CautionIcon, LightningChargeIcon, SunIcon, Upvote } from "../constant";
import Footer from "./Footer";
import { useState, useEffect } from "react";

import axios from "axios";

const Conversation = ({ handlePrompt, id, loading }) => {
  const [choice, setChoice] = useState(0);
  const [example, setExample] = useState("");
  const [copyVisible, setCopyVisible] = useState(false);
  const [chat, setChat] = useState([{}]);

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopyVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          window.location.href = `#${id}`;
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/getstory/${id}`
          );
          setChat(response.data);
        }
      } catch (error) {}
    };

    fetchData(); // Call it immediately on initial render and when id changes
  }, [id]);

  useEffect(() => {}, [chat]);
  useEffect(()=>{}, [loading])

  const handleUpvote = async () => {
    try {
      // Send a POST request to your backend API to increment upvotes
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/upvote/${id}`,
        {
          user: "me",
        }
      );

      // Update the chat state with the new upvote count
      setChat((prevChat) => ({
        ...prevChat,
        upvotes: {
          count: prevChat.upvotes.count + 1, // Increment the upvote count
        },
      }));
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  // Function to handle upvoting a message
  console.log("chat", chat);
  return (
    <>
      {id && copyVisible && (
        <div className="fixed w-full h-full z-30 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white text-black text-center p-3 rounded-xl flex">
            <span className="p-3">
              <b>link</b>:{process.env.REACT_APP_BACKEND_URL + "/" + id}
            </span>
            <button
              className="bg-blue-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              onClick={handleCopy}
            >
              <div className="flex items-center">
                {/* <FaCopy className="mr-2" /> */}
                <span>Copy</span>
              </div>
            </button>
          </div>
        </div>
      )}
      <div className="flex h-full flex-1 flex-col md:pl-[260px] dark:text-white dark:bg-gray-900 bg-sky-50 overflow-y-scroll">
        <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col items-center text-sm h-full md:h-screen bg-lightBlack">
              <div className="dark:text-gray-800 text-black w-full md:max-w-2xl lg:max-w-7xl md:h-full md:flex md:flex-col px-6">
                {!id ? (
                  <>
                    <div className="flex items-start justify-center">
                      <img src="/bot3.png" alt="img_not_fouond" />
                    </div>
                    <div className="md:flex items-start text-center gap-3.5">
                      {[
                        {
                          icon: <SunIcon />,
                          title: "Examples",
                          subTitle: [
                            `In a city where everyone can
                      fly...`,
                            `Once upon a time in a digital world...`,
                            `UFO was seen over the egyptian pyramid...`,
                          ],
                          hover: true,
                        },
                      ].map((chat, index) => (
                        <div
                          className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1"
                          key={index}
                        >
                          <h2 className="flex gap-3 text-gray-300 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                            {chat?.icon}
                            {chat?.title}
                          </h2>
                          <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                            {chat?.subTitle?.map((subTitle, subTitleIndex) => (
                              <button
                                className={`w-full bg-gray-250 text-gray-300 bg-white/5 p-3 rounded-md ${
                                  chat?.hover
                                    ? "hover:bg-gray-400 dark:hover:bg-gray-900 cursor-pointer"
                                    : "cursor-text"
                                }`}
                                key={subTitleIndex}
                                onClick={() => setExample(subTitle)}
                              >
                                {subTitle}
                              </button>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <section className="text-left p-3 flex flex-col gap-10 w-full">
                    <div>
                      <div className="pl-14 flex flex-row-reverse gap-8 items-center w-full">
                        <div className="p-8 dark:bg-black bg-white mb-10 dark:text-white w-full rounded-2xl">
                          {chat?.prompt}
                        </div>
                      </div>
                      <div className="pr-14 flex gap-2 items-center w-full mt-10">
                        <img
                          className="w-1/4"
                          src="/bot3.png"
                          alt="img_not_fouond"
                        />
                        <div className="p-8 flex flex-col dark:bg-slate-600 bg-gray-200 dark:text-white w-full rounded-2xl items-start gap-4">
                          {loading ? "Loding..." : chat?.bot}
                          <button className="text-blue-500 hover:text-blue-700 flex gap-2 items-center">
                            <img
                              onClick={handleUpvote}
                              src="/like.png"
                              className="w-5"
                              alt="like"
                            />{" "}
                            {chat?.upvotes ? chat?.upvotes?.count : 0}{" "}
                            <img
                              onClick={() => setCopyVisible(true)}
                              className="w-5"
                              src="/share.png"
                              alt="share"
                            />
                          </button>

                          <div className="flex flex-row-reverse gap-2">
                            {choice < chat?.choices?.length - 1 && (
                              <button
                                onClick={() => setChoice((prev) => prev + 1)}
                              >
                                Next
                              </button>
                            )}
                            {choice !== 0 && (
                              <button
                                onClick={() => setChoice((prev) => prev - 1)}
                              >
                                Back
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>
              <div className="w-full h-48 flex-shrink-0"></div>
            </div>
          </div>
          {!id && <Footer handlePrompt={handlePrompt} example={example} />}
        </main>
      </div>
    </>
  );
};

export default Conversation;
