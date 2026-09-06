import '@style/vars.scss'
import "@style/clean.scss"
import "@style/font.scss"

import ReactDOM from "react-dom/client";
import { createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Link as RouterLink } from 'react-router';
import Maze from './pages/maze/Maze';
import Page from './components/PageParents/Page';

const router = createHashRouter([

  {
    path: "/",
    element: <Page />,
    children: [{
      index: true,
      element: <Maze />,
    }
    ]
  },
  {
    path: "*",
    element: <RouterLink to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}><section><h1>404 · Page Not Found</h1><h2>Return to Home</h2></section></RouterLink>
  }
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);