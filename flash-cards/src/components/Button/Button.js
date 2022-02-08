import classNames from "classnames"

export const Button = ({
  children,
  onClick,
  block = false,
  variant = "primary",
  type = "button",
}) => (
  <button
    onClick={onClick}
    type={type}
    className={classNames("button", `button-${variant}`, {
      "button-block": block,
    })}
  >
    {children}
  </button>
)
