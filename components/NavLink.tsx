import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import cx from "classnames";
import React from "react";

export type Props = React.PropsWithChildren<LinkProps> & {
  activeClassName?: string;
};

/**
 * 导航链接
 * @refer https://frontend-digest.com/how-to-create-navlink-component-in-nextjs-586052e39ba7
 */
function NavLink({ children, activeClassName = "active", ...props }: Props) {
  const router = useRouter();
  const asPath = router.asPath;
  const child = React.Children.only(children) as React.ReactElement;
  const childClassName = child.props.className || "";

  const isActive = asPath === props.href || asPath === props.as;

  const className = cx(childClassName, { [activeClassName]: isActive });

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
}

export default NavLink;
