# Jane's tasks
## Manual deployment
S3 bucket was created, the minor change (website title's was changed to JANE's shop) was done, website was build and uploaded to [S3 bucket](http://manual-bucket-for-aws-cloud-dev-course-jane.s3-website.us-east-2.amazonaws.com). S3 Bucket and is available over the Internet (see URL).

A CloudFront distribution was created and configured. The Application is served with CloudFront and is available over the Internet via [CloudFront URL](https://d35xn51yrtqnd4.cloudfront.net/)

## Automated deployment
S3 Bucket was created, the Application was deployed, a CloudFront Distribution created and configured using AWS CDK. The Application can be built and deployed by running npm script commands. This Application has different title ("My Shop") to be distinguished from manually deployed website.

[CloudFront URL](https://d2yv7dwt9ty4mt.cloudfront.net) is provided and opens a static website
[S3 Bucket URL](https://mywebappcdkstack-websitebucket75c24d94-qippurmlughr.s3.us-east-2.amazonaws.com/) shows Access Denied error

# React-shop-cloudfront

This is frontend starter project for nodejs-aws mentoring program. It uses the following technologies:

- [Vite](https://vitejs.dev/) as a project bundler
- [React](https://beta.reactjs.org/) as a frontend framework
- [React-router-dom](https://reactrouterdotcom.fly.dev/) as a routing library
- [MUI](https://mui.com/) as a UI framework
- [React-query](https://react-query-v3.tanstack.com/) as a data fetching library
- [Formik](https://formik.org/) as a form library
- [Yup](https://github.com/jquense/yup) as a validation schema
- [Vitest](https://vitest.dev/) as a test runner
- [MSW](https://mswjs.io/) as an API mocking library
- [Eslint](https://eslint.org/) as a code linting tool
- [Prettier](https://prettier.io/) as a code formatting tool
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool

## Available Scripts

### `start`

Starts the project in dev mode with mocked API on local environment.

### `build`

Builds the project for production in `dist` folder.

### `preview`

Starts the project in production mode on local environment.

### `test`, `test:ui`, `test:coverage`

Runs tests in console, in browser or with coverage.

### `lint`, `prettier`

Runs linting and formatting for all files in `src` folder.
