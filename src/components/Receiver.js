import { base64ToBlob } from "@/helpers/receiverReader";
import { customAlphabet } from "nanoid";
import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react";
const nanoid = customAlphabet("1234567890abcet");

export default function Receiver() {
  const [peer, setPeer] = useState(undefined);
  const [receiver, setReceiver] = useState(undefined);
  const receivedData = useRef(null);

  useEffect(() => {
    setPeer(new Peer(nanoid(6)));
  }, []);

  const downloadPrompt = async () => {
    const file = await base64ToBlob(receivedData.current);
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = "demo"; // Set the desired file name here
    a.click();
    URL.revokeObjectURL(url);
  };

  if (receiver) {
    console.log(receiver);
    receiver.on("data", function (data) {
      // console.log("Received", data);
      receivedData.current = data;
      console.log(receivedData);
      downloadPrompt();
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otp = document.getElementById("otp").value;
    if (peer) {
      const conn = peer.connect(otp);

      setReceiver(conn);
    }
  };

  if (!peer) {
    return <div>connecting...</div>;
  }

  return (
    <>
      <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-lg mx-auto mt-10">
        <div className="text-lg font-semibold mb-4 text-center">{peer.id}</div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="otp" className="text-sm font-medium mb-2">
              Enter OTP
            </label>
            <input
              name="otp"
              id="otp"
              className="text-black p-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              type="text"
              placeholder="Enter OTP"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Receive
          </button>
        </form>

        <br />
      </div>
    </>
  );
}
