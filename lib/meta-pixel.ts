type MetaPixelParams = Record<string, unknown>;

type MetaPixelFunction = (
  action: string,
  eventName: string,
  params?: MetaPixelParams
) => void;

function getMetaPixel(): MetaPixelFunction | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  return (
    window as typeof window & {
      fbq?: MetaPixelFunction;
    }
  ).fbq;
}

export function trackMetaEvent(
  eventName: string,
  params?: MetaPixelParams,
  attempt = 0
) {
  const fbq = getMetaPixel();

  if (fbq) {
    fbq("track", eventName, params);
    return;
  }

  // next/script with afterInteractive can finish slightly after
  // client components mount. Retry briefly instead of losing the event.
  if (attempt >= 20) {
    return;
  }

  window.setTimeout(() => {
    trackMetaEvent(eventName, params, attempt + 1);
  }, 100);
}
