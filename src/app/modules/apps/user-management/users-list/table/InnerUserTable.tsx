import DownloadIcon from "@mui/icons-material/Download";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_API_URL;

type RecruiterCall = {
  audio_player: string;
  call_duration: string;
  candidate_cell_no: string;
  mcp_score: number;
  non_tech_score: number;
  overall_score: number;
  serial_no: number;
  speech_analysis_score: number;
  technical_score: number;
};

const InnerUserTable: FC = () => {
  const [recruiterCallData, setRecruiterCallData] = useState<RecruiterCall[]>(
    []
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [reportData, setReportData] = useState({});
  const { id } = useParams();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchRecruiterCallData = async () => {
    try {
      const payload = {
        recording_date: "06-10-2024",
        device_id: id,
      };
      const response = await axios.post(
        `${API_URL}/recruiter-call-data`,
        payload
      );

      // const response = await axios.get(`${API_URL}/recruiter-call-data/${id}`);
      if (response?.status === 200) {
        setRecruiterCallData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching recruiter-call-data:", error);
    }
  };

  const handleDownload = async () => {
    const payload = {
      candidate_id: "1234",
      device_id: id,
    };
    const response = await axios.post(
      `${API_URL}/recruiter-call-report`,
      payload
    );
    if (response?.status === 200) {
      setReportData(response?.data?.data);
      setOpen(true);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRecruiterCallData();
    }
  }, []);

  return (
    <div>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Recruiter Call Details
          </span>
        </h3>
      </div>
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted">
                <th className="min-w-50px">Serial No</th>
                <th className="min-w-140px">Candidate cell</th>
                <th className="min-w-120px">Call Duration</th>
                <th className="min-w-120px">Audio Player</th>
                <th className="min-w-120px">Speech Analysis</th>
                <th className="min-w-120px">MCP</th>
                <th className="min-w-120px">Non-Tech</th>
                <th className="min-w-120px">Technical</th>
                <th className="min-w-120px">Overall Score</th>
                <th className="min-w-100px text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recruiterCallData?.length > 0 ? (
                recruiterCallData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item, index) => (
                    <tr key={index}>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        {item?.serial_no || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        {item?.candidate_cell_no || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        {item?.call_duration || "-"}
                      </td>
                      <td>
                        {/* <audio controls autoPlay={false} style={{ height: "37px" }} >
                          <source src={item?.audio_player} type="audio/mpeg" />
                       
                        </audio> */}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        {item?.speech_analysis_score || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        {item?.mcp_score || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        {item?.non_tech_score || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        {item?.technical_score || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        {item?.overall_score || "-"}
                      </td>

                      <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                        <div className="d-flex justify-content-end flex-shrink-0">
                          {/* <a
                            href="#"
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          > */}
                          <DownloadIcon
                            onClick={() => handleDownload()}
                            style={{ cursor: "pointer" }}
                          />
                          {/* </a> */}
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
          {recruiterCallData?.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 25, 100]}
              component="div"
              count={recruiterCallData.length}
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

export { InnerUserTable };
