import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useLandingPage } from "@/context/LandingPageContext";
import { LandingPage } from "@/types";
import RenderComponent from "@/components/FormFactory";

const Preview = () => {
  const router = useRouter();
  const { id } = router.query;
  const { landingPages } = useLandingPage();
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);

  useEffect(() => {
    if (!id) return;
    const page = landingPages.find((page) => page.id === id);
    if (page) {
      setLandingPage(page);
    } else {
      router.push("/");
    }
  }, [id, landingPages, router]);

  if (!landingPage) return <div>Loading...</div>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 mt-4">{landingPage.title}</h1>
      <p className="mb-4">{landingPage.description}</p>
      <div>
        {landingPage.components.map((component) => (
          <div key={component.id} className="mb-4">
            <RenderComponent component={component} />
          </div>
        ))}
      </div>
      <button
        className="px-4 py-2 bg-gray-600 text-white rounded"
        onClick={() => router.push(`/edit/${id}`)}
      >
        Go back
      </button>
    </Layout>
  );
};

export default Preview;
