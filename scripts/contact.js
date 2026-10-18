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
  </form>
  <p class="contact-alternative">You can also message us on <a href="https://www.linkedin.com/company/cyberfreak-software-ltd" target="_blank" rel="noopener noreferrer">LinkedIn <i class="fa-brands fa-linkedin" aria-hidden="true"></i></a> or <a href="https://www.instagram.com/cfs_george/" target="_blank" rel="noopener noreferrer">Instagram <i class="fa-brands fa-instagram" aria-hidden="true"></i></a>.</p>`;
document.body.append(dialog);
const form = dialog.querySelector('form');
const status = dialog.querySelector('.contact-status');
const submit = dialog.querySelector('[type="submit"]');
let trigger;
document.querySelectorAll('[data-contact-open]').forEach(button => {
  button.setAttribute('aria-haspopup', 'dialog');
  button.addEventListener('click', () => {
    trigger = button;
    form.elements.subject.value = button.dataset.contactSubject || (location.pathname.includes('privacy') ? 'Privacy question' : 'General enquiry');
    if (!submit.disabled) status.textContent = '';

    dialog.showModal();
  });
});
dialog.querySelector('.contact-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => trigger?.focus());
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
    status.textContent = 'Your message could not be sent. Please try again or use the social links below.';
  } finally {
    submit.disabled = false;
  }
});
