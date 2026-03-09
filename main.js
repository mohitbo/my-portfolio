const siteConfig = {
  communityName: "Mohit Borse",
  tagline: "Full-stack developer crafting digital experiences with passion.",
  intro: [
    "I'm a beginner full-stack developer interested in data science, knowledgeable in HTML, CSS, JavaScript, and Python, exploring machine learning and Java.",
  ],
  defaultAccent: "#ff7a1a",
};

function buildFrameSequence(basePath, pattern, frameCount, padTo = 3) {
  // Example: pattern = "frame_", result: `${basePath}/frame_000_delay-0.042s.webp`
  const frames = [];
  for (let i = 0; i < frameCount; i++) {
    const num = String(i).padStart(padTo, "0");
    frames.push(`${basePath}/${pattern}${num}_delay-0.042s.webp`);
  }
  return frames;
}

const themes = [
  {
    id: "about",
    index: "01",
    label: "About Me",
    accent: "#ff7a1a",
    heroTitleLines: ["Mohit","Borse"],
    heroSubheadline: "Building the future, one line of code at a time.",
    heroCopy:
      "With expertise in Python, HTML5, CSS, JavaScript I create scalable web applications that solve real-world problems. Let's collaborate on your next project.",
    kicker: "Hi, I'm",
    skills: [
      { index: "#01", label: "HTML" },
      { index: "#02", label: "CSS" },
      { index: "#03", label: "JavaScript" },
      { index: "#04", label: "Python" },
      { index: "#05", label: "Java" },
      { index: "#06", label: "Data Science" },
    ],
    sequence: buildFrameSequence(
      "/personal_images",
      "frame_",
      192
    ),
  },
  {
    id: "skills",
    index: "02",
    label: "My Skills",
    accent: "#fb923c",
    heroTitleLines: ["Tech Stack", "& Expertise"],
    heroSubheadline: "Modern technologies, proven results.",
    heroCopy:
      "From frontend frameworks to backend APIs, I work with cutting-edge tools to deliver high-performance, scalable solutions.",
    kicker: "What I do",
    skills:[
      { index: "#01", label: "JavaScript" },
      { index: "#02", label: "Python" },
      { index: "#03", label: "Data Science" },
      { index: "#04", label: "CSS" },
    ],
    sequence: buildFrameSequence(
      "/personal_images",
      "frame_",
      192
    ),
  },
  {
    id: "projects",
    index: "03",
    label: "My Projects",
    accent: "#f97316",
    heroTitleLines: ["Featured", "Work"],
    heroSubheadline: "Code that solves problems and creates value.",
    heroCopy:
      "Explore my portfolio of web applications, AI integrations, and innovative solutions built with modern technologies.",
    kicker: "What I've built",
    skills: [
      { index: "#01", label: "Web Applications" },
      { index: "#02", label: "AI Solutions" },
      { index: "#03", label: "Mobile Apps" },
      { index: "#04", label: "E-commerce" },
    ],
    sequence: buildFrameSequence(
      "/personal_images",
      "frame_",
      192
    ),
  },
  {
    id: "contact",
    index: "04",
    label: "Get In Touch",
    accent: "#fdba74",
    heroTitleLines: ["Let's", "Collaborate"],
    heroSubheadline: "Ready to bring your ideas to life?",
    heroCopy:
      "Whether you need a stunning website, AI-powered app, or technical consultation, I'm here to help turn your vision into reality.",
    kicker: "Let's work together",
    skills: [
      { index: "#01", label: "Web Development" },
      { index: "#02", label: "AI Integration" },
      { index: "#03", label: "Consulting" },
      { index: "#04", label: "Freelancing" },
    ],
    sequence: buildFrameSequence(
      "/personal_images",
      "frame_",
      192
    ),
  },
];

let currentTheme = themes[0];
let allFrames = [];
let preloadedImages = [];
let canvas, ctx;
let lastFrameIndex = -1;

function collectAllFrames() {
  const urls = new Set();
  themes.forEach((theme) => {
    theme.sequence.forEach((src) => urls.add(src));
  });
  allFrames = Array.from(urls);
  preloadedImages = allFrames.map(src => {
    const img = new Image();
    img.src = src;
    return img;
  });
}

function preloadFrames(onProgress, onDone) {
  const total = preloadedImages.length;
  if (!total) {
    onProgress(100);
    onDone();
    return;
  }
  let loaded = 0;

  const markLoaded = () => {
    loaded += 1;
    const pct = Math.round((loaded / total) * 100);
    onProgress(pct);
    if (loaded === total) {
      onDone();
    }
  };

  preloadedImages.forEach((img) => {
    if (img.complete) {
      markLoaded();
    } else {
      img.onload = markLoaded;
      img.onerror = markLoaded;
    }
  });
}

function setAccent(color) {
  document.documentElement.style.setProperty("--accent", color);
  document.documentElement.style.setProperty(
    "--accent-strong",
    color
  );
}

