import VivianLogo from "./VivianLogo";

const Footer = ({ setPage }) => (
    <footer className="bg-[#eff6ff] font-inter">
        <div
            className="pt-[20px] md:pt-[80px] pb-[20px] md:pb-[40px] flex flex-col gap-[24px] md:gap-[86px]"
            style={{ paddingInline: "clamp(1.25rem, 11.765vw - 1.618rem, 12.5rem)" }}
        >
            {/* Logo + Description */}
            <div className="flex flex-col gap-6">
                <VivianLogo />
                <div className="text-[#90a1b9] text-[16px] font-inter font-normal leading-[26px]">
                    Vivian Business Solutions is a Kochi-based financial solutions provider
                    assisting individuals and businesses with loan processing, mutual fund
                    investments, and insurance services through trusted partners. We focus
                    on transparent guidance, structured coordination, and faster processing
                    support.
                </div>
            </div>

            {/* Links + Contact Grid */}
            <div className="flex flex-col min-[1100px]:flex-row justify-between gap-6 md:gap-10">
                {/* Left: Links + Working Hours */}
                <div className="flex-1 flex flex-col justify-between gap-[24px] md:gap-[40px]">
                    {/* Links Row */}
                    <div className="flex flex-col md:flex-row md:items-center gap-[24px] md:gap-[80px]">
                        {/* Quick Links */}
                        <div className="flex flex-col gap-6">
                            <div className="text-[#0f172b] text-[20px] md:text-[16px] font-inter font-semibold leading-[28px] md:leading-[24px]">Quick Links</div>
                            <div className="flex flex-col gap-4">
                                {[
                                    ["home", "Home"],
                                    ["services", "Services"],
                                    ["contact", "Contact"],
                                ].map(([p, l]) => (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className="bg-transparent border-none cursor-pointer text-[#0f172b] text-[15px] md:text-[16px] font-inter font-semibold md:font-medium leading-[24px] text-left p-0 hover:text-[#f7ba18] transition-colors"
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Services */}
                        <div className="flex flex-col gap-6">
                            <div className="text-[#0f172b] text-[20px] md:text-[16px] font-inter font-semibold md:font-bold leading-[28px] md:leading-[24px]">Services</div>
                            <div className="flex flex-col gap-4">
                                {["Loan Assistance", "Mutual Fund Services", "Insurance Services"].map(
                                    (s) => (
                                        <div key={s} className="text-[#0f172b] text-[15px] md:text-[16px] font-inter font-semibold md:font-medium leading-[24px]">
                                            {s}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Working Hours */}
                    <div className="inline-flex items-start md:items-center gap-[10px]">
                        <img src="/clockIcon.svg" alt="Clock" className="w-6 h-6" />
                        <div className="text-[#314158] text-[15px] md:text-[16px] font-inter font-medium leading-[24px] md:leading-[26px]">
                            Monday – Saturday: 9:30 AM – 6:30 PM, Sunday: Closed
                        </div>
                    </div>
                </div>

                {/* Right: Contact Information */}
                <div className="flex flex-col gap-6">
                    <div className="text-[#0f172b] text-[20px] md:text-[16px] font-inter font-semibold leading-[28px] md:leading-[24px]">Contact Information</div>
                    <div className="flex flex-col gap-4 md:gap-6">
                        <div className="text-[#314158] text-[16px] font-inter font-normal leading-[26px]">
                            Moidus Tower, 2nd Floor<br />
                            Post Office Junction, Thoppumpady<br />
                            Kochi – 682005<br />
                            Landmark: Above Muthoot FinCorp
                        </div>
                        <div className="flex flex-col gap-3">
                            {/* Phone Box */}
                            <div className="p-3 outline outline-1 outline-[#e2e8f0] -outline-offset-1 inline-flex items-center gap-[10px]">
                                <img src="/phoneIcon.svg" alt="Phone" className="w-6 h-6" />
                                <div className="text-[#314158] text-[16px] font-inter font-normal leading-[26px]">
                                    9567582102, 9567582198, 9895660900
                                </div>
                            </div>
                            {/* Email Box */}
                            <div className="p-3 outline outline-1 outline-[#e2e8f0] -outline-offset-1 inline-flex items-center gap-[10px]">
                                <img src="/mailIcon.svg" alt="Email" className="w-6 h-6" />
                                <div className="text-[#314158] text-[16px] font-inter font-normal leading-[26px]">
                                    Vivianbusinesssolutions@gmail.com, Loanaidkochi@gmail.com
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Divider */}
        <div
            className="pt-[20px] md:pt-[40px] pb-[20px] md:pb-[80px] border-t border-[#e2e8f0] flex flex-col min-[1100px]:flex-row justify-between items-start min-[1100px]:items-end gap-[10px] md:gap-6"
            style={{ paddingInline: "clamp(1.25rem, 11.765vw - 1.618rem, 12.5rem)" }}
        >
            {/* Disclaimer */}
            <div className="flex flex-col gap-3">
                <div className="text-[#90a1b9] text-[13px] font-inter font-normal leading-[18px]">Disclaimer</div>
                <ul className="text-[#90a1b9] text-[13px] font-inter font-normal leading-[18px] list-disc pl-5 m-0 flex flex-col gap-1">
                    <li>Loan approval is subject to bank/NBFC eligibility norms.</li>
                    <li>Mutual fund investments are subject to market risks.</li>
                    <li>Insurance policies are subject to terms and conditions of respective insurers.</li>
                </ul>
            </div>
            {/* Copyright */}
            <div className="text-[#90a1b9] text-[13px] font-inter font-normal leading-[18px] md:whitespace-nowrap">
                © 2026 Vivian Business Solutions. All Rights Reserved.
            </div>
        </div>
    </footer>
);

export default Footer;
