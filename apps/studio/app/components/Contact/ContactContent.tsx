'use client';

import React from 'react';
import { Contact } from '@payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import ContactForm from './ContactForm';
import AnimatedText from '@/app/components/Homepage/AnimatedText';

interface ContactContentProps {
  contact: Contact;
}

const ContactContent: React.FC<ContactContentProps> = ({ contact }) => {
  return (
    <article className='pageMy min-h-screen'>
      <div className='layout'>
        {/* Hero Section */}
        {/* Left Column - Hero Title */}
        <div className='sectionPy grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 lg:items-center'>
          <AnimatedText
            text={contact.heroTitle || 'Contact Us'}
            el='h1'
            className='mb-4 text-4xl md:text-6xl uppercase font-bold relative text-dfc-teal'
            animation={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.3 },
              },
            }}
          />

          {/* Right Column - Hero Text */}
          <div className='prose max-w-none gap-12'>
            {contact.heroText && (
              <RichText data={contact.heroText as SerializedEditorState} />
            )}
          </div>
        </div>

        {/* Contact Form Section */}
        <ContactForm />
      </div>
    </article>
  );
};

export default ContactContent;
