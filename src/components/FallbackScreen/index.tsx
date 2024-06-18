import React from "react";
import { FallbackScreenProps } from "@/types";

const FallbackScreen: React.FC<FallbackScreenProps> = ({
  error,
  errorInfo,
}) => (
  <div className="flex flex-col items-center justify-center h-full mt-5">
    <h2 className="text-red-600 text-2xl font-semibold mb-4">
      Oops! Something went wrong. It's not you, it's us.
    </h2>
    <button
      className="px-4 py-2 bg-gray-600 text-white rounded"
      onClick={() => (window.location.href = "/")}
    >
      Go to homepage
    </button>
    <p className="text-gray-600 text-lg">{error && error.toString()}</p>
    <p className="text-gray-600">{errorInfo && errorInfo.componentStack}</p>
  </div>
);

export default FallbackScreen;
