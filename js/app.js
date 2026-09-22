// ============================================================
// APP LOGIC
// ============================================================

const MAX_PALETTE_SIZE = 8;
const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTH_FULL = ["January","February","March","April","May","June","July","August",
                     "September","October","November","December"];

const currentMonthIndex = 8; // September

let allStrolls = [];
let visible = [];
let palette = [];
let state = { monthIndex: currentMonthIndex, focusedId: null };

let map = null;
let strollLayerGroup = null;
let layersById = {};
let legendEl = null;

function getStrollsForMonth(strolls, monthIndex) {
  return strolls;
}

function buildPalette() {
  const css = getComputedStyle(document.documentElement);
  const found = [];
  for (let i = 1; i <= MAX_PALETTE_SIZE; i++) {
    const c = css.getPropertyValue(`--route-${i}`).trim();
    if (!c) break;
    const d = css.getPropertyValue(`--route-${i}-deep`).trim() || c;
    found.push({ c, d });
  }
  return found.length ? found : [{ c: "#888888", d: "#555555" }];
}

function colorForPosition(i) { return palette[i % palette.length]; }
function fullMonthName(i) { return MONTH_FULL[i]; }

function buildMonthRail() {
  const rail = document.getElementById("monthRail");
  rail.innerHTML = "";
  MONTH_ABBR.forEach((name, i) => {
    const b = document.createElement("button");
    b.className = "month-pill" + (i === state.monthIndex ? " active" : "");
    b.textContent = name;
    b.setAttribute("aria-pressed", i === state.monthIndex ? "true" : "false");
    b.addEventListener("click", () => {
      state.monthIndex = i;
      [...rail.children].forEach(c => { c.classList.remove("active"); c.setAttribute("aria-pressed", "false"); });
      b.classList.add("active");
      b.setAttribute("aria-pressed", "true");
      renderMonth();
    });
    rail.appendChild(b);
  });
}

function initMap() {
  map = L.map("map", { scrollWheelZoom: false });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);
  strollLayerGroup = L.layerGroup().addTo(map);
}

function renderStrollsOnMap(strolls) {
  strollLayerGroup.clearLayers();
  layersById = {};
  const allBounds = [];

  strolls.forEach((stroll, i) => {
    const color = colorForPosition(i);
    allBounds.push(...stroll.route);

    const line = L.polyline(stroll.route, {
      color: color.c, weight: 4, opacity: 0.55,
      dashArray: "1 7", lineCap: "round", lineJoin: "round"
    }).addTo(strollLayerGroup);

    const markers = stroll.stops.map((stop, si) => {
      const icon = L.divIcon({
        className: "",
        html: `<div class="stop-marker" style="border-color:${color.c}">${si + 1}</div>`,
        iconSize: [22, 22], iconAnchor: [11, 11]
      });
      return L.marker(stop.ll, { icon })
        .addTo(strollLayerGroup)
        .bindTooltip(stop.t, { direction: "top", offset: [0, -10] });
    });

    layersById[stroll.id] = { line, markers, color };
  });

  if (allBounds.length) map.fitBounds(allBounds, { padding: [24, 24], animate: false });
}

function buildLegend(strolls) {
  legendEl = document.getElementById("legend");
  legendEl.innerHTML = "";
  strolls.forEach((stroll, i) => {
    const color = colorForPosition(i);
    const chip = document.createElement("button");
    chip.className = "legend-chip" + (stroll.id === state.focusedId ? " active" : "");
    chip.style.color = color.d;
    chip.innerHTML = `<span class="legend-dot" style="background:${color.c}"></span>${stroll.title}`;
    chip.addEventListener("click", () => focusStroll(stroll.id));
    legendEl.appendChild(chip);
  });
}

function focusStroll(id) {
  state.focusedId = id;
  const stroll = visible.find(s => s.id === id);
  if (!stroll) return;
  const { color } = layersById[id];

  Object.entries(layersById).forEach(([otherId, layer]) => {
    const isFocused = otherId === id;
    layer.line.setStyle({ opacity: isFocused ? 0.95 : 0.22, weight: isFocused ? 5 : 3 });
  });

  [...legendEl.children].forEach((chip, i) => {
    chip.classList.toggle("active", visible[i].id === id);
  });

  document.getElementById("strollTitle").textContent = stroll.title;
  document.getElementById("wardLine").textContent = stroll.ward;
  document.getElementById("strollDesc").textContent = stroll.desc;
  document.getElementById("durationNote").textContent = stroll.walkTime;

  const list = document.getElementById("stopsList");
  list.innerHTML = "";
  stroll.stops.forEach((stop, i) => {
    const li = document.createElement("li");
    li.className = "stop";
    li.innerHTML = `<div class="stop-num" style="border-color:${color.c}">${i + 1}</div><div class="stop-body"><h3>${stop.t}</h3><p>${stop.d}</p></div>`;
    list.appendChild(li);
  });

  map.flyToBounds(stroll.route, { padding: [40, 40], duration: 0.6 });
}

function renderMonth() {
  visible = getStrollsForMonth(allStrolls, state.monthIndex);
  document.getElementById("monthHeading").textContent = "Strolls for " + fullMonthName(state.monthIndex);

  if (!visible.length) {
    document.getElementById("legend").innerHTML = "";
    strollLayerGroup.clearLayers();
    document.getElementById("stopsList").innerHTML = "";
    document.getElementById("strollTitle").textContent = "No strolls yet for this month";
    document.getElementById("strollDesc").textContent = "";
    document.getElementById("wardLine").textContent = "";
    document.getElementById("durationNote").textContent = "";
    return;
  }

  const keepFocus = visible.some(s => s.id === state.focusedId);
  buildLegend(visible);
  renderStrollsOnMap(visible);
  focusStroll(keepFocus ? state.focusedId : visible[0].id);
}

function init() {
  allStrolls = STROLLS_DATA;
  palette = buildPalette();
  initMap();
  buildMonthRail();
  renderMonth();
}

init();