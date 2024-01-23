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

const TaxExemptionCarolina: BrandedButtonFunctionType = ({ link, linkText, backgroundColor, color, hoverColor, className, size, fullWidth, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    // Function to load script and return a promise
    const loadScript = (src: string): Promise<HTMLScriptElement> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Failed to load script ${src}`));
        document.body.appendChild(script);
      });
    };

    const initializeWizard = (token: string) => {
      if (vertex && vertex.Wizard) {
        new vertex.Wizard({
          domNode: document.getElementById('construction-btn'),
          wizardPath: 'https://ccwizard.vertexsmb.com/',
          accessToken: token,
          action: "CREATE",
          sellerCodes: ['CAROLINA 1926 LLC'],
        });
        console.log("vertex.Wizard has been initialized");
      } else {
        console.error("vertex.Wizard is not available");
      }
    };

    // Load script and fetch token, then initialize wizard
    Promise.all([
      loadScript("https://ccwizard.vertexsmb.com/wizard/button.js"),
      fetchToken()
    ])
    .then(([_, tokenResponse]) => {
      initializeWizard(tokenResponse.access_token);
      window.addEventListener("message", handleCertificateCreation);
    })
    .catch(error => {
      console.error("Error in script loading or token fetching:", error);
    });

    const handleCertificateCreation = (event: MessageEvent) => {
      if (event.data && event.data.type === 'createdCertificates') {
        for (let i = 0; i < event.data.data.length; i++) {
          console.log("certificateId=" + event.data.data[i].id);
          console.log("buyerCode=" + event.data.data[i].buyerCode);
        }
      }
    };

    // Cleanup function
    return () => {
      const scriptElement = document.querySelector("script[src='https://ccwizard.vertexsmb.com/wizard/button.js']");
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
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
    align: 'center',
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
        id="construction-btn"
      >
          {linkText}  
      </button>
      </a>
      }
    </>
  );
}

export const LinkButton: BrandedButtonFunctionType = TaxExemptionCarolina;
export default TaxExemptionCarolina;
