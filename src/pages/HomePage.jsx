import { useEffect, useRef, useCallback } from "react";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

/* ─── Gold Particle System ─── */
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }
    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.3 - 0.2;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.fadeDir = Math.random() > 0.5 ? 1 : -1;
    }
    update(mouse, MOUSE_RADIUS) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            this.x += (dx / dist) * force * 3;
            this.y += (dy / dist) * force * 3;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.fadeDir * 0.005;
        if (this.opacity <= 0.1 || this.opacity >= 0.8) this.fadeDir *= -1;
        if (this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height) {
            this.reset();
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 186, 23, ${this.opacity})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 186, 23, ${this.opacity * 0.2})`;
        ctx.fill();
    }
}

/* ─── 3D Tilt Handler ─── */
const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.transition = "transform 0.1s ease";
};
const handleTiltReset = (e) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.transition = "transform 0.4s ease";
};

/* ─── Animated Mission Section ─── */
const AnimatedMissionSection = () => {
    const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1, rootMargin: "0px 0px -100px 0px" });

    const missionCombinedClipPath = 'polygon(0% 50%, 100% 0%, 100% 50%, 0% 100%)';

    return (
        <div
            ref={targetRef}
            className={`w-full relative flex flex-col items-center justify-center transition-all duration-[1200ms] ease-out z-[5] -mt-[8px] md:mt-[clamp(0px,4vw,70px)] pb-[clamp(12px,2vw,20px)] ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"
                }`}
        >
            <div className="relative w-full max-w-[1820px] mx-auto pointer-events-none">
                <div
                    className="relative w-full aspect-[1920/1920]"
                    style={{
                        clipPath: missionCombinedClipPath,
                        backgroundImage: "linear-gradient(90deg, transparent 0 calc(50% - 375px), #0D2446 calc(50% - 375px) calc(50% + 375px), transparent calc(50% + 375px) 100%), linear-gradient(0deg, #0E2446 0%, rgba(37, 132, 198, 0) 100%)",
                        backgroundSize: '100% 100%, 100% 100%',
                        backgroundPosition: 'center center, center center',
                        backgroundRepeat: 'no-repeat, no-repeat'
                    }}
                />

                <img
                    src="/ourmission.png"
                    alt="Our Mission"
                    className={`absolute left-1/2 top-[72%] md:top-[70%] -translate-x-1/2 -translate-y-1/2 z-[4] w-[clamp(230px,34vw,750px)] h-auto transition-all duration-[900ms] ease-out ${isIntersecting ? "opacity-100 scale-100" : "opacity-0 scale-75 translate-y-8"}`}
                />

                <div
                    className="absolute inset-0 z-[6]"
                    style={{
                        clipPath: 'polygon(0% 100%, 100% 50%, 100% 100%)',
                        backgroundColor: '#FFFFFF'
                    }}
                />

                <div className="absolute left-1/2 top-[52%] md:top-[44%] -translate-x-1/2 -translate-y-1/2 z-[10] w-[calc(100%-32px)] md:w-[min(621px,90vw)] px-2 md:px-4">
                    <div className="w-full flex flex-col items-center gap-3 md:gap-6">
                        <div className="text-center text-[#F8FAFC] text-[20px] md:text-[clamp(26px,3vw,40px)] font-inter font-semibold leading-7 md:leading-[1.35] break-words">Our Mission</div>
                        <div className="self-stretch text-center text-[#F8FAFC] text-[16px] md:text-[clamp(14px,1.2vw,18px)] font-inter font-normal leading-[26px] md:leading-[1.8] tracking-[0.2px] md:tracking-[1px] break-words">
                            To simplify financial products for everyday people and provide trustworthy guidance with transparency, speed, and professional support.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HomePage = ({ setPage, openModal }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const MOUSE_RADIUS = 100;

    // Intersection observer for CTA banner animation
    const { targetRef: ctaRef, isIntersecting: ctaVisible } = useIntersectionObserver({ threshold: 0.5 });
    // Intersection observer for affiliates animation
    const { targetRef: affiliatesRef, isIntersecting: affiliatesVisible } = useIntersectionObserver({ threshold: 0.5 });

    const initParticles = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const wrapper = canvas.parentElement;
        canvas.width = wrapper.offsetWidth;
        canvas.height = wrapper.offsetHeight;
        const ctx = canvas.getContext("2d");
        const count = Math.floor((canvas.width * canvas.height) / 5000);
        const particles = [];
        for (let i = 0; i < count; i++) particles.push(new Particle(canvas));
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update(mouseRef.current, MOUSE_RADIUS);
                p.draw(ctx);
            });
            animationRef.current = requestAnimationFrame(animate);
        };
        animate();
    }, []);

    useEffect(() => {
        initParticles();
        const handleResize = () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            initParticles();
        };
        window.addEventListener("resize", handleResize);
        const canvas = canvasRef.current;
        const handleMouse = (e) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const handleLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };
        if (canvas) {
            canvas.addEventListener("mousemove", handleMouse);
            canvas.addEventListener("mouseleave", handleLeave);
        }
        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (canvas) {
                canvas.removeEventListener("mousemove", handleMouse);
                canvas.removeEventListener("mouseleave", handleLeave);
            }
        };
    }, [initParticles]);

    const bankLogos = [
        ["SBI", "/SBI.png"],
        ["Axis Bank", "/AxisBank.png"],
        ["ICICI", "/ICICI.png"],
        ["Kotak", "/Kotak.png"],
        ["Federal Bank", "/FederalBank.png"],
        ["IDFC FIRST", "/IDFC.png"],
        ["HDFC", "/HDFC.png"],
        ["South Indian Bank", "/SouthIndianBank.png"],
    ];

    return (
        <div className="w-full max-w-[1940px] mx-auto mt-[clamp(72px,8vw,105px)] flex flex-col relative overflow-hidden bg-white page-enter">
            <div className="relative w-full overflow-visible min-h-[620px] md:min-h-[clamp(760px,70vw,900px)] z-[2]">
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-[2] pointer-events-none md:pointer-events-auto" />

                {/* Who We Are Background */}
                <div className="hidden md:block absolute top-[380px] sm:top-[240px] md:top-[clamp(630px,20vw,580px)] left-1/2 -translate-x-1/2 w-[clamp(250px,78vw,750px)] aspect-[750/1397] z-[1] pointer-events-none">
                    <img src="/whowearebg3.png" alt="Who We Are Background" className="w-full h-full block object-cover" />
                </div>

                {/* Banner */}
                <div className="relative z-[4] mb-[80px]" style={{ marginInline: 'clamp(1.25rem, 24.837vw - 4.804rem, 25rem)' }}>
                    <h1 className="w-full text-[#0f172a] text-center text-[clamp(32px,4.2vw,64px)] font-inter font-semibold leading-[clamp(48px,7vw,102px)] md:whitespace-nowrap">
                        Financial Solutions.<br className="md:hidden" /> Simplified.
                    </h1>
                    <h2 className="text-[#334155] text-center text-[clamp(22px,2.8vw,40px)] mt-4 font-inter font-semibold leading-[1.4]">
                        We help individuals and businesses with Loans, Mutual Funds &
                        Insurance with expert guidance, strong back-office support, and
                        faster coordination with banks and NBFCs.
                    </h2>
                    <div className="flex items-center justify-center gap-5 mt-8">
                        <WhatsAppButton />
                        <button
                            onClick={() => setPage('contact')}
                            className="flex items-center justify-center px-[17px] rounded-full border-none h-[56px] text-[16px] font-semibold bg-[#0d2446] text-white hover:scale-105 cursor-pointer transition-transform"
                        >
                            Visit Our Office
                        </button>
                    </div>
                </div>

                {/* Logo and Coin Section */}
                <div className="relative flex justify-center items-center mx-auto z-[5] perspective-[1000px]">
                    <img
                        src="/yellowLine.png"
                        alt=""
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[56%] md:-translate-y-[60%] w-[640px] sm:w-[820px] md:w-[clamp(900px,120vw,1920px)] max-w-none h-auto z-[0] pointer-events-none select-none"
                    />
                    <img src="/Logo.png" alt="VA logo section" className="relative z-[5] block w-[clamp(250px,78vw,750px)] h-auto mx-auto" />
                    {/* Coin Flip */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[84px] h-[84px] sm:w-[clamp(130px,16vw,250px)] sm:h-[clamp(130px,16vw,250px)] z-10 block">
                        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d', animation: 'coinFlip 3s ease-in-out infinite' }}>
                            <img
                                src="/coin_front.png"
                                className="absolute top-0 left-0 w-full h-full rounded-full overflow-hidden"
                                style={{ backfaceVisibility: 'hidden', filter: 'drop-shadow(5.5px 4.95px 15.96px #754a00a6) drop-shadow(20.91px 20.36px 29.17px #754a008f) drop-shadow(47.33px 46.23px 39.62px #754a0054) drop-shadow(83.65px 82.55px 46.78px #754a001a) drop-shadow(130.97px 128.77px 51.18px #754a0003)' }}
                            />
                            <img
                                src="/coin_back.png"
                                className="absolute top-0 left-0 w-full h-full rounded-full overflow-hidden"
                                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', filter: 'drop-shadow(5.5px 4.95px 15.96px #754a00a6) drop-shadow(20.91px 20.36px 29.17px #754a008f) drop-shadow(47.33px 46.23px 39.62px #754a0054) drop-shadow(83.65px 82.55px 46.78px #754a001a) drop-shadow(130.97px 128.77px 51.18px #754a0003)' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Who We Are */}
            <div className="flex items-start justify-center mt-[8px] md:mt-[clamp(-130px,-8vw,-90px)] pt-[24px] md:pt-[clamp(120px,14vw,200px)] pb-[24px] md:pb-[clamp(120px,16vw,280px)] relative z-[4]">
                <div className="mx-auto w-[min(350px,calc(100vw-40px))] md:w-[clamp(320px,78vw,621px)] max-w-[621px] flex flex-col items-center gap-[16px] md:gap-[24px] relative z-[2] px-[16px] py-[16px] md:px-0 md:py-0 bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0] md:bg-none">
                    <div className="self-stretch text-center text-[#0F172B] text-[20px] md:text-[clamp(26px,3vw,40px)] font-inter font-semibold leading-[28px] md:leading-[1.35] break-words">
                        Who We Are
                    </div>
                    <div className="self-stretch text-center text-[#314158] text-[16px] md:text-[clamp(14px,1.2vw,18px)] font-inter font-normal leading-[26px] md:leading-[1.8] tracking-[0px] md:tracking-[1px] break-words">
                        Vivian Business Solutions is a financial solutions company based in Kochi. We assist customers with loan processing, mutual fund investments, and insurance services through trusted partners and professional support.<br />We act as a structured coordination and advisory support system, ensuring customers receive the right financial product based on eligibility and requirements.
                    </div>
                </div>
            </div>

            {/* Floating Money */}
            <div className="relative w-full h-0 hidden md:block">
                <div className="absolute left-[-8%] sm:left-[5%] xl:left-[200px] top-[-110px] md:top-[-170px] w-[493px] h-[315px] z-0 pointer-events-none float-slow scale-[0.28] sm:scale-50 md:scale-75 xl:scale-100 origin-top-left">
                    <div className="absolute w-[493px] h-[315px] left-0 top-[-250px] blur-[7px] overflow-hidden">
                        <img src="/leftmoney_new.png" className="absolute h-[298.5%] w-[127.23%] left-[-18.48%] top-0 max-w-none block" />
                    </div>
                </div>
                <div className="absolute right-[-18%] sm:right-[5%] xl:right-0 top-[20px] md:top-[10px] w-[736px] h-[867px] z-[7] pointer-events-none float-delayed scale-[0.24] sm:scale-50 md:scale-75 xl:scale-100 origin-top-right">
                    <div className="absolute w-[736px] h-[492px] left-0 top-[-85px] overflow-hidden">
                        <img src="/rightmoney_main.png" className="absolute h-[224.48%] w-[100.04%] left-[-0.02%] top-[-72.3%] max-w-none block" />
                    </div>
                    <div className="absolute w-[207px] h-[272px] left-[371px] top-[-460px] overflow-hidden">
                        <img src="/rightmoney_coin.png" className="absolute h-[496.81%] w-[979.23%] left-[-579.71%] top-[-0.06%] max-w-none block" />
                    </div>
                </div>
            </div>

            {/* Our Mission */}
            <div className="relative w-full overflow-visible flex flex-col items-center justify-center mt-[12px] md:-mt-[60px] z-[2]">

                <div className="w-[min(350px,calc(100vw-40px))] bg-[#0D2446] px-[16px] pt-[16px] pb-[12px] flex flex-col items-center gap-[16px] md:hidden">
                    <div className="self-stretch text-center text-[#F8FAFC] text-[20px] font-inter font-semibold leading-[28px]">Our Mission</div>
                    <div className="self-stretch text-center text-[#F8FAFC] text-[16px] font-inter font-normal leading-[26px]">
                        To simplify financial products for everyday people and provide trustworthy guidance with transparency, speed, and professional support.
                    </div>
                    <img src="/ourmission.png" alt="Our Mission" className="w-full h-auto max-h-[295px] object-contain" />
                </div>

                {/* Dark Navy shape & Text (Animated) */}
                <div className="hidden md:block w-full">
                    <AnimatedMissionSection />
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="relative mb-0 mt-[40px] md:mt-[clamp(-110px,-9vw,-210px)] pt-[24px] md:pt-[clamp(32px,6vw,80px)] w-[min(350px,calc(100vw-40px))] md:w-[min(750px,92vw)] mx-auto overflow-visible">
                <div className="absolute right-[-22%] md:right-[-28%] top-[clamp(90px,16vw,210px)] w-[clamp(180px,28vw,360px)] pointer-events-none z-0 why-bg-anim">
                    <img src="/whychooseusbg.png" alt="" aria-hidden="true" className="w-full h-auto block opacity-90" />
                </div>

                <h2 className="relative z-[2] text-[#0f172b] text-center text-[clamp(26px,3vw,40px)] font-inter font-semibold leading-[1.35] mb-[40px]">Why Choose Us</h2>
                <div className="relative z-[2] grid grid-cols-1 xl:grid-cols-2 gap-[20px]">
                    {[
                        { title: "Strong Operations Support", text: "We scrutinize documents, check eligibility thoroughly, and ensure accurate submissions to reduce rejection chances and delays." },
                        { title: "Faster Follow-up", text: "We coordinate directly with banks and NBFCs to speed up approvals and disbursement processes." },
                        { title: "Free Loan Guidance", text: "Loan guidance and processing support are provided free of cost to customers. (Bank/NBFC processing fees apply as per their norms.)" },
                        { title: "Transparent Process", text: "No false promises. No hidden charges. Clear communication at every stage." },
                    ].map(item => (
                        <div key={item.title} className="bg-[#0d2446] flex flex-col items-start gap-[12px] p-[clamp(20px,3vw,40px)] min-h-[clamp(220px,26vw,320px)] transition-transform duration-300 ease-in-out hover:scale-[1.05]" style={{ boxShadow: '0px 8px 0px 0px #f8ba17' }}>
                            <h3 className="text-[#F8FAFC] text-[clamp(22px,2.2vw,32px)] font-inter font-semibold leading-[1.35] m-0 text-left">{item.title}</h3>
                            <p className="text-[#E2E8F0] text-[clamp(14px,1.2vw,18px)] font-inter font-normal leading-[1.8] m-0 text-left">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Services */}
            <div className="mb-20 mt-[clamp(24px,4vw,56px)]" style={{ marginInline: 'clamp(1rem, 6vw, 8rem)' }}>
                <h2 className="text-[#0f172b] text-center text-[clamp(26px,3vw,40px)] font-inter font-semibold leading-[1.35] mb-[40px]">Services</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px]">
                    {[
                        {
                            bg: "bg-[#e2e8f0]",
                            title: "Loans (via Loan Aid)",
                            desc1: "Home Loan | Business Loan | Personal Loan | Vehicle Loan | Loan Against Property | MSME / Mudra Loans",
                            desc2: "Structured loan assistance with eligibility verification, documentation review, and coordinated bank processing.",
                            img: "/BankImg.png"
                        },
                        {
                            bg: "bg-[#dbeafe]",
                            title: "Mutual Funds (via NJ Wealth)",
                            desc1: "SIP | Lump Sum | Goal-Based Investing | Portfolio Review",
                            desc2: "Goal-oriented investment planning aligned with long-term wealth creation strategies.",
                            img: "/MoneyImg.png"
                        },
                        {
                            bg: "bg-[#dff2fe]",
                            title: "Insurance",
                            desc1: "Life Insurance | Health Insurance | General Insurance | Vehicle Insurance",
                            desc2: "Comprehensive insurance solutions for individuals and businesses with policy guidance and servicing support.",
                            img: "/InsuranceImg.png"
                        }
                    ].map((item, idx) => (
                        <div key={item.title} onMouseMove={handleTilt} onMouseLeave={handleTiltReset} onClick={() => setPage('services')} className={`${item.bg} flex flex-col items-start justify-between min-h-[clamp(520px,72vw,850px)] p-[clamp(20px,3vw,40px)] overflow-hidden tilt-card cursor-pointer`}>
                            <div className="flex flex-col items-start gap-[24px] w-full text-left">
                                <h2 className="text-[#0f172b] text-[clamp(22px,2.2vw,32px)] font-inter font-semibold leading-[1.35] m-0">{item.title}</h2>
                                <p className="text-[#0f172b] text-[clamp(14px,1.2vw,18px)] font-inter font-normal leading-[1.8] m-0">{item.desc1}</p>
                                <p className="text-[#0d2446] text-[clamp(14px,1.2vw,18px)] font-inter font-normal leading-[1.8] m-0">{item.desc2}</p>
                            </div>
                            <div className="w-full flex justify-center">
                                <img src={item.img} alt={item.title} className="w-full h-auto transition-transform duration-300 hover:scale-[0.9]" style={{ filter: 'drop-shadow(15.47px 15.75px 48.66px rgba(38, 32, 63, 0.64)) drop-shadow(61.31px 63.56px 70.31px rgba(38, 32, 63, 0.55)) drop-shadow(138.09px 142.88px 70.31px rgba(38, 32, 63, 0.32)) drop-shadow(245.53px 253.69px 70.31px rgba(38, 32, 63, 0.1)) drop-shadow(383.63px 396.56px 70.31px rgba(38, 32, 63, 0.01))' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Banks & NBFC Partners */}
            <div className="py-[40px] xl:py-[80px] flex flex-col items-center px-4 md:px-8">
                <h2 className="text-[#0f172b] text-[20px] md:text-[clamp(26px,3vw,40px)] font-inter font-semibold leading-[28px] md:leading-[1.35] text-center">Banks & NBFC Partners</h2>
                <p className="text-[#314158] text-[14px] md:text-[clamp(14px,1.2vw,18px)] font-inter font-normal leading-[22px] md:leading-[1.8] text-center">
                    Loans facilitated through leading Banks & NBFCs including:
                </p>
                <div
                    ref={affiliatesRef}
                    className="grid grid-cols-4 justify-center transition-all duration-[1500ms] ease-in-out mt-6 md:mt-8"
                    style={{
                        gap: affiliatesVisible ? 'clamp(8px, 2vw, 20px)' : 'clamp(12px, 3vw, 36px)',
                        marginInline: affiliatesVisible ? 'clamp(8px, 4vw, 80px)' : 'clamp(4px, 2vw, 40px)',
                    }}
                >
                    {bankLogos.map(([name, logo]) => (
                        <div key={name} className="group w-[clamp(68px,16vw,200px)] h-[clamp(68px,16vw,200px)] bg-[#e2e8f0] rounded-full flex flex-col items-center justify-center transition-transform duration-300 ease-out hover:scale-110">
                            <img src={logo} alt={name} className="max-w-[clamp(44px,10vw,140px)] object-contain transition-transform duration-300 ease-out group-hover:scale-95" />
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div
                ref={ctaRef}
                className="flex flex-col items-center justify-center text-center bg-[#fbdd8b] min-h-[clamp(360px,45vw,624px)] mb-[80px] transition-[margin-inline] duration-[1200ms] ease-in-out px-4"
                style={{ marginInline: ctaVisible ? 'clamp(8px, 6vw, 120px)' : '0' }}
            >
                <h1 className="text-[#0f172b] text-[clamp(30px,4vw,64px)] font-inter font-bold leading-[1.35] mt-0 mb-0">Need a loan or financial guidance?</h1>
                <p className="text-[#314158] text-[clamp(14px,1.2vw,18px)] font-inter font-normal leading-[1.8]">Call or WhatsApp us today for a free eligibility check.</p>
                <div className="flex items-center justify-center gap-5 mt-4">
                    <button className="flex items-center justify-center pl-[24px] pr-[4px] py-[4px] rounded-full border-none bg-[#0d2446] cursor-pointer hover:scale-105 transition-transform" style={{ boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.30)' }}>
                        <div className="text-white text-[16px] font-inter font-semibold leading-[24px] whitespace-nowrap">Call Now</div>
                        <img src="/phoneCallLoop.gif" alt="Phone Call" className="w-[48px] h-[48px] ml-[8px]" />
                    </button>
                </div>
            </div>

            <Footer setPage={setPage} />
        </div>
    );
};

export default HomePage;
