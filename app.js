const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const appointmentModal = $("#appointmentModal");
const loginModal = $("#loginModal");
const toast = $("#toast");

$("#year").textContent = new Date().getFullYear();

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3600);
}
function openDialog(dialog) {
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}
function closeDialog(dialog) {
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
}
$$("[data-open]").forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.specialty) $("#specialty").value = button.dataset.specialty;
    if (button.dataset.open === "appointment") openDialog(appointmentModal);
    if (button.dataset.open === "login") openDialog(loginModal);
  });
});
$$("[data-close]").forEach(button => button.addEventListener("click", () => closeDialog(button.closest("dialog"))));
[appointmentModal, loginModal].forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) closeDialog(dialog);
  });
});

const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
$$('#mainNav a').forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

const dateInput = $("#preferredDate");
const localToday = new Date();
const offset = localToday.getTimezoneOffset();
const today = new Date(localToday.getTime() - offset * 60000).toISOString().slice(0, 10);
dateInput.min = today;
dateInput.value = today;

// Apenas dados demonstrativos e não médicos, guardados neste navegador.
const REQUESTS_KEY = "bemViverDemoRequests";
function readRequests() {
  try { return JSON.parse(localStorage.getItem(REQUESTS_KEY) || "[]"); }
  catch { return []; }
}
function updateRequestCount() {
  const count = readRequests().length;
  $("#requestCount").textContent = count ? `${count} solicitação(ões) de demonstração neste dispositivo.` : "Nenhuma solicitação neste dispositivo.";
}
$("#appointmentForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const request = {
    id: `${Date.now()}`,
    patientName: String(form.get("patientName") || "").trim(),
    patientEmail: String(form.get("patientEmail") || "").trim(),
    specialty: String(form.get("specialty") || ""),
    preferredDate: String(form.get("preferredDate") || ""),
    requestType: String(form.get("requestType") || ""),
    status: "Solicitação de demonstração"
  };
  if (!request.patientName || !request.patientEmail || !request.specialty || !request.preferredDate) {
    showToast("Confira os campos obrigatórios.");
    return;
  }
  const requests = readRequests();
  requests.push(request);
  try {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  } catch {
    showToast("Não foi possível guardar a demonstração neste navegador.");
    return;
  }
  closeDialog(appointmentModal);
  event.currentTarget.reset();
  dateInput.min = today;
  dateInput.value = today;
  updateRequestCount();
  showToast("Solicitação de teste registrada apenas neste dispositivo.");
});
$("#loginForm").addEventListener("submit", event => {
  event.preventDefault();
  // Nunca autentica nem guarda a senha; trata o formulário como demonstração.
  $("#demoDashboard").hidden = false;
  updateRequestCount();
  showToast("Modo demonstração: nenhum login real foi realizado.");
});
updateRequestCount();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      console.info("Service worker não pôde ser registrado neste ambiente.");
    });
  });
}
