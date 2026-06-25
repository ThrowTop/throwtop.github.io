import "./styles.css";
import { cs2Settings, links, profile, projects, schema, setup } from "./data.js";

const icons = {
  copy: '<svg class="h-4 w-4 opacity-80" data-icon="copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15V5a2 2 0 0 1 2-2h10"></path></svg>',
  check: '<svg class="hidden h-4 w-4 text-emerald-400" data-icon="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"></path></svg>',
  external: '<svg class="h-4 w-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path></svg>',
};

const brandIcon = (name) =>
  `<img src="https://cdn.simpleicons.org/${name}/ffffff" alt="${name}" class="h-4 w-4" loading="lazy" decoding="async" referrerpolicy="no-referrer">`;

const specList = (items) =>
  `<ul class="space-y-1 text-sm">${items
    .map(([label, value]) => `<li><span class="text-neutral-400">${label}</span> <span class="text-gradient">${value}</span></li>`)
    .join("")}</ul>`;

function renderSocialLink(link) {
  return `<a href="${link.href}" target="_blank" rel="noopener noreferrer" class="copy-btn flex w-full items-center justify-between rounded-lg bg-white/5 px-4 py-2 text-sm text-neutral-200 transition hover:bg-white/10 active:bg-white/15">
    <span class="inline-flex items-center gap-2">${brandIcon(link.icon)}<span>${link.label}</span></span>
    ${icons.external}
  </a>`;
}

function renderProject(project) {
  if (project.command) {
    return `<li>
      <div role="button" tabindex="0" data-copy="${project.command}" class="copy-btn glow-card cursor-pointer select-none rounded-lg bg-white/5 p-3 backdrop-blur transition hover:shadow-md" data-glow-threshold="200">
        <div class="inline-flex items-center gap-2">
          <span class="font-semibold">${project.name}</span>
          <span class="inline-flex items-center">${icons.copy}${icons.check}</span>
        </div>
        ${project.description ? `<span class="block text-sm text-neutral-400">${project.description}</span>` : ""}
        <pre class="mt-1 block overflow-x-auto text-sm text-blue-400">${project.command}</pre>
      </div>
    </li>`;
  }

  return `<li>
    <a href="${project.href}" target="_blank" rel="noopener" class="project-link glow-card block rounded-lg bg-white/5 p-3 backdrop-blur transition hover:shadow-md" data-glow-threshold="200">
      <span class="font-semibold">${project.name}</span>
      <span class="block text-sm text-neutral-400">${project.description}</span>
    </a>
  </li>`;
}

function renderApp() {
  document.querySelector("#app").innerHTML = `
    <div class="bg-layer" aria-hidden="true">
      <div class="absolute inset-0 bg-grid-x opacity-90"></div>
      <div class="absolute inset-0 bg-grid-y opacity-90"></div>
      <div class="bg-blob absolute -left-20 -top-24 h-[40rem] w-[40rem] rounded-full bg-fuchsia-600/20"></div>
      <div class="bg-blob absolute -bottom-28 -right-16 h-[44rem] w-[44rem] rounded-full bg-blue-500/20"></div>
      <div class="bg-shear pointer-events-none absolute inset-0"></div>
    </div>

    <div class="mx-auto max-w-6xl px-4 pb-10 pt-10 md:pt-16">
      <div class="grid gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
        <aside class="self-start md:sticky md:top-8">
          <div class="glow-card rounded-xl bg-white/5 p-5 shadow-sm backdrop-blur">
            <div class="flex items-center gap-4">
              <a href="${profile.avatar}" target="_blank" rel="noopener" class="no-shine glow-card block rounded-full p-[2px]">
                <img src="${profile.avatar}" alt="ThrowTop profile picture" class="block h-16 w-16 rounded-full border border-white/10 bg-black object-cover">
              </a>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <h1 class="text-gradient text-2xl font-bold leading-tight tracking-tight">${profile.name}</h1>
                  <span class="flag-se" aria-label="${profile.location}" title="${profile.location}"></span>
                  <div class="steam-level" aria-label="Steam level ${profile.steamLevel}">
                    <span class="friendPlayerLevelNum">${profile.steamLevel}</span>
                  </div>
                </div>
                ${profile.description.map((line) => `<p class="text-sm text-neutral-400">${line}</p>`).join("")}
              </div>
            </div>

            <div class="mt-4 space-y-2">
              <button data-copy="${profile.discord}" class="copy-btn flex w-full items-center justify-between rounded-lg bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10 active:bg-white/15">
                <span class="inline-flex items-center gap-2 truncate">${brandIcon("discord")}<span class="font-medium">${profile.discord}</span></span>
                <span class="inline-flex items-center">${icons.copy}${icons.check}</span>
              </button>
              ${links.map(renderSocialLink).join("")}
            </div>
          </div>

          <div class="glow-card mt-6 rounded-xl bg-white/5 p-5 shadow-sm backdrop-blur">
            <h2 class="mb-3 text-base font-semibold tracking-tight">CS2 Settings</h2>
            ${specList(cs2Settings)}
          </div>
        </aside>

        <main class="space-y-6">
          <section class="glow-card rounded-xl bg-white/5 p-5 shadow-sm backdrop-blur" data-glow-threshold="220">
            <h2 class="mb-3 text-lg font-semibold tracking-tight">Projects</h2>
            <ul class="grid list-none gap-3 p-0 sm:grid-cols-2">${projects.map(renderProject).join("")}</ul>
          </section>

          <section class="glow-card rounded-xl bg-white/5 p-5 shadow-sm backdrop-blur" data-glow-threshold="220">
            <div class="grid gap-4 sm:grid-cols-2">
              ${setup
                .map(
                  (group) => `<div class="rounded-lg bg-white/5 p-4">
                    <h2 class="mb-3 text-lg font-semibold tracking-tight">${group.title}</h2>
                    ${specList(group.items)}
                  </div>`,
                )
                .join("")}
            </div>
          </section>
        </main>
      </div>
    </div>

    <footer class="px-4 py-8 text-center text-sm text-neutral-400">
      Built with <span class="font-semibold">Tailwind CSS</span>. Hosted on
      <a href="https://pages.github.com" target="_blank" rel="noopener" class="text-blue-400 hover:underline">GitHub Pages</a>.
    </footer>`;

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.body.appendChild(script);
}

