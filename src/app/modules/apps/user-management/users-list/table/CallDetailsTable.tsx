import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Rating } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KTIcon, toAbsoluteUrl } from "../../../../../../_metronic/helpers";
import {
  addItem,
  deleteItem,
} from "../../../../../../redux/slice/getCallDataSlice.tsx";

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

const CallDetailsTable: FC = () => {
  const [allCallData, setAllCallData] = useState<CallData[]>([]);
  const [allCallDate, setAllCallDate] = useState<any>("");
  const [team, setTeam] = useState<any>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterData = useSelector((state: any) => state?.callDetails?.data);
  const teamName = useSelector((state: any) => state?.callDetails?.teamName);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeam(event.target.value);
  };
  const handleSelectDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleResetFilter = () => {
    setDate("");
    setTeam("");
    dispatch(deleteItem());
  };

  const fetchAllCallData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/all-call-data`);
      setIsLoading(false);
      if (response?.status === 200) {
        setAllCallData(response?.data?.data);
        setAllCallDate(response?.data?.recording_date);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching call data:", error);
    }
    setIsLoading(false);
  };

  const fetchTeamData = async () => {
    try {
      const response = await axios.get(`${API_URL}/team-names`);

      if (response?.status === 200) {
        setTeamData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching call data:", error);
    }
  };

  const filterAllCallData = async () => {
    const recording_date = moment(date).format("DD-MM-YYYY");
    try {
      const data: any = {};
      if (recording_date && recording_date != "Invalid date")
        data.recording_date = recording_date;
      if (team) data.team_name = team;

      try {
        const response = await axios.post(`${API_URL}/all-call-data`, data);
        setIsLoading(false);
        if (response?.status === 200) {
          setAllCallData(response?.data?.data);
          dispatch(addItem({ data: response?.data, teamName: team }));
          setAllCallDate(response?.data?.recording_date);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("API call error:", error);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching call data:", error);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  useEffect(() => {
    if (
      filterData === undefined ||
      filterData?.length === 0 ||
      filterData?.data?.length === 0
    ) {
      fetchAllCallData();
    } else {
      setAllCallData(filterData?.data);
      setAllCallDate(filterData?.recording_date);
      const recording_date = moment(
        filterData?.recording_date,
        "DD-MM-YYYY"
      ).format("YYYY-MM-DD");

      setDate(recording_date);
      setTeam(teamName);
    }
  }, [filterData]);

  return (
    <div>
      <div className="card-header border-0 pt-6">
        <div></div>
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
              <div className="fs-5 text-gray-900 fw-bolder">Filter Options</div>
            </div>

            <div className="px-7 py-5" data-kt-user-table-filter="form">
              <div className="mb-10">
                <label className="form-label fs-6 fw-bold">Team:</label>
                <select
                  className="form-select form-select-solid form-control"
                  data-kt-select2="true"
                  data-placeholder="Select option"
                  data-allow-clear="true"
                  defaultValue={"1"}
                  onChange={(e: any) => handleChangeSelect(e)}
                  value={team}
                >
                  {teamData.map((val) => (
                    <option value={val}>{val}</option>
                  ))}
                </select>
              </div>
              <div className="mb-10">
                <label className="form-label fs-6 fw-bold">Date:</label>
                <input
                  type="date"
                  name=""
                  className="form-control"
                  id=""
                  value={date}
                  onChange={handleSelectDate}
                />
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-light btn-active-light-primary fw-bold me-2 px-6"
                  data-kt-menu-dismiss="true"
                  data-kt-user-table-filter="reset"
                  onClick={handleResetFilter}
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="btn btn-primary fw-bold px-6"
                  data-kt-menu-dismiss="true"
                  data-kt-user-table-filter="filter"
                  onClick={filterAllCallData}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Analysis for{" "}
            {moment(allCallDate, "DD-MM-YYYY").format("DD, MMMM YYYY")}
          </span>
        </h3>
      </div>
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table  table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted bg-light">
                <th className="text-center">Serial No</th>
                <th className="">Recruiter Name</th>
                <th className=" text-center">No of Calls</th>
                <th className=" text-center">Call Duration (HH:mm)</th>
                <th className="">Overall Score</th>
                <th className="">Rating</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                allCallData?.length > 0 &&
                allCallData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item: any, index: number) => (
                    <tr>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6  text-center">
                        {item?.serial_no || "-"}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-45px me-5">
                            <img
                              src={toAbsoluteUrl("media/avatars/blank.png")}
                              className="h-75 align-self-end"
                              alt=""
                            />
                          </div>
                          <div className="d-flex justify-content-start flex-column">
                            <a
                              href="#"
                              className="text-gray-900 fw-bold text-hover-primary fs-6"
                            >
                              {item?.recruiter_name || "-"}
                            </a>
                            <span className="text-muted fw-semibold text-muted d-block fs-7">
                              {item?.team} - {item?.device_id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item?.no_of_calls || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item?.total_call_duration || "-"}
                      </td>
                      <td className="text-end">
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
                      <td>
                        <div className="rating">
                          <Rating
                            name="read-only"
                            value={item.rating}
                            readOnly
                          />
                        </div>
                        <span className="text-muted fw-semibold text-muted d-block fs-7 mt-1 ms-1">
                          {item?.level || "NA"}
                        </span>
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 pe-4">
                        <span
                          className="flex-shrink-0 btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm "
                          style={{ float: "right" }}
                        >
                          <KeyboardArrowRightIcon
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate(`${item?.device_id}/`, {
                                state: { data: item, date: allCallDate },
                              })
                            }
                          />
                        </span>
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
    </div>
  );
};

export { CallDetailsTable };
