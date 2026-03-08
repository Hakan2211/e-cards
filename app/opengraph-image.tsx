import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Cardlar - Personalized Digital Greeting Cards";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const playfairData = await fetch(
    "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtY.ttf"
  ).then((res) => res.arrayBuffer());

  const interData = await fetch(
    "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FDFBF7",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top gold accent gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #C9A96E 0%, #E8D5A8 50%, #C9A96E 100%)",
          }}
        />

        {/* Subtle corner decorations */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "40px",
            width: "60px",
            height: "60px",
            borderTop: "2px solid #C9A96E30",
            borderLeft: "2px solid #C9A96E30",
            borderTopLeftRadius: "12px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "40px",
            width: "60px",
            height: "60px",
            borderTop: "2px solid #C9A96E30",
            borderRight: "2px solid #C9A96E30",
            borderTopRightRadius: "12px",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            width: "60px",
            height: "60px",
            borderBottom: "2px solid #C9A96E30",
            borderLeft: "2px solid #C9A96E30",
            borderBottomLeftRadius: "12px",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            width: "60px",
            height: "60px",
            borderBottom: "2px solid #C9A96E30",
            borderRight: "2px solid #C9A96E30",
            borderBottomRightRadius: "12px",
          }}
        />

        {/* Envelope icon */}
        <svg
          width="64"
          height="54"
          viewBox="0 0 24 20"
          fill="none"
          style={{ marginBottom: "20px" }}
        >
          <rect
            x="1"
            y="3"
            width="22"
            height="16"
            rx="2.5"
            stroke="#C9A96E"
            strokeWidth="1.8"
            fill="#C9A96E"
            fillOpacity="0.1"
          />
          <path
            d="M1.5 4.5 L12 12 L22.5 4.5"
            stroke="#C9A96E"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15.5 C12 15.5 9 13 9 11.5 C9 10.5 10 9.8 11 10.5 C11.5 10.9 12 11.5 12 11.5 C12 11.5 12.5 10.9 13 10.5 C14 9.8 15 10.5 15 11.5 C15 13 12 15.5 12 15.5Z"
            fill="#C9A96E"
            fillOpacity="0.6"
          />
        </svg>

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontFamily: "Playfair Display",
            fontWeight: 700,
            color: "#1A1714",
            letterSpacing: "-1px",
            marginBottom: "16px",
          }}
        >
          Cardlar
        </div>

        {/* Slogan */}
        <div
          style={{
            fontSize: "28px",
            fontFamily: "Inter",
            fontWeight: 400,
            color: "#8C8275",
            marginBottom: "24px",
          }}
        >
          Personalized Digital Greeting Cards
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "18px",
            fontFamily: "Inter",
            fontWeight: 400,
            color: "#8C827599",
            maxWidth: "600px",
            textAlign: "center",
            lineHeight: "1.5",
            marginBottom: "32px",
          }}
        >
          Create stunning cards with AI-generated images, voice messages, and music.
        </div>

        {/* Divider + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "#C9A96E60",
            }}
          />
          <div
            style={{
              fontSize: "16px",
              fontFamily: "Inter",
              fontWeight: 500,
              color: "#C9A96E",
              letterSpacing: "2px",
            }}
          >
            cardlar.com
          </div>
          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "#C9A96E60",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Playfair Display",
          data: playfairData,
          style: "normal",
          weight: 700,
        },
        {
          name: "Inter",
          data: interData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
