import "../styles/globals.scss";
import { StoreProvider } from "../utils/store";
import Head from "next/head";
import { makeStyles, ThemeProvider as MuiThemeProvider } from "@material-ui/styles";
import { MuiLight } from "../constants/theme";

function MaterialTheme({ children }) {
  return <MuiThemeProvider theme={MuiLight}>{children}</MuiThemeProvider>;
}

function MyApp({ Component, pageProps }) {
  useGlobalStyles();
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* 百度站长 */}
        <meta name="baidu-site-verification" content="code-gwY2gl0OlF" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <StoreProvider>
        <MaterialTheme>
          <Component {...pageProps} />
        </MaterialTheme>
      </StoreProvider>
    </>
  );
}

export default MyApp;

const useGlobalStyles = makeStyles((theme) => ({
  "@global": {
    "html,body": {
      padding: 0,
      margin: 0,
      lineHeight: 1.75,
    },
    a: {
      color: "inherit",
      textDecoration: "none",
      transition: "text-shadow 0.1s",
    },
    "@media screen and (min-width: 1024px)": {
      article: {
        "& ::-webkit-scrollbar": {
          width: 8,
          height: 8,
          borderRadius: 1,
        },
        "& ::-webkit-scrollbar-thumb": {
          background: "rgb(190, 190, 190)",
          borderRadius: 4,
        },
      },
    },
  },
}));
