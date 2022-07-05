import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCurrentSpotPrice,
  selectSpotPrice,
} from "../reducers/spot/spotSlice";
import { useAppSelector } from "../hooks";
import { AppDispatch } from "../store";
import styled from "styled-components";

const Wrapper = styled.section`
  margin: 40px;
  padding: 20px;
  background-color: #f8fafd;
  border-radius: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: normal;
  color: black;
`;

const Price = styled.span`
  color: #3861fb;
  font-weight: bold;
`;

export default function SpotPrice() {
  const dispatch = useDispatch<AppDispatch>();
  const currentSpotPrice = useAppSelector(selectSpotPrice);

  useEffect(() => {
    dispatch(fetchCurrentSpotPrice());
  }, []);

  return (
    <Wrapper>
      <Title>
        Current price of BCH: <Price>${currentSpotPrice?.price}</Price>
      </Title>
    </Wrapper>
  );
}
