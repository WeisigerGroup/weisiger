import React, { CSSProperties, useState, useEffect } from 'react';
import Image from 'next/image';

const navbarStyle = (scrolled: boolean): CSSProperties => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  display: 'flex',
  justifyContent: 'center',
  padding: scrolled ? '10px 0' : '0',
  transition: 'all 0.4s',
  zIndex: 1000,
  width: '100%', 
});

const containerStyle = (scrolled: boolean): CSSProperties => ({
  maxWidth: '1100px',
  display: 'flex',
  flexDirection: scrolled ? 'row' : 'column',
  alignItems: 'center',
  justifyContent: scrolled ? 'space-between' : 'center',
  width: '100%',
});

const logoStyle = (scrolled: boolean) => ({
  maxHeight: scrolled ? '120px' : '240px',
  maxWidth: scrolled ? '120px' : '240px',
  transition: 'all 0.4s',
});

const linksStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  style: 'none'
};

const linkListItemStyle = {
  listStyle: 'none',
  padding: '0 10px 10px 10px'
};

type Props = {
  img?: {url:string}
  imgAlt?: string
  imgLink?: {href:string}
  links?: {text?:string;link?:{href:string}}[]
  className?:string
  color?:string
}

export default function Navbar({ img, imgAlt, imgLink, links, className, color }:Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={className} style={navbarStyle(scrolled)}>
      <div style={containerStyle(scrolled)}>
        <a {...imgLink}></a>
        {img&&imgAlt&&<Image style={logoStyle(scrolled)} src={img.url} alt={imgAlt} />}
        <div style={linksStyle as CSSProperties} color={color}>
          {links?.map((link, i) => (
            <li key={i} style={linkListItemStyle}>
              <a {...link.link}>{link.text}</a>
            </li>
          ))}
        </div>
      </div>
    </nav>
  );
}