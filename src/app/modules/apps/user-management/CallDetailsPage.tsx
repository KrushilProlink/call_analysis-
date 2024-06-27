import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { CallListWrapper } from "./users-list/CallList";
import { RecruiterCallListWrapper } from "./users-list/RecruiterCalList";
import RecruiterData from "./users-list/RecruiterData";

const CallDetailsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="callDetails"
          element={
            <>
              <PageTitle>Call Analysis</PageTitle>
              <CallListWrapper />
            </>
          }
        />
        <Route
          path="callDetails/:id"
          element={
            <>
              <PageTitle>Recruiter Call Details</PageTitle>
              <RecruiterCallListWrapper />
            </>
          }
        />
        <Route
          path="callDetails/:id/recruiter-data"
          element={
            <>
              <PageTitle>Recruiter Data</PageTitle>
              <RecruiterData />
            </>
          }
        />
      </Route>
      <Route
        index
        element={<Navigate to="/apps/call-analysis/callDetails" />}
      />
    </Routes>
  );
};

export default CallDetailsPage;
