import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import { initializeApp } from "firebase/app";
import RSVP from "./pages/RSVP";
import Massload from "./pages/Massload";
import Admin from "./pages/Admin";

const firebaseConfig = {
  apiKey: "AIzaSyAmAoy9u9tmFNbnI0wgVLZMvDS2nyy1pjQ",
  authDomain: "wkjochman.firebaseapp.com",
  projectId: "wkjochman",
  storageBucket: "wkjochman.appspot.com",
  messagingSenderId: "943008904946",
  appId: "1:943008904946:web:e07495cc548380ed64426b",
  measurementId: "G-V7DNGLEF1L",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/rsvp",
    element: <RSVP />,
  },
  {
    path: "/faq",
    element: <Navigate to="/?ref=faq" />,
  },
  {
    path: "/admin/upload",
    element: <Massload />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
