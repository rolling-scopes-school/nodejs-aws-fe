import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
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

type SignedUrlResponse = {
  url: string
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
    const token = localStorage.getItem('authorization_token');
    const headers = token != null ? {'Authorization': `${token}`} : null;

    // Get the presigned URL
    const response = await axios.get<SignedUrlResponse>(url,{
      headers,
      params: {
        name: encodeURIComponent(file.name)
      }
    })
    console.log('File to upload: ', file.name)
    console.log('Uploading to: ', response.data)

    const result = await fetch(response.data.url, {
      headers: {
        'Content-Type': 'text/csv',
      },
      method: 'PUT',
      body: file
    })
    console.log('Result: ', result)
    setFile('');
  };

  return (
    <div className={classes.content}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
          <input type="file" accept=".csv" onChange={onFileChange}/>
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </div>
  );
}
