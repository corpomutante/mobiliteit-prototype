// screens-references.jsx — Mobiliteit Android
// 9 additional screens rebuilt from reference screenshots (Google-Maps-style
// transit journey, Wasserbillig → Bd. F. Roosevelt via buses 303 / 305 / 18).
// Built entirely with the existing Mobiliteit design system + MapView map style.
// Does NOT touch any existing screen. Loaded as <script type="text/babel">.

// ─────────────────────────────────────────────────────────────
// Shared helpers (scoped to this file's references)
// ─────────────────────────────────────────────────────────────

// Compact leg-summary bar: walk·4 › 303 › 305 › 18  + optional back / status / close
function RefSummaryBar({ onClose = true, onBack = false, status = false }) {
  const buses = ["303", "305", "18"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "2px 4px 0" }}>
      {onBack &&
      <button className="iconbtn iconbtn--tonal" aria-label="Back" style={{ width: 40, height: 40, flexShrink: 0 }}>
          <Icon name="arrow-left" size={20} />
        </button>
      }
      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0, flexWrap: "wrap" }}>
        <span className="routeleg routeleg--walk" style={{ padding: "5px 9px" }}>
          <Icon name="person-simple-walk" weight="fill" />
          <span className="tabular">4</span>
        </span>
        {buses.map((b, i) =>
        <React.Fragment key={b}>
            <Icon name="caret-right" size={12} className="route__sep" />
            <span className="routeleg routeleg--bus" style={{ padding: "5px 10px 5px 8px" }}>
              <Icon name="bus" weight="fill" />
              <span className="routeleg__code">{b}</span>
            </span>
          </React.Fragment>
        )}
      </div>
      {status &&
      <span className="pill pill--success" style={{ flexShrink: 0 }}>
          <Icon name="check-circle" weight="fill" />On time
        </span>
      }
      {onClose &&
      <button className="iconbtn iconbtn--tonal" aria-label="Close" style={{ width: 40, height: 40, flexShrink: 0 }}>
          <Icon name="x" size={20} />
        </button>
      }
    </div>);
}

// Floating top bar over the map — back (left) + share / more (right)
function JourneyTopBar() {
  return (
    <div style={{ position: "absolute", top: 50, left: 14, right: 14, display: "flex", justifyContent: "space-between", zIndex: 9 }}>
      <button className="iconbtn iconbtn--scrim" aria-label="Back"><Icon name="arrow-left" size={20} /></button>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="iconbtn iconbtn--scrim" aria-label="Share"><Icon name="share-network" size={20} /></button>
        <button className="iconbtn iconbtn--scrim" aria-label="More"><Icon name="dots-three" size={20} /></button>
      </div>
    </div>);
}

// "We don't have the most recent timetables for this area." warning band
function TimetableWarning() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      background: "var(--bg-sunken)", borderRadius: 14,
      padding: "12px 14px", margin: "12px 0"
    }}>
      <Icon name="warning" weight="fill" size={22} style={{ color: "var(--st-warning-fg)", flexShrink: 0 }} />
      <span style={{ font: "var(--t-sub)", color: "var(--fg-2)" }}>
        We don't have the most recent timetables for this area.
      </span>
    </div>);
}

// Sticky footer: Save pill (left) + duration / arrival (right)
function JourneyFooter() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 20px 18px", background: "var(--bg-elevated)",
      borderTop: "1px solid var(--bd-subtle)"
    }}>
      <button className="btn btn--tonal" style={{ height: 46, paddingLeft: 18, paddingRight: 20 }}>
        <Icon name="bookmark-simple" size={20} />Save Journey
      </button>
      <div style={{ textAlign: "right" }}>
        <div className="tabular" style={{ font: "var(--t-title-2)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>1 hr 11 min</div>
        <div className="tabular" style={{ font: "var(--t-caption)", color: "var(--fg-3)", marginTop: 1 }}>arrive 15:25 · <span style={{ color: "var(--st-success-fg)", fontWeight: 700 }}>On time</span></div>
      </div>
    </div>);
}

// Pill chip with optional trailing caret — used for on-board info
function RefChip({ icon, children, caret = true }) {
  return (
    <span className="pill pill--neutral" style={{ height: 34, paddingLeft: 10, paddingRight: caret ? 8 : 12, fontSize: 13 }}>
      {icon && <Icon name={icon} size={16} />}
      <span style={{ fontWeight: 600 }}>{children}</span>
      {caret && <Icon name="caret-down" size={13} style={{ color: "var(--fg-3)" }} />}
    </span>);
}

