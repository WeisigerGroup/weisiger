import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  navbarStyle, 
  containerStyle, 
  logoStyle, 
  linksStyle, 
  linkListItemStyle, 
  linkStyle, 
  linksHoverStyle
} from './Styles/NavBarStyles';
import MobileMenu from './MobileMenu';

type LinkType = {
  text?:string; 
  link?:{href:string};
}

type Props = {
  img?: {url:string};
  imgAlt?: string;
  imgLink?: {href:string};
  links?: LinkType[];
  className?:string;
  color?:string;
}

const Navbar: React.FC<Props> = ({ img, imgAlt, imgLink, links, className, color }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const updatedContainerStyle = {
    ...containerStyle,
    top: scrolled ? '0': '20px',
    bottom: scrolled ? '0' : '10px',
    flexDirection: (isMobile || scrolled ? 'row' : 'column') as 'row' | 'column',
    justifyContent: (isMobile || scrolled ? 'space-between' : 'center') as 'space-between' | 'center',
  };
  

  const updatedLogoStyle = {
    ...logoStyle,
    top: scrolled ? '10px' : '30px',
    padding: scrolled ? '10px': '10px',
    maxHeight: scrolled ? '80px' : '120px',
    maxWidth: scrolled ? '80px' : '120px',
  };

  return (
    <nav className={className} style={navbarStyle}>
      <div style={updatedContainerStyle}>
        {imgLink && <a {...imgLink}>
        {img && imgAlt && <Image style={updatedLogoStyle} src={img.url} alt={imgAlt} />}
        </a>}
        {isMobile ? 
          <MobileMenu links={links} isOpen={mobileMenuOpen} toggleMenu={setMobileMenuOpen} scrolled={scrolled} /> :
          <ul style={linksStyle}>
            {links?.map((link, i) => (
              <li key={i} style={linkListItemStyle}>
                {link.link && <a 
              style={i === hoveredLink ? linksHoverStyle : linkStyle} 
              onMouseEnter={() => setHoveredLink(i)}
              onMouseLeave={() => setHoveredLink(-1)}>{link.text}</a>}
              </li>
            ))}
          </ul>
        }
      </div>
    </nav>
  );
}

export default Navbar;
