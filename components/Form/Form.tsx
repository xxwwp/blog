import { ClassSharp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";

export { default as CheckBox } from "./CheckBox";
export { default as Radio } from "./Radio";

const useFormItemStyles = makeStyles(({ palette }) => ({
  fieldset: {
    border: "none",
    padding: 0,
    margin: "1rem 0",
  },
  legend: {
    color: palette.grey[600],
  },
}));

interface FormItemProps
  extends React.DetailedHTMLProps<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> {
  field?: string;
}

export function FormItem({ ref, children, field, className, ...rest }: FormItemProps) {
  const classes = useFormItemStyles();
  return (
    <fieldset {...rest} className={classNames(classNames, classes.fieldset)}>
      <legend className={classes.legend}>{field}</legend>
      {children}
    </fieldset>
  );
}

interface Props extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {}

function Form(props: Props) {
  return <form {...props} />;
}

export default Form;
