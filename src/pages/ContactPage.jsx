import { useState } from "react";
import ContactForm from "../components/ContactForm";
import FAQItem from "../components/FAQItem";
import Footer from "../components/Footer";

const ContactPage = ({ setPage }) => {
    const faqs = [
        {
            q: "Do you charge for loan guidance?",
            a: "No. Our loan guidance and processing support is free of cost to the customer. (Any bank/NBFC processing fees are as per their official norms.)",
            open: true,
        },
        {
            q: "Which loans do you help with?",
            a: [
                "Home loans",
                "Personal loans",
                "Business loans",
                "Vehicle loans",
                "Loan Against Property",
                "MSME / Mudra loans",
            ],
        },
        {
            q: "How long does loan approval take?",
            a: "Timelines depend on eligibility, documents, and the bank/NBFC. However, we speed up the process through proper document scrutiny and follow-ups.",
        },
        {
            q: "Can you help if my loan was rejected earlier?",
            a: "Yes. In many cases, rejection happens due to wrong bank selection, incorrect documentation, or eligibility mismatch. We review your case and suggest the best possible route.",
        },
        {
            q: "Do you provide loans from all banks?",
            a: "We facilitate loans through leading banks and NBFCs via our partner network. Availability depends on the customer’s eligibility, loan type, and bank policy at the time.",
        },
        {
            q: "Can I apply without visiting your office?",
            a: "Yes. You can contact us on WhatsApp and share the basic details. For final documentation and signing, physical verification may be required depending on the bank/NBFC.",
        },
        {
            q: "What documents are generally required?",
            a: [
                "Aadhaar + PAN",
                "Salary slips / bank statements",
                "Business proof (for business loans)",
                "Address proof",
                "Property documents (for home loan/LAP)",
            ],
        },
        {
            q: "Do you provide mutual fund SIP guidance?",
            a: "Yes. We help customers start SIPs and long-term investments through NJ Wealth based on their goals and risk profile.",
        },
        {
            q: "Do you guarantee returns in mutual funds?",
            a: "No. Mutual fund returns are market-linked. Disclaimer: Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.",
        },
        {
            q: "Do you help with insurance claims?",
            a: "We provide guidance and support during claim processes, renewals, and policy servicing.",
        },
        {
            q: "What types of insurance do you provide?",
            a: [
                "Life insurance",
                "Health insurance / mediclaim",
                "General insurance",
                "Vehicle insurance",
            ],
        },
        {
            q: "Where is your office located?",
            a: "Moidus Tower, 2nd Floor\nPost Office Junction, Thoppumpady\nKochi – 682005\nLandmark: Above Muthoot FinCorp",
        },
    ];

    const [openFaqIndex, setOpenFaqIndex] = useState(faqs.findIndex((faq) => faq.open));

    return (
        <div className="page-enter">
            {/* ═══ HERO ═══ */}
            <div
                className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center"
                style={{ backgroundImage: "url('/contactUsBg.png')", minHeight: '571px' }}
            >
                <h1 className="text-[#f8fafc] text-center text-[64px] font-inter font-bold leading-[102px]">Contact Us</h1>
                {/* Gold gradient line */}
                <div
                    className="absolute bottom-0 right-0 h-[80px]"
                    style={{
                        width: '693px',
                        background: 'linear-gradient(90deg, #F8BA17 0%, rgba(248, 186, 23, 0) 100%)',
                        clipPath: 'polygon(80px 0, 100% 0, 100% 100%, 0 100%)',
                    }}
                />
            </div>

            {/* ═══ CONTACT CONTENT ═══ */}
            <div style={{ marginInline: "clamp(1.25rem, 11.765vw - 1.618rem, 12.5rem)" }}>
                <ContactForm />

                {/* Address grid */}
                <div className="flex flex-col min-[1100px]:flex-row justify-between gap-10 mt-[80px]">
                    <div className="w-[272px] flex flex-col gap-6">
                        <h2 className="text-[#0f172b] text-[24px] font-inter font-semibold leading-[36px] m-0">Office Address</h2>
                        <div className="text-[#314158] text-[18px] font-inter font-normal leading-[32px]">
                            Vivian Business Solutions<br />
                            Moidus Tower, 2nd Floor<br />
                            Post Office Junction, Thoppumpady<br />
                            Kochi – 682005<br />
                            Landmark: Above Muthoot FinCorp
                        </div>
                    </div>
                    <div className="w-[272px] flex flex-col gap-6">
                        <h2 className="text-[#0f172b] text-[24px] font-inter font-semibold leading-[36px] m-0">Call / WhatsApp</h2>
                        <div className="text-[#314158] text-[18px] font-inter font-normal leading-[32px]">
                            <a href="tel:9567582102" className="text-[#314158] no-underline hover:text-[#f7ba18]">9567582102</a><br />
                            <a href="tel:9567582198" className="text-[#314158] no-underline hover:text-[#f7ba18]">9567582198</a><br />
                            <a href="tel:9895660900" className="text-[#314158] no-underline hover:text-[#f7ba18]">9895660900</a>
                        </div>
                    </div>
                    <div className="w-[272px] flex flex-col gap-6">
                        <h2 className="text-[#0f172b] text-[24px] font-inter font-semibold leading-[36px] m-0">Email</h2>
                        <div className="text-[#314158] text-[18px] font-inter font-normal leading-[32px]">
                            <a href="mailto:Vivianbusinesssolutions@gmail.com" className="text-[#314158] no-underline hover:text-[#f7ba18]">Vivianbusinesssolutions@gmail.com</a><br />
                            <a href="mailto:Loanaidkochi@gmail.com" className="text-[#314158] no-underline hover:text-[#f7ba18]">Loanaidkochi@gmail.com</a>
                        </div>
                    </div>
                </div>

                {/* Google Map */}
                <iframe
                    title="Vivian Business Solutions Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.978152711064!2d76.25585741133786!3d9.935775574094043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b086d70943b9511%3A0x9eac52a2dac0327a!2sMoidus%20Tower%2C%20P%20T%20Jacob%20Rd%2C%20Thoppumpady%2C%20Kochi%2C%20Kerala%20682005!5e0!3m2!1sen!2sin!4v1772092428792!5m2!1sen!2sin"
                    className="w-full h-[418px] mt-[36px]"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            {/* ═══ FAQ ═══ */}
            <section className="flex justify-center py-12 md:py-16 lg:py-20 px-4 sm:px-8">
                <div className="w-full max-w-[1005px] flex flex-col gap-6 md:gap-10">
                    <h2 className="font-inter text-[#0f172b] text-[40px] font-semibold leading-[56px] text-center">
                        Frequently Asked Questions
                    </h2>
                    <div>
                        {faqs.map(({ q, a }, index) => (
                            <FAQItem
                                key={q}
                                q={q}
                                a={a}
                                open={openFaqIndex === index}
                                onToggle={() => setOpenFaqIndex((current) => (current === index ? -1 : index))}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer setPage={setPage} />
        </div>
    );
};

export default ContactPage;
