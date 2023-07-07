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
import DehazeOutlined from '@mui/icons-material/DehazeOutlined';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { 
  linkListStyle as baseLinkListStyle, 
  linksStyle, 
  linksHoverStyle, 
  containerStyle as baseContainerStyle, 
  hamburgerStyle as baseHamburgerStyle,
  mobileListItemStyle
} from './Styles/MobileMenuStyles';

type SubnavLink = {
  linkText?: string;
  link?: {
    href: string;
    target?: string;
  };
};

type Link = {
  text?: string;
  link?: { 
    href: string,
    target?: string
  };
  subnavLinks?: SubnavLink[];
};

type MobileMenuProps = {
  links?: Link[];
  isOpen: boolean;
  toggleMenu: (open: boolean) => void;
  scrolled: boolean;
};

export default function MobileMenu({ links, isOpen, toggleMenu, scrolled }: MobileMenuProps) {
  const [hoveredLink, setHoveredLink] = useState(-1);
  const linkColor = "#000";

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
    top: scrolled ? '0' : '-20px',
    right: scrolled ? '0' : '20px',
  };

  const linkListStyle: CSSProperties = {
    ...baseLinkListStyle,
    maxHeight: isOpen ? '100vh' : '0',
    width: '100%',
    height: '100vh',
    position: 'fixed',
    top: scrolled ? '50px': '102px',
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
        {isOpen ? (
          <CloseOutlined />
        ) : (
          <DehazeOutlined />
        )}
      </div>
      {isOpen && (
        <Accordion.Root type="multiple" style={linkListStyle}>
          {links?.map((link, i) => (
            link.subnavLinks && (link.subnavLinks.length > 0) ? (
              <Accordion.Item
                value={"item" + i}
                key={i}
                className="px-4 py-4 border-b border-black/15"
                style={{ color: linkColor }}
              >
                <Accordion.Trigger asChild>
                  <span className="group flex w-full items-center justify-between text-base outline-none">
                    {link.text}
                    <svg
                      viewBox="0 0 12 8"
                      fill="none"
                      className="linear group-data-[state=open]:-rotate-180 ml-2 h-2 w-3 stroke-current transition-transform duration-250"
                    >
                      <path
                        d="M0 0L6 6L12 0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </Accordion.Trigger>
                <Accordion.Content asChild>
                  <ul className="w-full overflow-hidden data-[state=closed]:animate-accordionSlideUp data-[state=open]:animate-accordionSlideDown">
                    {link.subnavLinks?.map((subnavLink, j) => (
                      <li key={j} className="w-full first:mt-3">
                        <Link
                          href={subnavLink.link?.href ?? "#"}
                          target={subnavLink.link?.target}
                          className="block w-full cursor-pointer items-center py-2.5 outline-none"
                        >
                          {subnavLink.linkText}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
            ) : (
              <li key={i} style={mobileListItemStyle}>
                {link.link && <Link href={link.link.href} target={link.link.target}
                  style={i === hoveredLink ? linksHoverStyle : linksStyle}
                  onMouseEnter={() => setHoveredLink(i)}
                  onMouseLeave={() => setHoveredLink(-1)}>
                  {link.text}
                  </Link>
                }
              </li>
            )
          ))}
        </Accordion.Root>
      )}
    </div>
  );
}
