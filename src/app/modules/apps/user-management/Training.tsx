import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../../_metronic/assets/report.css";
import { useSelector } from "react-redux";

const Training: React.FC = () => {
  const [parameterList, setParameterList] = useState<any[]>([]);
  const data = useSelector(
    (state: any) => state?.getRecruiterReportDetails?.data
  );

  useEffect(() => {
    if (Array.isArray(data?.training_data)) {
      const groupedData: any = {};

      data?.training_data?.forEach((item: any) => {
        if (!groupedData[item?.category]) {
          groupedData[item?.category] = {
            category: item?.category,
            params: [],
          };
        }
        groupedData[item?.category]?.params?.push({
          imp_comm: item?.imp_comm,
          key: item?.key,
          score: item?.score,
        });
      });

      const filterData = Object.values(groupedData);
      setParameterList(filterData);
    }
  }, [data]);

  return (
    <div className="container-new" id="content">
      <div className="details">
        <div className="container">
          <div className="row">
            <div
              className="transcript"
              style={{ fontSize: "15px", textAlign: "justify" }}
            >
              {parameterList?.length > 0 &&
                parameterList?.map((item: any, index: number) => (
                  <div
                    className="section"
                    key={index}
                    style={{ cursor: "pointer" }}
                  >
                    <h3>{item.category}</h3>
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Parameter</th>
                            <th className="text-center">Score (out of 10)</th>
                            <th>Improvement/Comments</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item?.params?.length > 0 &&
                            item?.params?.map((i: any, ind: number) => (
                              <tr key={ind}>
                                <td>{i?.key}</td>
                                <td className="text-center">{i?.score}</td>
                                <td>{i?.imp_comm}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;
