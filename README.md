# To-Do List Web App

## Description

The To-Do List Web App is a simple web application that allows users to create, manage, and track their to-do tasks. This app provides an easy-to-use interface for adding, checking off, and deleting tasks, making it a convenient tool for organizing your daily activities.

## Prerequisites

Before running the app, you need to set up MongoDB and configure the necessary environment variables. You can choose one of the following options:

### Option 1: Local MongoDB Setup

1. Replace the MongoDB connection string in `todo-back-end/app.js` with the following to run the MongoDB server locally:

   ```javascript
   mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");
   ```

2. Ensure that you have a local MongoDB server running.

### Option 2: MongoDB Cloud Setup

1. Create a `.env` file in the `todo-back-end/` directory with the following environment variables:

   ```
   MONGODB_USERNAME=yourUsername
   MONGODB_PASSWORD=yourPassword
   ```

2. Make sure that your MongoDB cloud cluster is deployed.

## Install Dependencies

Open a terminal using Git Bash, navigate first to the `todo-back-end/` directory, followed by the `todo-front-end` directory, then proceed to install the project dependencies:

   ```bash
   npm install
   ```

## How to Run the App

1. Open two separate terminals using Git Bash in VSCode.

2. In the first terminal, navigate to the `todo-back-end/` directory and run the backend using one of the following commands, depending on your setup:

   - For development:
     ```
     npm run dev
     ```
   - For production:
     ```
     npm start
     ```

3. In the second terminal, navigate to the `todo-front-end/` directory and run the React application:
   
   ```
   npm start
   ```
