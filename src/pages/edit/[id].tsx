import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useLandingPage } from "@/context/LandingPageContext";
import LandingPageForm from "@/components/LandingPageForm";
import { LandingPage } from "@/types";

const EditLandingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { landingPages, updateLandingPage } = useLandingPage();
  const [initialData, setInitialData] = useState<LandingPage | null>(null);

  useEffect(() => {
    if (!id) return;
    const page = landingPages.find((page) => page.id === id);
    if (!page) {
      router.push("/");
    } else {
      setInitialData(page);
    }
  }, [id, landingPages, router]);

  const handleSave = (data: LandingPage) => {
    updateLandingPage(data);
    router.push("/");
  };

  const handlePreview = (data: LandingPage) => {
    updateLandingPage(data);
    router.push(`/preview/${data.id}`);
  };

  const handlePublish = (data: LandingPage) => {
    updateLandingPage(data);
    router.push("/");
  };

  if (!initialData) return <div>Loading...</div>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Edit Landing Page</h1>
      <LandingPageForm
        initialData={initialData}
        onSave={handleSave}
        onPreview={handlePreview}
        onPublish={handlePublish}
      />
    </Layout>
  );
};

export default EditLandingPage;