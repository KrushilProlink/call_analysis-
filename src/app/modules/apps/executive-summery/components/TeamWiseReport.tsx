import TablePagination from "@mui/material/TablePagination";
import { FC, useState } from "react";

type Props = {
  teamWiseData: any;
  isLoading: boolean;
};

const TeamWiseReport: FC<Props> = (props) => {
  const { teamWiseData = {}, isLoading } = props;
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
  return (
    <>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Team Wise Report</span>
        </h3>
      </div>
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table  table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted bg-primary">
                <th className="text-center text-light">DM</th>
                <th className="text-center text-light">
                  No Of Rejected Recruiters
                </th>
                <th className=" text-center text-light ">
                  No Of Considerable Recruiters
                </th>
                <th className=" text-center text-light">
                  No Of Selected Recruiters
                </th>
                <th className="text-center text-light">
                  % Of Rejected Recruiters (Below 79%)
                </th>
                <th className=" text-center text-light ">
                  % Of Considerable Recruiters (80-89%)
                </th>
                <th className=" text-center text-light">
                  % Of Selected Recruiters (90 & Above)
                </th>
                <th className="text-center text-light">
                  Total Call Recruiters
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                teamWiseData?.data?.length > 0 &&
                teamWiseData?.data?.map((item: any, index: number) => (
                  <tr>
                    <td className="text-gray-900 fw-bold text-hover-primary fs-6  text-center">
                      {item?.team_name || "N/A"}
                    </td>

                    <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                      {item?.Rejected ? `${item?.Rejected}` : "0"}
                    </td>
                    <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                      {item?.Considerable ? `${item?.Considerable}` : "0"}
                    </td>
                    <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                      {item?.Selected ? `${item?.Selected}` : "0"}
                    </td>
                    <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                      {item?.rejected_p
                        ? `${item?.rejected_p?.toFixed(2)}%`
                        : "0%"}
                    </td>
                    <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                      {item?.considerable_p
                        ? `${item?.considerable_p?.toFixed(2)}%`
                        : "0%"}
                    </td>
                    <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                      {item?.selected_p
                        ? `${item?.selected_p?.toFixed(2)}%`
                        : "0%"}
                    </td>
                    <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                      {item?.total || "0"}
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

              {Object.keys(teamWiseData)?.length > 0 &&
                teamWiseData?.data?.length > 0 &&
                !isLoading && (
                  <tr style={{ background: "#80808054" }}>
                    <th className="text-center text-dark fw-bold">Total</th>
                    <th className="text-center text-dark fw-bold">
                      {teamWiseData?.recruiter_total_rejected
                        ? teamWiseData?.recruiter_total_rejected
                        : "0"}
                    </th>
                    <th className="text-center text-dark fw-bold">
                      {teamWiseData?.recruiter_total_considerable
                        ? teamWiseData?.recruiter_total_considerable
                        : "0"}
                    </th>
                    <th className="text-center text-dark fw-bold">
                      {teamWiseData?.recruiter_total_selected
                        ? teamWiseData?.recruiter_total_selected
                        : "0"}
                    </th>
                    <th className="text-center text-dark fw-bold">
                      {teamWiseData?.recruiter_total_percentage_rejected
                        ? `${teamWiseData?.recruiter_total_percentage_rejected?.toFixed(
                            2
                          )}%`
                        : "0%"}
                    </th>
                    <th className="text-center text-dark fw-bold">
                      {teamWiseData?.recruiter_total_percentage_considerable
                        ? `${teamWiseData?.recruiter_total_percentage_considerable?.toFixed(
                            2
                          )}%`
                        : "0%"}
                    </th>
                    <th className="text-center text-dark fw-bold">
                      {teamWiseData?.recruiter_total_percentage_selected
                        ? `${teamWiseData?.recruiter_total_percentage_selected?.toFixed(
                            2
                          )}%`
                        : "0%"}
                    </th>
                    <th className="text-center text-dark fw-bold">
                      {teamWiseData?.recruiter_total_records
                        ? teamWiseData?.recruiter_total_records
                        : "0"}
                    </th>
                  </tr>
                )}

              {(Object.keys(teamWiseData)?.length === 0 ||
                teamWiseData?.data?.length === 0) &&
                !isLoading && (
                  <tr>
                    <td
                      colSpan={10}
                      className="text-center text-gray-900 fw-bold fs-6"
                    >
                      No Data Found
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
          {/* {teamWiseData?.length > 0 && !isLoading && (
            <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              component="div"
              count={teamWiseData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )} */}
        </div>
      </div>
    </>
  );
};

export { TeamWiseReport };