function applySiteCopy() {
  const heroTitleLine1 = document.getElementById("hero-title-line-1");
  const heroTitleLine2 = document.getElementById("hero-title-line-2");
  const heroIntro = document.getElementById("hero-intro");
  const heroKicker = document.getElementById("hero-kicker");
  const heroSubheadline = document.getElementById("hero-subheadline");
  const heroCopy = document.getElementById("hero-copy");
  const heroThemeIndex = document.getElementById("hero-theme-index");
  const heroThemeLabel = document.getElementById("hero-theme-label");
  const footerCommunityName = document.getElementById(
    "footer-community-name"
  );
  const heroSkills = document.getElementById("hero-skills");

  if (heroTitleLine1 && heroTitleLine2) {
    heroTitleLine1.textContent = currentTheme.heroTitleLines[0];
    heroTitleLine2.textContent =
      currentTheme.heroTitleLines[1] || siteConfig.communityName;
  }

  if (heroIntro) {
    heroIntro.textContent = siteConfig.intro.join(" ");
  }

  if (heroKicker) {
    heroKicker.textContent = currentTheme.kicker;
  }

  if (heroSubheadline) {
    heroSubheadline.textContent = currentTheme.heroSubheadline;
  }

  if (heroCopy) {
    heroCopy.textContent = currentTheme.heroCopy;
  }

  if (heroThemeIndex) {
    heroThemeIndex.textContent = currentTheme.index;
  }

  if (heroThemeLabel) {
    heroThemeLabel.textContent = currentTheme.label;
  }

  if (footerCommunityName) {
    footerCommunityName.textContent = siteConfig.communityName;
  }

  if (heroSkills && currentTheme.skills) {
    heroSkills.innerHTML = "";
    currentTheme.skills.forEach((skill) => {
      const div = document.createElement("div");
      div.className = "hero-skill";
      div.innerHTML = `
        <span class="hero-skill-index">${skill.index}</span>
        <span class="hero-skill-label">${skill.label}</span>
      `;
      heroSkills.appendChild(div);
    });
  }
}

function renderHeroFrames() {
  const sizing = ensureCanvasSize();
  if (!sizing) return;

  canvas = sizing.canvas;
  ctx = canvas.getContext("2d");

  // Draw first frame with proper scaling and aspect ratio
  if (preloadedImages.length > 0 && preloadedImages[0].complete) {
    drawImageCover(preloadedImages[0], ctx, sizing.width, sizing.height);
  }
}

function drawImageCover(img, ctx, canvasWidth, canvasHeight) {
  if (img && img.complete) {
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;
    if (!imgWidth || !imgHeight) {
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      return;
    }

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image: match width, crop top/bottom
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      // Canvas is taller than image: match height, crop sides
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  } else {
    // Fallback: draw a gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#ff7a1a');
    gradient.addColorStop(1, '#000000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }
}

function ensureCanvasSize() {
  const heroCanvas = document.getElementById("hero-canvas");
  if (!heroCanvas) return null;

  const dpr = window.devicePixelRatio || 1;
  const displayWidth = heroCanvas.clientWidth || heroCanvas.offsetWidth || 0;
  const displayHeight = heroCanvas.clientHeight || heroCanvas.offsetHeight || 0;

  if (!displayWidth || !displayHeight) {
    return null;
  }

  const targetWidth = Math.round(displayWidth * dpr);
  const targetHeight = Math.round(displayHeight * dpr);

  if (heroCanvas.width !== targetWidth || heroCanvas.height !== targetHeight) {
    heroCanvas.width = targetWidth;
    heroCanvas.height = targetHeight;
  }

  return {
    canvas: heroCanvas,
    width: targetWidth,
    height: targetHeight,
  };
}

function mapScrollToFrame() {
  if (!canvas || !ctx || !preloadedImages.length) return;

  const heroSection = document.querySelector(".hero-scroll");
  const spacer = document.querySelector(".hero-spacer");
  if (!heroSection || !spacer) return;

  const sectionTop = heroSection.offsetTop;
  const scrollY = window.scrollY || window.pageYOffset;
  const spacerHeight = spacer.offsetHeight || 1;
  const progress = Math.min(1, Math.max(0, (scrollY - sectionTop) / spacerHeight));

  const frameCount = preloadedImages.length;
  const frameProgress = progress * (frameCount - 1);
  const currentFrame = Math.floor(frameProgress);
  const nextFrame = Math.min(frameCount - 1, currentFrame + 1);
  const blend = frameProgress - currentFrame;

  // Ensure canvas matches current display size (important on mobile)
  const sizing = ensureCanvasSize();
  if (!sizing) return;

  // Clear canvas
  ctx.clearRect(0, 0, sizing.width, sizing.height);

  // Draw current frame
  if (preloadedImages[currentFrame] && preloadedImages[currentFrame].complete) {
    ctx.globalAlpha = 1 - blend;
    drawImageCover(preloadedImages[currentFrame], ctx, sizing.width, sizing.height);
  }

  // Draw next frame
  if (nextFrame !== currentFrame && preloadedImages[nextFrame] && preloadedImages[nextFrame].complete) {
    ctx.globalAlpha = blend;
    drawImageCover(preloadedImages[nextFrame], ctx, sizing.width, sizing.height);
  }

  ctx.globalAlpha = 1; // Reset
}

function throttle(fn, wait) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...args);
    }
  };
}

