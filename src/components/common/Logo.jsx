import Link from 'next/link';

// Hexagon ring points for a 64x64 viewBox (radius 30, centered at 32,32)
const HEX_OUTER = '32,4 56.2,18 56.2,46 32,60 7.8,46 7.8,18';
const HEX_INNER = '32,15 46.7,23.5 46.7,40.5 32,49 17.3,40.5 17.3,23.5';

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
      {/* Outer hexagon badge */}
      <polygon points={HEX_OUTER} fill="#431329" />
      <polygon points={HEX_OUTER} fill="none" stroke="#f089ac" strokeWidth="2" />
      {/* Inner benzene ring */}
      <polygon points={HEX_INNER} fill="none" stroke="#fcebf2" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="8.5" fill="none" stroke="#fcebf2" strokeWidth="2" />
      {/* Atom nodes on outer ring */}
      <circle cx="32" cy="4" r="3" fill="#f089ac" />
      <circle cx="7.8" cy="46" r="3" fill="#f089ac" />
      <circle cx="56.2" cy="46" r="3" fill="#f089ac" />
      {/* Bond lines from ring to atoms */}
      <line x1="32" y1="15" x2="32" y2="7.5" stroke="#fcebf2" strokeWidth="2" />
      <line x1="17.3" y1="40.5" x2="9.5" y2="45" stroke="#fcebf2" strokeWidth="2" />
      <line x1="46.7" y1="40.5" x2="54.5" y2="45" stroke="#fcebf2" strokeWidth="2" />
    </svg>
  );
}

export default function Logo({ size = 36, dark = false, showDomain = true, href = '/', className = '' }) {
  return (
    <Link href={href} className={`flex items-center gap-2.5 group w-fit ${className}`} aria-label="5fadb5cladba home">
      <LogoMark size={size} className="shrink-0 drop-shadow-[0_6px_14px_rgba(67,19,41,0.35)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6" />
      <span className="flex flex-col leading-none">
        <span className={dark ? 'text-white' : 'text-ink'} style={{ fontSize: size * 0.5 }}>
          <span className="font-mono font-bold tracking-tight">5FADB</span>
          <span className="font-mono font-bold tracking-tight text-cyan-600">5CLADBA</span>
        </span>
        {showDomain && (
          <span className={`text-[9px] tracking-[0.22em] uppercase font-semibold mt-1 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
            5fadb5cladba.com
          </span>
        )}
      </span>
    </Link>
  );
}
