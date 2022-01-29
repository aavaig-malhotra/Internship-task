Link to the deployed website [here](https://internship-task-aavaig.netlify.app/)

To run this project  : 

## npm install (or yarn install)
Use this command to install the dependencies required to run the project.

## npm start (or yarn start)
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

## npm run build (or yarn build)
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

<hr />

## Work Done During the Assessment
<ul>
    <li>Added a feature to import youtube videos and captions using a public api. Made a post request to the api to retrieve the video file and captions file links. Displayed the captions and the youtube video also keeping the captions and video in sync </li>    
    <li>Added feature to type in the language the captions are translated. Default language for typing is english. Used react-transliterate to achieve the task. Saved the current selected language for translation in the state and passed it to the subtitle component so that correct language preference could be applied to react-transliterate</li>
    <li>Removed Chinese add in the right bottom corner</li>
    <li>Divided the captions into 2 columns where 1 column will always be in the original language(english) while the other column can be translated into different languages</li>
</ul>

