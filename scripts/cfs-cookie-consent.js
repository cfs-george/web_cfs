/* CFS-specific consent choices for the shared Silktide Consent Manager. */
(function () {
  function updateGoogleConsent(granted) {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: granted ? "granted" : "denied",
        analytics_storage: granted ? "granted" : "denied",
        ad_user_data: granted ? "granted" : "denied",
        ad_personalization: granted ? "granted" : "denied"
      });
    }

    window.dispatchEvent(new CustomEvent("cfs:advertising-consent", {
      detail: { granted: granted }
    }));
  }

  window.silktideCookieBannerManager.updateCookieBannerConfig({
    bannerSuffix: "cfs",
    background: { showBackground: true },
    cookieIcon: { position: "bottomLeft" },
    cookieTypes: [
      {
        id: "necessary",
        name: "Necessary",
        description: "<p>These are needed for the website to work and to remember your privacy choices.</p>",
        required: true,
        onAccept: function () {}
      },
      {
        id: "advertising",
        name: "Advertising measurement",
        description: "<p>These help us measure whether advertising leads to enquiries or subscriptions. They are optional.</p>",
        defaultValue: false,
        onAccept: function () { updateGoogleConsent(true); },
        onReject: function () { updateGoogleConsent(false); }
      }
    ],
    text: {
      banner: {
        description: "<p>We use necessary cookies to make this website work. With your permission, we also use cookies for advertising measurement, including Google Ads.</p>",
        acceptAllButtonText: "Accept",
        acceptAllButtonAccessibleLabel: "Accept advertising measurement cookies",
        rejectNonEssentialButtonText: "Reject non-essential",
        rejectNonEssentialButtonAccessibleLabel: "Reject non-essential cookies",
        preferencesButtonText: "Preferences",
        preferencesButtonAccessibleLabel: "Open cookie preferences"
      },
      preferences: {
        title: "Cookie preferences",
        description: "<p>Choose whether optional advertising measurement cookies can be used. Your preferences apply across this website.</p>",
        creditLinkText: "Get this banner for free",
        creditLinkAccessibleLabel: "Get this banner for free"
      }
    },
    position: { banner: "bottomLeft" }
  });
})();
