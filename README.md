# Hear A Tale - Awakening - JIB 1339

> Team 1339: Chris Murray, Isabella Moak, Matt Chen, Victor Stevens, Joseph Lazzarini

"Students with poor reading skills fail to reach their potential in school and in life -- a well-designed web-based app, compatible with small-screen devices, can provide the support that such students desperately need." We will be designing a mobile compatible web application that allows users to read Kate Chopin's *The Awakening*, integrating data tracking, audio files, and user interaction features on top of a basic reader.

## Stack

- React.js: Front-end
- Next.js: API routes and server-side rendering
- MongoDB/Mongoose: Persistent storage
- eslint: Automatically identifying and fixing code errors
- prettier: Setting a common code style and fixing any issues. If you would like to adjust any prettier settings like quote style or include semicolons, look in `.prettierrc`

## Setup

### Initializing Env Vars

- If you are an EM setting up a project for the first time, read [the Bitwarden guide here](https://gtbitsofgood.notion.site/Secrets-Passwords-Bitwarden-74c4806a1f29485b8fb85ea29f273ab9) before continuing forward.
- Run `npm run secrets:[windows/linux]` to sync development secrets from Bitwarden and save them to a local `.env.local` file, based on your platform. Contact Matt Chen for the Bitwarden password.

### Updating Env Vars

- For dev, update `.env.local` and `next.config.js`
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
- It's very helpful to install MongoDB Compass to see your database contents

### Node

1. Clone this project to your computer
2. Navigate to this project in terminal and enter `yarn`
3. Rename `example.env.local` to `.env.local` and fill it out with the dev config

## Running

### Development

To understand this code better, read the [Code Tour](/CODETOUR.md).

1. Run `yarn`
2. Run `yarn dev`

### Production


There is a pipeline in place that automatically deploys to Vercel. Vercel deploys for every PR/push into the main or production branches. Three GitHub deployment environments are used: Production (for pushes to production), Preview (for pushes to open PRs into main or production), and Development (for pushes to main).

---

# Release Notes

## Version 0.4.0

### New Features

* Definition Audio: The reader can now cue the audio for any definition by clicking on the headphones icon in the definition popup.
* Audiobook: The reader can now listen to the audio for the book while reading. The audio can be played starting from any page by clicking on the headphones icon in the sidebar of the reading screen. The reader can also choose to begin reading with audio or without audio from the home screen. Audio can be toggled on/off and can be paused/played using the icons on the sidebar.
* Bookmarks Screen: There is now a screen containing all of the reader's bookmarks, which enables the reader to set as many bookmarks as they like and access them from this screen. The reader has the option to continue reading with or without audio from any bookmark on this screen.

### Improvements
* Quiz Screen: The design for the quiz screen has been updated to increase the size of the text and minimize unused whitespace. A sound has been added for when the reader selects the wrong answer choice. Related words no longer show up in the question on the quiz screen.
* Definitions: All of the definitions are now available for the reader to cue when reading. All of the audio for these definitions is also available. The size of the definition popup window and the text within it has been increased. The icon for cueing a quiz from this popup has been redesigned.
* Audio: All of the audio for individual words is now available.
* Reading Screen: Removed the red margin around the pages. Added chapter headings at the beginning of each chapter. Removed settings icon and replaced it with a new icon that will enable the reader to skip around the audio for a page (not implemented yet). The short stories after the end of the book that were contained in the original text have been removed.
* Home Screen: The third bookmark icon has been redesigned and now brings the reader to the new bookmarks screen when clicked.

### Bug fixes
* Fixed bug that progress would never make it to 100% for chapters that ended on even numbered pages.

### Known Bugs
* Errors are thrown in console when the reader tries to cue audio that we don't have files for.
* User interface on mobile (vertical) needs improvement.
* Definition audio persists after closing the definition popup.

## Version 0.3.0

### New Features

* Definitions: When the reader clicks on a word after it is cued, a popup displays the definition for that word
* Quizzes: When the definition popup is displayed, the reader can click the exclamation point icon to take a quiz on that word
* Bookmarks: The reader can click on the bookmark icon on the sidebar while reading to save a bookmark that can be accessed on the home screen
* Help Screen: The reader can access a tutorial from the home page by clicking on the "Help" option on the sidebar.
* Progress: The reader can click on the "Continue Reading" button on the home screen to start reading from the last page they accessed. On the right side of the home screen, the reader can see their progress through each chapter; clicking on a chapter brings the reader to the most recent page they accessed in that chapter.
* Review Screen: Design mockup for the review screen has been added to the application.

### Improvements
* Background Screen: The font weight for the author bio has been increased and the images are now larger.
* Reading Screen: The pages of the book have been adjusted to look more like a physical book and to have fixed lines regardless of the window size

### Bug fixes
* Fixed a 404 error on page 404 of the book
* Fixed bug where the audio for a word didn't play if the reader tried to cue it more than once in a row.
* Fixed bug where the word highlighting persisted after a definition was cued
* Fixed issues with the text encoding
* Fixed bug where new pages would be scrolled down if the reader scrolled down on a previous page

### Known Bugs
* Errors are thrown in console when the reader tries to cue audio that we don't have files for
* User interface on mobile (vertical) needs improvement

## Version 0.2.0

### New Features

* Complete redesign of application
* Background page completed
* Page redesign
* Page system set up
* Entire book added to application
* Clicking on a word plays the audio for that word
* Double clicking on a word brings up an alert toggle
* Use Chakra UI
  * Icons added

### Known Bugs

* No mobile compatability
* Accessibility issues with row-reverse layout
* Errors are thrown in console when non-existent audio files are fetched
* Unicode characters parsed strangely
* Page scroll does not reset when paging

## Version 0.1.0

### New Features

* Reader added
  * Scroll mode and page mode
* Router added
* Audio sync tool created
* Mongoose models created
* Database linked
* CI/CD set up
* Linter set up
* Basic books API set up
  * Get chapter, get book, etc.
* Created header
* Reading progress indicators added
* Chapters in URL

### Known Bugs

* Paging backwards does not take you to the last page of the previous chapter

