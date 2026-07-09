// screens-marais.jsx — duplicates of the last 6 "Plan a journey" (section 03) screens
// with their vector MapView replaced by the supplied Wasserbillig / Marais map image.
// Everything else (sheets, chips, rows, modals) is an exact copy of the originals in
// screens-references-v2.jsx / screens-plan-v2.jsx — only the map surface changes.
// Reuses window globals: Device, DirectionsCard, FlatRouteRow, ResultsChips, Icon, React.

// ── Interactive live-location dot at the START of the walking path (start of the blue dots)
function MaraisLiveDot() {
  const [open, setOpen] = React.useState(false);
  return (
    <button
      onClick={() => setOpen((o) => !o)}
      aria-label="Start of walking route — your location"
      style={{
        position: "absolute", left: "16.1%", top: "27.7%", transform: "translate(-50%, -50%)",
        zIndex: 5, border: 0, background: "transparent", padding: 0, cursor: "pointer"
      }}>
      {/* accuracy halo */}
      <span style={{ position: "absolute", left: "50%", top: "50%", width: 96, height: 96, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(86,105,255,0.22) 0%, rgba(86,105,255,0.05) 60%, transparent 72%)" }} />
      {/* pulse ring */}
      <span style={{ position: "absolute", left: "50%", top: "50%", width: 26, height: 26, transform: "translate(-50%,-50%)", borderRadius: "50%", border: "2px solid #5669FF", animation: "livedotPulse 2.4s ease-out infinite" }} />
      {/* dot */}
      <span style={{ position: "relative", display: "block", width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(20,22,26,0.35)" }}>
        <span style={{ position: "absolute", inset: 3.5, borderRadius: "50%", background: "#5669FF" }} />
      </span>
      {open &&
      <span style={{ position: "absolute", left: "50%", bottom: "calc(50% + 22px)", transform: "translateX(-50%)", whiteSpace: "nowrap", background: "var(--fg-1)", color: "#fff", font: "var(--t-sub-em)", fontSize: 12, padding: "5px 9px", borderRadius: 8, boxShadow: "var(--sh-2)" }}>Start · You are here</span>
      }
    </button>);
}

// ── The supplied map image, cropped so the walking dots + train line + Wasserbillig read.
function MaraisMap() {
  return (
    <div
      role="img"
      aria-label="Map — walking route to Wasserbillig"
      className="map-photo--dark"
      style={{
        position: "absolute", inset: 0, overflow: "hidden", background: "#F7F6F4",
        backgroundImage: "url(assets/marais-map-v3.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
        backgroundPosition: "50% 22%",
        width: 390, height: 398, left: 1, top: -50
      }} />);
}

// ═════════════════════════════════════════════════════════════
// Screen 01 — Route options (map swapped) + shared modal backdrop
// ═════════════════════════════════════════════════════════════
function RouteOptionsContentV2Marais() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <MaraisMap />
      <MaraisLiveDot />
      <div style={{ position: "absolute", top: 44, left: 12, right: 12, zIndex: 6 }}>
        <DirectionsCard />
      </div>

      <div className="sheet" style={{ height: "60%", padding: 0 }}>
        <span className="sheet__handle" />
        <div style={{ padding: "4px 20px 0", display: "flex", alignItems: "center", gap: 8 }}>
          <h3 style={{ flex: 1, font: "var(--t-title-1)", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>Route options</h3>
          <button className="iconbtn iconbtn--tonal" aria-label="Options" style={{ width: 40, height: 40 }}><Icon name="sliders-horizontal" size={20} /></button>
          <button className="iconbtn iconbtn--tonal" aria-label="Close" style={{ width: 40, height: 40 }}><Icon name="x" size={20} /></button>
        </div>

        <ResultsChips />

        <div style={{ overflowY: "auto", flex: 1, padding: "0 20px 16px" }}>
          <FlatRouteRow hr="52" min="min" range="14:47 – 15:39" legs={[{ mode: "walk", code: "7" }, { mode: "train", code: "11" }, { mode: "bus", code: "22" }]} place="Wasserbillig, Marais" depart="14:54" platform="2" crowd={{ level: 1, label: "Not too crowded" }} stepFree />
          <div style={{ height: 1, background: "var(--bd-subtle)" }} />
          <FlatRouteRow hr="59" min="min" range="14:47 – 15:46" legs={[{ mode: "walk", code: "7" }, { mode: "train", code: "11" }, { mode: "walk", code: "7" }, { mode: "bus", code: "2" }]} place="Wasserbillig, Marais" depart="14:54" platform="2" crowd={{ level: 1, label: "Not too crowded" }} stepFree />
          <div style={{ height: 1, background: "var(--bd-subtle)" }} />
          <FlatRouteRow hr="1h" min="2m" range="14:47 – 15:48" legs={[{ mode: "walk", code: "7" }, { mode: "train", code: "RE" }, { mode: "bus", code: "14" }]} place="Wasserbillig, Marais" depart="14:54" platform="1" crowd={{ level: 0, label: "Quiet" }} stepFree={false} />
        </div>
      </div>
    </div>);
}

function ModalBackdropV2Marais() {
  return (
    <>
      <RouteOptionsContentV2Marais />
      <div style={{ position: "absolute", inset: 0, background: "var(--bg-overlay)", zIndex: 8 }} />
    </>);
}

function RefRouteOptionsV2Marais({ dark = false }) {
  return (
    <Device statusOn="on-photo" fullBleed dark={dark}>
      <RouteOptionsContentV2Marais />
    </Device>);
}

// ═════════════════════════════════════════════════════════════
// Screen 02 — Departure time picker (map swapped)
// ═════════════════════════════════════════════════════════════
function RefTimePickerV2Marais({ dark = false }) {
  const Spinner = ({ values }) =>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
      {values.map((v, i) =>
    <div key={i} className="tabular" style={{
      fontSize: i === 1 ? 30 : 21, fontWeight: i === 1 ? 800 : 500,
      letterSpacing: "-0.02em",
      color: i === 1 ? "var(--fg-1)" : "var(--fg-4)",
      padding: "10px 0", width: "100%", textAlign: "center",
      borderTop: i === 1 ? "1px solid var(--bd-default)" : "none",
      borderBottom: i === 1 ? "1px solid var(--bd-default)" : "none"
    }}>{v}</div>
    )}
    </div>;

  const tabs = [{ id: "leave", label: "Leave", active: true }, { id: "arrive", label: "Arrive" }, { id: "last", label: "Last" }];

  return (
    <Device statusOn="light" fullBleed dark={dark}>
      <div style={{ position: "absolute", inset: 0 }}>
        <ModalBackdropV2Marais />

        <div className="sheet" style={{ padding: 0, zIndex: 12 }}>
          <span className="sheet__handle" />
          <div style={{ padding: "6px 22px 0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <h3 style={{ font: "var(--t-title-1)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Departure time</h3>
              <button className="iconbtn iconbtn--tonal" aria-label="Close" style={{ width: 40, height: 40 }}><Icon name="x" size={20} /></button>
            </div>

            {/* Segmented tabs */}
            <div className="seg" style={{ marginBottom: 22 }}>
              {tabs.map((t) =>
              <button key={t.id} className={`seg__btn ${t.active ? "seg__btn--active" : ""}`}>{t.label}</button>
              )}
            </div>

            {/* Time spinner */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 32px 6px" }}>
              <Spinner values={["13", "14", "15"]} />
              <span style={{ fontSize: 28, fontWeight: 700, color: "var(--fg-2)", paddingBottom: 2 }}>:</span>
              <Spinner values={["04", "05", "06"]} />
            </div>

            {/* Day stepper */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 4px", borderTop: "1px solid var(--bd-subtle)", marginTop: 16 }}>
              <button className="iconbtn iconbtn--tonal" style={{ width: 42, height: 42 }} aria-label="Previous day"><Icon name="caret-left" size={20} /></button>
              <span style={{ font: "var(--t-body-em)", fontSize: 16, color: "var(--fg-1)" }}>Today · Thu 30 May</span>
              <button className="iconbtn iconbtn--tonal" style={{ width: 42, height: 42 }} aria-label="Next day"><Icon name="caret-right" size={20} /></button>
            </div>

            <div style={{ display: "flex", gap: 12, padding: "16px 0 14px" }}>
              <button className="btn btn--outline" style={{ flex: 1, height: 52 }}>Reset</button>
              <button className="btn btn--filled" style={{ flex: 1, height: 52 }}>Set time</button>
            </div>
          </div>
        </div>
      </div>
    </Device>);
}

// ═════════════════════════════════════════════════════════════
// Screen 03 — Preferred modes (map swapped)
// ═════════════════════════════════════════════════════════════
function RefPreferredModesV2Marais({ dark = false }) {
  const modes = [
  { icon: "train", label: "Train", sub: "CFL regional & intercity", mode: "train", on: true },
  { icon: "bus", label: "Bus", sub: "RGTR · AVL · TICE", mode: "bus", on: true },
  { icon: "tram", label: "Tram", sub: "Luxtram T1", mode: "tram", on: true },
  { icon: "bicycle", label: "Bike · vel'OH", sub: "Personal bikes & shared bikes", mode: "bike", on: false },
  { icon: "car", label: "Klaxit carpool", sub: "Shared car rides", mode: "car", on: false }];

  return (
    <Device statusOn="light" fullBleed dark={dark}>
      <div style={{ position: "absolute", inset: 0 }}>
        <ModalBackdropV2Marais />

        <div className="sheet" style={{ height: "58%", zIndex: 12, padding: "0px" }}>
          <span className="sheet__handle" />
          <div style={{ padding: "6px 22px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ font: "var(--t-title-1)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Preferred modes</h3>
              <p style={{ font: "var(--t-sub)", color: "var(--fg-3)", marginTop: 6 }}>Modes we'll prioritise in your results</p>
            </div>
            <button className="iconbtn iconbtn--tonal" aria-label="Close" style={{ width: 40, height: 40, flexShrink: 0 }}><Icon name="x" size={20} /></button>
          </div>

          <div style={{ padding: "12px 22px 16px", overflowY: "auto", flex: 1 }}>
            {modes.map((m, i) =>
            <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderTop: i ? "1px solid var(--bd-subtle)" : "none" }}>
                <span className={`mtile mtile--${m.mode}`}><Icon name={m.icon} weight="fill" /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: "var(--t-body-em)", fontSize: 16, color: "var(--fg-1)" }}>{m.label}</div>
                  <div style={{ font: "var(--t-sub)", color: "var(--fg-3)", marginTop: 1 }}>{m.sub}</div>
                </div>
                <span className={`switch ${m.on ? "switch--on" : ""}`} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Device>);
}

// ═════════════════════════════════════════════════════════════
// Screen 04 — Route filters (map swapped)
// ═════════════════════════════════════════════════════════════
function RefFiltersV2Marais({ dark = false }) {
  const opts = [
  { label: "Best route", sub: "Balance speed and transfers", sel: true },
  { label: "Fewer transfers", sub: "Stay on fewer vehicles" },
  { label: "Less walking", sub: "Shortest distance on foot" },
  { label: "Step-free access", sub: "Avoid steps, prefer lifts and ramps" }];

  return (
    <Device statusOn="light" fullBleed dark={dark}>
      <div style={{ position: "absolute", inset: 0 }}>
        <ModalBackdropV2Marais />

        <div className="sheet" style={{ height: "49%", padding: 0, zIndex: 12 }}>
          <span className="sheet__handle" />
          <div style={{ padding: "6px 22px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ font: "var(--t-title-1)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Filter by</h3>
            <button className="iconbtn iconbtn--tonal" aria-label="Close" style={{ width: 40, height: 40 }}><Icon name="x" size={20} /></button>
          </div>

          <div style={{ padding: "8px 22px 16px", overflowY: "auto", flex: 1 }}>
            {opts.map((o, i) =>
            <div key={o.label} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 0", borderTop: i ? "1px solid var(--bd-subtle)" : "none" }}>
                <span style={{
                width: 24, height: 24, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                border: `2px solid ${o.sel ? "var(--ac-secondary)" : "var(--bd-default)"}`,
                display: "inline-flex", alignItems: "center", justifyContent: "center"
              }}>
                  {o.sel && <span style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--ac-secondary)" }} />}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ font: "var(--t-body-em)", fontSize: 16, color: "var(--fg-1)" }}>{o.label}</div>
                  <div style={{ font: "var(--t-sub)", color: "var(--fg-3)", marginTop: 3 }}>{o.sub}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Device>);
}

// ═════════════════════════════════════════════════════════════
// 04 · Options Preferences — v2 (map swapped)
// ═════════════════════════════════════════════════════════════
function PlanOptionsPrefsV2Marais({ dark = false }) {
  const optimise = [
  { icon: "lightning", label: "Fastest", sel: true },
  { icon: "arrows-clockwise", label: "Fewer transfers" },
  { icon: "person-simple-walk", label: "Less walking" }];
  const modes = [
  { icon: "train", label: "Train", sub: "CFL regional & intercity", mode: "train", on: true },
  { icon: "bus", label: "Bus", sub: "RGTR · AVL · TICE", mode: "bus", on: true },
  { icon: "tram", label: "Tram", sub: "Luxtram T1", mode: "tram", on: true },
  { icon: "bicycle", label: "Bike · vel'OH", sub: "Personal & shared bikes", mode: "bike", on: false },
  { icon: "car", label: "Klaxit carpool", sub: "Shared car rides", mode: "car", on: false }];

  return (
    <Device statusOn="light" fullBleed dark={dark}>
      <div style={{ position: "absolute", inset: 0 }}>
        <ModalBackdropV2Marais />

        <div className="sheet" style={{ height: "92%", padding: 0, zIndex: 12 }}>
          <span className="sheet__handle" />
          <div style={{ padding: "6px 22px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ font: "var(--t-title-1)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Options</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button className="iconbtn iconbtn--tonal" aria-label="Close" style={{ width: 40, height: 40 }}><Icon name="x" size={20} /></button>
            </div>
          </div>

          <div style={{ padding: "10px 22px 16px", overflowY: "auto", flex: 1 }}>
            {/* Optimise for */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "6px 0px 0px" }}>
              {optimise.map((o) =>
              <button key={o.label} style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
                height: 68, borderRadius: 16, cursor: "pointer",
                border: o.sel ? "0" : "1px solid var(--bd-default)",
                background: o.sel ? "var(--ac-secondary-soft)" : "var(--bg-elevated)",
                color: o.sel ? "var(--ac-secondary)" : "var(--fg-2)",
                font: "var(--t-sub-em)", fontSize: 13, fontWeight: 600, padding: "0 6px", textAlign: "center"
              }}>
                  <Icon name={o.icon} weight={o.sel ? "fill" : "regular"} size={22} />
                  <span>{o.label}</span>
                </button>
              )}
            </div>

            {/* Modes */}
            <div style={{ font: "var(--t-micro)", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-3)", fontWeight: 700, padding: "0px", margin: "0px" }}>Modes</div>
            {modes.map((m, i) =>
            <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 14, borderTop: i ? "1px solid var(--bd-subtle)" : "none", padding: "8px 0px", margin: "8px 0px" }}>
                <span className={`mtile mtile--${m.mode}`}><Icon name={m.icon} weight="fill" /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: "var(--t-body-em)", fontSize: 16, color: "var(--fg-1)" }}>{m.label}</div>
                  <div style={{ font: "var(--t-sub)", color: "var(--fg-3)", marginTop: 1 }}>{m.sub}</div>
                </div>
                <span className={`switch ${m.on ? "switch--on" : ""}`} />
              </div>
            )}

            {/* Accessibility */}
            <div style={{ font: "var(--t-micro)", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-3)", fontWeight: 700, margin: "22px 0 4px" }}>Accessibility</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0" }}>
              <span className="mtile" style={{ background: "var(--ac-secondary-soft)", color: "var(--ac-secondary)" }}><Icon name="wheelchair" weight="fill" /></span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: "var(--t-body-em)", fontSize: 16, color: "var(--fg-1)" }}>Step-free routes only</div>
                <div style={{ font: "var(--t-sub)", color: "var(--fg-3)", marginTop: 1 }}>Use lifts and ramps; avoid stairs.</div>
              </div>
              <span className="switch switch--on" />
            </div>

            {/* Walking distance */}
            <div style={{ font: "var(--t-micro)", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-3)", fontWeight: 700, margin: "22px 0 12px" }}>Walking distance · max</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, font: "var(--t-sub)" }}>
              <span style={{ color: "var(--fg-3)" }} className="tabular">100 m</span>
              <span style={{ font: "var(--t-body-em)", fontSize: 15 }} className="tabular">800 m</span>
              <span style={{ color: "var(--fg-3)" }} className="tabular">2 km</span>
            </div>
            <div className="slider">
              <div className="slider__track">
                <div className="slider__fill" style={{ width: "38%" }} />
                <div className="slider__thumb" style={{ left: "38%" }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </Device>);
}

Object.assign(window, {
  MaraisMap, MaraisLiveDot,
  RouteOptionsContentV2Marais, ModalBackdropV2Marais,
  RefRouteOptionsV2Marais, RefTimePickerV2Marais, RefPreferredModesV2Marais, RefFiltersV2Marais,
  PlanOptionsPrefsV2Marais
});

