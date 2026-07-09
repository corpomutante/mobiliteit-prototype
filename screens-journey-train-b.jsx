// screens-journey-train-b.jsx — duplicates of screens 12–15 (Wasserbillig → Bd. F.
// Roosevelt via RE11 + bus) with the ONLY change being the texts, so this leg matches
// the section 06 reference numbers: 52 min total · walk 2 min · RE11 · bus 22 · walk 5 min.
// Everything else (layout, map, chrome) is an exact copy of screens-journey-train.jsx.
// Reuses window globals: Device, Icon, React, PinCenteredMap, JourneyTopBar,
// MapFabsTop, MapFabCompass, StreetViewThumb, AlsoAtRow, RideStopsRow, WalkRow,
// ModeStopRow, ModeDetail.

const TRAIL_B = 44;

// ── Multi-mode summary bar: walk 2 › RE11 › 22 ───────────────────────────────
function TrainSummaryBarB({ onClose = true, onBack = false, status = false }) {
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
          <span className="routeleg__code">22</span>
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

// ── Footer for this journey (52 min · arrive 18:37) ──────────────────────────
function TrainJourneyFooterB() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 20px 18px", background: "var(--bg-elevated)", borderTop: "1px solid var(--bd-subtle)"
    }}>
      <button className="btn btn--tonal" style={{ height: 46, paddingLeft: 18, paddingRight: 20 }}>
        <Icon name="bookmark-simple" size={20} />Save Journey
      </button>
      <div style={{ textAlign: "right" }}>
        <div className="tabular" style={{ font: "var(--t-title-2)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>52 min</div>
        <div className="tabular" style={{ font: "var(--t-caption)", color: "var(--fg-3)", marginTop: 1 }}>arrive 15:39 · <span style={{ color: "var(--st-success-fg)", fontWeight: 700 }}>On time</span></div>
      </div>
    </div>);
}

// ── Peek sheet shared by the overview screen — scrolling raises it from a
// peek (25%) to a tall sheet (62%), revealing the full boarding (13b) +
// transfer (14b) content inline, in one continuous scroll.
function TrainPeekSheetB() {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div
      className="sheet"
      onClick={() => setExpanded(true)}
      style={{ height: expanded ? "92%" : "25%", padding: 0, transition: "height 320ms var(--ease-out, ease-out)" }}>
      <span className="sheet__handle" />
      <div
        onScroll={(e) => { if (e.currentTarget.scrollTop > 4) setExpanded(true); }}
        style={{ padding: "2px 20px 0", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <TrainSummaryBarB onClose={false} />
        <div style={{ marginTop: 2 }}>
          <ModeStopRow node="origin" title="2 Rue des Marais" address="6634 Wasserbillig Mertert, Luxembourg" time="14:47" barBelow="dotted" />
          <WalkRow label="Walk 2 min (140 m)" />
          <ModeStopRow node="train" title="Wasserbillig, Gare · Plat. 2" barBelow="var(--mode-train)" />
          <ModeDetail mode="train" code="RE11" dest="Luxembourg, Gare Centrale" time="14:54" alsoAt="15:59" stops={5} mins={30} />
          <ModeStopRow node="train" title="Luxembourg, Gare Centrale" time="15:23" barBelow="dotted" />
          <WalkRow label="Walk 1 min (60 m), then wait for up to 4 min" />
          <ModeStopRow node="bus" title="Luxembourg, Gare Centrale Quai 5" barBelow="var(--mode-bus)" />
          <ModeDetail mode="bus" code="22" dest="F. D. Roosevelt" time="15:29" alsoAt="15:39" stops={6} mins={13} />
          <ModeStopRow node="bus" title="F. D. Roosevelt Quai 2" time="15:34" barBelow="dotted" />
          <WalkRow label="Walk 5 min (350 m)" />
          <ModeStopRow node="dest" title="6 Boulevard Franklin Roosevelt" address="1143 Ville-Haute Luxembourg" time="18:37" last />

          <div className="card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", marginTop: 24, marginBottom: 24, boxShadow: "var(--sh-1)" }}>
            <Icon name="warning-circle" size={22} style={{ color: "var(--ac-secondary)", flexShrink: 0 }} />
            <span style={{ flex: 1, font: "var(--t-sub)", color: "var(--fg-1)" }}>Report a problem with this public transport info</span>
            <Icon name="caret-right" size={16} style={{ color: "var(--fg-4)" }} />
          </div>
          <div style={{ textAlign: "center", font: "var(--t-caption)", color: "var(--fg-3)", paddingBottom: 8, paddingTop: 8 }}><span style={{ paddingTop: 16, paddingBottom: 16 }}>Departures updated 42s ago</span></div>
        </div>
      </div>
      <TrainJourneyFooterB />
    </div>);
}

