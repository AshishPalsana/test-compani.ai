import React from "react";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-slate-50 to-blue-50">
      <aside className="hidden lg:flex lg:w-80 bg-white shadow-xl flex-col justify-between py-8 px-6 sticky top-0 h-screen">
        <div className="space-y-8">
          <div className="px-6">
            <img src="/companiai.svg" alt="Compani" className="h-10 w-auto" />
          </div>
        </div>

        <div className="space-y-4 px-2">
          <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 rounded-lg p-4">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Setup takes less than 2 minutes</span>
          </div>
          <a
            href="/help"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors px-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Need help?
          </a>
        </div>
      </aside>

      <div className="lg:hidden bg-white shadow-sm px-4 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <img src="/companiai.svg" alt="Compani" className="h-8 w-auto" />
          <a
            href="/help"
            className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
          >
            Help
          </a>
        </div>
      </div>

      <main className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        <div className="flex-1 px-4 sm:px-6 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-12 flex items-center justify-center">
          <div className="w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}
