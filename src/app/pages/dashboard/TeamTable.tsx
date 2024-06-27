import { FC, useState, useEffect } from "react";
import axios from "axios";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TablePagination from "@mui/material/TablePagination";
import { Link, useNavigate } from "react-router-dom";
import { Box, Rating } from "@mui/material";
import moment from "moment";

const API_URL = import.meta.env.VITE_APP_API_URL;

type CallData = {
  speech_analysis: number;
  MCP: number;
  technical: number;
  non_Technical: number;
  overall_score: number;
};

const TeamTable: FC = () => {
  const [allCallData, setAllCallData] = useState<CallData[]>([
    {
      speech_analysis: 1,
      MCP: 20,
      technical: 20,
      non_Technical: 20,
      overall_score: 20,
    },
    {
      speech_analysis: 1,
      MCP: 20,
      technical: 20,
      non_Technical: 20,
      overall_score: 20,
    },
    {
      speech_analysis: 1,
      MCP: 20,
      technical: 20,
      non_Technical: 20,
      overall_score: 20,
    },
    {
      speech_analysis: 1,
      MCP: 20,
      technical: 20,
      non_Technical: 20,
      overall_score: 20,
    },
  ]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      {/* begin::Header */}
      <div className="card-header border-0 ">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Team Wise Overall Score
          </span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table  table-row-gray-300 align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted bg-light">
                <th className="text-center">Speech Analysis</th>
                <th className="text-center">MCP</th>
                <th className=" text-center">Technical</th>
                <th className=" text-center">Non-Technical</th>
                <th className="pe-2">Overall</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {!isLoading ? (
                allCallData?.length > 0 &&
                allCallData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item: any, index: number) => (
                    <tr>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6  text-center">
                        {item?.speech_analysis || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item?.MCP || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item?.technical || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item?.non_Technical || "-"}
                      </td>
                      <td className="pe-2">
                        <div className="d-flex flex-column w-100 me-2">
                          <div className="d-flex flex-stack mb-2">
                            <span className="text-muted me-2 fs-7 fw-semibold">
                              {item?.overall_score}%
                            </span>
                          </div>
                          <div className="progress h-6px w-100">
                            <div
                              className="progress-bar bg-primary"
                              role="progressbar"
                              style={{ width: `${item?.overall_score}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
              ) : isLoading ? (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center text-gray-900 fw-bold  fs-6"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "160px 0",
                      }}
                    >
                      <span
                        className="spinner-border text-primary"
                        role="status"
                      ></span>
                      <span className="text-muted fs-6 fw-semibold mt-5">
                        Loading...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center text-gray-900 fw-bold  fs-6"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "160px 0",
                      }}
                    >
                      <span className="text-muted fs-6 fw-semibold mt-5">
                        No Data Found
                      </span>
                    </div>
                  </td>
                </tr>
              )}
              {allCallData?.length === 0 && !isLoading && (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center text-gray-900 fw-bold  fs-6"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
            {/* end::Table body */}
          </table>
          {allCallData?.length > 0 && !isLoading && (
            <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              component="div"
              count={allCallData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  );
};

export default TeamTable;
