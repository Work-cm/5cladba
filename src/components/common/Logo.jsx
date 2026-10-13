import Link from 'next/link';

export function LogoMark({ size = 36, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <clipPath id="k2flask"><path d="M27 6h10v15l11.4 26.2A6 6 0 0 1 43 56.5H21a6 6 0 0 1-5.4-9.3L27 21V6Z" /></clipPath>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#0f3229" />
      <circle cx="32" cy="32" r="30" fill="none" stroke="#c98f12" strokeWidth="2" />
      <path d="M27 6h10v15l11.4 26.2A6 6 0 0 1 43 56.5H21a6 6 0 0 1-5.4-9.3L27 21V6Z" fill="#e0efe8" />
      <g clipPath="url(#k2flask)">
        <rect x="8" y="34" width="48" height="30" fill="#c98f12" />
        <circle cx="27" cy="42" r="2.4" fill="#fdf8ec" opacity="0.75" />
        <circle cx="36" cy="46" r="1.7" fill="#fdf8ec" opacity="0.6" />
        <circle cx="32" cy="51" r="2.8" fill="#fdf8ec" opacity="0.5" />
      </g>
      <rect x="23" y="4" width="18" height="4" rx="2" fill="#e0efe8" />
    </svg>
  );
}

export default function Logo({ size = 36, dark = false, showDomain = true, href = '/', className = '' }) {
  return (
    <Link href={href} className={`flex items-center gap-2.5 group w-fit ${className}`} aria-label="K2LiquidStore home">
      <LogoMark size={size} className="shrink-0 drop-shadow-[0_6px_14px_rgba(15,50,41,0.35)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6" />
      <span className="flex flex-col leading-none">
        <span className={dark ? 'text-white' : 'text-ink'} style={{ fontSize: size * 0.52 }}>
          <span className="font-display font-black tracking-tight">K2</span>
          <span className="font-bold tracking-tight"> Liquid</span>
          <span className="font-bold tracking-tight text-cyan-600">Store</span>
        </span>
        {showDomain && (
          <span className={`text-[9px] tracking-[0.22em] uppercase font-semibold mt-1 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
            k2liquidstore.com
          </span>
        )}
      </span>
    </Link>
  );
}
