import React, { useState } from 'react';
import DehazeOutlined from '@mui/icons-material/DehazeOutlined';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { 
  linkListStyle, 
  linksStyle, 
  linksHoverStyle, 
  containerStyle, 
  hamburgerStyle 
} from './Styles/MobileMenuStyles';

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
    const [hoveredLink, setHoveredLink] = useState(-1);
  
    const handleMenuClick = () => {
      setShowLinks(!showLinks);
    };
  
    // Update styles based on state
    containerStyle.justifyContent = scrolled ? 'row' : 'column';
    hamburgerStyle.position = scrolled ? 'static' : 'absolute';
    hamburgerStyle.bottom = scrolled ? undefined : '-30px';
    linkListStyle.maxHeight = showLinks ? '100vh' : '0';
  
    return (
      <div style={containerStyle}>
        <div style={hamburgerStyle} onClick={handleMenuClick}>
          {/* Conditionally render 'X' or hamburger icon */}
          {showLinks ? (
            <CloseOutlined /> 
          ) : (
            <DehazeOutlined />
          )}
        </div>
        {showLinks && (
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