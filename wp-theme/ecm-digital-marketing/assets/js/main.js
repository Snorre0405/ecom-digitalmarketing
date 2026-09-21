/* ECM WordPress-tema — delt JS.
   Navigation, søgning og alle foldud-sektioner (FAQ, "det lærer du",
   "du kender det allerede", "en dag på ECM") bruger nu WordPress' egne
   kerneblokke (Navigation, Search, Details), som er tilgængelige og
   fungerer uden JavaScript. Denne fil har derfor kun ét ansvar tilbage:
   den bløde "reveal on scroll"-animation. */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initReveal();
  });

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
      setTimeout(function () {
        items.forEach(function (el) { el.classList.add("is-visible"); });
        obs.disconnect();
      }, 2500);
    } else {
      items.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }
})();
