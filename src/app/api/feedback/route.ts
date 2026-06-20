import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FEEDBACK_FILE = path.join(process.cwd(), "data", "feedback.json");

interface FeedbackEntry {
  name: string;
  contact: string;
  message: string;
  page: string;
  locale: string;
  timestamp: string;
}

export async function POST(request: Request) {
  try {
    const body: Omit<FeedbackEntry, "timestamp"> = await request.json();

    if (!body.message || body.message.trim().length < 2) {
      return NextResponse.json({ error: "Message too short" }, { status: 400 });
    }

    const entry: FeedbackEntry = {
      ...body,
      name: body.name?.trim() || "Anonymous",
      contact: body.contact?.trim() || "",
      message: body.message.trim().slice(0, 2000),
      page: body.page || "/",
      locale: body.locale || "zh",
      timestamp: new Date().toISOString(),
    };

    // Ensure data directory exists
    const dir = path.dirname(FEEDBACK_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Read existing
    let feedbacks: FeedbackEntry[] = [];
    if (fs.existsSync(FEEDBACK_FILE)) {
      try {
        feedbacks = JSON.parse(fs.readFileSync(FEEDBACK_FILE, "utf-8"));
      } catch {
        feedbacks = [];
      }
    }

    // Append
    feedbacks.push(entry);
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbacks, null, 2), "utf-8");

    // Log to console for visibility
    console.log(`\n📝 [FEEDBACK] ${entry.name} | ${entry.timestamp}`);
    console.log(`   Page: ${entry.page} | Locale: ${entry.locale}`);
    console.log(`   Contact: ${entry.contact || "(none)"}`);
    console.log(`   Message: ${entry.message.slice(0, 150)}...\n`);

    return NextResponse.json({ success: true, id: feedbacks.length - 1 });
  } catch (e) {
    console.error("Feedback error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
