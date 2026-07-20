let state;
let actorId = "guardian-1";
let toastTimer;

const elements = {
  actorSelect: document.querySelector("#actor-select"),
  guardianTools: document.querySelector("#guardian-tools"),
  bhoreList: document.querySelector("#bhore-list"),
  assignmentList: document.querySelector("#assignment-list"),
  ledgerList: document.querySelector("#ledger-list"),
  bhoreForm: document.querySelector("#bhore-form"),
  assignmentForm: document.querySelector("#assignment-form"),
  childForm: document.querySelector("#child-form"),
  assignmentBhore: document.querySelector("#assignment-bhore"),
  assignmentChild: document.querySelector("#assignment-child"),
  assignmentDue: document.querySelector("#assignment-due"),
  metricBalance: document.querySelector("#metric-balance"),
  metricOwner: document.querySelector("#metric-owner"),
  metricReview: document.querySelector("#metric-review"),
  metricCurrent: document.querySelector("#metric-current"),
  metricLongest: document.querySelector("#metric-longest"),
  toast: document.querySelector("#toast")
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function money(cents) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function shortDate(value) {
  if (!value) return "—";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T12:00:00`) : new Date(value);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

function actorName(id) {
  return state.actors.find((actor) => actor.id === id)?.name ?? "Unknown";
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: options.body ? { "content-type": "application/json", ...(options.headers ?? {}) } : options.headers
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error?.message ?? "Request failed");
  return payload;
}

function showToast(message, error = false) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.toggle("error", error);
  elements.toast.classList.add("visible");
  toastTimer = setTimeout(() => elements.toast.classList.remove("visible"), 2600);
}

function empty(message) {
  return `<div class="empty-state">${escapeHtml(message)}</div>`;
}

function renderActorSelect() {
  elements.actorSelect.innerHTML = state.actors.map((actor) => (
    `<option value="${escapeHtml(actor.id)}" ${actor.id === actorId ? "selected" : ""}>${escapeHtml(actor.name)} · ${escapeHtml(actor.role)}</option>`
  )).join("");
}

function renderMetrics() {
  const focus = state.currentActor.role === "child" ? state.currentActor : state.children[0];
  const streak = focus ? state.streaks[focus.id] : { current: 0, longest: 0 };
  elements.metricBalance.textContent = money(focus ? state.balances[focus.id] : 0);
  elements.metricOwner.textContent = focus ? `${focus.name}'s available allowance` : "No child selected";
  elements.metricReview.textContent = state.assignments.filter((assignment) => assignment.state === "submitted").length;
  elements.metricCurrent.textContent = streak?.current ?? 0;
  elements.metricLongest.textContent = streak?.longest ?? 0;
}

function renderGuardianTools() {
  const guardian = state.currentActor.role === "guardian";
  elements.guardianTools.classList.toggle("hidden", !guardian);
  if (!guardian) return;

  const activeBhores = state.bhores.filter((bhore) => bhore.state === "active");
  elements.assignmentBhore.innerHTML = activeBhores.length
    ? activeBhores.map((bhore) => `<option value="${escapeHtml(bhore.id)}">${escapeHtml(bhore.title)} · ${money(bhore.rewardCents)}</option>`).join("")
    : `<option value="">Create a bhore first</option>`;
  elements.assignmentChild.innerHTML = state.children.map((child) => (
    `<option value="${escapeHtml(child.id)}">${escapeHtml(child.name)}</option>`
  )).join("");
}

function renderBhores() {
  if (state.bhores.length === 0) {
    elements.bhoreList.innerHTML = empty("No bhores yet. A guardian can create the first one.");
    return;
  }
  elements.bhoreList.innerHTML = state.bhores.map((bhore) => `
    <article class="bhore-card ${bhore.state === "archived" ? "archived" : ""}">
      <div>
        <h3>${escapeHtml(bhore.title)}</h3>
        <p>${escapeHtml(bhore.instructions || "No special instructions.")}</p>
      </div>
      <div class="card-footer">
        <span class="reward-chip">${money(bhore.rewardCents)}</span>
        ${state.currentActor.role === "guardian" && bhore.state === "active"
          ? `<button class="text-button" data-action="archive" data-id="${escapeHtml(bhore.id)}">Archive</button>`
          : `<small>${escapeHtml(bhore.state)}</small>`}
      </div>
    </article>
  `).join("");
}

function assignmentActions(assignment) {
  const actor = state.currentActor;
  const canSubmit = ["available", "rejected"].includes(assignment.state)
    && (actor.role === "guardian" || actor.id === assignment.childId);
  if (canSubmit) {
    return `<button data-action="submit" data-id="${escapeHtml(assignment.id)}">${actor.role === "guardian" ? "Mark complete" : "I finished it"}</button>`;
  }
  if (actor.role === "guardian" && assignment.state === "submitted") {
    return `
      <button class="approve-button" data-action="approve" data-id="${escapeHtml(assignment.id)}">Approve ${money(assignment.proposedRewardCents)}</button>
      <button class="reject-button" data-action="reject" data-id="${escapeHtml(assignment.id)}">Send back</button>
    `;
  }
  return "";
}

function renderAssignments() {
  if (state.assignments.length === 0) {
    elements.assignmentList.innerHTML = empty("No assignments are visible for this person yet.");
    return;
  }
  const ordered = [...state.assignments].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  elements.assignmentList.innerHTML = ordered.map((assignment) => `
    <article class="assignment-row">
      <div class="assignment-title">
        <strong>${escapeHtml(assignment.bhoreTitle)}</strong>
        <small>${escapeHtml(actorName(assignment.childId))}${assignment.feedback ? ` · ${escapeHtml(assignment.feedback)}` : ""}</small>
      </div>
      <span class="assignment-meta">Due ${escapeHtml(shortDate(assignment.dueDate))}</span>
      <span class="status-pill status-${escapeHtml(assignment.state)}">${escapeHtml(assignment.state)}</span>
      <div class="assignment-actions">${assignmentActions(assignment)}</div>
    </article>
  `).join("");
}

function renderLedger() {
  if (state.transactions.length === 0) {
    elements.ledgerList.innerHTML = empty("Approved work and adjustments will appear here without rewriting history.");
    return;
  }
  elements.ledgerList.innerHTML = state.transactions.map((transaction) => `
    <article class="ledger-row">
      <time datetime="${escapeHtml(transaction.effectiveAt)}">${escapeHtml(shortDate(transaction.effectiveAt))}</time>
      <strong>${escapeHtml(transaction.reason)}</strong>
      <small>${escapeHtml(actorName(transaction.childId))}</small>
      <span class="ledger-amount">${transaction.amountCents >= 0 ? "+" : "−"}${money(Math.abs(transaction.amountCents))}</span>
    </article>
  `).join("");
}

function render() {
  renderActorSelect();
  renderMetrics();
  renderGuardianTools();
  renderBhores();
  renderAssignments();
  renderLedger();
}

async function refresh() {
  state = await api(`/api/state?actor=${encodeURIComponent(actorId)}`);
  render();
}

async function perform(work, successMessage) {
  try {
    await work();
    await refresh();
    showToast(successMessage);
  } catch (error) {
    showToast(error.message, true);
  }
}

elements.actorSelect.addEventListener("change", async (event) => {
  actorId = event.target.value;
  await refresh();
});

elements.bhoreForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  await perform(async () => {
    await api("/api/bhores", {
      method: "POST",
      body: JSON.stringify({
        actorId,
        title: data.get("title"),
        instructions: data.get("instructions"),
        rewardCents: Math.round(Number(data.get("reward")) * 100)
      })
    });
    event.currentTarget.reset();
  }, "Bhore created");
});

