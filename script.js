
/* =====================================================
   QNOTES
   Your next chapter starts here.
   Notebook Studio — premium edition
===================================================== */

const pageTitle = document.getElementById("page-title");
const pageContent = document.getElementById("page-content");
const navigation = document.getElementById("main-navigation");
const themeToggle = document.getElementById("theme-toggle");

// =====================================================
// 1. STORAGE HELPERS
// =====================================================

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function makeId() {
  return globalThis.crypto?.randomUUID?.()
    || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// =====================================================
// 2. NOTEBOOK COLLECTIONS
// =====================================================

const freeNotebooks = [
  { id: "red", name: "Ruby", colour: "#D85B65" },
  { id: "green", name: "Sage", colour: "#719777" },
  { id: "yellow", name: "Buttercup", colour: "#E8C95F" },
  { id: "pink", name: "Blush", colour: "#E8A8C4" },
  { id: "blue", name: "Bluebell", colour: "#80B6E0" }
];

const premiumColours = [
  { id: "lavender", name: "Lavender Haze", colour: "#B9A5DC" },
  { id: "cream", name: "Pearl Cream", colour: "#E9DDC8" },
  { id: "rose", name: "Dusty Rose", colour: "#BD879E" },
  { id: "plum", name: "Velvet Plum", colour: "#795A82" },
  { id: "mint", name: "Soft Mint", colour: "#A7D1BF" }
];

const designFamilies = [
  {
    id: "floral",
    name: "Floral Garden",
    description: "Pressed petals, romantic roses and botanical details.",
    designs: [
      "Rose Garden", "Wildflower Meadow", "Cherry Blossom",
      "Pressed Flowers", "Lavender Fields", "Daisy Days",
      "Vintage Roses", "Botanical Study", "Peony Dreams",
      "Secret Garden"
    ]
  },
  {
    id: "academia",
    name: "Academia",
    description: "Literary charm, antique books and scholarly elegance.",
    designs: [
      "Dark Academia", "Light Academia", "Library Classics",
      "Vintage Manuscript", "Oxford Study", "Antique Books",
      "Poet's Desk", "Autumn Library", "Literary Muse",
      "Scholar's Edition"
    ]
  },
  {
    id: "coquette",
    name: "Coquette",
    description: "Satin bows, delicate ribbons and soft romantic colours.",
    designs: [
      "Pink Satin Bows", "Pearl Ribbon", "Lace & Roses",
      "Blush Ballet", "Ribbon Diary", "French Romance",
      "Tiny Hearts", "Powder Pink", "Rosewater Lace",
      "Love Letters"
    ]
  },
  {
    id: "celestial",
    name: "Celestial",
    description: "Moonlit skies, tiny stars and dreamy cosmic palettes.",
    designs: [
      "Moonlit Sky", "Golden Constellations", "Starry Night",
      "Moon Phases", "Cosmic Lavender", "Midnight Blue",
      "Solar Dreams", "Shooting Stars", "Celestial Map",
      "Stardust"
    ]
  },
  {
    id: "minimal",
    name: "Minimalist",
    description: "Quiet luxury, soft neutrals and clean modern lines.",
    designs: [
      "Pearl Minimal", "Soft Geometry", "Monochrome",
      "Modern Lines", "Quiet Luxury", "Neutral Layers",
      "Ivory Sketch", "Minimal Rose", "Clean Slate",
      "Modern Scholar"
    ]
  },
  {
    id: "seasonal",
    name: "Seasonal & Artistic",
    description: "Watercolour skies, autumn leaves and painted petals.",
    designs: [
      "Autumn Leaves", "Winter Frost", "Spring Garden",
      "Summer Postcards", "Watercolour Sky", "Ocean Blue",
      "Golden Hour", "Dreamy Clouds", "Painted Petals",
      "Midnight Garden"
    ]
  }
];

const familyColours = {
  floral: "#E9B7C7",
  academia: "#B7A58B",
  coquette: "#E8B4CB",
  celestial: "#A99ACF",
  minimal: "#D9D0C4",
  seasonal: "#C9B4A0"
};

const ultraDesigns = designFamilies.flatMap(family =>
  family.designs.map((name, index) => ({
    id: `${family.id}-${index + 1}`,
    name,
    family: family.id,
    colour: familyColours[family.id],
    tier: "ultra"
  }))
);

// =====================================================
// 3. NOTEBOOK STUDIO DESIGN SYSTEM
// This stylesheet is added by JavaScript.
// No separate CSS edit is needed for this upgrade.
// =====================================================

function installNotebookStyles() {
  if (document.getElementById("qnotes-notebook-styles")) return;

  const style = document.createElement("style");
  style.id = "qnotes-notebook-styles";

  style.textContent = `
    .qs-studio {
      --qs-ink: var(--text, #403543);
      --qs-muted: var(--muted, #897d89);
      --qs-line: var(--border, #eadfe6);
      display: grid;
      gap: 24px;
    }

    .qs-studio * {
      box-sizing: border-box;
    }

    .qs-hero {
      position: relative;
      overflow: hidden;
      padding: clamp(24px, 5vw, 42px);
      border: 1px solid rgba(189, 135, 158, .25);
      border-radius: 26px;
      background:
        radial-gradient(ellipse at 90% 15%, rgba(255,255,255,.82), transparent 35%),
        linear-gradient(135deg, #F7E8EE, #EDE7F8 55%, #F8F0E5);
      color: #514252;
      box-shadow: 0 15px 40px rgba(104, 73, 94, .09);
    }

    .qs-hero::after {
      content: "✿";
      position: absolute;
      right: 22px;
      bottom: -48px;
      font-size: clamp(110px, 23vw, 190px);
      color: rgba(189, 135, 158, .15);
      transform: rotate(-17deg);
      pointer-events: none;
    }

    .qs-eyebrow {
      margin: 0 0 10px;
      font-size: 10px;
      letter-spacing: 2px;
      font-weight: 700;
      text-transform: uppercase;
      opacity: .78;
    }

    .qs-hero h2 {
      max-width: 540px;
      margin: 0 0 12px;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(29px, 6vw, 45px);
      line-height: 1.12;
      font-weight: 400;
    }

    .qs-hero p:not(.qs-eyebrow) {
      max-width: 480px;
      line-height: 1.75;
    }

    .qs-section {
      display: grid;
      gap: 15px;
      min-width: 0;
    }

    .qs-section-heading {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .qs-section-heading h2,
    .qs-section-heading h3 {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      font-weight: 400;
    }

    .qs-section-heading h2 {
      font-size: clamp(22px, 4vw, 30px);
    }

    .qs-section-heading p {
      margin: 6px 0 0;
      color: var(--qs-muted);
      font-size: 13px;
      line-height: 1.6;
    }

    .qs-pill {
      display: inline-flex;
      align-items: center;
      padding: 7px 10px;
      border: 1px solid var(--qs-line);
      border-radius: 30px;
      font-size: 9px;
      letter-spacing: 1.1px;
      font-weight: 700;
      white-space: nowrap;
    }

    .qs-form {
      display: grid;
      gap: 12px;
      padding: 20px;
      border: 1px solid var(--qs-line);
      border-radius: 22px;
      background: var(--surface, #fffdfb);
    }

    .qs-form label,
    .qs-editor label {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .3px;
    }

    .qs-form input,
    .qs-editor input,
    .qs-editor select,
    .qs-editor textarea {
      width: 100%;
      min-width: 0;
      padding: 13px 14px;
      border: 1px solid var(--qs-line);
      border-radius: 13px;
      background: var(--surface, #fffdfb);
      color: var(--qs-ink);
      font: inherit;
      font-size: 14px;
    }

    .qs-form input:focus,
    .qs-editor input:focus,
    .qs-editor select:focus,
    .qs-editor textarea:focus {
      outline: 2px solid var(--rose, #bd879e);
      outline-offset: 2px;
    }

    .qs-colours {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 9px;
    }

    .qs-colour {
      min-width: 0;
      display: grid;
      justify-items: center;
      gap: 7px;
      padding: 9px 3px;
      border: 1px solid transparent;
      border-radius: 13px;
      background: transparent;
      color: var(--qs-ink);
      font-size: 10px;
      cursor: pointer;
    }

    .qs-colour[aria-pressed="true"] {
      border-color: var(--rose, #bd879e);
      background: rgba(189, 135, 158, .09);
    }

    .qs-colour-dot {
      width: clamp(25px, 6vw, 39px);
      aspect-ratio: 1;
      border: 1px solid rgba(70, 50, 65, .13);
      border-radius: 50%;
      background: var(--swatch);
      box-shadow: inset 0 1px 2px rgba(255,255,255,.4);
    }

    .qs-button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      min-height: 42px;
      padding: 11px 16px;
      border: 1px solid var(--qs-line);
      border-radius: 13px;
      background: var(--surface, #fffdfb);
      color: var(--qs-ink);
      font: inherit;
      font-size: 12px;
      cursor: pointer;
      transition: transform .18s ease, box-shadow .18s ease;
    }

    .qs-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(75, 52, 70, .09);
    }

    .qs-button-primary {
      border-color: transparent;
      background: linear-gradient(135deg, #BD879E, #9C789D);
      color: #fff;
    }

    .qs-button:focus-visible,
    .qs-colour:focus-visible,
    .qs-cover:focus-visible {
      outline: 2px solid var(--rose, #bd879e);
      outline-offset: 3px;
    }

    .qs-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }

    .qs-notebook-item {
      display: grid;
      align-content: start;
      gap: 9px;
      min-width: 0;
    }

    .qs-cover {
      --cover: #E8A8C4;
      position: relative;
      isolation: isolate;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      min-width: 0;
      min-height: 190px;
      padding: 20px 12px 17px;
      border: 1px solid rgba(75, 53, 69, .12);
      border-radius: 7px 18px 18px 7px;
      background: var(--cover);
      color: #4A3947;
      text-align: center;
      box-shadow:
        inset 5px 0 0 rgba(75, 53, 69, .12),
        inset 8px 0 0 rgba(255,255,255,.16),
        0 10px 22px rgba(75, 53, 69, .10);
      cursor: pointer;
      transition: transform .2s ease, box-shadow .2s ease;
    }

    .qs-cover:hover {
      transform: translateY(-4px) rotate(-.5deg);
      box-shadow:
        inset 5px 0 0 rgba(75, 53, 69, .12),
        0 16px 28px rgba(75, 53, 69, .16);
    }

    .qs-cover::before {
      content: "";
      position: absolute;
      z-index: -1;
      inset: 8px;
      border: 1px solid rgba(255,255,255,.45);
      border-radius: 3px 12px 12px 3px;
      pointer-events: none;
    }

    .qs-cover::after {
      content: "✦  ·  ✧  ·  ✦";
      position: absolute;
      right: 0;
      bottom: 10px;
      left: 0;
      font-size: 10px;
      letter-spacing: 4px;
      opacity: .65;
      pointer-events: none;
    }

    .qs-cover-floral {
      background:
        radial-gradient(ellipse at 16% 20%, rgba(255,255,255,.55) 0 4%, transparent 5%),
        radial-gradient(ellipse at 84% 76%, rgba(255,255,255,.35) 0 6%, transparent 7%),
        linear-gradient(145deg, #F0CBD6, #DCA8BD);
    }

    .qs-cover-academia {
      background:
        repeating-linear-gradient(0deg, transparent 0 23px, rgba(100,75,57,.07) 24px),
        linear-gradient(135deg, #D8C6AC, #B9A58B);
    }

    .qs-cover-coquette {
      background:
        radial-gradient(ellipse at 20% 18%, rgba(255,255,255,.7), transparent 25%),
        linear-gradient(135deg, #F5DDE9, #E4AFC9);
    }

    .qs-cover-celestial {
      background:
        radial-gradient(circle at 25% 22%, #FFF2C6 0 1px, transparent 2px),
        radial-gradient(circle at 78% 40%, #FFF2C6 0 1.5px, transparent 2.5px),
        radial-gradient(circle at 35% 75%, #FFF2C6 0 1px, transparent 2px),
        linear-gradient(145deg, #8174AA, #A99ACF);
      color: #FFF9F1;
    }

    .qs-cover-minimal {
      background:
        linear-gradient(135deg, transparent 48%, rgba(255,255,255,.38) 49% 51%, transparent 52%),
        linear-gradient(145deg, #F1E9DC, #D5C9B9);
    }

    .qs-cover-seasonal {
      background:
        radial-gradient(ellipse at 80% 15%, rgba(255,255,255,.45), transparent 28%),
        linear-gradient(145deg, #D8C0A9, #B99B85);
    }

    .qs-cover-lavender {
      background: linear-gradient(145deg, #D6C9EF, #B9A5DC);
    }

    .qs-cover-cream {
      background: linear-gradient(145deg, #F6EEDF, #E2D2B5);
    }

    .qs-cover-rose {
      background: linear-gradient(145deg, #E0B1C3, #BD879E);
    }

    .qs-cover-plum {
      background: linear-gradient(145deg, #9B80A5, #795A82);
      color: #FFF8F2;
    }

    .qs-cover-mint {
      background: linear-gradient(145deg, #D4E8DC, #A7D1BF);
    }

    .qs-cover-monogram {
      display: grid;
      place-items: center;
      width: 55px;
      height: 55px;
      border: 1px solid currentColor;
      border-radius: 50%;
      font-family: Georgia, serif;
      font-size: 31px;
      font-style: italic;
      opacity: .85;
    }

    .qs-cover-title {
      max-width: 100%;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 16px;
      line-height: 1.35;
      overflow-wrap: anywhere;
    }

    .qs-cover-subtitle {
      max-width: 100%;
      font-size: 10px;
      line-height: 1.5;
      opacity: .8;
      overflow-wrap: anywhere;
    }

    .qs-cover-stamp {
      font-size: 9px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      opacity: .8;
    }

    .qs-item-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .qs-item-actions .qs-button {
      flex: 1;
      padding: 9px 7px;
      font-size: 11px;
    }

    .qs-locked {
      cursor: default;
    }

    .qs-locked:hover {
      transform: translateY(-2px);
    }

    .qs-lock {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 1px solid rgba(75, 53, 69, .25);
      border-radius: 50%;
      background: rgba(255,255,255,.25);
      font-size: 15px;
    }

    .qs-family {
      display: grid;
      gap: 12px;
    }

    .qs-family-heading {
      display: grid;
      gap: 4px;
    }

    .qs-family-heading h3 {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      font-weight: 400;
      font-size: 21px;
    }

    .qs-family-heading p {
      margin: 0;
      color: var(--qs-muted);
      font-size: 12px;
      line-height: 1.6;
    }

    .qs-empty {
      padding: 22px 16px;
      border: 1px dashed var(--qs-line);
      border-radius: 16px;
      color: var(--qs-muted);
      font-size: 13px;
      line-height: 1.7;
    }

    .qs-editor {
      display: grid;
      gap: 12px;
      padding: 20px;
      border: 1px solid var(--qs-line);
      border-radius: 22px;
      background: var(--surface, #fffdfb);
      box-shadow: 0 12px 30px rgba(75, 52, 70, .06);
      scroll-margin-top: 20px;
    }

    .qs-editor[hidden] {
      display: none;
    }

    .qs-editor textarea {
      width: 100%;
      min-heaight: 750px;
      height: 750px;
      box-sizing: border-box;
      resize: vertical;
      line-height: 1.9;
      padding: 24px;
   }

   .qs-paper-surface {
     display: none;
   }

    .qs-paper-lined {
      background-image: repeating-linear-gradient(
        transparent 0 30px,
        var(--qs-line) 31px
      ) !important;
      background-attachment: local;
    }

    .qs-paper-dotted {
      background-image: radial-gradient(
        var(--qs-muted) .8px,
        transparent .8px
      ) !important;
      background-size: 18px 18px !important;
      background-attachment: local;
    }

    .qs-paper-grid {
      background-image:
        linear-gradient(var(--qs-line) 1px, transparent 1px),
        linear-gradient(90deg, var(--qs-line) 1px, transparent 1px) !important;
      background-size: 20px 20px !important;
      background-attachment: local;
    }

    .qs-paper-blank {
      background-image: none !important;
    }

    .qs-page-card {
      display: grid;
      gap: 10px;
      padding: 16px;
      border: 1px solid var(--qs-line);
      border-radius: 15px;
      background: var(--surface, #fffdfb);
    }

    .qs-page-card h4 {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 17px;
      font-weight: 400;
    }

    .qs-page-preview {
      margin: 0;
      color: var(--qs-muted);
      font-size: 12px;
      line-height: 1.7;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }

    .qs-status {
      min-height: 18px;
      margin: 0;
      color: var(--qs-muted);
      font-size: 12px;
    }

    .qs-muted {
      color: var(--qs-muted);
      font-size: 12px;
      line-height: 1.7;
    }

    .qs-dark .qs-hero {
      background:
        radial-gradient(ellipse at 90% 15%, rgba(201,180,215,.12), transparent 35%),
        linear-gradient(135deg, #3E3042, #302D47 60%, #443747);
      color: #F7EDF4;
      border-color: rgba(255,255,255,.09);
    }

    .qs-dark .qs-hero::after {
      color: rgba(226,180,205,.12);
    }

    .qs-dark .qs-cover {
      box-shadow:
        inset 5px 0 0 rgba(0,0,0,.13),
        0 10px 22px rgba(0,0,0,.18);
    }

    .qs-dark .qs-colour[aria-pressed="true"] {
      background: rgba(226,180,205,.12);
    }

    @media (min-width: 600px) {
      .qs-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .qs-cover {
        min-height: 205px;
      }

      .qs-form {
        padding: 24px;
      }
    }

    @media (min-width: 1000px) {
      .qs-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .qs-cover,
      .qs-button {
        transition: none;
      }
    }
  `;

style.textContent += `
  /* Qnotes spacious notebook editor */

  #notebook-editor {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 24px;
  }

  .qs-notebook-toolbar,
  .qs-notebook-tools {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin: 16px 0;
  }

  .qs-paper-surface {
    position: relative;
    width: 100%;
    min-height: 750px;
    height: 750px;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid #e2d8e9;
    border-radius: 12px;
    background-color: #fffdf9;
    touch-action: pan-y;
  }

  .qs-paper-surface.qs-paper-lined {
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 31px,
      #dcd5e7 32px
    );
  }

  .qs-paper-surface.qs-paper-dotted {
    background-image: radial-gradient(#cfc3dd 1px, transparent 1px);
    background-size: 18px 18px;
  }

  .qs-paper-surface.qs-paper-grid {
    background-image:
      linear-gradient(#ddd3e8 1px, transparent 1px),
      linear-gradient(90deg, #ddd3e8 1px, transparent 1px);
    background-size: 22px 22px;
  }

  .qs-paper-surface.qs-paper-blank {
    background-image: none;
  }

  .qs-handwriting-canvas {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    touch-action: pan-y;
  }

  .qs-typed-notes {
    display: grid;
    gap: 12px;
    margin-top: 24px;
  }

  #notebook-note-body {
    width: 100%;
    min-height: 220px;
    box-sizing: border-box;
  }

  .qs-writing-hint {
    font-size: 0.9rem;
    opacity: 0.8;
  }

  @media (max-width: 600px) {
    #notebook-editor {
      padding: 12px;
    }

    .qs-paper-surface {
      min-height: 750px;
      height: 750px;
    }

    .qs-notebook-toolbar,
    .qs-notebook-tools {
      gap: 8px;
    }
  }
`;

  document.head.appendChild(style);
}

installNotebookStyles();

// =====================================================
// 4. APP PAGES
// =====================================================

const pages = {
  home: {
    title: "Welcome to Qnotes.",
    content: `
      <div class="stack">
        <section class="card card-pink">
          <p class="eyebrow">YOUR LITTLE CORNER OF THE WORLD</p>
          <h2>Your dreams deserve a plan.</h2>
          <p>A gentle reminder that every little step counts.</p>
          <br>
          <button class="primary-button" data-open-page="planner">
            Plan my day
          </button>
        </section>

        <section class="stack">
          <h2>Your study overview</h2>
          <div class="card-grid">
            <article class="card card-lavender">
              <p class="eyebrow">MY PLANNER</p>
              <h2 id="dashboard-tasks">0</h2>
              <p>Unfinished tasks</p>
              <button class="secondary-button" data-open-page="planner">
                View planner
              </button>
            </article>

            <article class="card card-blue">
              <p class="eyebrow">MY NOTEBOOKS</p>
              <h2 id="dashboard-notes">0</h2>
              <p>Saved notebooks</p>
              <button class="secondary-button" data-open-page="notebook">
                Open notebook studio
              </button>
            </article>
          </div>
        </section>

        <section class="card stack">
          <div class="section-heading">
            <h2>Coming up</h2>
            <button class="secondary-button" data-open-page="planner">
              See all
            </button>
          </div>
          <div id="dashboard-upcoming"></div>
        </section>

        <section class="stack">
          <h2>Your study sanctuary</h2>
          <div class="card-grid">
            <article class="card card-cream">
              <h3>Question papers</h3>
              <p>Practise for your next exam.</p>
              <button class="secondary-button" data-open-page="papers">Explore</button>
            </article>

            <article class="card card-pink">
              <h3>Revision corner</h3>
              <p>Make room for practice and progress.</p>
              <button class="secondary-button" data-open-page="revision">Revise</button>
            </article>

            <article class="card card-lavender">
              <h3>Study space</h3>
              <p>Your future home for connected learning.</p>
              <button class="secondary-button" data-open-page="study">Enter</button>
            </article>

            <article class="card card-blue">
              <h3>Theme studio</h3>
              <p>Make your workspace yours.</p>
              <button class="secondary-button" data-open-page="themes">Explore</button>
            </article>
          </div>
        </section>
      </div>
    `
  },

  planner: {
    title: "Your planner.",
    content: `
      <section class="card stack">
        <h2>Little steps, big dreams.</h2>
        <form id="task-form" class="stack">
          <input id="task-input" placeholder="Add a task, assignment or test"
            maxlength="160" required>
          <input id="task-date" type="date" aria-label="Due date">
          <button class="primary-button" type="submit">Add task</button>
        </form>
        <div id="task-list" class="stack"></div>
      </section>
    `
  },

  notebook: {
    title: "Your Notebook Studio.",
    content: ""
  },

  study: {
    title: "Your study space.",
    content: `
      <section class="card card-lavender stack">
        <h2>Your study sanctuary.</h2>
        <p>AI tutoring, summaries and connected notebooks will live here.</p>
        <p class="muted">Real AI features need a secure backend connection.</p>
      </section>
    `
  },

  papers: {
    title: "Question papers.",
    content: `
      <section class="card stack">
        <h2>Practise with purpose.</h2>
        <p>Custom marks, questions, answer spaces and memorandums are planned.</p>
        <p class="muted">The exam builder is not connected yet.</p>
      </section>
    `
  },

  revision: {
    title: "Your revision corner.",
    content: `
      <section class="card card-blue stack">
        <h2>Small sessions count.</h2>
        <p>Flashcards, quizzes and practice tests are coming.</p>
      </section>
    `
  },

  community: {
    title: "The student community.",
    content: `
      <section class="card stack">
        <h2>Learning is better together.</h2>
        <p>Subject groups, posts, comments and discussions are planned.</p>
        <p class="muted">Community features need a backend and moderation.</p>
      </section>
    `
  },

  messages: {
    title: "Your messages.",
    content: `
      <section class="card stack">
        <h2>Your little inbox.</h2>
        <p>Private messages and notifications are planned.</p>
      </section>
    `
  },

  themes: {
    title: "Your theme studio.",
    content: `
      <section class="card stack">
        <h2>Make Qnotes yours.</h2>
        <p>Our full theme gallery and six theme families are coming later.</p>
      </section>
    `
  },

  twin: {
    title: "Your Learning Twin.",
    content: `
      <section class="card card-lavender stack">
        <h2>Discover how you learn.</h2>
        <p>Track demonstrated understanding and identify topics to revise.</p>
      </section>
    `
  },

  plans: {
    title: "Your Qnotes membership.",
    content: `
      <section class="card card-pink stack">
        <h2>A plan for your next chapter.</h2>
        <p>Free, Premium and Ultra Premium membership options are planned.</p>
        <p class="muted">Billing is not active yet.</p>
      </section>
    `
  }
};

// =====================================================
// 5. NAVIGATION
// =====================================================

function openPage(name) {
  const page = pages[name];
  if (!page) return;

  pageTitle.textContent = page.title;
  pageContent.innerHTML = page.content;

  document.querySelectorAll(".nav-item").forEach(button => {
    const active = button.dataset.page === name;
    button.classList.toggle("active", active);

    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });

  if (name === "home") updateDashboard();
  if (name === "planner") renderTasks();
  if (name === "notebook") renderNotebookStudio();
}

navigation.addEventListener("click", event => {
  const button = event.target.closest("[data-page]");
  if (button) openPage(button.dataset.page);
});

pageContent.addEventListener("click", event => {
  const button = event.target.closest("[data-open-page]");
  if (button) openPage(button.dataset.openPage);
});

// =====================================================
// 6. LIGHT AND DARK MODE
// =====================================================

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");

  themeToggle.textContent = theme === "dark"
    ? "☀ Switch to light mode"
    : "☾ Switch to dark mode";

  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));

  try {
    localStorage.setItem("qnotes-theme", theme);
  } catch {}

  const studio = document.querySelector(".qs-studio");
  if (studio) {
    studio.classList.toggle("qs-dark", theme === "dark");
  }
}

