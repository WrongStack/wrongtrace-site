import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { hero, product } from "@/lib/content";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

/* Dark Pro, flattened to hex because satori cannot resolve OKLCH. */
const BG = "#0C0F16";
const SURFACE = "#11141C";
const LINE = "#262C3B";
const FG = "#E9ECF5";
const MUTED = "#98A1B5";
const FAINT = "#6C7488";
const PRIMARY = "#00C3D1";
const DEL = "#F0616F";

const SANS = "Inter";
const MONO = "JetBrains Mono";

const FONT_DIR = join(process.cwd(), "src", "app", "fonts");

/**
 * Reads a bundled font. A missing file degrades the image to the default face
 * rather than failing the route, so a partial checkout still renders.
 */
async function loadFont(file: string): Promise<Buffer | null> {
  try {
    return await readFile(join(FONT_DIR, file));
  } catch {
    return null;
  }
}

/** Matches the literal weight union accepted by `next/og`'s FontOptions. */
type LoadedFont = {
  name: string;
  data: Buffer;
  weight: 400 | 600 | 700;
  style: "normal";
};

const DIFF_LINES: { kind: "ctx" | "add" | "del"; text: string }[] = [
  { kind: "ctx", text: "func (d *Differ) NodeDelta(a, b *Node) {" },
  { kind: "del", text: "  if a == nil || b == nil {" },
  { kind: "add", text: "  if a == nil {" },
  { kind: "add", text: "    return Delta{Kind: Insert}" },
  { kind: "del", text: "  return diffText(a.Text, b.Text)" },
  { kind: "add", text: "  return diffNodes(a, b)" },
  { kind: "ctx", text: "}" },
];

/** The site's signature churn glyph. */
function ChurnGlyph({ size: pixels, color }: { size: number; color: string }) {
  return (
    <svg width={pixels} height={pixels} viewBox="0 0 24 24" fill="none">
      <path
        d="M3.4 13h3.1l2.1-6 3.2 11 2.1-6h3.4"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function OpengraphImage() {
  const [inter, interSemi, mono, monoBold] = await Promise.all([
    loadFont("Inter-Regular.ttf"),
    loadFont("Inter-SemiBold.ttf"),
    loadFont("JetBrainsMono-Regular.ttf"),
    loadFont("JetBrainsMono-Bold.ttf"),
  ]);

  const fonts: LoadedFont[] = [];
  if (inter) fonts.push({ name: SANS, data: inter, weight: 400, style: "normal" });
  if (interSemi)
    fonts.push({ name: SANS, data: interSemi, weight: 600, style: "normal" });
  if (mono) fonts.push({ name: MONO, data: mono, weight: 400, style: "normal" });
  if (monoBold)
    fonts.push({ name: MONO, data: monoBold, weight: 700, style: "normal" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: BG,
          color: FG,
          fontFamily: SANS,
          padding: 64,
          position: "relative",
        }}
      >
        {/* Blueprint grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(233,236,245,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(233,236,245,0.035) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Masthead */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ChurnGlyph size={26} color={PRIMARY} />
            <span
              style={{
                fontFamily: MONO,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 3,
                color: FG,
              }}
            >
              WRONGTRACE
            </span>
          </div>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 16,
              letterSpacing: 2,
              color: FAINT,
            }}
          >
            AI-NATIVE CODE CHURN &amp; AGENT OBSERVABILITY
          </span>
        </div>

        {/* Headline and the live diff card */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 36,
            marginTop: 52,
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 60,
                lineHeight: 1.06,
                fontWeight: 600,
                letterSpacing: -2,
              }}
            >
              <span>{hero.headline[0]}</span>
              <span>{hero.headline[1]}</span>
            </div>
            <div
              style={{
                marginTop: 24,
                fontSize: 22,
                lineHeight: 1.45,
                color: MUTED,
                maxWidth: 600,
              }}
            >
              Tree-sitter AST diffs, agent telemetry over MCP and IPC, and an
              embedded dashboard — from a single Go binary.
            </div>
            <div
              style={{
                marginTop: 22,
                display: "flex",
                gap: 18,
                fontFamily: MONO,
                fontSize: 14,
                color: FAINT,
              }}
            >
              <span>Single Go binary</span>
              <span>·</span>
              <span>No database to run</span>
              <span>·</span>
              <span>20+ agents auto-discovered</span>
            </div>
          </div>

          {/* Diff card */}
          <div
            style={{
              width: 416,
              display: "flex",
              flexDirection: "column",
              border: `1px solid ${LINE}`,
              borderRadius: 12,
              backgroundColor: SURFACE,
              padding: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 16,
                borderBottom: `1px solid ${LINE}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ChurnGlyph size={15} color={PRIMARY} />
                <span
                  style={{ fontFamily: MONO, fontSize: 14, color: MUTED }}
                >
                  wrongtrace / churn
                </span>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 13, color: FAINT }}>
                AST DELTA
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: 14,
                gap: 4,
              }}
            >
              {DIFF_LINES.map((line, index) => {
                const marker =
                  line.kind === "add" ? "+" : line.kind === "del" ? "−" : " ";
                const tint =
                  line.kind === "add"
                    ? PRIMARY
                    : line.kind === "del"
                      ? DEL
                      : FAINT;
                return (
                  <div
                    key={`${line.text}-${index}`}
                    style={{ display: "flex", gap: 8 }}
                  >
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 13,
                        color: tint,
                        width: 10,
                      }}
                    >
                      {marker}
                    </span>
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 13,
                        color: line.kind === "ctx" ? MUTED : FG,
                      }}
                    >
                      {line.text}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 16,
                paddingTop: 14,
                borderTop: `1px solid ${LINE}`,
                fontFamily: MONO,
                fontSize: 13,
                color: FAINT,
              }}
            >
              <span>internal/ast/diff.go</span>
              <span>
                <span style={{ color: PRIMARY }}>+48</span>{" "}
                <span style={{ color: DEL }}>−12</span>
              </span>
            </div>
          </div>
        </div>

        {/* Install command */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            border: `1px solid ${LINE}`,
            borderRadius: 10,
            backgroundColor: SURFACE,
            padding: "18px 24px",
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: 22, color: PRIMARY }}>
            $
          </span>
          <span style={{ fontFamily: MONO, fontSize: 18, color: FG }}>
            {product.install}
          </span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
