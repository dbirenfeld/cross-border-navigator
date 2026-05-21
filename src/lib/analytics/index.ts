type EventName =
  | "page_view"
  | "calculator_started"
  | "calculator_step_completed"
  | "calculator_completed"
  | "pdf_downloaded"
  | "declaration_generated"
  | "waitlist_signup";

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(name: EventName, properties?: EventProperties) {
  if (typeof window === "undefined") return;

  try {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: name,
        properties,
        timestamp: new Date().toISOString(),
        url: window.location.pathname,
        referrer: document.referrer || undefined,
      }),
    }).catch(() => {});
  } catch {
    // Silently fail - analytics should never break the app
  }
}

export function trackPageView(path?: string) {
  trackEvent("page_view", { path: path ?? window.location.pathname });
}
