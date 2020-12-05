import React, { useState } from "react";
import mime from "mime-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(3, 0, 3),
    },
}));

type CSVFileImportProps = {
    url: string;
    title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
    const classes = useStyles();
    const [file, setFile] = useState<any>();

    const onFileChange = (e: any) => {
        console.log(e);
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        setFile(files.item(0));
    };

    const removeFile = () => {
        setFile("");
    };

    const uploadFile = async (e: any) => {
        const authorizationToken = localStorage.getItem("authorization_token");
        let headers: Record<string, unknown> = {};
        
        if (authorizationToken) {
            headers.Authorization = `Basic ${authorizationToken}`
        }


        // Get the presigned URL
        const response = await axios({
            method: "GET",
            url,
            params: {
                name: encodeURIComponent(file.name),
            },
            headers,
        });
        console.log("File to upload: ", file.name);
        console.log("Uploading to: ", response.data);

        const contentType = mime.lookup(file.name);

        console.log("contentType", contentType);

        const result = await fetch(response.data, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": contentType || "",
            },
        });
        setFile("");
    };
    return (
        <div className={classes.content}>
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
        </div>
    );
}
