import { LANDING_PAGE_STATUS, COMPONENT_TYPES } from "@/constants";

const { DRAFT, LIVE } = LANDING_PAGE_STATUS;

type ComponentType = (typeof COMPONENT_TYPES)[keyof typeof COMPONENT_TYPES];

interface Component {
  id: string;
  type: ComponentType;
  content: string;
}

interface LandingPage {
  id: string;
  title: string;
  description: string;
  components: Component[];
  status: string | typeof DRAFT | typeof LIVE;
  views?: number;
  clicks?: number;
}

interface LandingPageContextType {
  landingPages: LandingPage[];
  addLandingPage: (page: LandingPage) => void;
  updateLandingPage: (page: LandingPage) => void;
  updateLandingPagesInStore: (pages: LandingPage[]) => void;
}

export type { LandingPage, LandingPageContextType, Component, ComponentType };
