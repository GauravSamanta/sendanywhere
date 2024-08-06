"use client";

import Receiver from "@/components/Receiver";
import Sender from "@/components/Sender";
import Dropzone from "@/components/Dropzone";

export default function Home() {
  return (
    <>
      
      <Sender />
      <br></br>
      <Receiver />
      {/* <Dropzone /> */}
    </>
  );
}
