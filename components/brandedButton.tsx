import React, { useState } from 'react';

export default function BrandedButton({link, linkText, backgroundColor, color, hoverColor, className
}) {
  const { href, target, onClick, } = link ?? { href: '#' };
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
      style={buttonStyle}
      className={className}
      href={href}
      target={target}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {linkText}
    </button>
  );
}
