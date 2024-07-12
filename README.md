# Why React?

React allows us to build very dynamic and interactive UIs. As you saw with the software project management system app, even a "small" scale UI got very unorganized, error prone, difficult to maintain.

React is also more efficent than vanilla JS due to the use of the Virtual DOM.

## Virtual DOM

The Virtual DOM is a copy of the real DOM and allows us to make efficent updates to the real DOM, we can look at an example at show:

Let's take this JS code that adds a new item to a list:

    ```javascript
    const addNewListItem = () => {
        const list = document.querySelector(".list");
        const item = document.create("li");
        item.innerHTML = "<p>List Item</p>";

        list.append(item);
    }

    listAddBtn.addEventListener("click", addNewListItem);
    ```

When not using a virutal DOM, we are doing manipulations to the real DOM. This code is simply adding one new list element to the list, but the browser will re-render the entire list just to add one new item because the browser can't "see" what changed in the DOM and will re-run that entire code block everytime to add button is clicked.

Now, we can improve this by keeping a copy of the real DOM (Virtual DOM) and updating that first, then we compare the Virtual DOM to the real DOM and we can pinpoint where the changes happened and only send the most efficent code to the browser. In the example above, we really only need to send:

    ```javascript
    const item = document.create("li");
    item.innerHTML = "<p>List Item</p>";

    list.append(item);
    ```

this amount of code to the browser because that's all that changed. We didn't need to grab the list again because React knows what list changed because the comparison it made with the Virutal DOM and Real DOM. So all it needs to send is a new list item and the code inside that list item and append it to the list:

    ```javascript
    const item = document.create("li");
    item.innerHTML = "<p>List Item</p>";

    list.append(item);
    ```

Not grabbing the list (which makes the browser re-render the entire list), will boost performace by sending the very minimal code needed to update the UI.

## Components

Components are functions that return re-useable pieces of UI code, basically custom HTML elements. This makes HTML code much clean because we don't have to repeat a bunch of the same elements when their function and look is the same, just different locations. As you say with the software project management app, there was a lot of repeat elements such as modals, buttons, inputs, etc and it got very messy to maintain.

We can use 'wrapper components' for things such as cards:

    ```javascript
    const Card = ({ children, bg = "bg-gray-100" }) => {
        return (
            <>
            <div className={`${bg} p-6 rounded-lg shadow-md`}>{children}</div>
            </>
        );
    };

    // HomeCards.jsx
    const HomeCards = () => {
        return (
            <>
            <section className="py-4">
                <div className="container-xl lg:container m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                    <Card>
                        <h2 className="text-2xl font-bold">For Developers</h2>
                        <p className="mt-2 mb-4">Browse our React jobs and start your career today</p>
                        <a
                            href="/jobs.html"
                            className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
                        >
                            Browse Jobs
                        </a>
                    </Card>

                    <Card bg="bg-indigo-100">
                        <h2 className="text-2xl font-bold">For Employers</h2>
                        <p className="mt-2 mb-4">List your job to find the perfect developer for the role</p>
                        <a
                            href="/add-job.html"
                            className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
                        >
                            Add Job
                        </a>
                    </Card>
                </div>
                </div>
            </section>
            </>
        );
    };
    ```

The HomeCards component holds the section for the cards and we use our card wrapper component to encapuslate the body of each card and can pass props to change the bg color if needed. Then inside App.jsx we can pass the <HomeCards /> component which will hold all the cards inside.

### Props

Since components are functional and not class based anymore, props are like parameters/arguments for the components, so we can use the same HTML code but with different text to change what its saying for different locations.

We can take in an object called props as the parameter for the component's function:

    ```javascript
    const Hero = (props) => {
        return (
            <>
            <section className="bg-indigo-700 py-20 mb-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                    {props.title}
                    </h1>
                    <p className="my-4 text-xl text-white">{props.subtitle}</p>
                </div>
                </div>
            </section>
            </>
        );
    };
    ```

We can use this objects properties as attributes on the component:

    ```javascript
    <Hero title="Test title" subtitle="This is the subtitle" />
    ```

