import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchChart } from "../reducers/chart/chartSlice";
import { AppDispatch } from "../store";
import { useAppSelector } from "../hooks";
import { selectChart } from "../reducers/chart/chartSlice";
import {
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import { ChartOrdered } from "../types/type";
import { Button } from "./Button";
import styled from "styled-components";

const Wrapper = styled.section`
  margin: 12px;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: black;
`;

const ChartContainer = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  padding: 6px;
  border-radius: 10px;
  background: #f8f8ff;
  display: flex;
  max-width: fit-content;
`;

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

  function getMaxPrice(array: ChartOrdered[]) {
    let price: number[] = [];
    array.map((item) => price.push(item.value));
    return Math.max(...price);
  }

  function getMinPrice(array: ChartOrdered[]) {
    let price: number[] = [];
    array.map((item) => price.push(item.value));
    return Math.min(...price);
  }

  const chartData: Record<string, ChartOrdered[]> = {
    day: lastDay,
    week: lastWeek,
    month: lastMonth,
  };

  return (
    <Wrapper>
      <Title>Price of Bitcoin Cash (BCH)</Title>
      {chart && (
        <ChartContainer>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={chartData[chartPeriod]}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="date" />
              <YAxis
                dataKey="value"
                domain={[
                  getMinPrice(chartData[chartPeriod]),
                  getMaxPrice(chartData[chartPeriod]),
                ]}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3861FB"
                fill="#3861FB"
              />
            </AreaChart>
          </ResponsiveContainer>
          <ButtonContainer>
            <Button
              color={chartPeriod === "day" ? "active" : "primary"}
              onClick={() => setChartPeriod("day")}
            >
              1D
            </Button>
            <Button
              color={chartPeriod === "week" ? "active" : "primary"}
              onClick={() => setChartPeriod("week")}
            >
              7D
            </Button>
            <Button
              color={chartPeriod === "month" ? "active" : "primary"}
              onClick={() => setChartPeriod("month")}
            >
              1M
            </Button>
          </ButtonContainer>
        </ChartContainer>
      )}
    </Wrapper>
  );
}
