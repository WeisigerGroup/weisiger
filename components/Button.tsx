import { useState } from 'react';
// import {Button} from './ui/button'

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
    display: 'flex',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    border: 'none',
    outline: 'none',
    borderRadius: '3px',
    padding: '10px',
    align: 'center',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: color
  };

  return (
    <>
    {link && 
      <a href={link.href} target={link.target} style={linkStyle}>
    <button
      style={buttonStyle}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        {linkText}
    </button>
    </a>
    }
    </>
  );
}

export const LinkButton: BrandedButtonFunctionType = BrandedButton;

export default BrandedButton;
