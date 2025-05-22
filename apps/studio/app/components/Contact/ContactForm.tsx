import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset status and set submitting state
    setIsSubmitting(true);
    setStatus({});

    // Form validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setStatus({
        success: false,
        message: 'Please fill in all required fields.',
      });
      setIsSubmitting(false);
      return;
    }

    // Prepare clean data
    const cleanData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    };

    try {
      // Send to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanData),
      });

      // Parse response
      const data = await response.json();

      if (response.ok) {
        // Handle success
        setStatus({
          success: true,
          message: data.message || 'Thank you! Your message has been sent.',
        });
        // Reset form
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        // Handle error
        setStatus({
          success: false,
          message: data.error || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      void error; // This satisfies the linter by using the variable
      // Handle network/unexpected errors
      setStatus({
        success: false,
        message: 'Connection error. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI component styles
  const inputStyles = 'w-full bg-transparent px-4 py-3 focus:outline-none';
  const inputContainerStyles =
    'relative border-b-2 border-l border-dfc-teal rounded-md focus-within:border-dfc-teal transition-colors duration-300';

  return (
    <form onSubmit={handleSubmit} className='mt-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-24 gap-y-6'>
        {/* Left Column */}
        <div className='space-y-6'>
          {/* Name Field */}
          <div className={inputContainerStyles}>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Your Name'
              required
              className={inputStyles}
            />
          </div>

          {/* Email Field */}
          <div className={inputContainerStyles}>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Your Email'
              required
              className={inputStyles}
            />
          </div>

          {/* Phone Field */}
          <div className={inputContainerStyles}>
            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Your Phone Number'
              className={inputStyles}
            />
          </div>
        </div>

        {/* Right Column - Message Field */}
        <div className={`${inputContainerStyles} h-full`}>
          <textarea
            name='message'
            value={formData.message}
            onChange={handleChange}
            placeholder='Your Message'
            required
            className={`${inputStyles} h-full min-h-[180px] resize-none`}
          />
        </div>
      </div>

      {/* Status Message */}
      {status.message && (
        <div
          className={`mt-4 p-3 rounded ${
            status.success
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          <p>{status.message}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className='mt-6 lg:mt-16 2xl:mt-24 flex justify-center'>
        <button
          type='submit'
          disabled={isSubmitting}
          className=' px-1 py-6 rounded-full font-medium transition-colors disabled:opacity-70 h-24 w-24 hover:cursor-pointer duration-300 btn-hover-effect btn-filled border-2 border-dfc-contact-button text-center text-dfc-contact-button '
          style={
            {
              '--btn-color': 'var(--color-white)',
              '--btn-hover-bg': 'var(--color-dfc-contact-button)',
            } as React.CSSProperties
          }
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
