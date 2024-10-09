# AI Assistant

## Description
The AI Assistant is a web application that combines a user-friendly chat interface with a powerful backend. Built using React for the frontend and Node.js for the backend, the application allows users to register, log in, and interact with an AI chatbot. It features a responsive design with a focus on user experience, enabling seamless conversations and profile management. The project integrates OAuth for secure authentication and is structured to efficiently handle user and chat data, providing a modern solution for engaging with artificial intelligence.


## Table of Contents
1. [Video](#video)
2. [Technologies](#technologies)
3. [File Setup](#file-setup)
4. [How to use](#How-to-use)

## Video
The video has been divided into three parts due to its large size. Please watch them in the given sequence.

1. https://github.com/user-attachments/assets/c80b0b8f-9ec7-4957-978b-fa1d28ee567e

2. https://github.com/user-attachments/assets/1b44afb4-b409-47e5-8cd5-f25306c3d672

3. https://github.com/user-attachments/assets/73ca178b-2fe5-4214-a8ff-940df93e00cd

## Technologies

### Frontend:
1. **React.js**: Used for building the dynamic user interface.
2. **Tailwind CSS**: Applied for styling the components to ensure a responsive and modern design.
3. **React Router DOM**: Implemented to handle routing within the application.
4. **States and useEffect**: Utilized for managing application state and side effects during the component lifecycle.
5. **Axios**: Used for making API requests to the backend, handling HTTP methods like GET and POST.
6. **OAuth 2.0**: Used for authentication to facilitate easy login and signup.

### Backend:
1. **Node.js**: Server-side runtime environment for executing JavaScript code outside of the browser.
2. **MongoDB**: NoSQL database used for storing user answers and assessment data.
3. **Axios**: Also used here for making HTTP requests from the backend.
4. **Express.js**: Lightweight framework for managing routing, middleware, and handling HTTP requests/responses.
5. **OpenAI**: Utilizes OpenAI's GPT-4o to create a helpful assistant and maintain conversation threads.

## File Setup

### Frontend:
- **App.jsx**: This file maintains the routing logic for the application.
- **Component files**: Used to ensure reusability of components, allowing modular and efficient code structure.
- **Utils files**: Used to reusability functions this is a way of efficient code structure.
```
-- client
    /src
        -- App.js
    /components
        -- Login.jsx
        -- Signup.jsx
        -- ChatBot.jsx
        -- UpdateProfile.jsx
    /utils
        -- util.jsx
        -- googOAuth.jsx
```



### Backend:
- **index.js**: This is the main entry point where the server is created, database connections are initialized, CORS (Cross-Origin Resource Sharing) is enabled, and routes are set up.
- **Controllers**: Responsible for handling the logic and functionality of each endpoint.
- **Routes**: Defines the API paths and connects them with appropriate controller functions.
- **Schema**: MongoDB schema definitions for storing and managing data in the database.
- **Utils files**: Used to reusability functions this is a way of efficient code structure.
```
-- server
    -- index.js
    /controllers
        -- chatControllers.js
        -- userControllers.js
    /model
        -- chatSchema.js
        -- userProfileSchema.js
    /routes
        -- authRoutes.js
        -- chatRoutes.js
    /utils
        -- databaseConnection.js
        -- openAi.js
```


## How to use
To clone and run this application you will need Git and Node.js (which comes with npm) installed on your computer.


Clone this Repository
```
$ git clone
```

Open Terminal

```
Terminal 1
$ cd server
$ npm i
```

Create a file named .env and replace to your Database url with yours and also chat gpt key and origanisation key.
```
DATABASE_URL = 'MONGO_DB_CONNECTION_URL'
CHAT_GPT_API_KEY = "API_KEY";
CHAT_GPT_ORGANISATION_KEY = "ORGANISATION_KEY";
```

To run backend
```
$ npm start
```


Open another terminal
```
Terminal 2
$ cd client
$ npm i
```

Go to util file replace to your Google Client Id url with yours.
```
googleClientId = 'GOOGLE_CLIENT_ID'
```

To run frontend
```
$ npm run dev
```
