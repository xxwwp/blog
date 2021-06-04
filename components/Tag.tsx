import styled from "@material-ui/styles/styled";
import Link from "next/link";

const STag = styled("span")(({ theme }) => ({
  padding: "2px 8px",
  margin: 2,
  borderRadius: 4,
  backgroundColor: theme.palette.warning.light,
  color: theme.palette.text.primary,
  fontWeight: "bold",
}));

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  herf?: string;
}

export default function Tag({ ref, herf, children, ...props }: Props) {
  return <STag {...props}>{herf ? <Link href={herf}>{children}</Link> : children}</STag>;
}
