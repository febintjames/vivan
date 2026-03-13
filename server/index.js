import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const loadEnvFile = () => {
    const envPath = resolve(process.cwd(), ".env");

    if (!existsSync(envPath)) {
        return;
    }

    const content = readFileSync(envPath, "utf8");

    for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith("#")) {
            continue;
        }

        const separatorIndex = trimmed.indexOf("=");

        if (separatorIndex === -1) {
            continue;
        }

        const key = trimmed.slice(0, separatorIndex).trim();
        const value = trimmed.slice(separatorIndex + 1).trim();

        if (key && process.env[key] === undefined) {
            process.env[key] = value;
        }
    }
};

loadEnvFile();

const PORT = Number(process.env.PORT || 3001);
const API_VERSION = process.env.WHATSAPP_API_VERSION || "v23.0";
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const RECIPIENT_NUMBER = process.env.WHATSAPP_TO_NUMBER || "917902871746";

const sendJson = (res, statusCode, payload) => {
    res.writeHead(statusCode, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end(JSON.stringify(payload));
};

const readJsonBody = (req) =>
    new Promise((resolve, reject) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch {
                reject(new Error("Invalid JSON body."));
            }
        });

        req.on("error", reject);
    });

const normalizeValue = (value) => (value ? String(value) : "-");

const buildContactMessage = (data) => {
    const incomeLabel =
        data.employmentType === "salaried"
            ? "Salary Amount"
            : data.employmentType === "selfEmployed"
                ? "Monthly Income"
                : "Years in Operation";

    const incomeValue =
        data.employmentType === "salaried"
            ? data.salaryAmount
            : data.employmentType === "selfEmployed"
                ? data.monthlyIncome
                : data.yearsInOperation;

    return [
        "Contact Form Submission",
        `Full Name: ${normalizeValue(data.fullName)}`,
        `Mobile: ${normalizeValue(data.mobile)}`,
        `Email: ${normalizeValue(data.email)}`,
        `Loan Type: ${normalizeValue(data.loanType)}`,
        `Loan Amount: ${normalizeValue(data.loanAmount)}`,
        `Employment Type: ${normalizeValue(data.employmentType)}`,
        `${incomeLabel}: ${normalizeValue(incomeValue)}`,
    ].join("\n");
};

const buildEligibilityMessage = (data) => {
    const detailLabel =
        data.employmentType === "salaried"
            ? "Salary Amount"
            : data.employmentType === "selfEmployed"
                ? "Monthly Income"
                : "Years in Operation";

    const detailValue =
        data.employmentType === "salaried"
            ? data.salaryAmount
            : data.employmentType === "selfEmployed"
                ? data.monthlyIncome
                : data.yearsInOperation;

    return [
        "Eligibility Form Submission",
        `Name: ${normalizeValue(data.name)}`,
        `Phone: ${normalizeValue(data.phone)}`,
        `Employment Type: ${normalizeValue(data.employmentType)}`,
        `${detailLabel}: ${normalizeValue(detailValue)}`,
        `Amount Needed: ${normalizeValue(data.amountNeeded)}`,
    ].join("\n");
};

const sendWhatsAppTextMessage = async (message) => {
    if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
        throw new Error("Missing WhatsApp API server configuration.");
    }

    const response = await fetch(
        `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: RECIPIENT_NUMBER,
                type: "text",
                text: {
                    preview_url: false,
                    body: message,
                },
            }),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        const apiError = result?.error?.message || "WhatsApp API request failed.";
        throw new Error(apiError);
    }

    return result;
};

const server = createServer(async (req, res) => {
    if (req.method === "OPTIONS") {
        sendJson(res, 204, {});
        return;
    }

    if (req.method !== "POST") {
        sendJson(res, 404, { error: "Not found." });
        return;
    }

    try {
        const body = await readJsonBody(req);

        if (req.url === "/api/forms/contact") {
            await sendWhatsAppTextMessage(buildContactMessage(body));
            sendJson(res, 200, { ok: true });
            return;
        }

        if (req.url === "/api/forms/eligibility") {
            await sendWhatsAppTextMessage(buildEligibilityMessage(body));
            sendJson(res, 200, { ok: true });
            return;
        }

        sendJson(res, 404, { error: "Not found." });
    } catch (error) {
        sendJson(res, 500, {
            error: error instanceof Error ? error.message : "Unexpected server error.",
        });
    }
});

server.listen(PORT, () => {
    console.log(`WhatsApp form server listening on http://localhost:${PORT}`);
});
