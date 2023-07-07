import React, { CSSProperties, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import * as NavigationMenu from "@radix-ui/react-navigation-menu"

import {
  navbarStyle,
  containerStyle,
  logoStyle,
  linkListItemStyle,
  linksStyle,
} from "./Styles/NavBarStyles"
import MobileMenu from "./MobileMenu"

type SubnavLink = {
  linkText?: string
  link?: {
    href: string
    target?: string
  }
}

type LinkType = {
  text?: string
  link?: {
    href: string
    target?: string
  }
  subnavLinks: SubnavLink[]
}

type Props = {
  img?: { url: string }
  imgAlt?: string
  imgLink?: { href: string }
  links?: LinkType[]
  className?: string
  color?: string
  linkColor?: string
  hoverColor?: string
  linkGap?: number
  onClick?: () => void
}

const Navbar: React.FC<Props> = ({
  img,
  imgAlt,
  imgLink,
  links,
  className,
  onClick,
  color,
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const updatedContainerStyle: CSSProperties = {
    ...containerStyle,
    top: scrolled ? "0" : "20px",
    bottom: scrolled ? "0" : "10px",
    flexDirection: (isMobile || scrolled ? "row" : "column") as
      | "row"
      | "column",
    justifyContent: (isMobile || scrolled ? "space-between" : "center") as
      | "space-between"
      | "center",
  }

  const updatedNavbarStyle: CSSProperties = {
    ...navbarStyle,
    paddingBottom: scrolled ? "0" : "20px",
  }

  const updatedLogoStyle: CSSProperties = {
    ...logoStyle,
    top: scrolled ? "10px" : "20px",
    padding: scrolled ? "10px" : "10px",
    maxHeight: scrolled ? "80px" : "120px",
    maxWidth: scrolled ? "80px" : "120px",
  }

  return (
    <nav
      className={className}
      style={updatedNavbarStyle}
      onClick={() => console.log("Link clicked!")}
    >
      <div style={updatedContainerStyle}>
        {imgLink && (
          <a {...imgLink}>
            {img && imgAlt && (
              <Image style={updatedLogoStyle} src={img.url} alt={imgAlt} />
            )}
          </a>
        )}
        {isMobile ? (
          <MobileMenu
            links={links}
            isOpen={mobileMenuOpen}
            toggleMenu={setMobileMenuOpen}
            scrolled={scrolled}
          />
        ) : (
          <NavigationMenu.Root
            className="hidden flex-1 justify-end lg:flex"
            delayDuration={0}
          >
            <NavigationMenu.List style={linksStyle}>
              {links?.map((link, i) => (
                <NavigationMenu.Item key={i} style={linkListItemStyle}>
                  {link.subnavLinks.length > 0 ? (
                    <>
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

                      <NavigationMenu.Content
                        className="animate-fadeIn absolute top-full -left-2 min-w-[240px] origin-top rounded-md bg-white py-2 shadow-md ring-1 ring-black/10"
                        asChild
                      >
                        <ul>
                          {link.subnavLinks?.map((subnavLink, i) => (
                            <li key={i}>
                              <NavigationMenu.Link asChild>
                                <Link
                                  href={subnavLink.link?.href ?? "#"}
                                  target={subnavLink.link?.target}
                                  className="block cursor-pointer rounded-sm px-4 py-2 text-gray-700 text-md outline-none transition-opacity hover:text-blue"
                                >
                                  {subnavLink.linkText}
                                </Link>
                              </NavigationMenu.Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenu.Content>
                    </>
                  ) : (
                    <NavigationMenu.Link asChild>
                      <Link
                        href={link.link?.href ?? "#"}
                        target={link.link?.target}
                        className="text-gray-700 hover:text-blue"
                        onClick={onClick}
                      >
                        {link.text}
                      </Link>
                    </NavigationMenu.Link>
                  )}
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        )}
      </div>
    </nav>
  )
}

export default Navbar
