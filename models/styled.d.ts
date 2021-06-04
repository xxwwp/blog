import { Theme as MuiTheme } from "@material-ui/core";
import "@material-ui/styles";

declare module "@material-ui/styles" {
  interface DefaultTheme extends MuiTheme {}
}

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
