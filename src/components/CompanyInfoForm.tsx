import React, { useEffect, useRef, useState } from "react";

interface Props {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

const COUNTRIES = [
  "Aruba",
  "Afghanistan",
  "Angola",
  "Anguilla",
  "Åland Islands",
  "Albania",
  "Andorra",
  "United Arab Emirates",
  "Argentina",
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Canada",
  "China",
  "France",
  "Germany",
  "India",
  "Japan",
  "United Kingdom",
  "United States",
];

export const CompanyInfoForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
}) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const locationRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    companyName: defaultValues?.companyName ?? "",
    companyWebsite: defaultValues?.companyWebsite ?? "",
    location: defaultValues?.location ?? "",
    logo: defaultValues?.logo ?? null,
    about: defaultValues?.about ?? "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (!locationRef.current?.contains(e.target as Node)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handleLocationSelect = (country: string) => {
    setForm((prev) => ({ ...prev, location: country }));
    clearError("location");
    setIsLocationOpen(false);
    setLocationSearch("");
  };

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({ ...prev, logo: file }));
    clearError("logo");

    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!form.companyName.trim()) errs.companyName = "Company name is required";
    if (!form.companyWebsite.trim())
      errs.companyWebsite = "Company website is required";
    if (!form.location.trim()) errs.location = "Location is required";
    if (!form.logo) errs.logo = "Company logo is required";
    if (!form.about.trim()) errs.about = "About your company is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const initials =
    form.companyName
      ?.split(" ")
      .map((w: string) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "JD";

  const filteredCountries = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(locationSearch.toLowerCase())
  );

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <section className="pt-4 pb-12">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">
          Company details
        </h2>
        <p className="text-base text-gray-600 mb-8">
          Tell us about your company to get started.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
          <div>
            <label className="block font-normal mb-2 text-gray-800">
              Company name<span className="text-red-700">*</span>
            </label>
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Enter Company name"
              className="w-full border border-gray-400 rounded-[0.3rem] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            />
            {errors.companyName && (
              <p className="text-red-700 text-sm mt-1">{errors.companyName}</p>
            )}
          </div>

          <div>
            <label className="block font-normal mb-2 text-gray-800">
              Company Website<span className="text-red-700">*</span>
            </label>
            <input
              name="companyWebsite"
              value={form.companyWebsite}
              onChange={handleChange}
              placeholder="https://"
              className="w-full border border-gray-400 rounded-[0.3rem] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            />
            {errors.companyWebsite && (
              <p className="text-red-700 text-sm mt-1">
                {errors.companyWebsite}
              </p>
            )}
          </div>

          <div ref={locationRef} className="relative">
            <label className="block font-normal mb-2 text-gray-800">
              Location<span className="text-red-700">*</span>
            </label>

            {/* Input wrapper */}
            <div className="relative">
              <input
                readOnly
                value={form.location}
                onClick={() => setIsLocationOpen(true)}
                placeholder="Enter Location"
                className="w-full border border-gray-400 rounded-[0.3rem] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
              />

              {/* Dropdown Arrow */}
              <span
                onClick={() => setIsLocationOpen(true)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer pointer-events-auto"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" strokeWidth="2" />
                </svg>
              </span>
            </div>

            {isLocationOpen && (
              <div className="absolute z-50 mt-1 w-full border border-gray-300 rounded-[0.3rem] bg-white shadow-md">
                {/* Search */}
                <div className="relative p-2 border-b border-gray-200">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                  <input
                    autoFocus
                    placeholder="Search country..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-[0.3rem] text-sm focus:outline-none"
                  />
                </div>

                {/* List */}
                <div className="max-h-60 overflow-y-auto">
                  {filteredCountries.map((country) => (
                    <div
                      key={country}
                      onClick={() => handleLocationSelect(country)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                    >
                      {country}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errors.location && (
              <p className="text-red-700 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="block font-normal mb-2 text-gray-800">
              Company Logo<span className="text-red-700">*</span>
            </label>

            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center text-white text-2xl font-semibold overflow-hidden">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <div>
                  <div className="font-normal">Add Logo</div>
                  <div className="text-xs text-gray-400">
                    JPG or PNG. Max 5MB.
                  </div>
                </div>
              </div>

              <label htmlFor="companyLogo">
                <span className="inline-block px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-blue-700 cursor-pointer hover:bg-blue-50 transition">
                  Upload Logo
                </span>
                <input
                  id="companyLogo"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleLogo}
                  className="hidden"
                />
              </label>
            </div>

            {errors.logo && (
              <p className="text-red-700 text-sm mt-1">{errors.logo}</p>
            )}
          </div>
        </div>

        <div className="mb-8 border-t border-gray-200 pt-8">
          <label className="block font-normal mb-2 text-gray-800">
            About your Company<span className="text-red-700">*</span>
          </label>
          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            placeholder="Enter a description"
            className="w-full border border-gray-400 rounded-[0.3rem] px-3 py-2 min-h-24 focus:outline-none focus:ring-1 focus:ring-black"
          />
          {errors.about && (
            <p className="text-red-700 text-sm mt-1">{errors.about}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full sm:w-auto cursor-pointer"
        >
          Continue
        </button>
      </section>
    </form>
  );
};