elements.assignmentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  await perform(() => api("/api/assignments", {
    method: "POST",
    body: JSON.stringify({
      actorId,
      bhoreId: data.get("bhoreId"),
      childId: data.get("childId"),
      dueDate: data.get("dueDate")
    })
  }), "Assignment added");
});

elements.childForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  await perform(async () => {
    await api("/api/children", {
      method: "POST",
      body: JSON.stringify({ actorId, name: data.get("name") })
    });
    event.currentTarget.reset();
  }, "Child added");
});

document.body.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  const routes = {
    archive: [`/api/bhores/${id}/archive`, { actorId }],
    submit: [`/api/assignments/${id}/submit`, { actorId }],
    approve: [`/api/assignments/${id}/approve`, { actorId }],
    reject: [`/api/assignments/${id}/reject`, { actorId, feedback: "Please give this another try." }]
  };
  const [path, body] = routes[action];
  await perform(() => api(path, { method: "POST", body: JSON.stringify(body) }), {
    archive: "Bhore archived",
    submit: "Work submitted for review",
    approve: "Approved and added to allowance",
    reject: "Assignment sent back with feedback"
  }[action]);
});

elements.assignmentDue.value = new Date().toISOString().slice(0, 10);
refresh().catch((error) => showToast(error.message, true));
