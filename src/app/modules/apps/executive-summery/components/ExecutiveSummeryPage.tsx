import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { KTCard } from "../../../../../_metronic/helpers";
import { ParameterWiseReport } from "./ParameterWiseReport";
import { RecruiterReport } from "./RecruiterReport";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TeamWiseReport } from "./TeamWiseReport";
import { DateRangePicker } from "rsuite";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateRange,
  setTeamsName,
} from "../../../../../redux/slice/getApwAnalysisSlice";
import SpeechAnalysisTable from "./SpeechAnalysisTable";
import { Autocomplete, Button, TextField } from "@mui/material";
import { CallWiseReport } from "./CallWiseReport";
import { McpWiseReport } from "./McpWiseReport";
import { NonTechWiseReport } from "./NonTechWiseReport";
import { TechWiseReport } from "./TechWiseReport";
import html2pdf from "html2pdf.js";
import DownloadIcon from "@mui/icons-material/Download";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ExecutiveSummeryPage: FC = () => {
  const dispatch = useDispatch();
  const [apwAnalysisData, setApwAnalysisData]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowPagination, setIsShowPagination] = useState(false);
  const [teamData, setTeamData] = useState<any>([]);

  const storedDateRange = useSelector(
    (state: any) => state?.apwAnalysisDetails?.dateRange
  );
  const storedTeamName = useSelector(
    (state: any) => state?.apwAnalysisDetails?.teamName
  );
  const [teamName, setTeamName] = useState(storedTeamName || "");

  const today = new Date();
  const preDay = new Date(today);
  preDay.setDate(preDay.getDate() - 1);

  const initialDateRange = storedDateRange || [preDay, preDay];
  const [dateRange, setDateRangeState] = useState(initialDateRange);

  const handleSelect = (range: any) => {
    setDateRangeState(range);
    dispatch(setDateRange({ date: range }));
  };

  const startDate = moment(dateRange[0]).format("DD-MM-YYYY");
  const endDate = moment(dateRange[1]).format("DD-MM-YYYY");
  const date = {
    startDate,
    endDate,
  };
  const fetchApwAnalysisData = async () => {
    setIsLoading(true);
    try {
      let payload: any = {
        start_date: startDate,
        end_date: endDate,
      };
      if (teamName) payload.team_name = teamName;
      const response = await axios.post(`${API_URL}/apw-analysis`, payload);
      if (response?.status === 200) {
        setApwAnalysisData(response?.data?.data);
      }
    } catch (error) {
      setIsLoading(false);
      setApwAnalysisData([]);
      console.error("Error fetching apw-analysis data:", error);
    }
    setIsLoading(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleChangeSelect = (e: any, value: any) => {
    setTeamName(value || null);
    dispatch(setTeamsName({ teamName: value }));
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

  const generatePDF = () => {
    const element = document.getElementById("reports");
    const hideContent = document.getElementsByClassName("hide");

    for (let i = 0; i < hideContent.length; i++) {
      hideContent[i].setAttribute("class", "hide-content");
    }

    if (element) {
      setTimeout(() => {
        html2pdf()
          .from(element)
          .set({
            margin: [0, 0, 0, 0],
            filename: `summary_reports_${moment().format("DD-MM-YYYY")}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, allowTaint: true },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
          })
          .save()
          .then(() => {
            setLoading(false);
            setIsShowPagination(false);
          });
      }, 500);
    } else {
      console.error("Element with ID 'reports' not found.");
      setIsShowPagination(false);
    }
  };

  const handleDownload = () => {
    setLoading(true);
    setIsShowPagination(true);
    setTimeout(() => {
      generatePDF();
    }, 500);
  };

  useEffect(() => {
    fetchApwAnalysisData();
  }, [dateRange, teamName]);

  useEffect(() => {
    fetchTeamData();
  }, []);

  useEffect(() => {
    if (storedDateRange) {
      setDateRangeState(storedDateRange);
    }
  }, [storedDateRange]);
  return (
    <>
      <div className="card-header border-0">
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
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Select Team"
                  />
                )}
              />
            </div>
          </div>
        </div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Executive Summary"
                {...a11yProps(0)}
                style={{ fontSize: "13px" }}
              />
              <Tab
                label="Training Analysis"
                {...a11yProps(1)}
                style={{ fontSize: "13px" }}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="mt-5">
              <div
                className="d-flex justify-content-end"
                data-kt-user-table-toolbar="base"
              >
                <button
                  type="button"
                  className="btn btn-light-primary me-3"
                  onClick={handleDownload}
                >
                  {!loading && (
                    <span className="indicator-label">
                      <span>
                        <DownloadIcon className="fs-1" />
                      </span>
                      <span className="ms-1">Download </span>
                    </span>
                  )}
                  {loading && (
                    <span
                      className="indicator-progress"
                      style={{ display: "block" }}
                    >
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  )}
                </button>
              </div>
            </div>
            <div className="row" id="reports">
              <div className="col-xl-12">
                <KTCard className="mt-5">
                  <TeamWiseReport
                    teamWiseData={apwAnalysisData?.team_wise_report}
                    isLoading={isLoading}
                  />
                  <CallWiseReport
                    callWiseData={apwAnalysisData?.call_wise_report}
                    isLoading={isLoading}
                  />
                </KTCard>
              </div>
              <div className="col-xl-12">
                <KTCard className="mt-5">
                  <ParameterWiseReport
                    parameterWiseData={apwAnalysisData?.parameter_wise_report}
                    isLoading={isLoading}
                  />
                  <McpWiseReport
                    mcpWiseData={apwAnalysisData?.mcp_wise_report}
                    isLoading={isLoading}
                  />
                </KTCard>
              </div>
              <div className="col-xl-12">
                <KTCard className="mt-5">
                  <NonTechWiseReport
                    nonTechWiseData={apwAnalysisData?.non_tech_wise_report}
                    isLoading={isLoading}
                  />
                  <TechWiseReport
                    techWiseData={apwAnalysisData?.tech_wise_report}
                    isLoading={isLoading}
                  />
                </KTCard>
              </div>

              <div className="col-xl-12">
                <KTCard className="mt-5">
                  <RecruiterReport
                    recruiterData={apwAnalysisData?.recruiter_detailed_report}
                    isLoading={isLoading}
                    date={date}
                    isShowPagination={isShowPagination}
                  />
                </KTCard>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <SpeechAnalysisTable
              trainingAnalysis={apwAnalysisData?.training_data}
              isLoading={isLoading}
            />
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
};

export { ExecutiveSummeryPage };
