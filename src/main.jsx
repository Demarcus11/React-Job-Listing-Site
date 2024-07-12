import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*

Inside this file:

  - Importing 'React' library
  - Importing 'ReactDOM' library which allows React to work with the DOM
  - Using the ReactDOM's library 'createRoot' and pass in the root div to create the root node for the VDOM,
  and also called the render method to render the JSX as HTML inside the root div.
  - <React.StrictMode> is a wrapper component that checks for errors in code inside such as deprecated and unsafe
    lifecycle methods, legacy context API usage etc. It runs the components twice, so you'll see things like 
    console.logs log twice in the console.
*/
