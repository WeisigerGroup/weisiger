import React, { CSSProperties, useState, useEffect } from 'react';
import Image from 'next/image';
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

  const navbarStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    display: 'flex',
    justifyContent: 'center',
    padding: scrolled ? '10px 0' : '0',
    transition: 'all 0.4s',
    zIndex: 1000,
    width: '100%', 
  };

  const containerStyle: CSSProperties = {
    maxWidth: '1100px',
    display: 'flex',
    flexDirection: scrolled || isMobile ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: scrolled || isMobile ? 'space-between' : 'center',
    width: '100%',
    position: 'relative' // added this to position mobile menu relatively to this container
  };

  const logoStyle: CSSProperties = {
    maxHeight: scrolled ? '120px' : '240px',
    maxWidth: scrolled ? '120px' : '240px',
    transition: 'all 0.4s',
  };

  const linksStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  };

  const linkListItemStyle: CSSProperties = {
    listStyle: 'none',
    padding: '0 10px 20px 10px'
  };

  const linkStyle: CSSProperties = {
    color: "#63666a",
    textDecoration: 'none'
  };

  return (
    <nav className={className} style={navbarStyle}>
      <div style={containerStyle}>
        {imgLink && <a {...imgLink}></a>}
        {img && imgAlt && <Image style={logoStyle} src={img.url} alt={imgAlt} />}
        {isMobile ? 
          <MobileMenu links={links} isOpen={mobileMenuOpen} toggleMenu={setMobileMenuOpen} scrolled={scrolled} /> :
          <div style={linksStyle as CSSProperties} color={color}>
            {links?.map((link, i) => (
              <li key={i} style={linkListItemStyle}>
                {link.link && <a style={linkStyle} {...link.link}>{link.text}</a>}
              </li>
            ))}
          </div>
        }
      </div>
    </nav>
  );
}
