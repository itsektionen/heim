import { google } from "googleapis";
import { env } from "process";
import { z } from "zod";
import { procedure, router } from "../trpc";

const scopes = [
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive",
];

export const protocolsRouter = router({
  listYears: procedure.query(async () => {
    return "";
  }),
  listFiles: procedure.input(z.string()).query(async ({ input }) => {
    const auth = new google.auth.GoogleAuth({
      keyFile: "lib/drive/credentials.json",
      scopes,
    });
    const drive = google.drive({
      version: "v3",
      auth,
    });
    await drive.files.list({
      pageSize: 25,
      fields: "nextPageToken, files(id, name, mimeType)",
      q: `'${env.BOARD_MEETINGS_ID}' in parents`,
    });
  }),
});
