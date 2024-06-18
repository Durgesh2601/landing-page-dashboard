import { useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import { LANDING_PAGE_STATUS, COMPONENT_TYPES } from "@/constants";
import { LandingPage, ComponentType, LandingPageFormProps } from "@/types";

const { DRAFT, LIVE } = LANDING_PAGE_STATUS;
const { HEADER, FOOTER, TEXT_BLOCK, IMAGE } = COMPONENT_TYPES;

const LandingPageForm = ({
  initialData,
  onSave,
  onPreview,
  onPublish,
}: LandingPageFormProps) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<LandingPage>(
    initialData || {
      id: "",
      title: "",
      description: "",
      status: DRAFT,
      components: [],
    }
  );

  const handleChangeValue = (e: {
    target: { name: string; value: string };
  }) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeComponentContent = (id: string, value: string) => {
    const updatedComponents = formValues.components.map((component, i) =>
      component?.id === id ? { ...component, content: value } : component
    );
    setFormValues({
      ...formValues,
      components: updatedComponents,
    });
  };

  const handleAddComponent = (type: ComponentType) => {
    setFormValues({
      ...formValues,
      components: [
        ...formValues.components,
        {
          id: uuid(),
          type,
          content: "",
        },
      ],
    });
  };

  const handleRemoveComponent = (id: string) => {
    const updatedComponents = formValues.components.filter(
      (component) => component?.id !== id
    );
    setFormValues({
      ...formValues,
      components: updatedComponents,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formValues);
    router.push("/");
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview(formValues);
    }
  };

  const handlePublish = () => {
    if (onPublish) {
      onPublish({
        ...formValues,
        status: LIVE,
      });
    }
  };

  return (
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
          name="title"
          value={formValues.title}
          onChange={handleChangeValue}
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
          name="description"
          value={formValues.description}
          onChange={handleChangeValue}
          required
          className="block w-full p-2 mt-1 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Components
        </label>
        <div className="flex space-x-2 mb-4">
          <button
            type="button"
            onClick={() => handleAddComponent(HEADER)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Header
          </button>
          <button
            type="button"
            onClick={() => handleAddComponent(TEXT_BLOCK)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Text Block
          </button>
          <button
            type="button"
            onClick={() => handleAddComponent(IMAGE)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Image
          </button>
          <button
            type="button"
            onClick={() => handleAddComponent(FOOTER)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Footer
          </button>
        </div>
      </div>
      {formValues.components.map((component, index) => (
        <div key={component?.id} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {component.type}
          </label>
          <input
            type="text"
            value={component.content}
            onChange={(e) =>
              handleChangeComponentContent(component?.id, e.target.value)
            }
            placeholder={
              component?.type === IMAGE ? "Enter image url " : "Enter content"
            }
            required
            className="block w-full p-2 mt-1 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => handleRemoveComponent(component?.id)}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
        {onPreview && (
          <button
            type="button"
            onClick={handlePreview}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Preview
          </button>
        )}
        {onPublish && (
          <button
            type="button"
            onClick={handlePublish}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Publish
          </button>
        )}
      </div>
    </form>
  );
};

export default LandingPageForm;
