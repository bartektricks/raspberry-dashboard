import React from "react";
import cx from "classnames";

type ContainerTypes = {
  isSmall?: boolean;
  noGutter?: boolean;
};

const Container: React.FC<ContainerTypes> = ({
  children,
  isSmall = false,
  noGutter = false
}) => {
  const classes = cx("mx-auto", {
    "px-6": !noGutter,
    "max-w-screen-2xl": !isSmall,
    "max-w-sm": isSmall
  });
  return <div className={classes}>{children}</div>;
};

export default Container;
