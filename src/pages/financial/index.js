import React, { useEffect, useState } from "react";
import Layout from "../../components/common/layout/layout";
import { useSelector } from "react-redux";
import { GetAllMarketsChart } from "../../services/markets";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

function Financial() {
  const { financial, pageCondition } = useSelector((state) => state.markets);
  const [chartData, setChartData] = useState();
  useEffect(() => {
    financial === "empty" && window.location.replace("/");

    getMarketChart(pageCondition.page);
  }, []);

  let { currency1, price, title_fa } = financial;

  const getMarketChart = async (_page) => {
    try {
      let response = await GetAllMarketsChart({ page: _page });
      if (response.status === 200) {
        let { results } = response.data;
        let data = results.find((item) => item.id === financial.id);

        setChartData({
          label: data.chart.map((item) => {
            return item.price;
          }),
          value: data.chart.map((item) => {
            return new Date(item.created_at);
          }),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title_fa,
      },
    },
  };

  const data = {
    labels: chartData && chartData.label,
    datasets: [
      {
        label: title_fa,
        data: chartData && chartData.value,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      {financial !== "empty" && (
        <Layout>
          <>
            <p>
              چون نمیدونم چه دیتایی باید قرار بدم بنابر این سعی کردم از دیتای هر
              ایتم استفاده کنم
            </p>

            <div className="border border-gray-200 mt-5 py-3 px-5 rounded">
              <div className=" flex justify-between items-center">
                <div className="flex items-center">
                  <img className="w-20 h-20" src={currency1.image} alt="" />
                  <div className="flex flex-col">
                    <span>{currency1.code}</span>
                    <span>{currency1.title_fa}</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span>{title_fa}</span>
                  <span>
                    قیمت:
                    <span>{Number(price).toLocaleString()}</span>
                  </span>
                </div>
              </div>
            </div>
            {chartData && <Line options={options} data={data} />}
          </>
        </Layout>
      )}
    </>
  );
}

export default Financial;
