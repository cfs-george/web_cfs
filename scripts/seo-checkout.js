const checkoutBaseUrl = "https://try.cyberfreaksoftware.co.uk/api/cfs-seo-checkout/";

const checkoutUrl = () => {
  const destination = new URL(checkoutBaseUrl);
  const attribution = window.cfsAttribution?.get() || {};
  Object.entries(attribution).forEach(([key, value]) => {
    if (value) destination.searchParams.set(key, value);
  });
  return destination.href;
};

document.querySelectorAll("[data-seo-checkout]").forEach((link) => {
  link.href = checkoutUrl();
});