// "What's it like on board?" block
function OnBoardBlock({ crowd = "Not too crowded" }) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ font: "var(--t-sub)", color: "var(--fg-2)", marginBottom: 8 }}>What's it like on board?</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <RefChip icon="users-three">{crowd}</RefChip>
        <RefChip icon="wheelchair">Accessibility</RefChip>
      </div>
    </div>);
}

// "Also at HH:MM (scheduled)" row with chevron
function AlsoAtRow({ time }) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "12px 0", borderTop: "1px solid var(--bd-subtle)", marginTop: 14 }}>
      <span style={{ flex: 1, font: "var(--t-sub)", color: "var(--fg-2)" }}>
        Also at <span style={{ fontWeight: 700, color: "var(--fg-1)" }} className="tabular">{time}</span> (scheduled)
      </span>
      <Icon name="caret-right" size={16} style={{ color: "var(--fg-4)" }} />
    </div>);
}

// "Ride N stops (M min)" collapsible row
function RideStopsRow({ stops, mins }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderTop: "1px solid var(--bd-subtle)" }}>
      <Icon name="caret-down" size={16} style={{ color: "var(--fg-3)" }} />
      <span style={{ font: "var(--t-sub-em)", color: "var(--fg-1)" }} className="tabular">Ride {stops} stops ({mins} min)</span>
    </div>);
}

// ── Reference timeline primitives ──────────────────────────────
// Rail width matches the bus-node circle for clean vertical alignment.
const RAIL = 44;

// Fixed-pitch dot pattern for all walking connectors — background-repeat:round
// lets the browser evenly redistribute whole dots across whatever height the
// segment renders at (instead of a fixed tile that clips mid-dot at the end,
// which is what made the gap right before the next icon look uneven).
const DOT_RAIL = { backgroundImage: "radial-gradient(circle, var(--fg-4) 1.6px, transparent 1.9px)", backgroundSize: "6px 9px", backgroundPosition: "center", backgroundRepeat: "no-repeat round" };

// Stop node row — icon node on the rail, title + optional address, time on right
function StopRow({
  node = "bus", title, address, time, strong = true,
  barAbove = null, barBelow = null, last = false
}) {
  const nodeEl =
  node === "origin" ?
  <Icon name="map-pin" weight="fill" size={26} style={{ color: "var(--fg-1)" }} /> :
  node === "dest" ?
  <Icon name="map-pin" weight="fill" size={30} style={{ color: "var(--ac-primary)" }} /> :
  // bus stop — white circle, teal bus glyph
  <span style={{
    width: 34, height: 34, borderRadius: "50%", background: "var(--bg-elevated)",
    border: "2.5px solid var(--mode-bus)", display: "inline-flex",
    alignItems: "center", justifyContent: "center", color: "var(--mode-bus)"
  }}>
        <Icon name="bus" weight="fill" size={18} />
      </span>;

  const renderTail = (val) => {
    if (!val) return null;
    if (val === "dotted") {
      return <span style={{ flex: 1, width: 6, minHeight: 12, ...DOT_RAIL }} />;
    }
    return <span style={{ flex: 1, width: 6, borderRadius: 3, background: val, marginTop: 2, minHeight: 18 }} />;
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, position: "relative", padding: "14px 0px 0px" }}>
      <div style={{ width: RAIL, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", alignSelf: "stretch" }}>
        {barAbove && (barAbove === "dotted" ?
        <span style={{ position: "absolute", top: 0, height: 18, width: 6, ...DOT_RAIL }} /> :
        <span style={{ position: "absolute", top: 0, height: 18, width: 6, borderRadius: 3, background: barAbove }} />)}
        <span style={{ zIndex: 2, display: "inline-flex" }}>{nodeEl}</span>
        {renderTail(barBelow)}
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

// Walk connector — dotted rail + "Walk X min (Y m)" body + chevron
function WalkRow({ label, barColor = null }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
      <div style={{ width: RAIL, flexShrink: 0, display: "flex", justifyContent: "center", alignSelf: "stretch", position: "relative" }}>
        {/* dotted walking connector — same fixed-pitch, round-repeat pattern as the stop-row tails */}
        <span style={{
          width: 6, ...DOT_RAIL,
          alignSelf: "stretch", minHeight: 40
        }} />
        <span style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", background: "var(--bg-elevated)", padding: "4px 0" }}>
          <Icon name="person-simple-walk" weight="fill" size={22} style={{ color: "var(--fg-2)" }} />
        </span>
      </div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 8, borderTop: "1px solid var(--bd-subtle)", borderBottom: "1px solid var(--bd-subtle)", padding: "16px 0" }}>
        <span style={{ flex: 1, font: "var(--t-body)", color: "var(--fg-2)" }}>{label}</span>
        <Icon name="caret-right" size={18} style={{ color: "var(--fg-4)" }} />
      </div>
    </div>);
}

