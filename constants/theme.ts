import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

export const MuiLight = createMuiTheme({
  palette: {
    primary: {
      main: "#2196f3",
      dark: "#1769aa",
      light: "#4dabf5",
      contrastText: "#fff",
    },
    warning: {
      light: orange[100],
      main: orange[400],
      dark: orange[700],
      contrastText: "#424242",
    },
  },
});
