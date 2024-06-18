import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { LandingPageProvider } from "@/context/LandingPageContext";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import "../styles/globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import FallbackScreen from "@/components/FallbackScreen";

const { LOGIN_IDENTIFIER } = LOCAL_STORAGE_KEYS;

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ElementType;
  pageProps: any;
}) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem(LOGIN_IDENTIFIER);
    if (!isAuthenticated && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [router]);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <LandingPageProvider>
          <Component {...pageProps} />
        </LandingPageProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
