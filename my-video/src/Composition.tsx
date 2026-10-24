import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gridOffsetY = (frame * 1.5) % 40;
  const floatY = Math.sin(frame / 12) * 12;
  const floatRotate = Math.cos(frame / 15) * 2;

  const titleSpring = spring({ frame, fps, config: { damping: 9, stiffness: 140 } });
  const badgeSpring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 150 } });
  const subSpring = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 10, stiffness: 100 } });

  const scene2Frame = Math.max(0, frame - 90);
  const cardScale = spring({ frame: scene2Frame, fps, config: { damping: 10, stiffness: 120 } });
  const cardSlideX = interpolate(scene2Frame, [0, 25], [-100, 0], { extrapolateRight: "clamp" });

  const scene3Frame = Math.max(0, frame - 270);
  const ctaScale = spring({ frame: scene3Frame, fps, config: { damping: 8, stiffness: 130 } });
  const pulseButton = Math.sin(frame / 5) * 0.05 + 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#f8fafc",
        fontFamily: "'Inter', -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile("voiceover.mp3")} volume={1} />

      <Audio src={staticFile("pop.wav")} startFrom={0} volume={0.6} />

      <Sequence from={20} durationInFrames={30}>
        <Audio src={staticFile("pop.wav")} volume={0.5} />
      </Sequence>

      <Sequence from={90} durationInFrames={30}>
        <Audio src={staticFile("pop.wav")} volume={0.7} />
      </Sequence>

      <Sequence from={270} durationInFrames={30}>
        <Audio src={staticFile("pop.wav")} volume={0.7} />
      </Sequence>

      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "120%",
          top: -40,
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.08) 1.5px, transparent 1.5px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "40px 40px",
          transform: `translateY(${gridOffsetY}px)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, rgba(255, 255, 255, 0) 70%)",
          top: "10%",
          left: "-15%",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 650,
          height: 650,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, rgba(255, 255, 255, 0) 70%)",
          bottom: "5%",
          right: "-15%",
        }}
      />

      {/* --- SCENE 1 --- */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 40, textAlign: "center" }}>
          <div
            style={{
              transform: `scale(${badgeSpring})`,
              backgroundColor: "#10b981",
              color: "#ffffff",
              padding: "12px 28px",
              borderRadius: "50px",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: "uppercase",
              boxShadow: "0 10px 25px rgba(16, 185, 129, 0.35)",
              marginBottom: 24,
            }}
          >
            ⚡ CAMPUS EXCLUSIVE
          </div>

          <div style={{ transform: `scale(${titleSpring})` }}>
            <h1
              style={{
                fontSize: 125,
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
                letterSpacing: -4,
                lineHeight: 1,
              }}
            >
              FLIP<span style={{ color: "#6366f1" }}>it</span>
            </h1>
          </div>

          <p
            style={{
              transform: `scale(${subSpring})`,
              fontSize: 38,
              color: "#475569",
              marginTop: 28,
              fontWeight: 600,
              maxWidth: 850,
              lineHeight: 1.4,
            }}
          >
            Buy & sell old gear instantly—without ever leaving your university.
          </p>
        </AbsoluteFill>
      </Sequence>

      {/* --- SCENE 2 --- */}
      <Sequence from={90} durationInFrames={180}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 40 }}>
          <div
            style={{
              width: "92%",
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              borderRadius: 32,
              padding: 44,
              border: "2px solid rgba(99, 102, 241, 0.4)",
              boxShadow: "0 30px 60px rgba(99, 102, 241, 0.18), 0 0 40px rgba(168, 85, 247, 0.15)",
              transform: `scale(${cardScale}) translateX(${cardSlideX}px) translateY(${floatY}px) rotate(${floatRotate}deg)`,
              backdropFilter: "blur(12px)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                backgroundColor: "#e0e7ff",
                color: "#4338ca",
                padding: "8px 22px",
                borderRadius: 20,
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              📍 LIBRARY & CAFETERIA MEETUPS
            </span>

            <h2 style={{ fontSize: 56, fontWeight: 900, color: "#0f172a", margin: "10px 0", lineHeight: 1.25 }}>
              Safe Campus Trading
            </h2>

            <p style={{ fontSize: 30, color: "#64748b", margin: "12px 0 28px 0", lineHeight: 1.4 }}>
              Exchange textbooks, tech, and dorm items directly with nearby students.
            </p>

            <div
              style={{
                width: "85%",
                height: 650,
                backgroundColor: "#0f172a",
                borderRadius: 28,
                border: "6px solid #334155",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Img
                src={staticFile("screenshot.jpg")}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ display: "flex", gap: 16, marginTop: 30 }}>
              <div style={{ backgroundColor: "#ec4899", color: "white", padding: "12px 22px", borderRadius: 14, fontSize: 24, fontWeight: 800 }}>
                No Shipping
              </div>
              <div style={{ backgroundColor: "#3b82f6", color: "white", padding: "12px 22px", borderRadius: 14, fontSize: 24, fontWeight: 800 }}>
                Student Verified
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* --- SCENE 3 --- */}
      <Sequence from={270} durationInFrames={180}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 40, textAlign: "center" }}>
          <div style={{ transform: `scale(${ctaScale})` }}>
            <h2 style={{ fontSize: 76, fontWeight: 900, color: "#0f172a", margin: 0, letterSpacing: -2 }}>
              Ready to <span style={{ color: "#6366f1" }}>FLIP</span> it?
            </h2>
            <p style={{ fontSize: 34, color: "#64748b", marginTop: 16, fontWeight: 600 }}>
              Join your campus beta network today.
            </p>

            <div
              style={{
                marginTop: 40,
                transform: `scale(${pulseButton})`,
                backgroundColor: "#6366f1",
                color: "#ffffff",
                padding: "24px 60px",
                borderRadius: 50,
                fontSize: 38,
                fontWeight: 900,
                boxShadow: "0 15px 35px rgba(99, 102, 241, 0.45)",
                display: "inline-block",
                border: "3px solid #818cf8",
              }}
            >
              DOWNLOAD FLIPit 🚀
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
