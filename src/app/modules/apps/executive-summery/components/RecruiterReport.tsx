import TablePagination from "@mui/material/TablePagination";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { setRecruiterDetails } from "../../../../../redux/slice/getRecruiterDetailsSlice";
import { useDispatch } from "react-redux";

type Props = {
  recruiterData: any;
  isLoading: boolean;
  date: any;
  isShowPagination: boolean;
};
const RecruiterReport: FC<Props> = (props) => {
  const { recruiterData = [], isLoading, date, isShowPagination } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleNavigate = (item: any) => {
    const data = {
      recruiter_name: item?.recruiter,
      team: item?.team_name,
      device_id: item?.device_id,
    };
    dispatch(setRecruiterDetails({ data, date }));
    navigate(`recruiter-Call-Details/${item?.device_id}`);
  };

  return (
    <>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Recruiters Report
          </span>
        </h3>
      </div>

      <div className="card-body py-3">
        <div className="table-responsive">
          <table
            className="table  table-row-gray-300 align-middle gs-0 gy-4"
            id="reports"
          >
            <thead>
              <tr className="fw-bold text-muted bg-primary">
                <th className="text-center text-light">DM</th>
                <th className="text-center text-light">Recruiter</th>
                <th className=" text-center text-light">Speech Analysis</th>
                <th className=" text-center text-light">Total Count</th>
                <th className=" text-center text-light">
                  Mandatory Call Protocols
                </th>
                <th className=" text-center text-light">Technical</th>
                <th className=" text-center text-light">Non-Technical</th>
                <th className=" text-center text-light">% Scored</th>
                <th className=" text-center text-light">Status</th>
                <th className=" text-center text-light">Stack</th>
                <th className=" text-center text-light hide">Action</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                recruiterData?.length > 0 &&
                recruiterData
                  ?.slice(
                    isShowPagination ? 0 : page * rowsPerPage,
                    isShowPagination
                      ? recruiterData?.length
                      : page * rowsPerPage + rowsPerPage
                  )

                  ?.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6  text-center">
                        {item?.team_name || "N/A"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item?.recruiter || "N/A"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item["Speech Analysis"]
                          ? `${item["Speech Analysis"]}%`
                          : "0%"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item?.total_count || "0"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item["Mandatory Call Protocols"]
                          ? `${item["Mandatory Call Protocols"]}%`
                          : "0%"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item["Technical"] ? `${item["Technical"]}%` : "0%"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item["Non-Technical"]
                          ? `${item["Non-Technical"]}%`
                          : "0%"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item["total_score"] ? `${item["total_score"]}%` : "0%"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        <div
                          className={item?.status}
                          style={{
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          {item?.status || "N/A"}
                        </div>
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item?.rank || "0"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 pe-4 hide">
                        <span
                          className="flex-shrink-0 btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm hide"
                          style={{ float: "right" }}
                        >
                          <KeyboardArrowRightIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => handleNavigate(item)}
                          />
                        </span>
                      </td>
                    </tr>
                  ))
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
              )}
              {recruiterData?.length === 0 && !isLoading && (
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
          </table>
          {recruiterData?.length > 0 && !isLoading && !isShowPagination && (
            <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              component="div"
              count={recruiterData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export { RecruiterReport };
