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
  const encoded = useRef(null);

  useEffect(() => {
    setPeer(new Peer(nanoid(6)));
  }, []);
  const files = acceptedFiles.map((file) => (
    <div className="text-sm">
      <li key={file.path}>
        <div className="grid grid-cols-2">
          <div>{file.path}</div>
          <div>{file.size / 1000000} MB</div>
        </div>
      </li>
    </div>
  ));

  if (peer) {
    peer.on("connection", (dataChannel) => {
      setSender(dataChannel);
    });
  }

  const sendData = async () => {
    encoded.current = await fileReader(acceptedFiles);
    if (sender) {
      sender.send(encoded);
    }

    console.log(encoded);
  };

  if (!peer) {
    return <div>connecting...</div>;
  }
  if (!acceptedFiles.length) {
    return (
      <div {...getRootProps({ className: "dropzone" })}>
        <div className="flex">
          <input {...getInputProps()} />
          <p>Send</p>
          <Button variant="ghost" onClick={open}>
            <Plus />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {peer.id}
      <button
        onClick={() => {
          console.log(sender);
        }}
      >
        print sender
      </button>
      <button onClick={sendData}>send message</button>

      <aside>
        <h4>Files to send</h4>
        <br></br>
        <ul className="bg-zinc-800">{files}</ul>
      </aside>
    </div>
  );
}
