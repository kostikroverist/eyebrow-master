// pages/api/get-busy-range.ts

import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { start, end } = req.query;

    if (typeof start !== "string" || typeof end !== "string") {
        return res.status(400).json({ message: "Invalid query parameters" });
    }

    try {
        const auth = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        );

        auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

        const calendar = google.calendar({ version: "v3", auth });

        const { data } = await calendar.freebusy.query({
            requestBody: {
                timeMin: start,
                timeMax: end,
                timeZone: "Europe/Kyiv",
                items: [{ id: "primary" }],
            },
        });

        const busySlots = data.calendars?.primary.busy ?? [];
        return res.status(200).json({ busy: busySlots });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}
