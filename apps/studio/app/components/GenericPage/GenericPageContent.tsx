import React from 'react';
import { Page } from '@payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';

interface GenericPageContentProps {
  page: Page;
}

const GenericPageContent: React.FC<GenericPageContentProps> = ({ page }) => {
  return (
    <article className='pageMy layout max-w-4xl px-4'>
      <h1 className='text-4xl font-bold pt-12 lg:pt-0 mb-4 lg:mb-8'>
        {page.title}
      </h1>
      {page.content && (
        <div className='prose prose-lg max-w-none '>
          <RichText data={page.content} />
        </div>
      )}
    </article>
  );
};

export default GenericPageContent;
