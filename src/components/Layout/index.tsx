import { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white flex">
        <Link href="/" className="mr-4">Dashboard</Link>
        <Link href="/create" className="mr-4">Create Landing Page</Link>
        <Link href="/analytics" className="mr-4">Analytics</Link>
      </nav>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;