// Bus detail block — sits to the right of the running blue/teal bar.
// Renders the line badge, destination, scheduled time, on-board info,
// "also at" and "ride N stops".
function BusDetail({ code, dest, time, crowd, alsoAt, stops, mins, barColor = "var(--mode-bus)" }) {
  return (
    <div style={{ display: "flex", gap: 14, position: "relative" }}>
      <div style={{ width: RAIL, flexShrink: 0, display: "flex", justifyContent: "center" }}>
        <span style={{ width: 6, borderRadius: 3, background: barColor, alignSelf: "stretch" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0, paddingBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span className="line line--bus line--lg" style={{ marginTop: 2 }}>{code}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: "var(--t-body-em)", color: "var(--fg-1)", lineHeight: 1.3 }}>{dest}</div>
            <div style={{ font: "var(--t-sub)", color: "var(--fg-3)", marginTop: 2 }}>Scheduled</div>
          </div>
          <span className="tabular" style={{ font: "var(--t-title-3)", fontWeight: 700, color: "var(--fg-1)", flexShrink: 0 }}>{time}</span>
        </div>
        <AlsoAtRow time={alsoAt} />
        <RideStopsRow stops={stops} mins={mins} />
      </div>
    </div>);
}

// Directions header — origin / destination, Trip-planner-style elevated pill
// fields, each with its own trailing round action (mirrors ResultsScreenV4).
function DirectionsCard({ compact = false }) {
  const fieldRow = (leadIcon, value, btn) =>
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div className="field field--elevated" style={{ flex: 1, height: 46, borderRadius: 23 }}>
        <span className="field__icon" style={{ display: "flex" }}>{leadIcon}</span>
        <span className="field__value" style={{ textAlign: "left", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</span>
      </div>
      {btn}
    </div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {fieldRow(
        <Icon name="circle" size={14} weight="bold" style={{ color: "var(--fg-3)" }} />,
        "Rue des Marais 2",
        <button aria-label="Account" style={{ flexShrink: 0, width: 44, height: 44, padding: 0, border: 0, background: "transparent", cursor: "pointer" }}>
          <span
            style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "linear-gradient(135deg, #5669FF 0%, #B847FF 50%, #E5007E 100%)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 16px -6px rgba(86,105,255,0.55)"
            }}>
            <img src="assets/avatar-tiago.png" alt="Account" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", display: "block" }} />
          </span>
        </button>
      )}
      {fieldRow(
        <Icon name="map-pin" weight="fill" size={18} style={{ color: "var(--ac-primary)" }} />,
        "Bd. Franklin Roosevelt 6",
        <button className="iconbtn iconbtn--tonal" aria-label="Swap origin and destination" style={{ flexShrink: 0, width: 44, height: 44 }}>
          <Icon name="arrows-down-up" size={20} />
        </button>
      )}
    </div>);
}

// Mode time tabs (car / transit / walk / bike)
function ModeTimeTabs() {
  const tabs = [
  { icon: "car-profile", time: "36 min" },
  { icon: "bus", time: "1 hr 12", active: true },
  { icon: "person-simple-walk", time: "8 hr" },
  { icon: "bicycle", time: "2 hr 16" }];
  return (
    <div style={{ display: "flex", borderBottom: "1px solid var(--bd-subtle)" }}>
      {tabs.map((t, i) =>
      <button key={i} style={{
        flex: 1, border: 0, background: "transparent", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
        padding: "12px 0 14px", position: "relative",
        color: t.active ? "var(--ac-secondary)" : "var(--fg-2)"
      }}>
          <Icon name={t.icon} weight={t.active ? "fill" : "regular"} size={20} />
          <span className="tabular" style={{ font: "var(--t-sub-em)", fontSize: 14, fontWeight: t.active ? 700 : 500 }}>{t.time}</span>
          {t.active && <span style={{ position: "absolute", bottom: -1, left: "18%", right: "18%", height: 3, borderRadius: 2, background: "var(--ac-secondary)" }} />}
        </button>
      )}
    </div>);
}

