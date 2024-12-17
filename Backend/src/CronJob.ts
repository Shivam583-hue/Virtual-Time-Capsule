import cron from "node-cron";
import { db } from "./db";
import { lte } from "drizzle-orm";
import { timeCapsules } from "./schema";

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const releasedCapsules = await db
      .select()
      .from(timeCapsules)
      .where(lte(timeCapsules.releaseDate, now));

    for (const capsule of releasedCapsules) {
      console.log(`Capsule ${capsule.id} is now released!`);
    }
  } catch (error) {
    console.error("Error processing time capsules:", error);
  }
});
