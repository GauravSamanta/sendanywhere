import { customAlphabet } from "nanoid";
import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react";
const nanoid = customAlphabet("1234567890abcet");

export default function Receiver() {
  const [peer, setPeer] = useState(undefined);
  const [receiver, setReceiver] = useState(undefined);
  const receivedData = useRef(null);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setPeer(
      new Peer(nanoid(6), {
        reliable: true,
      })
    );
  }, []);

  useEffect(() => {
    const handleConnection = async () => {
      if (receiver) {
        try {
          const result = await promisifyConnection();
          console.log(result); // "Connection is now open"
          receiveData();
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    handleConnection();
  }, [receiver]);

  const promisifyConnection = () => {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (receiver.open) {
          setStatus(true);
          clearInterval(intervalId);
          resolve("Connection is now open");
        }
      }, 100); // Check every 100ms
    });
  };

  const downloadPrompt = () => {
    const ok = receivedData;
    console.log(ok.current.file);
    const blob = new Blob([ok.current.file], { type: ok.current.type });
    console.log(blob);

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ok.current.name; // Set the desired file name here
    a.click();
    URL.revokeObjectURL(url);
  };

  const receiveData = () => {
    console.log(receiver);
    receiver.on("data", function (data) {
      // console.log("Received", data);
      receivedData.current = data;
      console.log(receivedData);
      downloadPrompt();
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otp = document.getElementById("otp").value;
    if (peer) {
      const conn = peer.connect(otp);
      console.log(conn);

      setReceiver(conn);
    }
  };

  if (!peer) {
    return <div></div>;
  }

  return (
    <>
      <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-lg mx-auto mt-10">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Your Connection ID
        </h1>
        <div className="text-lg font-semibold mb-4 text-center">{peer.id}</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="otp" className="text-sm font-medium mb-2">
              Enter OTP
            </label>
            <input
              name="otp"
              id="otp"
              className="bg-gray-800 text-white p-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              type="text"
              placeholder="Enter OTP"
            />
          </div>
          <div className="flex justify-center items-center gap-4 mt-5">
            <button
              className="text-text-blue-700 hover:text-white border border-indigo-600 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm py-3 px-6 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 items-center flex px-3 py-2 rounded-full shadow"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8 0L8 10M8 10L5 7M8 10L11 7M1 14H15M1 14L1 12M15 14L15 12"
                  stroke="white"
                  stroke-width="1.6"
                  stroke-linecap="round"
                />
              </svg>
              <h3 className="text-xs font-semibold leading-4 px-2">
                Receive File
              </h3>
            </button>
          </div>
        </form>

        <br />
      </div>
    </>
  );
}
