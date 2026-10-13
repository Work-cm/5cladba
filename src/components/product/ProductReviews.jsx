'use client';

import { useState } from 'react';
import { FaStar, FaUserCircle, FaSpinner } from 'react-icons/fa';

function Stars({ value, onSelect, size = 'w-4 h-4' }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type={onSelect ? 'button' : undefined}
          onClick={onSelect ? () => onSelect(i) : undefined}
          disabled={!onSelect}
          className={onSelect ? 'cursor-pointer' : 'cursor-default'}
          aria-label={onSelect ? `Rate ${i} star${i > 1 ? 's' : ''}` : undefined}
        >
          <FaStar className={`${size} ${i <= value ? 'text-amber-400' : 'text-gray-200'} ${onSelect ? 'hover:scale-110 transition-transform' : ''}`} />
        </button>
      ))}
    </div>
  );
}

export default function ProductReviews({ slug, initialReviews = [], initialRating = 0 }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const avgRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : initialRating;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSubmitting(true);

    try {
      const res = await fetch(`/api/products/${slug}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit review');

      setReviews((prev) => [data.review, ...prev]);
      setName('');
      setRating(5);
      setComment('');
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = 'bg-white border border-gray-200 text-gray-900 rounded-xl py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent placeholder-gray-400 text-sm';

  return (
    <section className="mt-14 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-gray-900 tracking-tight">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <Stars value={Math.round(avgRating)} />
          <span className="text-sm text-gray-400">({reviews.length})</span>
        </div>
      </div>

      {/* Review list */}
      {reviews.length === 0 ? (
        <p className="text-gray-400 text-sm mb-8">No reviews yet. Be the first to review this product.</p>
      ) : (
        <ul className="space-y-4 mb-10">
          {reviews.map((r, i) => (
            <li key={r._id || i} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaUserCircle className="w-6 h-6 text-gray-300" />
                <div>
                  <p className="text-sm font-bold text-gray-900">{r.name}</p>
                  <div className="flex items-center gap-2">
                    <Stars value={r.rating} size="w-3 h-3" />
                    {r.createdAt && (
                      <span className="text-[11px] text-gray-400">
                        {new Date(r.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-900 leading-relaxed">{r.comment}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Submit form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
        <h3 className="text-sm font-black text-gray-900 mb-4">Write a Review</h3>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl text-sm mb-4">{error}</div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-2.5 rounded-xl text-sm mb-4">
            Thanks! Your review has been posted.
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-900 mb-1.5">Your Rating</label>
            <Stars value={rating} onSelect={setRating} size="w-5 h-5" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-900 mb-1.5">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={inputClass}
              maxLength={60}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-900 mb-1.5">Review</label>
            <textarea
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              rows={4}
              className={`${inputClass} resize-none`}
              maxLength={1000}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {submitting && <FaSpinner className="animate-spin" />}
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </section>
  );
}
