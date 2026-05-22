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

  const initNewsletter = () => {
    const list = document.querySelector("[data-newsletter-list]");
    if (!list) return;

    const buttons = [...list.querySelectorAll("[data-newsletter]")];
    const panels = [...document.querySelectorAll("[data-newsletter-panel]")];
    if (!buttons.length || !panels.length) return;

    const activate = (id) => {
      buttons.forEach((button) => {
        const active = button.dataset.newsletter === id;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", String(active));
        button.tabIndex = active ? 0 : -1;
      });

      panels.forEach((panel) => {
        const active = panel.dataset.newsletterPanel === id;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => activate(button.dataset.newsletter));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        event.preventDefault();

        const index = buttons.indexOf(button);
        const last = buttons.length - 1;
        let next = index;

        if (event.key === "Home") next = 0;
        if (event.key === "End") next = last;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;

        buttons[next].focus();
        activate(buttons[next].dataset.newsletter);
      });
    });

    activate(buttons.find((button) => button.classList.contains("is-active"))?.dataset.newsletter || buttons[0].dataset.newsletter);
  };

  const initMembershipModal = () => {
    const isSubpage = location.pathname.split("/").filter(Boolean).length > 1;
    const supportHref = isSubpage ? "../support-us/" : "support-us/";

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
            <li><strong>Lifetime:</strong> $1000 one-time donation</li>
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
      if (event.key === "Escape" && !modal.hidden) close();
    });
  };

  const init = () => {
    initNav();
    initNewsletter();
    initMembershipModal();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
