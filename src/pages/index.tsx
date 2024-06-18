import Layout from "../components/Layout";
import Link from "next/link";
import { useLandingPage } from "@/context/LandingPageContext";
import { LANDING_PAGE_STATUS, STATUS_LABEL_MAP } from "@/constants";

const { LIVE } = LANDING_PAGE_STATUS;

const Home = () => {
  const { landingPages, deleteLandingPage } = useLandingPage();

  const deletePage = (id: string) => {
    deleteLandingPage(id);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 mt-2">Landing Pages</h1>
      <ul className="space-y-6">
        {landingPages.map((page) => (
          <li
            key={page.id}
            className="p-5 bg-white shadow-lg rounded-lg hover:shadow-sm duration-400"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">{page.title}</h2>
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                  page.status === LIVE
                    ? "bg-green-500 text-white"
                    : "bg-yellow-500 text-white"
                }`}
              >
                {STATUS_LABEL_MAP[page.status as keyof typeof STATUS_LABEL_MAP]}
              </span>
            </div>
            <p className="mt-2 text-gray-600">{page.description}</p>
            <div className="mt-2 text-sm text-gray-500">
              <p>Views: {page.views || 0}</p>
            </div>
            <div className="mt-4 flex space-x-3">
              <Link href={`/edit/${page.id}`}>
                <p className="text-blue-500">Edit</p>
              </Link>
              <Link href={`/view/${page.id}`}>
                <p className="text-blue-500">View</p>
              </Link>
              <button
                onClick={() => deletePage(page.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Home;
