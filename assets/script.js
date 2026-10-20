(function () {
  "use strict";

  var root = document.documentElement;
  var navLinks = document.querySelector(".nav-links");
  var navToggle = document.getElementById("navToggle");

  // --- Mobile nav toggle ---
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Close mobile menu on link click or resize past breakpoint
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 760 && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // --- Active section highlight on scroll ---
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        Array.prototype.forEach.call(document.querySelectorAll(".nav-links a"), function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }
// --- Theme toggle (persisted) ---
  var themeBtn = document.getElementById("themeToggle");
  if (!themeBtn) {
    themeBtn = document.createElement("button");
    themeBtn.className = "theme-toggle";
    themeBtn.type = "button";
    themeBtn.setAttribute("aria-label", "Toggle color theme");
    themeBtn.innerHTML = "<span class='theme-icon'></span>";
    document.body.appendChild(themeBtn);
  }

  function applyTheme(theme) {
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    var icon = themeBtn.querySelector(".theme-icon") || themeBtn;
    icon.textContent = theme === "dark" ? "" : "";
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }
  themeBtn.addEventListener("click", function () {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
})();

  