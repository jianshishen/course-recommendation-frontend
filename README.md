## Info

Project on progress

A React web app enabling users to get recommendations of courses.

- Single Page Application – The application is developed in one web page. The user interface is developed by React library.
- Material Design – The application uses Material UI as its UI library which provides not only responsive display in devices with different screen sizes, but smooth interaction between the application and users.

## Deployment

Local:

0. Open `config.json` in `/src`. Input the address of api server at `api_dev` as well as recommendation server at `recs_dev`.
1. Run `npm install` to install dependencies.
1. Run `npm start` to start the server.
1. The website will be deployed to the link displayed on console.

Google Cloud Platform:

0. Open `config.json` in `/src`. Input the address of api server at `api_prod` as well as recommendation server at `recs_prod`.
1. Configure Cloud SDK.
1. Run `npm run build` to build.
1. Run `gcloud app deploy` to deploy the build to Google Cloud Platform. Use `-v` to specify version.
