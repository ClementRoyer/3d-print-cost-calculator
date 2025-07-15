import { memo } from 'react';

interface LogoProps {
  readonly className?: string;
}

export const Logo = memo<LogoProps>(({ className = "text-blue-600" }) => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    className={className}
    role="img"
    aria-label="3D Print Calculator Logo"
  >
    <rect 
      x="4" 
      y="4" 
      width="24" 
      height="24" 
      rx="4" 
      fill="currentColor" 
      fillOpacity="0.1" 
      stroke="currentColor" 
      strokeWidth="2"
    />
    <path 
      d="M10 12h12M10 16h8M10 20h10" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <circle 
      cx="22" 
      cy="8" 
      r="2" 
      fill="currentColor"
    />
  </svg>
));

Logo.displayName = 'Logo';