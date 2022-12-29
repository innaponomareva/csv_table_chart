import { Chart, registerables } from "chart.js";
import { useContext, useEffect } from "react";
import {
  DataContext,
  DataContextInterface,
} from "../../context/data/dataContext";
import { ICategoryItem } from "../../models/ICategoryItem";

interface BarChartProps {
  category: string;
  categoryItems: ICategoryItem[];
}

const BarChart: React.FC<BarChartProps> = ({ category, categoryItems }) => {
  const { data } = useContext(DataContext) as DataContextInterface;

  useEffect(() => {
    let chart: Chart;
    if (category) {
      chart = getChart(categoryItems, category);
    }
    return () => chart.destroy();
  }, [categoryItems, category, data]);

  return <canvas id="myChart"></canvas>;
};

export default BarChart;

const getChart = (chartArray: ICategoryItem[], category: string) => {
  const chartElem = document.getElementById("myChart") as HTMLCanvasElement;
  Chart.register(...registerables);

  const lables = chartArray.map((_, index) => index + 1);
  const data = chartArray.map((item) => {
    return item.frequency;
  });

  return new Chart(chartElem, {
    type: "bar",
    data: {
      labels: [...lables],
      datasets: [
        {
          label: `${category} (%)`,
          data: [...data],
          maxBarThickness: 100,
        },
      ],
    },
    options: {
      scales: {
        x: {
          display: true,
        },
        y: {
          display: true,
        },
      },
    },
  });
};
