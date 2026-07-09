// screens-references-v2.jsx — Mobiliteit Android
// Refined / polished duplicates of section 05 (Public transport route detail).
// Same Wasserbillig → Bd. F. Roosevelt journey (buses 303 / 305 / 18), rebuilt
// against the app's first-party patterns: the .tl timeline, arrival-forward
// header, status pills, live rail and JourneyFooter — so these read like the
// rest of the product instead of a Google-Maps transplant.
// Reuses window globals: Icon, Device, MapView, JourneyFooter, DirectionsCard,
// MapFabsTop, MapFabCompass, StreetViewThumb, React.

// ── Crowd bars (quiet · some · busy) ─────────────────────────
function CrowdV2({ level = 1, label }) {
  const tone = level >= 2 ? "var(--st-warning-fg)" : level === 1 ? "var(--mode-bus)" : "var(--st-success-fg)";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span style={{ display: "inline-flex", alignItems: "flex-end", gap: 2, height: 12 }}>
        {[6, 9, 12].map((h, i) =>
        <span key={i} style={{ width: 3, height: h, borderRadius: 1, background: i <= level ? tone : "var(--bd-default)" }} />
        )}
      </span>
      {label && <span style={{ color: "var(--fg-3)" }}>{label}</span>}
    </span>);
}

// ── Sheet header — arrival-forward, mirrors DetailScreen2 ─────
function JourneyHeaderV2({ live }) {
  return (
    <div style={{ padding: "6px 20px 0" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--fg-1)" }}>1 hr 11</span>
            <span className="tabular" style={{ fontSize: 15, fontWeight: 600, color: "var(--fg-3)" }}>14:14 → 15:25</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--fg-3)", marginTop: 6 }}>Today · 2 changes · buses 303 / 305 / 18</div>
        </div>
        <span className="pill pill--success" style={{ flexShrink: 0 }}>
          <Icon name="check-circle" weight="fill" />On time
        </span>
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
        <span className="pill pill--neutral"><Icon name="wheelchair" />Step free</span>
        <span className="pill pill--neutral"><Icon name="person-simple-walk" />6 min walk</span>
        <span className="pill pill--neutral"><Icon name="users-three" />Not too crowded</span>
      </div>

      {live &&
      <div className="liverail">
          <span className="liverail__dot" />
          <span className="liverail__label">{live.label}</span>
          <span className="liverail__sep" />
          <span className="liverail__text">{live.text}</span>
          <span style={{ flex: 1 }} />
          <span className="liverail__eta tabular">{live.eta}</span>
        </div>
      }
    </div>);
}

// ── A transit leg card inside a timeline row ─────────────────
function LegCard({ code, dir, stops, mins, crowd }) {
  return (
    <div className="tl__leg tl__leg--bus">
      <span className="tl__leg-icon"><Icon name="bus" weight="fill" /></span>
      <div className="tl__leg-body">
        <div className="tl__leg-line">
          <span className="tl__leg-code">{code}</span>
          <span className="tl__leg-direction">{dir}</span>
        </div>
        <div className="tl__leg-meta">
          <span className="tl__leg-stops"><Icon name="dots-three-vertical" />{stops} stops</span>
          <span className="sep" />
          <span>{mins} min</span>
          <span className="sep" />
          <CrowdV2 level={crowd.level} label={crowd.label} />
        </div>
      </div>
    </div>);
}

