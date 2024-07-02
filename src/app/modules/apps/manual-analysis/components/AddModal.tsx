import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import cloud from "../../../../../_metronic/assets/images/Subtract.png";
import fileImage from "../../../../../_metronic/assets/images/file.png";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
import * as Yup from "yup";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface Props {
  show: boolean;
  handleClose: () => void;
}
const AddModal: FC<Props> = ({ show, handleClose }) => {
  const [loadingBtn, setLoadingBtn] = useState(false);

  const getFileExtension = (filename: string): string => {
    const parts = filename.split(".");
    if (parts.length > 1) {
      return parts.pop() as string;
    }
    return "";
  };

  const validationSchema = Yup.object({
    analysisName: Yup.string().required("Analysis Name is required"),
    domainName: Yup.string().required("Domain Name is required"),
    analysisType: Yup.string().required("Analysis Type is required"),
    excelAnalysisfile: Yup.array()
      .min(1, "Excel Analysis File is required")
      .required("Excel Analysis File is required"),
    file: Yup.array()
      .min(1, "Analysis File is required")
      .required("Analysis File is required"),
  });

  const initialValues = {
    analysisName: "",
    domainName: "",
    analysisType: "Audio",
    excelAnalysisfile: [],
    file: [],
  };

  const handleSave = async (values: any) => {
    const formData = new FormData();

    formData.append("analysis_name", values?.analysisName);
    formData.append("domain_name", values?.domainName);
    formData.append("parameter_file", values?.excelAnalysisfile[0]);
    formData.append("analysis_type", values?.analysisType);
    formData.append("analysis_file", values?.file[0]);
    setLoadingBtn(true);
    try {
      const response = await axios.post(
        `${API_URL}/manual-analysis`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.status === 200) {
        handleClose();
        setLoadingBtn(false);
        formik.resetForm();
        Swal.fire({
          title: "Success",
          text: "Data Save successfully",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Internal Server Error",
        icon: "error",
      });
      setLoadingBtn(false);
    }
  };

  const formik: any = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      handleSave(values);
    },
  });

  const handleDownloadSample = () => {
    const url = `${API_URL}/manual-template`;
    const link = document.createElement("a");
    link.href = url;
    link.download = "manual-template";
    link.click();
  };

  const onDropFile = (acceptedFiles: File[]) => {
    const selectedFile = getFileExtension(acceptedFiles[0].name);
    if (formik?.values?.analysisType === "Audio") {
      if (
        selectedFile?.toLowerCase() === "mp3" ||
        selectedFile?.toLowerCase() === "wav"
      ) {
        formik.setFieldValue("file", acceptedFiles);
      } else {
        alert("Please Select only mp3 or wav file");
      }
    } else if (formik?.values?.analysisType === "Chat") {
      if (selectedFile?.toLowerCase() === "txt") {
        formik.setFieldValue("file", acceptedFiles);
      } else {
        alert("Please Select only txt file");
      }
    } else if (formik?.values?.analysisType === "Email") {
      if (
        selectedFile?.toLowerCase() === "txt" ||
        selectedFile?.toLowerCase() === "eml"
      ) {
        formik.setFieldValue("file", acceptedFiles);
      } else {
        alert("Please Select only txt or eml file");
      }
    }
  };

  const onDropExcelFile = (acceptedFiles: File[]) => {
    formik.setFieldValue("excelAnalysisfile", acceptedFiles);
  };

  const { getRootProps: getRootPropsFile, getInputProps: getInputPropsFile } =
    useDropzone({ onDrop: onDropFile });
  const { getRootProps: getRootPropsExcel, getInputProps: getInputPropsExcel } =
    useDropzone({ onDrop: onDropExcelFile });

  useEffect(() => {
    if (formik?.values?.analysisType) {
      formik.setFieldValue("file", []);
    }
  }, [formik?.values?.analysisType]);
  return (
    <>
      <div>
        <Modal
          show={show}
          onHide={() => {
            handleClose();
            formik.resetForm();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 0, sm: 5, md: 4 }}
              style={{ height: "70vh", overflowY: "auto" }}
            >
              <Grid item xs={12} md={12}>
                <TextField
                  label="Analysis Name"
                  size="small"
                  fullWidth
                  name="analysisName"
                  value={formik.values.analysisName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.analysisName &&
                    Boolean(formik.errors.analysisName)
                  }
                  helperText={
                    formik.touched.analysisName && formik.errors.analysisName
                  }
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Domain Name"
                  size="small"
                  fullWidth
                  name="domainName"
                  value={formik.values.domainName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.domainName &&
                    Boolean(formik.errors.domainName)
                  }
                  helperText={
                    formik.touched.domainName && formik.errors.domainName
                  }
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormLabel className="mb-2">Excel Analysis</FormLabel>
                {formik?.values?.excelAnalysisfile?.length > 0 ? (
                  <>
                    <div className="dropzoneStyleModelAudio ">
                      <img
                        src={fileImage}
                        alt="file"
                        width={"38px"}
                        height={"50px"}
                        style={{ marginBottom: "10px" }}
                      />
                      <Typography
                        style={{
                          color: "#10253F",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                        className="interFont "
                      >
                        {formik?.values?.excelAnalysisfile &&
                          formik?.values?.excelAnalysisfile[0]?.name}
                      </Typography>
                      <Typography
                        style={{
                          color: "#10253F",
                          fontSize: "12px",
                          opacity: "0.5",
                        }}
                        className="interFont text-uppercase "
                      >
                        {getFileExtension(
                          formik?.values?.excelAnalysisfile[0]?.name
                        )}
                      </Typography>

                      <Typography
                        variant="caption"
                        onClick={() =>
                          formik.setFieldValue("excelAnalysisfile", [])
                        }
                        style={{
                          cursor: "pointer",
                          color: "#222E93",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                        className="Manrope"
                      >
                        Replace File
                      </Typography>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      {...getRootPropsExcel()}
                      className="dropzoneStyleModelAudio"
                    >
                      <img
                        src={cloud}
                        alt="cloud"
                        width={"55px"}
                        height={"43px"}
                        style={{ marginBottom: "10px" }}
                      />

                      {/* <Typography
                        style={{ fontWeight: "bold", fontSize: "14px" }}
                        className="Manrope"
                      >
                        Analyse calls using Excel
                      </Typography> */}
                      <div className="pt-3">
                        <Typography
                          style={{
                            color: "#10253F",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                          className="interFont"
                        >
                          Drag and Drop
                        </Typography>
                        <Typography
                          style={{
                            color: "#10253F",
                            fontSize: "12px",
                            opacity: "50%",
                            margin: "5px 0",
                          }}
                          className="interFont"
                        >
                          - or -
                        </Typography>
                        <Button
                          variant="contained"
                          className="btn btn-sm btn-light-primary fs-6 text-capitalize"
                        >
                          Select File
                        </Button>
                      </div>
                    </div>
                  </>
                )}
                <FormHelperText
                  style={{
                    marginLeft: "14px",
                    fontSize: "10px",
                    fontWeight: 500,
                  }}
                  error={
                    formik.touched.excelAnalysisfile &&
                    Boolean(formik.errors.excelAnalysisfile)
                  }
                >
                  {formik.touched.excelAnalysisfile &&
                    formik.errors.excelAnalysisfile}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Analysis Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Analysis Type"
                    size="small"
                    name="analysisType"
                    value={formik.values.analysisType}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.analysisType &&
                      Boolean(formik.errors.analysisType)
                    }
                  >
                    <MenuItem value={"Audio"}>Audio</MenuItem>
                    <MenuItem value={"Chat"}>Chat</MenuItem>
                    <MenuItem value={"Email"}>Email</MenuItem>
                  </Select>
                  <FormHelperText
                    error={
                      formik.touched.analysisType &&
                      Boolean(formik.errors.analysisType)
                    }
                  >
                    {formik.touched.analysisType && formik.errors.analysisType}
                  </FormHelperText>
                </FormControl>
              </Grid>
              {formik.values.analysisType && (
                <Grid item xs={12} md={12}>
                  {formik?.values?.file?.length > 0 ? (
                    <>
                      <div className="dropzoneStyleModelAudio">
                        <img
                          src={fileImage}
                          alt="file"
                          width={"38px"}
                          height={"50px"}
                          style={{ marginBottom: "10px" }}
                        />
                        <Typography
                          style={{
                            color: "#10253F",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                          className="interFont pt-2"
                        >
                          {formik?.values?.file &&
                            formik?.values?.file[0]?.name}
                        </Typography>
                        <Typography
                          style={{
                            color: "#10253F",
                            fontSize: "12px",
                            opacity: "0.5",
                          }}
                          className="interFont text-uppercase "
                        >
                          {getFileExtension(formik?.values?.file[0]?.name)}
                        </Typography>

                        <Typography
                          variant="caption"
                          onClick={() => formik.setFieldValue("file", [])}
                          style={{
                            cursor: "pointer",
                            color: "#222E93",
                            fontSize: "10px",
                            fontWeight: "600",
                            marginTop: "5px",
                          }}
                          className="Manrope"
                        >
                          Replace File
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        {...getRootPropsFile()}
                        className="dropzoneStyleModelAudio"
                      >
                        <img
                          src={cloud}
                          alt="cloud"
                          width={"55px"}
                          height={"43px"}
                          style={{ marginBottom: "10px" }}
                        />

                        {/* <Typography
                          style={{ fontWeight: "bold", fontSize: "12px" }}
                          className="Manrope"
                        >
                          Analyse calls using Excel
                        </Typography> */}
                        <div className="pt-3">
                          <Typography
                            style={{
                              color: "#10253F",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                            className="interFont"
                          >
                            Drag and Drop {formik?.values?.analysisType} File
                          </Typography>
                          <Typography
                            style={{
                              color: "#10253F",
                              fontSize: "12px",
                              opacity: "50%",
                              margin: "5px 0",
                            }}
                            className="interFont"
                          >
                            - or -
                          </Typography>
                          <Button
                            size="sm"
                            variant="contained"
                            className="btn btn-sm btn-light-primary fs-6 text-capitalize"
                          >
                            Select File
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                  <FormHelperText
                    style={{
                      marginLeft: "14px",
                      fontSize: "10px",
                      fontWeight: 500,
                    }}
                    error={formik.touched.file && Boolean(formik.errors.file)}
                  >
                    {formik.touched.file && formik.errors.file}
                  </FormHelperText>
                </Grid>
              )}
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
              <Typography
                className="text-primary text-decoration-underline mb-2 cursor-pointer"
                onClick={handleDownloadSample}
              >
                Download Excel Template
              </Typography>
              <div>
                <Button
                  variant="primary"
                  disabled={loadingBtn}
                  onClick={() => formik.handleSubmit()}
                >
                  {!loadingBtn && (
                    <span className="indicator-label">
                      <span className="ms-1">Submit</span>
                    </span>
                  )}
                  {loadingBtn && (
                    <span
                      className="indicator-progress"
                      style={{ display: "block" }}
                    >
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  )}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleClose();
                    formik.resetForm();
                  }}
                  className="ms-3"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export { AddModal };
