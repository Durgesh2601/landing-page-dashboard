import { useState } from "react";
import Layout from "../components/Layout";
import { useLandingPage } from "../context/LandingPageContext";
import { useRouter } from "next/router";
import { LANDING_PAGE_STATUS } from "@/constants";

const { DRAFT } = LANDING_PAGE_STATUS;

const CreateLandingPage = () => {
  const { addLandingPage } = useLandingPage();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [components, setComponents] = useState<
    Array<{ type: string; content: string }>
  >([]);

  const handleAddComponent = (type: string) => {
    setComponents([...components, { type, content: "" }]);
  };

  const handleChangeComponentContent = (index: number, content: string) => {
    const updatedComponents = components.map((component, i) =>
      i === index ? { ...component, content } : component
    );
    setComponents(updatedComponents);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPage = { title, description, components, status: DRAFT, id: 0 }; // id will be set in context
    addLandingPage(newPage);
    router.push("/dashboard");
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold">Create New Landing Page</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="block w-full p-2 mt-1 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="block w-full p-2 mt-1 border border-gray-300 rounded"
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
        {components.map((component, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {component.type}
            </label>
            <input
              type="text"
              value={component.content}
              onChange={(e) =>
                handleChangeComponentContent(index, e.target.value)
              }
              required
              className="block w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create Landing Page
        </button>
      </form>
    </Layout>
  );
};

export default CreateLandingPage;
