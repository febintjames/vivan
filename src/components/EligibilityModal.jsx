import { useState } from "react";
import emailjs from "@emailjs/browser";

const initialForm = {
    name: "",
    phone: "",
    salaryAmount: "",
    monthlyIncome: "",
    yearsInOperation: "",
    amountNeeded: "",
};

const EligibilityModal = ({ open, onClose }) => {
    const [emp, setEmp] = useState("salaried");
    const [formData, setFormData] = useState(initialForm);
    const [submitState, setSubmitState] = useState({
        loading: false,
        message: "",
        error: false,
    });

    // Update these env keys in .env with your EmailJS values.
    const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ELIGIBILITY_TEMPLATE_ID;
    const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!open) return null;

    const handleChange = (field) => (e) =>
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));

    const handleEmploymentChange = (value) => {
        setEmp(value);
        setFormData((prev) => ({
            ...prev,
            salaryAmount: "",
            monthlyIncome: "",
            yearsInOperation: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitState({ loading: true, message: "", error: false });

        try {
            if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
                throw new Error(
                    "Missing EmailJS config. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_ELIGIBILITY_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in .env."
                );
            }

            const employmentLabel =
                emp === "salaried"
                    ? "Salary Amount"
                    : emp === "selfEmployed"
                        ? "Monthly Income"
                        : "Years in Operation";

            const employmentValue =
                emp === "salaried"
                    ? formData.salaryAmount
                    : emp === "selfEmployed"
                        ? formData.monthlyIncome
                        : formData.yearsInOperation;

            // Keep these keys in sync with your EmailJS eligibility template variables.
            // Duplicate aliases are intentional so one shared template can handle both forms.
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    formType: "Eligibility",
                    name: formData.name,
                    fullName: formData.name,
                    phone: formData.phone,
                    mobile: formData.phone,
                    employmentType: emp,
                    salaryAmount: formData.salaryAmount,
                    monthlyIncome: formData.monthlyIncome,
                    yearsInOperation: formData.yearsInOperation,
                    amountNeeded: formData.amountNeeded,
                    message: [
                        "Eligibility Form Submission",
                        `Name: ${formData.name || "-"}`,
                        `Phone: ${formData.phone || "-"}`,
                        `Employment Type: ${emp}`,
                        `${employmentLabel}: ${employmentValue || "-"}`,
                        `Amount Needed: ${formData.amountNeeded || "-"}`,
                    ].join("\n"),
                },
                {
                    publicKey: EMAILJS_PUBLIC_KEY,
                }
            );

            setFormData({ ...initialForm });
            setEmp("salaried");
            setSubmitState({
                loading: false,
                message: "Your details submitted. We will touch with you soon.",
                error: false,
            });
        } catch (error) {
            const resolvedMessage =
                (error && typeof error === "object" && "text" in error && error.text) ||
                (error && typeof error === "object" && "message" in error && error.message) ||
                "Failed to send eligibility form.";

            const message =
                error instanceof TypeError
                    ? "Email service is unavailable. Please try again."
                    : resolvedMessage;

            setSubmitState({
                loading: false,
                message,
                error: true,
            });
        }
    };

    return (
        <div
            onClick={(e) => e.target === e.currentTarget && onClose()}
            className="fixed inset-0 z-[2000] bg-black/40 flex items-center justify-center p-4"
        >
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[420px] p-6 bg-white rounded-lg border border-[#FFF085] flex flex-col gap-6 animate-[fadeIn_0.2s_ease-out] max-h-[90vh] overflow-y-auto"
            >
                <div className="flex justify-between items-start">
                    <span className="font-inter text-xl font-semibold text-black">
                        Free Eligibility Check
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-transparent border-none cursor-pointer p-1 hover:bg-slate-100 rounded-md transition-colors"
                    >
                        <img src="/close.svg" alt="Close" className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="font-inter text-base text-black">Name</label>
                        <input
                            value={formData.name}
                            onChange={handleChange("name")}
                            className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 font-inter text-base text-black outline-none focus:border-gold transition-colors"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-inter text-base text-black">Phone</label>
                        <input
                            value={formData.phone}
                            onChange={handleChange("phone")}
                            className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 font-inter text-base text-black outline-none focus:border-gold transition-colors"
                            placeholder="Enter phone number"
                            type="tel"
                            required
                        />
                    </div>

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
                                <input
                                    type="radio"
                                    name="employmentType"
                                    value={v}
                                    checked={emp === v}
                                    onChange={() => handleEmploymentChange(v)}
                                    className="sr-only"
                                />
                                <div className="w-4 h-4 rounded-full bg-white border border-black flex items-center justify-center shrink-0">
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
                                value={formData.salaryAmount}
                                onChange={handleChange("salaryAmount")}
                                className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 font-inter text-base text-black outline-none focus:border-gold transition-colors"
                                placeholder="Enter amount"
                            />
                        </div>
                    ) : emp === "selfEmployed" ? (
                        <div className="flex flex-col gap-2">
                            <label className="font-inter text-base text-black">
                                Monthly Income
                            </label>
                            <input
                                value={formData.monthlyIncome}
                                onChange={handleChange("monthlyIncome")}
                                className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 font-inter text-base text-black outline-none focus:border-gold transition-colors"
                                placeholder="Enter amount"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <label className="font-inter text-base text-black">
                                Years in Operation
                            </label>
                            <div className="relative">
                                <select
                                    value={formData.yearsInOperation}
                                    onChange={handleChange("yearsInOperation")}
                                    className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 font-inter text-base text-black outline-none appearance-none pr-10 focus:border-gold transition-colors"
                                >
                                    <option value="">Select years</option>
                                    <option value="Less than 1 year">Less than 1 year</option>
                                    <option value="1-2 years">1-2 years</option>
                                    <option value="2-5 years">2-5 years</option>
                                    <option value="5+ years">5+ years</option>
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
                            value={formData.amountNeeded}
                            onChange={handleChange("amountNeeded")}
                            className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 font-inter text-base text-black outline-none focus:border-gold transition-colors"
                            placeholder="Enter amount"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={submitState.loading}
                    className="w-full px-6 py-4 bg-slate-100 rounded-full border-none font-inter text-base font-semibold text-black cursor-pointer hover:bg-slate-200 transition-colors"
                >
                    {submitState.loading ? "Sending..." : "Check Eligibility"}
                </button>
                {submitState.message && (
                    <div className={`text-center text-sm ${submitState.error ? "text-red-600" : "text-green-700"}`}>
                        {submitState.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default EligibilityModal;
