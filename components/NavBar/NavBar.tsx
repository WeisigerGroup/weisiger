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
  linksStyle, 
  linkListItemStyle, 
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
  subnavLinks: SubnavLink[];
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

  const updatedContainerStyle = {
    ...containerStyle,
    top: scrolled ? '0': '20px',
    bottom: scrolled ? '0' : '10px',
    flexDirection: (isMobile || scrolled ? 'row' : 'column') as 'row' | 'column',
    justifyContent: (isMobile || scrolled ? 'space-between' : 'center') as 'space-between' | 'center',
  };
  
  const updatedNavbarStyle = {
    ...navbarStyle,
    paddingBottom: scrolled ? '0' : '20px'
  };

  const updatedLogoStyle = {
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
          <NavigationMenu.List
              className="flex items-center"
              style={ linksStyle }
            >
              {links?.map((link, i) => (
                <NavigationMenu.Item
                  key={i}
                  className="relative"
                  style={ linkListItemStyle }
                >
                  {link.subnavLinks.length > 0 ? (
                    <NavigationMenu.Trigger asChild>
                      <span className="group cursor-pointer flex select-none items-center py-3 outline-none [text-transform:inherit]">
                        {link.text}
                        <svg
                          viewBox="0 0 8 6"
                          fill="none"
                          className="linear group-data-[state=open]:-rotate-180 ml-2 h-[6px] w-2 stroke-current transition-transform duration-300"
                        >
                          <path
                            d="M0 0L4 4L8 0"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </span>
                    </NavigationMenu.Trigger>
                  ) : (
                    <NavigationMenu.Link asChild>
                      <Link
                        href={link.links?.href ?? "#"}
                        target={link.links?.target}
                        className="group relative select-none py-3 leading-tight outline-none"
                      >
                        {link.text}

                        <div
                          className="absolute bottom-1 left-0 h-0.5 w-full origin-bottom-right scale-x-0 transition-transform group-hover:origin-bottom-left group-hover:scale-x-100"
                          style={ linkStyle}
                        ></div>
                      </Link>
                    </NavigationMenu.Link>
                  )}

                  {link.subnavLinks.length > 0 && (
                    <NavigationMenu.Content
                      className="animate-fadeInAndScale absolute top-full -left-2 min-w-[240px] origin-top rounded-md bg-white py-2 shadow-md ring-1 ring-black/10"
                      asChild
                    >
                      <ul>
                        {link.subnavLinks?.map((subnavLink, i) => (
                          <li key={i}>
                            <NavigationMenu.Link asChild>
                              <Link
                                href={subnavLink.link?.href ?? "#"}
                                target={subnavLink.link?.target}
                                className="block cursor-pointer rounded-sm px-4 py-2 text-gray-300 text-md outline-none transition-opacity hover:opacity-50"
                              >
                                {subnavLink.linkText}
                              </Link>
                            </NavigationMenu.Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenu.Content>
                  )}
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          
          /*
          <ul style={linksStyle}>
            {links?.map((link, i) => (
              <li key={i} style={linkListItemStyle}>
                {link.links && <a href={link.links.href} target={link.link.target}
              style={i === hoveredLink ? linksHoverStyle : linkStyle} 
              onMouseEnter={() => setHoveredLink(i)}
              onMouseLeave={() => setHoveredLink(-1)}
              onClick={onClick}>
                {link.text}
              </a>}
              </li>
            ))}
          </ul>
          */
        }
      </div>
    </nav>
  );
}

export default Navbar;
