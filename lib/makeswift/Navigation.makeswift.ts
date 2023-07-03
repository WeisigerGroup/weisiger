import dynamic from "next/dynamic";
import { ReactRuntime } from '@makeswift/runtime/react'
import { MakeswiftComponentType } from "@makeswift/runtime";
import {
  Color,
  Image,
  Link,
  List,
  Number,
  Shape,
  Style,
  TextInput,
} from "@makeswift/runtime/controls";
import { forwardNextDynamicRef } from "@makeswift/runtime/next";

ReactRuntime.registerComponent(
  forwardNextDynamicRef((patch) =>
    dynamic(() =>
      patch(import("../../components/NavBar/Navigation").then(({ Navigation }) => Navigation))
    )
  ),
  {
    type: MakeswiftComponentType.Navigation,
    label: "Navigation",
    props: {
      className: Style(),
      navBackground: Color({
        label: "Background color",
        defaultValue: "#ffffff",
      }),
      navWidth: Number({
        label: "Max content width",
        defaultValue: 1200,
        suffix: "px",
        selectAll: true,
      }),
      logoImage: Image({
        label: "Logo",
        format: Image.Format.WithDimensions,
      }),
      logoWidth: Number({
        label: "Logo width",
        defaultValue: 160,
        suffix: "px",
        selectAll: true,
      }),
      logoAlt: TextInput({
        label: "Logo alt text",
        defaultValue: "Logo",
        selectAll: true,
      }),
      logoLink: Link({ label: "Logo on click" }),
      links: List({
        label: "Main links",
        type: Shape({
          type: {
            text: TextInput({
              label: "Text",
              defaultValue: "Link",
              selectAll: true,
            }),
            link: Link({ label: "On click (disabled with subnav)" }),
            subnavLinks: List({
              label: "Subnav links",
              type: Shape({
                type: {
                  link: Link({ label: "On click" }),
                  linkText: TextInput({
                    label: "Text",
                    defaultValue: "Link",
                    selectAll: true,
                  }),
                },
              }),
              getItemLabel(subnavLink) {
                return subnavLink?.linkText || "Link";
              },
            }),
          },
        }),
        getItemLabel(links) {
          return links?.text || "Link";
        },
      }),
      linkColor: Color({
        label: "Link color",
        defaultValue: "#000000",
      }),
      hoverColor: Color({
        label: "Hover line color",
        defaultValue: "#0F52BA",
      }),
      linkTextStyle: Style({ properties: [Style.TextStyle] }),
      linkGap: Number({
        label: "Link gap",
        defaultValue: 32,
        suffix: "px",
        selectAll: true,
      }),
      ctaText: TextInput({
        label: "CTA text",
        defaultValue: "Contact us",
        selectAll: true,
      }),
      ctaLink: Link({ label: "CTA on click" }),
    },
  }
);
