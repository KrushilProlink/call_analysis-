import React, { FC, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Modal from "react-bootstrap/Modal";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TablePagination,
  TextField,
} from "@mui/material";
import { KTCard, KTIcon } from "../../../../../_metronic/helpers";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

type EvaluationParameter = {
  audio_player: any;
  call_duration: any;
  candidate_cell_no: any;
  mcp_score: any;
  non_tech_score: any;
  overall_score: any;
  serial_no: any;
  speech_analysis_score: any;
  technical_score: any;
};

type EvaluationCategory = {
  name: string;
  parameters: EvaluationParameter[];
};

type CallImProvementData = {
  Evaluation: EvaluationCategory[];
};

const data: CallImProvementData = {
  Evaluation: [
    {
      name: "Sharon (Monika S)",
      parameters: [
        {
          audio_player: [
            "https://asterisk-xlite-recording.s3.ap-south-1.amazonaws.com/in-1032-00919121054689-20240610-124851-1718003931.207816.wav",
          ],
          call_duration: "02:57",
          candidate_cell_no: "00919121054689",
          mcp_score: 1,
          non_tech_score: 4,
          overall_score: 30,
          serial_no: 1,
          speech_analysis_score: 3,
          technical_score: 2,
        },
        {
          audio_player: [
            "https://asterisk-xlite-recording.s3.ap-south-1.amazonaws.com/out-08630220603-1032-20240610-151716-1718012836.208300.wav",
          ],
          call_duration: "02:13",
          candidate_cell_no: "08630220603",
          mcp_score: 3,
          non_tech_score: 2,
          overall_score: 30,
          serial_no: 2,
          speech_analysis_score: 3,
          technical_score: 4,
        },
      ],
    },
    {
      name: "Veena R (Monika S)",
      parameters: [
        {
          audio_player: [
            "https://asterisk-xlite-recording.s3.ap-south-1.amazonaws.com/in-1032-00919121054689-20240610-124851-1718003931.207816.wav",
          ],
          call_duration: "02:57",
          candidate_cell_no: "00919121054689",
          mcp_score: 1,
          non_tech_score: 4,
          overall_score: 30,
          serial_no: 1,
          speech_analysis_score: 3,
          technical_score: 2,
        },
        {
          audio_player: [
            "https://asterisk-xlite-recording.s3.ap-south-1.amazonaws.com/out-08630220603-1032-20240610-151716-1718012836.208300.wav",
          ],
          call_duration: "02:13",
          candidate_cell_no: "08630220603",
          mcp_score: 3,
          non_tech_score: 2,
          overall_score: 30,
          serial_no: 2,
          speech_analysis_score: 3,
          technical_score: 4,
        },
        {
          audio_player: [
            "https://asterisk-xlite-recording.s3.ap-south-1.amazonaws.com/out-07013937255-1032-20240610-121620-1718001980.207666.wav",
            "https://asterisk-xlite-recording.s3.ap-south-1.amazonaws.com/out-07013937255-1032-20240610-122545-1718002545.207722.wav",
          ],
          call_duration: "03:10",
          candidate_cell_no: "07013937255",
          mcp_score: 2,
          non_tech_score: 0,
          overall_score: 20,
          serial_no: 5,
          speech_analysis_score: 3,
          technical_score: 2,
        },
      ],
    },
  ],
};

