import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveIcon from "@mui/icons-material/Remove";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import { KTCard } from "../../../../../_metronic/helpers";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Report from "../Report";
import Transcript from "./../Transcript";
import Training from "./../Training";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

const RecruiterData: React.FC = () => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
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
      </div>
      <div className="mt-5">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Report"
                {...a11yProps(0)}
                style={{ fontSize: "13px" }}
              />
              <Tab
                label="Transcript"
                {...a11yProps(1)}
                style={{ fontSize: "13px" }}
              />
              <Tab
                label="Training"
                {...a11yProps(2)}
                style={{ fontSize: "13px" }}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="card-body">
              <Report />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Transcript />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Training />
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default RecruiterData;
