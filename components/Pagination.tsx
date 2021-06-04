import Link from "next/link";
import { Pagination as MuiPagination, PaginationItem as MuiPaginationItem } from "@material-ui/lab";
import React from "react";

interface LinkNode extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

const LinkNode = React.forwardRef<HTMLAnchorElement, LinkNode>(function ({ href, ...rest }, ref) {
  return (
    <Link href={href} passHref>
      <a {...rest} ref={ref} />
    </Link>
  );
});

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  current: number;
  links: string[];
}

export default function Pagination({ current = 0, links = [] }: Props) {
  if (links.length <= 1) {
    return "";
  }

  return (
    <MuiPagination
      page={current + 1}
      count={links.length}
      renderItem={(item) => (
        <MuiPaginationItem
          component={LinkNode}
          data-num={item.page}
          href={links[item.page - 1] ?? "/articles"}
          {...item}
        />
      )}
    />
  );
}
