import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { ManualAnalysis } from "./components/ManualAnalysis";
import { AddDomain } from "./components/AddDomain";
import { ManualAnalysisPage } from "./ManualAnalysisPage";

const ManualAnalysisWrapper = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="details"
          element={
            <>
              <PageTitle>Analysis</PageTitle>
              <ManualAnalysisPage />
            </>
          }
        />
        <Route
          path="details/uploadFile"
          element={
            <>
              <PageTitle>Upload</PageTitle>
              <AddDomain />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/apps/manual-analysis/details" />} />
    </Routes>
  );
};

export default ManualAnalysisWrapper;
