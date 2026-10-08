/* =========================================================
   NYXOR PERSONAL SITE — single source of editable content
   Replace the example values below with your real data.
   ========================================================= */
const SITE = {
  name: "Nyxor",
  role: "Coder · IT student · Developer",
  email: "abdelmounaimameur52@gmail.com",
  links: {
    github: "https://github.com/doliprane51",
    tiktok: "https://www.tiktok.com/@es.ameur",
    snapchat: "https://www.snapchat.com/add/es.ameur",
    spotify: "https://open.spotify.com/user/316nsxtnhcsiqg2rhbtes3xg7yk4",
    discord: "https://discordapp.com/users/1557767270250319902"
  },

  /* EXAMPLE METRICS — replace these with real values. */
  metrics: [
    { value: "03+", label: "practice projects" },
    { value: "04", label: "core focus areas" },
    { value: "2026", label: "current build year" },
    { value: "∞", label: "things left to learn" }
  ],

  skills: [
    { category: "Dev", items: ["Python", "JavaScript", "HTML / CSS", "Git", "REST basics"] },
    { category: "Security", items: ["Networking", "Linux", "Nmap", "OWASP basics", "Defensive security"] },
    { category: "Tools", items: ["VS Code", "GitHub", "Wireshark", "Virtual machines", "CLI workflows"] }
  ],

  projects: [
    {
      title: "LogLens",
      category: "Python utility",
      description: "A small command-line tool that parses local log files, highlights suspicious patterns and exports a readable summary.",
      stack: ["Python", "CLI", "Regex"],
      url: "https://github.com/doliprane51"
    },
    {
      title: "NetScope",
      category: "Network lab",
      description: "A modest learning scanner for a private lab network, designed to map hosts and common service ports with clear output.",
      stack: ["Python", "Sockets", "Networking"],
      url: "https://github.com/doliprane51"
    },
    {
      title: "Nullspace",
      category: "Web experiment",
      description: "A responsive personal dashboard exploring semantic HTML, accessible components and a terminal-inspired visual language.",
      stack: ["HTML", "CSS", "JavaScript"],
      url: "https://github.com/doliprane51"
    },
    {
      title: "Packet Notes",
      category: "Study tool",
      description: "A compact browser reference for networking concepts, commands and troubleshooting notes built as a fast static site.",
      stack: ["HTML", "CSS", "JS"],
      url: "https://github.com/doliprane51"
    }
  ],

  journey: [
    { year: "NOW", title: "IT studies & independent projects", text: "Building fundamentals across development, systems, networking and cybersecurity." },
    { year: "NEXT", title: "Deeper security practice", text: "Moving from theory to controlled labs, better tooling and stronger defensive habits." },
    { year: "LATER", title: "Real-world experience", text: "Internships, team projects and production constraints — the next field tests." }
  ],

  socials: [
    { key: "github", label: "GitHub", handle: "@doliprane51", url: "https://github.com/doliprane51", accent: "#f0f6f3", icon: "github" },
    { key: "tiktok", label: "TikTok", handle: "@es.ameur", url: "https://www.tiktok.com/@es.ameur", accent: "#8de8df", icon: "tiktok" },
    { key: "snapchat", label: "Snapchat", handle: "@es.ameur", url: "https://www.snapchat.com/add/es.ameur", accent: "#f4e66b", icon: "snapchat" },
    { key: "spotify", label: "Spotify", handle: "public profile", url: "https://open.spotify.com/user/316nsxtnhcsiqg2rhbtes3xg7yk4", accent: "#5df08d", icon: "spotify" },
    { key: "discord", label: "Discord", handle: "es.ameur", url: "https://discordapp.com/users/1557767270250319902", accent: "#9ca8ff", icon: "discord" }
  ]
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const icons = {
  github: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 19c-4 .9-4-2-5-2m10 4v-3.9c0-1.1-.4-1.9-1-2.4 3.3-.4 6.8-1.6 6.8-7a5.5 5.5 0 0 0-1.5-3.9A5.1 5.1 0 0 0 18.2.4S17 0 12 3.4C7 0 5.8.4 5.8.4A5.1 5.1 0 0 0 4.5 1.8 5.5 5.5 0 0 0 3 5.7c0 5.4 3.5 6.6 6.8 7-.6.5-1 1.3-1 2.4V21"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.2 4.1c.8 1.7 2.1 2.8 4.1 3v3.2a8.6 8.6 0 0 1-4-1.2v6.2a5.7 5.7 0 1 1-5.7-5.7c.4 0 .8 0 1.2.1V13a2.5 2.5 0 1 0 1.7 2.3V2h2.7c0 .8 0 1.4 0 2.1Z"/></svg>',
  snapchat: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.1c-3.4 0-5.1 2.2-5.1 5.3v2.2c0 .6-.4 1-1 1H4.8c-.6 0-.9.4-.6.9.5.8 1.5 1.2 2.2 1.5.3.1.4.3.2.6-.4.7-1.1 1.1-1.8 1.3-.4.1-.5.6-.1.8.8.5 1.8.6 2.6.8.3.1.5.2.6.6.2 1 1.1 1.1 1.7 1.1.4 0 .8.1 1.2.4.4.3.8.5 1.2.5s.8-.2 1.2-.5c.4-.3.8-.4 1.2-.4.6 0 1.5-.1 1.7-1.1.1-.4.3-.5.6-.6.8-.2 1.8-.3 2.6-.8.4-.2.3-.7-.1-.8-.7-.2-1.4-.6-1.8-1.3-.2-.3-.1-.5.2-.6.7-.3 1.7-.7 2.2-1.5.3-.5 0-.9-.6-.9h-1.1c-.6 0-1-.4-1-1V8.4c0-3.1-1.7-5.3-5.1-5.3Z"/></svg>',
  spotify: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9.2"/><path d="M7.4 9.3c3-.9 6.8-.7 9.5.6M7.9 12.3c2.5-.7 5.8-.5 8 .5M8.7 15c1.9-.5 4.2-.4 5.9.3"/></svg>',
  discord: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.3 6.4A12.7 12.7 0 0 1 12 5.3c1.7 0 3.2.4 4.7 1.1.9 1.4 1.6 3.1 1.8 5.1-.7.9-1.6 1.7-2.6 2.3-.3-.4-.6-.8-.8-1.2.5-.2 1-.5 1.4-.8M7.3 6.4a13.2 13.2 0 0 0-1.8 5.1c.7.9 1.6 1.7 2.6 2.3.3-.4.6-.8.8-1.2-.5-.2-1-.5-1.4-.8M9.1 11.1h.1M14.8 11.1h.1"/></svg>'
};

function renderSocials() {
  $("#socialGrid").innerHTML = SITE.socials.map(item => `
    <a class="social-card reveal" href="${item.url}" target="_blank" rel="noopener noreferrer" style="--social-accent:${item.accent}" aria-label="${item.label}, ${item.handle}">
      <span class="social-icon">${icons[item.icon]}</span>
      <span class="social-arrow">↗</span>
      <h3>${item.label}</h3>
      <p>${item.handle}</p>
    </a>
  `).join("");

  $("#secondaryLinks").innerHTML = [
    { label: "GitHub", url: SITE.links.github },
    { label: "Discord", url: SITE.links.discord }
  ].map(item => `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.label} ↗</a>`).join("");
}

function renderMetrics() {
  $("#metrics").innerHTML = SITE.metrics.map(item => `
    <div class="metric"><strong>${item.value}</strong><span>${item.label}</span></div>
  `).join("");
}

function renderSkills() {
  $("#skillsGrid").innerHTML = SITE.skills.map(group => `
    <article class="skill-group reveal">
      <h3>${group.category}</h3>
      <div class="skill-list">${group.items.map(skill => `<span>${skill}</span>`).join("")}</div>
    </article>
  `).join("");
}

function renderProjects() {
  $("#projectGrid").innerHTML = SITE.projects.map((project, index) => `
    <article class="project-card reveal" data-index="0${index + 1}">
      <div class="project-top">
        <span class="project-kicker">${project.category}</span>
        <a class="project-link" href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${project.title} on GitHub">↗</a>
      </div>
      <div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="stack">${project.stack.map(tag => `<span>${tag}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");
}

function renderTimeline() {
  $("#timeline").innerHTML = SITE.journey.map(item => `
    <article class="timeline-item reveal">
      <div class="timeline-year">${item.year}</div>
      <div><h3>${item.title}</h3><p>${item.text}</p></div>
    </article>
  `).join("");
}

function setupTheme() {
  const root = document.documentElement;
  const stored = localStorage.getItem("nyxor-theme");
  const systemLight = matchMedia("(prefers-color-scheme: light)").matches;
  root.dataset.theme = stored || (systemLight ? "light" : "dark");

  $("#themeToggle").addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    localStorage.setItem("nyxor-theme", next);
  });
}

