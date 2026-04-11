import { ItChip } from "@/components/it-chip";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Image metadata
const size = {
  width: 1200,
  height: 630,
};

// Image generation
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  const poppinsMedium = await readFile(
    join(process.cwd(), "public/assets/fonts/Poppins-Medium.ttf"),
  );
  const poppinsRegular = await readFile(
    join(process.cwd(), "public/assets/fonts/Poppins-Regular.ttf"),
  );

  const response = new ImageResponse(
    <div
      style={{
        background: "#F4F4FC",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        position: "relative",
      }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          padding: 30,
        }}>
        <p
          style={{
            margin: 0,
            padding: 0,
            color: "#cc99ff",
            fontFamily: "Poppins Bold",
            fontSize: 80,
          }}>
          {title}
        </p>
        <p
          style={{
            margin: 0,
            padding: 0,
            color: "#29294B",
            fontFamily: "Poppins Regular",
            fontSize: 60,
          }}>
          {description}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          transform: "translate(-25%, 25%)",
          display: "flex",
          opacity: 0.15,
        }}>
        <ItChip
          primary="#cc99ff"
          secondary="#cc99ff"
          tertiary="#cc99ff"
          size={1000}
        />
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Poppins Medium",
          data: poppinsMedium,
          style: "normal",
          weight: 400,
        },
        {
          name: "Poppins Regular",
          data: poppinsRegular,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );

  response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}
