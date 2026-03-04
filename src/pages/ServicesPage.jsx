import Footer from "../components/Footer";

const SERVICE_IMAGE_SHADOW = "drop-shadow(15.47px 15.75px 48.66px rgba(38, 32, 63, 0.64)) drop-shadow(61.31px 63.56px 70.31px rgba(38, 32, 63, 0.55)) drop-shadow(138.09px 142.88px 70.31px rgba(38, 32, 63, 0.32)) drop-shadow(245.53px 253.69px 70.31px rgba(38, 32, 63, 0.1)) drop-shadow(383.63px 396.56px 70.31px rgba(38, 32, 63, 0.01))";

const ServicesPage = ({ setPage }) => (
    <div className="page-enter">
        {/* ═══ HERO ═══ */}
        <div
            className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center"
            style={{ backgroundImage: "url('/servicesHeroBg.png')", minHeight: '571px' }}
        >
            <h1 className="text-[#f8fafc] text-center text-[64px] font-inter font-bold leading-[102px]">Our Services</h1>
            {/* Gold gradient line */}
            <div
                className="absolute bottom-0 right-0 h-[48px] md:h-[80px]"
                style={{
                    width: 'min(693px, 100%)',
                    background: 'linear-gradient(90deg, #F8BA17 0%, rgba(248, 186, 23, 0) 100%)',
                    clipPath: 'polygon(clamp(44px, 18vw, 80px) 0, 100% 0, 100% 100%, 0 100%)',
                }}
            />
        </div>

        {/* ═══ SERVICE SECTIONS ═══ */}
        <div
            className="grid grid-cols-1 mt-[80px] mb-[80px]"
            style={{ marginInline: "clamp(1.25rem, 11.765vw - 1.618rem, 12.5rem)" }}
        >
            {/* ── Loans ── */}
            <div className="grid grid-cols-1 min-[1100px]:grid-cols-[1fr_3fr] gap-[40px] min-h-[565px] px-[20px] min-[1100px]:px-[40px] items-center overflow-hidden bg-[#f1f5f9] border-b-[20px] border-[#f0b100]">
                <div>
                    <img
                        src="/BankImg.png"
                        alt="Loans"
                        className="w-full"
                        style={{ filter: SERVICE_IMAGE_SHADOW }}
                    />
                </div>
                <div className="flex flex-col gap-5 h-full">
                    <h2 className="mt-[80px] text-[#0f172b] text-[40px] font-inter font-semibold leading-[56px]">Loans (via Loan Aid)</h2>
                    <h4 className="text-[#0f172b] text-[18px] font-inter font-normal leading-[32px]">
                        Home Loan | Business Loan | Personal Loan | Vehicle Loan |
                        Loan Against Property | MSME / Mudra Loans
                    </h4>
                    <div className="grid grid-cols-1 min-[1100px]:grid-cols-[1fr_1fr] gap-[24px]">
                        <div className="flex flex-col gap-4">
                            <p className="text-[#314158] text-[18px] font-inter font-normal leading-[32px]">
                                We help customers identify the most suitable loan
                                option based on eligibility, income profile, repayment
                                capacity, and documentation readiness.
                            </p>
                            <p className="text-[#314158] text-[18px] font-inter font-normal leading-[32px]">
                                Our team conducts detailed eligibility checks, reviews
                                documentation thoroughly, and coordinates with partner
                                banks and NBFCs to ensure faster processing and
                                structured follow-ups until disbursement.
                            </p>
                            <p className="text-[#314158] text-[18px] font-inter font-normal leading-[32px]">
                                We function as a facilitation and coordination partner,
                                simplifying the loan journey for individuals and
                                businesses.
                            </p>
                        </div>
                        <div className="bg-[#fefce8] rounded-lg h-fit w-full max-w-[420px] min-[1100px]:w-fit min-[1100px]:max-w-none px-5 md:px-6 py-4">
                            <h4>Key Benefits</h4>
                            <ul className="list-disc list-outside space-y-3 pl-6 text-[#314158] text-[15px] min-[1100px]:text-[18px] font-inter font-normal leading-[28px] min-[1100px]:leading-[32px]">
                                <li>Free eligibility check</li>
                                <li>Proper bank/NBFC selection based on profile</li>
                                <li>Document scrutiny and verification</li>
                                <li>Faster processing coordination</li>
                                <li>End-to-end follow-up until disbursement</li>
                                <li>Assistance in case of prior rejection (case reassessment)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Mutual Funds ── */}
            <div className="grid grid-cols-1 min-[1100px]:grid-cols-[1fr_3fr] gap-[40px] min-h-[565px] px-[20px] min-[1100px]:px-[40px] items-center overflow-hidden bg-[#dbeafe] border-b-[20px] border-[#f0b100]">
                <div>
                    <img
                        src="/MoneyImg.png"
                        alt="Mutual Funds"
                        className="w-full"
                        style={{ filter: SERVICE_IMAGE_SHADOW }}
                    />
                </div>
                <div className="flex flex-col gap-5 h-full">
                    <h2 className="mt-[80px] text-[#0f172b] text-[40px] font-inter font-semibold leading-[56px]">Mutual Fund Services (NJ Wealth Partner)</h2>
                    <h4 className="text-[#0f172b] text-[18px] font-inter font-normal leading-[32px]">SIP | Lump Sum | Goal-Based Investing | Portfolio Review</h4>
                    <p className="text-[#314158] text-[18px] font-inter font-normal leading-[32px]">
                        We assist customers in building long-term wealth through
                        structured investment planning aligned with individual
                        financial goals and risk profiles.
                    </p>
                    <p className="text-[#314158] text-[18px] font-inter font-normal leading-[32px]">
                        Our approach focuses on disciplined investing,
                        diversification, and long-term portfolio management
                        strategies rather than short-term speculation.
                    </p>
                    <p className="text-[#a65f00] text-[18px] font-inter font-normal leading-[32px] flex items-center">
                        <img src="/alert.svg" alt="alert" className="align-middle mr-2" />
                        Mutual fund investments are subject to market risks. Read all
                        scheme-related documents carefully.
                    </p>
                </div>
            </div>

            {/* ── Insurance ── */}
            <div className="grid grid-cols-1 min-[1100px]:grid-cols-[1fr_3fr] gap-[40px] min-h-[565px] px-[20px] min-[1100px]:px-[40px] items-center overflow-hidden bg-[#dff2fe]">
                <div>
                    <img
                        src="/InsuranceImg.png"
                        alt="Insurance"
                        className="w-full"
                        style={{ filter: SERVICE_IMAGE_SHADOW }}
                    />
                </div>
                <div className="flex flex-col gap-5 h-full">
                    <h2 className="mt-[80px] text-[#0f172b] text-[40px] font-inter font-semibold leading-[56px]">Insurance Services</h2>
                    <h4 className="text-[#0f172b] text-[18px] font-inter font-normal leading-[32px]">
                        Life Insurance | Health Insurance | Mediclaim | General
                        Insurance | Vehicle Insurance
                    </h4>
                    <p className="text-[#314158] text-[18px] font-inter font-normal leading-[32px]">
                        We assist individuals and businesses in selecting suitable
                        insurance policies based on risk coverage needs, financial
                        goals, and budget considerations.
                    </p>
                    <p className="text-[#314158] text-[18px] font-inter font-normal leading-[32px]">
                        We also provide support for renewals, policy servicing, and
                        claim guidance.
                    </p>
                </div>
            </div>
        </div>

        <Footer setPage={setPage} />
    </div>
);

export default ServicesPage;