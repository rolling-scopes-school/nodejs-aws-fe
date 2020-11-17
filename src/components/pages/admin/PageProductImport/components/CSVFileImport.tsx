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

export default function CSVFileImport({url, title}: CSVFileImportProps) {
  const classes = useStyles();
  const [file, setFile] = useState<any>();
  const [uploadUrl, setUploadUrl] = useState<any>();
  const onFileChange = (e: any) => {
    console.log(e.target.files || e.dataTransfer.files);
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    setFile(files[0])
  };

  const removeFile = () => {
    setFile('');
  };

  const uploadFile = async (e: any) => {
      // Get the presigned URL
    console.log(e)
    console.log(file)
      const response = await axios({
        method: 'GET',
        url,
        params: {
          name: encodeURIComponent(file.name)
        }
      })
      console.log('Response: ', response.data)
      console.log('Uploading: ', file)
      console.log('Uploading to: ', response.data)
      const result = await fetch(response.data, {
        method: 'PUT',
        body: file,
        headers: {
          "Content-Type": "text/csv"
        }
      })
      console.log('Result: ', result)
      // Final URL for the user doesn't need the query string params
      setUploadUrl(response.data.split('?')[0]);
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
          {!uploadUrl && <button onClick={removeFile}>Remove file</button>}
          {!uploadUrl && <button onClick={uploadFile}>Upload file</button>}
        </div>
      )}
    </div>
  );
}
