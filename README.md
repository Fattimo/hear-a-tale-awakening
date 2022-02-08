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
