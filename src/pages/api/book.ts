import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";

// ✅ НОВА ФУНКЦІЯ: для відправки сповіщення в Telegram
async function sendTelegramNotification(message: string) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.error("Telegram bot token or chat ID is not configured.");
        return;
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "HTML",
            }),
        });
    } catch (error) {
        console.error("Failed to send Telegram notification:", error);
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    const { name, phone, dateTime, serviceTitle, duration } = req.body;

    if (!name || !phone || !dateTime || !serviceTitle || !duration) {
        return res.status(400).json({ message: "Будь ласка, заповніть всі поля." });
    }

    const auth = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
    const calendar = google.calendar({ version: "v3", auth });

    const start = new Date(dateTime);
    const end = new Date(start.getTime() + duration * 60000);

    try {
        const { data } = await calendar.events.list({
            calendarId: "primary",
            timeMin: start.toISOString(),
            timeMax: end.toISOString(),
            singleEvents: true,
            orderBy: "startTime",
        });

        if ((data.items ?? []).length > 0) {
            return res.status(409).json({ message: "Цей час вже зайнятий. Оберіть інший." });
        }

        await calendar.events.insert({
            calendarId: "primary",
            requestBody: {
                summary: `${serviceTitle} — ${name}`,
                description: `Клієнт: ${name}\nНомер телефону: ${phone}`,
                start: { dateTime: start.toISOString(), timeZone: "Europe/Kyiv" },
                end: { dateTime: end.toISOString(), timeZone: "Europe/Kyiv" },
            },
        });

        // ✅ НОВИЙ КОД: Формуємо і відправляємо повідомлення в Telegram
        const formattedDate = start.toLocaleDateString("uk-UA");
        const formattedTime = start.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });

        const message = `
        🎉 **НОВИЙ ЗАПИС** 🎉
        
        **Послуга:** ${serviceTitle}
        **Клієнт:** ${name}
        **Телефон:** ${phone}
        **Дата:** ${formattedDate}
        **Час:** ${formattedTime}
        `;

        await sendTelegramNotification(message);

        return res.status(200).json({ message: "Запис успішний!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Помилка при записі." });
    }
}