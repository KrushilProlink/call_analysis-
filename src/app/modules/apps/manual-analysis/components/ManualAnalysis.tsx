import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { FC, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import audioImage from "../../../../../_metronic/assets/images/audio-file.png";
import { KTCard, KTIcon } from "../../../../../_metronic/helpers";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface FormValues {
  data: any;
  domain: string;
}
const ManualAnalysis: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [view, setView] = useState(false);
  const [file, setFile] = useState<File[]>([]);
  const [showAddBtn, setShowAddBtn] = useState(false);

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
    data: [
      {
        category: "",
        parameterName: "",
        parameterDescription: "",
      },
    ],
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

  const handleAddExperience = () => {
    formik.setFieldValue("data", [
      ...formik?.values?.data,
      {
        category: "",
        parameterName: "",
        parameterDescription: "",
      },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    const newExperience = formik?.values?.data?.filter(
      (_: any, i: any) => i !== index
    );
    formik.setFieldValue("data", newExperience);
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newData = formik?.values?.data?.map((exp: any, i: number) => {
      if (i === index) {
        return {
          ...exp,
          [name]: value,
        };
      }
      return exp;
    });
    formik.setFieldValue("data", newData);
  };

  return (
    <>
      <div className="card-header border-0 ">
        <KTCard className="d-flex justify-content-center align-items-center pb-5">
          <div className="w-50">
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 0, sm: 5, md: 4 }}
              mt={5}
            >
              <Grid item xs={12} sm={12} md={8}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Domain </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.domain || "Select Domain"}
                    size="small"
                    name="domain"
                    label="Domain "
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={"Select Domain"} disabled>
                      Select Domain
                    </MenuItem>
                    <MenuItem value={"credit_card"}>Credit Card</MenuItem>
                    <MenuItem value={"debit_card"}>Debit card</MenuItem>
                    <MenuItem onClick={() => navigate("addDomain")}>
                      Add New
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <button
                  className="btn btn-sm btn-light-primary"
                  onClick={() => setShowAddBtn(true)}
                >
                  <KTIcon iconName="plus" className="fs-3" />
                  Create New
                </button>
              </Grid>
              {showAddBtn && (
                <>
                  {formik?.values?.data?.map((item: any, index: number) => (
                    <React.Fragment key={index}>
                      <Grid item xs={12} sm={12} md={3}>
                        <TextField
                          id={`category-${index}`}
                          name="category"
                          label="Category"
                          variant="outlined"
                          value={item?.category}
                          onChange={(event: any) => handleChange(index, event)}
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <TextField
                          id={`parameterName-${index}`}
                          name="parameterName"
                          label="Parameter Name"
                          variant="outlined"
                          value={item?.parameterName}
                          onChange={(event: any) => handleChange(index, event)}
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <TextField
                          id={`parameterDescription-${index}`}
                          name="parameterDescription"
                          label=" Parameter Description"
                          variant="outlined"
                          value={item?.parameterDescription}
                          onChange={(event: any) => handleChange(index, event)}
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={0} sm={0} md={1}></Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={1}
                        display={"flex"}
                        justifyContent={"end"}
                        alignItems={"center"}
                      >
                        {index > 0 && (
                          <IconButton
                            onClick={() => handleRemoveExperience(index)}
                          >
                            <MdRemoveCircleOutline />
                          </IconButton>
                        )}
                        {index === formik?.values?.data?.length - 1 && (
                          <IconButton onClick={handleAddExperience}>
                            <MdAddCircleOutline />
                          </IconButton>
                        )}
                      </Grid>
                    </React.Fragment>
                  ))}
                </>
              )}
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
                  onClick={() => {
                    setShowAddBtn(false);
                    formik.resetForm();
                  }}
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

export { ManualAnalysis };