// ── Full journey timeline (.tl) ──────────────────────────────
function JourneyTimelineV2({ upTo = 9 }) {
  return (
    <div className="tl">
      {/* 0 — Origin */}
      <div className="tl__row">
        <div className="tl__when tabular">14:14</div>
        <div className="tl__ind"><span className="tl__dot tl__dot--brand" /><span className="tl__bar tl__bar--walk" /></div>
        <div className="tl__content">
          <div className="tl__place">2 Rue des Marais</div>
          <div className="tl__sub">Wasserbillig · starting point</div>
          <div className="tl__walk"><Icon name="person-simple-walk" />Walk 4 min · 280 m</div>
        </div>
      </div>

      {/* 1 — Bus 303 board */}
      <div className="tl__row">
        <div className="tl__when tabular">14:18</div>
        <div className="tl__ind"><span className="tl__dot" /><span className="tl__bar tl__bar--bus" /></div>
        <div className="tl__content">
          <div className="tl__place">Wasserbillig, Marais</div>
          <LegCard code="303" dir="to Kirchberg, Luxexpo" stops={3} mins={29} crowd={{ level: 1, label: "Some" }} />
        </div>
      </div>

      {/* 2 — Transfer at Luxexpo */}
      <div className="tl__row">
        <div className="tl__when tabular">14:47</div>
        <div className="tl__ind"><span className="tl__dot tl__dot--transfer" /><span className="tl__bar tl__bar--walk" /></div>
        <div className="tl__content">
          <div className="tl__place">Kirchberg, Gare Luxexpo<span className="tl__plat">Quai 1A</span></div>
          <div className="tl__walk"><Icon name="arrow-bend-right-down" />Transfer · walk 1 min, wait 8 min</div>
        </div>
      </div>

      {/* 3 — Bus 305 board */}
      <div className="tl__row">
        <div className="tl__when tabular">14:56</div>
        <div className="tl__ind"><span className="tl__dot" /><span className="tl__bar tl__bar--bus" /></div>
        <div className="tl__content">
          <div className="tl__place">Kirchberg, Hugo Gernsback</div>
          <LegCard code="305" dir="to Europe, Gare routière" stops={3} mins={5} crowd={{ level: 0, label: "Quiet" }} />
        </div>
      </div>

      {/* 4 — Transfer */}
      <div className="tl__row">
        <div className="tl__when tabular">15:01</div>
        <div className="tl__ind"><span className="tl__dot tl__dot--transfer" /><span className="tl__bar tl__bar--walk" /></div>
        <div className="tl__content">
          <div className="tl__place">Antoine de St Exupéry</div>
          <div className="tl__walk"><Icon name="arrow-bend-right-down" />Transfer · wait 9 min</div>
        </div>
      </div>

      {/* 5 — Bus 18 board */}
      <div className="tl__row">
        <div className="tl__when tabular">15:11</div>
        <div className="tl__ind"><span className="tl__dot" /><span className="tl__bar tl__bar--bus" /></div>
        <div className="tl__content">
          <div className="tl__place">Antoine de St Exupéry</div>
          <LegCard code="18" dir="to F. D. Roosevelt" stops={6} mins={14} crowd={{ level: 1, label: "Some" }} />
        </div>
      </div>

      {/* 6 — Alight + final walk */}
      <div className="tl__row">
        <div className="tl__when tabular">15:25</div>
        <div className="tl__ind"><span className="tl__dot" /><span className="tl__bar tl__bar--walk" /></div>
        <div className="tl__content">
          <div className="tl__place">F. D. Roosevelt, Quai 2</div>
          <div className="tl__walk"><Icon name="person-simple-walk" />Walk 1 min · 60 m</div>
        </div>
      </div>

      {/* 7 — Destination */}
      <div className="tl__row">
        <div className="tl__when tabular">15:25</div>
        <div className="tl__ind"><span className="tl__dot tl__dot--brand" /></div>
        <div className="tl__content">
          <div className="tl__place">6 Boulevard Franklin Roosevelt</div>
          <div className="tl__sub">1143 Ville-Haute Luxembourg · destination</div>
        </div>
      </div>
    </div>);
}

// ── Map chrome (back + share/more over the map) ──────────────
function MapTopBar() {
  return (
    <div style={{ position: "absolute", top: 50, left: 14, right: 14, display: "flex", justifyContent: "space-between", zIndex: 7 }}>
      <button className="iconbtn iconbtn--scrim" aria-label="Back"><Icon name="arrow-left" size={20} /></button>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="iconbtn iconbtn--scrim" aria-label="Share"><Icon name="share-network" size={20} /></button>
        <button className="iconbtn iconbtn--scrim" aria-label="More"><Icon name="dots-three" size={20} /></button>
      </div>
    </div>);
}

