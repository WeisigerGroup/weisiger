import { useState } from 'react';
type Props = {
  link?:{href:string}
  linkText?:string
  backgroundColor?:string
  hoverColor?:string
  color?:string
  className?:string
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
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {linkText}
    </button>
  );
}
