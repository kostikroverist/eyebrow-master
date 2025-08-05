// pages/api/book.ts
import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, dateTime, serviceTitle, duration } = req.body;

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
    // перевірка чи вільно
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

    // створення події
    await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: `${serviceTitle} — ${name}`,
        description: `Запис на ${serviceTitle}`,
        start: { dateTime: start.toISOString(), timeZone: "Europe/Kyiv" },
        end: { dateTime: end.toISOString(), timeZone: "Europe/Kyiv" },
      },
    });

    return res.status(200).json({ message: "Запис успішний!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Помилка при записі." });
  }
}