
// ============================================
// QNOTES — NOTEBOOK STUDIO FOUNDATION
// Your next chapter starts here.
// ============================================

const pageTitle = document.getElementById("page-title");
const pageContent = document.getElementById("page-content");
const navigation = document.getElementById("main-navigation");
const themeToggle = document.getElementById("theme-toggle");

// --------------------------------------------
// STORAGE HELPERS
// --------------------------------------------

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

// --------------------------------------------
// NOTEBOOK COLLECTION
// --------------------------------------------

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

// 60 Ultra Premium design entries, organised into six collections.
const designFamilies = [
  {
    name: "Floral Garden",
    designs: [
      "Rose Garden", "Wildflower Meadow", "Cherry Blossom",
      "Pressed Flowers", "Lavender Fields", "Daisy Days",
      "Vintage Roses", "Botanical Study", "Peony Dreams",
      "Secret Garden"
    ]
  },
  {
    name: "Academia",
    designs: [
      "Dark Academia", "Light Academia", "Library Classics",
      "Vintage Manuscript", "Oxford Study", "Antique Books",
      "Poet's Desk", "Autumn Library", "Literary Muse",
      "Scholar's Edition"
    ]
  },
  {
    name: "Coquette",
    designs: [
      "Pink Satin Bows", "Pearl Ribbon", "Lace & Roses",
      "Blush Ballet", "Ribbon Diary", "French Romance",
      "Tiny Hearts", "Powder Pink", "Rosewater Lace",
      "Love Letters"
    ]
  },
  {
    name: "Celestial",
    designs: [
      "Moonlit Sky", "Golden Constellations", "Starry Night",
      "Moon Phases", "Cosmic Lavender", "Midnight Blue",
      "Solar Dreams", "Shooting Stars", "Celestial Map",
      "Stardust"
    ]
  },
  {
    name: "Minimalist",
    designs: [
      "Pearl Minimal", "Soft Geometry", "Monochrome",
      "Modern Lines", "Quiet Luxury", "Neutral Layers",
      "Ivory Sketch", "Minimal Rose", "Clean Slate",
      "Modern Scholar"
    ]
  },
  {
    name: "Seasonal & Artistic",
    designs: [
      "Autumn Leaves", "Winter Frost", "Spring Garden",
      "Summer Postcards", "Watercolour Sky", "Ocean Blue",
      "Golden Hour", "Dreamy Clouds", "Painted Petals",
      "Midnight Garden"
    ]
  }
];

const ultraDesigns = designFamilies.flatMap((family, familyIndex) =>
  family.designs.map((name, index) => ({
    id: `ultra-${familyIndex}-${index}`,
    name,
    family: family.name,
    colour: [
      "#DDA8BE", "#A8B8D8", "#D8C4A8",
      "#9D8ABF", "#A5C7B5", "#D9A47D"
    ][familyIndex],
    tier: "ultra"
  }))
);

// --------------------------------------------
// APP PAGES
// --------------------------------------------

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
    content: `
      <div class="stack">

        <section class="card card-pink stack">
          <p class="eyebrow">YOUR PERSONAL STATIONERY COLLECTION</p>
          <h2>A notebook for every chapter.</h2>
          <p>Choose a colour, give your notebook a name and organise your subjects.</p>
        </section>

        <section class="card stack">
          <h2>Create a notebook</h2>

          <form id="notebook-form" class="stack">
            <label for="notebook-name">Notebook name</label>
            <input id="notebook-name" maxlength="60"
              placeholder="e.g. Chemistry notes" required>

            <label for="notebook-subject">Subject</label>
            <input id="notebook-subject" maxlength="60"
              placeholder="e.g. SCHE012">

            <h3>Free colours</h3>
            <div id="free-colours" class="colour-grid"></div>

            <p class="muted">Select your favourite colour above.</p>
            <button class="primary-button" type="submit">
              Create my notebook
            </button>
            <p id="notebook-status" class="muted" aria-live="polite"></p>
          </form>
        </section>

        <section class="card stack">
          <h2>My notebooks</h2>
          <div id="my-notebooks" class="notebook-grid"></div>
        </section>

        <section class="card stack">
          <div class="section-heading">
            <div>
              <p class="eyebrow">PREMIUM COLLECTION</p>
              <h2>More beautiful colours</h2>
            </div>
            <span class="tier-label">PREMIUM</span>
          </div>
          <div id="premium-colours" class="notebook-grid"></div>
        </section>

        <section class="card stack">
          <div class="section-heading">
            <div>
              <p class="eyebrow">THE SIGNATURE COLLECTION</p>
              <h2>60 exclusive designs</h2>
            </div>
            <span class="tier-label">ULTRA PREMIUM</span>
          </div>
          <p class="muted">Six collections, ten designs each.</p>
          <div id="ultra-collections" class="stack"></div>
        </section>

        <section id="notebook-editor" class="card stack" hidden>
          <div class="section-heading">
            <h2 id="editor-title">My notebook</h2>
            <button id="close-editor" class="secondary-button">Close</button>
          </div>

          <label for="paper-style">Paper style</label>
          <select id="paper-style">
            <option value="lined">Lined</option>
            <option value="dotted">Dotted</option>
            <option value="grid">Grid</option>
            <option value="blank">Blank</option>
          </select>

          <label for="notebook-note-title">Page title</label>
          <input id="notebook-note-title" maxlength="120"
            placeholder="Today's lecture">

          <label for="notebook-note-body">Your notes</label>
          <textarea id="notebook-note-body"
            class="paper-page" maxlength="30000"
            placeholder="Start writing your next chapter..."></textarea>

          <button id="save-notebook-page" class="primary-button">
            Save page
          </button>
          <p id="page-status" class="muted" aria-live="polite"></p>

          <h3>Saved pages</h3>
          <div id="notebook-pages" class="stack"></div>
        </section>

      </div>
    `
  },

  study: {
    title: "Your study space.",
    content: `<section class="card card-lavender stack">
      <h2>Your study sanctuary.</h2>
      <p>AI tutoring, summaries and connected notebooks will live here.</p>
      <p class="muted">AI features need a secure backend integration.</p>
    </section>`
  },

  papers: {
    title: "Question papers.",
    content: `<section class="card stack">
      <h2>Practise with purpose.</h2>
      <p>Custom marks, questions, answer spaces and memorandums are planned.</p>
      <p class="muted">The exam builder is not connected yet.</p>
    </section>`
  },

  revision: {
    title: "Your revision corner.",
    content: `<section class="card card-blue stack">
      <h2>Small sessions count.</h2>
      <p>Flashcards, quizzes and practice tests are coming.</p>
    </section>`
  },

  community: {
    title: "The student community.",
    content: `<section class="card stack">
      <h2>Learning is better together.</h2>
      <p>Subject groups, posts, comments and discussions are planned.</p>
      <p class="muted">Community features require a backend and moderation.</p>
    </section>`
  },

  messages: {
    title: "Your messages.",
    content: `<section class="card stack">
      <h2>Your little inbox.</h2>
      <p>Private messages and notifications are planned.</p>
    </section>`
  },

  themes: {
    title: "Your theme studio.",
    content: `<section class="card stack">
      <h2>Make Qnotes yours.</h2>
      <p>Our full theme gallery and six theme families are coming later.</p>
    </section>`
  },

  twin: {
    title: "Your Learning Twin.",
    content: `<section class="card card-lavender stack">
      <h2>Discover how you learn.</h2>
      <p>Track demonstrated understanding and identify topics to revise.</p>
    </section>`
  },

  plans: {
    title: "Your Qnotes membership.",
    content: `<section class="card card-pink stack">
      <h2>A plan for your next chapter.</h2>
      <p>Free, Premium and Ultra Premium membership options are planned.</p>
      <p class="muted">Billing is not active. Tier locks are previews, not payment enforcement.</p>
    </section>`
  }
};

// --------------------------------------------
// NAVIGATION
// --------------------------------------------

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

  if (name === "home") {
    updateDashboard();
  }

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

// --------------------------------------------
// APPEARANCE
// --------------------------------------------

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  themeToggle.textContent = theme === "dark"
    ? "☀ Switch to light mode"
    : "☾ Switch to dark mode";

  try {
    localStorage.setItem("qnotes-theme", theme);
  } catch {}
}

let initialTheme = "light";

try {
  initialTheme = localStorage.getItem("qnotes-theme") || "light";
} catch {}

applyTheme(initialTheme);

themeToggle.addEventListener("click", () => {
  applyTheme(document.body.classList.contains("dark") ? "light" : "dark");
});

// --------------------------------------------
// PLANNER
// --------------------------------------------

