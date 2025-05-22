'use client';

import React, { useState } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Color } from '@payload-types';
import { isColor } from '@/app/utils/isColor';

interface MilestoneProps {
  year: string;
  title: string;
  subtitle?: string;
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  avatarColor?: Color | null;
}

export default function Milestone({
  year,
  title,
  subtitle,
  description,
  avatarColor,
}: MilestoneProps) {
  const [isOpen, setIsOpen] = useState(false);
  const bgColor = isColor(avatarColor) ? avatarColor.hexCode : '#3B82F6';

  return (
    <div className='rounded-lg overflow-hidden'>
      {subtitle || description ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 flex items-start sm:items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
            isOpen ? 'bg-gray-50 dark:bg-gray-700' : ''
          }`}
        >
          <div className='flex items-start sm:items-center gap-4'>
            <div
              className='h-2 w-2 rounded-full mt-2 sm:mt-0'
              style={{ backgroundColor: bgColor }}
            />
            <div className='text-left'>
              <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2'>
                <span className='font-semibold'>{year}</span>
                <span className='hidden sm:inline text-gray-600'>-</span>
                <span className='font-medium'>{title}</span>
              </div>
            </div>
          </div>
          <svg
            className={`h-5 w-5 text-gray-500 transition-transform mt-1 sm:mt-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      ) : (
        <div className='w-full px-4 py-3 flex items-start sm:items-center'>
          <div className='flex items-start sm:items-center gap-4'>
            <div
              className='h-2 w-2 rounded-full mt-2 sm:mt-0'
              style={{ backgroundColor: bgColor }}
            />
            <div className='text-left'>
              <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2'>
                <span className='font-semibold'>{year}</span>
                <span className='hidden sm:inline text-gray-600'>-</span>
                <span className='font-medium'>{title}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className='px-4  pb-2 bg-gray-50  dark:bg-gray-700 small-text'>
          <div className='ml-6'>
            {subtitle && <p className='italic mb-1'>{subtitle}</p>}
            {description && (
              <div className='prose prose-sm max-w-none '>
                <RichText data={description} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
