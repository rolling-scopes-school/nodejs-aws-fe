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

### `cdk:deploy`

Builds and deploy on AWS

### `cdk:destroy`

Remove deploy from AWS

## AWS

1. `npm install -g aws-cdk`
1. make dir for CDK scripts `mkdir aws_cdk && cd aws_cdk`
1. once run bootstrapping `cdk bootstrap`
1. come back to main three `cd ..`
1. use `npm run cdk:deploy` for deploy

## Task-02 (links will be remove after same time)

- [manual S3 deployment](http://rs-aws-dev.s3-website.us-east-2.amazonaws.com/)
- [manual Cloudfront deployment](https://d3ran6b1rodd0j.cloudfront.net/)
- [CDK deployment](https://d3fihs3nsna7qy.cloudfront.net/)