// ── Detail sheet (used by the three step screens) ────────────
function JourneyDetailSheet({ live, children }) {
  return (
    <Device statusOn="on-photo" fullBleed>
      <div style={{ position: "absolute", inset: 0 }}>
        <div style={{ position: "absolute", inset: "0 0 76% 0" }}>
          <PinCenteredMap />
          <MapTopBar />
        </div>

        <div className="sheet" style={{ height: "74%", padding: 0 }}>
          <span className="sheet__handle" />
          <JourneyHeaderV2 live={live} />
          <div style={{ padding: "16px 20px 0", overflowY: "auto", flex: 1 }}>
            {children || <JourneyTimelineV2 />}
          </div>
          <JourneyFooter />
        </div>
      </div>
    </Device>);
}

// ── Map peek sheet (used by the two journey-map screens) ─────
function JourneyPeekV2({ live }) {
  return (
    <div className="sheet" style={{ height: "50%", padding: 0 }}>
      <span className="sheet__handle" />
      <JourneyHeaderV2 live={live} />
      <div style={{ padding: "14px 20px 0", overflowY: "auto", flex: 1 }}>
        <JourneyTimelineV2 />
      </div>
      <JourneyFooter />
    </div>);
}

// ── Results route card ───────────────────────────────────────
const LEG_ICON_V2 = { walk: "person-simple-walk", train: "train", bus: "bus", tram: "tram", bike: "bicycle", car: "car-profile" };
function LegChipsV2({ legs }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
      {legs.map((m, i) =>
      <React.Fragment key={i}>
          {i > 0 && <Icon name="caret-right" size={11} className="route__sep" />}
          <span className={`routeleg routeleg--${m.mode}`} style={{ padding: "5px 10px 5px 8px" }}>
            <Icon name={LEG_ICON_V2[m.mode]} weight="fill" />
            <span className={m.mode === "walk" || m.mode === "bike" ? "tabular" : "routeleg__code"}>{m.code}</span>
          </span>
        </React.Fragment>
      )}
    </div>);
}

// ── Radar dot — pulsing live-departure signal ────────────────
function RadarDot({ tone = "var(--st-success-fg)", style }) {
  return (
    <span className="radar" style={{ "--radar-color": tone, ...style }} aria-hidden="true">
      <span className="radar__pulse" />
      <span className="radar__pulse" />
      <span className="radar__core" />
    </span>);
}

// ── Flat route row — separated by hairlines (no card) ────────
function FlatRouteRow({ hr, min, range, legs, place, depart, platform, crowd = { level: 1, label: "Not too crowded" }, stepFree = true, tone = "ok" }) {
  return (
    <div style={{ display: "flex", gap: 16, padding: "18px 0", cursor: "pointer" }}>
      <div style={{ width: 52, flexShrink: 0 }}>
        <div style={{ font: "var(--t-title-1)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--fg-1)" }}>{hr}</div>
        <div className="tabular" style={{ font: "var(--t-title-3)", fontWeight: 700, fontSize: 18, color: "var(--fg-1)", marginTop: 2 }}>{min}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="tabular" style={{ font: "var(--t-body-em)", fontSize: 16, color: "var(--fg-1)" }}>{range}</div>
        <div style={{ margin: "10px 0" }}><LegChipsV2 legs={legs} /></div>

        {/* Accessibility + crowd info */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, font: "var(--t-sub)", color: "var(--fg-2)", marginBottom: 8, flexWrap: "wrap" }}>
          {stepFree &&
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Icon name="wheelchair" size={16} />Step free
            </span>
          }
          <CrowdV2 level={crowd.level} label={crowd.label} />
        </div>

        {/* Schedule + platform */}
        <div style={{ font: "var(--t-sub)", color: "var(--fg-3)", lineHeight: 1.45 }}>
          Scheduled at <b className="tabular" style={{ color: "var(--fg-2)" }}>{depart}</b> from {place}
          {platform && <span className="tl__plat" style={{ marginLeft: 8 }}>Plat. {platform}</span>}
        </div>
      </div>
    </div>);
}

