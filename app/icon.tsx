import { ItChip } from "@/components/it-chip";
import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "transparent",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <ItChip
          style={{
            ...size,
          }}
          primary="#ffffff"
          secondary="#ffffff"
          tertiary="#cc99ff"
          quaternary="#403050"
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
