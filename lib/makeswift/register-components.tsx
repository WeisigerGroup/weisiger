import { Style, Link, TextInput, Color, Select, Shape, Image, List } from '@makeswift/runtime/controls'
import { ReactRuntime } from '@makeswift/runtime/react'
import  BrandedButton  from '../../components/Button'
import { MakeswiftComponentType } from '@makeswift/runtime/components'
import Navbar from '../../components/NavBar'

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
ReactRuntime.registerComponent(Navbar, {
  type: MakeswiftComponentType.Navigation,
  label: 'Navigation',
  props: {
    img: Image({format: Image.Format.WithDimensions}),
    imgAlt: TextInput({ label: 'Image alt text', defaultValue: '' }),
    imgLink: Link({label: 'Logo link'}),
    links: List({
      label: 'Navigation links',
      type: Shape({
          type: {
              text: TextInput({ label: 'Text', defaultValue: 'Link', selectAll: true }),
              link: Link({ label: 'On click' })
          }
      }),
      getItemLabel(link) {
          return link?.text || 'Link'
      }
  }),
    backgroundColor: Color({ label: 'Color', defaultValue: 'white' }),
    color: Color({ label: 'Text color', defaultValue: 'black' }),
    className: Style({ properties: Style.All }),
  },
})

