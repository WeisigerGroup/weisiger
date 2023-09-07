import { useState } from 'react';

type LinkType = {
  href: string;
  target?: string;
}

type Props = {
  link?: LinkType;
  linkText?: string;
  backgroundColor?: string;
  hoverColor?: string;
  color?: string;
  className?: string;
  size?: string;
  fullWidth?: boolean;
  children?: React.ReactNode
}

type BrandedButtonFunctionType = (props: Props) => JSX.Element;

declare var vertex: any;

const TaxExemption: BrandedButtonFunctionType = ({ link, linkText, backgroundColor, color, hoverColor, className }) => {
  const [isHovered, setIsHovered] = useState(false);

    const token = 'access token';
    $.ajax({
          url: "https://auth.vertexsmb.com/identity/connect/token",
          method: "POST",
          data: {
            "client_id": "943115e883d243e48c359f6599b198ef",
            "client_secret": "0fc0eb81a635420585f2662a71d58b3d",
            "grant_type": "client_credentials",
            "scope": "vtms-internal-api ecw-wizard-api"
          },
        }).then(function (response) {
          // Configure the wizard
    const btn = new vertex.Wizard({
    domNode: document.getElementById('wizard-btn'),
    wizardPath: 'https://ccwizard.vertexsmb.com/',
    accessToken: response.access_token,
            action: "CREATE",
    sellerCodes: ['CAROLINA'],
    })
  }).catch(error => {
      // Handle errors here
      console.error("Failed to fetch token:", error);
    });

  const buttonStyle = {
    backgroundColor: isHovered ? hoverColor : backgroundColor,
    color,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    border: 'none',
    outline: 'none',
    borderRadius: '3px',
    padding: '10px'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: color
  };

  return (
    <button
      style={buttonStyle}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="wizard-btn"
    >
    {link && 
      <a href={link.href} target={link.target} style={linkStyle}>
        {linkText}
      </a>
    }
    </button>
  );
}

export const LinkButton: BrandedButtonFunctionType = TaxExemption;

export default TaxExemption;
