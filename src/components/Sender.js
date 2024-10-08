import { customAlphabet } from "nanoid";
import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { fileReader } from "@/helpers/senderReader";

const nanoid = customAlphabet("1234567890");

export default function Sender() {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });
  const [peer, setPeer] = useState(undefined);
  const [sender, setSender] = useState(undefined);
  const [status, setStatus] = useState(false);
  const encoded = useRef(null);

  useEffect(() => {
    setPeer(
      new Peer(nanoid(6), {
        reliable: true,
      })
    );
  }, []);

  useEffect(() => {
    const handleConnection = async () => {
      if (sender) {
        try {
          const result = await promisifyConnection();
          console.log(result); // "Connection is now open"
          sendData();
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    handleConnection();
  }, [sender]);

  const promisifyConnection = () => {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (sender.open) {
          setStatus(true);
          clearInterval(intervalId);
          resolve("Connection is now open");
        }
      }, 100); // Check every 100ms
    });
  };

  function TrimString(str, length) {
    if (str.length > length - 3) {
      return str.substring(0, length).trimEnd() + "...";
    } else {
      return str;
    }
  }

  const files = acceptedFiles.map((file) => (
    <li
      key={file.path}
      className="flex items-center justify-between p-3 hover:bg-gray-700 transition-colors duration-200"
    >
      <div className="flex items-center space-x-4">
        <svg
          className="w-6 h-6 text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7v10M8 7v10M5 5v14a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1H6a1 1 0 00-1 1z"
          />
        </svg>
        <span className="text-sm font-medium text-white truncate max-w-xs">
          {TrimString(file.path, 35)}
        </span>
      </div>
      <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">
        {(file.size / 1000000).toFixed(2)} MB
      </span>
    </li>
  ));

  if (peer) {
    peer.on("connection", (dataChannel) => {
      console.log(dataChannel);

      setSender(dataChannel);
    });
  }

  const sendData = async () => {
    encoded.current = await fileReader(acceptedFiles);
    if (sender) {
      sender.send(encoded.current);
    }

    console.log(encoded.current);
  };

  if (!peer) {
    return (
      <div className="flex space-x-2 justify-center items-center bg-black h-screen dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-white rounded-full animate-bounce"></div>
      </div>
    );
  }

  if (!acceptedFiles.length) {
    return (
      <div
        {...getRootProps({
          className:
            "dropzone p-4 max-w-lg mx-auto mt-10 bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
          onClick: open,
        })}
      >
        <div className="flex items-center justify-center h-full">
          <input {...getInputProps()} className="sr-only" />
          <div className="flex flex-col items-center justify-center">
            <Plus className="w-6 h-6 mb-1" />
            <p className="text-white text-lg font-semibold">Send</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h3 className="text-2xl font-bold mb-6 text-center tracking-wider">
        Your code
      </h3>
      <div className="text-2xl font-bold mb-6 text-center tracking-wider">
        {peer.id}
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-3">Files Ready to Send</h4>
        <aside className="bg-gray-800 p-5 rounded-lg shadow-lg">
          <ul className="space-y-3">{files}</ul>
        </aside>
      </div>

      <div className="flex justify-center items-center gap-4 mt-5">
        {/* 
        <button
          onClick={() => console.log(sender)}
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          aria-label="Print sender information"
        >
          Print Sender
        </button> 
        */}

        <button
          className="text-text-blue-700 hover:text-white border border-indigo-600 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm py-3 px-6 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-blue-500 items-center flex px-3 py-2 rounded-full shadow"
          onClick={sendData}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g id="Send 01">
              <path
                id="icon"
                d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z"
                stroke="white"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </g>
          </svg>
          <h3 className="text-xs font-semibold leading-4 px-2">Send File</h3>
        </button>
      </div>
    </div>
  );
}