let initialTheme = "light";

try {
  initialTheme = localStorage.getItem("qnotes-theme") || "light";
} catch {}

applyTheme(initialTheme);

themeToggle.addEventListener("click", () => {
  applyTheme(document.body.classList.contains("dark") ? "light" : "dark");
});

// =====================================================
// 7. PLANNER
// =====================================================

function getTasks() {
  const value = readStorage("qnotes-tasks", []);
  return Array.isArray(value) ? value : [];
}

function saveTasks(tasks) {
  if (!writeStorage("qnotes-tasks", tasks)) {
    alert("Unable to save tasks. Browser storage may be full.");
  }
  updateDashboard();
}

function renderTasks() {
  const list = document.getElementById("task-list");

  if (list) {
    list.replaceChildren();

    getTasks().forEach(task => {
      const row = document.createElement("article");
      row.className = "card stack";

      const label = document.createElement("label");
      const checkbox = document.createElement("input");

      checkbox.type = "checkbox";
      checkbox.checked = Boolean(task.done);
      checkbox.style.width = "auto";

      label.append(checkbox, document.createTextNode(" " + task.title));

      if (task.done) label.style.textDecoration = "line-through";

      checkbox.addEventListener("change", () => {
        const tasks = getTasks();
        const index = tasks.findIndex(item => item.id === task.id);

        if (index === -1) return;

        tasks[index].done = checkbox.checked;

        if (writeStorage("qnotes-tasks", tasks)) {
          renderTasks();
        }
      });

      row.appendChild(label);

      if (task.date) {
        const date = document.createElement("p");
        date.className = "muted";
        date.textContent = "Due: " + task.date;
        row.appendChild(date);
      }

      const remove = document.createElement("button");
      remove.className = "secondary-button";
      remove.textContent = "Remove";

      remove.addEventListener("click", () => {
        const tasks = getTasks().filter(item => item.id !== task.id);
        if (writeStorage("qnotes-tasks", tasks)) renderTasks();
      });

      row.appendChild(remove);
      list.appendChild(row);
    });

    if (getTasks().length === 0) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "Your list is empty. Enjoy the breathing room!";
      list.appendChild(empty);
    }
  }

  updateDashboard();
}

