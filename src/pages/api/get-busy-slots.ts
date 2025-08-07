import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { date } = req.query;

    if (!date || typeof date !== "string") {
        return res.status(400).json({ message: "Date parameter is required." });
    }

    console.log(`[API] Запит зайнятих слотів на дату: ${date}`);

    try {
        const auth = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        );

        auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

        const calendar = google.calendar({ version: "v3", auth });

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const { data } = await calendar.freebusy.query({
            requestBody: {
                timeMin: startOfDay.toISOString(),
                timeMax: endOfDay.toISOString(),
                timeZone: "Europe/Kyiv",
                items: [{ id: "primary" }],
            },
        });

        const busySlots = data.calendars?.primary.busy ?? [];
        console.log("[API] Успішно отримано зайняті слоти:", busySlots);
        return res.status(200).json({ busy: busySlots });

    } catch (error: unknown) {
        // ДЕТАЛЬНЕ ЛОГУВАННЯ ПОМИЛКИ
        console.error("[API] ПОМИЛКА при отриманні слотів з Google:", JSON.stringify(error, null, 2));

        interface GoogleApiError {
            response?: {
                data?: {
                    error?: {
                        message?: string;
                    };
                };
            };
        }

        const err = error as GoogleApiError;
        const errorMessage =
            typeof error === "object" && error !== null && "response" in err
                ? err.response?.data?.error?.message || "Internal Server Error"
                : "Internal Server Error";
        return res.status(500).json({ message: "Помилка на сервері при отриманні даних з Google Calendar.", details: errorMessage });
    }
}