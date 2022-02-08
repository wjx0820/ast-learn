export const Select = ({ ariaLabel, children, onChange, value }) => (
  <select
    value={value}
    onChange={onChange}
    className="select"
    aria-label={ariaLabel}
  >
    {children}
  </select>
);
