import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home/Home.js'
import TodoList from './components/TodoList/TodoList.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/todos",
    element: <TodoList />
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
