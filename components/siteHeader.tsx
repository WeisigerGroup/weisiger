import React, { useState, useEffect } from 'react';

const navbarStyle = (scrolled: boolean): CSSProperties => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
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

const logoStyle = (scrolled) => ({
  maxHeight: scrolled ? '120px' : '240px',
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


export default function Navbar({ img, imgAlt, imgLink, links, className, color }) {
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
        <a href={imgLink}>
          <img style={logoStyle(scrolled)} src={img} alt={imgAlt} />
        </a>
        <div style={linksStyle}>
          {links?.map((link, i) => (
            <li key={i} style={linkListItemStyle}>
              <a {...link.url}>{link.text}</a>
            </li>
          ))}
        </div>
      </div>
    </nav>
  );
}