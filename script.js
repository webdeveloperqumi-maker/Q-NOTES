
// ========================================
// QNOTES — APP FOUNDATION
// Your next chapter starts here.
// ========================================

const pageTitle = document.getElementById("page-title");
const pageContent = document.getElementById("page-content");
const navigation = document.getElementById("main-navigation");
const themeToggle = document.getElementById("theme-toggle");

// Page names and welcome messages
const pages = {
  home: {
    title: "Welcome to Qnotes.",
    subtitle: "Your next chapter starts here.",
    content: `
      <div class="stack">
        <section class="card card-pink">
          <p class="eyebrow">A LITTLE REMINDER</p>
          <h2>Your dreams deserve a plan.</h2>
          <p>Make room for learning, growing and becoming.</p>
        </section>

        <div class="card-grid">
          <article class="card card-lavender">
            <h3>Today's planner</h3>
            <p>Keep your assignments and study sessions organised.</p>
            <button class="primary-button"
              data-open-page="planner">Open planner</button>
          </article>

          <article class="card card-blue">
            <h3>Your notebook</h3>
            <p>Give your ideas a beautiful place to live.</p>
            <button class="secondary-button"
              data-open-page="notebook">Open notebook</button>
          </article>

          <article class="card">
            <h3>Revision corner</h3>
            <p>Prepare for your next test, one topic at a time.</p>
            <button class="secondary-button"
              data-open-page="revision">Start revising</button>
          </article>

          <article class="card card-cream">
            <h3>Study space</h3>
            <p>Your future home for focused learning and AI study tools.</p>
            <button class="secondary-button"
              data-open-page="study">Explore study space</button>
          </article>
        </div>
      </div>
    `
  },

  planner: {
    title: "Your planner.",
    content: `
      <section class="card stack">
        <h2>Little steps, big dreams.</h2>
        <p class="muted">Add a task to your study list.</p>
        <form id="task-form" class="stack">
          <input id="task-input" placeholder="e.g. Revise organic chemistry"
            required maxlength="160">
          <input id="task-date" type="date" aria-label="Task due date">
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
        <input id="note-title" placeholder="Give your note a title">
        <textarea id="note-body"
          placeholder="Let your ideas flow..."></textarea>
        <button id="save-note" class="primary-button">Save note</button>
        <p id="note-status" class="muted">Your notes stay in this browser for now.</p>
      </section>
    `
  },

  study: {
    title: "Your study space.",
    content: `
      <section class="card card-lavender stack">
        <h2>Welcome to your study sanctuary.</h2>
        <p>AI tutoring, summaries and connected study tools will live here.</p>
        <p class="muted">AI features need a secure backend connection.</p>
      </section>
    `
  },

  papers: {
    title: "Question papers.",
    content: `
      <section class="card stack">
        <h2>Practise with purpose.</h2>
        <p>Our exam workspace will support custom marks, questions,
        answer spaces and memorandums.</p>
        <p class="muted">The question-paper builder is coming in a later stage.</p>
      </section>
    `
  },

  revision: {
    title: "Your revision corner.",
    content: `
      <section class="card card-blue stack">
        <h2>Small sessions count.</h2>
        <p>Flashcards, quizzes and practice tests will help you prepare.</p>
        <p class="muted">Revision tools are being built in stages.</p>
      </section>
    `
  },

  community: {
    title: "The student community.",
    content: `
      <section class="card stack">
        <h2>Learning is better together.</h2>
        <p>Subject groups, discussions and shared study tips belong here.</p>
        <p class="muted">Community posting requires a backend and moderation.</p>
      </section>
    `
  },

  messages: {
    title: "Your messages.",
    content: `
      <section class="card stack">
        <h2>Your little inbox.</h2>
        <p>Private student chats and notifications will live here.</p>
        <p class="muted">Messaging will require accounts and privacy controls.</p>
      </section>
    `
  },

  themes: {
    title: "Your theme studio.",
    content: `
      <section class="card stack">
        <h2>Make Qnotes yours.</h2>
        <p>Blush, lavender, pearl, blue and more theme combinations
        will help you personalise your workspace.</p>
        <p class="muted">The full six-family theme gallery is coming later.</p>
      </section>
    `
  },

  twin: {
    title: "Your Learning Twin.",
    content: `
      <section class="card card-lavender stack">
        <h2>Discover how you learn.</h2>
        <p>Your Learning Twin will track demonstrated understanding
        and help identify topics that need more practice.</p>
        <p class="muted">Progress tracking and learning analysis are not connected yet.</p>
      </section>
    `
  },

  plans: {
    title: "Your Qnotes membership.",
    content: `
      <section class="card card-pink stack">
        <h2>A plan for your next chapter.</h2>
        <p>We'll develop free and paid plans with monthly and annual options.</p>
        <p class="muted">No subscriptions or payments are active yet.</p>
      </section>
    `
  }
};