pageContent.addEventListener("submit", event => {
  if (event.target.id !== "task-form") return;
  event.preventDefault();

  const input = document.getElementById("task-input");
  const date = document.getElementById("task-date");
  const title = input.value.trim();

  if (!title) return;

  const tasks = getTasks();

  tasks.push({
    id: makeId(),
    title,
    date: date.value,
    done: false
  });

  if (!writeStorage("qnotes-tasks", tasks)) {
    alert("Unable to save tasks. Browser storage may be full.");
    return;
  }

  event.target.reset();
  renderTasks();
});

// =====================================================
// 8. NOTEBOOK DATA
// =====================================================

function getNotebooks() {
  const value = readStorage("qnotes-notebooks", []);
  return Array.isArray(value) ? value : [];
}

function getNotebookPages(notebook) {
  return Array.isArray(notebook.pages) ? notebook.pages : [];
}

let selectedColour = "pink";
let selectedNotebookId = null;
let selectedPageId = null;
let currentStrokes = [];
let currentStroke = null;
let currentWritingTool = "pen";
let currentInkColour = "#55436f";
let currentInkSize = 3;


function drawQnotesHandwriting() {
  const canvas = document.getElementById("qnotes-writing-canvas");
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const dpr = window.devicePixelRatio || 1;
  const width = Math.round(rect.width * dpr);
  const height = Math.round(rect.height * dpr);

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (const stroke of currentStrokes) {
    if (!stroke.points || stroke.points.length === 0) continue;

    ctx.save();
    ctx.globalCompositeOperation =
      stroke.tool === "eraser" ? "destination-out" : "source-over";
    ctx.strokeStyle = stroke.colour || "#55436f";
    ctx.fillStyle = stroke.colour || "#55436f";
    ctx.lineWidth = (stroke.size || 3) * dpr;

    const points = stroke.points;

    if (points.length === 1) {
      ctx.beginPath();
      ctx.arc(
        points[0].x * canvas.width,
        points[0].y * canvas.height,
        ctx.lineWidth / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(
        points[0].x * canvas.width,
        points[0].y * canvas.height
      );

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(
          points[i].x * canvas.width,
          points[i].y * canvas.height
        );
      }

      ctx.stroke();
    }

    ctx.restore();
  }
}

