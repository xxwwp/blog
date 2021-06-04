import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import React from "react";
import { makeStyles } from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  externalLink: {
    margin: "0 0.5ex",
    height: "1.7ex",
    verticalAlign: "-0.15ex",
  },
}));

interface Props extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  fill?: string;
  stroke?: string;
}

const ALink = React.forwardRef<HTMLAnchorElement, Props>(
  ({ ref, children, fill = "none", stroke = "currentColor", ...rest }, anchorRef) => {
    const classes = useStyles();
    return (
      <a ref={anchorRef} {...rest}>
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={classes.externalLink}
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
    );
  }
);

export default ALink;
