import gql from "graphql-tag";
import { paperProps, useStore } from "../../utils";
import Markdown from "../../components/Markdown";
import Head from "next/head";
import dayjs from "dayjs";
import ALink from "../../components/ALink";
import SMain from "../../components/SMain";
import Tag from "../../components/Tag";
import Page from "../../components/Page";
import { makeStyles } from "@material-ui/styles";

export async function getServerSideProps(s) {
  return await paperProps(gql`
    query {
      articles(where: { name: "${s.params.name}" }) {
        id
        created_at
        updated_at
        name
        content
        published_at
        abstract
        tags {
          id
          name
        }
        archives {
          id
          name
        }
      }
    }
  `);
}

const useStyles = makeStyles(({ palette }) => ({
  footer: {
    margin: "50px auto",
    padding: "0 1em",

    "& ul": {
      paddingLeft: 0,
    },

    "& li": {
      listStyle: "none",
      fontSize: 13,
      wordBreak: "break-all",
    },

    "& a": {
      color: palette.info.main,
      "&:hover": {
        color: palette.info.light,
      },
    },
  },
}));

function dateFomatter(date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm");
}

function Article({
  d: {
    articles: [article],
  },
}) {
  const [state] = useStore();
  const tags = article.tags.map((v) => v.name);
  const keywords = [...state.site.keywords, ...tags].join(",");
  const classes = useStyles();

  return (
    <>
      <Head>
        <meta name="description" content={article.abstract} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Page>
        <SMain>
          <Markdown>{article.content}</Markdown>
          <footer className={classes.footer}>
            <ul>
              {article.archives.length > 0 && (
                <li>
                  归档：
                  {article.archives.map((v) => (
                    <Tag key={v}>{v.name}</Tag>
                  ))}
                </li>
              )}
              {tags.length > 0 && (
                <li>
                  标签：
                  {tags.map((v) => (
                    <Tag key={v}>{v}</Tag>
                  ))}
                </li>
              )}
              <li>最终发布：{dateFomatter(article.published_at)}</li>
              <li>上次更新：{dateFomatter(article.updated_at)}</li>
              <li>本文永久链接：{encodeURI(process.env.NEXT_PUBLIC_ENV_HOST + `/article/${article.name}`)}</li>
              <li>
                版权声明：
                <ALink rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">
                  <img
                    alt="知识共享许可协议"
                    style="border-width:0"
                    width={80}
                    height={15}
                    style={{ verticalAlign: "text-bottom", padding: "0 .5em" }}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPCAMAAABEF7i9AAAABGdBTUEAANbY1E9YMgAAAJZQTFRF////7u7u3d3dys7KzMzMyMzIxsrGxcbFur+6u7u7s7iyq7GqqqqqmZmZlJmTj5CPiIiIh4eHhoaGgICAfYJ9d3d3cnZxZ2tnZmZmW15bVVVVS0xLREREQ0NDQkJCQUJBOz07OTs5MzMzMTMxLjAuJygnJCUjIiIiISEhICAgGRkZERERDxAPDg4ODQ4NDQ0NDQ0MAAAADbeuvgAAAMNJREFUeNqtk9sSgiAQQJekslaNLpgZ3exiZWr7/z/XEI6N00spO/DCMocDywJZDiCwGhqIOpYkqiWVB4jOo7WfAQa5qA9RZ0R33hG4v36sOa0Q++tuwEIAT0kxRSkHdUR0Ju88gN5k5j/ABY0gjUHKjPkeyALRHZq8GfCvYUic6arEib6zzBHHg9rwd78vQxVlTPogy6ZhCyCWAryMIqYo6cHm1HjDVsDDzXKVg+e0Bm4vFv4hhjSreLt7106x3cuW4wXCCZ5As6hO5AAAAABJRU5ErkJggg=="
                  />
                  署名-非商业性使用-禁止演绎 4.0 国际 (CC BY-NC-ND 4.0)
                </ALink>
              </li>
            </ul>
          </footer>
        </SMain>
      </Page>
    </>
  );
}

export default Article;
