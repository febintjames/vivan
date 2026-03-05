import { useState } from "react";

const EligibilityModal = ({ open, onClose }) => {
    const [emp, setEmp] = useState("salaried");

    if (!open) return null;

    return (
        <div
            onClick={(e) => e.target === e.currentTarget && onClose()}
            className="fixed inset-0 z-[2000] bg-black/40 flex items-center justify-center p-4"
        >
            <div className="w-full max-w-[420px] p-6 bg-white rounded-lg border border-[#FFF085] flex flex-col gap-6 animate-[fadeIn_0.2s_ease-out] max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <span className="font-inter text-xl font-semibold text-black">
                        Free Eligibility Check
                    </span>
                    <button
                        onClick={onClose}
                        className="bg-transparent border-none cursor-pointer p-1 hover:bg-slate-100 rounded-md transition-colors"
                    >
                        <img src="/close.svg" alt="Close" className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="font-inter text-base text-black">Name</label>
                        <input
                            className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 font-inter text-base text-slate-500 outline-none focus:border-gold transition-colors"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-inter text-base text-black">Phone</label>
                        <input
                            className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 font-inter text-base text-slate-500 outline-none focus:border-gold transition-colors"
                            placeholder="Enter phone number"
                            type="tel"
                        />
                    </div>

                    {/* Employment Type */}
                    <div className="flex items-center flex-wrap gap-5 py-2">
                        {[
                            ["salaried", "Salaried"],
                            ["selfEmployed", "Self-employed"],
                            ["business", "Business owner"],
                        ].map(([v, l]) => (
                            <label
                                key={v}
                                className="flex items-center gap-3 cursor-pointer font-inter text-base text-black"
                            >
                                <div
                                    onClick={() => setEmp(v)}
                                    className="w-4 h-4 rounded-full bg-white border border-black flex items-center justify-center cursor-pointer shrink-0"
                                >
                                    {emp === v && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-black" />
                                    )}
                                </div>
                                {l}
                            </label>
                        ))}
                    </div>

                    {emp === "salaried" ? (
                        <div className="flex flex-col gap-2">
                            <label className="font-inter text-base text-black">
                                Salary amount
                            </label>
                            <input
                                className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 font-inter text-base text-slate-500 outline-none focus:border-gold transition-colors"
                                placeholder="Enter amount"
                            />
                        </div>
                    ) : emp === "selfEmployed" ? (
                        <div className="flex flex-col gap-2">
                            <label className="font-inter text-base text-black">
                                Monthly Income
                            </label>
                            <input
                                className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 font-inter text-base text-slate-500 outline-none focus:border-gold transition-colors"
                                placeholder="Enter amount"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <label className="font-inter text-base text-black">
                                Years in Operation
                            </label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 font-inter text-base text-slate-500 outline-none appearance-none pr-10 focus:border-gold transition-colors">
                                    <option value="">Select years</option>
                                    <option>Less than 1 year</option>
                                    <option>1–2 years</option>
                                    <option>2–5 years</option>
                                    <option>5+ years</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M4 6L8 10L12 6"
                                            stroke="#1E1E1E"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label className="font-inter text-base text-black">
                            Amount needed
                        </label>
                        <input
                            className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 font-inter text-base text-slate-500 outline-none focus:border-gold transition-colors"
                            placeholder="Enter amount"
                        />
                    </div>
                </div>

                {/* Submit */}
                <button className="w-full px-6 py-4 bg-slate-100 rounded-full border-none font-inter text-base font-semibold text-black cursor-pointer hover:bg-slate-200 transition-colors">
                    Check Eligibility
                </button>
            </div>
        </div>
    );
};

export default EligibilityModal;
