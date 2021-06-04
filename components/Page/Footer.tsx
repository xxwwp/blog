import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import ALink from "../ALink";

const useStyles = makeStyles((theme) => ({
  footer: {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 40%, ${theme.palette.primary.main})`,
    color: theme.palette.primary.contrastText,
  },
  bd: {
    maxWidth: 1280,
    margin: "auto",
  },
  sidedesc: {
    textAlign: "center",
  },
}));

const outlink = [{ name: "JNet 课程讲义", href: "https://xxwwp.github.io/jnet-basic/" }];

interface Props extends ElementProps {}

function Footer({ ref, className, ...rest }: Props) {
  const classes = useStyles();
  return (
    <footer {...rest} className={classNames(classes.footer, className)}>
      <div className={classes.bd}>
        <ul className="outlink">
          {outlink.map((v, i) => (
            <li key={i}>
              <ALink href={v.href} target="_blank">
                {v.name}
              </ALink>
            </li>
          ))}
        </ul>
        <p className={classes.sidedesc}>
          <a href="https://beian.miit.gov.cn/" target="_blank">
            黔ICP备19004874号
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
