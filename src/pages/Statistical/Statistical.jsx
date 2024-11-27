import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import { Chart } from "react-google-charts";
import "./Statistical.css";
import { getRevenueProduct, getRevenueService } from "../../services/RevenueManager";

function Statistical() {
  const pieData = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const pieOptions = {
    title: "My Daily Activities",
    pieHole: 0.4,
  };

  const barOptions = {
    title: "Monthly Data",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total",
      minValue: 0,
    },
    vAxis: {
      title: "Month",
    },
  };

  const lineOptions = {
    title: "Line Chart Example",
    curveType: "function",
    legend: { position: "bottom" },
  };

  const lineData = [
    ["Month", "Dataset 1"],
    ["January", 65],
    ["February", 59],
    ["March", 80],
    ["April", 81],
    ["May", 56],
    ["June", 55],
    ["July", 40],
  ];

  const [revenueService, setRevenueService] = useState([]);
  const [revenueProduct, setRevenueProduct] = useState([]);
  useEffect(() => {
    const fetchRevenueService = async () => {
      try {
        const response = await getRevenueService();
        setRevenueService(response.data.monthly_revenue);
      } catch (error) {
        console.log("error", error);
      }
    };
    const fetchRevenueProduct = async () => {
      try {
        const response = await getRevenueProduct();
        setRevenueProduct(response.data.monthly_revenue);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchRevenueService();
    fetchRevenueProduct();
  }, []);

  const barDataService = [
      ["Month", "Dataset 1"],
      ...revenueService.map((service) => 
          [service.month, service.revenue],
        )
    ]

  const barDataProduct = [
      ["Month", "Dataset 1"],
      ...revenueProduct.map((product) => 
          [product.month, product.revenue],
        )
    ]

  const totalBarService = barDataService.slice(1).reduce((sum, row) => sum + row[1], 0);
  const totalBarProduct = barDataProduct.slice(1).reduce((sum, row) => sum + row[1], 0);
  const totalPieChart = pieData.slice(1).reduce((sum, row) => sum + row[1], 0);
  const totalLineChartViews = lineData
    .slice(1)
    .reduce((sum, row) => sum + row[1], 0);

  return (
    <React.Fragment>
      <Header />
      <div className="baocao-container">
        <div className="grid-container">
          <div className="barchart-container col-8">
            <h3>Doanh thu dịch vụ hàng tháng</h3>
            <Chart
              chartType="Bar"
              data={barDataService}
              options={barOptions}
              width="100%"
              height="400px"
            />
          </div>
          <div className="summary-container col-4">
            <div className="box">Doanh thu dịch vụ: {totalBarService}</div>
            <div className="box">Doanh thu sản phẩm: {totalBarProduct}</div>
            <div className="box">Doanh thu theo giờ: {totalPieChart}</div>
            <div className="box">
              Lượt truy cập website: {totalLineChartViews}
            </div>
          </div>
        </div>
        <div className="row-container">
          <div className="border-box col-4">
            <h3>Doanh thu theo giờ</h3>
            <Chart
              chartType="PieChart"
              data={pieData}
              options={pieOptions}
              width="100%"
              height="400px"
            />
          </div>
          <div className="border-box col-4">
            <h3>Doanh thu dịch vụ </h3>
            <Chart
              chartType="Bar"
              data={barDataProduct}
              options={barOptions}
              width="100%"
              height="400px"
            />
          </div>
          <div className="border-box col-4">
            <h3>Lượng truy cập</h3>
            <Chart
              chartType="Line"
              data={lineData}
              options={lineOptions}
              width="100%"
              height="400px"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Statistical;