function setupReveal() {
  const elements = $$(".reveal");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  elements.forEach(el => observer.observe(el));
}

function setupAudio() {
  const audio = $("#audio");
  const player = $("#player");
  const toggle = $("#playToggle");
  const progress = $("#progress");
  const current = $("#currentTime");
  const duration = $("#duration");
  const state = $("#playerState");

  const format = seconds => {
    if (!Number.isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const sync = () => {
    current.textContent = format(audio.currentTime);
    duration.textContent = format(audio.duration);
    progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  };

  toggle.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      state.textContent = "ADD AUDIO";
    }
  });

  $("#restartAudio").addEventListener("click", () => {
    audio.currentTime = 0;
    sync();
  });

  progress.addEventListener("input", () => {
    if (audio.duration) audio.currentTime = (Number(progress.value) / 100) * audio.duration;
  });

  audio.addEventListener("loadedmetadata", sync);
  audio.addEventListener("timeupdate", sync);
  audio.addEventListener("play", () => { player.classList.add("is-playing"); state.textContent = "PLAYING"; });
  audio.addEventListener("pause", () => { player.classList.remove("is-playing"); state.textContent = "PAUSED"; });
  audio.addEventListener("ended", () => { player.classList.remove("is-playing"); state.textContent = "ENDED"; });
  audio.addEventListener("error", () => { state.textContent = "ADD AUDIO"; });
}

