import React, { useState, CSSProperties } from 'react';
import  Icon from '@mui/material/Icon';

type Link = {
    text?:string;
    link?:{href:string}
  };
  
  type MobileMenuProps = {
    links?: Link[];
    isOpen: boolean;
    toggleMenu: (open: boolean) => void;
    scrolled: boolean;
  };
  
  export default function MobileMenu({ links, isOpen, toggleMenu, scrolled }: MobileMenuProps) {
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
      color: '#63666a',
      padding:'10px'
    };
  
    const hamburgerStyle: CSSProperties = {
        display: 'flex',
        justifyContent: scrolled ? 'flex-end' : 'center',
        cursor: 'pointer',
        padding: '0',
        position: scrolled ? 'static' : 'absolute',
        // top: scrolled ? undefined : 'calc(100% + 10px)',
        right: scrolled ? '0' : undefined,
      };

  return (
    <div>
      <div style={hamburgerStyle} onClick={handleMenuClick}>
        {/* Conditionally render 'X' or hamburger icon */}
        {showLinks ? (
          <Icon>close_outlined</Icon> 
        ) : (
          <>
            <div>
                <Icon>dehazed_outlined</Icon>
            </div>
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
