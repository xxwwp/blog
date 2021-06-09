import gql from "graphql-tag";
import { paperProps, useStore } from "../utils";
import SMain from "../components/SMain";
import Page from "../components/Page";
import Form, { FormItem, Radio } from "../components/Form";
import ArticleList from "../components/Page/ArticleList";
import { useRouter } from "next/router";
import qs from "qs";
import Pagination from "../components/Pagination";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Head from "next/head";

// 每页数量
const PAGE_COUNT = 10;

export async function getServerSideProps(c) {
  const { page = "0", tag = "null", archive = "null" } = c.query;
  const start = page * PAGE_COUNT;

  const gqlWhere = `
    {
      tags:{${tag === "null" ? `` : `id:${tag}`}},
      archives: {${archive === "null" ? `` : `id:${archive}`}}
    }
  `;

  const res = await paperProps(gql`
    query {
      articlesCount ( where: ${gqlWhere}) 
      articles (start:${page * PAGE_COUNT}, limit:${PAGE_COUNT}, where:${gqlWhere}, sort:"published_at:desc") {
        id
        name
        updated_at
        created_at
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
      tags {
        id
        name
      }
      archives {
        id
        name
      }
    }
  `);

  if (res.props.d.articlesCount < start) {
    c.res.statusCode = 404;
    return { props: { statusCode: 404 } };
  } else {
    return res;
  }
}

function createUrl(query, name, value) {
  return `?${qs.stringify({ ...query, [name]: value })}`;
}

function Home({ statusCode, d, ...r }) {
  if (statusCode === 404) {
    return <SMain>404</SMain>;
  }

  const [state] = useStore();

  const classes = useStyles();

  const { query, replace } = useRouter();
  const { tag = "null", archive = "null", page = "0" } = query;
  const currentPage = JSON.parse(page);

  // 页面总数
  const pageCount = Math.ceil(d.articlesCount / PAGE_COUNT);
  // 计算总页数并生成每页链接
  const PaginationLinks = [..."".padEnd(pageCount)].map((_, i) => createUrl(query, "page", i));

  // 上下页
  const prevPage = currentPage > 0 ? createUrl(query, "page", currentPage - 1) : undefined;
  const nextPage = currentPage < pageCount - 1 ? createUrl(query, "page", currentPage + 1) : undefined;

  // 单选按钮控制
  function handleRadio(e, name) {
    replace(createUrl(query, [name], e.target.value));
  }

  return (
    <>
      <Head>
        <meta name="description" content={state.site.description} />
        <meta name="keywords" content={state.site.keywords.join(",")} />
        <title>{state.site.name}</title>
      </Head>
      <Page>
        <SMain className={classes.main}>
          <Paper className={classes.ctrl}>
            <Form action="./" className="filter">
              <FormItem field="归档">
                <Radio
                  name="archive"
                  label="所有"
                  value="null"
                  checked={archive === "null"}
                  onChange={(e) => handleRadio(e, "archive")}
                />
                {d.archives.map(({ id, name }) => (
                  <Radio
                    key={id}
                    id={`archives-${id}`}
                    name="archive"
                    label={name}
                    value={id}
                    checked={archive === id}
                    onChange={(e) => handleRadio(e, "archive")}
                  />
                ))}
              </FormItem>
              <FormItem field="标签">
                <Radio
                  name="tag"
                  label="所有"
                  value="null"
                  checked={tag === "null"}
                  onChange={(e) => handleRadio(e, "tag")}
                />
                {d.tags.map(({ id, name }) => (
                  <Radio
                    key={id}
                    id={`tag-${id}`}
                    name="tag"
                    label={name}
                    value={id}
                    checked={tag === id}
                    onChange={(e) => handleRadio(e, "tag")}
                  />
                ))}
              </FormItem>
            </Form>
          </Paper>

          <div className={classes.article}>
            <ArticleList articles={d.articles} />
            <Pagination prev={prevPage} next={nextPage} current={currentPage} links={PaginationLinks} />
          </div>
        </SMain>
      </Page>
    </>
  );
}

const useStyles = makeStyles(() => {
  const minScreen = `@media screen and (max-width:1024px)`;
  return {
    main: {
      display: "flex",
      alignItems: "flex-start",
      [minScreen]: {
        flexFlow: "column",
        alignItems: "stretch",
      },
    },
    ctrl: {
      flex: "0 0 200px",
      margin: "1rem",
      padding: 16,
      position: "sticky",
      top: 60,
      [minScreen]: {
        // flex: "0 0 auto",
        width: "auto",
        position: "static",
      },
    },
    article: {
      flex: 1,
    },
  };
});

export default Home;