function setupCopyEmail() {
  $("#copyEmail").addEventListener("click", async () => {
    const button = $("#copyEmail");
    const original = button.innerHTML;
    try {
      await navigator.clipboard.writeText(SITE.email);
      button.textContent = "Copied ✓";
    } catch {
      button.textContent = "Copy unavailable";
    }
    setTimeout(() => button.innerHTML = original, 1600);
  });
}

function setupCursor() {
  if (!matchMedia("(pointer:fine) and (min-width:900px)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const orb = $(".cursor-orb");
  let x = -100, y = -100;
  addEventListener("pointermove", event => {
    x = event.clientX; y = event.clientY;
    orb.style.left = `${x}px`; orb.style.top = `${y}px`;
  }, { passive: true });
  document.addEventListener("pointerover", event => {
    if (event.target.closest("a, button, input")) orb.style.transform = "translate(-50%,-50%) scale(1.7)";
  });
  document.addEventListener("pointerout", event => {
    if (event.target.closest("a, button, input")) orb.style.transform = "translate(-50%,-50%) scale(1)";
  });
}

function setupCommands() {
  const dialog = $("#commandPalette");
  const input = $("#commandInput");
  const list = $("#commandList");
  let active = 0;

  const commands = [
    { label: "Go to About", key: "about", action: () => location.hash = "about" },
    { label: "Go to Skills", key: "skills", action: () => location.hash = "skills" },
    { label: "Go to Projects", key: "projects", action: () => location.hash = "projects" },
    { label: "Go to Journey", key: "journey", action: () => location.hash = "journey" },
    { label: "Go to Contact", key: "contact", action: () => location.hash = "contact" },
    { label: "Copy email", key: "copy", action: () => $("#copyEmail").click() },
    { label: "Open GitHub", key: "github", action: () => window.open(SITE.links.github, "_blank", "noopener,noreferrer") },
    { label: "Toggle theme", key: "theme", action: () => $("#themeToggle").click() }
  ];

  const render = query => {
    const filtered = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));
    active = Math.min(active, Math.max(0, filtered.length - 1));
    list.innerHTML = filtered.map((command, index) => `
      <button class="command-item ${index === active ? "is-active" : ""}" type="button" data-index="${index}">
        <span>${command.label}</span><span>${command.key}</span>
      </button>
    `).join("");
    $$(".command-item", list).forEach(button => button.addEventListener("click", () => {
      filtered[Number(button.dataset.index)].action();
      dialog.close();
    }));
  };

  const open = () => {
    if (!dialog.open) dialog.showModal();
    input.value = "";
    active = 0;
    render("");
    requestAnimationFrame(() => input.focus());
  };

  $("#commandOpen").addEventListener("click", open);
  $("#commandClose").addEventListener("click", () => dialog.close());
  input.addEventListener("input", () => { active = 0; render(input.value); });
  input.addEventListener("keydown", event => {
    const items = $$(".command-item", list);
    if (event.key === "ArrowDown") { event.preventDefault(); active = Math.min(active + 1, items.length - 1); render(input.value); }
    if (event.key === "ArrowUp") { event.preventDefault(); active = Math.max(active - 1, 0); render(input.value); }
    if (event.key === "Enter" && items[active]) { event.preventDefault(); items[active].click(); }
  });

  addEventListener("keydown", event => {
    const modifier = event.ctrlKey || event.metaKey;
    if (event.key === "/" || (modifier && event.key.toLowerCase() === "k")) {
      const target = document.activeElement;
      if (target?.matches("input, textarea")) return;
      event.preventDefault();
      open();
    }
  });
}

function setupLoading() {
  const boot = $("#bootScreen");
  if (!boot) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    boot.remove();
    return;
  }
  const hide = () => {
    boot.classList.add("is-hidden");
    setTimeout(() => boot.remove(), 320);
  };
  if (document.readyState === "complete") setTimeout(hide, 180);
  else addEventListener("load", () => setTimeout(hide, 180), { once: true });
}

function init() {
  renderSocials();
  renderMetrics();
  renderSkills();
  renderProjects();
  renderTimeline();
  setupTheme();
  setupReveal();
  setupAudio();
  setupCopyEmail();
  setupCursor();
  setupCommands();
  $("#year").textContent = new Date().getFullYear();
  setupLoading();
}

init();
