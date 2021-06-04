import { DetailedHTMLProps, HTMLAttributes } from "react";

declare global {
  type ElementProps<E = HTMLElement> = DetailedHTMLProps<HTMLAttributes<E>, E>;
}
