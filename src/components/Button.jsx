export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
}) {
  const cls = `btn ${
    variant === "primary"
      ? "primary"
      : variant === "ghost"
      ? "ghost"
      : variant === "subtle"
      ? "subtle"
      : variant === "danger"
      ? "danger"
      : ""
  }`;
  return (
    <button className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
