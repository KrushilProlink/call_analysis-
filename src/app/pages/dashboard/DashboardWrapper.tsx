import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { DateRangePicker } from "rsuite";
import { PageTitle } from "../../../_metronic/layout/core";
import { BarChart } from "./BarChart";
import CountCard from "./CountCard";
import LineChart from "./LineChart";
import axios from "axios";
import "rsuite/dist/rsuite.min.css";
import moment from "moment";
import { BarChartTeam } from "./BarChart Team";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  setDateRange,
  setTeamsName,
} from "../../../redux/slice/getApwAnalysisSlice";
import { useDispatch, useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_APP_API_URL;

const DashboardPage = ({
  handleSelect,
  dateRange,
  dashboardData,
  handleChangeSelect,
  teamName,
  teamData,
  isLoading,
}: any) => {
  return (
    <>
      {/* begin::Row */}
      <div className="row g-5 g-xl-8">
        <div className="col-xl-12 d-flex w-100 justify-content-end">
          <DateRangePicker
            format="dd/MM/yyyy"
            defaultValue={dateRange}
            placement="leftStart"
            onChange={(range) => handleSelect(range)}
            className="custom-date-range-picker"
          />
          <div className="ms-2">
            <Autocomplete
              options={teamData?.map((option: any) => option)}
              style={{ width: "20vh" }}
              value={teamName}
              onChange={(e, value) => handleChangeSelect(e, value)}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="Select Team" />
              )}
            />
          </div>
        </div>
        <div className="col-xl-3">
          <CountCard
            className="card-xl-stretch mb-xl-8"
            count={dashboardData?.total_calls?.value || 0}
            color="#7239ea"
            iconColor="primary"
            title="No. Of Calls "
            description=""
            titleColor="white"
            descriptionColor="gray-400"
          />
        </div>

        <div className="col-xl-3">
          <CountCard
            className="card-xl-stretch mb-xl-8"
            count={dashboardData?.total_duration?.value || 0}
            color="primary"
            iconColor="white"
            title="Total Duration"
            description=""
            titleColor="white"
            descriptionColor="white"
          />
        </div>
        <div className="col-xl-3">
          <CountCard
            className="card-xl-stretch mb-5 mb-xl-8"
            count={`${dashboardData?.avg_overall_score?.value || 0} %`}
            color="dark"
            iconColor="gray-100"
            title="Avg. Score"
            description=""
            titleColor="gray-100"
            descriptionColor="gray-100"
          />
        </div>
        <div className="col-xl-3">
          <div className="card-xl-stretch mb-5 mb-xl-8">
            <table
              className="table p-0 m-0  border-dark "
              style={{ height: "163px", borderRadius: "50px" }}
            >
              <tbody>
                <tr style={{ background: "#f2f2f2" }}>
                  <th style={{ paddingLeft: "20px" }}>Speech Analysis</th>
                  <td>{dashboardData?.avg_speech_analysis?.value || 0}</td>
                </tr>
                <tr>
                  <th style={{ paddingLeft: "20px" }}>MCP</th>
                  <td>{dashboardData?.avg_mcp?.value || 0}</td>
                </tr>
                <tr style={{ background: "#f2f2f2" }}>
                  <th style={{ paddingLeft: "20px" }}>Technical</th>
                  <td>{dashboardData?.avg_tech?.value || 0}</td>
                </tr>
                <tr>
                  <th style={{ paddingLeft: "20px" }}>Non-Technical</th>
                  <td>{dashboardData?.avg_non_tech?.value || 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xxl-8">
          <LineChart
            dashboardData={dashboardData}
            dateRange={dateRange}
            isLoading={isLoading}
          />
        </div>
        <div className="col-xxl-4">
          <BarChartTeam
            className="card-xxl-stretch-50 mb-5 mb-xl-8"
            chartColor="primary"
            chartHeight="370px"
            key={dashboardData?.team_bar_chart}
            dashboardData={dashboardData?.team_bar_chart}
            isLoading={isLoading}
          />
        </div>
        <div className="col-xxl-12">
          <BarChart
            className="card-xxl-stretch-50 mb-5 mb-xl-8"
            chartColor="primary"
            chartHeight="400px"
            dashboardData={dashboardData?.recruiter_bar_chart}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

const DashboardWrapper = () => {
  const intl = useIntl();
  const [dashboardData, setdashboadData] = useState({});
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const today = new Date();
  const preDay = new Date(today);
  preDay.setDate(preDay.getDate() - 1);

  const storedDateRange = useSelector(
    (state: any) => state?.apwAnalysisDetails?.dateRange
  );
  const storedTeamName = useSelector(
    (state: any) => state?.apwAnalysisDetails?.teamName
  );
  const [teamName, setTeamName] = useState(storedTeamName || "");

  const initialDateRange = storedDateRange || [preDay, preDay];
  const [dateRange, setDateRangeState] = useState(initialDateRange);

  const handleSelect = (range: any) => {
    setDateRangeState(range);
    dispatch(setDateRange({ date: range }));
  };

  const handleChangeSelect = (e: any, value: any) => {
    setTeamName(value || null);
    dispatch(setTeamsName({ teamName: value }));
  };

  const startDate = moment(dateRange[0]).format("DD-MM-YYYY");
  const endDate = moment(dateRange[1]).format("DD-MM-YYYY");

  const fetchAllCallData = async () => {
    setIsLoading(true);
    try {
      let payload: any = {
        start_date: startDate,
        end_date: endDate,
      };

      if (teamName) {
        payload.team_name = teamName;
      }

      const response = await axios.post(`${API_URL}/rh-dashboard`, payload);
      if (response?.status === 200) {
        setdashboadData(response?.data?.data);
        setIsLoading(false);
      }
    } catch (error) {
      setdashboadData({});
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

  useEffect(() => {
    fetchAllCallData();
  }, [dateRange, teamName]);

  useEffect(() => {
    fetchTeamData();
  }, []);

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <DashboardPage
        handleSelect={handleSelect}
        dateRange={dateRange}
        dashboardData={dashboardData}
        handleChangeSelect={handleChangeSelect}
        teamName={teamName}
        teamData={teamData}
        isLoading={isLoading}
      />
    </>
  );
};

export { DashboardWrapper };
