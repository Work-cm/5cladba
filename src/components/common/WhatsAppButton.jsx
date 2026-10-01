import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

export default function WhatsAppButton() {
  const whatsappNumber = '19062613088'; // +1 906-261-3088
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const telegramUrl = 'https://t.me/+19102279379'; // +1 910 227 9379

  return (
    <>
      {/* WhatsApp Button — bottom left */}
      <div className="fixed left-6 bottom-6 z-50">
        <div className="group relative">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:shadow-green-500/50 relative"
            aria-label="Chat with us on WhatsApp"
          >
            <FaWhatsapp className="text-3xl" aria-hidden="true" />

            {/* Pulse animation */}
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75 pointer-events-none"></span>
          </a>

          {/* Tooltip */}
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-50 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat with us on WhatsApp
          </span>
        </div>
      </div>

      {/* Telegram Button — bottom right */}
      <div className="fixed right-6 bottom-6 z-50">
        <div className="group relative">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-sky-500 hover:bg-sky-400 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:shadow-sky-500/50 relative"
            aria-label="Chat with us on Telegram"
          >
            <FaTelegramPlane className="text-3xl" aria-hidden="true" />

            {/* Pulse animation */}
            <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-75 pointer-events-none"></span>
          </a>

          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-50 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat with us on Telegram
          </span>
        </div>
      </div>
    </>
  );
}
