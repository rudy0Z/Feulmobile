/**
 * App-level chrome switches, read from the URL.
 *
 * `?embed=1`  — strips PhoneFrame + DEV chrome entirely. This is the URL the
 *               portfolio case study embeds. Stripping happens in App.tsx, at
 *               the component level, never with CSS — so the chrome never
 *               mounts and cannot leak into the embed.
 * `?w=320|360|390|430` — sets the phone screen width. 360 is the design
 *               default (a ₹9k Android in daylight); 320 is the compact floor
 *               the no-overflow gate is measured at.
 */

const WIDTHS = [320, 360, 390, 430] as const;
export type ScreenWidth = (typeof WIDTHS)[number];
export const DEFAULT_WIDTH: ScreenWidth = 360;

/** The reference device the phone shell is proportioned from. */
const REF_W = 390;
const REF_H = 844;

export function isEmbed(search?: string): boolean {
  const s = search ?? (typeof window === 'undefined' ? '' : window.location.search);
  return new URLSearchParams(s).get('embed') === '1';
}

export function screenWidth(search?: string): ScreenWidth {
  const s = search ?? (typeof window === 'undefined' ? '' : window.location.search);
  const raw = Number(new URLSearchParams(s).get('w'));
  return (WIDTHS as readonly number[]).includes(raw) ? (raw as ScreenWidth) : DEFAULT_WIDTH;
}

/** Screen height for a width, keeping the reference aspect ratio. */
export function screenHeight(width: number): number {
  return Math.round((width * REF_H) / REF_W);
}
