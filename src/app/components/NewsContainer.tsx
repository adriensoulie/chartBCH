import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchNews, selectNews } from "../../features/news/newsSlice";
import { useAppSelector } from "../hooks";
import { AppDispatch } from "../store";
import NewsCard from "./NewsCard";
import styled from "styled-components";

export default function NewsContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const newsData = useAppSelector(selectNews);

  const Wrapper = styled.section`
    margin: 12px;
    padding: 20px;
    padding-bottom: 140px;
  `;

  const Title = styled.h1`
    font-size: 28px;
    color: black;
  `;

  const NewsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
  `;

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  return (
    <Wrapper>
      <Title>Recent news</Title>
      <NewsContainer>
        {newsData.map((news, index) => (
          <NewsCard key={news.publish_date + index} news={news} />
        ))}
      </NewsContainer>
    </Wrapper>
  );
}
