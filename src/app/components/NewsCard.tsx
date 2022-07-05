import { News } from "../types/type";
import styled from "styled-components";
import { Button } from "./Button";

interface NewsProps {
  news: News;
}

const Title = styled.h1`
  font-size: 16px;
  color: black;
`;

const Wrapper = styled.section`
  margin: 12px;
  padding: 20px;
  width: 300px;
  background-color: white;
  border-radius: 20px;
  &:hover {
    background-color: #f8fafd;
  }
`;

const Date = styled.p`
  font-size: 13px;
`;

const Anchor = styled.a`
  text-decoration: none;
`;

export default function NewsCard(props: NewsProps) {
  let news = props.news;
  return (
    <Wrapper>
      <Anchor href={news.href}>
        <Title>{news.title}</Title>
        <img src={news.thumbnail} width={300} height="auto" />
        <Date>Published the {news.publish_date}</Date>
        <Button color="primary">Read more</Button>
      </Anchor>
    </Wrapper>
  );
}
