import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useLandingPage } from "@/context/LandingPageContext";
import { LandingPage } from "@/types";
import RenderComponent from "@/components/FormFactory";
import { LANDING_PAGE_STATUS } from "@/constants";

const { DRAFT } = LANDING_PAGE_STATUS;

const View = () => {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState<LandingPage | null>(null);
  const { landingPages, updateLandingPagesInStore, incrementViews } =
    useLandingPage();

  useEffect(() => {
    if (!id) return;
    const landingPage: LandingPage | undefined = landingPages.find(
      (item: LandingPage) => item?.id === (id as string)
    );
    if (!landingPage) return;
    if (landingPage?.status !== DRAFT) {
      incrementViews(id as string);
    }
    setPage(landingPage);
  }, [id]);

  if (!page) return null;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 mt-4">{page.title}</h1>
      <p className="mb-4">{page.description}</p>
      <div>
        {page.components.map((component, index) => (
          <div key={index} className="mb-4">
            {<RenderComponent component={component} />}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default View;
