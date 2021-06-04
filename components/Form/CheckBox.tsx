import styled from "@material-ui/styles/styled";
import { Checkbox } from "@material-ui/core";

const SLabel = styled("label")(({ theme: { palette } }) => ({
  display: "inline-block",
  cursor: "pointer",
  "&:hover": {
    color: palette.grey[300],
  },
}));

const SLabelContent = styled("span")({
  padding: "0 0.5rem",
});

const SCheckBox = styled("input")({
  border: "3px solid red",
});

interface FormItemProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: React.ReactNode;
}

export default function CheckBox({ ref, label, className, ...rest }: FormItemProps) {
  return (
    <SLabel id={rest.id} className={className}>
      <SCheckBox {...rest} type="checkbox" />
      <SLabelContent>{label}</SLabelContent>
    </SLabel>
  );
}
