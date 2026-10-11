
// ============================================
// QNOTES
// Your next chapter starts here.
// Complete app foundation
// ============================================

const pageTitle = document.getElementById("page-title");
const pageContent = document.getElementById("page-content");
const navigation = document.getElementById("main-navigation");
const themeToggle = document.getElementById("theme-toggle");

// --------------------------------------------
// SAFE LOCAL STORAGE
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

// --------------------------------------------
// PAGE CONTENT
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
          <div class="section-heading">
            <h2>Your study overview</h2>
            <span class="muted">A fresh start, every day.</span>
          </div>

          <div class="card-grid">
            <article class="card card-lavender">
              <p class="eyebrow">MY PLANNER</p>
              <h2 id="dashboard-tasks">0</h2>
              <p>Tasks waiting for you</p>
              <button class="secondary-button" data-open-page="planner">
                View planner
              </button>
            </article>

            <article class="card card-blue">
              <p class="eyebrow">MY NOTEBOOK</p>
              <h2 id="dashboard-notes">0</h2>
              <p>Notes saved on this device</p>
              <button class="secondary-button" data-open-page="notebook">
                Open notebook
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
          <div id="dashboard-upcoming">
            <p class="muted">Your upcoming tasks will appear here.</p>
          </div>
        </section>

        <section class="stack">
          <h2>Your study sanctuary</h2>

          <div class="card-grid">
            <article class="card card-cream">
              <h3>Question papers</h3>
              <p>Prepare for your next exam with confidence.</p>
              <button class="secondary-button" data-open-page="papers">
                Explore
              </button>
            </article>

            <article class="card card-pink">
              <h3>Revision corner</h3>
              <p>Make room for practice and progress.</p>
              <button class="secondary-button" data-open-page="revision">
                Start revising
              </button>
            </article>

            <article class="card card-lavender">
              <h3>Study space</h3>
              <p>Your future home for connected learning.</p>
              <button class="secondary-button" data-open-page="study">
                Enter
              </button>
            </article>

            <article class="card card-blue">
              <h3>Theme studio</h3>
              <p>Make your study space feel like yours.</p>
              <button class="secondary-button" data-open-page="themes">
                Customise
              </button>
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
        <p class="muted">Add assignments, tests or study tasks.</p>

        <form id="task-form" class="stack">
          <input id="task-input" placeholder="What do you need to do?"
            maxlength="160" required>
          <input id="task-date" type="date" aria-label="Due date">
          <button class="primary-button" type="submit">Add task</button>
        </form>

        <div id="task-list" class="stack"></div>
      </section>
    `
  },

  notebook: {
    title: "Your notebook.",
    content: `
      <section class="card stack">
        <h2>A page of your own.</h2>
        <p class="muted">Collect your thoughts, one page at a time.</p>

        <input id="note-title" placeholder="Give your note a title"
          maxlength="160">
        <textarea id="note-body" placeholder="Let your ideas flow..."
          maxlength="30000"></textarea>

        <button id="save-note" class="primary-button">Save note</button>
        <p id="note-status" class="muted"></p>

        <h3>Your saved pages</h3>
        <div id="saved-notes" class="stack"></div>
      </section>
    `
  },

  study: {
    title: "Your study space.",
    content: `
      <section class="card card-lavender stack">
        <h2>Your study sanctuary.</h2>
        <p>AI tutoring, summaries and connected notebooks are planned here.</p>
        <p class="muted">AI features require a secure backend integration.</p>
      </section>
    `
  },

  papers: {
    title: "Question papers.",
    content: `
      <section class="card stack">
        <h2>Practise with purpose.</h2>
        <p>Question papers will support custom marks, answer spaces
          and memorandums.</p>
        <p class="muted">The exam builder will be developed in a later stage.</p>
      </section>
    `
  },

  revision: {
    title: "Your revision corner.",
    content: `
      <section class="card card-blue stack">
        <h2>Small sessions count.</h2>
        <p>Flashcards, quizzes and practice tests are part of our plan.</p>
        <p class="muted">Revision activities are coming in a later stage.</p>
      </section>
    `
  },

  community: {
    title: "The student community.",
    content: `
      <section class="card stack">
        <h2>Learning is better together.</h2>
        <p>Subject groups, discussions, comments and shared study tips.</p>
        <p class="muted">Community features need a backend and moderation.</p>
      </section>
    `
  },

  messages: {
    title: "Your messages.",
    content: `
      <section class="card stack">
        <h2>Your little inbox.</h2>
        <p>Private student chats and notifications will live here.</p>
        <p class="muted">Messaging needs accounts and privacy controls.</p>
      </section>
    `
  },

  themes: {
    title: "Your theme studio.",
    content: `
      <section class="card stack">
        <h2>Make Qnotes yours.</h2>
        <p>Explore blush, lavender, pearl cream, dusty rose,
          powder blue and more combinations.</p>
        <p class="muted">The interactive six-family theme gallery comes later.</p>
      </section>
    `
  },

  twin: {
    title: "Your Learning Twin.",
    content: `
      <section class="card card-lavender stack">
        <h2>Discover how you learn.</h2>
        <p>Your Learning Twin will track demonstrated understanding
          and help identify topics for revision.</p>
        <p class="muted">Learning analysis is not connected yet.</p>
      </section>
    `
  },

  plans: {
    title: "Your Qnotes membership.",
    content: `
      <section class="card card-pink stack">
        <h2>A plan for your next chapter.</h2>
        <p>Free and paid plans with monthly and annual options.</p>
        <p class="muted">Payments and subscriptions are not active yet.</p>
      </section>
    `
  }
};

// --------------------------------------------
// NAVIGATION
// --------------------------------------------

function openPage(pageName) {
  const page = pages[pageName];
  if (!page) return;

  pageTitle.textContent = page.title;
  pageContent.innerHTML = page.content;

  document.querySelectorAll(".nav-item").forEach(button => {
    const active = button.dataset.page === pageName;
    button.classList.toggle("active", active);

    if (active) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  if (pageName === "home") {
    renderTasks();
    updateDashboardNotes();
  }

  if (pageName === "planner") renderTasks();
  if (pageName === "notebook") renderNotes();
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
// LIGHT AND DARK MODE
// --------------------------------------------

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");

  themeToggle.textContent = theme === "dark"
    ? "☀ Switch to light mode"
    : "☾ Switch to dark mode";

  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));

  try {
    localStorage.setItem("qnotes-theme", theme);
  } catch {
    // The theme still works for this page if storage is unavailable.
  }
}

let savedTheme = "light";

try {
  savedTheme = localStorage.getItem("qnotes-theme") || "light";
} catch {
  // Use light mode if storage is unavailable.
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark")
    ? "light"
    : "dark";

  applyTheme(nextTheme);
});

// --------------------------------------------
// PLANNER TASKS
// --------------------------------------------

function getTasks() {
  const tasks = readStorage("qnotes-tasks", []);
  return Array.isArray(tasks) ? tasks : [];
}

function saveTasks(tasks) {
  return writeStorage("qnotes-tasks", tasks);
}

function renderTasks() {
  const taskList = document.getElementById("task-list");

  if (taskList) {
    taskList.replaceChildren();

    getTasks().forEach(task => {
      const row = document.createElement("article");
      row.className = "card stack";

      const label = document.createElement("label");
      const checkbox = document.createElement("input");

      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.style.width = "auto";
      checkbox.setAttribute("aria-label", "Mark task complete");

      label.append(checkbox, document.createTextNode(" " + task.title));

      if (task.done) label.style.textDecoration = "line-through";

      checkbox.addEventListener("change", () => {
        const tasks = getTasks();
        const index = tasks.findIndex(item => item.id === task.id);

        if (index !== -1) {
          tasks[index].done = checkbox.checked;
          saveTasks(tasks);
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
        saveTasks(getTasks().filter(item => item.id !== task.id));
        renderTasks();
      });

      row.appendChild(remove);
      taskList.appendChild(row);
    });

    if (getTasks().length === 0) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "Your list is empty. Enjoy the breathing room!";
      taskList.appendChild(empty);
    }
  }

  updateDashboardTasks();
}

function updateDashboardTasks() {
  const counter = document.getElementById("dashboard-tasks");

  if (counter) {
    counter.textContent = getTasks().filter(task => !task.done).length;
  }

  const upcoming = document.getElementById("dashboard-upcoming");
  if (!upcoming) return;

  upcoming.replaceChildren();

  const tasks = getTasks()
    .filter(task => !task.done)
    .sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date.localeCompare(b.date);
    })
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

pageContent.addEventListener("submit", event => {
  if (event.target.id !== "task-form") return;

  event.preventDefault();

  const input = document.getElementById("task-input");
  const date = document.getElementById("task-date");
  const title = input.value.trim();

  if (!title) return;

  const tasks = getTasks();

  tasks.push({
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now()) + Math.random(),
    title,
    date: date.value,
    done: false
  });

  if (!saveTasks(tasks)) {
    alert("Unable to save. Your browser storage may be full.");
    return;
  }

  renderTasks();
  event.target.reset();
});

// --------------------------------------------
// NOTEBOOK
// --------------------------------------------

function getNotes() {
  const notes = readStorage("qnotes-notes", []);
  return Array.isArray(notes) ? notes : [];
}

function renderNotes() {
  const container = document.getElementById("saved-notes");
  if (!container) return;

  container.replaceChildren();

  const notes = getNotes();

  if (notes.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Your first page is waiting to be written.";
    container.appendChild(empty);
  }

  notes.slice().reverse().forEach(note => {
    const card = document.createElement("article");
    card.className = "card stack";

    const heading = document.createElement("h3");
    heading.textContent = note.title || "Untitled note";

    const preview = document.createElement("p");
    preview.textContent = note.body || "An empty page.";
    preview.style.whiteSpace = "pre-wrap";

    const edit = document.createElement("button");
    edit.className = "secondary-button";
    edit.textContent = "Edit note";

    edit.addEventListener("click", () => {
      document.getElementById("note-title").value = note.title || "";
      document.getElementById("note-body").value = note.body || "";
      document.getElementById("save-note").dataset.editId = note.id;
      document.getElementById("note-status").textContent =
        "Editing your saved note.";
    });

    const remove = document.createElement("button");
    remove.className = "secondary-button";
    remove.textContent = "Delete note";

    remove.addEventListener("click", () => {
      const remaining = getNotes().filter(item => item.id !== note.id);

      if (writeStorage("qnotes-notes", remaining)) {
        renderNotes();
        updateDashboardNotes();
      }
    });

    card.append(heading, preview, edit, remove);
    container.appendChild(card);
  });

  updateDashboardNotes();
}

function updateDashboardNotes() {
  const counter = document.getElementById("dashboard-notes");

  if (counter) {
    counter.textContent = getNotes().length;
  }
}

pageContent.addEventListener("click", event => {
  if (event.target.id !== "save-note") return;

  const titleInput = document.getElementById("note-title");
  const bodyInput = document.getElementById("note-body");
  const status = document.getElementById("note-status");
  const button = event.target;

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title && !body) {
    status.textContent = "Write something before saving.";
    return;
  }

  const notes = getNotes();
  const editId = button.dataset.editId;

  if (editId) {
    const index = notes.findIndex(note => note.id === editId);

    if (index !== -1) {
      notes[index] = {
        ...notes[index],
        title: title || "Untitled note",
        body,
        updatedAt: new Date().toISOString()
      };
    }
  } else {
    notes.push({
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now()) + Math.random(),
      title: title || "Untitled note",
      body,
      createdAt: new Date().toISOString()
    });
  }

  if (!writeStorage("qnotes-notes", notes)) {
    status.textContent = "Unable to save. Browser storage may be full.";
    return;
  }

  delete button.dataset.editId;
  titleInput.value = "";
  bodyInput.value = "";
  status.textContent = "Your page has been saved on this device.";

  renderNotes();
});

// --------------------------------------------
// START QNOTES
// --------------------------------------------

openPage("home");
