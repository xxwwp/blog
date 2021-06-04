import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import markdowns from "./markdowns";
import slug from "rehype-slug";
import raw from "rehype-raw";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";

const useStyles = makeStyles(({ palette }) => ({
  article: {
    color: palette.text.primary,
    // textShadow: `0 0 1px ${palette.primary.light}`,
    padding: "0 1em",

    "& h1": {
      fontSize: "2.2em",
    },
    [`
    & h1,
    & h2,
    & h3,
    & h4,
    & h5,
    & h6`]: {
      marginTop: "2.5em",

      "&::before": {
        content: `""`,
        display: "block",
        paddingTop: 80,
        marginTop: -80,
      },
    },

    "& ul,& ol": {
      margin: "1.4em 0",
    },
    "& li": {
      margin: "0.5em 0",
    },

    "& a": {
      color: palette.info.main,
      transition: "transform 0.3s",

      "&:hover": {
        color: palette.info.light,
      },

      "&:active": {
        color: palette.info.dark,
      },
    },

    "& pre": {
      textShadow: "none",
    },

    "& pre > div": {
      borderRadius: 10,
      margin: "2em -32px !important",
      padding: "1em 32px !important",
    },

    [`
    & blockquote,
    & .table-container`]: {
      margin: "2em -32px",
    },

    "& table": {
      width: "100%",
      borderSpacing: 5,
    },

    "@media screen and (max-width: 840px)": {
      "& pre > div": {
        borderRadius: 0,
        margin: "2em -16px !important",
        padding: "1em 16px !important",
      },
      [`
      & blockquote,
      & .table-container
      `]: {
        margin: "2em -16px",
      },

      "& .table-container": {
        width: "calc(100% + 32px)",
      },
    },

    "& code:not([class])": {
      padding: "0.1em 0.4em",
      fontFamily: `Inconsolata, Monaco, Consolas, "Courier New", Courier, monospace`,
      backgroundColor: palette.primary.light,
      color: palette.primary.contrastText,
      textShadow: "none",
    },

    "& blockquote": {
      border: `1px solid ${palette.grey[300]}`,
      paddingLeft: 16,
      position: "relative",
      color: palette.text.primary,
      textShadow: `0 0 3px ${palette.primary.contrastText}`,
      backgroundColor: palette.warning.light,

      "&::before": {
        content: `""`,
        width: 8,
        height: "calc(100% + 2px)",
        position: "absolute",
        left: 0,
        top: -1,
        backgroundColor: palette.warning.dark,
      },
    },

    "& .katex-container": {
      textAlign: "center",
    },

    "& .table-container": {
      overflowX: "auto",
    },

    "& thead": {
      borderBottom: `1px solid ${palette.grey[200]}`,
      backgroundColor: palette.primary.main,
      background: `linear-gradient(135deg, ${palette.primary.light}, ${palette.primary.main})`,
    },

    "& tbody": {
      borderBottom: `1px solid ${palette.grey[300]}`,
    },

    [`
    & tr,
    & th,
    & td`]: {
      border: "inherit",
    },

    [`
    & th,
    & td`]: {
      padding: "1em",
    },

    "& th": {
      whiteSpace: "nowrap",
      textAlign: "left",
      color: palette.text.primary,
      background: palette.primary.light,
      textShadow: `0 0 3px ${palette.primary.contrastText}`,
    },

    "& kbd": {
      fontFamily: `Inconsolata, Monaco, Consolas, "Courier New", Courier, monospace`,
      fontSize: "0.9em",
      fontWeight: "bold",
      padding: "0.15em 0.8em",
      margin: "0.2em 0",
      border: `3px outset ${palette.primary.light}`,
      borderRadius: 3,

      "&:active": {
        borderStyle: "inset",
      },
    },
  },
}));

interface Props extends ElementProps {}

function Markdown({ children, ref, className, ...props }: Props) {
  const classes = useStyles();
  if (typeof children === "string")
    return (
      <article {...props} className={classNames(className, classes.article)}>
        <ReactMarkdown components={markdowns} rehypePlugins={[slug, raw]} remarkPlugins={[gfm]}>
          {children}
        </ReactMarkdown>
      </article>
    );
  else {
    throw new Error("Markdown 组件只接受字符串作为子节点");
  }
}

export default Markdown;
