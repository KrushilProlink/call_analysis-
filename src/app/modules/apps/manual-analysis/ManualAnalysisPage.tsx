import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { FC } from "react";
import { ManualAnalysis } from "./components/ManualAnalysis";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ManualAnalysisPage: FC = () => {
  const [value, setValue] = React.useState(1);

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
        {value === index && <Box mt={2}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <>
      <div className="card-header border-0">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Previous Analysis"
                {...a11yProps(0)}
                style={{ fontSize: "13px" }}
              />
              <Tab
                label="Send Manual Analysis"
                {...a11yProps(1)}
                style={{ fontSize: "13px" }}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            Previous Analysis
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ManualAnalysis />
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
};

export { ManualAnalysisPage };
