import { News } from "../types/type";

interface NewsProps {
  news: News;
}

export default function NewsCard(props: NewsProps) {
  let news = props.news;
  return (
    <div>
      <p>{news.title}</p>
      <a href={news.href}>
        <img src={news.thumbnail} width={150} height={150} />
      </a>
      <p>{news.publish_date}</p>
    </div>
  );
}