function setupQnotesHandwriting() {
  const canvas = document.getElementById("qnotes-writing-canvas");
  if (!canvas || canvas.dataset.ready === "true") return;

  canvas.dataset.ready = "true";

  const getPoint = event => {
    const rect = canvas.getBoundingClientRect();

    return {
      x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
    };
  };

  canvas.addEventListener("pointerdown", event => {
    if (event.pointerType === "touch") return;
    if (event.button !== undefined && event.button !== 0) return;

    event.preventDefault();

    currentStroke = {
      tool: currentWritingTool,
      colour: currentInkColour,
      size: currentInkSize,
      points: [getPoint(event)]
    };

    currentStrokes.push(currentStroke);
    canvas.setPointerCapture(event.pointerId);
    drawQnotesHandwriting();
  });

  canvas.addEventListener("pointermove", event => {
    if (!currentStroke) return;
    if (!canvas.hasPointerCapture(event.pointerId)) return;

    event.preventDefault();
    currentStroke.points.push(getPoint(event));
    drawQnotesHandwriting();
  });

  function finishStroke() {
    currentStroke = null;
  }

  canvas.addEventListener("pointerup", finishStroke);
  canvas.addEventListener("pointercancel", finishStroke);
  canvas.addEventListener("lostpointercapture", finishStroke);

  document.getElementById("qnotes-ink-colour")?.addEventListener(
    "input",
    event => {
      currentInkColour = event.target.value;
    }
  );

  document.getElementById("qnotes-ink-size")?.addEventListener(
    "input",
    event => {
      currentInkSize = Number(event.target.value) || 3;
    }
  );

  document.querySelectorAll("[data-writing-tool]").forEach(button => {
    button.addEventListener("click", () => {
      currentWritingTool = button.dataset.writingTool;

      document.querySelectorAll("[data-writing-tool]").forEach(item => {
        item.classList.toggle("qs-tool-active", item === button);
      });
    });
  });

  document.getElementById("qnotes-undo")?.addEventListener("click", () => {
    currentStrokes.pop();
    currentStroke = null;
    drawQnotesHandwriting();
  });

  document.getElementById("qnotes-clear")?.addEventListener("click", () => {
    currentStrokes = [];
    currentStroke = null;
    drawQnotesHandwriting();
  });

  drawQnotesHandwriting();
}


