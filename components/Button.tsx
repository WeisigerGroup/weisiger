import { useState } from 'react';
type Props = {
  link?:{
    href:string,
    target:string
  }
  linkText?:string
  backgroundColor?:string
  hoverColor?:string
  color?:string
  className?:string
  onClick?: () => void
}

export default function BrandedButton({link, linkText, backgroundColor, color, hoverColor, className
}:Props) {
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


  return (
    <button
      {...link}
      style={buttonStyle}
      className={className}>
        <a
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
        {linkText}
      </a>
    </button>
  );
}
