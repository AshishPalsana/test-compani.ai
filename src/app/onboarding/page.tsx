"use client";
import React, { useState } from "react";
import { OnboardingStepperVertical } from "@/components/OnboardingStepperVertical";
import { OnboardingWelcome } from "@/components/OnboardingWelcome";
import { CompanyInfoForm } from "@/components/CompanyInfoForm";
import { OnboardingSuccess } from "@/components/OnboardingSuccess";

const TOTAL_STEPS = 3;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState<any>(null);

  return (
    <div className="w-full">
      <div className="hidden lg:block fixed left-6 top-32 w-80 px-8">
        <OnboardingStepperVertical currentStep={step} />
      </div>

      <div className="lg:hidden mb-6 sm:mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-700">
              Step {step} of {TOTAL_STEPS}
            </span>
            <span className="text-sm text-slate-500">
              {Math.round((step / TOTAL_STEPS) * 100)}% complete
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-linear-to-r from-blue-600 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
          <div className="mt-3 text-xs text-slate-600">
            {step === 1 && "Welcome to Compani"}
            {step === 2 && "Company details"}
            {step === 3 && "Finish setup"}
          </div>
        </div>
      </div>

      <div className="w-full">
        {step === 1 && <OnboardingWelcome onNext={() => setStep(2)} />}
        {step === 2 && (
          <CompanyInfoForm
            onSubmit={(data) => {
              setCompanyData(data);
              setStep(3);
            }}
            // onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <OnboardingSuccess
            companyData={companyData}
            onContinue={() => {
              window.location.href = "/dashboard";
            }}
          />
        )}
      </div>
    </div>
  );
}
