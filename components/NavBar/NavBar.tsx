import React, {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import Link from "next/link";

import * as Accordion from "@radix-ui/react-accordion";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Portal from "@radix-ui/react-portal";
import clsx from "clsx";

import {
  navbarStyle, 
  containerStyle, 
  logoStyle,  
  linkListItemStyle, 
  linksStyle,
  linkStyle, 
  linksHoverStyle
} from './Styles/NavBarStyles';
import MobileMenu from './MobileMenu';

type SubnavLink = {
  linkText?: string;
  link?: {
    href: string;
    target?: "_self" | "_blank";
  };
};

type LinkType = {
  text?:string; 
  links?: {
    href: string;
    target?: "_self" | "_blank";
  };
  // subnavLinks: SubnavLink[];
}

type Props = {
  img?: {url:string};
  imgAlt?: string;
  imgLink?: {href:string};
  links?: LinkType[];
  className?:string;
  color?:string;
  linkColor?: string,
  hoverColor?: string,
  linkGap?: number,
  onClick?: () => void;
}

const Navbar: React.FC<Props> = ({ img, imgAlt, imgLink, links, className, onClick, color }) => {
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

  const updatedContainerStyle: CSSProperties = {
    ...containerStyle,
    top: scrolled ? '0': '20px',
    bottom: scrolled ? '0' : '10px',
    flexDirection: (isMobile || scrolled ? 'row' : 'column') as 'row' | 'column',
    justifyContent: (isMobile || scrolled ? 'space-between' : 'center') as 'space-between' | 'center',
  };
  
  const updatedNavbarStyle: CSSProperties = {
    ...navbarStyle,
    paddingBottom: scrolled ? '0' : '20px'
  };

  const updatedLogoStyle: CSSProperties = {
    ...logoStyle,
    top: scrolled ? '10px' : '20px',
    padding: scrolled ? '10px': '10px',
    maxHeight: scrolled ? '80px' : '120px',
    maxWidth: scrolled ? '80px' : '120px',
  };

  return (
    <nav className={className} style={updatedNavbarStyle} onClick={() => console.log('Link clicked!')}>
      <div style={updatedContainerStyle}>
        {imgLink && <a {...imgLink}>
        {img && imgAlt && <Image style={updatedLogoStyle} src={img.url} alt={imgAlt} />}
        </a>}
        {isMobile ? 
          <MobileMenu links={links} isOpen={mobileMenuOpen} toggleMenu={setMobileMenuOpen} scrolled={scrolled} /> :                             
          <ul style={linksStyle}>
            {links?.map((link, i) => (
              <li key={i} style={linkListItemStyle}>
                {link.links && <a href={link.links.href} target={link.links.target}
              style={i === hoveredLink ? linksHoverStyle : linkStyle} 
              onMouseEnter={() => setHoveredLink(i)}
              onMouseLeave={() => setHoveredLink(-1)}
              onClick={onClick}>
                {link.text}
              </a>}
              </li>
            ))}
          </ul>
          
        }
      </div>
    </nav>
  );
}

export default Navbar;
