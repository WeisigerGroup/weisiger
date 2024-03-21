import React from "react"
import Link from "next/link"

import * as Accordion from "@radix-ui/react-accordion"
import DehazeOutlined from "@mui/icons-material/DehazeOutlined"
import CloseOutlined from "@mui/icons-material/CloseOutlined"
import classNames from "classnames"

type SubnavLink = {
  linkText?: string
  link?: {
    href: string
    target?: string
  }
}

type Link = {
  text?: string
  link?: {
    href: string
    target?: string
  }
  subnavLinks?: SubnavLink[]
}

type MobileMenuProps = {
  links?: Link[]
  isOpen: boolean
  toggleMenu: (open: boolean) => void
  scrolled: boolean
}

export default function MobileMenu({
  links,
  isOpen,
  toggleMenu,
}: MobileMenuProps) {
  return (
    <div className={classNames("w-full flex-col justify-center items-center")}>
      <button aria-label="menu" className="p-3" onClick={() => toggleMenu(!isOpen)}>
        {isOpen ? <CloseOutlined /> : <DehazeOutlined />}
      </button>
      {isOpen && (
        <Accordion.Root
          type="multiple"
          className={classNames(
            "w-full h-screen fixed left-0 bg-white/90 backdrop-blur-sm z-50 flex-col justify-center items-center p-6 overflow-y-auto transition-all top-[80px]",
            isOpen ? "max-h-[100vh]" : "max-h-0"
          )}
        >
          {links?.map((link, i) =>
            link.subnavLinks && link.subnavLinks.length > 0 ? (
              <Accordion.Item value={"item" + i} key={i} className="px-4 pt-4">
                <Accordion.Trigger asChild>
                  <div className="group flex w-full items-center justify-between text-base outline-none text-gray-700 hover:text-blue">
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
                  </div>
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
              <li key={i} className="px-4 pt-4 list-none">
                {link.link && (
                  <Link
                    href={link.link.href}
                    target={link.link.target}
                    className="text-gray-700 hover:text-blue"
                  >
                    {link.text}
                  </Link>
                )}
              </li>
            )
          )}
        </Accordion.Root>
      )}
    </div>
  )
}
