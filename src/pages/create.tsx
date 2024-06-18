import { useLandingPage } from "@/context/LandingPageContext";
import Layout from "@/components/Layout";
import LandingPageForm from "@/components/LandingPageForm";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import { LANDING_PAGE_STATUS } from "@/constants";
import { LandingPage } from "@/types";

const { DRAFT } = LANDING_PAGE_STATUS;

const CreateLandingPage = () => {
  const { addLandingPage } = useLandingPage();
  const router = useRouter();

  const handleSave = (data: LandingPage) => {
    addLandingPage({ ...data, id: uuid(), status: DRAFT });
    router.push("/");
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold">Create New Landing Page</h1>
      <LandingPageForm onSave={handleSave} />
    </Layout>
  );
};

export default CreateLandingPage;
