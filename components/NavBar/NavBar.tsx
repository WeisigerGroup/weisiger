import React, { CSSProperties, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import classNames from "classnames"

import * as NavigationMenu from "@radix-ui/react-navigation-menu"

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
  img?: { url: string; dimensions: { width: number; height: number } }
  imgAlt?: string
  imgLink?: { href: string; target?: string }
  links?: LinkType[]
  className?: string
  linkColor?: string
  hoverColor?: string
  linkGap?: number
  onClick?: () => void
}

const Navbar = ({
  img,
  imgAlt,
  imgLink,
  links,
  onClick,
  className,
}: Props): React.ReactElement => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={classNames(
        "w-full",
        scrolled ? "h-[80px] md:h-[80px]" : "h-[80px] md:h-[160px]",
        className
      )}
    >
      <nav
        className={
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center drop-shadow-lg bg-white/90 backdrop-blur-sm"
        }
      >
        <div
          className={classNames(
            "relative w-full max-w-[1100px] items-center",
            scrolled
              ? "flex justify-between"
              : "flex justify-between md:flex-col md:justify-center"
          )}
        >
          <Link href={imgLink?.href ?? "#"} target={imgLink?.target}>
            {img && (
              <Image
                className={classNames(
                  "transition-all p-3 max-h-[80px] max-w-[80px] md:max-h-[120px] md:max-w-[120px] aspect-square",
                  scrolled
                    ? "md:max-h-[80px] md:max-w-[80px]"
                    : "md:max-h-[120px] md:max-w-[120px]"
                )}
                src={img.url}
                alt={imgAlt ?? ""}
                width={img.dimensions.width}
                height={img.dimensions.height}
              />
            )}
          </Link>
          {/* desktop nav */}
          <div className="hidden md:block">
            <NavigationMenu.Root delayDuration={0}>
              <NavigationMenu.List className="flex items-center">
                {links?.map((link, i) => (
                  <NavigationMenu.Item
                    key={i}
                    className="px-3 h-10 flex items-center"
                  >
                    {link.subnavLinks.length > 0 ? (
                      <>
                        <NavigationMenu.Trigger asChild>
                          <span className="group cursor-pointer flex select-none items-center outline-none [text-transform:inherit]">
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
          </div>
          {/* mobile nav */}
          <div className="block md:hidden">
            <MobileMenu
              links={links}
              isOpen={mobileMenuOpen}
              toggleMenu={setMobileMenuOpen}
              scrolled={scrolled}
            />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
