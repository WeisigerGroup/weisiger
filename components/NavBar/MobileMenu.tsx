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
    maxHeight: showLinks ? '100vh' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.5s ease-in-out',
  };

  const hamburgerStyle: CSSProperties = {
    cursor: 'pointer',
  };

  return (
    <div>
      <div style={hamburgerStyle} onClick={handleMenuClick}>
        {/* This is a simple hamburger icon. Replace it with an actual icon if needed. */}
        <div>-</div>
        <div>-</div>
        <div>-</div>
      </div>
      <ul style={linkListStyle}>
        {links?.map((link, i) => (
          <li key={i}>
            {link.link && <a {...link.link}>{link.text}</a>}
          </li>
        ))}
      </ul>
    </div>
  );
}
