## Backend part located here:
https://github.com/OlgaGnatenko/nodejs-aws-be/pull/1

## Project links 

Product list available here:
- CloudFront distribution: [https://d2joi2c0vsqdd3.cloudfront.net/](https://d2joi2c0vsqdd3.cloudfront.net/)

## Available Scripts

In the project directory, you can run:  
You can use YARN instead of NPM (Up to you)  

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy:s3`

Deploys the app using Serverless to AWS S3 and sets up the respective CloudFront bucket 

### `npm run build:deploy`
Builds the app for production to the `build` folder and deploys this folder to AWS S3.

### `npm run cloudfront:update:build:deploy`
Cleans S3 bucket, builds the app for production, deploys to AWS and invalidates cache. 


