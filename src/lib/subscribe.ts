// Single integration point for email capture.
// Swap the body for the chosen provider (Loops / Mailchimp / Resend), PRD §20, P1.
// Until a provider + endpoint exist, this stub validates and resolves so the UI
// flow is fully testable end-to-end.

export interface SubscribeInput {
  email: string;
  /** state code, e.g. "CA", for ESP segmentation */
  state?: string;
  /** acquisition source, e.g. "homepage-hero", "state:california" */
  source?: string;
}

export interface SubscribeResult {
  ok: boolean;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(input: SubscribeInput): Promise<SubscribeResult> {
  if (!EMAIL_RE.test(input.email)) {
    return { ok: false, message: 'Please enter a valid email address.' };
  }

  // TODO(provider): POST to the ESP. Example shape once Loops/Mailchimp is chosen:
  //   await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify(input) });
  // For now, simulate a successful, de-duplicated signup.
  await new Promise((r) => setTimeout(r, 350));
  return { ok: true, message: "You're on the list. Check your inbox to confirm." };
}
