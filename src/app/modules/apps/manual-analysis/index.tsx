import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { ManualAnalysis } from "./components/ManualAnalysis";
import { AddDomain } from "./components/AddDomain";

const ManualAnalysisWrapper = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="details"
          element={
            <>
              <PageTitle>Manual Analysis</PageTitle>
              <ManualAnalysis />
            </>
          }
        />
        <Route
          path="details/addDomain"
          element={
            <>
              <PageTitle>Upload Domain</PageTitle>
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
