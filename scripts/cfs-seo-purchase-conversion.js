const cfsSeoPurchaseConversionDestination =
  'AW-18589141066/QDNOCMX3mb4dEMqQ_59F';

(function () {
  const handledStoragePrefix = 'cfsSeoPurchaseConversion:';
  const maxAttempts = 3;
  const retryDelayMs = 1500;
  const conversionStatusEndpoint = 'https://try.cyberfreaksoftware.co.uk/api/cfs-seo-checkout/conversion-status';
  const sessionId = new URLSearchParams(window.location.search).get('session_id');

  function hasAdvertisingConsent() {
    try {
      return window.localStorage.getItem('silktideCookieChoice_advertising_cfs') === 'true';
    } catch {
      return false;
    }
  }

  function wasHandled() {
    try {
      return window.sessionStorage.getItem(handledStoragePrefix + sessionId) === 'true';
    } catch {
      return false;
    }
  }

  function markHandled() {
    try {
      window.sessionStorage.setItem(handledStoragePrefix + sessionId, 'true');
    } catch {
      // The current page still uses the in-memory flow only when sessionStorage is unavailable.
    }
  }

  function isValidSessionId(value) {
    return typeof value === 'string' && /^cs_(?:test|live)_[A-Za-z0-9_]{8,}$/.test(value);
  }

  function delay(milliseconds) {
    return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
  }

  async function trySendPurchaseConversion() {
    if (!cfsSeoPurchaseConversionDestination || !isValidSessionId(sessionId) || !hasAdvertisingConsent() || wasHandled() || typeof window.gtag !== 'function') return;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      try {
        const endpoint = new URL(conversionStatusEndpoint);
        endpoint.searchParams.set('session_id', sessionId);
        const response = await fetch(endpoint, { credentials: 'omit' });
        const result = await response.json();

        if (response.ok && result.eligible === true && result.mode === 'live' && typeof result.transactionId === 'string' && typeof result.value === 'number' && typeof result.currency === 'string') {
          markHandled();
          window.gtag('event', 'conversion', {
            send_to: cfsSeoPurchaseConversionDestination,
            value: result.value,
            currency: result.currency,
            transaction_id: result.transactionId
          });
          return;
        }
      } catch {
        // A transient network error is treated the same as an ineligible pre-webhook response.
      }

      if (attempt < maxAttempts - 1) await delay(retryDelayMs);
    }
  }

  trySendPurchaseConversion();
})();
