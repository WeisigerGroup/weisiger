import { useState } from 'react';

type LinkType = {
  href: string;
  target?: string;
}

type Props = {
  link?: LinkType;
  linkText?: string;
  backgroundColor?: string;
  hoverColor?: string;
  color?: string;
  className?: string;
  size?: string;
  fullWidth?: boolean;
  children?: React.ReactNode
}

type BrandedButtonFunctionType = (props: Props) => JSX.Element;

const BrandedButton: BrandedButtonFunctionType = ({ link, linkText, backgroundColor, color, hoverColor, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    backgroundColor: isHovered ? hoverColor : backgroundColor,
    color,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    border: 'none',
    outline: 'none',
    borderRadius: '3px',
    padding: '10px'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: color
  };

  return (
    <button
      style={buttonStyle}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    {link && 
      <a href={link.href} target={link.target} style={linkStyle}>
        {linkText}
      </a>
    }
    </button>
  );
}

export const LinkButton: BrandedButtonFunctionType = BrandedButton;

export default BrandedButton;
