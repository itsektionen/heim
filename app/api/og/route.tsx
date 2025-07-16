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

  const bgColor = "#F4F4FC";
  const borderColor = "1px solid #E0E0EE";
  const textColor = "#29294B";
  const themeColor = "#cc99ff";

  return new ImageResponse(
    (
      // CONTAINER
      <div
        style={{
          fontSize: 80,
          background: bgColor,
          color: textColor,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        {/* TOP SECTION */}
        <div
          style={{
            height: 50,
            width: "100%",
            borderBottom: borderColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "90%",
              borderLeft: borderColor,
              borderRight: borderColor,
            }}
          />
        </div>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* INSIDE */}
          <div
            style={{
              height: "100%",
              width: "90%",
              borderLeft: borderColor,
              borderRight: borderColor,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              padding: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 0,
                gap: 100,
              }}
            >
              <p
                style={{
                  color: themeColor,
                  margin: 0,
                  padding: 0,
                  fontFamily: "Poppins Bold",
                }}
              >
                {title}
              </p>
              <p
                style={{ margin: 0, padding: 0, fontFamily: "Poppins Regular" }}
              >
                {description}
              </p>
            </div>
            <ItChip primary="#cc99ff" size={175} />
          </div>
        </div>

        <div
          style={{
            height: 50,
            width: "100%",
            borderTop: borderColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "90%",
              borderLeft: borderColor,
              borderRight: borderColor,
              display: "flex",
            }}
          />
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
