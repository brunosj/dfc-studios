// Define the minimal client interface we need
interface PayloadClient {
  find: <T>(args: {
    collection: string;
    limit?: number;
    [key: string]: unknown;
  }) => Promise<{
    docs: T[];
    totalDocs: number;
    totalPages: number;
    page: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }>;
  findGlobal: <T>(args: { slug: string }) => Promise<T>;
}

// Function to get the Payload client using REST API
const getPayloadClient = async (): Promise<PayloadClient> => {
  if (!process.env.NEXT_PUBLIC_PAYLOAD_URL) {
    throw new Error('NEXT_PUBLIC_PAYLOAD_URL environment variable is required');
  }

  // We'll use the REST API instead of local API to avoid config issues
  const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL;

  return {
    find: async ({ collection, ...args }) => {
      const queryString = new URLSearchParams(
        args as Record<string, string>
      ).toString();
      const res = await fetch(`${apiUrl}/api/${collection}?${queryString}`);
      if (!res.ok) throw new Error(`Failed to fetch ${collection}`);
      return res.json();
    },
    findGlobal: async ({ slug }) => {
      const res = await fetch(`${apiUrl}/api/globals/${slug}`);
      if (!res.ok) throw new Error(`Failed to fetch global ${slug}`);
      return res.json();
    },
  };
};

export default getPayloadClient;
