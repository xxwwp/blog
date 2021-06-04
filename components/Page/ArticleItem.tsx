import dayjs from "dayjs";
import Link from "next/link";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { Link as MuiLink, Card, CardContent, CardActions, Typography, Chip, Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  articleItem: {
    "& dl": {
      display: "flow-root",
    },
    "& dt,dd": {
      margin: "12px 0",
    },
    "& .title": {
      fontSize: "1.5em",
      fontWeight: "bold",
    },
    "& .abstract": {
      /* text-indent: 2em; */
    },
    "& .label": {
      fontSize: "0.8em",
      lineHeight: "1.2em",
    },
    "& .time": {
      fontSize: "0.8em",
      color: theme.palette.text.primary,
    },
  },
}));

interface Props {
  title: string;
  abstract: string;
  publishedAt: string;
  tags: string[];
}

export default function ArticleItem({ title, abstract, publishedAt, tags, ...rest }: Props) {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Typography component="p" color="textSecondary" variant="body2" gutterBottom>
          {dayjs(publishedAt).format("YYYY-MM-DD HH:mm")}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          <Link href={`/article/${title}`} passHref>
            <MuiLink color="inherit">{title}</MuiLink>
          </Link>
        </Typography>
        <Typography component="p" color="textSecondary" variant="body1" gutterBottom title={abstract}>
          {abstract?.length > 100 ? abstract.substr(0, 100) + "..." : abstract}
        </Typography>
        {tags.map((v) => (
          <Chip key={v} variant="outlined" size="small" label={v} />
        ))}
      </CardContent>
      <CardActions>
        <Link href={`/article/${title}`} passHref>
          <MuiLink component={Button} underline="none">
            查看更多
          </MuiLink>
        </Link>
      </CardActions>
    </Card>
  );
}
