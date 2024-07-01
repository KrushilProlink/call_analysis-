import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik, FieldArray, Field, FormikProvider } from "formik";
import React, { FC, useState } from "react";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { KTCard, KTIcon } from "../../../../../_metronic/helpers";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";

const ManualAnalysis: FC = () => {
  const [showAddBtn, setShowAddBtn] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const formik: any = useFormik({
    initialValues: {
      domain: "",
      categories: [
        {
          categoryName: "",
          params: [
            {
              paramName: "",
              description: "",
              score: "",
            },
          ],
        },
      ],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <div className="card-header border-0">
        <KTCard className="p-5">
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                mt={5}
              >
                <Grid item xs={12} sm={12} md={8}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Domain
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values.domain || "Select Domain"}
                      disabled={formik.values.domain}
                      size="small"
                      name="domain"
                      label="Domain"
                      onChange={formik.handleChange}
                    >
                      <MenuItem value={"Select Domain"} disabled>
                        Select Domain
                      </MenuItem>
                      <MenuItem value={"credit_card"}>Credit Card</MenuItem>
                      <MenuItem value={"debit_card"}>Debit Card</MenuItem>
                      <MenuItem onClick={handleShow}>Add New</MenuItem>
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
                    <FieldArray name="categories">
                      {({ push, remove }) => (
                        <div className="ps-5">
                          {formik?.values?.categories?.map(
                            (category: any, index: number) => (
                              <div key={index} style={{ marginTop: "30px" }}>
                                <Grid container>
                                  <Grid
                                    item
                                    xs={2}
                                    display={"flex"}
                                    justifyContent={"end"}
                                  >
                                    {index > 0 && (
                                      <IconButton
                                        onClick={() => remove(index)}
                                        color="primary"
                                      >
                                        <MdRemoveCircleOutline />
                                      </IconButton>
                                    )}
                                    <IconButton
                                      onClick={() =>
                                        push({
                                          categoryName: "",
                                          params: [
                                            {
                                              paramName: "",
                                              description: "",
                                              score: "",
                                            },
                                          ],
                                        })
                                      }
                                      color="primary"
                                    >
                                      <MdAddCircleOutline />
                                    </IconButton>
                                  </Grid>
                                  <Grid item xs={10} md={9}>
                                    <Field
                                      name={`categories.${index}.categoryName`}
                                      as={TextField}
                                      label="Category Name"
                                      variant="outlined"
                                      fullWidth
                                      size="small"
                                    />
                                  </Grid>
                                </Grid>
                                <Grid
                                  container
                                  spacing={2}
                                  sx={{ ml: { sm: 5, md: 25 } }}
                                >
                                  <FieldArray
                                    name={`categories.${index}.params`}
                                  >
                                    {({ push, remove }) => (
                                      <div>
                                        {category?.params.map(
                                          (param: any, paramIndex: number) => (
                                            <Grid
                                              container
                                              spacing={2}
                                              key={paramIndex}
                                              mt={1}
                                            >
                                              <Grid item xs={12} md={3}>
                                                <Field
                                                  name={`categories.${index}.params.${paramIndex}.paramName`}
                                                  as={TextField}
                                                  label="Param Name"
                                                  variant="outlined"
                                                  fullWidth
                                                  size="small"
                                                />
                                              </Grid>
                                              <Grid item xs={12} md={3}>
                                                <Field
                                                  name={`categories.${index}.params.${paramIndex}.description`}
                                                  as={TextField}
                                                  label="Description"
                                                  variant="outlined"
                                                  fullWidth
                                                  size="small"
                                                />
                                              </Grid>
                                              <Grid item xs={12} md={3}>
                                                <Field
                                                  name={`categories.${index}.params.${paramIndex}.score`}
                                                  as={TextField}
                                                  label="Score"
                                                  variant="outlined"
                                                  fullWidth
                                                  size="small"
                                                />
                                              </Grid>
                                              <Grid
                                                item
                                                xs={12}
                                                md={3}
                                                sx={{
                                                  textAlign: {
                                                    xs: "right",
                                                    md: "left",
                                                  },
                                                }}
                                              >
                                                <IconButton
                                                  onClick={() =>
                                                    push({
                                                      paramName: "",
                                                      description: "",
                                                      score: "",
                                                    })
                                                  }
                                                  color="secondary"
                                                >
                                                  <MdAddCircleOutline />
                                                </IconButton>
                                                {paramIndex > 0 && (
                                                  <IconButton
                                                    onClick={() =>
                                                      remove(paramIndex)
                                                    }
                                                    color="secondary"
                                                  >
                                                    <MdRemoveCircleOutline />
                                                  </IconButton>
                                                )}
                                              </Grid>
                                            </Grid>
                                          )
                                        )}
                                      </div>
                                    )}
                                  </FieldArray>
                                </Grid>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </FieldArray>
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
                    className="btn btn-light-primary"
                    type="submit"
                    onClick={() => navigate("uploadFile")}
                  >
                    Save
                  </button>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </KTCard>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Domain</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Domain</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ManualAnalysis };
