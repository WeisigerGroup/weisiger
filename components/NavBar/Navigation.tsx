import React, {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import * as Accordion from "@radix-ui/react-accordion";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Portal from "@radix-ui/react-portal";
import clsx from "clsx";

import {LinkButton} from "../Button";

type SubnavLink = {
  linkText?: string;
  link?: {
    href: string;
    target?: "_self" | "_blank";
  };
};

type Link = {
  text?: string;
  link?: {
    href: string;
    target?: "_self" | "_blank";
  };
  subnavLinks: SubnavLink[];
};

type Props = {
  className?: string;
  linkTextStyle?: string;
  navWidth?: number;
  navBackground?: string;
  logoImage?: { url: string; dimensions: { width: number; height: number } };
  logoWidth: number;
  logoAlt: string;
  logoLink?: {
    href: string;
    target?: "_self" | "_blank";
  };
  links?: Link[];
  linkColor?: string;
  hoverColor?: string;
  linkGap?: number;
  ctaLink?: {
    href: string;
    target?: "_self" | "_blank";
  };
  ctaText?: string;
};


export function Navigation({
  className,
  linkTextStyle,
  navWidth,
  navBackground,
  logoImage,
  logoAlt,
  logoWidth,
  logoLink,
  links,
  linkColor,
  hoverColor,
  linkGap,
  ctaText,
  ctaLink,
}: Props) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navElement = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!navElement.current) return;

    setHeight(navElement.current.clientHeight);

    const observer = new ResizeObserver(([element]) =>
      setHeight(element.target.clientHeight)
    );

    observer.observe(navElement.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileNavOpen);
  }, [mobileNavOpen]);

  return (
    <>
      <header
        ref={navElement}
        className={clsx(
          className,
          linkTextStyle,
          "z-[110] relative ring-1 ring-black/10 backdrop-blur-[6px] py-3 px-4 md:px-8 lg:py-4 lg:px-10",
          mobileNavOpen && "min-h-0"
        )}
        style={{
          backgroundColor: navBackground,
        }}
      >
        <div
          className={`mx-auto flex w-full items-center justify-between lg:justify-start`}
          style={{
            maxWidth: `${navWidth}px`,
            columnGap: linkGap,
          }}
        >
          {logoImage && (
            <Link href={logoLink?.href ?? "#"} target={logoLink?.target}>
              <Image
                src={logoImage.url}
                alt={logoAlt}
                width={logoWidth}
                height={
                  logoWidth /
                  (logoImage.dimensions.width / logoImage.dimensions.height)
                }
                priority
              />
            </Link>
          )}

          <NavigationMenu.Root
            className="hidden flex-1 justify-end lg:flex"
            delayDuration={0}
          >
            <NavigationMenu.List
              className="flex items-center"
              style={{ columnGap: linkGap }}
            >
              {links?.map((link, i) => (
                <NavigationMenu.Item
                  key={i}
                  className="relative"
                  style={{ color: linkColor }}
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
                        href={link.link?.href ?? "#"}
                        target={link.link?.target}
                        className="group relative select-none py-3 leading-tight outline-none"
                      >
                        {link.text}

                        <div
                          className="absolute bottom-1 left-0 h-0.5 w-full origin-bottom-right scale-x-0 transition-transform group-hover:origin-bottom-left group-hover:scale-x-100"
                          style={{ backgroundColor: hoverColor }}
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
          </NavigationMenu.Root>

          <div className="flex gap-4">
            {ctaText && (
              <LinkButton
                link={ctaLink}
                size="medium"
                className="hidden lg:block"
              >
                {ctaText}
              </LinkButton>
            )}

            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="block lg:hidden"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                strokeWidth={2}
                style={{ stroke: linkColor }}
              >
                <path
                  d="M0 3H20M0 10H20M0 17H20"
                  className={mobileNavOpen ? "hidden" : ""}
                />
                <path
                  d="M2 2L18 18M18 2L2 18"
                  className={mobileNavOpen ? "block" : "hidden"}
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mobileNavOpen && (
        <Portal.Root asChild>
          <nav
            className={clsx(
              "fixed inset-x-0 bottom-0 -translate-y-full top-[var(--top)] flex flex-1 flex-col overflow-auto md:px-8 lg:px-10 animate-revealVertical backdrop-blur-[6px] transition-transform",
              linkTextStyle
            )}
            style={
              {
                backgroundColor: navBackground,
                "--top": `${height}px`,
              } as CSSProperties
            }
          >
            {ctaText && (
              <div className="px-4 pt-4 pb-2 border-t border-black/15">
                <LinkButton link={ctaLink} size="medium" fullWidth={true}>
                  {ctaText}
                </LinkButton>
              </div>
            )}

            <Accordion.Root type="multiple" className="flex-1">
              {links?.map((link, i) => (
                <Accordion.Item
                  value={"item" + i}
                  key={i}
                  className="px-4 py-4 border-b border-black/15"
                  style={{ color: linkColor }}
                >
                  {link.subnavLinks.length > 0 ? (
                    <>
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
                      <Accordion.AccordionContent asChild>
                        <ul className="w-full overflow-hidden data-[state=closed]:animate-accordionSlideUp data-[state=open]:animate-accordionSlideDown">
                          {link.subnavLinks?.map((subnavLink, i) => (
                            <li key={i} className="w-full first:mt-3">
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
                      </Accordion.AccordionContent>
                    </>
                  ) : (
                    <Link
                      href={link.link?.href ?? "#"}
                      target={link.link?.target}
                      className="block text-base outline-none"
                      style={{ color: linkColor }}
                    >
                      {link.text}
                    </Link>
                  )}
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </nav>
        </Portal.Root>
      )}
    </>
  );
}
