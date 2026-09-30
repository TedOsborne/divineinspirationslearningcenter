/**
 * ============================================================================
 * FILE: main.js
 * PROJECT: Gulf Coast Builders HTML5 Template
 *
 * PURPOSE:
 * Shared behavior for dark.html, light.html, and future color-theme versions.
 *
 * FEATURES:
 * - Fold-activated fixed header with spacer
 * - Mobile navigation
 * - "More" dropdown
 * - Smooth same-page navigation
 * - Active navigation state
 * - Subtle hero parallax
 * - Trust-logo carousel
 * - Section reveal animations
 * - Animated counters
 * - Pointer-follow lighting
 * - Restrained card tilt
 * - Seamless review marquees
 * - Accessible FAQ accordion
 * - Current copyright year
 * - Reduced-motion support
 * ============================================================================
 */

(() => {
  "use strict";

  const doc = document;
  const root = doc.documentElement;
  const body = doc.body;

  if (!body) return;

  const reduceMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const finePointerQuery = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  const state = {
    reduceMotion: reduceMotionQuery.matches,
    finePointer: finePointerQuery.matches,
    scrollFrame: 0,
    resizeFrame: 0,
    foldThreshold: Math.max(window.innerHeight, 560),
    pageTop: 0
  };

  const selectors = {
    header: "[data-site-header]",
    headerSpacer: "[data-header-spacer]",
    menuToggle: "[data-menu-toggle]",
    mainNav: "[data-main-nav]",
    moreMenu: "[data-more-menu]",
    moreButton: "[data-more-button]",
    parallaxSection: "[data-parallax-section]",
    trustCarousel: "[data-trust-carousel]",
    trustTrack: "[data-trust-track]",
    revealSection: "[data-reveal-section]",
    counter: "[data-counter]",
    pointerGlow: "[data-pointer-glow]",
    tiltCard: "[data-tilt-card]",
    reviewMarquees: "[data-review-marquees]",
    faqList: "[data-faq-list]",
    currentYear: "[data-current-year]"
  };

  const header = doc.querySelector(selectors.header);
  const headerSpacer = doc.querySelector(selectors.headerSpacer);
  const menuToggle = doc.querySelector(selectors.menuToggle);
  const mainNav = doc.querySelector(selectors.mainNav);
  const moreMenu = doc.querySelector(selectors.moreMenu);
  const moreButton = doc.querySelector(selectors.moreButton);
  const parallaxSection = doc.querySelector(selectors.parallaxSection);

  /**
   * --------------------------------------------------------------------------
   * Utility helpers
   * --------------------------------------------------------------------------
   */

  const clamp = (value, minimum, maximum) => {
    return Math.min(Math.max(value, minimum), maximum);
  };

  const debounce = (callback, delay = 150) => {
    let timeoutId = 0;

    return (...args) => {
      window.clearTimeout(timeoutId);

      timeoutId = window.setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  const getFocusableElements = (container) => {
    if (!container) return [];

    return Array.from(
      container.querySelectorAll(
        [
          "a[href]",
          "button:not([disabled])",
          "input:not([disabled])",
          "select:not([disabled])",
          "textarea:not([disabled])",
          '[tabindex]:not([tabindex="-1"])'
        ].join(",")
      )
    ).filter((element) => {
      return !element.hasAttribute("hidden");
    });
  };

  const getPageOffset = (element) => {
    if (!element) return 0;

    return (
      element.getBoundingClientRect().top +
      window.scrollY
    );
  };

  const getHeaderHeight = () => {
    return header ? header.offsetHeight : 0;
  };

  const getScrollOffset = () => {
    return getHeaderHeight() + 12;
  };

  const isSamePageHashLink = (link) => {
    if (!(link instanceof HTMLAnchorElement)) return false;

    const href = link.getAttribute("href");

    return Boolean(
      href &&
      href.startsWith("#") &&
      href.length > 1
    );
  };

  /**
   * --------------------------------------------------------------------------
   * Keep media-query state current
   * --------------------------------------------------------------------------
   */

  const updateMotionPreference = (event) => {
    state.reduceMotion = event.matches;
  };

  const updatePointerPreference = (event) => {
    state.finePointer = event.matches;
  };

  if (typeof reduceMotionQuery.addEventListener === "function") {
    reduceMotionQuery.addEventListener(
      "change",
      updateMotionPreference
    );

    finePointerQuery.addEventListener(
      "change",
      updatePointerPreference
    );
  } else {
    reduceMotionQuery.addListener(
      updateMotionPreference
    );

    finePointerQuery.addListener(
      updatePointerPreference
    );
  }

  /**
   * --------------------------------------------------------------------------
   * Header setup
   * --------------------------------------------------------------------------
   */

  if (mainNav && !mainNav.id) {
    mainNav.id = "main-navigation";
  }

  if (menuToggle && mainNav) {
    menuToggle.setAttribute(
      "aria-controls",
      mainNav.id
    );
  }

  const calculateFoldThreshold = () => {
    state.pageTop = getPageOffset(
      doc.querySelector(".site") || body
    );

    state.foldThreshold =
      state.pageTop +
      Math.max(window.innerHeight, 560);
  };

  const activateStickyHeader = () => {
    if (
      !header ||
      header.classList.contains("is-sticky")
    ) {
      return;
    }

    if (headerSpacer) {
      headerSpacer.style.height =
        `${header.offsetHeight}px`;
    }

    header.classList.add("is-sticky");
  };

  const deactivateStickyHeader = () => {
    if (
      !header ||
      !header.classList.contains("is-sticky")
    ) {
      return;
    }

    header.classList.remove("is-sticky");

    if (headerSpacer) {
      headerSpacer.style.height = "0px";
    }
  };

  const updateStickyHeader = () => {
    if (!header) return;

    const shouldStick =
      window.scrollY >= state.foldThreshold;

    if (shouldStick) {
      activateStickyHeader();
    } else {
      deactivateStickyHeader();
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Mobile menu
   * --------------------------------------------------------------------------
   */

  const setMenuState = (open) => {
    if (!header || !menuToggle) return;

    header.classList.toggle(
      "menu-open",
      open
    );

    body.classList.toggle(
      "menu-is-open",
      open
    );

    menuToggle.setAttribute(
      "aria-expanded",
      String(open)
    );

    menuToggle.setAttribute(
      "aria-label",
      open
        ? "Close navigation menu"
        : "Open navigation menu"
    );
  };

  const closeMobileMenu = () => {
    setMenuState(false);
  };

  const toggleMobileMenu = () => {
    if (!header) return;

    setMenuState(
      !header.classList.contains("menu-open")
    );
  };

  menuToggle?.addEventListener(
    "click",
    toggleMobileMenu
  );

  /**
   * --------------------------------------------------------------------------
   * "More" dropdown
   * --------------------------------------------------------------------------
   */

  const setMoreMenuState = (open) => {
    if (!moreMenu || !moreButton) return;

    moreMenu.classList.toggle(
      "is-open",
      open
    );

    moreButton.setAttribute(
      "aria-expanded",
      String(open)
    );
  };

  const closeMoreMenu = () => {
    setMoreMenuState(false);
  };

  moreButton?.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();

      setMoreMenuState(
        !moreMenu?.classList.contains("is-open")
      );
    }
  );

  doc.addEventListener(
    "click",
    (event) => {
      if (
        moreMenu &&
        !moreMenu.contains(event.target)
      ) {
        closeMoreMenu();
      }
    }
  );

  /**
   * --------------------------------------------------------------------------
   * Keyboard handling for open menus
   * --------------------------------------------------------------------------
   */

  doc.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        closeMoreMenu();

        if (menuToggle) {
          menuToggle.focus();
        }

        return;
      }

      if (
        event.key !== "Tab" ||
        !header?.classList.contains("menu-open") ||
        window.innerWidth > 1260
      ) {
        return;
      }

      const focusable =
        getFocusableElements(header);

      if (!focusable.length) return;

      const first = focusable[0];
      const last =
        focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        doc.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        doc.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }
  );

  /**
   * --------------------------------------------------------------------------
   * Same-page smooth scrolling
   * --------------------------------------------------------------------------
   */

  const scrollToTarget = (
    target,
    updateHistory = true
  ) => {
    if (!target) return;

    const destination =
      getPageOffset(target) -
      getScrollOffset();

    window.scrollTo({
      top: Math.max(destination, 0),
      behavior:
        state.reduceMotion
          ? "auto"
          : "smooth"
    });

    if (
      updateHistory &&
      target.id &&
      window.history?.pushState
    ) {
      window.history.pushState(
        null,
        "",
        `#${target.id}`
      );
    }
  };

  doc.addEventListener(
    "click",
    (event) => {
      const link =
        event.target.closest('a[href^="#"]');

      if (!isSamePageHashLink(link)) return;

      const selector =
        link.getAttribute("href");

      let target = null;

      try {
        target = doc.querySelector(selector);
      } catch (error) {
        target = null;
      }

      closeMobileMenu();
      closeMoreMenu();

      if (!target) return;

      event.preventDefault();
      scrollToTarget(target);
    }
  );

  /**
   * --------------------------------------------------------------------------
   * Active navigation link
   * --------------------------------------------------------------------------
   */

  const navHashLinks = Array.from(
    doc.querySelectorAll(
      '.main-nav a[href^="#"]'
    )
  ).filter(isSamePageHashLink);

  const navTargets = navHashLinks
    .map((link) => {
      const selector =
        link.getAttribute("href");

      let target = null;

      try {
        target = doc.querySelector(selector);
      } catch (error) {
        target = null;
      }

      return target
        ? { link, target }
        : null;
    })
    .filter(Boolean);

  const updateActiveNavigation = () => {
    if (!navTargets.length) return;

    const activationLine =
      window.scrollY +
      getScrollOffset() +
      80;

    let activeEntry =
      navTargets[0];

    navTargets.forEach((entry) => {
      if (
        getPageOffset(entry.target) <=
        activationLine
      ) {
        activeEntry = entry;
      }
    });

    navHashLinks.forEach((link) => {
      link.removeAttribute("aria-current");
    });

    activeEntry.link.setAttribute(
      "aria-current",
      "page"
    );
  };

  /**
   * --------------------------------------------------------------------------
   * Hero parallax
   * --------------------------------------------------------------------------
   */

  const updateParallax = () => {
    if (!parallaxSection) return;

    if (state.reduceMotion) {
      root.style.setProperty(
        "--parallax-y",
        "0px"
      );

      return;
    }

    const sectionTop =
      getPageOffset(parallaxSection);

    const localScroll =
      Math.max(
        window.scrollY - sectionTop,
        0
      );

    const movement =
      clamp(
        localScroll * 0.06,
        0,
        70
      );

    root.style.setProperty(
      "--parallax-y",
      `${movement}px`
    );
  };

  /**
   * --------------------------------------------------------------------------
   * Shared scroll update
   * --------------------------------------------------------------------------
   */

  const runScrollUpdate = () => {
    state.scrollFrame = 0;

    updateStickyHeader();
    updateActiveNavigation();
    updateParallax();
  };

  const requestScrollUpdate = () => {
    if (state.scrollFrame) return;

    state.scrollFrame =
      window.requestAnimationFrame(
        runScrollUpdate
      );
  };

  /**
   * --------------------------------------------------------------------------
   * Reveal sections
   * --------------------------------------------------------------------------
   */

  const revealSections =
    doc.querySelectorAll(
      selectors.revealSection
    );

  if (
    state.reduceMotion ||
    !("IntersectionObserver" in window)
  ) {
    revealSections.forEach((section) => {
      section.classList.add("is-visible");
    });
  } else {
    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.1,
          rootMargin:
            "0px 0px -45px 0px"
        }
      );

    revealSections.forEach((section) => {
      revealObserver.observe(section);
    });
  }

  /**
   * --------------------------------------------------------------------------
   * Animated counters
   * --------------------------------------------------------------------------
   */

  const counters =
    doc.querySelectorAll(
      selectors.counter
    );

  const formatCounterValue = (
    value,
    decimals
  ) => {
    return Number(value).toLocaleString(
      undefined,
      {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }
    );
  };

  const runCounter = (element) => {
    if (
      element.dataset.counterComplete ===
      "true"
    ) {
      return;
    }

    const target =
      Number.parseFloat(
        element.dataset.counter
      );

    const decimals =
      Number.parseInt(
        element.dataset.decimals || "0",
        10
      );

    if (!Number.isFinite(target)) return;

    element.dataset.counterComplete =
      "true";

    if (state.reduceMotion) {
      element.textContent =
        formatCounterValue(
          target,
          decimals
        );

      return;
    }

    const duration = 1450;
    const startTime =
      performance.now();

    const animate = (currentTime) => {
      const progress =
        clamp(
          (currentTime - startTime) /
          duration,
          0,
          1
        );

      const eased =
        1 - Math.pow(1 - progress, 3);

      const currentValue =
        target * eased;

      element.textContent =
        formatCounterValue(
          currentValue,
          decimals
        );

      if (progress < 1) {
        window.requestAnimationFrame(
          animate
        );
      } else {
        element.textContent =
          formatCounterValue(
            target,
            decimals
          );
      }
    };

    window.requestAnimationFrame(
      animate
    );
  };

  if (
    state.reduceMotion ||
    !("IntersectionObserver" in window)
  ) {
    counters.forEach(runCounter);
  } else {
    const counterObserver =
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            runCounter(entry.target);
            observer.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.55
        }
      );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  /**
   * --------------------------------------------------------------------------
   * Pointer-follow lighting
   * --------------------------------------------------------------------------
   */

  const pointerGlowElements =
    doc.querySelectorAll(
      [
        selectors.pointerGlow,
        ".proof-metric",
        ".process-card",
        ".review-card",
        ".faq-item"
      ].join(",")
    );

  const setPointerPosition = (
    element,
    event
  ) => {
    const rect =
      element.getBoundingClientRect();

    const x =
      clamp(
        (
          (event.clientX - rect.left) /
          rect.width
        ) * 100,
        0,
        100
      );

    const y =
      clamp(
        (
          (event.clientY - rect.top) /
          rect.height
        ) * 100,
        0,
        100
      );

    element.style.setProperty(
      "--pointer-x",
      `${x}%`
    );

    element.style.setProperty(
      "--pointer-y",
      `${y}%`
    );
  };

  const resetPointerPosition = (
    element
  ) => {
    element.style.setProperty(
      "--pointer-x",
      "50%"
    );

    element.style.setProperty(
      "--pointer-y",
      "30%"
    );
  };

  pointerGlowElements.forEach(
    (element) => {
      element.addEventListener(
        "pointermove",
        (event) => {
          if (
            !state.finePointer ||
            state.reduceMotion
          ) {
            return;
          }

          setPointerPosition(
            element,
            event
          );
        }
      );

      element.addEventListener(
        "pointerleave",
        () => {
          resetPointerPosition(
            element
          );
        }
      );
    }
  );

  const hero =
    doc.querySelector(".hero");

  hero?.addEventListener(
    "pointermove",
    (event) => {
      if (
        !state.finePointer ||
        state.reduceMotion
      ) {
        return;
      }

      const rect =
        hero.getBoundingClientRect();

      const x =
        clamp(
          (
            (event.clientX - rect.left) /
            rect.width
          ) * 100,
          0,
          100
        );

      const y =
        clamp(
          (
            (event.clientY - rect.top) /
            rect.height
          ) * 100,
          0,
          100
        );

      hero.style.setProperty(
        "--pointer-x",
        `${x}%`
      );

      hero.style.setProperty(
        "--pointer-y",
        `${y}%`
      );
    }
  );

  /**
   * --------------------------------------------------------------------------
   * Restrained card tilt
   * --------------------------------------------------------------------------
   */

  const tiltCards =
    doc.querySelectorAll(
      selectors.tiltCard
    );

  tiltCards.forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        if (
          !state.finePointer ||
          state.reduceMotion ||
          window.innerWidth < 900
        ) {
          return;
        }

        const rect =
          card.getBoundingClientRect();

        const x =
          (
            event.clientX - rect.left
          ) / rect.width;

        const y =
          (
            event.clientY - rect.top
          ) / rect.height;

        const rotateY =
          (x - 0.5) * 4.5;

        const rotateX =
          (0.5 - y) * 4.5;

        card.style.setProperty(
          "--rotate-x",
          `${rotateX.toFixed(2)}deg`
        );

        card.style.setProperty(
          "--rotate-y",
          `${rotateY.toFixed(2)}deg`
        );
      }
    );

    card.addEventListener(
      "pointerleave",
      () => {
        card.style.setProperty(
          "--rotate-x",
          "0deg"
        );

        card.style.setProperty(
          "--rotate-y",
          "0deg"
        );
      }
    );
  });

  /**
   * --------------------------------------------------------------------------
   * Trust-logo carousel
   * --------------------------------------------------------------------------
   */

  const trustCarousels =
    doc.querySelectorAll(
      selectors.trustCarousel
    );

  trustCarousels.forEach((carousel) => {
    const track =
      carousel.querySelector(
        selectors.trustTrack
      );

    if (!track) return;

    const originalItems =
      Array.from(track.children).filter(
        (item) =>
          item.dataset.carouselClone !==
          "true"
      );

    if (!originalItems.length) return;

    if (
      track.dataset.carouselPrepared !==
      "true"
    ) {
      originalItems.forEach((item) => {
        const clone =
          item.cloneNode(true);

        clone.dataset.carouselClone =
          "true";

        clone.setAttribute(
          "aria-hidden",
          "true"
        );

        clone
          .querySelectorAll("img")
          .forEach((image) => {
            image.alt = "";
          });

        track.appendChild(clone);
      });

      track.dataset.carouselPrepared =
        "true";
    }

    let currentIndex = 0;
    let itemWidth = 0;
    let gap = 16;
    let intervalId = 0;
    let resetTimeoutId = 0;

    const getVisibleCount = () => {
      if (window.innerWidth <= 680) {
        return 2.5;
      }

      if (window.innerWidth <= 1050) {
        return 3;
      }

      return 3.5;
    };

    const calculateCarousel = () => {
      const availableWidth =
        carousel.clientWidth;

      if (!availableWidth) return;

      gap =
        window.innerWidth <= 680
          ? 13
          : 16;

      const visibleCount =
        getVisibleCount();

      itemWidth =
        (
          availableWidth -
          gap * (visibleCount - 1)
        ) / visibleCount;

      Array.from(track.children).forEach(
        (item) => {
          item.style.flexBasis =
            `${itemWidth}px`;

          item.style.width =
            `${itemWidth}px`;
        }
      );

      track.style.gap = `${gap}px`;
      track.style.transition = "none";

      track.style.transform =
        `translateX(-${
          currentIndex *
          (itemWidth + gap)
        }px)`;

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          track.style.transition =
            "transform 550ms ease";
        });
      });
    };

    const moveCarousel = () => {
      currentIndex += 1;

      track.style.transform =
        `translateX(-${
          currentIndex *
          (itemWidth + gap)
        }px)`;

      if (
        currentIndex >=
        originalItems.length
      ) {
        window.clearTimeout(
          resetTimeoutId
        );

        resetTimeoutId =
          window.setTimeout(() => {
            track.style.transition =
              "none";

            currentIndex = 0;

            track.style.transform =
              "translateX(0px)";

            window.requestAnimationFrame(
              () => {
                window.requestAnimationFrame(
                  () => {
                    track.style.transition =
                      "transform 550ms ease";
                  }
                );
              }
            );
          }, 590);
      }
    };

    const stopCarousel = () => {
      if (!intervalId) return;

      window.clearInterval(
        intervalId
      );

      intervalId = 0;
    };

    const startCarousel = () => {
      stopCarousel();

      if (
        state.reduceMotion ||
        originalItems.length < 2
      ) {
        return;
      }

      intervalId =
        window.setInterval(
          moveCarousel,
          2500
        );
    };

    carousel.addEventListener(
      "mouseenter",
      stopCarousel
    );

    carousel.addEventListener(
      "mouseleave",
      startCarousel
    );

    carousel.addEventListener(
      "focusin",
      stopCarousel
    );

    carousel.addEventListener(
      "focusout",
      startCarousel
    );

    carousel._calculateCarousel =
      calculateCarousel;

    calculateCarousel();
    startCarousel();
  });

  /**
   * --------------------------------------------------------------------------
   * Seamless review marquees
   * --------------------------------------------------------------------------
   */

  const marqueeContainers =
    doc.querySelectorAll(
      selectors.reviewMarquees
    );

  const prepareMarquee = (row) => {
    const track =
      row.querySelector(
        ".review-marquee__track"
      );

    const originalGroup =
      track?.querySelector(
        '.review-marquee__group:not([data-clone="true"])'
      );

    if (!track || !originalGroup) return;

    track.classList.remove("is-ready");

    track
      .querySelectorAll(
        '.review-marquee__group[data-clone="true"]'
      )
      .forEach((clone) => {
        clone.remove();
      });

    const clonedGroup =
      originalGroup.cloneNode(true);

    clonedGroup.dataset.clone = "true";

    clonedGroup.setAttribute(
      "aria-hidden",
      "true"
    );

    clonedGroup
      .querySelectorAll(
        ".review-card"
      )
      .forEach((card) => {
        card.setAttribute(
          "tabindex",
          "-1"
        );
      });

    clonedGroup
      .querySelectorAll("img")
      .forEach((image) => {
        image.alt = "";
      });

    track.appendChild(clonedGroup);

    window.requestAnimationFrame(() => {
      const styles =
        window.getComputedStyle(track);

      const gap =
        Number.parseFloat(
          styles.columnGap ||
          styles.gap
        ) || 18;

      const groupWidth =
        originalGroup
          .getBoundingClientRect()
          .width;

      const distance =
        groupWidth + gap;

      const duration =
        Number.parseFloat(
          row.dataset.speed || "44"
        );

      track.style.setProperty(
        "--marquee-distance-negative",
        `${distance * -1}px`
      );

      track.style.setProperty(
        "--marquee-duration",
        `${duration}s`
      );

      track.classList.add("is-ready");
    });
  };

  marqueeContainers.forEach(
    (container) => {
      const rows =
        container.querySelectorAll(
          ".review-marquee"
        );

      rows.forEach(prepareMarquee);

      container._prepareMarquees = () => {
        rows.forEach(prepareMarquee);
      };
    }
  );

  /**
   * --------------------------------------------------------------------------
   * FAQ accordion
   * --------------------------------------------------------------------------
   */

  const faqLists =
    doc.querySelectorAll(
      selectors.faqList
    );

  const closeFaqItem = (item) => {
    const button =
      item.querySelector("button");

    const answer =
      item.querySelector(".faq-answer");

    if (!button || !answer) return;

    item.classList.remove("is-active");

    button.setAttribute(
      "aria-expanded",
      "false"
    );

    answer.style.height = "0px";
  };

  const openFaqItem = (item) => {
    const button =
      item.querySelector("button");

    const answer =
      item.querySelector(".faq-answer");

    if (!button || !answer) return;

    item.classList.add("is-active");

    button.setAttribute(
      "aria-expanded",
      "true"
    );

    answer.style.height =
      `${answer.scrollHeight}px`;
  };

  faqLists.forEach((list) => {
    const items =
      list.querySelectorAll(
        ".faq-item"
      );

    items.forEach((item) => {
      const button =
        item.querySelector("button");

      if (!button) return;

      button.addEventListener(
        "click",
        () => {
          const wasOpen =
            item.classList.contains(
              "is-active"
            );

          items.forEach((otherItem) => {
            if (otherItem !== item) {
              closeFaqItem(otherItem);
            }
          });

          if (wasOpen) {
            closeFaqItem(item);
          } else {
            openFaqItem(item);
          }
        }
      );
    });

    const initialItem =
      list.querySelector(
        ".faq-item.is-active"
      );

    if (initialItem) {
      openFaqItem(initialItem);
    }

    list._recalculateOpenFaq = () => {
      const openItem =
        list.querySelector(
          ".faq-item.is-active"
        );

      if (openItem) {
        openFaqItem(openItem);
      }
    };
  });

  /**
   * --------------------------------------------------------------------------
   * Current year
   * --------------------------------------------------------------------------
   */

  doc
    .querySelectorAll(
      selectors.currentYear
    )
    .forEach((element) => {
      element.textContent =
        String(new Date().getFullYear());
    });

  /**
   * --------------------------------------------------------------------------
   * Video playback resilience
   * --------------------------------------------------------------------------
   */

  doc
    .querySelectorAll(
      "video[autoplay]"
    )
    .forEach((video) => {
      const tryPlayback = () => {
        const playbackPromise =
          video.play();

        if (
          playbackPromise &&
          typeof playbackPromise.catch ===
          "function"
        ) {
          playbackPromise.catch(() => {
            video.controls = true;
          });
        }
      };

      if (video.readyState >= 2) {
        tryPlayback();
      } else {
        video.addEventListener(
          "loadeddata",
          tryPlayback,
          { once: true }
        );
      }
    });

  /**
   * --------------------------------------------------------------------------
   * Resize handling
   * --------------------------------------------------------------------------
   */

  const recalculateResponsiveComponents =
    debounce(() => {
      calculateFoldThreshold();

      if (
        header?.classList.contains(
          "is-sticky"
        ) &&
        headerSpacer
      ) {
        headerSpacer.style.height =
          `${header.offsetHeight}px`;
      }

      if (window.innerWidth > 1260) {
        closeMobileMenu();
      }

      trustCarousels.forEach(
        (carousel) => {
          carousel._calculateCarousel?.();
        }
      );

      marqueeContainers.forEach(
        (container) => {
          container._prepareMarquees?.();
        }
      );

      faqLists.forEach((list) => {
        list._recalculateOpenFaq?.();
      });

      requestScrollUpdate();
    }, 160);

  window.addEventListener(
    "resize",
    recalculateResponsiveComponents
  );

  /**
   * --------------------------------------------------------------------------
   * Scroll handling
   * --------------------------------------------------------------------------
   */

  window.addEventListener(
    "scroll",
    requestScrollUpdate,
    { passive: true }
  );

  /**
   * --------------------------------------------------------------------------
   * Page-load hash correction
   * --------------------------------------------------------------------------
   */

  const correctInitialHashPosition = () => {
    if (!window.location.hash) return;

    let target = null;

    try {
      target = doc.querySelector(
        window.location.hash
      );
    } catch (error) {
      target = null;
    }

    if (!target) return;

    window.setTimeout(() => {
      scrollToTarget(target, false);
    }, 80);
  };

  /**
   * --------------------------------------------------------------------------
   * Initialize
   * --------------------------------------------------------------------------
   */

  const initialize = () => {
    calculateFoldThreshold();
    runScrollUpdate();
    correctInitialHashPosition();

    root.classList.add("js-ready");
  };

  if (doc.readyState === "complete") {
    initialize();
  } else {
    window.addEventListener(
      "load",
      initialize,
      { once: true }
    );
  }
})();