// Change pages
function openPage(pageName) {
  const page = pages[pageName];

  if (!page) return;

  pageTitle.textContent = page.title;
  pageContent.innerHTML = page.content;

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === pageName
    );
  });

  if (pageName === "planner") renderTasks();
}

// Navigation buttons
navigation.addEventListener("click", event => {
  const button = event.target.closest("[data-page]");

  if (button) openPage(button.dataset.page);
});

// Dashboard shortcut buttons
pageContent.addEventListener("click", event => {
  const button = event.target.closest("[data-open-page]");

  if (button) openPage(button.dataset.openPage);
});

// Light and dark modes
function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");

  themeToggle.textContent =
    theme === "dark" ? "☀ Switch to light mode" : "☾ Switch to dark mode";

  localStorage.setItem("qnotes-theme", theme);
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark")
    ? "light"
    : "dark";

  applyTheme(nextTheme);
});

applyTheme(localStorage.getItem("qnotes-theme") || "light");

// Basic local task storage
function getTasks() {
  try {
    return JSON.parse(localStorage.getItem("qnotes-tasks")) || [];
  } catch {
    return [];
  }
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  if (!taskList) return;

  taskList.innerHTML = "";

  getTasks().forEach((task, index) => {
    const row = document.createElement("div");
    row.className = "card";

    const label = document.createElement("label");
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.style.width = "auto";

    checkbox.addEventListener("change", () => {
      const tasks = getTasks();
      tasks[index].done = checkbox.checked;
      localStorage.setItem("qnotes-tasks", JSON.stringify(tasks));
      renderTasks();
    });

    label.append(checkbox, document.createTextNode(" " + task.title));

    if (task.date) {
      const date = document.createElement("p");
      date.className = "muted";
      date.textContent = "Due: " + task.date;
      row.append(label, date);
    } else {
      row.append(label);
    }

    if (task.done) label.style.textDecoration = "line-through";

    const remove = document.createElement("button");
    remove.className = "secondary-button";
    remove.textContent = "Remove";

    remove.addEventListener("click", () => {
      const tasks = getTasks();
      tasks.splice(index, 1);
      localStorage.setItem("qnotes-tasks", JSON.stringify(tasks));
      renderTasks();
    });

    row.append(remove);
    taskList.append(row);
  });
}

pageContent.addEventListener("submit", event => {
  if (event.target.id !== "task-form") return;

  event.preventDefault();

  const input = document.getElementById("task-input");
  const date = document.getElementById("task-date");

  const tasks = getTasks();

  tasks.push({
    title: input.value.trim(),
    date: date.value,
    done: false
  });

  localStorage.setItem("qnotes-tasks", JSON.stringify(tasks));
  renderTasks();
});

// Basic local notebook saving
pageContent.addEventListener("click", event => {
  if (event.target.id !== "save-note") return;

  const title = document.getElementById("note-title").value.trim();
  const body = document.getElementById("note-body").value.trim();
  const status = document.getElementById("note-status");

  if (!title && !body) {
    status.textContent = "Write something before saving.";
    return;
  }

  try {
    const notes = JSON.parse(localStorage.getItem("qnotes-notes")) || [];

    notes.push({
      title: title || "Untitled note",
      body,
      savedAt: new Date().toISOString()
    });

    localStorage.setItem("qnotes-notes", JSON.stringify(notes));
    status.textContent = "Your note has been saved on this device.";
  } catch {
    status.textContent = "Could not save. Your browser storage may be full.";
  }
});

// Open the home dashboard
openPage("home");
