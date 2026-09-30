/* =========================================================
   Essence Coastal Clinic — Static One Page Website
   JS File: assets/js/main.js

   Handles:
   - Mobile menu open/close
   - Smooth anchor behavior cleanup
   - Static form placeholder behavior
   - Newsletter placeholder behavior
   - LeadSpark-ready upgrade hooks
========================================================= */

(function () {
  "use strict";

  const body = document.body;
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");
  const clinicForm = document.getElementById("clinicForm");
  const newsletterForm = document.querySelector(".newsletter-form");

  /* =========================================================
     MOBILE MENU
  ========================================================= */
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      const isOpen = body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navItems.forEach(function (link) {
      link.addEventListener("click", function () {
        body.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        body.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =========================================================
     SMOOTH ANCHOR OFFSET SUPPORT
  ========================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerOffset = 20;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });

  /* =========================================================
     STATIC APPOINTMENT FORM PLACEHOLDER
     Replace later with:
     - GHL embedded form
     - GHL webhook
     - SAW PHP form handler
     - HIPAA-safe approved form workflow if needed
  ========================================================= */
  if (clinicForm) {
    clinicForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(clinicForm);
      const firstName = (formData.get("firstName") || "").trim();
      const service = (formData.get("service") || "").trim();

      alert(
        "Thank you" +
          (firstName ? ", " + firstName : "") +
          ". Your appointment request has been prepared. A clinic team member will follow up to help with scheduling."
      );

      console.info("Essence Coastal Clinic appointment request:", {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        service: service,
        message: formData.get("message")
      });

      clinicForm.reset();
    });
  }

  /* =========================================================
     NEWSLETTER PLACEHOLDER
  ========================================================= */
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();

      alert("Thank you. You have been added to the clinic update list.");

      newsletterForm.reset();
    });
  }

  /* =========================================================
     LEADSPARK UPGRADE HOOKS
     These are intentionally inactive until automation is purchased.
  ========================================================= */

  window.EssenceLeadSpark = {
    version: "1.0",
    automationReady: true,

    /*
      Future upgrade examples:

      1. Send appointment request to GHL webhook:
      fetch("YOUR_GHL_WEBHOOK_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      2. Replace static form with GHL embedded form.

      3. Add GHL chat widget before closing body tag.

      4. Add call tracking / missed-call text-back.

      5. Add review request workflow after completed visit.
    */
  };
})();