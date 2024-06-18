import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { LandingPage, LandingPageContextType } from "@/types";

const { LANDING_PAGES } = LOCAL_STORAGE_KEYS;

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

  const addLandingPage = (page: LandingPage) => {
    const updatedPages: LandingPage[] = [...landingPages, page];
    setLandingPages(updatedPages);
    localStorage.setItem(LANDING_PAGES, JSON.stringify(updatedPages));
  };

  const updateLandingPage = (page: LandingPage) => {
    const updatedPages = landingPages.map((pageItem) =>
      pageItem.id === page.id ? page : pageItem
    );
    setLandingPages(updatedPages);
    localStorage.setItem(LANDING_PAGES, JSON.stringify(updatedPages));
  };

  const updateLandingPagesInStore = (pages: LandingPage[]) => {
    setLandingPages(pages);
    localStorage.setItem(LANDING_PAGES, JSON.stringify(pages));
  };

  const deleteLandingPage = (id: string) => {
    const updatedPages = landingPages.filter((page) => page.id !== id);
    setLandingPages(updatedPages);
    localStorage.setItem(LANDING_PAGES, JSON.stringify(updatedPages));
  };

  return (
    <LandingPageContext.Provider
      value={{
        landingPages,
        addLandingPage,
        deleteLandingPage,
        updateLandingPage,
        updateLandingPagesInStore,
      }}
    >
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