// =====================================================
// 9. BUILD THE NOTEBOOK STUDIO
// =====================================================

function renderNotebookStudio() {
  selectedColour = "pink";

  pageContent.innerHTML = `
    <div class="qs-studio">

      <section class="qs-hero">
        <p class="qs-eyebrow">THE QNOTES STATIONERY COLLECTION</p>
        <h2>A little space for your biggest dreams.</h2>
        <p>
          Collect your thoughts, keep your subjects close,
          and make every study session feel like yours.
        </p>
      </section>

      <section class="qs-section">
        <div class="qs-section-heading">
          <div>
            <h2>Create your notebook</h2>
            <p>Start with a name, a subject and a favourite colour.</p>
          </div>
          <span class="qs-pill">FREE COLLECTION</span>
        </div>

        <form id="notebook-form" class="qs-form">
          <label for="notebook-name">Notebook name</label>
          <input id="notebook-name" maxlength="60"
            placeholder="e.g. My Chemistry Notes" required>

          <label for="notebook-subject">Subject or category</label>
          <input id="notebook-subject" maxlength="60"
            placeholder="e.g. SCHE012, Personal Journal">

          <label>Choose your cover colour</label>
          <div id="free-colours" class="qs-colours"></div>

          <button class="qs-button qs-button-primary" type="submit">
            + Create my notebook
          </button>

          <p id="notebook-status" class="qs-status" aria-live="polite"></p>
        </form>
      </section>

      <section class="qs-section">
        <div class="qs-section-heading">
          <div>
            <h2>My collection</h2>
            <p>Your notebooks and all their saved pages.</p>
          </div>
          <span class="qs-pill" id="notebook-count">0 NOTEBOOKS</span>
        </div>

        <div id="my-notebooks" class="qs-grid"></div>
      </section>

      <section class="qs-section">
        <div class="qs-section-heading">
          <div>
            <h2>The Premium palette</h2>
            <p>More colours for your personal stationery shelf.</p>
          </div>
          <span class="qs-pill">PREMIUM</span>
        </div>

        <div id="premium-colours" class="qs-grid"></div>
        <p class="qs-muted">
          Premium covers are previews for now. Membership and purchasing
          will be connected in a later development stage.
        </p>
      </section>

      <section class="qs-section">
        <div class="qs-section-heading">
          <div>
            <h2>The Signature Collection</h2>
            <p>Six design families, with ten cover concepts in each.</p>
          </div>
          <span class="qs-pill">60 DESIGNS</span>
        </div>

        <div id="ultra-collections" class="qs-section"></div>
      </section>

      
<section id="notebook-editor" class="qs-editor" hidden>
  <div class="qs-section-heading">
    <div>
      <p class="qs-eyebrow">YOUR PRIVATE PAGES</p>
      <h2 id="editor-title">My notebook</h2>
      <p>Your next chapter starts here.</p>
    </div>

    <button id="close-editor" class="qs-button" type="button">
      Close
    </button>
  </div>

  <div class="qs-notebook-toolbar">
    <label for="paper-style">Paper</label>
    <select id="paper-style">
      <option value="lined">Lined</option>
      <option value="dotted">Dotted</option>
      <option value="grid">Grid</option>
      <option value="blank">Blank</option>
    </select>

    <label for="qnotes-ink-colour">Ink colour</label>
    <input id="qnotes-ink-colour" type="color" value="#55436f">

    <label for="qnotes-ink-size">Pen size</label>
    <input
      id="qnotes-ink-size"
      type="range"
      min="1"
      max="12"
      value="3"
    >
  </div>

  <div class="qs-notebook-tools">
    <button class="qs-button qs-tool-active"
      type="button" data-writing-tool="pen">Pen</button>

    <button class="qs-button"
      type="button" data-writing-tool="eraser">Eraser</button>

    <button id="qnotes-undo" class="qs-button"
      type="button">Undo</button>

    <button id="qnotes-clear" class="qs-button"
      type="button">Clear page</button>
  </div>

  <p class="qs-writing-hint">
    Write or draw with your Apple Pencil, or type notes below.
  </p>

  <div id="qnotes-paper-surface"
    class="qs-paper-surface qs-paper-lined">
    <canvas
      id="qnotes-writing-canvas"
      class="qs-handwriting-canvas"
      aria-label="Handwriting and drawing canvas"
    ></canvas>
  </div>

  <div class="qs-typed-notes">
    <label for="notebook-note-title">Page title</label>
    <input
      id="notebook-note-title"
      maxlength="120"
      placeholder="e.g. Lecture 1 — Introduction"
    >

    <label for="notebook-note-body">Typed notes (optional)</label>
    <textarea
      id="notebook-note-body"
      class="qs-paper-lined"
      maxlength="30000"
      placeholder="Write your notes here..."
    ></textarea>
  </div>

  <button id="save-notebook-page"
    class="qs-button qs-button-primary" type="button">
    Save this page
  </button>

  <p id="page-status" class="qs-status" aria-live="polite"></p>

  <div class="qs-section-heading">
    <h3>Saved pages</h3>
  </div>

  <div id="notebook-pages" class="qs-section"></div>
</section>

        <div class="qs-section-heading">
          <div>
            <p class="qs-eyebrow">YOUR PRIVATE PAGES</p>
            <h2 id="editor-title">My notebook</h2>
          </div>
          <button id="close-editor" class="qs-button" type="button">
            Close
          </button>
        </div>

        <label for="paper-style">Paper style</label>
        <select id="paper-style">
          <option value="lined">Lined paper</option>
          <option value="dotted">Dotted paper</option>
          <option value="grid">Grid paper</option>
          <option value="blank">Blank paper</option>
        </select>

        <label for="notebook-note-title">Page title</label>
        <input id="notebook-note-title" maxlength="120"
          placeholder="e.g. Lecture 1 — Introduction">

        <label for="notebook-note-body">Your notes</label>
        <textarea id="notebook-note-body"
          class="qs-paper-lined"
          maxlength="30000"
          placeholder="Your next chapter starts here..."></textarea>

        <button id="save-notebook-page"
          class="qs-button qs-button-primary" type="button">
          Save this page
        </button>

        <p id="page-status" class="qs-status" aria-live="polite"></p>

        <div class="qs-section-heading">
          <h3>Saved pages</h3>
        </div>

        <div id="notebook-pages" class="qs-section"></div>
      </section>

    </div>
  `;

  const studio = pageContent.querySelector(".qs-studio");

  studio.classList.toggle(
    "qs-dark",
    document.body.classList.contains("dark")
  );

  renderColourChoices();
  renderMyNotebooks();
  renderPremiumColours();
  renderUltraCollections();
  closeNotebookEditor();
}

