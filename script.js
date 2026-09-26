(() => {
  const initNav = () => {
    const header = document.querySelector(".site-header");
    const button = document.querySelector(".nav-toggle");
    const nav = document.querySelector("#primary-nav");
    if (!header || !button || !nav) return;

    const close = () => {
      header.removeAttribute("data-nav-open");
      button.setAttribute("aria-expanded", "false");
    };

    const open = () => {
      header.setAttribute("data-nav-open", "true");
      button.setAttribute("aria-expanded", "true");
    };

    button.addEventListener("click", () => {
      header.getAttribute("data-nav-open") === "true" ? close() : open();
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) close();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });

    window.matchMedia("(min-width: 700px)").addEventListener("change", close);
  };

  const initContactForm = () => {
    const form = document.querySelector("[data-contact-form]");
    const status = form?.querySelector("[data-form-status]");
    const startedAt = form?.querySelector("[data-form-started-at]");
    const honeypot = form?.querySelector('[name="_gotcha"]');
    const submitButton = form?.querySelector('button[type="submit"]');
    const turnstileSlot = form?.querySelector("[data-turnstile-slot]");
    if (!form || !status || !startedAt || !honeypot || !submitButton || !turnstileSlot) return;

    const turnstileSitekey = form.dataset.turnstileSitekey;

    if (turnstileSitekey) {
      turnstileSlot.hidden = false;
      turnstileSlot.classList.add("cf-turnstile");
      turnstileSlot.dataset.sitekey = turnstileSitekey;
      turnstileSlot.dataset.size = "flexible";
      turnstileSlot.dataset.appearance = "interaction-only";
      turnstileSlot.dataset.theme = "auto";

      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.head.append(script);
    }

    const setStartedAt = () => {
      startedAt.value = String(Date.now());
    };

    const showStatus = (message, state) => {
      status.textContent = message;
      status.dataset.state = state;
      status.hidden = false;
      status.focus();
    };

    setStartedAt();

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (honeypot.value) {
        form.reset();
        setStartedAt();
        showStatus("Thank you. Your message has been received.", "success");
        return;
      }

      if (Date.now() - Number(startedAt.value) < 3000) {
        showStatus("Please wait a moment, then send your message again.", "error");
        return;
      }

      const endpoint = form.getAttribute("action");
      if (form.dataset.formConfigured !== "true" || !endpoint) {
        showStatus("Online message delivery has not been connected yet. Please call the museum at (909) 798-0868.", "error");
        return;
      }

      if (!turnstileSitekey) {
        showStatus("Online message security has not been configured yet. Please call the museum at (909) 798-0868.", "error");
        return;
      }

      const turnstileResponse = form.querySelector('[name="cf-turnstile-response"]');
      if (!turnstileResponse?.value) {
        showStatus("Please complete the security check, then send your message again.", "error");
        return;
      }

      const defaultButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if (!response.ok) throw new Error("Form provider rejected the submission.");

        form.reset();
        setStartedAt();
        window.turnstile?.reset();
        showStatus("Thank you. Your message has been sent.", "success");
      } catch {
        window.turnstile?.reset();
        showStatus("We could not send your message. Please try again or call the museum at (909) 798-0868.", "error");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = defaultButtonText;
      }
    });
  };

  const initNewsletterViewer = () => {
    const buttons = [...document.querySelectorAll("[data-newsletter-url]")];
    const viewer = document.querySelector("[data-newsletter-viewer]");
    const heading = document.querySelector("[data-newsletter-heading]");
    if (!buttons.length || !viewer || !heading) return;

    const selectNewsletter = (button) => {
      buttons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });

      heading.textContent = button.textContent.trim();
      viewer.title = button.dataset.newsletterTitle;
      viewer.src = button.dataset.newsletterUrl;
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => selectNewsletter(button));
    });
  };

  const initMembershipModal = () => {
    const supportHref = "support-us.html";

    document.body.insertAdjacentHTML(
      "beforeend",
      `<button class="membership-float" type="button" aria-haspopup="dialog" aria-controls="membership-modal">
        Membership
      </button>
      <div class="membership-modal" id="membership-modal" role="dialog" aria-modal="true" aria-labelledby="membership-title" hidden>
        <div class="membership-modal__panel">
          <button class="membership-modal__close" type="button" aria-label="Close membership options">×</button>
          <p class="eyebrow">Support the Museum</p>
          <h2 id="membership-title">Membership Options</h2>
          <ul class="membership-options">
            <li><strong>Individual:</strong> $30 per year</li>
            <li><strong>Second household member:</strong> add $5</li>
            <li><strong>Club or organization:</strong> $30 per year</li>
            <li><strong>Business:</strong> $50 per year</li>
            <li><strong>Full-time student:</strong> $10 per year</li>
            <li><strong>Lifetime:</strong> $1,000 one-time donation</li>
          </ul>
          <p>Membership includes free admission, a Gift Shop discount, and the museum newsletter.</p>
          <a class="button" href="${supportHref}">More Support Details</a>
        </div>
      </div>`
    );

    const trigger = document.querySelector(".membership-float");
    const modal = document.querySelector("#membership-modal");
    const panel = modal?.querySelector(".membership-modal__panel");
    const closeButton = modal?.querySelector(".membership-modal__close");
    if (!trigger || !modal || !panel || !closeButton) return;

    const open = () => {
      modal.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      closeButton.focus();
    };

    const close = () => {
      modal.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      trigger.focus();
    };

    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", open);
    closeButton.addEventListener("click", close);
    modal.addEventListener("click", (event) => {
      if (!panel.contains(event.target)) close();
    });
    document.addEventListener("keydown", (event) => {
      if (modal.hidden) return;

      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = [...panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  };

  const initHashDetails = () => {
    const openHashedDetails = () => {
      if (!window.location.hash) return;
      let target;
      try {
        target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      } catch {
        return;
      }
      if (target?.matches("details")) target.open = true;
    };

    openHashedDetails();
    window.addEventListener("hashchange", openHashedDetails);
  };

  const init = () => {
    initNav();
    initContactForm();
    initNewsletterViewer();
    initHashDetails();
    initMembershipModal();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
