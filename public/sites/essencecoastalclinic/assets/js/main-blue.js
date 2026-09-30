/* =========================================================
   Essence Coastal Clinic — Blue Healthcare Version
   JS File: assets/js/main-blue.js

   Handles:
   - Mobile menu open/close
   - Smooth anchor scrolling
   - Static appointment form placeholder
   - Newsletter placeholder
   - LeadSpark-ready automation hooks
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

    document.addEventListener("click", function (event) {
      const clickedInsideMenu = navLinks.contains(event.target);
      const clickedMenuButton = menuBtn.contains(event.target);

      if (!clickedInsideMenu && !clickedMenuButton && body.classList.contains("menu-open")) {
        body.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =========================================================
     SMOOTH ANCHOR SCROLLING
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

     This keeps the base website functional-looking without
     requiring GHL automation yet.

     Replace later with:
     - GHL form embed
     - GHL webhook
     - SAW PHP form handler
     - approved healthcare-safe workflow
  ========================================================= */
  if (clinicForm) {
    clinicForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(clinicForm);

      const payload = {
        firstName: (formData.get("firstName") || "").trim(),
        lastName: (formData.get("lastName") || "").trim(),
        phone: (formData.get("phone") || "").trim(),
        email: (formData.get("email") || "").trim(),
        service: (formData.get("service") || "").trim(),
        message: (formData.get("message") || "").trim(),
        source: "Essence Coastal Clinic Website",
        pageVersion: "Blue Healthcare Version"
      };

      alert(
        "Thank you" +
          (payload.firstName ? ", " + payload.firstName : "") +
          ". Your appointment request has been prepared. A clinic team member will follow up to help with scheduling."
      );

      console.info("Essence Coastal Clinic appointment request:", payload);

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

     These are inactive until the client purchases automation.
     They allow us to connect this static page later without
     rebuilding the whole website.
  ========================================================= */

  window.EssenceLeadSpark = {
    version: "2.0-blue",
    automationReady: true,
    clinicName: "Essence Coastal Clinic",
    phone: "228-224-7741",
    email: "info@essencecoastalclinic.com",
    address: "15277 Creosote Rd, Gulfport, MS 39503",

    /*
      Future automation upgrades:

      1. GHL Form Webhook
      Replace the static clinicForm alert with:

      fetch("YOUR_GHL_WEBHOOK_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      2. Service-Based Routing
      - Acute Illness & Testing
      - DOT Physical
      - Sports / Employment Physical
      - TB Skin Testing
      - General Appointment

      3. Missed Call Text-Back
      Triggered through GHL phone/call tracking.

      4. Appointment Reminder Workflow
      SMS/email reminder before appointment.

      5. Review Request Workflow
      Trigger after completed visit.

      6. GHL Chat / AI Employee
      Paste GHL widget before closing body tag.
    */
  };
})();