const CallImProvementPage: FC = () => {
  const [openTabs, setOpenTabs] = useState<boolean[]>([]);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [audioDetails, setAudioDetails] = useState<string[]>([]);
  const [teamData, setTeamData] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [date, setDate] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [parameterName, setParameterName]: any = useState([]);
  const [parameterList, setParameterList] = useState([]);
  const [parameterData, setParameterData] = useState([]);
  const [scorerData, setScorerData] = useState([]);

  const categoryList: any =
    parameterData?.length > 0
      ? parameterData.map((item: any) => item?.category)
      : [];

  const toggleTab = (index: number) => {
    const newOpenTabs = [...openTabs];
    newOpenTabs[index] = !newOpenTabs[index];
    setOpenTabs(newOpenTabs);
  };

  const handleClose = () => {
    setShowAudioModal(false);
  };

  const handleChangeSelect = (e: any, value: any) => {
    setTeamName(value || null);
  };
  const handleChangeParaSelect = (e: any, value: any) => {
    setCategoryName(value || null);
    filterParameters(value || "");
    setParameterName([]);
    setScorerData([]);
  };

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setParameterName(typeof value === "string" ? value.split(",") : value);

    const data = value
      .map((key: any) => {
        const found: any = parameterList?.find((item: any) => item.key === key);
        return found ? found.score : null;
      })
      .filter((score: any) => score !== null);

    setScorerData(data);
  };
  console.log(scorerData, "scorerData");
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

  const fetchParametersData = async () => {
    try {
      const response = await axios.get(`${API_URL}/parameters`);

      if (response?.status === 200) {
        setParameterData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching parameters data:", error);
    }
  };

  const filterParameters = (value: any) => {
    if (parameterData?.length > 0) {
      const filteredItems = parameterData?.filter(
        (item: any) => item?.category === value
      );

      const parameters: any =
        filteredItems?.length > 0 &&
        filteredItems?.flatMap((item: any) => item?.parameters);

      setParameterList(parameters);
    } else {
      setParameterList([]);
    }
  };
  useEffect(() => {
    fetchTeamData();
    fetchParametersData();
  }, []);

  return (
    <>
      <div className="card-header border-0 pt-6">
        <div className="d-flex justify-content-end flex-wrap">
          <div className="my-1 ms-2">
            <TextField
              size="small"
              type="date"
              style={{ width: "20vh" }}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="my-1 ms-2">
            <Autocomplete
              options={teamData?.map((option: any) => option)}
              style={{ width: "20vh" }}
              onChange={(e, value) => handleChangeSelect(e, value)}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="Select Team" />
              )}
            />
          </div>
          <div className="my-1 ms-2">
            <Autocomplete
              options={categoryList}
              style={{ width: "20vh" }}
              onChange={(e, value) => handleChangeParaSelect(e, value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder="Select Category"
                />
              )}
            />
          </div>
          {categoryName && (
            <div className="my-1 ms-2">
              <FormControl>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  style={{ width: "20vh" }}
                  value={parameterName}
                  onChange={handleChange}
                  size="small"
                  input={<OutlinedInput />}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <span style={{ color: "gray", opacity: 0.5 }}>
                          Select Parameters
                        </span>
                      );
                    }
                    return selected.join(", ");
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 224,
                        width: 250,
                      },
                    },
                  }}
                >
                  {parameterList?.length > 0 &&
                    parameterList?.map((item: any, index: number) => (
                      <MenuItem key={index} value={item?.key}>
                        <Checkbox
                          checked={parameterName?.indexOf(item?.key) > -1}
                        />
                        <ListItemText primary={item?.key} />
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          )}

          <div className="my-1 ms-2">
            <button type="button" className="btn btn-light-primary btn-sm">
              Filter
            </button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "30px" }}>
        {data?.Evaluation?.length > 0 &&
          data?.Evaluation?.map((item, index) => (
            <KTCard className="mt-5">
              <div
                className={`d-flex justify-content-between align-items-center p-3 bg-primary ${
                  openTabs[index] ? "rounded-top" : "rounded"
                }`}
              >
                <div>
                  <h6 className="text-light">{item?.name}</h6>
                </div>
                <div className="flex-shrink-0 btn btn-bg-secondary btn-color-muted btn-active-color-primary btn-sm p-0">
                  {openTabs[index] ? (
                    <RemoveIcon
                      style={{ cursor: "pointer" }}
                      id="tbtn"
                      onClick={() => toggleTab(index)}
                    />
                  ) : (
                    <AddIcon
                      style={{ cursor: "pointer" }}
                      id="tbtn"
                      onClick={() => toggleTab(index)}
                    />
                  )}
                </div>
              </div>
              <div>
                {openTabs[index] && (
                  <>
                    <div className="card-body mt-1 p-0">
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
                            {item?.parameters?.length > 0 ? (
                              item?.parameters?.map((i, ind) => (
                                <tr>
                                  <td className=" text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                                    {i?.serial_no || "-"}
                                  </td>
                                  <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                                    <a
                                      href="#"
                                      className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                                    >
                                      {i?.candidate_cell_no || "-"}
                                    </a>
                                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                                      {i?.call_duration || "-"}
                                    </span>
                                  </td>
                                  {i?.audio_player?.length == 1 ? (
                                    <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                                      <audio
                                        controls
                                        // autoPlay
                                        style={{ height: "37px" }}
                                        controlsList="nodownload"
                                      >
                                        <source
                                          src={i?.audio_player}
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
                                          setAudioDetails(i?.audio_player);
                                          setShowAudioModal(true);
                                        }}
                                      >
                                        {i?.audio_player?.length} Files
                                      </div>
                                    </td>
                                  )}
                                  <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                                    {i?.speech_analysis_score || "-"}
                                  </td>
                                  <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                                    {i?.mcp_score || "-"}
                                  </td>
                                  <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                                    {i?.non_tech_score || "-"}
                                  </td>
                                  <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                                    {i?.technical_score || "-"}
                                  </td>
                                  <td className="text-end text-gray-900 fw-bold text-hover-primary fs-6">
                                    <div className="d-flex flex-column w-100 me-2">
                                      <div className="d-flex flex-stack mb-2">
                                        <span className="text-muted me-2 fs-7 fw-semibold">
                                          {i?.overall_score}%
                                        </span>
                                      </div>
                                      <div className="progress h-6px w-100">
                                        <div
                                          className="progress-bar bg-primary"
                                          role="progressbar"
                                          style={{
                                            width: `${i?.overall_score}%`,
                                          }}
                                        ></div>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="text-gray-900 fw-bold text-hover-primary pe-4">
                                    <span
                                      className="flex-shrink-0 btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm"
                                      style={{ float: "right" }}
                                      // onClick={() =>
                                      //   handleDownload(
                                      //     item?.candidate_cell_no
                                      //   )
                                      // }
                                    >
                                      <VisibilityIcon
                                        style={{ cursor: "pointer" }}
                                      />
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
                                  No Data Found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </KTCard>
          ))}
      </div>

      <Modal
        id="kt_modal_create_app"
        aria-hidden="true"
        dialogClassName="modal-dialog modal-dialog-centered mw-350px"
        show={showAudioModal}
        onHide={handleClose}
        // onEntered={loadStepper}
        backdrop={true}
      >
        <div className="d-flex align-items-center justify-content-between py-5 ps-8 pe-5 border-bottom">
          <h5 className="fw-bold m-0">Audio Player</h5>
          <div className="d-flex ms-2">
            {/*begin::Close*/}
            <div
              className="btn btn-icon btn-sm btn-light-primary ms-2"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              <KTIcon className="fs-1" iconName="cross" />
            </div>
            {/*end::Close*/}
          </div>
        </div>

        <div className="modal-body py-lg-10 px-lg-10">
          {/*begin::Stepper */}
          {audioDetails.map((item: any, index: number) => (
            <>
              <audio
                controls
                // autoPlay
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

export { CallImProvementPage };
