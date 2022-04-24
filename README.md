# Hear A Tale - Awakening - JIB 1339

> Team 1339: Chris Murray, Isabella Moak, Matt Chen, Victor Stevens, Joseph Lazzarini

"Students with poor reading skills fail to reach their potential in school and in life -- a well-designed web-based app, compatible with small-screen devices, can provide the support that such students desperately need." We will be designing a mobile compatible web application that allows users to read Kate Chopin's *The Awakening*, integrating data tracking, audio files, and user interaction features on top of a basic reader.

## Stack

- React.js: Front-end
- Next.js: API routes and server-side rendering
- MongoDB/Mongoose: Persistent storage
- eslint: Automatically identifying and fixing code errors
- prettier: Setting a common code style and fixing any issues. If you would like to adjust any prettier settings like quote style or include semicolons, look in `.prettierrc`

- Python @joe

## Setup

### Initializing Env Vars

- To make it easy to pull secrets across team members, we have implemented commands that use the Bitwarden CLI to update environment variables on your local device.
- Run `npm run secrets:[windows/linux]` to sync development secrets from Bitwarden and save them to a local `.env.local` file, based on your platform. Contact Matt Chen for the Bitwarden password for this repo.
- If you are setting the repo up external to this team, replace the email and item id within the `package.json` scripts with your own.

### Updating Env Vars

- For dev, update `.env.local` and `next.config.js`. See `.env.local.example` for the format of the file, with annotations on what each variable represent.
- For production, add the env vars to your host, **NEVER** commit `.env` to your version control system.

### MongoDB

A running instance of MongoDB is required this project.

