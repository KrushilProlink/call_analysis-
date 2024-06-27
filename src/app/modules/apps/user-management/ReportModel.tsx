import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import html2pdf from "html2pdf.js";
import React from "react";
import "../../../../_metronic/assets/report.css";

type Props = {
  open: boolean;
  handleClose: () => void;
  data: any;
};

const Report: React.FC<Props> = ({ open, handleClose, data }) => {
  const generatePDF = () => {
    const element = document.getElementById("content");
    if (element) {
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: `call_report_${data?.candidate_number}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, allowTaint: true },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save();
    } else {
      console.error("Element with ID 'content' not found.");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Call Report</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <div className="container-new" id="content">
            <div className="header1">
              <h1>Call Quality & Analysis</h1>
            </div>
            <div className="details">
              <div className="info">
                <p>
                  Device ID: <span>{data?.device_id}</span>
                </p>
                <p>
                  Recruiter Name: <span>{data?.recruiter_name}</span>
                </p>
                <p>
                  Candidate Cell #: <span>{data?.candidate_number}</span>
                </p>
                <p>
                  Overall Score: <span>{data?.overall_score}</span>
                </p>
              </div>
              {/* <div className="audio">
                <p>
                  Audio File:{" "}
                  <span>
                    {data?.audio_file?.length > 0 &&
                      data?.audio_file[0]?.file_count}
                  </span>
                </p>
                {data?.audio_file?.length > 0 && (
                  <audio controls>
                    <source
                      src={data?.audio_file[0]?.audio_file}
                      type="audio/mpeg"
                    />
                  </audio>
                )}
              </div> */}
            </div>
            <div className="evaluation">
              <h2 className="text-center">Evaluation Snapshot</h2>
              {data?.Evaluation?.length > 0 &&
                data?.Evaluation?.map((item: any, index: number) => (
                  <div className="section" key={index}>
                    <h3>
                      {item?.category} : Score - {item?.average_score}
                    </h3>
                    <table>
                      <thead>
                        <tr>
                          <th>Parameter</th>
                          <th>Score</th>
                          <th>Improvement/Comments</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item?.parameters?.length > 0 &&
                          item?.parameters?.map((i: any, ind: number) => (
                            <tr key={ind}>
                              <td>{i?.key}</td>
                              <td className="text-center">{i?.score}</td>
                              <td>{i?.improvements_or_comments}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ))}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: "capitalize" }}
            onClick={generatePDF}
          >
            Download
          </Button>

          <Button
            variant="outlined"
            style={{ textTransform: "capitalize" }}
            color="error"
            onClick={handleClose}
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Report;
