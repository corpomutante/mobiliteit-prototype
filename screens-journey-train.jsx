// screens-journey-train.jsx — Duplicates of journey screens 08–11, but for the
// route walk 2 › RE11 (train) › bus 12  (Wasserbillig → Bd. F. Roosevelt, 48 min).
// ─────────────────────────────────────────────────────────────────────────────
// Mirrors screens-references.jsx (overview + boarding/transfer/arrival steps),
// reusing its design-system primitives. Only difference: the journey is now
// multi-modal (walk → train → bus) instead of bus-only (303/305/18), matching
// the supplied result card: 48 min · 17:45 – 18:33 · Step free · Not too crowded
// · Scheduled at 17:45 from Wasserbillig Plat. 2.
// Reuses window globals: Device, MapView, Icon, React, JourneyTopBar,
// MapFabsTop, MapFabCompass, StreetViewThumb, AlsoAtRow, RideStopsRow,
// WalkRow, StopRow.

const TRAIL = 44; // rail column width — matches the node circle

// Same fixed-pitch, round-repeat dot pattern as screens-references.jsx's
// DOT_RAIL — kept in sync so a walk leg's dotted rail looks identical
// whichever file renders it.
const DOT_RAIL_TRAIN = { backgroundImage: "radial-gradient(circle, var(--fg-4) 1.6px, transparent 1.9px)", backgroundSize: "6px 9px", backgroundPosition: "center", backgroundRepeat: "no-repeat round" };

// ── Multi-mode summary bar: walk 2 › RE11 › 12 ───────────────────────────────
function TrainSummaryBar({ onClose = true, onBack = false, status = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "2px 4px 0" }}>
      {onBack &&
        <button className="iconbtn iconbtn--tonal" aria-label="Back" style={{ width: 40, height: 40, flexShrink: 0 }}>
          <Icon name="arrow-left" size={20} />
        </button>}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0, flexWrap: "wrap" }}>
        <span className="routeleg routeleg--walk" style={{ padding: "5px 9px" }}>
          <Icon name="person-simple-walk" weight="fill" />
          <span className="tabular">2</span>
        </span>
        <Icon name="caret-right" size={12} className="route__sep" />
        <span className="routeleg routeleg--train" style={{ padding: "5px 10px 5px 8px" }}>
          <Icon name="train" weight="fill" />
          <span className="routeleg__code">RE11</span>
        </span>
        <Icon name="caret-right" size={12} className="route__sep" />
        <span className="routeleg routeleg--bus" style={{ padding: "5px 10px 5px 8px" }}>
          <Icon name="bus" weight="fill" />
          <span className="routeleg__code">12</span>
        </span>
      </div>
      {status &&
        <span className="pill pill--success" style={{ flexShrink: 0 }}>
          <Icon name="check-circle" weight="fill" />On time
        </span>}
      {onClose &&
        <button className="iconbtn iconbtn--tonal" aria-label="Close" style={{ width: 40, height: 40, flexShrink: 0 }}>
          <Icon name="x" size={20} />
        </button>}
    </div>);
}

// ── Mode-aware stop node (train | bus | origin | dest) ───────────────────────
// Convention (keep for future screens): a mode node with NO `time` prop is a
// *boarding* stop — rendered as a light mode-tinted square tile with the mode
// icon inside. A mode node WITH a `time` prop is an *alighting* stop (where
// that ride ends) — rendered as a small hollow ring in the mode color, no
// icon, to read as "the end of this leg" before the walk dots continue.
function ModeStopRow({ node = "train", title, address, time, barBelow = null, last = false }) {
  const RING = 16;

  const square = (mode, glyph) =>
    <span style={{
      width: 36, height: 36, borderRadius: 12, background: `var(--mode-${mode}-bg)`,
      display: "inline-flex", alignItems: "center", justifyContent: "center", color: `var(--mode-${mode})`
    }}>
      <Icon name={glyph} weight="fill" size={22} />
    </span>;

  const ring = (mode) =>
    <span style={{
      width: RING, height: RING, borderRadius: "50%", background: "var(--bg-elevated)",
      border: `3px solid var(--mode-${mode})`, boxSizing: "border-box"
    }} />;

  // An alighting stop (has a `time`) picks up the ride's colored bar right where
  // the previous row's bar left off — no gap/"stop" in the line before the ring —
  // by bridging this row's own top padding with a same-color bar segment.
  const headBar = (mode) =>
    <span style={{ position: "absolute", top: -14, height: 14 + RING / 2, width: 6, background: `var(--mode-${mode})` }} />;

  const alighting = (node === "bus" || node === "train") && !!time;

  const nodeEl =
    node === "origin" ? <Icon name="map-pin" weight="fill" size={26} style={{ color: "var(--fg-1)" }} /> :
    node === "dest" ? <Icon name="map-pin" weight="fill" size={30} style={{ color: "var(--ac-primary)" }} /> :
    node === "bus" ? (time ? ring("bus") : square("bus", "bus")) :
    (time ? ring("train") : square("train", "train"));

  const tail = (val) => {
    if (!val) return null;
    if (val === "dotted") return <span style={{ flex: 1, width: 6, minHeight: 12, ...DOT_RAIL_TRAIN }} />;
    return <span style={{ flex: 1, width: 6, background: val, minHeight: 18 }} />;
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, position: "relative", padding: "14px 0px 0px" }}>
      <div style={{ width: TRAIL, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", alignSelf: "stretch" }}>
        {alighting && headBar(node)}
        <span style={{ zIndex: 2, display: "inline-flex" }}>{nodeEl}</span>
        {tail(barBelow)}
      </div>
      <div style={{ flex: 1, minWidth: 0, paddingBottom: last ? 0 : 6 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ flex: 1, minWidth: 0, font: "var(--t-body-em)", fontSize: 16, color: "var(--fg-1)", letterSpacing: "-0.01em" }}>{title}</span>
          {time && <span className="tabular" style={{ font: "var(--t-body-em)", color: "var(--fg-1)", flexShrink: 0 }}>{time}</span>}
        </div>
        {address && <div style={{ font: "var(--t-sub)", color: "var(--fg-3)", marginTop: 3 }}>{address}</div>}
      </div>
    </div>);
}

