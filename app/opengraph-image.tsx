import { ItChip } from "@/components/it-chip";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function OGImage() {
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
            IT-Sektionen
          </p>
          <p style={{ margin: 0, padding: 0, fontFamily: "Poppins Regular" }}>
            Sektionen för alla
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
