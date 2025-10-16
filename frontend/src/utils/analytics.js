export const track = (event, properties = {}) => {
  if (typeof window === "undefined") return;
  console.debug("[Analytics]", event, properties);
  // TODO: integrate PostHog / Mixpanel
};