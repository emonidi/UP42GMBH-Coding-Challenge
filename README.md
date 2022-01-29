# UP42 front-end coding challenge

For this challenge, we want you to build a simple application capable of fetching and visualizing remote
data. The goal is to create a weather application displaying the weather for a single day.

## The data
We will use OpenWeatherMap 5 days/3 hours forecasts as the remote data source for this challenge.
More information on the API endpoint can be found on the [OpenWeatherMap documentation](https://openweathermap.org/forecast5).

Please use the following endpoint to retrieve the data:

```
https://samples.openweathermap.org/data/2.5/forecast?q=M%C3%BCnchen,DE&appid=b6907d289e10d714a6e88b30761fae22
```
Note: There is no need to create an account.

## The design

Our designers have been creating a prototype that you should use as a reference. Please try to keep as
close as possible to the design specifications.
* Please use the following prototype to implement the look and feel: [Figma prototype](https://www.figma.com/proto/WzlDozpSUaiy9yO8zguwtD/Frontend-Coding-Challenge?node-id=8%3A0&viewport=1761%2C1098%2C0.5&scaling=contain).

* You can download the sun icon in SVG format from this [GitHub gist](https://gist.github.com/interstellar-wormhole/f7bc42a3e59d0299bfa465e0652a634b)

* You can access more information on spacing and sizing used in the prototype by creating an account
on [Figma](https://www.google.com/url?sa=D&q=https://figma.com/&ust=1643583420000000&usg=AOvVaw0zQPNK_lLB_jyTm_Tl8YGU&hl=bg&source=gmail) and opening the [prototype source](https://www.figma.com/file/WzlDozpSUaiy9yO8zguwtD/Frontend-Coding-Challenge?node-id=8%3A0) (optional)

## Details
Please make sure to meet the following requirements for your submission:
* Our Frontend stack has projects in React and Vue, so we kindly ask you to stick to one of them for
this coding challenge
* You can use any libraries or packages you deem necessary or useful.
* Code and commit messages should be treated as you would on a real-world task
* Please take some time to think about code quality and testing, and demonstrate your approach to
these aspects
* When submitting, please provide a link to an online Git repository or a ZIP file which includes the
local .git folder and in the case you deploy it, the URL of the hosted application.
* We estimate that this challenge should take a maximum of 4 hours to complete, but this is not a hard limit.
Feel free to take the time you need to ensure that it is reflective of your skills.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Used libraries besides react
* React Redux
* Redux Toolkit
* Moment
* TypeScript

## Used APIs
Provided api did not work and creating a server for this app to avoid CORS restrictions is a little bit more then I can take for a test. That is why I needed to change the api with one that is not requiring CORS: https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.10&lon=9.58
Also sinse the weather api does not have its own geocoding capabilities I am also using mapbox geocoding api to get the latitude and longitude of the place I would like to query the forcast for. Also since the choise of icons provided was quite poor I decided to use the icons provided by met.no https://api.met.no/weatherapi/weathericon/2.0/documentation so the app would be complete. 

## Style and layout 
General HD layout has been followed with no guarantees for "pixel perfect" implementation. After that responsive capabilities are added. I wish I also had a responsive figma prototype. Mobile layout would be much well thought in this case but it is quite satisfactory as it is. SCSS is used for all styling. 

## Host
Aplication is hosted at http://164.92.215.41/

## Docker
A multi stage docker build is implemented in the Dockerfile. End image size is around 10MBs.Image repo: https://hub.docker.com/repository/docker/emonidi/weatherapp/

## Git
A git repository is hosted at: https://github.com/emonidi/weather-app actions for automatic docker build and push are added. 

## Unit and E2E tests.
No Unit and E2E tests provided sinse the lack of time. 

## Additional notes. 
I would like to talk to the person who would do this app with its all required bells and wistles for 4 hours :D 
