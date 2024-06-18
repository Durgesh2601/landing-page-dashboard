import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

interface LandingPage {
  id: string;
  title: string;
  description: string;
  status: 'Draft' | 'Live';
  components: any[];
  views: number;
  clicks: number;
}

const Analytics = () => {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);

  useEffect(() => {
    const pages = JSON.parse(localStorage.getItem('landingPages') || '[]');
    setLandingPages(pages);
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <ul>
        {landingPages.map(page => (
          <li key={page.id} className="mb-4 p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-semibold">{page.title}</h2>
            <p>Views: {page.views || 0}</p>
            <p>Clicks: {page.clicks || 0}</p>
            <p>Click-through Rate: {page.views ? ((page.clicks || 0) / page.views * 100).toFixed(2) : 0}%</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Analytics;
