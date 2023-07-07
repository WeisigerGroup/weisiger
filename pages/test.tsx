import Navbar from "../components/NavBar/NavBar"

export default function Test() {
  return (
    <div>
      <Navbar
        img={{
          url: "/logo.png",
          dimensions: {
            width: 200,
            height: 200,
          },
        }}
        links={[
          {
            text: "Test",
            link: {
              href: "#",
            },
            subnavLinks: [],
          },
          {
            text: "Test",
            link: {
              href: "#",
            },
            subnavLinks: [
              {
                linkText: "Subnav Link",
                link: {
                  href: "#",
                },
              },
            ],
          },
          {
            text: "Test",
            link: {
              href: "#",
            },
            subnavLinks: [
              {
                linkText: "Subnav Link",
                link: {
                  href: "#",
                },
              },
            ],
          },
        ]}
      />
      <div className="h-[2000px] w-full bg-blue"></div>
    </div>
  )
}
