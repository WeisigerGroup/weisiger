import React, { useState, CSSProperties } from 'react';

type Link = {
    text?:string;
    link?:{href:string}
  };
  
  type MobileMenuProps = {
    links?: Link[];
    isOpen: boolean;
    toggleMenu: (open: boolean) => void;
    scrolled: boolean; // added this new prop
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
      position: 'absolute', // add this
      top: '50%', // add this
      left: scrolled ? 'auto' : '50%', // change this based on scrolled
      right: scrolled ? '20px' : 'auto', // add this
      transform: scrolled ? 'none' : 'translate(-50%, -50%)', // add this
      justifyContent: 'center',
      alignContent:'center',
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
            <div>
                =
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
