import React, { useState, CSSProperties } from 'react';

type Link = {
  text?:string;
  link?:{href:string}
};

type MobileMenuProps = {
  links?: Link[];
  isOpen: boolean;
  toggleMenu: (open: boolean) => void;
};

export default function MobileMenu({ links, isOpen, toggleMenu }: MobileMenuProps) {
  const [showLinks, setShowLinks] = useState(false);

  const handleMenuClick = () => {
    setShowLinks(!showLinks);
  };

  const linkListStyle: CSSProperties = {
    listStyle: 'none',
    maxHeight: showLinks ? '100vh' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.5s ease-in-out',
  };

  const linksStyle: CSSProperties = {
    textDecoration: 'none',
    color: '#63666a'
  };

  const hamburgerStyle: CSSProperties = {
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '0'
  };

  return (
    <div>
      <div style={hamburgerStyle} onClick={handleMenuClick}>
        {/* Conditionally render 'X' or hamburger icon */}
        {showLinks ? (
          <span>X</span> 
        ) : (
          <>
            <div>-<br/>-</div>
          </>
        )}
      </div>
      <ul style={linkListStyle}>
        {links?.map((link, i) => (
          <li key={i}>
            {link.link && <a style={linksStyle} {...link.link}>{link.text}</a>}
          </li>
        ))}
      </ul>
    </div>
  );
}
