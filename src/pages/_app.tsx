import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
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
      <Component {...pageProps} />;
    </AuthProvider>
  );
}

export default MyApp;
