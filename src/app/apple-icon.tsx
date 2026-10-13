export const contentType = 'image/svg+xml';
export const size = { width: 180, height: 180 };

export default function AppleIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180" fill="none">
  <defs>
    <clipPath id="f"><path d="M75.6 17h28.4v42l32.4 74.4a17 17 0 0 1-15.3 26.4H58.9a17 17 0 0 1-15.3-26.4L75.6 59V17Z"/></clipPath>
  </defs>
  <rect width="180" height="180" rx="40" fill="#0f3229"/>
  <circle cx="90" cy="90" r="82" fill="none" stroke="#c98f12" stroke-width="5"/>
  <path d="M75.6 17h28.4v42l32.4 74.4a17 17 0 0 1-15.3 26.4H58.9a17 17 0 0 1-15.3-26.4L75.6 59V17Z" fill="#e0efe8"/>
  <g clip-path="url(#f)">
    <rect x="20" y="96" width="140" height="86" fill="#c98f12"/>
    <circle cx="76" cy="118" r="6.8" fill="#fdf8ec" opacity="0.75"/>
    <circle cx="102" cy="130" r="4.8" fill="#fdf8ec" opacity="0.6"/>
    <circle cx="90" cy="144" r="8" fill="#fdf8ec" opacity="0.5"/>
  </g>
  <rect x="64" y="11" width="52" height="11" rx="5.5" fill="#e0efe8"/>
</svg>`;
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
