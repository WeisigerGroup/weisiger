import React, { useState } from 'react';

interface Link {
  href?: string;
  target?: string;
  onClick?: () => void;
}

interface BrandedButtonProps {
  link?: Link;
  linkText?: string;
  backgroundColor?: string;
  color?: string;
  hoverColor?: string;
  className?: string;
}

export default function BrandedButton({
  link,
  linkText,
  backgroundColor,
  color,
  hoverColor,
  className,
}: BrandedButtonProps) {
  const { href, target, onClick } = link ?? { href: '#' };
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
      ref={href}
      target={target}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {linkText}
    </button>
  );
}
