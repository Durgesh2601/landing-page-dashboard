import React, { Component, ErrorInfo, ReactNode } from "react";
import FallbackScreen from "../FallbackScreen";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      // Render the Fallback component when an error occurs
      return <FallbackScreen error={error} errorInfo={errorInfo} />;
    }

    // When there's no error, render children as normal
    return this.props.children;
  }
}

export default ErrorBoundary;
