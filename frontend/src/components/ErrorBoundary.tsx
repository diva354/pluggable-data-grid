import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("🧨 Error caught in ErrorBoundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    // You could also force a page reload:
    // window.location.reload();
  };

  render() {
    if (this.state.hasError) {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 flex items-center justify-center bg-white px-4 z-50">
                  <div className="border border-red-200 rounded-xl shadow-md p-10 max-w-lg w-full text-center">
                    <h2 className="text-2xl font-bold text-red-700 mb-4">
                      ⚠️ Oops! Something went wrong
                    </h2>
                    <p className="text-gray-700 text-lg mb-6">
                      We're working to fix it. You can try again or contact support if the problem persists.
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                      Need help?{" "}
                      <a href="mailto:support@yourapp.com" className="underline text-blue-600">
                        Contact Support
                      </a>
                    </p>
                  </div>
                </div>
              );
              
          }
    }

    return this.props.children;
  }
}