export const contentType = 'image/svg+xml';
export const size = { width: 180, height: 180 };

export default function AppleIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180" fill="none">
  <rect width="180" height="180" rx="40" fill="#2b0b1a"/>
  <polygon points="90,22.8 148.2,56.4 148.2,123.6 90,157.2 31.8,123.6 31.8,56.4" fill="#431329"/>
  <polygon points="90,22.8 148.2,56.4 148.2,123.6 90,157.2 31.8,123.6 31.8,56.4" fill="none" stroke="#f089ac" stroke-width="5"/>
  <polygon points="90,49.2 125.3,69.6 125.3,110.4 90,130.8 54.7,110.4 54.7,69.6" fill="none" stroke="#fcebf2" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="90" cy="90" r="20.4" fill="none" stroke="#fcebf2" stroke-width="5"/>
  <circle cx="90" cy="22.8" r="7.2" fill="#f089ac"/>
  <circle cx="31.8" cy="123.6" r="7.2" fill="#f089ac"/>
  <circle cx="148.2" cy="123.6" r="7.2" fill="#f089ac"/>
  <line x1="90" y1="49.2" x2="90" y2="31" stroke="#fcebf2" stroke-width="5"/>
  <line x1="54.7" y1="110.4" x2="37" y2="120.5" stroke="#fcebf2" stroke-width="5"/>
  <line x1="125.3" y1="110.4" x2="143" y2="120.5" stroke="#fcebf2" stroke-width="5"/>
</svg>`;
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
