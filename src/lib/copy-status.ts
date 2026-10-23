/**
 * The state a copy button reports to assistive technology.
 *
 * The visual feedback of a copy button is an icon swap, which a screen
 * reader never announces. The same applies to a denied clipboard: the
 * command stays on screen and can still be selected by hand, but nothing
 * tells the visitor that the automatic copy did not happen. Both outcomes
 * are turned into a sentence here so the button can announce them.
 */

export type CopyStatus = "idle" | "copied" | "failed";

/**
 * The text announced in the button's live region.
 *
 * Returns an empty string when there is nothing to report, so the live
 * region stays silent instead of re-announcing the last message.
 */
export function copyStatusMessage(status: CopyStatus, label: string): string {
  switch (status) {
    case "copied":
      return `${label}: copied to the clipboard.`;
    case "failed":
      return `${label}: the clipboard is unavailable. Select the command and copy it manually.`;
    default:
      return "";
  }
}