// =====================================================
// 10. FREE COLOUR SELECTOR
// =====================================================

function renderColourChoices() {
  const container = document.getElementById("free-colours");
  if (!container) return;

  container.replaceChildren();

  freeNotebooks.forEach(item => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "qs-colour";
    button.setAttribute("aria-pressed", String(selectedColour === item.id));
    button.setAttribute("aria-label", item.name);

    const dot = document.createElement("span");
    dot.className = "qs-colour-dot";
    dot.style.setProperty("--swatch", item.colour);

    const label = document.createElement("span");
    label.textContent = item.name;

    button.append(dot, label);

    button.addEventListener("click", () => {
      selectedColour = item.id;
      renderColourChoices();
    });

    container.appendChild(button);
  });
}

// =====================================================
// 11. COVER DESIGN HELPERS
// =====================================================

function coverClassForNotebook(notebook) {
  const colour = notebook.colourId || "pink";
  const validColours = [
    "red", "green", "yellow", "pink", "blue",
    "lavender", "cream", "rose", "plum", "mint"
  ];

  return validColours.includes(colour) ? `qs-cover-${colour}` : "";
}

function createCover(notebook, options = {}) {
  const cover = document.createElement("div");

  cover.className = [
    "qs-cover",
    coverClassForNotebook(notebook),
    options.locked ? "qs-locked" : ""
  ].filter(Boolean).join(" ");

  cover.style.setProperty("--cover", notebook.colour || "#E8A8C4");

  if (!options.locked) {
    cover.tabIndex = 0;
    cover.setAttribute("role", "button");
    cover.setAttribute("aria-label", `Open ${notebook.name}`);
  }

  const monogram = document.createElement("span");
  monogram.className = "qs-cover-monogram";
  monogram.textContent = options.locked ? "✧" : "Q";

  const title = document.createElement("span");
  title.className = "qs-cover-title";
  title.textContent = notebook.name;

  const subtitle = document.createElement("span");
  subtitle.className = "qs-cover-subtitle";
  subtitle.textContent = options.locked
    ? (notebook.familyName || "Exclusive stationery")
    : (notebook.subject || "A Qnotes original");

  const stamp = document.createElement("span");
  stamp.className = "qs-cover-stamp";
  stamp.textContent = options.locked
    ? (options.tier || "SIGNATURE EDITION")
    : "YOUR STORY · YOUR SPACE";

  cover.append(monogram, title, subtitle, stamp);

  if (!options.locked) {
    const open = () => openNotebook(notebook.id);

    cover.addEventListener("click", open);

    cover.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  }

  return cover;
}

