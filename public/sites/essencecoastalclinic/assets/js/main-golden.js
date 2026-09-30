/* =========================================================
   Essence Coastal Clinic — Golden Luxury Version
   File: assets/js/main-golden.js

   Handles:
   - Mobile menu open/close
   - Smooth scrolling
   - Safe reveal animations
   - Appointment form placeholder
   - Newsletter placeholder
   - LeadSpark-ready hooks
========================================================= */

(function () {
  "use strict";

  document.documentElement.classList.add("js-enabled");

  const body = document.body;
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");
  const clinicForm = document.getElementById("clinicForm");
  const newsletterForm = document.querySelector(".newsletter-form");
  const revealItems = document.querySelectorAll("[data-reveal]");

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
     SAFE REVEAL ANIMATIONS
     CSS keeps content visible unless JS is working.
  ========================================================= */
  if (revealItems.length) {
    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );

      revealItems.forEach(function (item) {
        revealObserver.observe(item);
      });

      setTimeout(function () {
        revealItems.forEach(function (item) {
          const rect = item.getBoundingClientRect();

          if (rect.top < window.innerHeight && rect.bottom > 0) {
            item.classList.add("is-visible");
          }
        });
      }, 250);
    } else {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
    }
  }

  /* =========================================================
     APPOINTMENT FORM PLACEHOLDER

     This keeps the static website functional-looking until
     the LeadSpark / GHL form or webhook is connected.
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
        preferredContact: (formData.get("preferredContact") || "").trim(),
        message: (formData.get("message") || "").trim(),
        source: formData.get("source") || "Essence Coastal Clinic Website",
        pageVersion: formData.get("pageVersion") || "Golden Luxury Landing Page"
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
  ========================================================= */
  window.EssenceLeadSpark = {
    version: "4.0-golden-luxury",
    automationReady: true,
    clinicName: "Essence Coastal Clinic",
    phone: "228-224-7741",
    email: "info@essencecoastalclinic.com",
    address: "15277 Creosote Rd, Gulfport, MS 39503",

    recommendedWorkflows: [
      "Appointment Request Routing",
      "Missed-Call Text-Back",
      "Service-Based Follow-Up",
      "Appointment Reminders",
      "Review Request Workflow",
      "Voice AI Care Assistant"
    ]
  };
})();