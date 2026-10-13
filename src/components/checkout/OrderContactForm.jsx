'use client';

import { useState } from 'react';
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaPaperPlane,
  FaUser,
  FaMapMarkerAlt,
  FaCommentDots,
} from 'react-icons/fa';

const WHATSAPP_NUMBER = '15125922145'; // +1 512-592-2145
const TELEGRAM_NUMBER = 'cannachem'; // @cannachem

function buildMessage({ name, contact, address, notes }, cart, orderDetails) {
  const itemLines = cart
    .map((item) => {
      const price = Number(item.price ?? item.variant?.price ?? 0);
      const lineTotal = (price * item.quantity).toFixed(2);
      const variantLabel = item.variant?.label ?? (item.variant?.grams ? `${item.variant.grams}g` : '');
      const variant = variantLabel ? ` (${variantLabel})` : '';
      return `- ${item.name}${variant} x${item.quantity} @ \u20ac${price.toFixed(2)} = \u20ac${lineTotal}`;
    })
    .join('\n');

  return [
    'New Order Request',
    '',
    `Name: ${name}`,
    `Contact: ${contact}`,
    `Shipping Address: ${address}`,
    notes ? `Message: ${notes}` : null,
    '',
    'Order Items:',
    itemLines,
    '',
    `Subtotal: \u20ac${orderDetails.subtotal.toFixed(2)}`,
    `Shipping: \u20ac${orderDetails.shipping.toFixed(2)}`,
    `Tax: \u20ac${orderDetails.tax.toFixed(2)}`,
    `Total: \u20ac${orderDetails.total.toFixed(2)}`,
  ]
    .filter((line) => line !== null)
    .join('\n');
}

export default function OrderContactForm({ cart, orderDetails }) {
  const [method, setMethod] = useState('whatsapp');
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    address: '',
    notes: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid =
    form.name.trim() &&
    form.contact.trim() &&
    form.address.trim() &&
    confirmed;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const message = buildMessage(form, cart, orderDetails);
    const text = encodeURIComponent(message);
    const url = method === 'whatsapp'
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
      : `https://t.me/${TELEGRAM_NUMBER}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const inputClass = 'bg-gray-50 border border-gray-200 text-gray-900 rounded-lg py-2.5 pl-9 pr-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent placeholder-gray-400 text-sm';
  const labelClass = 'block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5';
  const iconClass = 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs';

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <FaUser className="text-sky-500 text-sm" />
        <h2 className="text-lg font-bold text-gray-900">Your Details</h2>
      </div>

      {/* Method choice cards */}
      <p className={labelClass}>Choose how to continue</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => setMethod('whatsapp')}
          className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${
            method === 'whatsapp'
              ? 'border-sky-500 bg-sky-50/60 ring-1 ring-sky-500/20'
              : 'border-gray-200 bg-white hover:border-sky-300'
          }`}
        >
          <FaWhatsapp className={method === 'whatsapp' ? 'text-sky-500' : 'text-gray-400'} />
          <div>
            <p className="text-sm font-bold text-gray-900 leading-none">WhatsApp</p>
            <p className="text-[11px] text-gray-500 mt-1">Continue privately on WhatsApp</p>
          </div>
        </button>
        <button
          type="button"
          onClick={() => setMethod('telegram')}
          className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${
            method === 'telegram'
              ? 'border-sky-500 bg-sky-50/60 ring-1 ring-sky-500/20'
              : 'border-gray-200 bg-white hover:border-sky-300'
          }`}
        >
          <FaTelegramPlane className={method === 'telegram' ? 'text-sky-500' : 'text-gray-400'} />
          <div>
            <p className="text-sm font-bold text-gray-900 leading-none">Telegram</p>
            <p className="text-[11px] text-gray-500 mt-1">Continue privately in Telegram</p>
          </div>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Full Name</label>
          <div className="relative">
            <FaUser className={iconClass} />
            <input name="name" type="text" required value={form.name} onChange={handleChange}
              placeholder="John Doe" className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>{method === 'whatsapp' ? 'WhatsApp Number' : 'Telegram Username'}</label>
          <div className="relative">
            {method === 'whatsapp'
              ? <FaWhatsapp className={iconClass} />
              : <FaTelegramPlane className={iconClass} />}
            <input
              name="contact"
              type="text"
              required
              value={form.contact}
              onChange={handleChange}
              placeholder={method === 'whatsapp' ? '+1 512-592-2145' : '@yourusername'}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Shipping Address</label>
          <div className="relative">
            <FaMapMarkerAlt className={iconClass} />
            <input name="address" type="text" required value={form.address} onChange={handleChange}
              placeholder="123 Main St, Berlin, Germany" className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Message (optional)</label>
          <div className="relative">
            <FaCommentDots className="absolute left-3 top-3 text-gray-400 text-xs" />
            <textarea name="notes" rows={3} value={form.notes} onChange={handleChange}
              placeholder="Any special requests or questions..."
              className="bg-gray-50 border border-gray-200 text-gray-900 rounded-lg py-2.5 pl-9 pr-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent placeholder-gray-400 text-sm resize-none" />
          </div>
        </div>

        {/* Confirmation */}
        <label className="flex items-start gap-2.5 bg-gray-50 border border-gray-200 rounded-lg p-3.5 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
          />
          <span className="text-[11px] text-gray-600 leading-relaxed">
            I am a serious buyer. I understand this is a real order request and I am ready to receive
            payment instructions via {method === 'whatsapp' ? 'WhatsApp' : 'Telegram'}.
          </span>
        </label>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
        >
          <FaPaperPlane className="text-xs" />
          Send Order via {method === 'whatsapp' ? 'WhatsApp' : 'Telegram'} &mdash; &euro;{orderDetails.total.toFixed(2)}
        </button>

        <p className="text-[11px] text-gray-400 text-center">
          {`Your details will be sent directly to us on ${method === 'whatsapp' ? 'WhatsApp' : 'Telegram'}.`}
        </p>
      </form>
    </div>
  );
}
