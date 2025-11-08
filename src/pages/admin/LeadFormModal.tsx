// src/pages/admin/LeadFormModal.tsx
import React, { useState } from 'react';
import { X, User, Phone, Mail, Shield } from 'lucide-react';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit: () => void; // This is the new, crucial prop
  projectId: string;
  projectName: string;
}

const LeadFormModal: React.FC<LeadFormModalProps> = ({
  isOpen,
  onClose,
  onSuccessSubmit,
  projectId,
  projectName,
}) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          projectId: projectId,
          source: 'Floor Plan Modal', // The source field is useful!
        }),
      });

      const data = await res.json();

      if (data.success) {
        // 1. Show success message
        setIsSubmitted(true);
        
      
        const now = new Date().getTime(); // Get current time in milliseconds
        localStorage.setItem('leadSubmitTimestamp', now.toString());

        // 3. Wait a moment, then call the success prop
        setTimeout(() => {
          onSuccessSubmit(); // Tell the parent page it worked!
          setIsSubmitted(false); // Reset for next time
          setFormData({ name: '', email: '', phone: '' }); // Clear form
        }, 1500); // Wait 1.5s
      } else {
        setError(data.error || 'Submission failed. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Error submitting lead:', err);
      setError('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Thank You!
            </h3>
            <p className="text-gray-700">
              Our expert will contact you shortly. You can now view the floor
              plan.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Get a callback
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Please fill in your details to view the floor plan.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  NAME
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <User size={18} className="text-gray-400" />
                  </span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  PHONE NUMBER
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Phone size={18} className="text-gray-400" />
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  EMAIL
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail size={18} className="text-gray-400" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  id="agree-modal"
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  defaultChecked
                />
                <label
                  htmlFor="agree-modal"
                  className="text-xs text-gray-600"
                >
                  I agree to be contacted via WhatsApp, SMS, Phone, Email etc.
                </label>
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
              </button>

              <div className="flex items-center justify-center gap-1 text-xs text-gray-500 pt-2">
                <Shield size={12} />
                <span>100% Safe & Secure</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadFormModal;