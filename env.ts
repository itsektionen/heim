import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CHAPTER_MEETINGS_ID: z.string().min(1),
    BOARD_MEETINGS_ID: z.string().min(1),
    DRIVE_CREDENTIALS_BASE64: z.string().base64().min(1),
    STATUTES_URL_EN: z.string().url().min(1),
    STATUTES_URL_SV: z.string().url().min(1),
    RECEPTION_BASE_URL: z.string().url().min(1),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    CHAPTER_MEETINGS_ID: process.env.CHAPTER_MEETINGS_ID,
    BOARD_MEETINGS_ID: process.env.BOARD_MEETINGS_ID,
    DRIVE_CREDENTIALS_BASE64: process.env.DRIVE_CREDENTIALS_BASE64,
    STATUTES_URL_EN: process.env.STATUTES_URL_EN,
    STATUTES_URL_SV: process.env.STATUTES_URL_SV,
    RECEPTION_BASE_URL: process.env.RECEPTION_BASE_URL,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});
