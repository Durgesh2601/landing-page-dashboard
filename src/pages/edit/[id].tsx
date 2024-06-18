import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import Layout from "../../components/Layout";
import { LANDING_PAGE_STATUS } from "@/constants";
import { useLandingPage } from "@/context/LandingPageContext";
import { LandingPage } from "@/types";

const { DRAFT } = LANDING_PAGE_STATUS;

const Create = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<LandingPage>({
    id: "",
    title: "",
    description: "",
    status: DRAFT,
    components: [],
  });
  const { landingPages, updatePage } = useLandingPage();

  const { id } = router?.query;

  useEffect(() => {
    if (!id) return;
    const page = landingPages.find((page) => page.id === id);
    if (!page) {
      router.push("/");
    }
    if (page) {
      setFormValues(page);
    }
  }, [id]);

  const handleChangeValue = (e: {
    target: { name: string; value: string };
  }) => {
    setFormValues({
      ...(formValues || {}),
      [e.target.name]: e.target.value,
    });
  };

  const editPage = () => {
    updatePage(formValues);
  };

  const handleChangeComponentContent = (index: number, value: string): void => {
    const updatedComponents = formValues?.components?.map((component, i) =>
      i === index ? { ...component, content: value } : component
    );
    setFormValues({
      ...formValues,
      components: updatedComponents,
    });
  };

  const handleAddComponent = (type: string) => {
    setFormValues({
      ...formValues,
      components: [
        ...(formValues?.components || []),
        {
          id: uuid(),
          type,
          content: "",
        },
      ],
    });
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Edit Landing Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editPage();
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formValues?.title}
            onChange={handleChangeValue}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formValues?.description}
            onChange={handleChangeValue}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Components
          </label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => handleAddComponent("Header")}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Header
            </button>
            <button
              type="button"
              onClick={() => handleAddComponent("Text Block")}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Text Block
            </button>
            <button
              type="button"
              onClick={() => handleAddComponent("Image")}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Image
            </button>
            <button
              type="button"
              onClick={() => handleAddComponent("Footer")}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Footer
            </button>
          </div>
        </div>
        {formValues?.components?.map((component, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">{component?.type}</label>
            <input
              type="text"
              value={component.content}
              onChange={(e) =>
                handleChangeComponentContent(index, e.target.value)
              }
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </form>
    </Layout>
  );
};

export default Create;
