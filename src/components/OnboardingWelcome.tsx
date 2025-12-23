import React from "react";

interface Props {
  onNext: () => void;
}

export const OnboardingWelcome: React.FC<Props> = ({ onNext }) => {
  return (
    <section className="flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Let’s set up your company
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            You’ll be ready to publish your first job in just a couple of steps.
          </p>
        </header>

        <div className="relative mb-10 space-y-6">
          <div className="absolute left-4 top-0 h-full w-px bg-slate-200" />

          {[
            {
              title: "Company basics",
              description: "Name, size, and what you do.",
            },
            {
              title: "Branding",
              description: "Logo and visuals candidates will recognize.",
            },
            {
              title: "First job post",
              description: "Create a role ready to publish.",
            },
          ].map((step, index) => (
            <div key={index} className="relative flex gap-4">
              <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
                {index + 1}
              </div>
              <div>
                <h3 className="font-medium text-slate-900">{step.title}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mb-8 text-center text-sm text-slate-500">
          Takes less than 2 minutes • You can edit everything later
        </p>

        <button
          onClick={onNext}
          className="w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-medium text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          Continue setup
        </button>
      </div>
    </section>
  );
};
