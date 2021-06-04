import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import ALink from "./ALink";

const useStyles = makeStyles(() => ({
  "404": {
    textAlign: "center",
    fontSize: 30,

    "&::first-letter": {
      fontSize: 50,
    },
  },
  desc: {
    textAlign: "center",
  },
}));

export default function Page404() {
  const [time, setTime] = useState(10);
  const classes = useStyles();

  useEffect(() => {
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, setTime]);

  return (
    <div>
      <p className={classes["404"]}>404</p>
      <p className={classes.desc}>
        访问页面未找到，将在 {time} 秒后回到 <ALink href="/">主页</ALink>
      </p>
    </div>
  );
}