// A single route option row in the results list
const LEG_ICON = { walk: "person-simple-walk", train: "train", bus: "bus", tram: "tram", bike: "bicycle", car: "car-profile" };
function OptionRow({ hr = "1h", min = "12m", range = "14:14 – 15:25", legs = [], schedule }) {
  return (
    <div style={{ display: "flex", gap: 16, padding: "18px 0", cursor: "pointer" }}>
      <div style={{ width: 52, flexShrink: 0, textAlign: "left" }}>
        <div style={{ font: "var(--t-title-1)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--fg-1)" }}>{hr}</div>
        <div className="tabular" style={{ font: "var(--t-title-3)", fontWeight: 700, fontSize: 18, color: "var(--fg-1)", marginTop: 2 }}>{min}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="tabular" style={{ font: "var(--t-body-em)", fontSize: 16, color: "var(--fg-1)" }}>{range}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", margin: "10px 0 10px" }}>
          {legs.map((leg, i) => {
            const m = typeof leg === "string" ? { mode: "bus", code: leg } : leg;
            const isCount = m.mode === "walk" || m.mode === "bike";
            return (
              <React.Fragment key={i}>
                {i > 0 && <Icon name="caret-right" size={11} className="route__sep" />}
                <span className={`routeleg routeleg--${m.mode}`} style={{ padding: "5px 10px 5px 8px" }}>
                  <Icon name={LEG_ICON[m.mode]} weight="fill" />
                  <span className={isCount ? "tabular" : "routeleg__code"}>{m.code}</span>
                </span>
              </React.Fragment>);

          })}
        </div>
        <div style={{ font: "var(--t-sub)", color: "var(--fg-3)", lineHeight: 1.45 }}>{schedule}</div>
      </div>
    </div>);
}

