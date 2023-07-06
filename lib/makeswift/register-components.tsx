import { Style, Link, TextInput, Color, Select, Shape, Image, List, Number } from '@makeswift/runtime/controls'
import { ReactRuntime } from '@makeswift/runtime/react'
import  BrandedButton  from '../../components/Button'
import { MakeswiftComponentType } from '@makeswift/runtime/components'
import dynamic from "next/dynamic";
import { Navigation } from '../../components/NavBar/Navigation';
import { forwardNextDynamicRef } from "@makeswift/runtime/next";

// Register your components here!

/*
This is the component that changes the standard button out to have a customizable hover color available.
*/
ReactRuntime.registerComponent(BrandedButton, {
  type: MakeswiftComponentType.Button,
  label: 'Branded Button',
  props: {
    linkText: TextInput({ label: 'Text', defaultValue: 'Enter text...' }),
    link: Link(),
    backgroundColor: Color({ label: 'Color', defaultValue: 'black' }),
    color: Color({ label: 'Text color', defaultValue: 'white' }),
    hoverColor: Color({ label: 'Hover color', defaultValue: 'white' }),
    className: Style({ properties: Style.All }),
  },
})

/*
This is the component that changes out the standard navigation to a more dynamic navigation
*/
ReactRuntime.registerComponent(forwardNextDynamicRef((patch) =>
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

