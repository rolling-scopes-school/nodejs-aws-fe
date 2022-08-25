import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  content: {
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

  const fetchAuthToken = ()=>{
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    const auth_token = btoa(`${username}:${password}`)
    return auth_token
  }

  const uploadFile = async (e: any) => {
    const auth_token = fetchAuthToken()
    // Get the presigned URL
      const response = await axios({
        method: 'GET',
        url,
        headers:{
          Authorization: `Basic ${auth_token}`,
        },
        params: {
          name: encodeURIComponent(file.name)
        }
      })
      console.log('File to upload: ', file.name)
      //response.data will contain  a preSignedPutUrl
      console.log('Uploading to: ', response.data)
      const result = await fetch(response.data.preSignedPutUrl, {
        method: 'PUT',
        body: file
      })
      console.log('Result: ', result)
      localStorage.setItem("authorization_token", auth_token);
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
