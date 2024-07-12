import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./layouts/MainLayout";

// Displays the element pass in for the current route the user is using, for example, the home page shows the HomePage component, so the HomePage component will be returned here
const App = () => {
  // Putting the functions that are making the requests in the App component can be useful: Centralized Request Logic and Reuseable code

  const URL = "/api";

  // Add new job
  const addJob = async (job) => {
    try {
      const response = await fetch(`${URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Job
  const deleteJob = async (jobId) => {
    try {
      const response = await fetch(`${URL}/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Job
  const editJob = async (job, jobId) => {
    try {
      const response = await fetch(`${URL}/jobs/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
      if (!response.ok) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Initialize root route and display Home page component
  const router = createBrowserRouter(
    createRoutesFromElements(
      // Any routes that are inside will use the MainLayout, this way if the pages look the same with some minor differences then we don't have to copy and paste code
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        {/* We can get data from a child component in App.jsx by passing a function to that component, calling the function in that component, then we'll get that data back here. For example, we can get the job object being submitted here by adding 'addJob' to the addJobPage component, inside that component we called it passing in the job which we'll get back here   */}
        <Route path="/add-job" element={<AddJobPage addJob={addJob} />} />
        <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage editJob={editJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
