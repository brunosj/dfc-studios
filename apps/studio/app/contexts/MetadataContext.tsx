'use client';

import React, { createContext, useContext } from 'react';
import { SiteMetadatum } from '@payload-types';

interface MetadataContextType {
  metadata: SiteMetadatum | null;
}

const MetadataContext = createContext<MetadataContextType>({ metadata: null });

export const useMetadata = () => useContext(MetadataContext);

export const MetadataProvider: React.FC<{
  children: React.ReactNode;
  metadata: SiteMetadatum | null;
}> = ({ children, metadata }) => {
  return (
    <MetadataContext.Provider value={{ metadata }}>
      {children}
    </MetadataContext.Provider>
  );
};
