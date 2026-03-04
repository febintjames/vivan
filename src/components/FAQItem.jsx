import { useState } from "react";

const FAQItem = ({ q, a, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div
            className={`mb-4 transition-colors duration-200 ${open ? "bg-slate-200 border-b-2 border-gold" : "bg-slate-custom-50"
                }`}
        >
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full px-6 md:px-10 py-6 md:py-8 bg-transparent border-none cursor-pointer flex items-center gap-2.5 text-left font-inherit"
            >
                <div className="p-1.5 rounded-full flex items-center shrink-0">
                    <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        className={`transition-transform duration-300 ${open ? "rotate-180" : ""
                            }`}
                    >
                        <path
                            d="M3.96 7.57L9.5 13.11L15.04 7.57"
                            stroke={open ? "#0D2446" : "#6F6C8F"}
                            strokeWidth="1.58"
                            strokeLinecap="round"
                            fill="none"
                        />
                    </svg>
                </div>
                <span className="font-inter text-base md:text-lg leading-7 md:leading-8 text-slate-custom-900 flex-1">
                    {q}
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[500px] pb-6 md:pb-10" : "max-h-0"
                    }`}
            >
                {a && (
                    <div className="pl-16 md:pl-[84px] pr-6 md:pr-10">
                        <span className="font-inter text-base md:text-lg leading-7 md:leading-8 text-slate-custom-700">
                            {a}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQItem;
