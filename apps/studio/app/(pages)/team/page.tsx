import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team - Redirecting',
  description: 'Redirecting to About Us page',
};

export default function TeamRedirect() {
  redirect('/about-us');
}
