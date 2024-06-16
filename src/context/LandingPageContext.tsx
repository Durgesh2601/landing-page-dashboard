import { createContext, useContext, useState, ReactNode } from "react";
import { LANDING_PAGE_STATUS } from "@/constants";

const { DRAFT, LIVE } = LANDING_PAGE_STATUS;

interface LandingPage {
  id: number;
  title: string;
  description: string;
  components: Array<{ type: string; content: string }>;
  status: string | typeof DRAFT | typeof LIVE;
}

interface LandingPageContextType {
  landingPages: LandingPage[];
  addLandingPage: (page: LandingPage) => void;
}

const LandingPageContext = createContext<LandingPageContextType | undefined>(
  undefined
);

export const LandingPageProvider = ({ children }: { children: ReactNode }) => {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);

  const addLandingPage = (page: LandingPage) => {
    setLandingPages([
      ...landingPages,
      { ...page, id: landingPages.length + 1 },
    ]);
  };

  return (
    <LandingPageContext.Provider value={{ landingPages, addLandingPage }}>
      {children}
    </LandingPageContext.Provider>
  );
};

export const useLandingPage = () => {
  const context = useContext(LandingPageContext);
  if (!context) {
    throw new Error("useLandingPage must be used within a LandingPageProvider");
  }
  return context;
};
