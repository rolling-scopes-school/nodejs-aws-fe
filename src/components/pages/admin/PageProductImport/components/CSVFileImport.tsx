import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

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
    const [file, setFile] = useState<File | null>();

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement> & React.DragEvent) => {
            const files = e.target.files || e.dataTransfer.files;

            if (!files.length) return;
            setFile(files.item(0));
        },
        [setFile],
    );

    const handleFileRemoval = useCallback(() => {
        setFile(null);
    }, [setFile]);

    const handleFileUpload = useCallback(
        async () => {
            // Get the presigned URL
            const response = await axios({
                method: 'GET',
                url,
                params: {
                    name: file && encodeURIComponent(file.name),
                },
            });

            // eslint-disable-next-line no-console
            console.log('File to upload: ', file?.name);
            // eslint-disable-next-line no-console
            console.log('Uploading to: ', response.data);
            const result = await fetch(response.data, {
                method: 'PUT',
                body: file,
            });

            // eslint-disable-next-line no-console
            console.log('Result: ', result);
            setFile(null);
        },
        [file, url],
    );

    return (
        <div className={ classes.content }>
            <Typography variant="h6" gutterBottom={ true }>
                { title }
            </Typography>
            { file ? (
                <div>
                    <button type="button" onClick={ handleFileRemoval }>
                        Remove file
                    </button>
                    <button type="button" onClick={ handleFileUpload }>
                        Upload file
                    </button>
                </div>
            ) : (
                <input type="file" onChange={ handleFileChange } />
            ) }
        </div>
    );
}
