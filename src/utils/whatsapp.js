const WHATSAPP_NUMBER = "9197902871746";

const buildWhatsAppUrl = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const openWhatsApp = (message) => {
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
};

export { WHATSAPP_NUMBER, buildWhatsAppUrl, openWhatsApp };
