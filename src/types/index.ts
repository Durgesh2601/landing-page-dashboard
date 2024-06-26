import { LANDING_PAGE_STATUS, COMPONENT_TYPES } from "@/constants";
import { ErrorInfo, ReactNode } from "react";

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
  deleteLandingPage: (id: string) => void;
  addLandingPage: (page: LandingPage) => void;
  updateLandingPage: (page: LandingPage) => void;
  updateLandingPagesInStore: (pages: LandingPage[]) => void;
  incrementViews: (id: string) => void;
}

interface LandingPageFormProps {
  initialData?: LandingPage;
  onSave: (data: LandingPage) => void;
  onPreview?: (data: LandingPage) => void;
  onPublish?: (data: LandingPage) => void;
}

interface LayoutProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface FallbackScreenProps {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export type {
  Component,
  LandingPage,
  LayoutProps,
  ComponentType,
  AuthContextType,
  AuthProviderProps,
  ErrorBoundaryProps,
  ErrorBoundaryState,
  FallbackScreenProps,
  LandingPageFormProps,
  LandingPageContextType,
};
