/* Delivery stays on the existing CFS application; no mailbox is exposed. */
const contactEndpoint = 'https://try.cyberfreaksoftware.co.uk/api/cfs-contact';
const dialog = document.createElement('dialog');
dialog.className = 'contact-dialog';
dialog.setAttribute('aria-labelledby', 'contact-title');
dialog.innerHTML = `
  <button type="button" class="contact-close" aria-label="Close contact form">×</button>
  <p class="contact-eyebrow">LET’S TALK</p>
  <h2 id="contact-title">Tell us</h2>
  <p>Tell us about your business, your website or your next software project.</p>
  <form class="contact-form">
    <label for="contact-name">Your name</label>
    <input id="contact-name" name="name" autocomplete="name" maxlength="120" required>
    <label for="contact-email">Your email</label>
    <input id="contact-email" name="email" type="email" autocomplete="email" maxlength="254" required>
    <label for="contact-subject">What would you like to discuss?</label>
    <select id="contact-subject" name="subject"><option>General enquiry</option><option>SEO management</option><option>Website deployments</option><option>Software project</option><option>Privacy question</option></select>
    <label for="contact-message">Your message</label>
    <textarea id="contact-message" name="message" rows="5" maxlength="5000" required></textarea>
    <div class="contact-honeypot" aria-hidden="true"><label for="contact-website">Leave this field empty</label><input id="contact-website" name="website" tabindex="-1" autocomplete="off"></div>
    <p class="contact-status" role="status" aria-live="polite"></p>
    <button type="submit" class="contact-send">Send message</button>
  </form>`;
document.body.append(dialog);
const form = dialog.querySelector('form');
const status = dialog.querySelector('.contact-status');
const submit = dialog.querySelector('[type="submit"]');
let trigger;
let closeTimer;

const close = () => {
  if (!dialog.open || dialog.classList.contains('is-closing')) return;
  dialog.classList.remove('is-visible');
  dialog.classList.add('is-closing');
  closeTimer = window.setTimeout(() => dialog.close(), 160);
};

document.querySelectorAll('[data-contact-open]').forEach(button => {
  button.setAttribute('aria-haspopup', 'dialog');
  button.addEventListener('click', () => {
    trigger = button;
    form.elements.subject.value = button.dataset.contactSubject || (location.pathname.includes('privacy') ? 'Privacy question' : 'General enquiry');
    if (!submit.disabled) status.textContent = '';

    dialog.showModal();
    // Start the transition on the following frame, after the dialog enters
    // the top layer.
    window.requestAnimationFrame(() => dialog.classList.add('is-visible'));
  });
});
dialog.querySelector('.contact-close').addEventListener('click', close);
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
});
dialog.addEventListener('close', () => {
  window.clearTimeout(closeTimer);
  dialog.classList.remove('is-visible', 'is-closing');
  trigger?.focus();
});
dialog.addEventListener('cancel', event => {
  // Keep Escape consistent with the close button and outside-click transition.
  event.preventDefault();
  close();
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !dialog.open) return;
  event.preventDefault();
  close();
});
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!contactEndpoint || submit.disabled) return;
  if (!form.elements.message.value.trim() || !form.elements.name.value.trim()) {
    status.textContent = 'Please enter your name and a message.';
    return;
  }
  submit.disabled = true;
  status.textContent = 'Sending your message…';
  try {
    const response = await fetch(contactEndpoint, {
      method: 'POST', credentials: 'omit',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-CFS-Contact': '1' },
      body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), source: location.origin + location.pathname })
    });
    const result = await response.json();
    if (!response.ok || result.success !== true) throw new Error('Unable to send');
    form.reset();
    status.textContent = 'Thank you — your message has been sent.';
  } catch {
    status.textContent = 'Your message could not be sent. Please try again later.';
  } finally {
    submit.disabled = false;
  }
});
