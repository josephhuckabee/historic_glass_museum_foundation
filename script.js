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
    const messageField = form?.querySelector('[name="message"]');
    const messageCount = form?.querySelector("[data-message-count]");
    if (!form || !status || !startedAt || !honeypot || !submitButton || !turnstileSlot || !messageField || !messageCount) return;

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

    const updateMessageCount = () => {
      if (messageField.value.length > 500) {
        messageField.value = messageField.value.slice(0, 500);
      }
      messageCount.textContent = String(messageField.value.length);
    };

    setStartedAt();
    updateMessageCount();
    messageField.addEventListener("input", updateMessageCount);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      updateMessageCount();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (honeypot.value) {
        form.reset();
        setStartedAt();
        updateMessageCount();
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
        updateMessageCount();
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

  const initGalleryLightbox = () => {
    const triggers = [...document.querySelectorAll("[data-gallery-src]")];
    const dialog = document.querySelector("[data-gallery-lightbox]");
    const image = dialog?.querySelector("[data-gallery-image]");
    const caption = dialog?.querySelector("[data-gallery-lightbox-caption]");
    const closeButton = dialog?.querySelector("[data-gallery-close]");
    if (!triggers.length || !dialog || !image || !caption || !closeButton) return;

    let activeTrigger = null;

    const close = () => {
      if (dialog.open) dialog.close();
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const thumbnail = trigger.querySelector("img");
        activeTrigger = trigger;
        image.src = trigger.dataset.gallerySrc;
        image.alt = thumbnail?.alt || "Enlarged museum collection photograph";
        caption.textContent = trigger.dataset.galleryCaption || "";
        dialog.showModal();
        closeButton.focus();
      });
    });

    closeButton.addEventListener("click", close);
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) close();
    });
    dialog.addEventListener("close", () => {
      image.removeAttribute("src");
      activeTrigger?.focus();
      activeTrigger = null;
    });
  };

  const initSupportAccordions = () => {
    const membership = document.querySelector("details#membership");
    const accordion = membership?.closest(".accordion");
    if (!membership || !accordion) return;

    const items = [...accordion.querySelectorAll("details.accordion-item")];

    const openMembership = () => {
      items.forEach((item) => {
        item.open = item === membership;
      });
      window.requestAnimationFrame(() => {
        membership.scrollIntoView({ block: "start" });
        const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height || 0;
        window.scrollBy({ top: -(headerHeight + 16), left: 0, behavior: "auto" });
      });
    };

    const applyRoute = () => {
      if (window.location.hash === "#membership") {
        openMembership();
        return;
      }
      items.forEach((item) => {
        item.open = false;
      });
    };

    document.querySelector(".membership-floating-cta")?.addEventListener("click", () => {
      openMembership();
    });
    window.addEventListener("hashchange", applyRoute);
    window.addEventListener("pageshow", applyRoute);
    applyRoute();
  };

  const init = () => {
    initNav();
    initContactForm();
    initNewsletterViewer();
    initGalleryLightbox();
    initSupportAccordions();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
