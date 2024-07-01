# To-Do Lists Application

This is a simple To-Do Lists application built with React for the frontend and Express.js for the backend. The application allows users to create multiple to-do lists, add tasks to these lists, mark tasks as complete, and delete tasks and lists.

## Features

- Create multiple to-do lists
- Add tasks to lists
- Mark tasks as complete
- Delete tasks
- Delete lists
- State management to keep the UI updated
- Notifications for user actions

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/mytech-today-now/MP2.git
    cd MP2
    ```

2. Install the dependencies for both the frontend and backend:
    ```sh
    npm install
    cd client
    npm install
    cd ..
    ```

## Running the Application

1. Start the backend server:
    ```sh
    npm run server
    ```

2. In a new terminal, start the frontend application:
    ```sh
    cd client
    npm start
    ```

The application should now be running on `http://localhost:3000` with the backend server running on `http://localhost:3001`.

## Folder Structure


```
lists/
├── client/
│ ├── public/
│ ├── src/
│ │ ├── App.css
│ │ ├── App.js
│ │ ├── index.js
│ │ ├── TodoList.js
│ │ └── ...
│ ├── package.json
│ └── ...
├── server.js
├── package.json
└── ...
```


## API Endpoints

### Lists

- `GET /api/lists`
  - Get all lists

- `POST /api/lists`
  - Create a new list
  - Body: `{ "listName": "New List Name" }`

- `DELETE /api/lists/:listName`
  - Delete a list

### Tasks

- `POST /api/lists/:listName/tasks`
  - Add a new task to a list
  - Body: `{ "task": "New Task" }`

- `PUT /api/lists/:listName/tasks/:taskIndex`
  - Toggle task completion

- `DELETE /api/lists/:listName/tasks/:taskIndex`
  - Delete a task from a list

## Technologies Used

- **Frontend**: React, React Hooks, CSS
- **Backend**: Node.js, Express.js
- **Notifications**: react-toastify

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Special thanks to the [React Toastify](https://fkhadra.github.io/react-toastify/) library for providing easy-to-use notifications.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

---

**Enjoy using the To-Do Lists Application!**
