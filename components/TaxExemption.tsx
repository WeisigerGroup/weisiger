import { useState, useEffect } from 'react';
import { fetchToken } from '../pages/api/vertex';
// import { Button } from './ui/button';

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

declare global {
  interface Window {
    vertex: any;
  }
} 
declare const vertex: any;

const TaxExemption: BrandedButtonFunctionType = ({ link, linkText, backgroundColor, color, hoverColor, className, size, fullWidth, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const token: string = 'access token';
    const script = document.createElement('script');
    
    script.src = "https://ccwizard.vertexsmb.com/wizard/button.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      if (window.vertex) {
        console.log("vertex is available");
      } else {
        console.error("vertex is not available");
      }
    };

    const handleCertificateCreation = (event: MessageEvent) => {
      if (event.data && event.data.type === 'createdCertificates') {
        for (let i = 0; i < event.data.data.length; i++) {
          console.log("certificateId=" + event.data.data[i].id);
          console.log("buyerCode=" + event.data.data[i].buyerCode);
        }
      }
    };

    fetchToken()
      .then(response => {
        if (vertex && vertex.Wizard) {
      new vertex.Wizard({
          domNode: document.getElementById('wizard-btn'),
          wizardPath: 'https://ccwizard.vertexsmb.com/',
          accessToken: response.access_token,
          action: "CREATE",
          sellerCodes: ['000087'],
        });
        console.log("vertex.Wizard has been initialized");
        } else {
      console.error("vertex.Wizard is not available");
        }
        window.addEventListener("message", handleCertificateCreation);
      })
      .catch(error => {
        console.error("Failed to fetch token:", error);
      });

    return () => {
      document.body.removeChild(script);
      window.removeEventListener("message", handleCertificateCreation);
    };

  }, []);

  const buttonStyle = {
    backgroundColor: isHovered ? hoverColor : backgroundColor,
    color,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    border: 'none',
    outline: 'none',
    borderRadius: '3px',
    padding: '10px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: color
  };

  return (
    <>
      {link && 
        <a href={link.href} target={link.target} style={linkStyle}>
      <button
        onClick={(e) => e.preventDefault()}
        style={buttonStyle}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        id="wizard-btn"
      >
          {linkText}  
      </button>
      </a>
      }
    </>
  );
}

export const LinkButton: BrandedButtonFunctionType = TaxExemption;
export default TaxExemption;
