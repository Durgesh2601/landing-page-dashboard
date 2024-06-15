import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface LandingPage {
  id: string;
  title: string;
  description: string;
  status: 'Draft' | 'Live';
}

const Home = () => {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);

  useEffect(() => {
    // Load landing pages from local storage or mock API
    const pages = JSON.parse(localStorage.getItem('landingPages') || '[]');
    setLandingPages(pages);
  }, []);

  const deletePage = (id: string) => {
    const updatedPages = landingPages.filter(page => page.id !== id);
    setLandingPages(updatedPages);
    localStorage.setItem('landingPages', JSON.stringify(updatedPages));
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ul>
        {landingPages.map(page => (
          <li key={page.id} className="mb-4 p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-semibold">{page.title}</h2>
            <p>{page.description}</p>
            <p>Status: {page.status}</p>
            <div className="mt-2">
              <Link href={`/edit/${page.id}`} className="mr-2 text-blue-500">Edit</Link>
              <Link href={`/view/${page.id}`} className="mr-2 text-blue-500">View</Link>
              <button onClick={() => deletePage(page.id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Home;