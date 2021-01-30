import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from "react";
import cx from "classnames";

interface ButtonInterface {
  isLoading?: boolean;
  renderAs?: "button" | "a";
  isBlock?: boolean;
}

type ButtonTypes = (
  | ButtonHTMLAttributes<HTMLButtonElement>
  | AnchorHTMLAttributes<HTMLAnchorElement>
) &
  ButtonInterface;

const Button: FC<ButtonTypes> = ({
  renderAs = "button",
  isLoading = false,
  isBlock = false,
  className,
  children,
  ...props
}) => {
  const TagName = renderAs;
  const classes = cx(
    "w-full py-2 text-center uppercase font-bold rounded-md bg-indigo-700 transition-all",
    {
      block: isBlock,
      "pointer-events-none": isLoading
    }
  );

  return (
    <TagName {...props} className={classes} disabled={isLoading}>
      {isLoading ? (
        <svg
          className="text-gray-50 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 38 38"
          stroke="currentColor"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
              <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
      ) : (
        children
      )}
    </TagName>
  );
};

export default Button;
