import { useState } from "react";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        email: "",
        loanType: "",
        loanAmount: "",
        employmentType: "salaried",
        salaryAmount: "",
        monthlyIncome: "",
        yearsInOperation: "",
    });

    const handleChange = (field) => (e) =>
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));

    return (
        <div className="bg-[#eff6ff] rounded-lg mt-[80px]">
            <form className="p-[40px] flex flex-col gap-[32px]" onSubmit={(e) => e.preventDefault()}>
                {/* Title */}
                <div className="text-black text-[18px] font-normal leading-[32px]">Contact form</div>

                {/* 3-column form grid */}
                <div className="flex flex-col min-[1100px]:flex-row gap-[40px]">
                    {/* Basic Details */}
                    <div className="w-full min-[1100px]:w-[454px] flex flex-col gap-[40px]">
                        <div className="text-black text-[16px] font-semibold leading-[24px]">Basic Details</div>
                        <div className="flex flex-col gap-[32px]">
                            <div className="flex flex-col gap-2">
                                <label className="text-black text-[16px] font-normal leading-[22.4px]">Full Name*</label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleChange("fullName")}
                                    className="min-w-[120px] px-4 py-3 bg-white rounded-lg outline outline-1 outline-[#e2e8f0] -outline-offset-[0.5px] text-[16px] font-normal leading-[16px] text-black placeholder:text-[#62748e]"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-black text-[16px] font-normal leading-[22.4px]">Mobile Number*</label>
                                <input
                                    type="number"
                                    value={formData.mobile}
                                    onChange={handleChange("mobile")}
                                    className="min-w-[120px] px-4 py-3 bg-white rounded-lg outline outline-1 outline-[#e2e8f0] -outline-offset-[0.5px] text-[16px] font-normal leading-[16px] text-black placeholder:text-[#62748e] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="Enter phone number"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-black text-[16px] font-normal leading-[22.4px]">Email ID</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange("email")}
                                    className="min-w-[120px] px-4 py-3 bg-white rounded-lg outline outline-1 outline-[#e2e8f0] -outline-offset-[0.5px] text-[16px] font-normal leading-[16px] text-black placeholder:text-[#62748e]"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Loan Requirement */}
                    <div className="w-full min-[1100px]:w-[454px] flex flex-col gap-[40px]">
                        <div className="text-black text-[16px] font-semibold leading-[24px]">Loan Requirement</div>
                        <div className="flex flex-col gap-[32px]">
                            <div className="flex flex-col gap-2">
                                <label className="text-black text-[16px] font-normal leading-[22.4px]">Type of Loan</label>
                                <select
                                    value={formData.loanType}
                                    onChange={handleChange("loanType")}
                                    className={`min-w-[120px] h-[40px] py-3 pl-4 pr-3 bg-white rounded-lg outline outline-1 outline-[#d9d9d9] -outline-offset-[0.5px] text-[16px] font-normal leading-[16px] ${!formData.loanType ? "text-[#62748e]" : "text-black"}`}
                                >
                                    <option value="" disabled hidden>Type of Loan</option>
                                    <option value="home" className="text-black">Home Loan</option>
                                    <option value="business" className="text-black">Business Loan</option>
                                    <option value="personal" className="text-black">Personal Loan</option>
                                    <option value="vehicle" className="text-black">Vehicle Loan</option>
                                    <option value="lap" className="text-black">Loan Against Property</option>
                                    <option value="msme" className="text-black">MSME / Mudra Loan</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-black text-[16px] font-normal leading-[22.4px]">Required Loan Amount</label>
                                <input
                                    type="number"
                                    value={formData.loanAmount}
                                    onChange={handleChange("loanAmount")}
                                    className="min-w-[120px] px-4 py-3 bg-white rounded-lg outline outline-1 outline-[#e2e8f0] -outline-offset-[0.5px] text-[16px] font-normal leading-[16px] text-black placeholder:text-[#62748e] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="Enter amount"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Employment / Income Details */}
                    <div className="w-full min-[1100px]:w-auto flex flex-col gap-[24px] min-[1100px]:gap-[40px]">
                        <div className="text-black text-[16px] font-semibold leading-[24px]">Employment / Income Details</div>
                        <div className="flex flex-col gap-[24px] min-[1100px]:gap-[32px]">
                            {/* Radio buttons */}
                            <div className="flex flex-col min-[1100px]:flex-row items-start min-[1100px]:items-center gap-3 min-[1100px]:gap-6 min-[1100px]:h-[70px]">
                                {[
                                    ["salaried", "Salaried"],
                                    ["selfEmployed", "Self-Employed"],
                                    ["businessOwner", "Business owner"],
                                ].map(([val, label]) => (
                                    <label key={val} className="min-w-[120px] inline-flex items-center gap-2 cursor-pointer">
                                        <span className={`w-4 h-4 rounded-full border border-black flex items-center justify-center ${formData.employmentType === val ? 'bg-white' : 'bg-white'}`}>
                                            {formData.employmentType === val && (
                                                <span className="w-[10px] h-[10px] bg-black rounded-full" />
                                            )}
                                        </span>
                                        <input
                                            type="radio"
                                            name="employmentType"
                                            value={val}
                                            checked={formData.employmentType === val}
                                            onChange={handleChange("employmentType")}
                                            className="hidden"
                                        />
                                        <span className="text-black text-[13px] min-[1100px]:text-[16px] font-normal leading-[20px] min-[1100px]:leading-[22.4px]">{label}</span>
                                    </label>
                                ))}
                            </div>
                            {formData.employmentType === "salaried" && (
                                <div className="flex flex-col gap-2">
                                    <label className="text-black text-[16px] font-normal leading-[22.4px]">Salary Amount</label>
                                    <input
                                        type="number"
                                        value={formData.salaryAmount}
                                        onChange={handleChange("salaryAmount")}
                                        className="min-w-[120px] px-4 py-3 bg-white rounded-lg outline outline-1 outline-[#e2e8f0] -outline-offset-[0.5px] text-[16px] font-normal leading-[16px] text-black placeholder:text-[#62748e] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="Enter amount"
                                    />
                                </div>
                            )}

                            {formData.employmentType === "selfEmployed" && (
                                <div className="flex flex-col gap-2">
                                    <label className="text-black text-[16px] font-normal leading-[22.4px]">Monthly Income</label>
                                    <input
                                        type="number"
                                        value={formData.monthlyIncome}
                                        onChange={handleChange("monthlyIncome")}
                                        className="min-w-[120px] px-4 py-3 bg-white rounded-lg outline outline-1 outline-[#e2e8f0] -outline-offset-[0.5px] text-[16px] font-normal leading-[16px] text-black placeholder:text-[#62748e] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="Enter amount"
                                    />
                                </div>
                            )}

                            {formData.employmentType === "businessOwner" && (
                                <div className="flex flex-col gap-2">
                                    <label className="text-black text-[16px] font-normal leading-[22.4px]">Years in Operation</label>
                                    <select
                                        value={formData.yearsInOperation}
                                        onChange={handleChange("yearsInOperation")}
                                        className={`min-w-[120px] h-[40px] py-3 pl-4 pr-3 bg-white rounded-lg outline outline-1 outline-[#d9d9d9] -outline-offset-[0.5px] text-[16px] font-normal leading-[16px] ${!formData.yearsInOperation ? "text-[#62748e]" : "text-black"}`}
                                    >
                                        <option value="" disabled hidden>Select years</option>
                                        <option value="less-than-1" className="text-black">Less than 1 year</option>
                                        <option value="1-2" className="text-black">1–2 years</option>
                                        <option value="2-5" className="text-black">2–5 years</option>
                                        <option value="5-plus" className="text-black">5+ years</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full min-[1100px]:w-auto px-6 py-4 bg-[#0d2446] text-white text-[14px] min-[1100px]:text-[16px] font-semibold leading-[24px] rounded-full border-none cursor-pointer hover:opacity-90 transition-opacity"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