// Tall detail sheet wrapper (mirrors TrainStepSheet, with this journey's summary + footer)
function TrainStepSheetB({ children, dark = false }) {
  return (
    <Device statusOn="on-photo" fullBleed dark={dark}>
      <div style={{ position: "absolute", inset: 0 }}>
        <PinCenteredMap focusY="0%" liftPx={113} src="assets/journey-detail-train-b-map.png" fit="contain" style={{ top: 110 }} />
        <div className="sheet" style={{ top: 76, height: "auto", bottom: 0, padding: 0 }}>
          <span className="sheet__handle" />
          <div style={{ padding: "2px 16px 12px", flexShrink: 0, borderBottom: "1px solid var(--bd-subtle)" }}>
            <TrainSummaryBarB onBack onClose={false} />
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 8px" }}>
            {children}
          </div>
          <TrainJourneyFooterB />
        </div>
      </div>
    </Device>);
}

// ═════════════════════════════════════════════════════════════
// 12b · Journey map · overview (whole route) — 52 min · RE11 · 22
// ═════════════════════════════════════════════════════════════
function TrainJourneyMapOverviewB({ dark = false }) {
  return (
    <Device statusOn="on-photo" fullBleed dark={dark}>
      <div style={{ position: "absolute", inset: 0 }}>
        <PinCenteredMap focusY="0%" liftPx={113} src="assets/journey-detail-train-b-map.png" fit="contain" style={{ top: 110 }} />

        <JourneyTopBar />
        <MapFabsTop />
        <MapFabCompass />
        <StreetViewThumb />

        <TrainPeekSheetB />
      </div>
    </Device>);
}

// ═════════════════════════════════════════════════════════════
// 13b · Journey steps · boarding (RE11)
// ═════════════════════════════════════════════════════════════
function TrainStepsBoardingB({ dark = false }) {
  return (
    <TrainStepSheetB dark={dark}>
      <ModeStopRow node="origin" title="2 Rue des Marais" address="6634 Wasserbillig Mertert, Luxembourg" time="14:47" barBelow="dotted" />
      <WalkRow label="Walk 2 min (140 m)" />
      <ModeStopRow node="train" title="Wasserbillig, Gare · Plat. 2" barBelow="var(--mode-train)" />
      <ModeDetail mode="train" code="RE11" dest="Luxembourg, Gare Centrale" time="14:54" alsoAt="15:59" stops={5} mins={30} />
      <ModeStopRow node="train" title="Luxembourg, Gare Centrale" time="15:23" barBelow="dotted" />
      <WalkRow label="Walk 1 min (60 m), then wait for up to 4 min" />
      <ModeStopRow node="bus" title="Luxembourg, Gare Centrale Quai 5" barBelow="var(--mode-bus)" />
    </TrainStepSheetB>);
}

// ═════════════════════════════════════════════════════════════
// 14b · Journey steps · transfer (RE11 → bus 22)
// ═════════════════════════════════════════════════════════════
function TrainStepsTransferB({ dark = false }) {
  return (
    <TrainStepSheetB dark={dark}>
      <ModeDetail mode="bus" code="22" dest="F. D. Roosevelt" time="15:29" alsoAt="15:39" stops={6} mins={13} />
      <ModeStopRow node="bus" title="F. D. Roosevelt Quai 2" time="15:34" barBelow="dotted" />
      <WalkRow label="Walk 5 min (350 m)" />
      <ModeStopRow node="dest" title="6 Boulevard Franklin Roosevelt" address="1143 Ville-Haute Luxembourg" time="18:37" last />

      <div className="card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", marginTop: 24, marginBottom: 24, boxShadow: "var(--sh-1)" }}>
        <Icon name="warning-circle" size={22} style={{ color: "var(--ac-secondary)", flexShrink: 0 }} />
        <span style={{ flex: 1, font: "var(--t-sub)", color: "var(--fg-1)" }}>Report a problem with this public transport info</span>
        <Icon name="caret-right" size={16} style={{ color: "var(--fg-4)" }} />
      </div>
      <div style={{ textAlign: "center", font: "var(--t-caption)", color: "var(--fg-3)", paddingBottom: 8, paddingTop: 8 }}><span style={{ paddingTop: 16, paddingBottom: 16 }}>Departures updated 42s ago</span></div>
    </TrainStepSheetB>);
}

// ═════════════════════════════════════════════════════════════
// 15b · Journey steps · arrival (bus 22 → destination)
// ═════════════════════════════════════════════════════════════
function TrainStepsArrivalB({ dark = false }) {
  return (
    <TrainStepSheetB dark={dark}>
    </TrainStepSheetB>);
}

Object.assign(window, {
  TrainJourneyMapOverviewB, TrainStepsBoardingB, TrainStepsTransferB, TrainStepsArrivalB,
});