function RouteCardV2({ recommended, range, dur, legs, foot, also, tone = "ok" }) {
  return (
    <div className="card" style={{ padding: 16, borderRadius: 18, marginBottom: 12, boxShadow: "var(--sh-1)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: 12 }}>
        {tone === "busy" ?
        <span className="pill pill--warn"><Icon name="warning" weight="fill" />Busy</span> :
        <span className="pill pill--success"><Icon name="check-circle" weight="fill" />On time</span>}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
        <span className="tabular" style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>{range}</span>
        <span className="tabular" style={{ fontSize: 15, fontWeight: 700, color: "var(--fg-2)" }}>{dur}</span>
      </div>

      <div style={{ margin: "12px 0" }}><LegChipsV2 legs={legs} /></div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--fg-3)" }}>
        <RadarDot tone={tone === "busy" ? "var(--st-warning-fg)" : "var(--st-success-fg)"} />
        <span style={{ flex: 1 }}>{foot}</span>
      </div>

      {also &&
      <div className="tabular" style={{ fontSize: 13, color: "var(--fg-4)", marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--bd-subtle)" }}>
          Also scheduled at {also}
        </div>
      }
    </div>);
}

// Soft chip row above the results
function ResultsChips() {
  const chip = (children, sel) =>
  <button style={{
    display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0,
    height: 36, padding: "0 14px", borderRadius: 18, border: 0, cursor: "pointer",
    background: sel ? "var(--ac-secondary-soft)" : "var(--bg-sunken)",
    color: sel ? "var(--ac-secondary)" : "var(--fg-2)",
    font: "var(--t-sub-em)", fontSize: 14, fontWeight: 600
  }}>{children}</button>;
  return (
    <div className="scroll-x" style={{ padding: "12px 20px", margin: 0, alignItems: "center", gap: 8 }}>
      {chip(<><Icon name="lightning" size={15} weight="fill" />Best route</>, true)}
      {chip(<><span className="tabular">Leave 14:05</span><Icon name="caret-down" size={14} /></>)}
      {chip(<>Modes<Icon name="caret-down" size={14} /></>)}
      {chip(<><Icon name="wheelchair" size={15} />Step free</>)}
    </div>);
}

// ═════════════════════════════════════════════════════════════
// Screen 01 — Route options (refined results list)
// Inner content is shared as the dimmed backdrop behind the
// bottom-sheet modals (screens 02–04).
// ═════════════════════════════════════════════════════════════
function RouteOptionsContentV2() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <MapView withRoute routeShiftX={-150} />
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
          <FlatRouteRow hr="1h" min="11m" range="14:14 – 15:25" legs={[{ mode: "walk", code: "4" }, { mode: "bus", code: "303" }, { mode: "bus", code: "305" }, { mode: "bus", code: "18" }]} place="Wasserbillig, Marais" depart="14:18" platform="2" crowd={{ level: 1, label: "Not too crowded" }} stepFree />
          <div style={{ height: 1, background: "var(--bd-subtle)" }} />
          <FlatRouteRow hr="1h" min="16m" range="14:20 – 15:36" tone="busy" legs={[{ mode: "train", code: "RB60" }, { mode: "bike", code: "6" }]} place="Wasserbillig, Gare" depart="14:24" platform="3" crowd={{ level: 2, label: "Busy" }} stepFree />
          <div style={{ height: 1, background: "var(--bd-subtle)" }} />
          <FlatRouteRow hr="1h" min="18m" range="14:14 – 15:32" legs={[{ mode: "walk", code: "4" }, { mode: "tram", code: "T1" }, { mode: "bus", code: "16" }]} place="Wasserbillig, Marais" depart="14:18" platform="1" crowd={{ level: 0, label: "Quiet" }} stepFree={false} />
        </div>
      </div>
    </div>);
}

