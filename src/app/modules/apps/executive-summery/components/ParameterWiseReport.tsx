import TablePagination from "@mui/material/TablePagination";
import { FC, useState } from "react";

type Props = {
  parameterWiseData: any;
  isLoading: boolean;
};
const ParameterWiseReport: FC<Props> = (props) => {
  const { parameterWiseData = {}, isLoading } = props;
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
          <span className="card-label fw-bold fs-3 mb-1">
            Parameter Wise Report
          </span>
        </h3>
      </div>
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table  table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted bg-primary">
                <th className="text-center text-light">DM</th>
                <th className=" text-center text-light">% Of Hygiene Calls</th>
                <th className=" text-center text-light">
                  % Of Non-Technical Calls
                </th>
                <th className=" text-center text-light">
                  % Of Technical Calls
                </th>
                <th className=" text-center text-light">
                  % Of Speech Analysis
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                parameterWiseData?.data?.length > 0 &&
                parameterWiseData?.data?.map((item: any, index: number) => (
                  <tr>
                    <td className="text-gray-900 fw-bold text-hover-primary fs-6  text-center">
                      {item?.team_name || "N/A"}
                    </td>
                    <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                      {item["Mandatory Call Protocols"]
                        ? `${item["Mandatory Call Protocols"]}%`
                        : "0%"}
                    </td>
                    <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                      {item["Non-Technical"]
                        ? `${item["Non-Technical"]}%`
                        : "0%"}
                    </td>
                    <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                      {item["Technical"] ? `${item["Technical"]}%` : "0%"}
                    </td>
                    <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                      {item["Speech Analysis"]
                        ? `${item["Speech Analysis"]}%`
                        : "0%"}
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
              {Object.keys(parameterWiseData)?.length > 0 &&
                parameterWiseData?.data?.length > 0 &&
                !isLoading && (
                  <tr style={{ background: "#80808054" }}>
                    <th className="text-center text-dark fw-bold">Total</th>
                    <th className="text-center text-dark fw-bold">
                      {parameterWiseData?.total_hygiene
                        ? `${parameterWiseData?.total_hygiene?.toFixed(2)}%`
                        : "0%"}
                    </th>
                    <th className="text-center text-dark fw-bold">
                      {parameterWiseData?.total_non_tech
                        ? `${parameterWiseData?.total_non_tech?.toFixed(2)}%`
                        : "0%"}
                    </th>
                    <th className="text-center text-dark fw-bold">
                      {parameterWiseData?.total_tech
                        ? `${parameterWiseData?.total_tech?.toFixed(2)}%`
                        : "0%"}
                    </th>
                    <th className="text-center text-dark fw-bold">
                      {parameterWiseData?.total_speech
                        ? parameterWiseData?.total_speech
                        : "0"}
                    </th>
                  </tr>
                )}
              {(Object.keys(parameterWiseData)?.length === 0 ||
                parameterWiseData?.data?.length === 0) &&
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
        </div>
      </div>
    </>
  );
};

export { ParameterWiseReport };