function getTasks() {
  const value = readStorage("qnotes-tasks", []);
  return Array.isArray(value) ? value : [];
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
      checkbox.checked = task.done;
      checkbox.style.width = "auto";

      label.append(checkbox, document.createTextNode(" " + task.title));
      if (task.done) label.style.textDecoration = "line-through";

      checkbox.addEventListener("change", () => {
        const tasks = getTasks();
        const index = tasks.findIndex(item => item.id === task.id);
        if (index < 0) return;

        tasks[index].done = checkbox.checked;
        saveTasks(tasks);
        renderTasks();
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
        saveTasks(getTasks().filter(item => item.id !== task.id));
        renderTasks();
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

function saveTasks(tasks) {
  if (!writeStorage("qnotes-tasks", tasks)) {
    alert("Unable to save tasks. Browser storage may be full.");
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

// --------------------------------------------
// NOTEBOOK STORAGE
// --------------------------------------------

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

function renderColourChoices() {
  const freeContainer = document.getElementById("free-colours");
  const premiumContainer = document.getElementById("premium-colours");

  if (!freeContainer || !premiumContainer) return;

  freeContainer.replaceChildren();
  premiumContainer.replaceChildren();

  freeNotebooks.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "colour-choice";
    button.style.setProperty("--notebook-colour", item.colour);
    button.setAttribute("aria-pressed", String(selectedColour === item.id));
    button.innerHTML = `
      <span class="colour-swatch"></span>
      <span>${item.name}</span>
    `;

    button.addEventListener("click", () => {
      selectedColour = item.id;
      renderColourChoices();
    });

    freeContainer.appendChild(button);
  });

  premiumColours.forEach(item => {
    const card = document.createElement("article");
    card.className = "notebook-cover locked";
    card.style.setProperty("--notebook-colour", item.colour);
    card.innerHTML = `
      <span class="lock-symbol">♔</span>
      <span class="cover-name">${item.name}</span>
      <span class="cover-tier">PREMIUM</span>
    `;

    premiumContainer.appendChild(card);
  });
}

function createNotebookCover(notebook) {
  const cover = document.createElement("article");
  cover.className = "notebook-cover";
  cover.style.setProperty("--notebook-colour", notebook.colour);
  cover.tabIndex = 0;
  cover.setAttribute("role", "button");
  cover.setAttribute("aria-label", "Open " + notebook.name);

  const icon = document.createElement("span");
  icon.className = "cover-icon";
  icon.textContent = "Q";

  const title = document.createElement("span");
  title.className = "cover-name";
  title.textContent = notebook.name;

  const subject = document.createElement("span");
  subject.className = "cover-subject";
  subject.textContent = notebook.subject || "Personal notebook";

  const open = () => openNotebook(notebook.id);

  cover.addEventListener("click", open);
  cover.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  });

  cover.append(icon, title, subject);
  return cover;
}

function renderNotebookStudio() {
  selectedColour = "pink";
  renderColourChoices();
  renderMyNotebooks();
  renderUltraCollections();
  closeNotebookEditor();
}

function renderMyNotebooks() {
  const container = document.getElementById("my-notebooks");
  if (!container) return;

  container.replaceChildren();

  const notebooks = getNotebooks();

  if (notebooks.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Your collection is waiting for its first notebook.";
    container.appendChild(empty);
  }

  notebooks.forEach(notebook => {
    const wrapper = document.createElement("div");
    wrapper.className = "notebook-item";

    wrapper.appendChild(createNotebookCover(notebook));

    const actions = document.createElement("div");
    actions.className = "notebook-actions";

    const rename = document.createElement("button");
    rename.className = "secondary-button";
    rename.textContent = "Rename";
    rename.addEventListener("click", () => {
      const nextName = prompt("Choose a new notebook name:", notebook.name);
      if (nextName === null || !nextName.trim()) return;

      updateNotebook(notebook.id, item => {
        item.name = nextName.trim().slice(0, 60);
      });
    });

    const remove = document.createElement("button");
    remove.className = "secondary-button";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => {
      const confirmed = confirm(`Delete "${notebook.name}" and its pages?`);
      if (!confirmed) return;

      writeStorage("qnotes-notebooks",
        getNotebooks().filter(item => item.id !== notebook.id));

      renderMyNotebooks();
      updateDashboard();
    });

    actions.append(rename, remove);
    wrapper.appendChild(actions);
    container.appendChild(wrapper);
  });
}

function updateNotebook(id, updater) {
  const notebooks = getNotebooks();
  const index = notebooks.findIndex(item => item.id === id);
  if (index < 0) return;

  updater(notebooks[index]);

  if (!writeStorage("qnotes-notebooks", notebooks)) {
    alert("Unable to save notebook changes.");
    return;
  }

  renderMyNotebooks();
  updateDashboard();
}

