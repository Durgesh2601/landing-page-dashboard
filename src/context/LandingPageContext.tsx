import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { LANDING_PAGE_STATUS, LOCAL_STORAGE_KEYS } from "@/constants";

const { DRAFT, LIVE } = LANDING_PAGE_STATUS;
const { LANDING_PAGES } = LOCAL_STORAGE_KEYS;

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

  useEffect(() => {
    const storedPages = localStorage.getItem(LANDING_PAGES);
    if (storedPages) {
      setLandingPages(JSON.parse(storedPages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("landingPages", JSON.stringify(landingPages));
  }, [landingPages]);

  const addLandingPage = (page: LandingPage) => {
    const newPage = { ...page, id: landingPages.length + 1 };
    setLandingPages([...landingPages, newPage]);
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