- Decide if you want to run MongoDB locally or remotely
- Locally
  1. [Download MongoDB Community Server](https://www.mongodb.com/download-center/community)
  2. Go through the installation instructions.
     - Leave the port at default 27017
- Remotely
  1. Create a MongoDB instance on MongoDB Atlas
  2. In Security → Network Access: add the IP address `0.0.0.0/0` (all IPs)
  3. In Security → Database Access: Add new database user
  4. In Data Storage → Clusters: Find your cluster and click `Connect` → `Connect your application` and copy the connection string, set the username and password, and set this as `MONGO_DB` in `.env.local`
- Create the `nextjs` database. (or choose another name, but make sure to change it in `.env.local`)
- It's very helpful to install MongoDB Compass to see your database contents! Just input the connection string from above, and you will be able to visually observe the database.

### Node

1. Clone this project to your computer
2. Navigate to this project in terminal and enter `yarn`
3. Rename `example.env.local` to `.env.local` and fill it out with the dev config

### Python @joe maybe

## Running

### Development

To understand this code better, read the [Code Tour](/CODETOUR.md).

1. Run `yarn`
2. Run `yarn dev`
3. Go to `localhost:3000` to see the app running!

### Production

There is a pipeline in place that automatically deploys to Vercel. Vercel deploys for every PR/push into the main or production branches. Three GitHub deployment environments are used: Production (for pushes to production), Preview (for pushes to open PRs into main or production), and Development (for pushes to main). See the Installation Guide below for more information.

## Installation Guide

### Pre requisites
- [Vercel](https://vercel.com/) account
- [MongoDB](https://www.mongodb.com/cloud/atlas/register2) database.
- [Git](https://git-scm.com/downloads)
- [Node](https://nodejs.org/en/download/)
- yarn: run `npm install --global yarn` in terminal after installing node
- @joe python

If you are choosing not to deploy on Vercel (NOT RECOMMENDED), then an equivalent web server service (e.g. DigitalOcean) or web server that is able to run node commands is necessary. Essentially, a server is needed to run the `next start` command, which may require other setup.

As this is a web based application no dependent libraries must be installed locally, unless you are planning on developing the application locally. If that is the case, see above for dependent library installation. Otherwise, Vercel will handle installation of dependent packages for you. If you are choosing not to use Vercel, run the `yarn` command within this project's directory to install all of the dependent node modules. Node 14.x is expected for this project. The rest of this install guide will be for Vercel only.

### Download/Build Instructions

Again, as this is a web based application, nothing needs to be downloaded. In order to build the application, we recommend using the production pipeline as detailed above. To enable the production pipeline, follow these steps:

1. Clone the repository locally using `git clone [https or ssh url]`
2. Run `yarn` in the repository
3. Run `npx vercel`. Follow the Vercel prompts to create a deployment for your local project.
4. To set up the database, @joe python scripts

At this point, the project is already built. Now we need to add our environment variables into the deployment to finalize installing our actual application.

1. Log into Vercel and navigate to your new project.
2. Go to Settings -> Environment Variables
3. For Vercel, only 3 env variables are needed: `DB_NAME`, `MONGO_DB`, and `NEXTAUTH_SECRET`. For `DB_NAME`, we recommend calling it `awakening`. For `MONGO_DB`, input the connection string to your MongoDB database. For `NEXTAUTH_SECRET`, add any random string of characters.

To future proof your application and automatically update on code changes, follow the steps below:

1. A `.vercel` folder should have appeared within your repository after running `npx vercel`. Note down the `orgId` and `projectId` within the `project.json` file in this folder.
2. In GitHub, go to Settings -> Secrets -> Actions
3. Fill in two secrets, `ORG_ID` and `PROJECT_ID` with the corresponding values of `project.json` within the Vercel folder
4. Log into your Vercel account within your browser. Click your profile icon -> Settings -> Tokens, and generate a new token.
5. Copy this value into another secret as `VERCEL_TOKEN`

At this point, your pipeline should be set up. Future pushes to the `production` branch should update the Production Vercel deployment.

### Run instructions

To run the application, visit the deployment of the app. This can be found in a multitude of places. On Vercel, navigate to the home of your app deployment and click on the app itself to visit the production deployment. Alternatively, navigate to your GitHub project and select the production deployment from the environments on the side, if you have set up continuous integration (final section of previous step) already.

### Troubleshooting

- Check to see if environment variables are copied properly
- Check to see if yarn is installed and you have runned the `yarn` command to install all of the packages
- Ensure you have node installed
- Ensure your MongoDB database instance is open to all IP addresses and the connection string is read and write
- Ensure you have run the Python scripts

---

# Release Notes

## Version 1.0.0

### New Features

* Reader: The reader is able to view the book consistently on all screen sizes
* Definitions: When the reader clicks on a word after it is cued, a popup displays the definition for that word
* Quizzes: When the definition popup is displayed, the reader can click the exclamation point icon to take a quiz on that word
* Bookmarks: The reader can click on the bookmark icon on the sidebar while reading to save a bookmark that can be accessed on the home screen
* Help Screen: The reader can access a tutorial from the home page by clicking on the "Help" option on the sidebar.
* Progress: The reader can click on the "Continue Reading" button on the home screen to start reading from the last page they accessed. On the right side of the home screen, the reader can see their progress through each chapter; clicking on a chapter brings the reader to the most recent page they accessed in that chapter.
* Review Screen: Design mockup for the review screen has been added to the application.
* Definition Audio: The reader can now cue the audio for any definition by clicking on the headphones icon in the definition popup.
* Audiobook: The reader can now listen to the audio for the book while reading. The audio can be played starting from any page by clicking on the headphones icon in the sidebar of the reading screen. The reader can also choose to begin reading with audio or without audio from the home screen. Audio can be toggled on/off and can be paused/played using the icons on the sidebar.
* Bookmarks Screen: There is now a screen containing all of the reader's bookmarks, which enables the reader to set as many bookmarks as they like and access them from this screen. The reader has the option to continue reading with or without audio from any bookmark on this screen.

### Improvements

* Background Screen: The font weight for the author bio has been increased and the images are now larger.
* Reading Screen: The pages of the book have been adjusted to look more like a physical book and to have fixed lines regardless of the window size
* Quiz Screen: The design for the quiz screen has been updated to increase the size of the text and minimize unused whitespace. A sound has been added for when the reader selects the wrong answer choice. Related words no longer show up in the question on the quiz screen.
* Definitions: All of the definitions are now available for the reader to cue when reading. All of the audio for these definitions is also available. The size of the definition popup window and the text within it has been increased. The icon for cueing a quiz from this popup has been redesigned.
* Audio: All of the audio for individual words is now available.
* Reading Screen: Removed the red margin around the pages. Added chapter headings at the beginning of each chapter. Removed settings icon and replaced it with a new icon that will enable the reader to skip around the audio for a page (not implemented yet). The short stories after the end of the book that were contained in the original text have been removed.
* Home Screen: The third bookmark icon has been redesigned and now brings the reader to the new bookmarks screen when clicked.

### Bug Fixes

* Fixed a 404 error on page 404 of the book
* Fixed bug where the audio for a word didn't play if the reader tried to cue it more than once in a row.
* Fixed bug where the word highlighting persisted after a definition was cued
* Fixed issues with the text encoding
* Fixed bug where new pages would be scrolled down if the reader scrolled down on a previous page
* Fixed bug that progress would never make it to 100% for chapters that ended on even numbered pages.

### Known Bugs

* User interface on mobile (vertical) needs improvement.
* Help screen images are low resolution