// Dimmed screen-01 behind a modal sheet (screens 02–04)
function ModalBackdropV2() {
  return (
    <>
      <RouteOptionsContentV2 />
      <div style={{ position: "absolute", inset: 0, background: "var(--bg-overlay)", zIndex: 8 }} />
    </>);
}

// ═════════════════════════════════════════════════════════════
// Screen 05 — Journey map · start (zoomed in, walking leg)
// ═════════════════════════════════════════════════════════════
function RefJourneyMapStartV2() {
  return (
    <Device statusOn="on-photo" fullBleed>
      <div style={{ position: "absolute", inset: 0 }}>
        <PinCenteredMap />

        <MapTopBar />
        <MapFabsTop />
        <MapFabCompass />
        <StreetViewThumb />

        <JourneyPeekV2 live={{ label: "Walking", text: "To Wasserbillig, Marais · board 303", eta: "4 min" }} />
      </div>
    </Device>);
}

// ═════════════════════════════════════════════════════════════
// Screen 06 — Journey map · overview (zoomed out, whole route)
// ═════════════════════════════════════════════════════════════
function RefJourneyMapOverviewV2() {
  return (
    <Device statusOn="on-photo" fullBleed>
      <div style={{ position: "absolute", inset: 0 }}>
        <PinCenteredMap />

        <MapTopBar />
        <MapFabsTop />
        <MapFabCompass />
        <StreetViewThumb />

        <JourneyPeekV2 live={{ label: "Boarding", text: "Bus 303 · Wasserbillig, Marais", eta: "5 min" }} />
      </div>
    </Device>);
}

// ═════════════════════════════════════════════════════════════
// Screen 07 — Journey steps · boarding (303)
// ═════════════════════════════════════════════════════════════
function RefStepsBoardingV2() {
  return <JourneyDetailSheet live={{ label: "Boarding", text: "Bus 303 to Kirchberg · Marais", eta: "5 min" }} />;
}

// ═════════════════════════════════════════════════════════════
// Screen 08 — Journey steps · transfer (305)
// ═════════════════════════════════════════════════════════════
function RefStepsTransferV2() {
  return <JourneyDetailSheet live={{ label: "Transfer", text: "Walk to bus 305 · Hugo Gernsback", eta: "8 min" }} />;
}

// ═════════════════════════════════════════════════════════════
// Screen 09 — Journey steps · arrival (18 → destination)
// ═════════════════════════════════════════════════════════════
function RefStepsArrivalV2() {
  return (
    <JourneyDetailSheet live={{ label: "Arriving", text: "Bus 18 to F. D. Roosevelt", eta: "4 min" }}>
      <JourneyTimelineV2 />

      <div style={{ marginTop: 6 }}>
        <button className="btn btn--ghost btn--full" style={{ height: 48, gap: 12, justifyContent: "flex-start", color: "var(--ac-secondary)" }}>
          <Icon name="calendar-plus" size={20} />Add to calendar
        </button>
      </div>
      <div className="card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", marginTop: 8, boxShadow: "var(--sh-1)", borderRadius: 16 }}>
        <Icon name="warning-circle" size={22} style={{ color: "var(--ac-secondary)", flexShrink: 0 }} />
        <span style={{ flex: 1, font: "var(--t-sub)", color: "var(--fg-1)" }}>Report a problem with this public transport info</span>
        <Icon name="caret-right" size={16} style={{ color: "var(--fg-4)" }} />
      </div>
      <div style={{ textAlign: "center", font: "var(--t-caption)", color: "var(--fg-3)", padding: "16px 0 8px" }}>
        Departures updated 42 s ago
      </div>
    </JourneyDetailSheet>);
}

Object.assign(window, {
  CrowdV2, JourneyHeaderV2, LegCard, JourneyTimelineV2, MapTopBar,
  JourneyDetailSheet, JourneyPeekV2, LegChipsV2, RouteCardV2, FlatRouteRow, ResultsChips,
  RouteOptionsContentV2, ModalBackdropV2,
  RefJourneyMapStartV2, RefJourneyMapOverviewV2,
  RefStepsBoardingV2, RefStepsTransferV2, RefStepsArrivalV2, RadarDot
});