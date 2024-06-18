import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { COMPONENT_TYPES } from "@/constants";
import { useLandingPage } from "@/context/LandingPageContext";
import { Component, ComponentType, LandingPage } from "@/types";

const { HEADER, FOOTER, TEXT_BLOCK, IMAGE } = COMPONENT_TYPES;

const View = () => {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState<LandingPage | null>(null);
  const { landingPages, updateLandingPagesInStore } = useLandingPage();

  useEffect(() => {
    if (id) {
      const landingPage: LandingPage | undefined = landingPages.find(
        (item: LandingPage) => item?.id === id
      );
      if (!landingPage) return;
      // Increment view count
      landingPage.views = (landingPage.views || 0) + 1;
      setPage(landingPage);
    }
  }, [id]);

  const handleButtonClick = () => {
    if (!page) return;
    const landingPage = landingPages.find((p: LandingPage) => p.id === id);
    if (!landingPage) return;
    // Increment click count
    landingPage.clicks = (landingPage.clicks || 0) + 1;
    setPage(landingPage);

    const updatedPages = landingPages.map((p: LandingPage) =>
      p.id === landingPage.id ? landingPage : p
    );
    updateLandingPagesInStore(updatedPages);
  };

  if (!page) return null;

  const componentMap: {
    [key in ComponentType]: (content: string) => JSX.Element;
  } = {
    [HEADER]: (content) => <h2 className="text-xl font-semibold">{content}</h2>,
    [TEXT_BLOCK]: (content) => <p>{content}</p>,
    [IMAGE]: (content) => <img src={content} alt="img" />,
    [FOOTER]: (content) => <footer>{content}</footer>,
  };

  const RenderComponent = ({ component }: { component: Component }) => {
    const ComponentRenderer = componentMap[component.type];
    return ComponentRenderer ? ComponentRenderer(component.content) : null;
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{page.title}</h1>
      <p className="mb-4">{page.description}</p>
      <div>
        {page.components.map((component, index) => (
          <div key={index} className="mb-4">
            {<RenderComponent component={component} />}
          </div>
        ))}
        <button
          onClick={handleButtonClick}
          className="px-4 py-2 bg-green-600 text-white rounded mt-4"
        >
          Call to Action
        </button>
      </div>
    </Layout>
  );
};

export default View;
