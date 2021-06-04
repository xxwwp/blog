import ArticleItem from "../Page/ArticleItem";
import { makeStyles } from "@material-ui/styles";

export default function ArticleList({ articles }) {
  const classes = useStyles();
  return (
    <ol className={classes.ol}>
      {articles.map((a) => (
        <li role="card" className={classes.card} key={a.id}>
          <ArticleItem
            title={a.name}
            abstract={a.abstract}
            publishedAt={a.published_at}
            tags={a.tags.map((v) => v.name)}
          />
        </li>
      ))}
    </ol>
  );
}

const useStyles = makeStyles({
  ol: {
    flex: 1,
    listStyle: "none",
    padding: 0,
    maxWidth: "960px",
    margin: "auto",
    paddingBlock: 0,
  },
  card: {
    margin: "1rem 0",
    padding: "0 1rem",
    borderRadius: "5px",
  },
});
