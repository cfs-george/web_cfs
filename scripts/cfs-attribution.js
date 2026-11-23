/* First-party campaign attribution for CFS enquiry and checkout records. */
(function () {
  const storageKey = 'cfsAttribution';
  const maxAgeMs = 90 * 24 * 60 * 60 * 1000;
  const maxValueLength = 500;
  const approvedKeys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'gbraid',
    'wbraid'
  ];

  function currentUrlAttribution() {
    const values = {};
    const search = new URLSearchParams(window.location.search);
    approvedKeys.forEach((key) => {
      const value = search.get(key)?.trim();
      if (value) values[key] = value.slice(0, maxValueLength);
    });
    return values;
  }

  function readStoredAttribution() {
    try {
      const stored = JSON.parse(window.localStorage.getItem(storageKey));
      if (!stored || typeof stored !== 'object' || typeof stored.timestamp !== 'number' || Date.now() - stored.timestamp > maxAgeMs) {
        window.localStorage.removeItem(storageKey);
        return null;
      }
      return { timestamp: stored.timestamp, values: cleanAttribution(stored.values) };
    } catch {
      return null;
    }
  }

  function cleanAttribution(values) {
    const clean = {};
    if (!values || typeof values !== 'object') return clean;
    approvedKeys.forEach((key) => {
      const value = typeof values[key] === 'string' ? values[key].trim() : '';
      if (value) clean[key] = value.slice(0, maxValueLength);
    });
    return clean;
  }

  function persistFirstAttribution() {
    const storedRecord = readStoredAttribution();
    const stored = storedRecord?.values || {};
    const current = currentUrlAttribution();
    const values = { ...current, ...stored };

    if (Object.keys(values).length) {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify({ timestamp: storedRecord?.timestamp || Date.now(), values }));
      } catch {
        // Attribution can still be used from the current URL in this browser session.
      }
    }

    return values;
  }

  let attribution = persistFirstAttribution();

  window.cfsAttribution = {
    get: function () {
      attribution = { ...currentUrlAttribution(), ...(readStoredAttribution()?.values || {}), ...attribution };
      return cleanAttribution(attribution);
    }
  };
})();