// =====================================================
// 12. MY NOTEBOOKS
// =====================================================

function renderMyNotebooks() {
  const container = document.getElementById("my-notebooks");
  if (!container) return;

  container.replaceChildren();

  const notebooks = getNotebooks();
  const count = document.getElementById("notebook-count");

  if (count) {
    count.textContent = `${notebooks.length} NOTEBOOK${notebooks.length === 1 ? "" : "S"}`;
  }

  if (notebooks.length === 0) {
    const empty = document.createElement("div");
    empty.className = "qs-empty";
    empty.textContent =
      "Your stationery shelf is waiting for its first notebook. Choose a colour above and create your first one.";
    container.appendChild(empty);
    return;
  }

  notebooks.forEach(notebook => {
    const item = document.createElement("article");
    item.className = "qs-notebook-item";

    item.appendChild(createCover(notebook));

    const pageCount = document.createElement("p");
    pageCount.className = "qs-muted";
    const numberOfPages = getNotebookPages(notebook).length;
    pageCount.textContent =
      `${numberOfPages} saved page${numberOfPages === 1 ? "" : "s"}`;

    const actions = document.createElement("div");
    actions.className = "qs-item-actions";

    const open = document.createElement("button");
    open.type = "button";
    open.className = "qs-button qs-button-primary";
    open.textContent = "Open";
    open.addEventListener("click", () => openNotebook(notebook.id));

    const rename = document.createElement("button");
    rename.type = "button";
    rename.className = "qs-button";
    rename.textContent = "Rename";

    rename.addEventListener("click", () => {
      const nextName = prompt("Choose a new notebook name:", notebook.name);

      if (nextName === null || !nextName.trim()) return;

      const notebooksNow = getNotebooks();
      const index = notebooksNow.findIndex(item => item.id === notebook.id);

      if (index < 0) return;

      notebooksNow[index].name = nextName.trim().slice(0, 60);

      if (!writeStorage("qnotes-notebooks", notebooksNow)) {
        alert("Unable to save the notebook name.");
        return;
      }

      renderMyNotebooks();
      updateDashboard();
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "qs-button";
    remove.textContent = "Delete";

    remove.addEventListener("click", () => {
      const confirmed = confirm(
        `Delete "${notebook.name}" and all its saved pages?`
      );

      if (!confirmed) return;

      const remaining = getNotebooks().filter(item => item.id !== notebook.id);

      if (!writeStorage("qnotes-notebooks", remaining)) {
        alert("Unable to delete this notebook.");
        return;
      }

      if (selectedNotebookId === notebook.id) closeNotebookEditor();

      renderMyNotebooks();
      updateDashboard();
    });

    actions.append(open, rename, remove);
    item.append(pageCount, actions);
    container.appendChild(item);
  });
}

// =====================================================
// 13. CREATE A NOTEBOOK
// =====================================================

pageContent.addEventListener("submit", event => {
  if (event.target.id !== "notebook-form") return;

  event.preventDefault();

  const name = document.getElementById("notebook-name").value.trim();
  const subject = document.getElementById("notebook-subject").value.trim();
  const status = document.getElementById("notebook-status");

  if (!name) {
    status.textContent = "Please give your notebook a name.";
    return;
  }

  const colour = freeNotebooks.find(item => item.id === selectedColour);

  if (!colour) {
    status.textContent = "Please choose one of the free colours.";
    return;
  }

  const notebooks = getNotebooks();

  notebooks.push({
    id: makeId(),
    name: name.slice(0, 60),
    subject: subject.slice(0, 60),
    colour: colour.colour,
    colourId: colour.id,
    tier: "free",
    pages: [],
    createdAt: new Date().toISOString()
  });

  if (!writeStorage("qnotes-notebooks", notebooks)) {
    status.textContent = "Unable to save. Browser storage may be full.";
    return;
  }

  event.target.reset();
  selectedColour = "pink";

  status.textContent = "Your new notebook is ready. Happy studying!";
  renderColourChoices();
  renderMyNotebooks();
  updateDashboard();
});

// =====================================================
// 14. PREMIUM COLOUR PREVIEWS
// =====================================================

function renderPremiumColours() {
  const container = document.getElementById("premium-colours");
  if (!container) return;

  container.replaceChildren();

  premiumColours.forEach(item => {
    const notebook = {
      ...item,
      familyName: "Premium Colour",
      subject: "Exclusive colour palette"
    };

    const card = document.createElement("article");
    card.className = "qs-notebook-item";

    card.appendChild(createCover(notebook, {
      locked: true,
      tier: "PREMIUM"
    }));

    const description = document.createElement("p");
    description.className = "qs-muted";
    description.textContent = "Premium cover preview";

    card.appendChild(description);
    container.appendChild(card);
  });
}

// =====================================================
// 15. ULTRA PREMIUM COLLECTIONS — 60 CONCEPTS
// =====================================================

function renderUltraCollections() {
  const container = document.getElementById("ultra-collections");
  if (!container) return;

  container.replaceChildren();

  designFamilies.forEach(family => {
    const section = document.createElement("section");
    section.className = "qs-family";

    const heading = document.createElement("div");
    heading.className = "qs-family-heading";

    const title = document.createElement("h3");
    title.textContent = family.name;

    const description = document.createElement("p");
    description.textContent = family.description;

    heading.append(title, description);

    const grid = document.createElement("div");
    grid.className = "qs-grid";

    ultraDesigns
      .filter(design => design.family === family.id)
      .forEach(design => {
        const item = document.createElement("article");
        item.className = "qs-notebook-item";

        const previewNotebook = {
          id: design.id,
          name: design.name,
          subject: family.name,
          colour: design.colour,
          colourId: family.id
        };

        const cover = createCover(previewNotebook, {
          locked: true,
          tier: "ULTRA PREMIUM"
        });

        cover.classList.add(`qs-cover-${family.id}`);
        cover.style.setProperty("--cover", design.colour);

        item.appendChild(cover);
        grid.appendChild(item);
      });

    section.append(heading, grid);
    container.appendChild(section);
  });
}

// =====================================================
// 16. OPEN A NOTEBOOK
// =====================================================

function openNotebook(id) {
  const notebook = getNotebooks().find(item => item.id === id);
  if (!notebook) return;

  selectedNotebookId = id;
  selectedPageId = null;

  const editor = document.getElementById("notebook-editor");
  editor.hidden = false;

   setupQnotesHandwriting();
   drawQnotesHandwriting();

  document.getElementById("editor-title").textContent = notebook.name;
  document.getElementById("notebook-note-title").value = "";
  document.getElementById("notebook-note-body").value = "";
  document.getElementById("paper-style").value = "lined";
  document.getElementById("page-status").textContent = "";

  updatePaperStyle();
  renderNotebookPages();

  editor.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function closeNotebookEditor() {
  const editor = document.getElementById("notebook-editor");

  if (editor) editor.hidden = true;

  selectedNotebookId = null;
  selectedPageId = null;
}

// =====================================================
// 17. NOTEBOOK PAGE EDITOR
// =====================================================

function updatePaperStyle() {
  const textarea = document.getElementById("notebook-note-body");
  const selector = document.getElementById("paper-style");

  if (!textarea || !selector) return;

  textarea.classList.remove(
    "qs-paper-lined",
    "qs-paper-dotted",
    "qs-paper-grid",
    "qs-paper-blank"
  );

  textarea.classList.add(`qs-paper-${selector.value}`);
}

pageContent.addEventListener("change", event => {
  if (event.target.id === "paper-style") updatePaperStyle();
});

pageContent.addEventListener("click", event => {
  if (event.target.id === "close-editor") {
    closeNotebookEditor();
    return;
  }

  if (event.target.id !== "save-notebook-page") return;

  const titleInput = document.getElementById("notebook-note-title");
  const bodyInput = document.getElementById("notebook-note-body");
  const paper = document.getElementById("paper-style").value;
  const status = document.getElementById("page-status");

  const title = titleInput.value.trim() || "Untitled page";
  const body = bodyInput.value.trim();

  if (!body) {
    status.textContent = "Write something before saving your page.";
    return;
  }

  const notebooks = getNotebooks();
  const notebook = notebooks.find(item => item.id === selectedNotebookId);

  if (!notebook) {
    status.textContent = "Please open a notebook first.";
    return;
  }

  notebook.pages = getNotebookPages(notebook);

  if (selectedPageId) {
    const index = notebook.pages.findIndex(page => page.id === selectedPageId);

    if (index !== -1) {
      notebook.pages[index] = {
        ...notebook.pages[index],
        title,
        body,
        paper,
        updatedAt: new Date().toISOString()
      };
    } else {
      notebook.pages.push({
        id: makeId(),
        title,
        body,
        paper,
        createdAt: new Date().toISOString()
      });
    }
  } else {
    notebook.pages.push({
      id: makeId(),
      title,
      body,
      paper,
      createdAt: new Date().toISOString()
    });
  }

  if (!writeStorage("qnotes-notebooks", notebooks)) {
    status.textContent = "Unable to save. Browser storage may be full.";
    return;
  }

  selectedPageId = null;
  titleInput.value = "";
  bodyInput.value = "";
  document.getElementById("paper-style").value = "lined";

  updatePaperStyle();
  status.textContent = "Your page has been saved!";
  renderNotebookPages();
  renderMyNotebooks();
  updateDashboard();
});

// =====================================================
// 18. RENDER SAVED NOTEBOOK PAGES
// =====================================================

function renderNotebookPages() {
  const container = document.getElementById("notebook-pages");
  if (!container || !selectedNotebookId) return;

  container.replaceChildren();

  const notebook = getNotebooks().find(item => item.id === selectedNotebookId);
  if (!notebook) return;

  const pages = getNotebookPages(notebook);

  if (pages.length === 0) {
    const empty = document.createElement("div");
    empty.className = "qs-empty";
    empty.textContent =
      "No pages yet. Write your first page above and save it here.";
    container.appendChild(empty);
    return;
  }

  [...pages].reverse().forEach(page => {
    const card = document.createElement("article");
    card.className = "qs-page-card";

    const title = document.createElement("h4");
    title.textContent = page.title || "Untitled page";

    const preview = document.createElement("p");
    preview.className = "qs-page-preview";
    preview.textContent = (page.body || "").slice(0, 240);

    const actions = document.createElement("div");
    actions.className = "qs-item-actions";

    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "qs-button";
    edit.textContent = "Edit page";

    edit.addEventListener("click", () => {
      selectedPageId = page.id;

      document.getElementById("notebook-note-title").value = page.title || "";
      document.getElementById("notebook-note-body").value = page.body || "";
      document.getElementById("paper-style").value = page.paper || "lined";
      document.getElementById("page-status").textContent = "Editing saved page.";

      updatePaperStyle();

      document.getElementById("notebook-note-title").scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "qs-button";
    remove.textContent = "Delete page";

    remove.addEventListener("click", () => {
      const confirmed = confirm(`Delete "${page.title || "Untitled page"}"?`);
      if (!confirmed) return;

      const currentNotebooks = getNotebooks();
      const index = currentNotebooks.findIndex(
        item => item.id === selectedNotebookId
      );

      if (index < 0) return;

      currentNotebooks[index].pages = getNotebookPages(
        currentNotebooks[index]
      ).filter(item => item.id !== page.id);

      if (!writeStorage("qnotes-notebooks", currentNotebooks)) {
        alert("Unable to delete the page.");
        return;
      }

      if (selectedPageId === page.id) {
        selectedPageId = null;
        document.getElementById("notebook-note-title").value = "";
        document.getElementById("notebook-note-body").value = "";
      }

      renderNotebookPages();
      renderMyNotebooks();
      updateDashboard();
    });

    actions.append(edit, remove);
    card.append(title, preview, actions);
    container.appendChild(card);
  });
}

// =====================================================
// 19. DASHBOARD COUNTERS
// =====================================================

function updateDashboard() {
  const taskCounter = document.getElementById("dashboard-tasks");
  const notebookCounter = document.getElementById("dashboard-notes");
  const upcoming = document.getElementById("dashboard-upcoming");

  if (taskCounter) {
    taskCounter.textContent = getTasks().filter(task => !task.done).length;
  }

  if (notebookCounter) {
    notebookCounter.textContent = getNotebooks().length;
  }

  if (!upcoming) return;

  upcoming.replaceChildren();

  const tasks = getTasks()
    .filter(task => !task.done)
    .sort((a, b) =>
      (a.date || "9999-12-31").localeCompare(b.date || "9999-12-31")
    )
    .slice(0, 3);

  if (tasks.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Nothing planned yet. Enjoy the breathing room!";
    upcoming.appendChild(empty);
    return;
  }

  tasks.forEach(task => {
    const item = document.createElement("p");
    item.textContent = task.title + (task.date ? " — " + task.date : "");
    upcoming.appendChild(item);
  });
}

// =====================================================
// 20. START QNOTES
// =====================================================

openPage("home");
