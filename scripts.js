// scripts.js
// Dark-only site. Handles proximity glow, clipboard copy with icon toggle, and check icon pop.

(function () {
  "use strict";

  // ===== Utilities =====
  function raf(fn) { return window.requestAnimationFrame(fn); }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        var ok = document.execCommand("copy");
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error("execCommand failed"));
      } catch (err) { reject(err); }
    });
  }

  function announce(msg) {
    var live = document.getElementById("live");
    if (!live) return;
    live.textContent = "";
    setTimeout(function () { live.textContent = msg; }, 10);
  }

  // Retrigger CSS animation on an element
  function playCheckPop(el) {
    if (!el) return;
    el.classList.remove("copy-check-pop");
    // force reflow to restart the animation
    void el.offsetWidth;
    el.classList.add("copy-check-pop");
  }

  // Bind copy behavior to a container that has data-copy and two svg icons
  function bindCopy(container, copiedText, announceMsg) {
    if (!container) return;
    var iconCopy = container.querySelector('[data-icon="copy"]');
    var iconCheck = container.querySelector('[data-icon="check"]');

    function runCopy() {
      copyToClipboard(copiedText).then(function () {
        if (iconCopy && iconCheck) {
          iconCopy.classList.add("hidden");
          iconCheck.classList.remove("hidden");
          playCheckPop(iconCheck);
          setTimeout(function () {
            iconCheck.classList.add("hidden");
            iconCopy.classList.remove("hidden");
          }, 1200);
        }
        if (announceMsg) announce(announceMsg);
      }).catch(function () { /* noop */ });
    }

    container.addEventListener("click", runCopy);
    container.addEventListener("keypress", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); runCopy(); }
    });
  }

  // ===== Proximity Glow =====
  function setupProximityGlow() {
    var cards = Array.prototype.slice.call(document.querySelectorAll(".glow-card"));
    if (!cards.length) return;

    var rects = [];
    var ticking = false;

    function refreshRects() {
      rects = cards.map(function (el) { return el.getBoundingClientRect(); });
    }

    function onMove(e) {
      var mx = e.clientX, my = e.clientY;
      if (ticking) return;
      ticking = true;

      raf(function () {
        for (var i = 0; i < cards.length; i++) {
          var el = cards[i], r = rects[i];
          if (!r) continue;

          // clamp point to rect for gradient anchor
          var cx = Math.max(r.left, Math.min(mx, r.right));
          var cy = Math.max(r.top, Math.min(my, r.bottom));

          // distance outside rect (0 when inside)
          var dx = (mx < r.left) ? (r.left - mx) : (mx > r.right ? mx - r.right : 0);
          var dy = (my < r.top) ? (r.top - my) : (my > r.bottom ? my - r.bottom : 0);
          var dist = Math.hypot(dx, dy);

          var thresholdAttr = parseFloat(el.getAttribute("data-glow-threshold"));
          var threshold = isNaN(thresholdAttr) ? 220 : thresholdAttr;
          var inside = (dx === 0 && dy === 0);

          // intensity falloff
          var t = inside ? 1 : Math.max(0, 1 - (dist / threshold));
          var opacity = t > 0 ? (inside ? 0.9 : t * 0.75) : 0;
          var alpha = t > 0 ? (inside ? 0.50 : t * 0.40) : 0;

          // convert to element-local percentages
          var px = ((cx - r.left) / r.width) * 100;
          var py = ((cy - r.top) / r.height) * 100;

          el.style.setProperty("--glow-x", px.toFixed(2) + "%");
          el.style.setProperty("--glow-y", py.toFixed(2) + "%");
          el.style.setProperty("--glow-o", opacity.toFixed(3));
          el.style.setProperty("--glow-a", alpha.toFixed(3));
        }
        ticking = false;
      });
    }

    refreshRects();

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", function () {
      refreshRects();
    }, { passive: true });

    // refresh after scrolling with rAF throttle
    var scrollTick = false;
    window.addEventListener("scroll", function () {
      if (!scrollTick) {
        scrollTick = true;
        raf(function () {
          refreshRects();
          scrollTick = false;
        });
      }
    }, { passive: true });
  }

  // ===== Init =====
  document.addEventListener("DOMContentLoaded", function () {
    // Proximity glow
    setupProximityGlow();

    // Discord copy
    var discordBtn = document.getElementById("discord-copy-btn");
    if (discordBtn) {
      var discordTag = discordBtn.getAttribute("data-copy") || "ThrowTop";
      bindCopy(discordBtn, discordTag, "Discord copied.");
    }

    // Backup command copy
    var backupCard = document.getElementById("backup-copy-card");
    if (backupCard) {
      var cmd = backupCard.getAttribute("data-copy") || "irm backup.throwtop.dev | iex";
      bindCopy(backupCard, cmd, "Backup command copied.");
    }
  });
})();
