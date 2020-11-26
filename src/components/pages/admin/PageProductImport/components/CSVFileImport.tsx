import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { getAuthorizationToken } from "utils/utils";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 0, 3),
  },
}));

type CSVFileImportProps = {
  url: string,
  title: string
};

export default function CSVFileImport({url, title}: CSVFileImportProps) {
  const classes = useStyles();
  const [file, setFile] = useState<any>();

  const onFileChange = (e: any) => {
    console.log(e);
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    setFile(files.item(0));
  };

  const removeFile = () => {
    setFile('');
  };

  const uploadFile = async (e: any) => {
      const authorizationToken = getAuthorizationToken();
      const headers = {
        ...(authorizationToken && {Authorization: `Basic ${authorizationToken}`})
      };
      // Get the presigned URL
      const response = await axios({
        method: 'GET',
        url,
        headers,
        params: {
          name: encodeURIComponent(file.name)
        }
      });
      const signedUrl = response?.data?.data;
      if (!signedUrl) {
        throw new Error('Incorrect signed url to upload!')
      }
      console.log('File to upload: ', file.name)
      console.log('Uploading to: ', signedUrl)
      const result = await fetch(signedUrl, {
        method: 'PUT',
        body: file
      })
      console.log('Result: ', result)
      setFile('');
    }
  ;

  return (
    <div className={classes.content}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
          <input type="file" onChange={onFileChange}/>
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </div>
  );
}
