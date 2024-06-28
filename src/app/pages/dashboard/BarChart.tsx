import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getCSSVariableValue } from "../../../_metronic/assets/ts/_utils";
import { useThemeMode } from "../../../_metronic/partials/layout/theme-mode/ThemeModeProvider";

type Props = {
  className: string;
  chartColor: string;
  chartHeight: string;
  dashboardData: any;
  isLoading: boolean;
};

const BarChart: React.FC<Props> = ({
  className,
  chartColor,
  chartHeight,
  dashboardData,
  isLoading,
}) => {
  const { mode } = useThemeMode();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (dashboardData) {
      setChartData(dashboardData);
    } else {
      setChartData([]);
    }
  }, [dashboardData]);

  const chartOptions = (
    chartColor: string,
    chartHeight: string,
    chartData: any
  ): any => {
    const labelColor = getCSSVariableValue("--bs-black-500");
    const borderColor = getCSSVariableValue("--bs-gray-200");
    const secondaryColor = getCSSVariableValue("--bs-gray-300");
    const baseColor = getCSSVariableValue("--bs-" + chartColor);

    // Calculate total score for percentage calculation
    const totalScore = chartData.reduce(
      (sum: number, item: any) => sum + item?.score,
      0
    );

    return {
      series: [
        {
          name: "Overall Score",
          data:
            chartData?.length > 0
              ? chartData?.map((item: any) => Math.round(item?.score))
              : [],
        },
      ],
      chart: {
        fontFamily: "inherit",
        type: "bar",
        height: chartHeight,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          borderRadius: 5,
          dataLabels: {
            position: "top", // Position data labels at the top
          },
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: true, // Enable data labels
        formatter: function (val: number) {
          // Calculate percentage
          const percentage = ((val / totalScore) * 100).toFixed(2);
          return `${val.toFixed(2)}%`;
        },
        offsetY: -20, // Adjust the vertical position if necessary
        style: {
          fontSize: "12px",
          colors: [labelColor],
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories:
          chartData?.length > 0
            ? chartData?.map((item: any) => item?.recruiter)
            : [],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: labelColor,
            fontSize: "12px",
          },
        },
      },
      fill: {
        type: "solid",
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
        },
        y: {
          formatter: function (val: number) {
            return `${val}%`;
          },
        },
      },
      colors: [baseColor, secondaryColor],
      grid: {
        padding: {
          top: 10,
        },
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      annotations: {
        position: "front",
        yaxis: [
          {
            y: 50,
            borderColor: "#000",
            label: {
              borderRadius: 10,
              borderColor: "#000",
              style: {
                color: "#fff",
                background: "#000",
                padding: {
                  top: 4,
                  right: 10,
                  bottom: 6,
                  left: 10,
                },
              },
              text: "Max-Capacity",
              offsetY: 6,
            },
            strokeDashArray: 0,
          },
        ],
      },
    };
  };

  return (
    <div className={`card ${className}`}>
      <div className="card-body p-0 d-flex justify-content-between flex-column overflow-hidden">
        <div className="d-flex flex-stack flex-wrap flex-grow-1 px-9 pt-9 pb-3">
          <div className="me-2">
            <span className="fw-bold text-gray-800 d-block fs-3">
              Recruiter
            </span>
          </div>
        </div>

        {!isLoading ? (
          <ReactApexChart
            options={chartOptions(chartColor, chartHeight, chartData)}
            series={chartOptions(chartColor, chartHeight, chartData).series}
            type="bar"
            height={chartHeight}
          />
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
      </div>
    </div>
  );
};

export { BarChart };
