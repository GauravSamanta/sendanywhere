import JSZip from "jszip";

export const fileReader = async (files) => {
  // const toBase64 = (file) =>
  //   new Promise((res, err) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file); //base64 encoding or
  //     reader.onload = () => res(reader.result);
  //     reader.onerror = () => {
  //       alert("There was an error reading your file.");
  //     };
  //   });

  if (files.length > 1) {
    const zip = new JSZip();
    files.forEach((file) => {
      zip.file(file.name, file);
    });
    const content = await zip.generateAsync({ type: "blob" });

    const file = new File([content], "archive.zip", {
      type: "application/zip",
    });

    const finalFile = {
      file: file,
      type: file.type,
      name: file.name,
    };

    // const encodedFile = await toBase64(file);

    return finalFile;
  } else {
    // const encodedFile = await toBase64(files[0]);

    const finalFile = {
      file: files[0],
      type: files[0].type,
      name: files[0].name,
    };
    // return encodedFile;
    return finalFile;
  }
};
