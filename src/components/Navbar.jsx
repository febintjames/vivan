import { useState } from "react";
import VivianLogo from "./VivianLogo";
import WhatsAppButton from "./WhatsAppButton";

const Navbar = ({ page, setPage, openModal }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const onDark = page === "services" || page === "contact";

    const navLinks = [
        ["home", "Home"],
        ["services", "Services"],
        ["contact", "Contact"],
    ];

    return (
        <nav
            className="absolute top-[40px] left-0 right-0 z-[101] flex items-center justify-between bg-transparent"
            style={{ marginInline: "clamp(1.25rem, 11.765vw - 1.618rem, 12.5rem)" }}
        >
            {/* Left: Logo + Nav Links Group (gap 40px) */}
            <div className="flex items-center gap-[40px]">
                <div
                    className="cursor-pointer flex items-center shrink-0"
                    onClick={() => setPage("home")}
                >
                    <VivianLogo white={onDark} />
                </div>

                {/* Desktop Nav Links (gap 24px) */}
                <div className="hidden min-[1100px]:flex items-center gap-[24px]">
                    {navLinks.map(([p, l]) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`bg-transparent border-none cursor-pointer font-inter text-[16px] font-semibold leading-[24px] transition-colors duration-200 ${page === p
                                ? "text-[#f7ba18]"
                                : onDark
                                    ? "text-white hover:text-[#f7ba18]"
                                    : "text-black hover:text-[#f7ba18]"
                                }`}
                        >
                            {l}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right: CTA buttons group (gap 12px) */}
            <div className="hidden min-[1100px]:flex items-center gap-[12px]">
                {/* WhatsApp Now Button */}
                <WhatsAppButton />

                {/* Free Eligibility Check Button */}
                <button
                    onClick={openModal}
                    className="flex justify-end items-center gap-[8px] px-[24px] py-[16px] bg-[#F1F5F9] rounded-full border-none font-inter text-[16px] font-semibold leading-[24px] text-black cursor-pointer hover:scale-105 transition-transform whitespace-nowrap"
                >
                    Free Eligibility Check
                </button>
            </div>

            {/* Mobile Hamburger */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="min-[1100px]:hidden bg-transparent border-none cursor-pointer relative z-[102]"
            >
                <img
                    src="/hamburger.svg"
                    alt="Menu"
                    className={`${onDark ? "invert brightness-200" : ""}`}
                />
            </button>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="absolute top-[60px] right-0 bg-white shadow-xl border border-slate-200 rounded-lg flex flex-col p-6 gap-4 min-[1100px]:hidden z-[999] w-[80vw] max-w-[300px]">
                    {navLinks.map(([p, l]) => (
                        <button
                            key={p}
                            onClick={() => {
                                setPage(p);
                                setMobileOpen(false);
                            }}
                            className={`bg-transparent border-none cursor-pointer font-inter text-lg font-semibold text-left py-2 ${page === p ? "text-[#f7ba18]" : "text-black"
                                }`}
                        >
                            {l}
                        </button>
                    ))}
                    <div className="border-t border-slate-200 pt-4 flex flex-col gap-4">
                        <WhatsAppButton className="w-fit" />
                        <button
                            onClick={() => {
                                openModal();
                                setMobileOpen(false);
                            }}
                            className="px-6 py-[17px] h-14 bg-[#0d2446] rounded-full border-none font-inter text-[16px] font-semibold text-white cursor-pointer w-full text-center"
                        >
                            Free Eligibility Check
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

