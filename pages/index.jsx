import Link from "next/link";
import { makeStyles } from "@material-ui/styles";

function createBg() {
  const basicColor = ["rgb(225, 0, 255, 0.1)", "rgb(13, 187, 253, 0.1)", "rgb(0, 255, 255, 0.1)"];

  function createLinear(start, end, color) {
    return `linear-gradient(to right , transparent ${start}%, ${color} ${start}%, ${color} ${end}%, transparent ${end}%)`;
  }

  const res = [];

  for (let i = 0; i < 10; i++) {
    res.push(createLinear(2.5 + i * 10, 7.5 + i * 10, basicColor[i % 3]));
  }

  return res.join(",");
}

const useStyles = makeStyles({
  main: {
    textAlign: "center",
    color: "#0dbbfd",
    textShadow: "3px 2.8px 2px #e100ff, -2.5px -3px 2px #00ffff",

    "&::before": {
      content: '""',
      background: createBg(),
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none",
    },

    "& .name": {
      marginTop: 100,
      fontSize: 60,
      letterSpacing: 30,
      lineHeight: 1,
      fontWeight: "lighter",
    },

    "& .addr": {
      fontSize: 50,
      fontStyle: "italic",
      lineHeight: 1,
      fontWeight: "lighter",
    },
    "& .navs": {
      padding: 0,
    },
    "& .nav-item": {
      listStyle: "none",
    },
    "& .nav-link": {
      textDecoration: "underline dotted",
    },
  },
});

function Home({}) {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <h1 className="name">玄晓乌屋</h1>
      <p className="addr">xxwwp.com</p>
      <ul className="navs">
        <li className="nav-item">
          <Link href="/articles">
            <a className="nav-link"># 文章</a>
          </Link>
        </li>
      </ul>
    </main>
  );
}

export default Home;
