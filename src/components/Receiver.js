
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
  const downloadPrompt =  () => {
    const file =  base64ToBlob(receivedData.current);
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = "archive"; // Set the desired file name here
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
      <div>
        <div>{peer.id}</div>
        <form onSubmit={handleSubmit}>
          <input name="otp" id="otp" className="text-black" type="text"></input>
          <button type="submit">receive</button>
        </form>

        <br />
        <button
          onClick={() => {
            console.log(receivedData);
          }}
        >
          print data
        </button>
      </div>
    </>
  );
}
