import React, { CSSProperties, useState } from 'react';
import DehazeOutlined from '@mui/icons-material/DehazeOutlined';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { 
  linkListStyle as baseLinkListStyle, 
  linksStyle, 
  linksHoverStyle, 
  containerStyle as baseContainerStyle, 
  hamburgerStyle as baseHamburgerStyle
} from './Styles/MobileMenuStyles';

type Link = {
  text?: string;
  link?: { href: string }
};

type MobileMenuProps = {
  links?: Link[];
  isOpen: boolean;
  toggleMenu: (open: boolean) => void;
  scrolled: boolean;
};

export default function MobileMenu({ links, isOpen, toggleMenu, scrolled }: MobileMenuProps) {
  const [hoveredLink, setHoveredLink] = useState(-1);

  const handleMenuClick = () => {
    toggleMenu(!isOpen);
  };

  // Update styles based on state
  const containerStyle: CSSProperties = {
    ...baseContainerStyle,
    justifyContent: scrolled ? 'flex-end' : 'center',
  };

  const hamburgerStyle: CSSProperties = {
    ...baseHamburgerStyle,
    position: scrolled ? 'static' : 'absolute',
    top: scrolled ? '0' : '20px',
    right: scrolled ? '0' : 'center',
  };

  const linkListStyle: CSSProperties = {
    ...baseLinkListStyle,
    maxHeight: isOpen ? '100vh' : '0',
    width: '100%',
    height: '100vh',
    position: 'fixed',
    top: scrolled ? '50px': '80px',
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 1000, 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
    boxSizing: 'border-box',
    overflowY: 'auto',
    transition: 'max-height 0.3s ease-in-out',
  };
  

  return (
    <div style={containerStyle}>
      <div style={hamburgerStyle} onClick={handleMenuClick}>
        {/* Conditionally render 'X' or hamburger icon */}
        {isOpen ? (
          <CloseOutlined />
        ) : (
          <DehazeOutlined />
        )}
      </div>
      {isOpen && (
        <ul style={linkListStyle}>
          {links?.map((link, i) => (
            <li key={i}>
              {link.link && <a
                style={i === hoveredLink ? linksHoverStyle : linksStyle}
                onMouseEnter={() => setHoveredLink(i)}
                onMouseLeave={() => setHoveredLink(-1)}>{link.text}</a>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
