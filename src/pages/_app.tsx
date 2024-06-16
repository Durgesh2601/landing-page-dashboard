import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { LandingPageProvider } from "@/context/LandingPageContext";
import "../styles/globals.css";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ElementType;
  pageProps: any;
}) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated");
    if (!isAuthenticated && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [router]);

  return (
    <AuthProvider>
      <LandingPageProvider>
        <Component {...pageProps} />
      </LandingPageProvider>
    </AuthProvider>
  );
}

export default MyApp;