// ── Mode-aware ride detail (line badge, destination, scheduled time, also-at) ─
function ModeDetail({ mode = "train", code, dest, time, alsoAt, stops, mins }) {
  return (
    <div style={{ display: "flex", gap: 14, position: "relative" }}>
      <div style={{ width: TRAIL, flexShrink: 0, display: "flex", justifyContent: "center" }}>
        <span style={{ width: 6, background: `var(--mode-${mode})`, alignSelf: "stretch" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0, paddingBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span className={`line line--${mode} line--lg`} style={{ marginTop: 2 }}>{code}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: "var(--t-body-em)", color: "var(--fg-1)", lineHeight: 1.3 }}>{dest}</div>
            <div style={{ font: "var(--t-sub)", color: "var(--fg-3)", marginTop: 2 }}>Scheduled</div>
          </div>
          <span className="tabular" style={{ font: "var(--t-title-3)", fontWeight: 700, color: "var(--fg-1)", flexShrink: 0 }}>{time}</span>
        </div>
        {alsoAt && <AlsoAtRow time={alsoAt} />}
        <RideStopsRow stops={stops} mins={mins} />
      </div>
    </div>);
}

// ── Footer for this journey (48 min · arrive 18:33) ──────────────────────────
function TrainJourneyFooter() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 20px 18px", background: "var(--bg-elevated)", borderTop: "1px solid var(--bd-subtle)"
    }}>
      <button className="btn btn--tonal" style={{ height: 46, paddingLeft: 18, paddingRight: 20 }}>
        <Icon name="bookmark-simple" size={20} />Save Journey
      </button>
      <div style={{ textAlign: "right" }}>
        <div className="tabular" style={{ font: "var(--t-title-2)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>48 min</div>
        <div className="tabular" style={{ font: "var(--t-caption)", color: "var(--fg-3)", marginTop: 1 }}>arrive 18:33 · <span style={{ color: "var(--st-success-fg)", fontWeight: 700 }}>On time</span></div>
      </div>
    </div>);
}

