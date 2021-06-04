import styled from "@material-ui/styles/styled";
import { Radio as MuiRadio } from "@material-ui/core";

const SLabel = styled("label")(({ theme: { palette } }) => ({
  display: "inline-block",
  cursor: "pointer",
  "&:hover": {
    color: palette.text.secondary,
  },
}));

const SLabelContent = styled("span")({
  padding: "0 0.5rem",
});

interface FormItemProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: React.ReactNode;
}

export default function Radio({ ref, label, className, color, size, ...rest }: FormItemProps) {
  return (
    <SLabel id={rest.id} className={className}>
      <MuiRadio {...rest} color="primary" />
      <SLabelContent>{label}</SLabelContent>
    </SLabel>
  );
}