pageContent.addEventListener("submit", event => {
  if (event.target.id !== "notebook-form") return;
  event.preventDefault();

  const name = document.getElementById("notebook-name").value.trim();
  const subject = document.getElementById("notebook-subject").value.trim();
  const status = document.getElementById("notebook-status");

  if (!name) return;

  const colour = freeNotebooks.find(item => item.id === selectedColour);

  if (!colour) {
    status.textContent = "Please choose a notebook colour.";
    return;
  }

  const notebooks = getNotebooks();

  notebooks.push({
    id: makeId(),
    name,
    subject,
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
  status.textContent = "Your new notebook is ready!";
  renderMyNotebooks();
  updateDashboard();
});

// --------------------------------------------
// 60 ULTRA PREMIUM DESIGN PREVIEWS
// --------------------------------------------

function renderUltraCollections() {
  const container = document.getElementById("ultra-collections");
  if (!container) return;

  container.replaceChildren();

  designFamilies.forEach(family => {
    const section = document.createElement("section");
    section.className = "stack";

    const heading = document.createElement("h3");
    heading.textContent = family.name;

    const grid = document.createElement("div");
    grid.className = "notebook-grid";

    ultraDesigns.filter(item => item.family === family.name)
      .forEach(design => {
        const cover = document.createElement("article");
        cover.className = "notebook-cover locked";
        cover.style.setProperty("--notebook-colour", design.colour);

        const lock = document.createElement("span");
        lock.className = "lock-symbol";
        lock.textContent = "♔";

        const title = document.createElement("span");
        title.className = "cover-name";
        title.textContent = design.name;

        const tier = document.createElement("span");
        tier.className = "cover-tier";
        tier.textContent = "ULTRA PREMIUM";

        cover.append(lock, title, tier);
        grid.appendChild(cover);
      });

    section.append(heading, grid);
    container.appendChild(section);
  });
}

// --------------------------------------------
// OPEN NOTEBOOK AND MANAGE PAGES
// --------------------------------------------

function openNotebook(id) {
  const notebook = getNotebooks().find(item => item.id === id);
  if (!notebook) return;

  selectedNotebookId = id;
  selectedPageId = null;

  document.getElementById("notebook-editor").hidden = false;
  document.getElementById("editor-title").textContent = notebook.name;
  document.getElementById("notebook-note-title").value = "";
  document.getElementById("notebook-note-body").value = "";
  document.getElementById("page-status").textContent = "";

  renderNotebookPages();
  document.getElementById("notebook-editor").scrollIntoView({
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

function renderNotebookPages() {
  const container = document.getElementById("notebook-pages");
  if (!container || !selectedNotebookId) return;

  container.replaceChildren();

  const notebook = getNotebooks().find(item => item.id === selectedNotebookId);
  if (!notebook) return;

  getNotebookPages(notebook).forEach(page => {
    const card = document.createElement("article");
    card.className = "card stack";

    const title = document.createElement("h3");
    title.textContent = page.title;

    const preview = document.createElement("p");
    preview.className = "muted";
    preview.textContent = page.body.slice(0, 180);

    const edit = document.createElement("button");
    edit.className = "secondary-button";
    edit.textContent = "Edit page";

    edit.addEventListener("click", () => {
      selectedPageId = page.id;
      document.getElementById("notebook-note-title").value = page.title;
      document.getElementById("notebook-note-body").value = page.body;
      document.getElementById("paper-style").value = page.paper || "lined";
      document.getElementById("page-status").textContent = "Editing saved page.";
    });

    const remove = document.createElement("button");
    remove.className = "secondary-button";
    remove.textContent = "Delete page";

    remove.addEventListener("click", () => {
      updateNotebook(notebook.id, item => {
        item.pages = getNotebookPages(item).filter(p => p.id !== page.id);
      });
      renderNotebookPages();
      updateDashboard();
    });

    card.append(title, preview, edit, remove);
    container.appendChild(card);
  });
}

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
    const index = notebook.pages.findIndex(item => item.id === selectedPageId);

    if (index !== -1) {
      notebook.pages[index] = {
        ...notebook.pages[index],
        title,
        body,
        paper,
        updatedAt: new Date().toISOString()
      };
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
  status.textContent = "Your page has been saved!";
  renderNotebookPages();
  updateDashboard();
});

// --------------------------------------------
// NOTEBOOK PAPER STYLE PREVIEW
// --------------------------------------------

pageContent.addEventListener("change", event => {
  if (event.target.id !== "paper-style") return;

  const body = document.getElementById("notebook-note-body");
  if (!body) return;

  body.dataset.paper = event.target.value;
});

// --------------------------------------------
// DASHBOARD COUNTERS
// --------------------------------------------

function updateDashboard() {
  const taskCounter = document.getElementById("dashboard-tasks");
  const noteCounter = document.getElementById("dashboard-notes");
  const upcoming = document.getElementById("dashboard-upcoming");

  if (taskCounter) {
    taskCounter.textContent = getTasks().filter(task => !task.done).length;
  }

  if (noteCounter) {
    noteCounter.textContent = getNotebooks().length;
  }

  if (upcoming) {
    upcoming.replaceChildren();

    const tasks = getTasks()
      .filter(task => !task.done)
      .sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"))
      .slice(0, 3);

    if (!tasks.length) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "Nothing planned yet. Enjoy the breathing room!";
      upcoming.appendChild(empty);
    }

    tasks.forEach(task => {
      const item = document.createElement("p");
      item.textContent = task.title + (task.date ? " — " + task.date : "");
      upcoming.appendChild(item);
    });
  }
}

// --------------------------------------------
// START APP
// --------------------------------------------

openPage("home");
