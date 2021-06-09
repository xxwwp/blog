import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import Link from "next/link";
// import Moon from "../icon/Moon";
// import Sun from "../icon/Sun";

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: `0 0px 5px 0px ${theme.palette.primary.light}`,
    background: `linear-gradient(175deg, ${theme.palette.primary.light} 40%, ${theme.palette.primary.main})`,
    color: theme.palette.primary.contrastText,
    lineHeight: "50px",
  },
  bd: {
    maxWidth: 1280,
    margin: "auto",
    display: "flex",
  },

  sidename: {
    margin: "0 20px",
    "& a": {
      textDecoration: "none",
      fontSize: "1.5em",
      fontWeight: "lighter",
    },
  },
}));

const navs = [{ name: "文章", path: "/articles" }];

interface Props extends ElementProps {}

function Header({ ref, ...rest }: Props) {
  const classes = useStyles();

  return (
    <header {...rest} className={classNames(classes.header, rest.className)}>
      <div className={classes.bd}>
        <div className={classes.sidename}>
          <Link href="/">
            <a>玄晓乌屋</a>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
