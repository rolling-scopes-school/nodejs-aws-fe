import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log("onFileChange", file);
      setFile(file);
    }
  };

  const removeFile = () => {
    console.log("removeFile", file);
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("upload file to", url);
    if (!file) {
      console.error("file not exist");
      return;
    }

    try {
      const authToken = localStorage.getItem("authorization_token");
      const headers = authToken
        ? {
            Authorization: `Basic ${authToken}`,
          }
        : undefined;

      // Get the presigned URL
      const response = await axios({
        method: "GET",
        url,
        headers,
        params: {
          name: encodeURIComponent(file.name),
        },
      });
      console.log("File to upload: ", file.name);
      console.log("Uploading to: ", response.data);
      const result = await fetch(response.data, {
        method: "PUT",
        body: file,
      });
      console.log("Uploading result: ", result);
      setFile(undefined);
    } catch (error) {
      if (error === "Unauthorized") {
        console.log("Unauthorized. Please log in.");
      } else {
        console.error("An error occurred:", error);
      }
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
