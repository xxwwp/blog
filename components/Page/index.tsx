import Header from "./Header";
import Footer from "./Footer";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "#__next": {
      minHeight: "100vh",
    },
    html: {
      color: theme.palette.text.primary,
    },
    body: {
      backgroundColor: theme.palette.background.paper,
    },
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  footer: {
    position: "sticky",
    top: "100vh",
    display: "flow-root",
  },
}));

function Page({ children, ...rest }) {
  const classes = useStyles();
  return (
    <>
      <Header className={classes.header} />
      {children}
      <Footer className={classes.footer} />
    </>
  );
}
export default Page;
