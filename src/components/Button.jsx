import './Button.css';

export default function Button({ children, variant = 'primary', size = '', icon, className = '', ...props }) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size && `btn-${size}`,
    icon && !children && 'btn-icon',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {icon && icon}
      {children}
    </button>
  );
}
