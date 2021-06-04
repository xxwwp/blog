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

  navUl: {
    margin: 0,
    overflow: "auto",
    display: "flex",
    listStyle: "none",
  },
  navItem: {
    marginRight: "20px",
    fontWeight: "lighter",
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
        <nav>
          <ul className={classes.navUl}>
            {navs.map((v) => (
              <li className={classes.navItem} key={v.name}>
                <Link href={v.path}>
                  <a className="nav-link">{v.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* <div className="toggle-theme">
          <IconButton>
            {theme.name === "light" ? (
              <Moon color={theme.color.white} size={20} onClick={handleToggleTheme} />
            ) : (
              <Sun color={theme.color.black} size={20} onClick={handleToggleTheme}></Sun>
            )}
          </IconButton>
        </div> */}
      </div>
    </header>
  );
}

export default Header;
