import { LANDING_PAGE_STATUS } from "@/constants";

const { DRAFT, LIVE } = LANDING_PAGE_STATUS;

interface LandingPage {
  id: string;
  title: string;
  description: string;
  components: Array<{ type: string; content: string }>;
  status: string | typeof DRAFT | typeof LIVE;
}

interface LandingPageContextType {
  landingPages: LandingPage[];
  addLandingPage: (page: LandingPage) => void;
  updatePage: (page: LandingPage) => void;
}

export type { LandingPage, LandingPageContextType };
