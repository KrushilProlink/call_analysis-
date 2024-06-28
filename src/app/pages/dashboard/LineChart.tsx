import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

interface ScoreTrend {
  overall_score: number;
  recording_date: string;
}

interface DashboardData {
  score_trend: ScoreTrend[];
}

interface LineChartProps {
  dashboardData: DashboardData;
  dateRange: any;
  isLoading: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  dashboardData,
  dateRange,
  isLoading,
}) => {
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([
    {
      name: "Overall Score",
      data: [],
    },
  ]);
  const today = new Date();
  const sevenDaypre = new Date(today);

  sevenDaypre.setDate(sevenDaypre.getDate() - 6);

  const startDate =
    dateRange?.length > 0
      ? moment(dateRange[0]).format("MMM D")
      : moment(sevenDaypre).format("MMM D");

  const endDate =
    dateRange?.length > 0
      ? moment(dateRange[1]).format("MMM D YYYY")
      : moment(today).format("MMM D YYYY");

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "line" as "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        tools: {
          download: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight" as "straight",
    },
    title: {
      text: "",
      align: "left" as "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [],
    },
  });

  useEffect(() => {
    const scores =
      dashboardData?.score_trend?.map(({ score }: any) => score) || [];
    const dates =
      dashboardData?.score_trend?.map(({ recording_date }) =>
        moment(recording_date, "DD-MM-YYYY").format("DD, MMMM YYYY")
      ) || [];

    setSeries([{ name: "Overall Score", data: scores }]);
    setOptions((prevOptions: any) => ({
      ...prevOptions,
      xaxis: {
        categories: dates,
      },
    }));
  }, [dashboardData]);

  return (
    <div className={`card card-xxl-stretch-50 mb-5 mb-xl-8`}>
      <div className="card-body p-0 d-flex justify-content-between flex-column overflow-hidden">
        <div className="d-flex flex-stack flex-wrap flex-grow-1 px-9 pt-9 pb-3">
          <div className="me-2">
            <span className="fw-bold text-gray-800 d-block fs-3">
              Score Trend
            </span>

            <span className="text-gray-500 fw-semibold">
              {startDate} - {endDate}
            </span>
          </div>
        </div>
        {!isLoading ? (
          <div id="chart">
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={350}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: "160px 0",
            }}
          >
            <span className="spinner-border text-primary" role="status"></span>
            <span className="text-muted fs-6 fw-semibold mt-5">Loading...</span>
          </div>
        )}
        <div id="html-dist"></div>
      </div>
    </div>
  );
};

export default LineChart;
