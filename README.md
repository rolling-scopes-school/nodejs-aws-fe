This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:  
You can use NPM instead of YARN (Up to you)  

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Deployment

Manually created S3 bucket with http web access (restricted policy, returns 403):
http://rsaosin-candies.s3-website-eu-west-1.amazonaws.com/

Cloudfront distribution (https) for manually created S3 bucket:
https://d3jimd4n9ssw50.cloudfront.net/

S3 bucket web access created by CloudFormation (returns 403):
http://rsaosin-candies-webapp.s3-website-eu-west-1.amazonaws.com/

Cloudfront distribution created by CloudFormation:
https://dvujynd51el0m.cloudfront.net/

To setup CloudFormation stack, build, and deploy all in one command, do:
```sh
yarn run cf:setup:build:deploy:nc
``` 

**Scripts:**
```sh
# copy ./build to s3 bucket:
yarn run deploy:s3 

# copy ./build to s3 bucket (here and later on ":nc" means "no confirmations"):
yarn run deploy:s3:nc 

# build and copy to s3 bucket:
yarn run build:deploy:s3
yarn run build:deploy:s3:nc

# create or update CloudFormation stack:
cf:setup

# get domain info from deployed CF stack (CloudFront distribution domain):
cf:domain-info

# invalidate CloudFront cache:
cf:invalidate-cache

# build, deploy to S3, invalidate cache, and get domain info:
cf:build:deploy
cf:build:deploy:nc

# the same as above, but update the CF stack first:
cf:setup:build:deploy
cf:setup:build:deploy:nc
```


