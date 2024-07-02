import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { FC, useState } from "react";
import { ManualAnalysis } from "./components/ManualAnalysis";
import { TablePagination } from "@mui/material";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { AddModal } from "./components/AddModal";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ManualAnalysisPage: FC = () => {
  const [value, setValue] = React.useState(1);
  const [allData, setAllData] = useState<any>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [show, setShow] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      <AddModal show={show} handleClose={() => setShow(false)} />
      <div className="card-header border-0">
        {/* <Box sx={{ width: "100%" }}>
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
        </Box> */}
        <div className={`card `}>
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column"></h3>
            <div className="card-toolbar">
              <button
                className="btn btn-sm btn-light-primary"
                onClick={() => setShow(true)}
              >
                <KTIcon iconName="plus" className="fs-2" />
                Add New
              </button>
            </div>
          </div>
          {/* <div className="card-body py-3">
            <div className="table-responsive">
              <table className="table align-middle gs-0 gy-4">
                <thead>
                  <tr className="fw-bold text-muted bg-light">
                    <th className="ps-4 min-w-325px rounded-start">Product</th>
                    <th className="min-w-125px">Price</th>
                    <th className="min-w-125px">Deposit</th>
                    <th className="min-w-200px">Agent</th>
                    <th className="min-w-150px">Status</th>
                    <th className="min-w-200px text-end rounded-end"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50px me-5">
                          <img
                            src={toAbsoluteUrl(
                              "media/stock/600x400/img-26.jpg"
                            )}
                            className=""
                            alt=""
                          />
                        </div>
                        <div className="d-flex justify-content-start flex-column">
                          <a
                            href="#"
                            className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                          >
                            Sant Extreanet Solution
                          </a>
                          <span className="text-muted fw-semibold text-muted d-block fs-7">
                            HTML, JS, ReactJS
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                      >
                        $2,790
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Paid
                      </span>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                      >
                        $520
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Rejected
                      </span>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                      >
                        Bradly Beal
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Insurance
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-light-primary fs-7 fw-semibold">
                        Approved
                      </span>
                    </td>
                    <td className="text-end">
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTIcon iconName="switch" className="fs-3" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTIcon iconName="pencil" className="fs-3" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      >
                        <KTIcon iconName="trash" className="fs-3" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50px me-5">
                          <img
                            src={toAbsoluteUrl("media/stock/600x400/img-3.jpg")}
                            className=""
                            alt=""
                          />
                        </div>
                        <div className="d-flex justify-content-start flex-column">
                          <a
                            href="#"
                            className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                          >
                            Telegram Development
                          </a>
                          <span className="text-muted fw-semibold text-muted d-block fs-7">
                            C#, ASP.NET, MS SQL
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                      >
                        $4,790
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Paid
                      </span>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                      >
                        $240
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Rejected
                      </span>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                      >
                        Chris Thompson
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        NBA Player
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-light-danger fs-7 fw-semibold">
                        In Progress
                      </span>
                    </td>
                    <td className="text-end">
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTIcon iconName="switch" className="fs-3" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTIcon iconName="pencil" className="fs-3" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      >
                        <KTIcon iconName="trash" className="fs-3" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50px me-5">
                          <img
                            src={toAbsoluteUrl("media/stock/600x400/img-9.jpg")}
                            className=""
                            alt=""
                          />
                        </div>
                        <div className="d-flex justify-content-start flex-column">
                          <a
                            href="#"
                            className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                          >
                            Payroll Application
                          </a>
                          <span className="text-muted fw-semibold text-muted d-block fs-7">
                            PHP, Laravel, VueJS
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                      >
                        $4,390
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Paid
                      </span>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                      >
                        $593
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Rejected
                      </span>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                      >
                        Zoey McGee
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Ruby Developer
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-light-success fs-7 fw-semibold">
                        Success
                      </span>
                    </td>
                    <td className="text-end">
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTIcon iconName="switch" className="fs-3" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTIcon iconName="pencil" className="fs-3" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      >
                        <KTIcon iconName="trash" className="fs-3" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50px me-5">
                          <img
                            src={toAbsoluteUrl(
                              "media/stock/600x400/img-18.jpg"
                            )}
                            className=""
                            alt=""
                          />
                        </div>
                        <div className="d-flex justify-content-start flex-column">
                          <a
                            href="#"
                            className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                          >
                            HR Management System
                          </a>
                          <span className="text-muted fw-semibold text-muted d-block fs-7">
                            Python, PostgreSQL, ReactJS
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                      >
                        $7,990
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Paid
                      </span>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                      >
                        $980
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Rejected
                      </span>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                      >
                        Brandon Ingram
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Insurance
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-light-info fs-7 fw-semibold">
                        Rejected
                      </span>
                    </td>
                    <td className="text-end">
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTIcon iconName="switch" className="fs-3" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTIcon iconName="pencil" className="fs-3" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      >
                        <KTIcon iconName="trash" className="fs-3" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50px me-5">
                          <img
                            src={toAbsoluteUrl("media/stock/600x400/img-8.jpg")}
                            className=""
                            alt=""
                          />
                        </div>
                        <div className="d-flex justify-content-start flex-column">
                          <a
                            href="#"
                            className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                          >
                            Telegram Mobile
                          </a>
                          <span className="text-muted fw-semibold text-muted d-block fs-7">
                            HTML, JS, ReactJS
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                      >
                        $5,790
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Paid
                      </span>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                      >
                        $750
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Rejected
                      </span>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                      >
                        Natali Trump
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Insurance
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-light-warning fs-7 fw-semibold">
                        Approved
                      </span>
                    </td>
                    <td className="text-end">
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTIcon iconName="switch" className="fs-3" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTIcon iconName="pencil" className="fs-3" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      >
                        <KTIcon iconName="trash" className="fs-3" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export { ManualAnalysisPage };
