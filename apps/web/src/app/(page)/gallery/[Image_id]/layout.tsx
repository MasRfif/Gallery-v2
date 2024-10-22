import React from 'react';

export const metadata = {
  title: 'Detail Collections',
  description: 'All the paintings',
};

export default function SlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
