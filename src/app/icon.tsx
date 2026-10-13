export const contentType = 'image/svg+xml';
export const size = { width: 32, height: 32 };

export default function Icon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="32" height="32" fill="none">
  <polygon points="32,4 56.2,18 56.2,46 32,60 7.8,46 7.8,18" fill="#431329"/>
  <polygon points="32,4 56.2,18 56.2,46 32,60 7.8,46 7.8,18" fill="none" stroke="#f089ac" stroke-width="2"/>
  <polygon points="32,15 46.7,23.5 46.7,40.5 32,49 17.3,40.5 17.3,23.5" fill="none" stroke="#fcebf2" stroke-width="2" stroke-linejoin="round"/>
  <circle cx="32" cy="32" r="8.5" fill="none" stroke="#fcebf2" stroke-width="2"/>
  <circle cx="32" cy="4" r="3" fill="#f089ac"/>
  <circle cx="7.8" cy="46" r="3" fill="#f089ac"/>
  <circle cx="56.2" cy="46" r="3" fill="#f089ac"/>
  <line x1="32" y1="15" x2="32" y2="7.5" stroke="#fcebf2" stroke-width="2"/>
  <line x1="17.3" y1="40.5" x2="9.5" y2="45" stroke="#fcebf2" stroke-width="2"/>
  <line x1="46.7" y1="40.5" x2="54.5" y2="45" stroke="#fcebf2" stroke-width="2"/>
</svg>`;
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
