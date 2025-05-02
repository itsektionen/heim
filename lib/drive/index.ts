import { env } from "@/env";
import { google } from "googleapis";

const scopes = [
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive",
];

type FileInfo = {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
  thumbnailLink: string;
  hasThumbnail: boolean;
  webViewLink: string;
};

type YearEntry = {
  year: string;
  id: string;
  files?: FileInfo[];
};

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(
    Buffer.from(env.DRIVE_CREDENTIALS_BASE64, "base64").toString(),
  ),
  scopes,
});
const drive = google.drive({
  version: "v3",
  auth,
});

export const listMeetings = async (folderId: string) => {
  const boardMeetingFiles = await drive.files.list({
    pageSize: 50,
    fields: "nextPageToken, files(id, name, mimeType, createdTime)",
    q: `'${folderId}' in parents`,
  });

  if (!boardMeetingFiles.data.files) {
    throw new Error("No files found.");
  }

  const boardMeetings = await Promise.all(
    boardMeetingFiles.data.files.map(async (yearFolder): Promise<YearEntry> => {
      // Fetch all files within this year folder in a single API call
      const filesInYearFolder = await drive.files.list({
        q: `'${yearFolder.id}' in parents and trashed = false`,
        fields:
          "files(id, name, mimeType, webViewLink, hasThumbnail, thumbnailLink)",
        pageSize: 100, // Adjust as needed
      });

      return {
        year: yearFolder.name!,
        id: yearFolder.id!,
        files: filesInYearFolder.data.files?.map((file) => ({
          name: file.name!,
          mimeType: file.mimeType!,
          webViewLink: file.webViewLink!,
          hasThumbnail: file.hasThumbnail!,
          thumbnailLink: file.thumbnailLink!,
          createdTime: file.createdTime!,
          id: file.id!,
        })),
      };
    }),
  );

  return boardMeetings;
};

export const listBoardMeetings = () => listMeetings(env.BOARD_MEETINGS_ID);
export const listChapterMeetings = () => listMeetings(env.CHAPTER_MEETINGS_ID);

export const listAllMeetings = async () => {
  const boardMeetings = await listBoardMeetings();
  const chapterMeetings = await listChapterMeetings();

  // Create a map to store meetings by year
  const meetingsByYear = new Map<string, YearEntry>();

  // Process board meetings
  for (const meeting of boardMeetings) {
    if (!meetingsByYear.has(meeting.year)) {
      meetingsByYear.set(meeting.year, {
        year: meeting.year,
        id: meeting.id,
        files: [],
      });
    }

    const yearEntry = meetingsByYear.get(meeting.year);
    yearEntry?.files?.push(
      ...meeting.files!.map((file) => ({
        ...file,
        type: "board",
      })),
    );
  }

  // Process chapter meetings
  for (const meeting of chapterMeetings) {
    if (!meetingsByYear.has(meeting.year)) {
      meetingsByYear.set(meeting.year, {
        year: meeting.year,
        id: meeting.id,
        files: [],
      });
    }

    const yearEntry = meetingsByYear.get(meeting.year);
    yearEntry?.files?.push(
      ...meeting.files!.map((file) => ({
        ...file,
        type: "chapter",
      })),
    );
  }

  // Convert map to array
  const result = Array.from(meetingsByYear.values());

  return result;
};
