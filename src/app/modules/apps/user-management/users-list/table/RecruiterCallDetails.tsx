import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { KTIcon } from "../../../../../../_metronic/helpers";
import { setRecruiterReportDetails } from "../../../../../../redux/slice/getRecruiterReportSlice";

const API_URL = import.meta.env.VITE_APP_API_URL;

const RecruiterCallDetails: FC = () => {
  const [recruiterCallData, setRecruiterCallData]: any = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [audioDetails, setAudioDetails] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, date } = useSelector(
    (state: any) => state?.getRecruiterDetails
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setShowAudioModal(false);
  };

  const fetchRecruiterCallData = async () => {
    setIsLoading(true);
    try {
      const payload = {
        start_date: date?.startDate,
        end_date: date?.endDate,
        device_id: id,
      };
      const response = await axios.post(
        `${API_URL}/recruiter-call-data`,
        payload
      );

      if (response?.status === 200) {
        setRecruiterCallData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching recruiter-call-data:", error);
    }
    setIsLoading(false);
  };

  const handleDownload = async (cellNo: string) => {
    const payload = {
      candidate_number: cellNo,
      device_id: id,
    };
    const response = await axios.post(
      `${API_URL}/recruiter-call-report`,
      payload
    );
    if (response?.status === 200) {
      dispatch(setRecruiterReportDetails(response?.data?.data));
      navigate("recruiter-data");
    }
  };

  useEffect(() => {
    if (id) {
      fetchRecruiterCallData();
    }
  }, []);

  return (
    <>
      <>
        <div className="card-header border-0 pt-6">
          <div>
            <button
              type="button"
              className="btn btn-light-primary"
              onClick={() => navigate(-1)}
            >
              <span>
                <ChevronLeftIcon className="fs-1" />
              </span>
              <span className="">Back</span>
            </button>
          </div>
          <div className="" data-kt-user-table-toolbar="base">
            <button
              type="button"
              className="btn btn-light-primary me-3 "
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
            >
              <KTIcon iconName="filter" className="fs-2" />
              Filter
            </button>
            <div
              className="menu menu-sub menu-sub-dropdown w-300px w-md-325px"
              data-kt-menu="true"
            >
              <div className="px-7 py-5">
                <div className="fs-5 text-gray-900 fw-bolder">
                  Filter Options
                </div>
              </div>

              <div className="px-7 py-5" data-kt-user-table-filter="form">
                <div className="mb-10">
                  <label className="form-label fs-6 fw-bold">Date:</label>
                  <input type="date" name="" className="form-control" id="" />
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-light btn-active-light-primary fw-bold me-2 px-6"
                    data-kt-menu-dismiss="true"
                    data-kt-user-table-filter="reset"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary fw-bold px-6"
                    data-kt-menu-dismiss="true"
                    data-kt-user-table-filter="filter"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* <button type="button" className="btn btn-light-primary me-3">
            <KTIcon iconName="exit-up" className="fs-2" />
            Export
          </button> */}
          </div>
        </div>
        <div>
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">
                {`${data?.recruiter_name} (${data?.team}) - ${data?.device_id}`}
                <br />
                Analysis for{" "}
                {`${moment(date?.startDate, "DD-MM-YYYY").format(
                  "DD, MMMM YYYY"
                )}
                To ${moment(date?.endDate, "DD-MM-YYYY").format(
                  "DD, MMMM YYYY"
                )}`}
              </span>
              {/* <span className="text-muted mt-1 fw-semibold fs-7">
                  Recruiter Call Details
                </span> */}
            </h3>
          </div>
          <div className="card-body py-3">
            <div className="table-responsive">
              <table className="table table-row-gray-300 align-middle gs-0 gy-4">
                <thead>
                  <tr className="fw-bold text-muted bg-light">
                    <th className="text-center">Serial No</th>
                    <th className="">Candidate cell</th>
                    <th className=" text-center">Audio Player</th>
                    <th className="text-center">Speech Analysis</th>
                    <th className="text-center">MCP</th>
                    <th className="text-center">Non-Tech</th>
                    <th className="text-center">Technical</th>
                    <th className="">Overall Score</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading ? (
                    recruiterCallData?.length > 0 &&
                    recruiterCallData
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((item: any, index: number) => (
                        <tr>
                          <td className=" text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                            {item?.serial_no || "-"}
                          </td>
                          <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                            <a
                              href="#"
                              className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                            >
                              {item?.candidate_number || "-"}
                            </a>
                            <span className="text-muted fw-semibold text-muted d-block fs-7">
                              {item?.call_duration || "-"}
                            </span>
                          </td>
                          {item?.audio_files?.length == 1 ? (
                            <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                              <audio
                                controls
                                // autoPlay
                                style={{ height: "37px" }}
                                controlsList="nodownload"
                              >
                                <source
                                  src={item?.audio_files}
                                  type="audio/mpeg"
                                />
                              </audio>
                            </td>
                          ) : (
                            <td
                              className="text-gray-900 fw-bold text-hover-primary fs-6 text-center"
                              style={{ cursor: "pointer" }}
                            >
                              <div
                                onClick={() => {
                                  setAudioDetails(item?.audio_files);
                                  setShowAudioModal(true);
                                }}
                              >
                                {item?.audio_files?.length} Files
                              </div>
                            </td>
                          )}
                          <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                            {item["Speech Analysis"] || "-"}
                          </td>
                          <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                            {item["Mandatory Call Protocols"] || "-"}
                          </td>
                          <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                            {item["Non-Technical"] || "-"}
                          </td>
                          <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                            {item?.Technical || "-"}
                          </td>
                          <td className="text-end text-gray-900 fw-bold text-hover-primary fs-6">
                            <div className="d-flex flex-column w-100 me-2">
                              <div className="d-flex flex-stack mb-2">
                                <span className="text-muted me-2 fs-7 fw-semibold">
                                  {item?.total_score}%
                                </span>
                              </div>
                              <div className="progress h-6px w-100">
                                <div
                                  className="progress-bar bg-primary"
                                  role="progressbar"
                                  style={{ width: `${item?.total_score}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>

                          <td className="text-gray-900 fw-bold text-hover-primary pe-4">
                            <span
                              className="flex-shrink-0 btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm"
                              style={{ float: "right" }}
                              onClick={() =>
                                handleDownload(item?.candidate_number)
                              }
                            >
                              <VisibilityIcon style={{ cursor: "pointer" }} />
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
                  {!isLoading && recruiterCallData?.length === 0 && (
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

              {/* {/ {recruiterCallData?.length > 0 && isLoading && ( /}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={recruiterCallData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                {/ )} /} */}
            </div>
          </div>
        </div>
      </>

      <Modal
        id="kt_modal_create_app"
        aria-hidden="true"
        dialogClassName="modal-dialog modal-dialog-centered mw-350px"
        show={showAudioModal}
        onHide={handleClose}
        backdrop={true}
      >
        <div className="d-flex align-items-center justify-content-between py-5 ps-8 pe-5 border-bottom">
          <h5 className="fw-bold m-0">Audio Player</h5>
          <div className="d-flex ms-2">
            <div
              className="btn btn-icon btn-sm btn-light-primary ms-2"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              <KTIcon className="fs-1" iconName="cross" />
            </div>
          </div>
        </div>

        <div className="modal-body py-lg-10 px-lg-10">
          {audioDetails.map((item: any, index: number) => (
            <>
              <audio
                controls
                style={{ height: "37px", marginLeft: "-10px" }}
                controlsList="nodownload"
              >
                <source src={item} type="audio/mpeg" />
              </audio>
              <br />
            </>
          ))}
        </div>
      </Modal>
    </>
  );
};

export { RecruiterCallDetails };
