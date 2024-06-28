import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { ExecutiveSummeryPage } from "./components/ExecutiveSummeryPage";
import { RecruiterCallListWrapper } from "../user-management/users-list/RecruiterCalList";
import RecruiterData from "../user-management/users-list/RecruiterData";

const ExecutiveSummeryPageWrapper = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="details"
          element={
            <>
              <PageTitle>Summary & Training</PageTitle>
              <ExecutiveSummeryPage />
            </>
          }
        />
        <Route
          path="details/recruiter-Call-Details/:id"
          element={
            <>
              <PageTitle>Recruiter Call Details</PageTitle>
              <RecruiterCallListWrapper />
            </>
          }
        />
        <Route
          path="details/recruiter-Call-Details/:id/recruiter-data"
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
        element={<Navigate to="/apps/executive-summary/details" />}
      />
    </Routes>
  );
};

export default ExecutiveSummeryPageWrapper;
