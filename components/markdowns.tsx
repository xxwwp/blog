import codeTheme from "react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Link from "next/link";
import katex from "katex";
// 数学绘制 css
import "katex/dist/katex.min.css";
import React from "react";
import LinkIcon from "./icon/Link";
import { styled, makeStyles } from "@material-ui/styles";
import { NormalComponents, SpecialComponents } from "react-markdown/src/ast-to-react";
import ALink from "./ALink";
import classNames from "classnames";

const useHeadingStyles = makeStyles(({ palette }) => ({
  heading: {
    marginLeft: -16,

    "& .link-icon": {
      marginRight: 2,
      visibility: "hidden",
    },

    "&:hover .link-icon": {
      color: palette.text.primary,
      visibility: "visible",
    },

    "&:active .link-icon": {
      color: palette.text.hint,
    },
  },
}));

/** 标题元素 */
function Heading({ level, node, id, children, className, ...props }) {
  const classes = useHeadingStyles();
  const Anchor = (
    <a href={`#${id}`} key={id}>
      <LinkIcon className="link-icon" size={14} />
    </a>
  );
  return React.createElement(
    `h${level}`,
    {
      id,
      ...props,
      className: classNames(className, classes.heading),
    },
    [Anchor, ...children]
  );
}

/** a 元素 */
function Anchor({ href = "", ...props }) {
  if (href[0] === "#") {
    return <ALink href={href} {...props} />;
  } else if (href[0] === "/" && href[1] !== "/") {
    return (
      <Link href={href} passHref={true}>
        <ALink {...props} />
      </Link>
    );
  } else {
    return <ALink href={href} {...props} target="_blank" rel="noopener" />;
  }
}

/** code 元素 */
function Code({ node, inline, className, children, ...props }) {
  const math = className?.search("language-math") ?? -1;
  if (math !== -1) {
    return <div className="katex-container" dangerouslySetInnerHTML={{ __html: katex.renderToString(children[0]) }} />;
  }

  const match = /language-(\w+)/.exec(className || "");
  return !inline ? (
    <SyntaxHighlighter
      style={codeTheme}
      language={match?.[1] ?? "plain"}
      PreTag="div"
      children={String(children).replace(/\n$/, "")}
      {...props}
    />
  ) : (
    <code className={className} children={children} {...props} />
  );
}

/** 表格 */
function Table(props) {
  return (
    <div className="table-container">
      <table {...props} />
    </div>
  );
}

export default {
  code: Code,
  a: Anchor,
  h1: Heading,
  h2: Heading,
  h3: Heading,
  h4: Heading,
  h5: Heading,
  h6: Heading,
  table: Table,
} as unknown as Partial<NormalComponents & SpecialComponents>;
