import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchChart } from "../../features/chart/chartSlice";
import { AppDispatch } from "../store";
import { useAppSelector } from "../hooks";
import { selectChart } from "../../features/chart/chartSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import { ChartOrdered } from "../types/type";

export default function Chart() {
  const dispatch = useDispatch<AppDispatch>();
  const chart = useAppSelector(selectChart);
  const [chartPeriod, setChartPeriod] = useState("month");
  const lastDay = chart.slice(chart.length - 1, chart.length);
  const lastWeek = chart.slice(chart.length - 7, chart.length);
  const lastMonth = chart.slice(chart.length - 31, chart.length);

  // fetch(`https://news.bitcoin.com/wp-content/weekly_popular_posts.json`)
  //   .then((res) => res.json())
  //   .then((res) => console.log(res));

  useEffect(() => {
    dispatch(fetchChart());
  }, []);

  const chartData: Record<string, ChartOrdered[]> = {
    day: lastDay,
    week: lastWeek,
    month: lastMonth,
  };

  return (
    <div>
      Chart
      {chart && (
        <div>
          <LineChart width={900} height={200} data={chartData[chartPeriod]}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
          <button onClick={() => setChartPeriod("day")}>24 hours</button>
          <button onClick={() => setChartPeriod("week")}>7 days</button>
          <button onClick={() => setChartPeriod("month")}>30 days</button>
        </div>
      )}
    </div>
  );
}
