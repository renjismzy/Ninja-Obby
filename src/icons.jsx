import React from 'react';

export const CoinIcon = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <circle cx="32" cy="32" r="30" fill="#FFD54F" stroke="#C79020" strokeWidth="4" />
    <circle cx="32" cy="32" r="22" fill="#FFC107" stroke="#C79020" strokeWidth="3" />
    <g stroke="#C79020" strokeWidth="2" strokeLinecap="round">
      <line x1="32" y1="12" x2="32" y2="20" />
      <line x1="32" y1="44" x2="32" y2="52" />
      <line x1="12" y1="32" x2="20" y2="32" />
      <line x1="44" y1="32" x2="52" y2="32" />
      <line x1="18" y1="18" x2="23" y2="23" />
      <line x1="41" y1="41" x2="46" y2="46" />
      <line x1="18" y1="46" x2="23" y2="41" />
      <line x1="41" y1="23" x2="46" y2="18" />
    </g>
  </svg>
);

export const GemIcon = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <polygon
      points="32,6 50,18 56,34 32,58 8,34 14,18"
      fill="#2196F3"
      stroke="#0D47A1"
      strokeWidth="3"
    />
    <polygon points="32,12 46,22 50,34 32,50 14,34 18,22" fill="#64B5F6" />
    <polygon points="32,22 39,28 32,34 25,28" fill="#E3F2FD" />
  </svg>
);