Then more common way is to destruture the props object to just get the properties out of it:

    ```javascript
    const Hero = ({ title, subtitle }) => {
        return (
            <>
            <section className="bg-indigo-700 py-20 mb-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                    {title}
                    </h1>
                    <p className="my-4 text-xl text-white">{subtitle}</p>
                </div>
                </div>
            </section>
            </>
        );
    };
    ```

We can also give default values to props (which isn't a React feature but a vanilla JS feature) for a fallback incase props arent passed in:

    ```javascript
    const Hero = ({
        title = "Become a React Dev",
        subtitle = "Find the React job that fits your skill set",
        }) => {
        return (
            <>
            <section className="bg-indigo-700 py-20 mb-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">{title}</h1>
                    <p className="my-4 text-xl text-white">{subtitle}</p>
                </div>
                </div>
            </section>
            </>
        );
    };
    ```

### State

Components also have their own state, similar to how functions have their own state in vanilla JS. State in React represents the data that a component manages internally. There is also global state which relates to the app as a whole and not a single component.

An example of component state is a show more button on card components:

    ```javascript
    import { useState } from "react";

    const JobListing = ({ job }) => {
        const [showFullDescription, setShowFullDescription] = useState(false);

        let description = job.description;
        let shortenedDescription = description.substring(0, 90) + "...";

        return (
            <>
            <div className="bg-white rounded-xl shadow-md relative">
                <div className="p-4">
                <div className="mb-6">
                    <div className="text-gray-600 my-2">{job.type}</div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                </div>

                <div className="mb-5">{showFullDescription ? description : shortenedDescription}</div>

                <button
                    onClick={() => setShowFullDescription((prevState) => !prevState)}
                    className="text-indigo-500 mb-5 hover:text-indigo-600"
                >
                    {showFullDescription ? "Show Less..." : "Show More..."}
                </button>

                <h3 className="text-indigo-500 mb-2">{job.salary} / Year</h3>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="text-orange-700 mb-3">
                    <i className="fa-solid fa-location-dot text-lg"></i>
                    {job.location}
                    </div>
                    <a
                    href={`/job/${job.id}`}
                    className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                    Read More
                    </a>
                </div>
                </div>
            </div>
            </>
        );
    };
    ```

Each JobListing component has its own showFullDescription state variable independent of the other JobListing components, so if we create a loop to display many JobListings:

    ```javascript
    {recentJobs.map((job) => (
        <JobListing key={job.id} job={job} />
    ))}
    ```

Each JobListing can be toggled on it own because the state of each JobListing is inside its own component's function call. This is why its important to put component state inside the function above the return. If you were to put it above the function, then it would be global state.

## Font Awesome Icons

Instead of using the cdn, we can use a package to import font awesome icons as components:

    ```shell
    npm install react-icons
    ```

Once installed you can go to any component and import the icon from "react-icons/fa":

    ```javascript
    import { FaMapMarker } from "react-icons/fa";
    ```

## React Router

React router is the "offical" router for React but its a seperate package. The reason you need a seperate package for this is a big reason why React is a "library" and not a "framework" because a framework would have something like this built in, but React doesn't:

    ```shell
    npm i react-router-dom
    ```

You want to put the routing in the App.jsx file:

    ```javascript
    // App.jsx

    import {
        Route,
        createBrowserRouter,
        createRoutesFromElements,
        RouterProvider,
    } from "react-router-dom";

    // Initialize root route as "/" and display the HomePage component
    const router = createBrowserRouter(
        createRoutesFromElements(<Route index element={<HomePage />} />)
    );

    // Example for creating a route for "/about" and displaying the AboutPage
    const router = createBrowserRouter(
        createRoutesFromElements(<Route path="/about" element={<AboutPage />} />)
    );

    // App returns the routes for each page
    const App = () => {
        return <RouterProvider router={router} />;
    };
    ```

We can then create a pages folder inside src and build the layouts of each page such as HomePage, AboutPage, etc:

        ```javascript
        // HomePage.jsx
        import Navbar from "../components/Navbar";
        import Hero from "../components/Hero";
        import HomeCards from "../components/HomeCards";
        import JobListings from "../components/JobListings";
        import ViewAllJobs from "../components/ViewAllJobs";

        const HomePage = () => {
            return (
                <>
                    <Navbar />
                    <Hero />
                    <HomeCards />
                    <JobListings />
                    <ViewAllJobs />
                </>
            );
        };
        ```

You'll also see a layouts folder with probably a MainLayout component. Many sites have a navbar or sidebar on every page of the site. Instead of repeating that navbar or sidebar component inside every component file, we can create a MainLayout component to use in our router to add a component to every page:

    ```javascript
    // App.jsx
    const router = createBrowserRouter(
        createRoutesFromElements(
            // path attribute is the route the MainLayout is displayed on
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
            </Route>
        )
    );

    // MainLayout.jsx
    import { Outlet } from "react-router-dom";
    import Navbar from "../components/Navbar";

    // This is what will show on every page
    const MainLayout = () => {
        return (
            <>
                <Navbar />
                <Outlet />
            </>
        );
    };
    ```

The HomePage component will be passed to a component called Outlet which can be imported inside the MainLayout component. Whatever route the user is on, the component being displayed will be passed to the Outlet component and placed where the Outlet component is inside MainLayout. This is similar to slots in Astro. This way we can place something like a nav or sidebar on every route without duplicating code.

Instead of a tags we use Link components because a tags will refresh the page when going to a new route and the Link component wont which makes switch pages very fast because its all client side and the browser doesn't have to fetch the html page:

        ```javascript
        // Navbar.jsx
        import { Link } from "react-router-dom";

        // instead of the attribute "href", use "to"
        <Link
        to="/"
        className="text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
        >
            Home
        </Link>
        ```

Now NavLink is the same as Link except it gives us an isActive variable which turns true when the "to" attribute's route is active.

        ```javascript
        import { NavLink } from "react-router-dom";

        // if isActive then add bg-black else remove bg-black
        <NavLink
            to="/"
            className={({ isActive }) => // isActive can be destructed from the object that NavLink gives
                isActive
                ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
            }
        >
            Home
        </NavLink>
        ```

## JSON server package

JSON server is a library that allows you to create a mock API when building the frontend for applications. You can send GET, POST, PATCH, DELETE requests to simulate CRUD functionality. Its a dev dependency because its only purpose is to help us devs have a mock backend:

    ```shell
    npm i -D json-server
    ```

To start the server, inside package.json we can add a script:

    ```json
    "server": "json-server --watch src/jobs.json --port 5000"
    ```

Now json server is running on localhost which is fine for development purposes, but if we were to push this to production it would no longer be on localhost, so we need a "proxy". Inside the vite config file:

    ```javascript
    // vite.config.js
    import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";

    // https://vitejs.dev/config/
    export default defineConfig({
        plugins: [react()],
        server: {
            port: 3000,
            // add a proxy here: we're giving localhost an alias of "/api", so when we fetch("/api/jobs") it's really hitting "http:localhost:5000/jobs" so json server works but when we push to production then /api/jobs will work because the backend will have that route
            proxy: {
                "/api": { // must be "/api" to work, "/api/v1" or anything else won't work
                    target: "http:localhost:5000",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, "")
                }
            }
        },
    });
    ```

This will create endpoints as the properties in the json file in your src folder. In jobs.json we have 2 properties: count and jobs. It will create resouces: "/count" and "/jobs" -> "http://localhost:5000/count" and "http://localhost:5000/jobs". We can perform CRUD operations on these endpoints.

## Data Fetching

We want to use the useEffect hook to fetch data because when we pass an empty array as thr dependency then it will fetch everytime the component is loaded. useEffect is a hook that runs side effects when the component loads, "side effect on render", so in this code were fetching data everytime a JobsListing component is loaded:

    ```javascript
    // JobsListing.jsx
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true); // starts as true because it will load first because its fetching when the component loads then we'll set it to false once its loaded

    const URL = "/api";
    // we use a useEffect because we want to fill the jobs array everytime the component loads.
    useEffect(() => {
        // useEffect doesn't allow the callback to be async so we must create an async function inside the useEffect and call it to do async operations
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${URL}/jobs`);
                // Remember, fetch won't throw an error and drop down to the catch just because the server sends an error, so we need to check if the server threw an error using !response.ok (which checks for 200 response) and we can error handle inside the if statement.
                if (!response.ok) {
                    // handle server errors here
                    return;
                }
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                // handle non-server errors here, such as incorrect URL
                console.log(`Error fetching data: ${error}`);
            } finally {
                // loading should stop wheter its sucessfully or not, so we add a finally block because the finally block will always run
                setLoading(false);
            }
        };
        fetchJobs();
    }, []); // dependency will run this function everytime it changes, if you only want it to run once then use an empty array

    // Now we can use the jobs state variable to access the jobs after its been fetched
    console.log(jobs);
    ```

When you need something such as a jobId, you can use the useParams hook to destructure the jobId from the request params:

    ```javascript
    // JobPage.jsx
    import { useParams } from "react-router-dom";

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id: jobId } = useParams(); // gave the id an alias of jobId
    const URL = `/api`;
    useEffect(() => {
      const fetchJob = async () => {
        try {
          const response = await fetch(`${URL}/jobs/${jobId}`);

          if (!response.ok) {
            return;
          }

          const data = await response.json();
          setJob(data);
        } catch (error) {
          console.log(`Error fetching data: ${error}`);
        } finally {
          setLoading(false);
        }
      };
      fetchJob();
    }, []);
    ```

Now this method is fine if the data only needs to be used in that file, but if we need data to be used in different files then we have to use a data loader:

    ```javascript
    // JobPage.jsx
    import { useParams } from "react-router-dom";

    const JobPage = () => {
        // component's function...
    }

    // data loader function here
    const jobLoader = async ({ params }) => {
        const URL = `/api`;

        try {
            const response = await fetch(`${URL}/jobs/${params.id}`);

            if (!response.ok) {
                return;
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    // then we can export the data loader function
    export { JobPage as default, jobLoader };
    ```

Then in App.jsx, we can import the data loader and use the loader attribute on any route that needs the data:

    ```javascript
    // App.jsx
    import JobPage, { jobLoader } from "./pages/JobPage";

    <Route path="/jobs/:id" element={<JobPage />} loader={jobLoader} />

    // JobPage.jsx
    import { useLoaderData } from "react-router-dom";

    const JobPage = () => {
        const job = useLoaderData();
        console.log(job);
    }
    ```

Then in JobsPage

## React Loader Library

We can get loading spinners by installing the library:

    ```bash
    npm i react-spinners
    ```

You can then create a new component: Spinner.jsx:

    ```javascript
    // Spinner.jsx
    import React from "react";
    import ClipLoader from "react-spinners/ClipLoader";

    // custom css to center the loader
    const override = {
        display: "block",
        margin: "100px auto",
    };

    // takes in the loading state variable from the component that's using the loader because different components can have different loading states
    const Spinner = ({ loading }) => {
        return <ClipLoader color="#4338ca" loading={loading} cssOverride={override} size={150} />;
    };

    export default Spinner;
    ```

## Single Page App (SPA)

A single page app is a app that loads a single HTML file and JS injects content for the UI including routes into that single HTML file. This project is a SPA. For example, when you go to /about, its not getting that html page from the server, the JS is injecting that content for the about page to into the single HTML file which is why you'll see a single div with id="app" because the content inside comes from JS.

Now, this has some disadvantages such as initial page load times and SEO. The initial page load times can be a problem because its injecting content from JS and not having the content already in the HTML, so that extra step can increase load times. SEO is because the content is coming from JS and SEO checker does it checks on the server version of the HTML and there won't be any content in the HTMl intitially. This is where SSR and SSG come in.

## Vite

Vite is a frontend toolkit that is used to generate JS projects including React. It has a built-in fast development server with hot-reload, so there's no need for libraries like nodemon. You use npm create vite@latest to use the cli.

### Vite file structure

- Vite config file:

  - This is the settings for the dev server such as PORT, plugins, etc.

  - Changing the PORT is a good idea because by default its on 5173, but 3000 is good for frontend stuff.

- index.html

  - Vite by default generates a SPA (Single Page App), so you'll get a single index.html file that has a single div inside with id="root" and a script that's importing "main.jsx".

- src folder

  - This is where the React app is and the entry point is main.jsx.

  - App.jsx is the 'index.html / homepage' of your app. Don't confuse it with the entry point which is just the file that renders the app. App.jsx is a component for your index page. We can create the boilerplate for a React component using the ES7 React snippets VSCode extension and typing: "rafce" which is short for React-Arrow-Function-Component-Export.

```

```
#   R e a c t - J o b - L i s t i n g - S i t e  
 