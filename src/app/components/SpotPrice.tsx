import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCurrentSpotPrice,
  selectSpotPrice,
} from "../../features/spot/spotSlice";
import { useAppSelector } from "../hooks";
import { AppDispatch } from "../store";

export default function SpotPrice() {
  const dispatch = useDispatch<AppDispatch>();
  const currentSpotPrice = useAppSelector(selectSpotPrice);

  useEffect(() => {
    dispatch(fetchCurrentSpotPrice());
  }, []);

  return (
    <div>
      <p>Current Price of BCH: {currentSpotPrice?.price}</p>
    </div>
  );
}