function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }

  return new Promise((resolve, reject) => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      ok ? resolve() : reject(new Error("execCommand failed"));
    } catch (error) {
      reject(error);
    }
  });
}

function announce(message) {
  const live = document.getElementById("live");
  if (!live) return;
  live.textContent = "";
  setTimeout(() => {
    live.textContent = message;
  }, 10);
}

function playPop(element) {
  if (!element) return;
  element.classList.remove("copy-check-pop");
  void element.offsetWidth;
  element.classList.add("copy-check-pop");
  element.addEventListener(
    "animationend",
    () => {
      element.classList.remove("copy-check-pop");
    },
    { once: true },
  );
}

function bindCopy(container) {
  const copiedText = container.dataset.copy;
  const iconCopy = container.querySelector('[data-icon="copy"]');
  const iconCheck = container.querySelector('[data-icon="check"]');
  if (!copiedText || !iconCopy || !iconCheck) return;

  const iconWrap = iconCopy.parentElement;
  iconWrap.classList.add("icon-swap");
  iconCopy.classList.remove("hidden");
  iconCheck.classList.remove("hidden");
  iconCopy.classList.add("is-visible");

  let revertTimer;

  const showCopy = () => {
    iconCheck.classList.remove("is-visible");
    iconCopy.classList.add("is-visible");
    requestAnimationFrame(() => playPop(iconCopy));
  };

  const runCopy = () => {
    copyToClipboard(copiedText)
      .then(() => {
        iconCopy.classList.remove("is-visible");
        iconCheck.classList.add("is-visible");
        playPop(iconCheck);
        announce("Copied.");
        clearTimeout(revertTimer);
        revertTimer = setTimeout(showCopy, 1200);
      })
      .catch(() => {});
  };

  container.addEventListener("click", runCopy);
  container.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      runCopy();
    }
  });
}

function setupProximityGlow() {
  const cards = [...document.querySelectorAll(".glow-card")];
  if (!cards.length) return;

  let rects = [];
  let ticking = false;

  const refreshRects = () => {
    rects = cards.map((element) => element.getBoundingClientRect());
  };

  const onMove = (event) => {
    const mx = event.clientX;
    const my = event.clientY;
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      cards.forEach((element, index) => {
        const rect = rects[index];
        if (!rect) return;

        const cx = Math.max(rect.left, Math.min(mx, rect.right));
        const cy = Math.max(rect.top, Math.min(my, rect.bottom));
        const dx = mx < rect.left ? rect.left - mx : mx > rect.right ? mx - rect.right : 0;
        const dy = my < rect.top ? rect.top - my : my > rect.bottom ? my - rect.bottom : 0;
        const distance = Math.hypot(dx, dy);
        const threshold = Number.parseFloat(element.dataset.glowThreshold) || 220;
        const inside = dx === 0 && dy === 0;
        const strength = inside ? 1 : Math.max(0, 1 - distance / threshold);
        const opacity = strength > 0 ? (inside ? 0.9 : strength * 0.75) : 0;
        const alpha = strength > 0 ? (inside ? 0.5 : strength * 0.4) : 0;

        element.style.setProperty("--glow-x", `${(((cx - rect.left) / rect.width) * 100).toFixed(2)}%`);
        element.style.setProperty("--glow-y", `${(((cy - rect.top) / rect.height) * 100).toFixed(2)}%`);
        element.style.setProperty("--glow-o", opacity.toFixed(3));
        element.style.setProperty("--glow-a", alpha.toFixed(3));
      });
      ticking = false;
    });
  };

  refreshRects();
  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("resize", refreshRects, { passive: true });
  window.addEventListener("scroll", refreshRects, { passive: true });
}

renderApp();
document.querySelectorAll("[data-copy]").forEach(bindCopy);
setupProximityGlow();
