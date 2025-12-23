import React from "react";

interface Props {
  onContinue: () => void;
  companyData?: {
    companyName?: string;
    location?: string;
  };
}

export const OnboardingSuccess: React.FC<Props> = ({
  onContinue,
  companyData,
}) => {
  return (
    <section className="mx-auto max-w-lg px-4">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-semibold text-slate-900">
          Your company is ready
        </h1>
        <p className="mt-2 text-slate-600">
          You can now start posting jobs and reviewing candidates.
        </p>
      </div>

      {companyData && (
        <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="mb-3 text-sm font-medium text-slate-700">
            Company profile
          </p>

          <div className="space-y-2 text-sm text-slate-700">
            {companyData.companyName && (
              <div className="flex justify-between">
                <span className="text-slate-500">Name</span>
                <span className="font-medium">{companyData.companyName}</span>
              </div>
            )}
            {companyData.location && (
              <div className="flex justify-between">
                <span className="text-slate-500">Location</span>
                <span className="font-medium">{companyData.location}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
        <p className="mb-3 text-sm font-medium text-slate-800">
          Suggested next step
        </p>
        <p className="text-sm text-slate-700">
          Create your first job post to start receiving applications.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onContinue}
          className="w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-medium text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          Post your first job
        </button>

        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="w-full rounded-xl px-6 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 transition cursor-pointer"
        >
          Go to dashboard instead
        </button>
      </div>
    </section>
  );
};
