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
    join(process.cwd(), "public/Poppins-Medium.ttf"),
  );
  const poppinsRegular = await readFile(
    join(process.cwd(), "public/Poppins-Regular.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ItChip primary="#cc99ff" size={175} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: 25,
            gap: -45,
          }}
        >
          <p
            style={{
              color: "#cc99ff",
              margin: 0,
              padding: 0,
              fontFamily: "Poppins Bold",
            }}
          >
            {title}
          </p>
          <p style={{ margin: 0, padding: 0, fontFamily: "Poppins Regular" }}>
            {description}
          </p>
        </div>
      </div>
    ),
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
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
}