function setupScrollHandler() {
  const handler = throttle(() => {
    mapScrollToFrame();
  }, 16);
  window.addEventListener("scroll", handler, { passive: true });

  const resizeHandler = throttle(() => {
    const sizing = ensureCanvasSize();
    if (!sizing || !canvas || !ctx) return;
    mapScrollToFrame();
  }, 100);

  window.addEventListener("resize", resizeHandler, { passive: true });

  // Initial sizing + first frame render
  const initialSizing = ensureCanvasSize();
  if (initialSizing) {
    canvas = initialSizing.canvas;
    ctx = canvas.getContext("2d");
  }
  handler();
}

function buildThemeNav() {
  const list = document.getElementById("theme-nav-list");
  if (!list) return;

  list.innerHTML = "";

  themes.forEach((theme) => {
    const li = document.createElement("li");
    li.className = "theme-nav-item";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-nav-button";
    button.dataset.themeId = theme.id;

    const left = document.createElement("div");
    left.className = "theme-nav-left";

    const indexSpan = document.createElement("span");
    indexSpan.className = "theme-nav-index";
    indexSpan.textContent = theme.index;

    const titleSpan = document.createElement("span");
    titleSpan.className = "theme-nav-title";
    titleSpan.textContent = theme.label;

    left.appendChild(indexSpan);
    left.appendChild(titleSpan);

    const dot = document.createElement("span");
    dot.className = "theme-nav-dot";

    button.appendChild(left);
    button.appendChild(dot);

    li.appendChild(button);
    list.appendChild(li);

    if (theme.id === currentTheme.id) {
      button.classList.add("is-active");
    }

    button.addEventListener("click", () => switchTheme(theme.id));
  });
}

function setupExploreToggle() {
  const nav = document.querySelector(".hero-explore-nav");
  if (!nav) return;

  const toggleBtn = nav.querySelector(".explore-toggle-btn");
  const list = document.getElementById("theme-nav-list");
  if (!toggleBtn || !list) return;

  const updateExpanded = () => {
    const isOpen = nav.classList.contains("is-open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("is-open");
    updateExpanded();
  });

  // Start collapsed on small screens; open on larger screens via media queries
  nav.classList.remove("is-open");
  updateExpanded();
}

function switchTheme(themeId) {
  if (themeId === currentTheme.id) return;

  const next = themes.find((t) => t.id === themeId);
  if (!next) return;

  const loadingEl = document.getElementById("theme-nav-loading");
  if (loadingEl) {
    loadingEl.classList.add("is-visible");
  }

  currentTheme = next;
  setAccent(currentTheme.accent);
  applySiteCopy();

  const buttons = document.querySelectorAll(".theme-nav-button");
  buttons.forEach((btn) => {
    btn.classList.toggle(
      "is-active",
      btn.dataset.themeId === currentTheme.id
    );
  });

  setTimeout(() => {
    if (loadingEl) {
      loadingEl.classList.remove("is-visible");
    }
  }, 400);
}

function setupFAQ() {
  const faqList = document.getElementById("faq-list");
  if (!faqList) return;

  faqList.addEventListener("click", (event) => {
    const button = event.target.closest(".faq-question");
    if (!button) return;
    const item = button.closest(".faq-item");
    if (!item) return;

    const isOpen = item.classList.contains("is-open");
    faqList
      .querySelectorAll(".faq-item.is-open")
      .forEach((openItem) => openItem.classList.remove("is-open"));

    if (!isOpen) {
      item.classList.add("is-open");
    }
  });
}

function setupFooterYear() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
}

function setupLoader() {
  const overlay = document.getElementById("global-loader");
  const barFill = document.getElementById("loader-bar-fill");
  const percentEl = document.getElementById("loader-percent");

  collectAllFrames();

  preloadFrames(
    (pct) => {
      if (barFill) {
        barFill.style.width = `${pct}%`;
      }
      if (percentEl) {
        percentEl.textContent = `${pct}%`;
      }
    },
    () => {
      document.body.classList.add("ready");
      if (overlay) {
        overlay.classList.add("is-hidden");
      }
      setAccent(currentTheme.accent || siteConfig.defaultAccent);
      applySiteCopy();
      renderHeroFrames();
      buildThemeNav();
      setupExploreToggle();
      setupScrollHandler();
    }
  );
}

function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.section-header, .path-card, .project-card, .hobby-card, .testimonial-card, .reveal-staggered, .reveal-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('reveal-staggered')) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            child.style.setProperty('--delay', `${index * 0.15}s`);
          });
        }
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    if (!el.classList.contains('reveal-staggered')) {
      el.classList.add('reveal-on-scroll');
    }
    observer.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupLoader();
  setupFAQ();
  setupFooterYear();
  setupScrollReveal();
});

