import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchNews, selectNews } from "../../features/news/newsSlice";
import { useAppSelector } from "../hooks";
import { AppDispatch } from "../store";
import NewsCard from "./NewsCard";

export default function NewsContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const newsData = useAppSelector(selectNews);

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  return (
    <div>
      NewsContainer
      <div>
        {newsData.map((news, index) => (
          <NewsCard key={news.publish_date + index} news={news} />
        ))}
      </div>
    </div>
  );
}
