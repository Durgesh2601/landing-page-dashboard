import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

interface Component {
  type: 'Header' | 'Footer' | 'TextBlock' | 'Image';
  content: string;
}

interface LandingPage {
  id: string;
  title: string;
  description: string;
  status: 'Draft' | 'Live';
  components: Component[];
  views: number;
  clicks: number;
}

const View = () => {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState<LandingPage | null>(null);

  useEffect(() => {
    if (id) {
      const pages = JSON.parse(localStorage.getItem('landingPages') || '[]');
      const landingPage = pages.find((p: LandingPage) => p.id === id);
      if (landingPage) {
        // Increment view count
        landingPage.views = (landingPage.views || 0) + 1;
        setPage(landingPage);

        const updatedPages = pages.map((p: LandingPage) => p.id === landingPage.id ? landingPage : p);
        localStorage.setItem('landingPages', JSON.stringify(updatedPages));
      }
    }
  }, [id]);

  const handleButtonClick = () => {
    if (page) {
      const pages = JSON.parse(localStorage.getItem('landingPages') || '[]');
      const landingPage = pages.find((p: LandingPage) => p.id === id);
      if (landingPage) {
        // Increment click count
        landingPage.clicks = (landingPage.clicks || 0) + 1;
        setPage(landingPage);

        const updatedPages = pages.map((p: LandingPage) => p.id === landingPage.id ? landingPage : p);
        localStorage.setItem('landingPages', JSON.stringify(updatedPages));
      }
    }
  };

  if (!page) return null;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{page.title}</h1>
      <p className="mb-4">{page.description}</p>
      <div>
        {page.components.map((component, index) => (
          <div key={index} className="mb-4">
            {component.type === 'Header' && <h2 className="text-xl font-semibold">{component.content}</h2>}
            {component.type === 'TextBlock' && <p>{component.content}</p>}
            {component.type === 'Image' && <img src={component.content} alt="" />}
            {component.type === 'Footer' && <footer>{component.content}</footer>}
          </div>
        ))}
        <button onClick={handleButtonClick} className="px-4 py-2 bg-green-600 text-white rounded mt-4">
          Call to Action
        </button>
      </div>
    </Layout>
  );
};

export default View;