const checkoutBaseUrl = "https://try.cyberfreaksoftware.co.uk/api/cfs-seo-checkout/";
const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"];

const checkoutUrl = () => {
  const destination = new URL(checkoutBaseUrl);
  const source = new URLSearchParams(window.location.search);
  attributionKeys.forEach((key) => {
    const value = source.get(key);
    if (value) destination.searchParams.set(key, value);
  });
  return destination.href;
};

document.querySelectorAll("[data-seo-checkout]").forEach((link) => {
  link.href = checkoutUrl();
});
