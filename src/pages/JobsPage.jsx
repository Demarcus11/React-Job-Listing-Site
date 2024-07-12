import React from "react";
import JobListings from "../components/JobListings";

const JobsPage = () => {
  return (
    <>
      <section className="bg-blue-50 px-4 py-6">
        <JobListings title="All Jobs:" />
      </section>
    </>
  );
};

export default JobsPage;