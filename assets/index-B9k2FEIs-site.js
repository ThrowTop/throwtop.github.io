(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={name:`Throw`,location:`Sweden`,steamLevel:250,description:[`C++ developer.`,`CS2 enjoyer.`],avatar:`/pfp.jpg`,discord:`ThrowTop`},t=[{label:`Steam`,icon:`steam`,href:`https://steamcommunity.com/profiles/76561198952505877`},{label:`GitHub`,icon:`github`,href:`https://github.com/ThrowTop`},{label:`Main YouTube`,icon:`youtube`,href:`https://www.youtube.com/@ThrowTop`},{label:`Clips YouTube`,icon:`youtube`,href:`https://www.youtube.com/@ThrowClips`}],n=[{name:`HyprWin`,description:`C++ shortcut tool and window manager.`,href:`https://github.com/ThrowTop/HyprWin`},{name:`YouTube Uploader`,description:`Simple and efficient YouTube uploader.`,href:`https://github.com/ThrowTop/auto_uploader`},{name:`Backup Scripts`,command:`irm throwtop.dev/backup | iex`},{name:`Finalmouse CLI`,description:`Simple Finalmouse polling rate changer CLI.`,href:`https://github.com/ThrowTop/finalmouse`}],r=[[`DPI`,`800`],[`Sensitivity`,`1.10`],[`Resolution`,`1440x1080 @ 360Hz`],[`Aspect Ratio`,`4:3 Stretch`]],i=[{title:`Setup`,items:[[`CPU`,`Ryzen 7 7800X3D`],[`GPU`,`RTX 4070 Super`],[`RAM`,`DDR5 6000 MT/s`],[`Storage`,`Samsung 990 Pro 2 TB NVMe`],[`Motherboard`,`B650E Aorus Elite X AX ICE`],[`OS`,`Windows 11 24H2`],[`Display`,`Zowie XL2566K 360Hz`]]},{title:`Audio & Peripherals`,items:[[`Mic`,`RODE XDM-100`],[`Headset/IEM`,`HyperX Cloud II / KZ ZS10 Pro`],[`DAC`,`FiiO JA11`],[`Mouse`,`Finalmouse ULX Prophecy 8KHz`],[`Keyboard`,`IROK MG75 Pro 8KHz`],[`Tools`,`OBS, Equalizer APO, HyprWin`]]}],a={"@context":`https://schema.org`,"@type":`Person`,name:`ThrowTop`,url:`https://throwtop.dev/`,sameAs:[`https://github.com/ThrowTop`,`https://steamcommunity.com/profiles/76561198952505877`,`https://www.youtube.com/@ThrowTop`,`https://www.youtube.com/@ThrowClips`]},o={copy:`<svg class="h-4 w-4 opacity-80" data-icon="copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15V5a2 2 0 0 1 2-2h10"></path></svg>`,check:`<svg class="hidden h-4 w-4 text-emerald-400" data-icon="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"></path></svg>`,external:`<svg class="h-4 w-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path></svg>`},s=e=>`<img src="https://cdn.simpleicons.org/${e}/ffffff" alt="${e}" class="h-4 w-4" loading="lazy" decoding="async" referrerpolicy="no-referrer">`,c=e=>`<ul class="space-y-1 text-sm">${e.map(([e,t])=>`<li><span class="text-neutral-400">${e}</span> <span class="text-gradient">${t}</span></li>`).join(``)}</ul>`;function l(e){return`<a href="${e.href}" target="_blank" rel="noopener noreferrer" class="copy-btn flex w-full items-center justify-between rounded-lg bg-white/5 px-4 py-2 text-sm text-neutral-200 transition hover:bg-white/10 active:bg-white/15">
    <span class="inline-flex items-center gap-2">${s(e.icon)}<span>${e.label}</span></span>
    ${o.external}
  </a>`}function u(e){return e.command?`<li>
      <div role="button" tabindex="0" data-copy="${e.command}" class="copy-btn glow-card cursor-pointer select-none rounded-lg bg-white/5 p-3 backdrop-blur transition hover:shadow-md" data-glow-threshold="200">
        <div class="inline-flex items-center gap-2">
          <span class="font-semibold">${e.name}</span>
          <span class="inline-flex items-center">${o.copy}${o.check}</span>
        </div>
        ${e.description?`<span class="block text-sm text-neutral-400">${e.description}</span>`:``}
        <pre class="mt-1 block overflow-x-auto text-sm text-blue-400">${e.command}</pre>
      </div>
    </li>`:`<li>
    <a href="${e.href}" target="_blank" rel="noopener" class="project-link glow-card block rounded-lg bg-white/5 p-3 backdrop-blur transition hover:shadow-md" data-glow-threshold="200">
      <span class="font-semibold">${e.name}</span>
      <span class="block text-sm text-neutral-400">${e.description}</span>
    </a>
  </li>`}function d(){document.querySelector(`#app`).innerHTML=`
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
              <a href="${e.avatar}" target="_blank" rel="noopener" class="no-shine glow-card block rounded-full p-[2px]">
                <img src="${e.avatar}" alt="ThrowTop profile picture" class="block h-16 w-16 rounded-full border border-white/10 bg-black object-cover">
              </a>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <h1 class="text-gradient text-2xl font-bold leading-tight tracking-tight">${e.name}</h1>
                  <span class="flag-se" aria-label="${e.location}" title="${e.location}"></span>
                  <div class="steam-level" aria-label="Steam level ${e.steamLevel}">
                    <span class="friendPlayerLevelNum">${e.steamLevel}</span>
                  </div>
                </div>
                ${e.description.map(e=>`<p class="text-sm text-neutral-400">${e}</p>`).join(``)}
              </div>
            </div>

            <div class="mt-4 space-y-2">
              <button data-copy="${e.discord}" class="copy-btn flex w-full items-center justify-between rounded-lg bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10 active:bg-white/15">
                <span class="inline-flex items-center gap-2 truncate">${s(`discord`)}<span class="font-medium">${e.discord}</span></span>
                <span class="inline-flex items-center">${o.copy}${o.check}</span>
              </button>
              ${t.map(l).join(``)}
            </div>
          </div>

          <div class="glow-card mt-6 rounded-xl bg-white/5 p-5 shadow-sm backdrop-blur">
            <h2 class="mb-3 text-base font-semibold tracking-tight">CS2 Settings</h2>
            ${c(r)}
          </div>
        </aside>

        <main class="space-y-6">
          <section class="glow-card rounded-xl bg-white/5 p-5 shadow-sm backdrop-blur" data-glow-threshold="220">
            <h2 class="mb-3 text-lg font-semibold tracking-tight">Projects</h2>
            <ul class="grid list-none gap-3 p-0 sm:grid-cols-2">${n.map(u).join(``)}</ul>
          </section>

          <section class="glow-card rounded-xl bg-white/5 p-5 shadow-sm backdrop-blur" data-glow-threshold="220">
            <div class="grid gap-4 sm:grid-cols-2">
              ${i.map(e=>`<div class="rounded-lg bg-white/5 p-4">
                    <h2 class="mb-3 text-lg font-semibold tracking-tight">${e.title}</h2>
                    ${c(e.items)}
                  </div>`).join(``)}
            </div>
          </section>
        </main>
      </div>
    </div>

    <footer class="px-4 py-8 text-center text-sm text-neutral-400">
      Built with <span class="font-semibold">Tailwind CSS</span>. Hosted on
      <a href="https://pages.github.com" target="_blank" rel="noopener" class="text-blue-400 hover:underline">GitHub Pages</a>.
    </footer>`;let d=document.createElement(`script`);d.type=`application/ld+json`,d.textContent=JSON.stringify(a),document.body.appendChild(d)}function f(e){return navigator.clipboard?.writeText?navigator.clipboard.writeText(e):new Promise((t,n)=>{try{let r=document.createElement(`textarea`);r.value=e,r.style.position=`fixed`,r.style.left=`-9999px`,document.body.appendChild(r),r.focus(),r.select();let i=document.execCommand(`copy`);document.body.removeChild(r),i?t():n(Error(`execCommand failed`))}catch(e){n(e)}})}function p(e){let t=document.getElementById(`live`);t&&(t.textContent=``,setTimeout(()=>{t.textContent=e},10))}function m(e){e&&(e.classList.remove(`copy-check-pop`),e.offsetWidth,e.classList.add(`copy-check-pop`),e.addEventListener(`animationend`,()=>{e.classList.remove(`copy-check-pop`)},{once:!0}))}function h(e){let t=e.dataset.copy,n=e.querySelector(`[data-icon="copy"]`),r=e.querySelector(`[data-icon="check"]`);if(!t||!n||!r)return;n.parentElement.classList.add(`icon-swap`),n.classList.remove(`hidden`),r.classList.remove(`hidden`),n.classList.add(`is-visible`);let i,a=()=>{r.classList.remove(`is-visible`),n.classList.add(`is-visible`),requestAnimationFrame(()=>m(n))},o=()=>{f(t).then(()=>{n.classList.remove(`is-visible`),r.classList.add(`is-visible`),m(r),p(`Copied.`),clearTimeout(i),i=setTimeout(a,1200)}).catch(()=>{})};e.addEventListener(`click`,o),e.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),o())})}function g(){let e=[...document.querySelectorAll(`.glow-card`)];if(!e.length)return;let t=[],n=!1,r=()=>{t=e.map(e=>e.getBoundingClientRect())};r(),window.addEventListener(`mousemove`,r=>{let i=r.clientX,a=r.clientY;n||(n=!0,requestAnimationFrame(()=>{e.forEach((e,n)=>{let r=t[n];if(!r)return;let o=Math.max(r.left,Math.min(i,r.right)),s=Math.max(r.top,Math.min(a,r.bottom)),c=i<r.left?r.left-i:i>r.right?i-r.right:0,l=a<r.top?r.top-a:a>r.bottom?a-r.bottom:0,u=Math.hypot(c,l),d=Number.parseFloat(e.dataset.glowThreshold)||220,f=c===0&&l===0,p=f?1:Math.max(0,1-u/d),m=p>0?f?.9:p*.75:0,h=p>0?f?.5:p*.4:0;e.style.setProperty(`--glow-x`,`${((o-r.left)/r.width*100).toFixed(2)}%`),e.style.setProperty(`--glow-y`,`${((s-r.top)/r.height*100).toFixed(2)}%`),e.style.setProperty(`--glow-o`,m.toFixed(3)),e.style.setProperty(`--glow-a`,h.toFixed(3))}),n=!1}))},{passive:!0}),window.addEventListener(`resize`,r,{passive:!0}),window.addEventListener(`scroll`,r,{passive:!0})}d(),document.querySelectorAll(`[data-copy]`).forEach(h),g();