// Route-options backdrop — map + directions header + results sheet.
// Reused as the dimmed scene behind the time-picker / modes / filters
// overlays (screens 02–04) so they share screen 01's context.
function RouteOptionsBackdrop() {
  return (
    <>
      <MapView withRoute routeShiftX={-150} />

      {/* Directions header over the map */}
      <div style={{ position: "absolute", top: 44, left: 12, right: 12, zIndex: 6 }}>
        <DirectionsCard />
      </div>

      {/* Results sheet */}
      <div className="sheet" style={{ height: "60%", padding: 0 }}>
        <span className="sheet__handle" />
        <div style={{ padding: "4px 20px 0", display: "flex", alignItems: "center", gap: 8 }}>
          <h3 style={{ flex: 1, font: "var(--t-title-1)", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>Route options</h3>
          <button className="iconbtn iconbtn--tonal" aria-label="Options" style={{ width: 40, height: 40 }}><Icon name="sliders-horizontal" size={20} /></button>
          <button className="iconbtn iconbtn--tonal" aria-label="Share" style={{ width: 40, height: 40 }}><Icon name="share-network" size={20} /></button>
          <button className="iconbtn iconbtn--tonal" aria-label="Close" style={{ width: 40, height: 40 }}><Icon name="x" size={20} /></button>
        </div>

        {/* Filter / control chips */}
        <div className="scroll-x" style={{ padding: "12px 20px 12px", margin: 0, alignItems: "center" }}>
          <button className="iconbtn iconbtn--tonal" aria-label="Refresh" style={{ width: 40, height: 40, flexShrink: 0 }}><Icon name="arrow-clockwise" size={18} /></button>
          <button className="modechip" style={{ background: "var(--bg-sunken)", boxShadow: "none" }}><span className="tabular">Leave 14:05</span><Icon name="caret-down" size={14} /></button>
          <button className="modechip" style={{ background: "var(--bg-sunken)", boxShadow: "none" }}><span>Modes</span><Icon name="caret-down" size={14} /></button>
          <button className="modechip" style={{ background: "var(--bg-sunken)", boxShadow: "none" }}><span>Filter by</span><Icon name="caret-down" size={14} /></button>
        </div>

        <div style={{ overflowY: "auto", flex: 1, padding: "0 20px 16px" }}>
          <OptionRow legs={[{ mode: "walk", code: "4" }, { mode: "train", code: "RE11" }, { mode: "bus", code: "18" }]} schedule={<>Scheduled at <b style={{ color: "var(--fg-2)" }} className="tabular">14:18</b> from WASSERBILLIG, Gare<br />Also scheduled at 15:18, 16:18</>} />
          <div style={{ height: 1, background: "var(--bd-subtle)" }} />
          <OptionRow hr="1h" min="16m" range="14:20 – 15:36" legs={[{ mode: "train", code: "RB60" }, { mode: "bike", code: "6" }]} schedule={<>Scheduled at <b style={{ color: "var(--fg-2)" }} className="tabular">14:24</b> from WASSERBILLIG, Gare<br />Also scheduled at 15:24, 16:24</>} />
          <div style={{ height: 1, background: "var(--bd-subtle)" }} />
          <OptionRow hr="1h" min="18m" range="14:14 – 15:32" legs={[{ mode: "walk", code: "4" }, { mode: "tram", code: "T1" }, { mode: "bus", code: "16" }]} schedule={<>Scheduled at <b style={{ color: "var(--fg-2)" }} className="tabular">14:18</b> from WASSERBILLIG, Marais</>} />
        </div>
      </div>
    </>);
}

// ═════════════════════════════════════════════════════════════
// Screen 01 — Route options (results list)
// ═════════════════════════════════════════════════════════════
function RefRouteOptionsScreen() {
  return (
    <Device statusOn="on-photo" fullBleed>
      <div style={{ position: "absolute", inset: 0 }}>
        <RouteOptionsBackdrop />
      </div>
    </Device>);
}

// ═════════════════════════════════════════════════════════════
// Screen 02 — Departure time picker (Leave / Arrive / Last)
// ═════════════════════════════════════════════════════════════
function RefTimePickerScreen() {
  const Spinner = ({ values, active }) =>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flex: 1 }}>
      {values.map((v, i) =>
    <div key={i} style={{
      font: "var(--t-title-1)", fontSize: i === 1 ? 30 : 22, fontWeight: i === 1 ? 700 : 500,
      color: i === 1 ? "var(--fg-1)" : "var(--fg-4)",
      padding: "10px 0", width: "100%", textAlign: "center",
      borderTop: i === 1 ? "1px solid var(--bd-default)" : "none",
      borderBottom: i === 1 ? "1px solid var(--bd-default)" : "none"
    }} className="tabular">{v}</div>
    )}
    </div>;

  const tabs = [{ id: "leave", label: "Leave", active: true }, { id: "arrive", label: "Arrive" }, { id: "last", label: "Last" }];

  return (
    <Device statusOn="light" fullBleed>
      <div style={{ position: "absolute", inset: 0 }}>
        <RouteOptionsBackdrop />
        {/* scrim */}
        <div style={{ position: "absolute", inset: 0, background: "var(--bg-overlay)", zIndex: 8 }} />

        {/* Time-picker sheet */}
        <div className="sheet" style={{ padding: 0, zIndex: 12 }}>
          <span className="sheet__handle" />
          <div style={{ padding: "8px 22px 0" }}>
            {/* Tabs */}
            <div style={{ display: "flex", justifyContent: "space-around", borderBottom: "1px solid var(--bd-subtle)", marginBottom: 24 }}>
              {tabs.map((t) =>
              <button key={t.id} style={{
                border: 0, background: "transparent", cursor: "pointer", padding: "4px 6px 12px",
                position: "relative", font: "var(--t-title-3)", fontSize: 17,
                fontWeight: t.active ? 700 : 500,
                color: t.active ? "var(--ac-secondary)" : "var(--fg-2)"
              }}>
                  {t.label}
                  {t.active && <span style={{ position: "absolute", bottom: -1, left: 4, right: 4, height: 3, borderRadius: 2, background: "var(--ac-secondary)" }} />}
                </button>
              )}
            </div>

            {/* Time spinner */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 24px 8px" }}>
              <Spinner values={["13", "14", "15"]} />
              <span style={{ font: "var(--t-title-1)", fontSize: 28, fontWeight: 600, color: "var(--fg-2)", paddingBottom: 2 }}>:</span>
              <Spinner values={["04", "05", "06"]} />
            </div>

            {/* Day stepper */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 8px", borderTop: "1px solid var(--bd-subtle)", marginTop: 14 }}>
              <button className="iconbtn" style={{ width: 40, height: 40 }} aria-label="Previous day"><Icon name="caret-left" size={22} /></button>
              <span style={{ font: "var(--t-body-em)", fontSize: 17, color: "var(--fg-1)" }}>Today</span>
              <button className="iconbtn" style={{ width: 40, height: 40 }} aria-label="Next day"><Icon name="caret-right" size={22} /></button>
            </div>

            <div style={{ textAlign: "center", padding: "10px 0 18px", borderTop: "1px solid var(--bd-subtle)" }}>
              <button className="btn btn--ghost" style={{ color: "var(--ac-secondary)", height: 40 }}>Reset to current time</button>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12, paddingBottom: 12 }}>
              <button className="btn btn--outline" style={{ flex: 1, height: 52 }}>Cancel</button>
              <button className="btn btn--filled" style={{ flex: 1, height: 52 }}>Set</button>
            </div>
          </div>
        </div>
      </div>
    </Device>);
}