export const ShopIcon = ({ size = 24, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M16 26h32l-4 26H20z"
      fill="#A66A3F"
      stroke="#3E2A1D"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M22 24c0-6 4-10 10-10s10 4 10 10"
      fill="none"
      stroke="#3E2A1D"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <rect x="16" y="30" width="32" height="6" fill="#8D5A32" />
  </svg>
);

export const DefaultNinjaIcon = ({ size = 48, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <circle cx="32" cy="16" r="10" fill="#808080" />
    <rect x="24" y="26" width="16" height="20" rx="6" fill="#808080" />
    <rect x="20" y="46" width="24" height="12" rx="4" fill="#808080" />
    <rect x="22" y="14" width="20" height="6" rx="3" fill="#202020" />
    <rect x="26" y="16" width="4" height="2" rx="1" fill="#FFFFFF" />
    <rect x="34" y="16" width="4" height="2" rx="1" fill="#FFFFFF" />
  </svg>
);

export const ShadowNinjaIcon = ({ size = 48, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <circle cx="32" cy="16" r="10" fill="#111111" />
    <rect x="24" y="26" width="16" height="20" rx="6" fill="#111111" />
    <rect x="20" y="46" width="24" height="12" rx="4" fill="#111111" />
    <rect x="22" y="14" width="20" height="6" rx="3" fill="#000000" />
    <rect x="26" y="16" width="4" height="2" rx="1" fill="#FFFFFF" />
    <rect x="34" y="16" width="4" height="2" rx="1" fill="#FFFFFF" />
  </svg>
);

export const FireNinjaIcon = ({ size = 48, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M32 6c6 6 4 10 0 14 6-1 10 2 10 8 0 8-7 14-10 14s-10-6-10-14c0-6 4-9 10-8-4-4-6-8 0-14Z"
      fill="#FF6D00"
    />
    <path
      d="M20 44c0-8 6-14 12-14s12 6 12 14v12H20V44Z"
      fill="#FF6D00"
    />
    <path d="M24 56h16v6H24z" fill="#FF6D00" />
    <path d="M22 26h20v8H22z" fill="#1A1A1A" opacity="0.9" />
    <path d="M28 28h4v2h-4z" fill="#FFFFFF" />
    <path d="M36 28h4v2h-4z" fill="#FFFFFF" />
    <path d="M10 50c6-2 10-6 12-10-6 2-10 4-12 10Z" fill="#FF6D00" opacity="0.85" />
    <path d="M54 50c-6-2-10-6-12-10 6 2 10 4 12 10Z" fill="#FF6D00" opacity="0.85" />
  </svg>
);

export const IceNinjaIcon = ({ size = 48, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path d="M32 6l6 10-6 4-6-4 6-10Z" fill="#90CAF9" stroke="#1E88E5" strokeWidth="2" />
    <circle cx="32" cy="20" r="10" fill="#1565C0" />
    <path d="M20 46c0-8 6-14 12-14s12 6 12 14v10H20V46Z" fill="#1565C0" />
    <path d="M24 56h16v6H24z" fill="#1565C0" />
    <path d="M22 18h20v8H22z" fill="#0D47A1" opacity="0.9" />
    <path d="M28 20h4v2h-4z" fill="#FFFFFF" />
    <path d="M36 20h4v2h-4z" fill="#FFFFFF" />
    <path d="M8 46l10-6-2 12L8 46Z" fill="#64B5F6" />
    <path d="M56 46l-10-6 2 12 8-6Z" fill="#64B5F6" />
    <path d="M18 40l8-4-4 10-4-6Z" fill="#BBDEFB" />
    <path d="M46 36l-8 4 4 10 4-14Z" fill="#BBDEFB" opacity="0.8" />
  </svg>
);

export const GoldNinjaIcon = ({ size = 48, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <rect x="6" y="6" width="52" height="52" rx="10" fill="#FBC02D" stroke="#8D6E00" strokeWidth="3" />
    <circle cx="32" cy="22" r="10" fill="#FFD54F" />
    <path d="M20 46c0-8 6-14 12-14s12 6 12 14v10H20V46Z" fill="#FFD54F" />
    <path d="M22 20h20v8H22z" fill="#8D6E00" opacity="0.8" />
    <path d="M28 22h4v2h-4z" fill="#FFFFFF" />
    <path d="M36 22h4v2h-4z" fill="#FFFFFF" />
    <circle cx="18" cy="18" r="2" fill="#FFF8E1" />
    <circle cx="48" cy="20" r="2" fill="#FFF8E1" />
    <circle cx="44" cy="46" r="2" fill="#FFF8E1" />
  </svg>
);

export const DragonNinjaIcon = ({ size = 48, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M18 18c4-6 8-8 14-8s10 2 14 8c-5-2-9-2-14-2s-9 0-14 2Z"
      fill="#1B5E20"
    />
    <path d="M18 18c-4 0-8-2-10-6 6 1 10 2 10 6Z" fill="#2E7D32" />
    <path d="M46 18c4 0 8-2 10-6-6 1-10 2-10 6Z" fill="#2E7D32" />
    <circle cx="32" cy="22" r="10" fill="#1B5E20" />
    <path d="M20 48c0-8 6-14 12-14s12 6 12 14v10H20V48Z" fill="#1B5E20" />
    <path d="M22 20h20v8H22z" fill="#0D3D14" opacity="0.9" />
    <path d="M28 22h4v2h-4z" fill="#FFFFFF" />
    <path d="M36 22h4v2h-4z" fill="#FFFFFF" />
    <path
      d="M22 40h20l-2 10H24l-2-10Z"
      fill="#2E7D32"
      opacity="0.9"
    />
    <path d="M26 42l6-2 6 2-6 2-6-2Z" fill="#66BB6A" />
    <path d="M26 46l6-2 6 2-6 2-6-2Z" fill="#66BB6A" />
  </svg>
);

export const HealthPotionIcon = ({ size = 32, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M26 8h12v10c0 2 2 4 4 4h2c4 0 8 4 8 10v16c0 8-6 14-14 14H26c-8 0-14-6-14-14V32c0-6 4-10 8-10h2c2 0 4-2 4-4V8Z"
      fill="#E53935"
      stroke="#1B1B1B"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path d="M22 40h20v6H22z" fill="#FFFFFF" opacity="0.95" />
    <path d="M24 6h16v6H24z" fill="#FFFFFF" stroke="#1B1B1B" strokeWidth="3" strokeLinejoin="round" />
  </svg>
);

export const QuestionIcon = ({ size = 20, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <circle cx="32" cy="32" r="28" fill="rgba(0,0,0,0.75)" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
    <path
      d="M26 26c0-4 3-8 9-8 6 0 9 3 9 7 0 3-2 5-5 7-2 1-3 2-3 5v2h-6v-3c0-5 2-7 5-9 2-1 3-2 3-3 0-2-2-3-3-3-2 0-4 1-4 4h-5Z"
      fill="#FFFFFF"
    />
    <circle cx="32" cy="46" r="3" fill="#FFFFFF" />
  </svg>
);

export const PauseIcon = ({ size = 20, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <rect x="18" y="14" width="10" height="36" rx="3" fill="#FFFFFF" />
    <rect x="36" y="14" width="10" height="36" rx="3" fill="#FFFFFF" />
  </svg>
);

export const PlayIcon = ({ size = 20, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path d="M22 16l28 16-28 16V16Z" fill="#FFFFFF" />
  </svg>
);

export const CloseIcon = ({ size = 18, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path d="M18 18l28 28" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
    <path d="M46 18L18 46" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

export const EnergyPackIcon = ({ size = 36, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <rect x="12" y="16" width="40" height="40" rx="6" fill="#9C27B0" stroke="#6A1B9A" strokeWidth="2" />
    <path d="M32 24l6 10h-12z" fill="#E1BEE7" />
    <path d="M32 40l-6-10h12z" fill="#E1BEE7" />
    <circle cx="32" cy="32" r="4" fill="#E1BEE7" />
    <path d="M24 32l-6-4v8z" fill="#E1BEE7" />
    <path d="M40 32l6-4v8z" fill="#E1BEE7" />
    <circle cx="20" cy="20" r="3" fill="#FFD54F" opacity="0.9" />
    <circle cx="44" cy="24" r="2" fill="#FFD54F" opacity="0.8" />
    <circle cx="48" cy="44" r="2.5" fill="#FFD54F" opacity="0.85" />
  </svg>
);

export const ResetIcon = ({ size = 36, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <circle cx="32" cy="32" r="24" fill="none" stroke="#FF6B6B" strokeWidth="3" />
    <path
      d="M32 12c11 0 20 9 20 20"
      fill="none"
      stroke="#FF6B6B"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path d="M48 28l6-4v8l-6-4z" fill="#FF6B6B" />
    <path
      d="M32 20c-6 0-11 4-13 10"
      fill="none"
      stroke="#FFB74D"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.7"
    />
    <circle cx="32" cy="32" r="3" fill="#FF6B6B" />
  </svg>
);
