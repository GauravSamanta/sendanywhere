

export default function Dropzone(props) {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

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
    <div className="">
      <aside>
        <h4>Files to send</h4>
        <br></br>
        <ul className="bg-zinc-800">{files}</ul>
      </aside>
    </div>
  );
}
