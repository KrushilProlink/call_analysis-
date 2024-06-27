import { FC, useState, useEffect } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../../../_metronic/helpers";
import axios from "axios";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TablePagination from "@mui/material/TablePagination";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const API_URL = import.meta.env.VITE_APP_API_URL;

type CallData = {
  serial_no: number;
  device_id: string;
  no_of_calls: number;
  overall_score: number;
  recruiter_name: string;
  team: string;
  total_call_duration: string;
};

const UserTable: FC = () => {
  const [allCallData, setAllCallData] = useState<CallData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

  const fetchAllCallData = async () => {
    try {
      const response = await axios.get(`${API_URL}/all-call-data`);
      if (response?.status === 200) {
        setAllCallData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching call data:", error);
    }
  };

  useEffect(() => {
    fetchAllCallData();
  }, []);

  return (
    <div>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Call Details</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted">
                <th className="min-w-50px">Serial No</th>
                <th className="min-w-140px">Device Id</th>
                <th className="min-w-120px">Recruiter Name</th>
                <th className="min-w-120px">Team</th>
                <th className="min-w-120px">No of Calls</th>
                <th className="min-w-120px">Total Call Duration</th>
                <th className="min-w-120px">Overall Score</th>
                <th className="min-w-100px text-end">Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {allCallData?.length > 0 ? (
                allCallData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        {item?.serial_no || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        {item?.device_id || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        {item?.recruiter_name || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        {item?.team || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        {item?.no_of_calls || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        {item?.total_call_duration || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        {item?.overall_score || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        <div className="d-flex justify-content-end flex-shrink-0">
                          <Box>
                            <KeyboardArrowRightIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => navigate(`${item?.device_id}`)}
                            />
                          </Box>
                        </div>
                      </td>
                    </tr>
                  ))
              ) : (
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

          {allCallData?.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 25, 100]}
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

export { UserTable };