// ═════════════════════════════════════════════════════════════
// Screen 03 — Preferred modes (sheet)
// ═════════════════════════════════════════════════════════════
function RefPreferredModesScreen() {
  const modes = [
  { icon: "train", label: "Train", mode: "train", on: false },
  { icon: "tram", label: "Tram", mode: "tram", on: false },
  { icon: "bus", label: "Bus", mode: "bus", on: true },
  { icon: "bicycle", label: "Bike · vel'OH", mode: "bike", on: true }];

  return (
    <Device statusOn="light" fullBleed>
      <div style={{ position: "absolute", inset: 0 }}>
        <RouteOptionsBackdrop />
        {/* dimmed results behind */}
        <div style={{ position: "absolute", inset: 0, background: "var(--bg-overlay)", zIndex: 8 }} />

        {/* Modes sheet */}
        <div className="sheet" style={{ height: "52%", padding: 0, zIndex: 12 }}>
          <span className="sheet__handle" />
          <div style={{ padding: "8px 22px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ font: "var(--t-title-1)", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>Preferred modes</h3>
              <p style={{ font: "var(--t-sub)", color: "var(--fg-3)", marginTop: 6 }}>Modes you'd like prioritised in your results</p>
            </div>
            <button className="iconbtn iconbtn--tonal" aria-label="Close" style={{ width: 40, height: 40, flexShrink: 0 }}><Icon name="x" size={20} /></button>
          </div>

          <div style={{ padding: "20px 22px 0" }}>
            {modes.map((m, i) =>
            <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderTop: i ? "1px solid var(--bd-subtle)" : "none" }}>
                <span className={`mtile mtile--${m.mode}`}><Icon name={m.icon} weight="fill" /></span>
                <span style={{ flex: 1, font: "var(--t-body-em)", fontSize: 16 }}>{m.label}</span>
                <span className={`switch ${m.on ? "switch--on" : ""}`} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Device>);
}

// ═════════════════════════════════════════════════════════════
// Screen 04 — Route filters (Filter by)
// ═════════════════════════════════════════════════════════════
function RefFiltersScreen() {
  const opts = [
  { label: "Best route", sel: true },
  { label: "Fewer transfers" },
  { label: "Less walking" },
  { label: "Step-free access", sub: "Avoid steps and prefer lifts" }];

  return (
    <Device statusOn="light" fullBleed>
      <div style={{ position: "absolute", inset: 0 }}>
        <RouteOptionsBackdrop />
        <div style={{ position: "absolute", inset: 0, background: "var(--bg-overlay)", zIndex: 8 }} />

        <div className="sheet" style={{ padding: 0, zIndex: 12 }}>
          <span className="sheet__handle" />
          <div style={{ padding: "8px 22px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ font: "var(--t-title-1)", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>Filter by</h3>
            <button className="iconbtn iconbtn--tonal" aria-label="Close" style={{ width: 40, height: 40 }}><Icon name="x" size={20} /></button>
          </div>

          <div style={{ padding: "18px 22px 8px" }}>
            {opts.map((o, i) =>
            <div key={o.label} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "14px 0", borderTop: i ? "1px solid var(--bd-subtle)" : "none" }}>
                <span style={{
                width: 24, height: 24, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                border: `2px solid ${o.sel ? "var(--ac-secondary)" : "var(--bd-default)"}`,
                display: "inline-flex", alignItems: "center", justifyContent: "center"
              }}>
                  {o.sel && <span style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--ac-secondary)" }} />}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ font: "var(--t-body-em)", fontSize: 16, color: "var(--fg-1)" }}>{o.label}</div>
                  {o.sub && <div style={{ font: "var(--t-sub)", color: "var(--fg-3)", marginTop: 3 }}>{o.sub}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Device>);
}

// Street-view thumbnail (bottom-left on map screens) — reuses map asset
function StreetViewThumb() {
  return (
    <div style={{
      position: "absolute", left: 14, bottom: 14, width: 116, height: 82,
      borderRadius: 14, overflow: "hidden", boxShadow: "var(--sh-2)",
      border: "2px solid #fff",
      background: "linear-gradient(160deg,#cfd6dd 0%,#aab3bd 55%,#8e9aa6 100%)"
    }}>
      <div style={{ position: "absolute", inset: 0, background: "url('assets/map-base.png') center/300% no-repeat", opacity: 0.85, filter: "saturate(0.7)" }} />
      <span style={{
        position: "absolute", left: 6, bottom: 6, width: 22, height: 22, borderRadius: "50%",
        background: "rgba(20,22,26,0.55)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff"
      }}>
        <Icon name="arrows-clockwise" size={13} />
      </span>
    </div>);
}

// Floating map controls — layers (top) + compass (lower)
function MapFabsTop() {
  return (
    <button className="fab-mini" aria-label="Map layers" style={{ position: "absolute", top: 110, right: 14, background: "var(--ac-secondary-soft)", color: "var(--ac-secondary)", zIndex: 7 }}>
      <Icon name="stack" weight="fill" size={20} />
    </button>);
}
function MapFabCompass() {
  return (
    <button className="fab-mini" aria-label="My location" style={{ position: "absolute", top: 170, right: 14, zIndex: 7 }}>
      <span className="locdot">
        <span className="locdot__ring" />
        <span className="locdot__ring" />
        <span className="locdot__core" />
      </span>
    </button>);
}

// Shared peek sheet for the two journey-map screens
function JourneyPeekSheet() {
  return (
    <div className="sheet" style={{ height: "25%", padding: 0 }}>
      <span className="sheet__handle" />
      <div style={{ padding: "2px 20px 0", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <RefSummaryBar onClose={false} />
        <div style={{ marginTop: 2 }}>
          <StopRow node="origin" title="2 Rue des Marais" address="6634 Wasserbillig Mertert, Luxembourg" time="14:14" barBelow="dotted" />
          <WalkRow label="Walk 4 min (280 m)" />
          <StopRow node="bus" title="WASSERBILLIG, Marais" barBelow="var(--mode-bus)" />
          <BusDetail code="303" dest="LUX Kirchberg, Gare Luxexpo quai 1A" time="14:18" crowd="Not too crowded" alsoAt="15:18" stops={3} mins={29} />
        </div>
      </div>
      <JourneyFooter />
    </div>);
}

// ═════════════════════════════════════════════════════════════
// Screen 05 — Journey map · start (zoomed in, walking leg)
// ═════════════════════════════════════════════════════════════
function RefJourneyMapStartScreen({ dark = false }) {
  return (
    <Device statusOn="on-photo" fullBleed dark={dark}>
      <div style={{ position: "absolute", inset: 0 }}>
        <PinCenteredMap zoom={1.11} focusY="100%" liftPx={43} />

        <JourneyTopBar />
        <MapFabsTop />
        <MapFabCompass />
        <StreetViewThumb />

        <JourneyPeekSheet />
      </div>
    </Device>);
}

// ═════════════════════════════════════════════════════════════
// Screen 06 — Journey map · overview (zoomed out, whole route)
// ═════════════════════════════════════════════════════════════
function RefJourneyMapOverviewScreen({ dark = false }) {
  return (
    <Device statusOn="on-photo" fullBleed dark={dark}>
      <div style={{ position: "absolute", inset: 0 }}>
        <PinCenteredMap zoom={1.11} focusY="100%" liftPx={72} />

        <JourneyTopBar />
        <MapFabsTop />
        <MapFabCompass />
        <StreetViewThumb />

        <JourneyPeekSheet />
      </div>
    </Device>);
}

// Tall detail sheet wrapper for the step screens (map sliver at very top)
function StepSheet({ children, dark = false }) {
  return (
    <Device statusOn="on-photo" fullBleed dark={dark}>
      <div style={{ position: "absolute", inset: 0 }}>
        <PinCenteredMap zoom={1.1} focusY="28%" />
        <div className="sheet" style={{ top: 76, height: "auto", bottom: 0, padding: 0 }}>
          <span className="sheet__handle" />
          <div style={{ padding: "2px 16px 12px", flexShrink: 0, borderBottom: "1px solid var(--bd-subtle)" }}>
            <RefSummaryBar onBack onClose={false} />
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 8px" }}>
            {children}
          </div>
          <JourneyFooter />
        </div>
      </div>
    </Device>);
}

// ═════════════════════════════════════════════════════════════
// Screen 07 — Journey steps · boarding (303)
// ═════════════════════════════════════════════════════════════
function RefStepsBoardingScreen({ dark = false }) {
  return (
    <StepSheet dark={dark}>
      <StopRow node="origin" title="2 Rue des Marais" address="6634 Wasserbillig Mertert, Luxembourg" time="14:14" barBelow="dotted" />
      <WalkRow label="Walk 4 min (280 m)" />
      <StopRow node="bus" title="WASSERBILLIG, Marais" barBelow="var(--mode-bus)" />
      <BusDetail code="303" dest="LUX Kirchberg, Gare Luxexpo quai 1A" time="14:18" crowd="Not too crowded" alsoAt="15:18" stops={3} mins={29} />
      <StopRow node="bus" title="LUX Kirchberg, Gare Luxexpo quai 1A" time="14:47" barBelow="dotted" />
      <WalkRow label="Walk 1 min (40 m), then wait for up to 8 min" />
    </StepSheet>);
}

// ═════════════════════════════════════════════════════════════
// Screen 08 — Journey steps · transfer (305)
// ═════════════════════════════════════════════════════════════
function RefStepsTransferScreen({ dark = false }) {
  return (
    <StepSheet dark={dark}>
      <StopRow node="bus" title="LUX Kirchberg, Gare Luxexpo quai 1A" time="14:47" barBelow="dotted" />
      <WalkRow label="Walk 1 min (40 m), then wait for up to 8 min" />
      <StopRow node="bus" title="LUX Kirchberg, Hugo Gernsback" barBelow="var(--mode-bus)" />
      <BusDetail code="305" dest="LUX Kirchberg, Europe Gare routière" time="14:56" crowd="Not crowded" alsoAt="15:56" stops={3} mins={5} />
      <StopRow node="bus" title="Antoine de St Exupéry" time="15:01" barBelow="dotted" />
      <WalkRow label="Walk 1 min (0 m), then wait for up to 9 min" />
    </StepSheet>);
}

// ═════════════════════════════════════════════════════════════
// Screen 09 — Journey steps · arrival (18 → destination)
// ═════════════════════════════════════════════════════════════
function RefStepsArrivalScreen({ dark = false }) {
  return (
    <StepSheet dark={dark}>
      {/* tail of the bus 18 ride */}
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ width: RAIL, flexShrink: 0, display: "flex", justifyContent: "center" }}>
          <span style={{ width: 6, borderRadius: 3, background: "var(--mode-bus)", alignSelf: "stretch" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingBottom: 4 }}>
          <AlsoAtRow time="15:01" />
          <RideStopsRow stops={6} mins={14} />
        </div>
      </div>
      <StopRow node="bus" title="F. D. Roosevelt Quai 2" time="15:25" barBelow="dotted" />
      <WalkRow label="Walk 1 min (60 m)" />
      <StopRow node="dest" title="6 Boulevard Franklin Roosevelt" address="1143 Ville-Haute Luxembourg" time="15:25" last />

      <div className="card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", marginTop: 12, boxShadow: "var(--sh-1)" }}>
        <Icon name="warning-circle" size={22} style={{ color: "var(--ac-secondary)", flexShrink: 0 }} />
        <span style={{ flex: 1, font: "var(--t-sub)", color: "var(--fg-1)" }}>Report a problem with this public transport info</span>
        <Icon name="caret-right" size={16} style={{ color: "var(--fg-4)" }} />
      </div>
      <div style={{ textAlign: "center", font: "var(--t-caption)", color: "var(--fg-3)", paddingBottom: 8 }}>Departures updated 42s ago</div>
    </StepSheet>);
}

Object.assign(window, {
  RefSummaryBar, TimetableWarning, JourneyFooter, JourneyTopBar, RefChip, OnBoardBlock,
  AlsoAtRow, RideStopsRow, StopRow, WalkRow, BusDetail,
  DirectionsCard, ModeTimeTabs, OptionRow,
  StreetViewThumb, MapFabsTop, MapFabCompass, JourneyPeekSheet, StepSheet,
  RefRouteOptionsScreen, RefTimePickerScreen, RefPreferredModesScreen, RefFiltersScreen,
  RefJourneyMapStartScreen, RefJourneyMapOverviewScreen,
  RefStepsBoardingScreen, RefStepsTransferScreen, RefStepsArrivalScreen
});