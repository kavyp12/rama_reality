// src/pages/admin/LeadFormModal.tsx
import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Shield, Check } from 'lucide-react';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit: () => void;
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

  // 🌟 NEW: Form step state
  const [formStep, setFormStep] = useState<'details' | 'otp' | 'success'>('details');
  
  // OTP States
  const [otp, setOtp] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // 🌟 NEW: Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      // Reset form to details step when modal is opened
      setFormStep('details');
      setFormData({ name: '', email: '', phone: '' });
      setOtp('');
      setError(null);
      setIsSubmitting(false);
      setSendingOtp(false);
      setVerifyingOtp(false);
    }
  }, [isOpen]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🌟 MODIFIED: Send OTP and move to next step
  const handleSendOTP = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Validation
    if (!formData.name || !formData.phone || !formData.email) {
      setError('Please fill in all fields.');
      return;
    }
    if (!formData.phone || formData.phone.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setSendingOtp(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone }),
      });

      const data = await response.json();

      if (data.success) {
        setFormStep('otp'); // 👈 Move to OTP step
        setResendTimer(60); // 60 second cooldown
        
        // Start countdown
        const interval = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        setError(null);
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setSendingOtp(false);
    }
  };

  // 🌟 MODIFIED: Verify OTP and then submit lead
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    if (isSubmitting || verifyingOtp) return;

    setVerifyingOtp(true);
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Verify OTP
      const verifyResponse = await fetch(`${import.meta.env.VITE_API_URL}/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, code: otp }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        setError(verifyData.error || 'Invalid OTP. Please try again.');
        setVerifyingOtp(false);
        setIsSubmitting(false);
        return;
      }
      
      // 2. OTP is valid, submit lead
      const res = await fetch(`${import.meta.env.VITE_API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          projectId: projectId,
          source: 'Floor Plan Modal',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setFormStep('success'); // 👈 Move to success step
        const now = new Date().getTime();
        localStorage.setItem('leadSubmitTimestamp', now.toString());

        setTimeout(() => {
          onSuccessSubmit(); // This function is passed from ProjectDetails
          // The useEffect hook will reset the form when the modal is re-opened
        }, 1500);
      } else {
        setError(data.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting lead:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setVerifyingOtp(false);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* 🌟 NEW: Success Step */}
        {formStep === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Thank You!
            </h3>
            <p className="text-gray-700">
              Our expert will contact you shortly. You can now view the floor plan.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Get a callback
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Please fill in your details and verify your phone number to continue.
            </p>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded mb-4">{error}</p>
            )}

            {/* 🌟 NEW: Details Step */}
            {formStep === 'details' && (
              <form onSubmit={handleSendOTP} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name-modal" className="block text-sm font-medium text-gray-700 mb-1">
                    NAME
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <User size={18} className="text-gray-400" />
                    </span>
                    <input
                      type="text"
                      id="name-modal"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone-modal" className="block text-sm font-medium text-gray-700 mb-1">
                    PHONE NUMBER
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Phone size={18} className="text-gray-400" />
                    </span>
                    <input
                      type="tel"
                      id="phone-modal"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                      maxLength={10}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email-modal" className="block text-sm font-medium text-gray-700 mb-1">
                    EMAIL
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail size={18} className="text-gray-400" />
                    </span>
                    <input
                      type="email"
                      id="email-modal"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2 pt-2">
                  <input
                    id="agree-modal"
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                    required
                  />
                  <label htmlFor="agree-modal" className="text-xs text-gray-600">
                    I agree to be contacted via WhatsApp, SMS, Phone, Email etc.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={sendingOtp}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendingOtp ? 'SENDING OTP...' : 'CONTINUE'}
                </button>
              </form>
            )}

            {/* 🌟 NEW: OTP Step */}
            {formStep === 'otp' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="p-2 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Enter the 6-digit OTP sent to <strong>{formData.phone}</strong>. 
                    <button 
                      type="button" 
                      onClick={() => { setFormStep('details'); setError(null); }}
                      className="ml-1 text-blue-600 hover:underline font-medium"
                    >
                      (Edit)
                    </button>
                  </p>
                </div>

                {/* OTP Verification Field */}
                <div>
                  <label htmlFor="otp-modal" className="block text-sm font-medium text-gray-700 mb-1">
                    ENTER OTP
                  </label>
                  <input
                    type="text"
                    id="otp-modal"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    maxLength={6}
                    required
                  />
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-600">Didn't receive OTP?</span>
                    {resendTimer > 0 ? (
                      <span className="text-gray-500">Resend in {resendTimer}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSendOTP()} // Re-use send logic
                        className="text-blue-600 font-semibold hover:underline"
                        disabled={sendingOtp}
                      >
                        {sendingOtp ? 'Sending...' : 'Resend OTP'}
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || verifyingOtp || otp.length !== 6}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || verifyingOtp ? 'VERIFYING...' : 'VERIFY & SUBMIT'}
                </button>
              </form>
            )}

            {/* Security Badge (shows on details and otp steps) */}
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 pt-2">
              <Shield size={12} />
              <span>100% Safe & Secure</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadFormModal;