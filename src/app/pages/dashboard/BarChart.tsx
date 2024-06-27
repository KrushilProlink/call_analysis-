import React, { useEffect, useRef, useState } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
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
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const [chartData, setChartData] = useState([]);

  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    const chart = new ApexCharts(
      chartRef.current,
      chartOptions(chartColor, chartHeight, chartData)
    );
    if (chart) {
      chart.render();
    }

    return chart;
  };

  useEffect(() => {
    const chart = refreshChart();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode, chartData]); // Add chartData as a dependency

  useEffect(() => {
    if (dashboardData) {
      setChartData(dashboardData);
    } else {
      setChartData([]);
    }
  }, [dashboardData]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className="card-body p-0 d-flex justify-content-between flex-column overflow-hidden">
        {/* begin::Hidden */}
        <div className="d-flex flex-stack flex-wrap flex-grow-1 px-9 pt-9 pb-3">
          <div className="me-2">
            <span className="fw-bold text-gray-800 d-block fs-3">
              Recruiter
            </span>
          </div>
          {/* <div className={`fw-bold fs-3 text-${chartColor}`}>$15,300</div> */}
        </div>
        {/* end::Hidden */}

        {/* begin::Chart */}
        <div ref={chartRef} className="mixed-widget-10-chart"></div>
        {/* end::Chart */}
      </div>
    </div>
  );
};

const chartOptions = (
  chartColor: string,
  chartHeight: string,
  chartData: any
): ApexOptions => {
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

export { BarChart };
