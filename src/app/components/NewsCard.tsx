import { News } from "../types/type";

interface NewsProps {
  news: News;
}

export default function NewsCard(props: NewsProps) {
  return (
    <div>
      NewsCard
      <p>{props.news.title}</p>
      <a href={props.news.href}>
        <img src={props.news.thumbnail} width={150} height={150} />
      </a>
      <p>{props.news.publish_date}</p>
    </div>
  );
}
