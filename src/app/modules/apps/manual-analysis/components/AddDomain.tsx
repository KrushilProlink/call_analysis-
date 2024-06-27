import { Button, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { useDropzone } from "react-dropzone";
import audioImage from "../../../../../_metronic/assets/images/audio-file.png";
import { KTCard } from "../../../../../_metronic/helpers";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import cloud from "../../../../../_metronic/assets/images/Subtract.png";
import fileImage from "../../../../../_metronic/assets/images/file.png";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface FormValues {
  data: any;
  domain: string;
}
const AddDomain: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File[]>([]);
  const navigate = useNavigate();

  const getFileExtension = (filename: string): string => {
    const parts = filename.split(".");
    if (parts.length > 1) {
      return parts.pop() as string;
    }
    return "";
  };

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const initialValues: any = {
    domain: "",
  };
  const formik = useFormik<FormValues>({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (
      values: FormValues,

      { setSubmitting }
    ) => {
      try {
      } catch (error) {
        // Handle error
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="card-header border-0 ">
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
        <KTCard className="pb-5 mt-2">
          <div className="">
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 0, sm: 5, md: 4 }}
            >
              <Grid item xs={12} sm={12} md={12}>
                <div>
                  {file?.length > 0 ? (
                    <>
                      <div className="dropzoneStyle">
                        <img
                          src={fileImage}
                          alt="file"
                          width={"69px"}
                          height={"103px"}
                          style={{ marginBottom: "25px" }}
                        />
                        <Typography
                          style={{
                            color: "#10253F",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                          className="interFont pt-2"
                        >
                          {file && file[0]?.name}
                        </Typography>
                        <Typography
                          style={{
                            color: "#10253F",
                            fontSize: "16px",
                            opacity: "0.5",
                          }}
                          className="interFont text-uppercase pt-1"
                        >
                          {getFileExtension(file[0]?.name)}
                        </Typography>

                        <Typography
                          variant="caption"
                          onClick={() => setFile([])}
                          style={{
                            cursor: "pointer",
                            color: "#222E93",
                            fontSize: "14px",
                            fontWeight: "600",
                            marginTop: "20px",
                          }}
                          className="Manrope"
                        >
                          Replace File
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <>
                      <div {...getRootProps()} className="dropzoneStyle">
                        <img
                          src={cloud}
                          alt="cloud"
                          width={"95px"}
                          height={"70px"}
                          style={{ marginBottom: "29px" }}
                        />

                        <Typography
                          style={{ fontWeight: "bold", fontSize: "18px" }}
                          className="Manrope"
                        >
                          Upload File
                        </Typography>
                        <div className="mt-5 pt-3">
                          <Typography
                            style={{
                              color: "#10253F",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                            className="interFont"
                          >
                            Drag and Drop
                          </Typography>
                          <Typography
                            style={{
                              color: "#10253F",
                              fontSize: "14px",
                              opacity: "50%",
                              margin: "10px 0",
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
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={12}
                display={"flex"}
                justifyContent={"end"}
              >
                <button
                  className="btn  btn-light-primary"
                  onClick={() => navigate(-1)}
                >
                  Save
                </button>
              </Grid>
            </Grid>
          </div>
        </KTCard>
      </div>
    </>
  );
};

export { AddDomain };
