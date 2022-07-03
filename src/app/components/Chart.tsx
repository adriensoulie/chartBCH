import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchChart } from "../../features/chart/chartSlice";
import { AppDispatch } from "../store";
import { useAppSelector } from "../hooks";
import { selectChart } from "../../features/chart/chartSlice";

export default function Chart() {
  const dispatch = useDispatch<AppDispatch>();
  const chart = useAppSelector(selectChart);
  useEffect(() => {
    dispatch(fetchChart());
  }, []);

  return (
    <div>
      Chart
      {chart.map((chart) => {
        return <p>{chart[0]}</p>;
      })}
    </div>
  );
}
