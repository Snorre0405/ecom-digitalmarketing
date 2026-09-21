/* ECM — delt JS for alle sider (svarer til WordPress theme.js / block-interaktivitet) */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initSearch();
    initAccordions();
    initTimeline();
    initActiveNav();
    initReveal();
  });

  // ---------- Mobil navigation ----------
  function initMobileNav() {
    var burger = document.getElementById("burgerBtn");
    var panel = document.getElementById("mobilePanel");
    if (!burger || !panel) return;
    burger.addEventListener("click", function () {
      var open = panel.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        panel.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("is-open")) {
        panel.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        burger.focus();
      }
    });
  }

  // ---------- Søgning (simpelt klient-side site-søg) ----------
  var SITE_PAGES = [
    { title: "Forside", url: "index.html", keywords: "forside hjem ecm" },
    { title: "Uddannelsen", url: "uddannelse.html", keywords: "uddannelse fag studie semester" },
    { title: "Studiemiljø", url: "studiemiljoe.html", keywords: "studiemiljø hverdag en dag på ecm" },
    { title: "Cases og projekter", url: "cases.html", keywords: "cases projekter opgaver eksempler" },
    { title: "Karriere + Muligheder", url: "karriere.html", keywords: "karriere job muligheder jobs" },
    { title: "Praktisk info", url: "praktisk-info.html", keywords: "praktisk info adgangskrav frister optagelse" },
    { title: "FAQ", url: "faq.html", keywords: "faq spørgsmål ofte stillede" },
    { title: "Mød os", url: "moed-os.html", keywords: "mød os om gruppen studerende team" },
    { title: "Kontakt", url: "kontakt.html", keywords: "kontakt mail skriv til os" },
    { title: "Er ECM noget for dig? (test)", url: "test.html", keywords: "test quiz match noget for dig" },
  ];

  function initSearch() {
    var toggle = document.getElementById("searchToggle");
    var panel = document.getElementById("searchPanel");
    var input = document.getElementById("searchInput");
    var form = document.getElementById("searchForm");
    var results = document.getElementById("searchResults");
    if (!toggle || !panel || !input || !form) return;

    toggle.addEventListener("click", function () {
      var open = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) setTimeout(function () { input.focus(); }, 150);
      else if (results) results.innerHTML = "";
    });

    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      if (!results) return;
      results.innerHTML = "";
      if (q.length < 1) return;
      var matches = SITE_PAGES.filter(function (p) {
        return (p.title + " " + p.keywords).toLowerCase().indexOf(q) !== -1;
      }).slice(0, 5);
      matches.forEach(function (m) {
        var a = document.createElement("a");
        a.href = m.url;
        a.textContent = m.title;
        a.style.cssText = "display:block;padding:8px 4px;font-size:0.92rem;text-decoration:underline;";
        results.appendChild(a);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = input.value.trim().toLowerCase();
      if (!q) return;
      var match = SITE_PAGES.find(function (p) {
        return (p.title + " " + p.keywords).toLowerCase().indexOf(q) !== -1;
      });
      if (match) window.location.href = match.url;
    });
  }

  // ---------- Accordion / FAQ ----------
  function initAccordions() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var isOpen = item.getAttribute("data-open") === "true";
        var group = item.closest(".faq-list");
        if (group) {
          group.querySelectorAll(".faq-item").forEach(function (i) {
            i.setAttribute("data-open", "false");
            var b = i.querySelector(".faq-q");
            if (b) b.setAttribute("aria-expanded", "false");
          });
        }
        if (!isOpen) {
          item.setAttribute("data-open", "true");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });

    document.querySelectorAll(".comp-cell").forEach(function (cell) {
      cell.addEventListener("click", function () {
        cell.classList.toggle("is-active");
      });
    });

    document.querySelectorAll(".flip-card").forEach(function (card) {
      card.addEventListener("click", function () {
        var active = card.classList.contains("is-active");
        document.querySelectorAll(".flip-card").forEach(function (c) { c.classList.remove("is-active"); });
        if (!active) card.classList.add("is-active");
      });
    });
  }

  // ---------- Timeline ("en dag på ECM") ----------
  function initTimeline() {
    document.querySelectorAll(".t-row").forEach(function (row) {
      row.addEventListener("click", function () {
        var open = row.getAttribute("aria-expanded") === "true";
        var group = row.closest(".timeline");
        if (group) {
          group.querySelectorAll(".t-row").forEach(function (r) { r.setAttribute("aria-expanded", "false"); });
        }
        if (!open) row.setAttribute("aria-expanded", "true");
      });
    });
  }

  // ---------- Aktiv nav-markering ----------
  function initActiveNav() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a, .mobile-panel a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === path) a.setAttribute("aria-current", "page");
    });
  }

  // ---------- Scroll reveal ----------
  // Sikkerhedsnet: hvis JS fejler, er langsomt, eller IntersectionObserver
  // aldrig når at observere et element (fx et hurtigt scroll-spring), skal
  // indhold aldrig blive usynligt permanent.
  function initReveal() {
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reduced) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.01, rootMargin: "0px 0px 400px 0px" });
      items.forEach(function (el) { obs.observe(el); });
      // Fallback: sørg for at alt er synligt senest kort efter load,
      // uanset om observeren nåede at trigge for hvert element.
      setTimeout(function () {
        items.forEach(function (el) { el.classList.add("is-visible"); });
        obs.disconnect();
      }, 2500);
    } else {
      items.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }
})();
