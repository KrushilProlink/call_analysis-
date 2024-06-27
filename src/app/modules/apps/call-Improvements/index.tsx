import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { CallImProvementPage } from "./components/CallImProvementPage";

const CallImprovementPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="details"
          element={
            <>
              <PageTitle>Call Improvements</PageTitle>
              <CallImProvementPage />
            </>
          }
        />
      </Route>
      <Route
        index
        element={<Navigate to="/apps/call-Improvements/details" />}
      />
    </Routes>
  );
};

export default CallImprovementPage;
