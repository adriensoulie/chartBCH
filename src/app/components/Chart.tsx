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
  Area,
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
          <AreaChart
            width={900}
            height={400}
            data={chartData[chartPeriod]}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="rgb(21, 128, 61)"
              fill="rgb(21, 128, 61)"
            />
          </AreaChart>
          <button onClick={() => setChartPeriod("day")}>1D</button>
          <button onClick={() => setChartPeriod("week")}>7D</button>
          <button onClick={() => setChartPeriod("month")}>1M</button>
        </div>
      )}
    </div>
  );
}