// ── Peek sheet shared by the overview screen ─────────────────────────────────
// Starts as a small peek; scrolling its content raises the sheet (like a real
// map bottom-sheet) so the rest of the journey summary comes into view.
function TrainPeekSheet() {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className="sheet" style={{ height: expanded ? "62%" : "25%", padding: 0, transition: "height 280ms var(--ease-out, ease-out)" }}>
      <span className="sheet__handle" />
      <div
        onScroll={(e) => setExpanded(e.currentTarget.scrollTop > 4)}
        style={{ padding: "2px 20px 0", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <TrainSummaryBar onClose={false} />
        <div style={{ marginTop: 2 }}>
          <ModeStopRow node="origin" title="2 Rue des Marais" address="6634 Wasserbillig Mertert, Luxembourg" time="14:47" barBelow="dotted" />
          <WalkRow label="Walk 2 min (140 m)" />
          <ModeStopRow node="train" title="Wasserbillig, Gare · Plat. 2" barBelow="var(--mode-train)" />
          <ModeDetail mode="train" code="RE11" dest="Luxembourg, Gare Centrale" time="17:45" alsoAt="18:15" stops={5} mins={30} />
        </div>
      </div>
      <TrainJourneyFooter />
    </div>);
}

// Tall detail sheet wrapper (mirrors StepSheet, with this journey's summary + footer)
function TrainStepSheet({ children, dark = false }) {
  return (
    <Device statusOn="on-photo" fullBleed dark={dark}>
      <div style={{ position: "absolute", inset: 0 }}>
        <PinCenteredMap zoom={1.1} focusY="28%" />
        <div className="sheet" style={{ top: 76, height: "auto", bottom: 0, padding: 0 }}>
          <span className="sheet__handle" />
          <div style={{ padding: "2px 16px 12px", flexShrink: 0, borderBottom: "1px solid var(--bd-subtle)" }}>
            <TrainSummaryBar onBack onClose={false} />
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 8px" }}>
            {children}
          </div>
          <TrainJourneyFooter />
        </div>
      </div>
    </Device>);
}

// ═════════════════════════════════════════════════════════════
// 08′ · Journey map · overview (whole route)
// ═════════════════════════════════════════════════════════════
function TrainJourneyMapOverview({ dark = false }) {
  return (
    <Device statusOn="on-photo" fullBleed dark={dark}>
      <div style={{ position: "absolute", inset: 0 }}>
        <PinCenteredMap zoom={1.11} focusY="100%" liftPx={72} />

        <JourneyTopBar />
        <MapFabsTop />
        <MapFabCompass />
        <StreetViewThumb />

        <TrainPeekSheet />
      </div>
    </Device>);
}

// ═════════════════════════════════════════════════════════════
// 09′ · Journey steps · boarding (RE11)
// ═════════════════════════════════════════════════════════════
function TrainStepsBoarding({ dark = false }) {
  return (
    <TrainStepSheet dark={dark}>
      <ModeStopRow node="origin" title="2 Rue des Marais" address="6634 Wasserbillig Mertert, Luxembourg" time="14:47" barBelow="dotted" />
      <WalkRow label="Walk 2 min (140 m)" />
      <ModeStopRow node="train" title="Wasserbillig, Gare · Plat. 2" barBelow="var(--mode-train)" />
      <ModeDetail mode="train" code="RE11" dest="Luxembourg, Gare Centrale" time="17:45" alsoAt="18:15" stops={5} mins={30} />
      <ModeStopRow node="train" title="Luxembourg, Gare Centrale" time="18:15" barBelow="dotted" />
      <WalkRow label="Walk 1 min (60 m), then wait for up to 4 min" />
    </TrainStepSheet>);
}

// ═════════════════════════════════════════════════════════════
// 10′ · Journey steps · transfer (RE11 → bus 12)
// ═════════════════════════════════════════════════════════════
function TrainStepsTransfer({ dark = false }) {
  return (
    <TrainStepSheet dark={dark}>
      <ModeStopRow node="train" title="Luxembourg, Gare Centrale" time="18:15" barBelow="dotted" />
      <WalkRow label="Walk 1 min (60 m), then wait for up to 4 min" />
      <ModeStopRow node="bus" title="Luxembourg, Gare Centrale Quai 5" barBelow="var(--mode-bus)" />
      <ModeDetail mode="bus" code="12" dest="F. D. Roosevelt" time="18:19" alsoAt="18:34" stops={6} mins={14} />
      <ModeStopRow node="bus" title="F. D. Roosevelt Quai 2" time="18:33" barBelow="dotted" />
      <WalkRow label="Walk 1 min (60 m)" />
    </TrainStepSheet>);
}

// ═════════════════════════════════════════════════════════════
// 11′ · Journey steps · arrival (bus 12 → destination)
// ═════════════════════════════════════════════════════════════
function TrainStepsArrival({ dark = false }) {
  return (
    <TrainStepSheet dark={dark}>
      {/* tail of the bus 12 ride */}
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ width: TRAIL, flexShrink: 0, display: "flex", justifyContent: "center" }}>
          <span style={{ width: 6, borderRadius: 3, background: "var(--mode-bus)", alignSelf: "stretch" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingBottom: 4 }}>
          <AlsoAtRow time="18:34" />
          <RideStopsRow stops={6} mins={14} />
        </div>
      </div>
      <ModeStopRow node="bus" title="F. D. Roosevelt Quai 2" time="18:33" barBelow="dotted" />
      <WalkRow label="Walk 1 min (60 m)" />
      <ModeStopRow node="dest" title="6 Boulevard Franklin Roosevelt" address="1143 Ville-Haute Luxembourg" time="18:33" last />

      <div className="card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", marginTop: 12, boxShadow: "var(--sh-1)" }}>
        <Icon name="warning-circle" size={22} style={{ color: "var(--ac-secondary)", flexShrink: 0 }} />
        <span style={{ flex: 1, font: "var(--t-sub)", color: "var(--fg-1)" }}>Report a problem with this public transport info</span>
        <Icon name="caret-right" size={16} style={{ color: "var(--fg-4)" }} />
      </div>
      <div style={{ textAlign: "center", font: "var(--t-caption)", color: "var(--fg-3)", paddingBottom: 8 }}>Departures updated 42s ago</div>
    </TrainStepSheet>);
}

Object.assign(window, {
  TrainJourneyMapOverview, TrainStepsBoarding, TrainStepsTransfer, TrainStepsArrival,
});
