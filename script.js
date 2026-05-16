const projectGrid = document.querySelector("#project-grid");
const searchInput = document.querySelector("#project-search");
const priorityFilter = document.querySelector("#priority-filter");
const focusCard = document.querySelector("#focus-card");
const notesField = document.querySelector("#quick-notes");
const metricTotal = document.querySelector("#metric-total");
const metricHigh = document.querySelector("#metric-high");
const metricProgress = document.querySelector("#metric-progress");
const metricNext = document.querySelector("#metric-next");
const activeCount = document.querySelector("#active-count");

const notesKey = "project-hub-notes";
let projects = [];
let selectedProjectId = "";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clampProgress(value) {
  return Math.min(100, Math.max(0, Number(value) || 0));
}

function getPriorityClass(priority) {
  return priority === "High" ? "badge--high" : priority === "Medium" ? "badge--medium" : "";
}

function getFilteredProjects() {
  const query = searchInput.value.trim().toLowerCase();
  const priority = priorityFilter.value;

  return projects.filter((project) => {
    const searchText = [
      project.name,
      project.type,
      project.status,
      project.priority,
      project.focus,
      project.nextAction,
      ...project.tags,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = !query || searchText.includes(query);
    const matchesPriority = priority === "all" || project.priority === priority;

    return matchesSearch && matchesPriority;
  });
}

function renderMetrics() {
  const total = projects.length;
  const highPriority = projects.filter((project) => project.priority === "High").length;
  const averageProgress = total
    ? Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / total)
    : 0;
  const nextProject = [...projects].sort((a, b) => b.progress - a.progress)[0];

  metricTotal.textContent = total;
  metricHigh.textContent = highPriority;
  metricProgress.textContent = `${averageProgress}%`;
  metricNext.textContent = nextProject ? nextProject.name.split(" ").slice(0, 2).join(" ") : "—";
  activeCount.textContent = `${total} projects loaded`;
}

function renderFocus(project = projects[0]) {
  if (!project) {
    focusCard.innerHTML = "<p>No project selected yet.</p>";
    return;
  }

  selectedProjectId = project.id;
  focusCard.innerHTML = `
    <span class="badge ${getPriorityClass(project.priority)}">${escapeHtml(project.priority)} priority</span>
    <h3>${escapeHtml(project.name)}</h3>
    <p>${escapeHtml(project.focus)}</p>
    <p><strong>Next action:</strong> ${escapeHtml(project.nextAction)}</p>
    <p><strong>Target:</strong> ${escapeHtml(project.due)}</p>
  `;
}

function renderProjects() {
  const filteredProjects = getFilteredProjects();

  if (!filteredProjects.length) {
    projectGrid.innerHTML = '<p class="empty-state">No projects match this search or filter.</p>';
    return;
  }

  projectGrid.innerHTML = filteredProjects
    .map(
      (project) => {
        const progress = clampProgress(project.progress);

        return `
        <article class="project-card">
          <div class="project-card__top">
            <div>
              <p class="project-card__meta">${escapeHtml(project.type)} • ${escapeHtml(project.status)}</p>
              <h3>${escapeHtml(project.name)}</h3>
            </div>
            <span class="badge ${getPriorityClass(project.priority)}">${escapeHtml(project.priority)}</span>
          </div>

          <p>${escapeHtml(project.focus)}</p>

          <div>
            <div class="project-card__footer">
              <strong>${progress}%</strong>
              <span class="project-card__meta">${escapeHtml(project.due)}</span>
            </div>
            <div class="progress-track" aria-label="${escapeHtml(project.name)} is ${progress}% complete">
              <div class="progress-bar" style="width: ${progress}%"></div>
            </div>
          </div>

          <p class="project-card__next"><strong>Next:</strong> ${escapeHtml(project.nextAction)}</p>

          <div class="project-card__footer">
            <div class="tag-list">
              ${project.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
            </div>
            <button class="select-focus" type="button" data-project-id="${escapeHtml(project.id)}">Focus</button>
          </div>
        </article>
      `;
      },
    )
    .join("");

  document.querySelectorAll("[data-project-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = projects.find((item) => item.id === button.dataset.projectId);
      renderFocus(project);
    });
  });
}

async function loadProjects() {
  try {
    const response = await fetch("data/projects.json");

    if (!response.ok) {
      throw new Error(`Project request failed with ${response.status}`);
    }

    projects = await response.json();
    renderMetrics();
    renderProjects();
    renderFocus(projects.find((project) => project.id === selectedProjectId) ?? projects[0]);
  } catch (error) {
    projectGrid.innerHTML = `
      <p class="empty-state">
        Project data could not be loaded. Check that <code>data/projects.json</code> exists.
      </p>
    `;
    console.error(error);
  }
}

searchInput.addEventListener("input", renderProjects);
priorityFilter.addEventListener("change", renderProjects);

notesField.value = localStorage.getItem(notesKey) ?? "";
notesField.addEventListener("input", () => {
  localStorage.setItem(notesKey, notesField.value);
});

loadProjects();
