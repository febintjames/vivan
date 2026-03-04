const WaIcon = () => (
    <img src="/whatsappLoop.gif" alt="WhatsApp" className="w-10 h-10 rounded-full object-cover shrink-0 wa-pulse" />
);

const WhatsAppButton = ({ label = "WhatsApp Now", className = "" }) => (
    <button
        onClick={() => window.open("https://wa.me/919567582102", "_blank")}
        className={`flex items-center gap-2 pl-6 pr-1 py-1 bg-navy rounded-full border-none cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${className}`}
    >
        <span className="font-inter text-base font-semibold text-white whitespace-nowrap">{label}</span>
        <WaIcon />
    </button>
);

export { WaIcon };
export default WhatsAppButton;
