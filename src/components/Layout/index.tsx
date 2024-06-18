import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LayoutProps } from "@/types";

const Layout = ({ children }: LayoutProps) => {
  const { logout } = useAuth();
  const handleLogOut = () => {
    logout();
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/" className="mr-4">
            Dashboard
          </Link>
          <Link href="/create" className="mr-4">
            Create Landing Page
          </Link>
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleLogOut}
        >
          <span>Logout</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </nav>
      <main className="pl-5 pr-5">{children}</main>
    </div>
  );
};

export default Layout;
