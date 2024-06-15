import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const Create = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createPage = () => {
    const newPage = {
      id: Date.now().toString(),
      title,
      description,
      status: "Draft",
      components: [],
    };

    const pages = JSON.parse(localStorage.getItem("landingPages") || "[]");
    pages.push(newPage);
    localStorage.setItem("landingPages", JSON.stringify(pages));

    router.push("/");
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Create Landing Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPage();
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create
        </button>
      </form>
    </Layout>
  );
};

export default Create;
