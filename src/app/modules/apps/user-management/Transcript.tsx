import React from "react";
import "../../../../_metronic/assets/report.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Transcript: React.FC = () => {
  const data = useSelector(
    (state: any) => state?.getRecruiterReportDetails?.data
  );

  return (
    <>
      <div className="container-new" id="content">
        <div className="details">
          <div className="container">
            <div className="row">
              <div
                className="transcript"
                style={{ fontSize: "15px", textAlign: "justify" }}
              >
                {data?.transcript}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transcript;
