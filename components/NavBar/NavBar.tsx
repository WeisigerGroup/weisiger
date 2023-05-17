import React, { CSSProperties, useState, useEffect } from 'react';
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

type Props = {
  img?: {url:string}
  imgAlt?: string
  imgLink?: {href:string}
  links?: {text?:string; link?:{href:string}}[]
  className?:string
  color?:string
}

export default function Navbar({ img, imgAlt, imgLink, links, className, color }:Props) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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

    // Call handleResize once when the component mounts
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
}, []);

  // Update styles based on state
  navbarStyle.padding = scrolled ? '10px 0' : '0';
  containerStyle.flexDirection = scrolled ? 'row' : 'column';
  containerStyle.justifyContent = scrolled || isMobile ? 'space-between' : 'center';
  logoStyle.padding = scrolled ? '10px' : '10px';
  logoStyle.maxHeight = scrolled ? '80px' : '120px';
  logoStyle.maxWidth = scrolled ? '80px' : '120px';

  return (
    <nav className={className} style={navbarStyle}>
      <div style={containerStyle}>
        {imgLink && <a {...imgLink}>
        {img && imgAlt && <Image style={logoStyle} src={img.url} alt={imgAlt} />}
        </a>}
        {isMobile ? 
          <MobileMenu links={links} isOpen={mobileMenuOpen} toggleMenu={setMobileMenuOpen} scrolled={scrolled} /> :
          <div style={linksStyle as CSSProperties} color={color}>
            {links?.map((link, i) => (
              <li key={i} style={linkListItemStyle}>
                {link.link && <a 
              style={i === hoveredLink ? linksHoverStyle : linkStyle} 
              onMouseEnter={() => setHoveredLink(i)}
              onMouseLeave={() => setHoveredLink(-1)}>{link.text}</a>}
              </li>
            ))}
          </div>
        }
      </div>
    </nav>
  );
}
