// screens-library.jsx — Saved (populated + empty) · Alerts · Account · Settings

// ─────────────────────────────────────────────────────────────
// Saved journeys (populated)
// ─────────────────────────────────────────────────────────────
function SavedScreen({ dark = false }) {
  const saved = [
  {
    name: "Home → Bouldering Class",
    desc: "Wasserbillig → Bd. F. Roosevelt 6",
    legs: [
    { type: "walk" },
    { type: "line", code: "RE11", mode: "train" },
    { type: "line", code: "12", mode: "bus" }],

    meta: "48 min · weekdays · alarm 17:30",
    mode: "brand"
  },
  {
    name: "Gym",
    desc: "Lux-Ville → Wasserbillig",
    legs: [
    { type: "line", code: "12", mode: "bus" },
    { type: "line", code: "RE11", mode: "train" },
    { type: "walk" }],

    meta: "52 min · weekdays",
    mode: "brand"
  },
  {
    name: "Sunday family",
    desc: "Wasserbillig → Echternach",
    legs: [
    { type: "line", code: "111", mode: "bus" }],

    meta: "32 min · Sundays only",
    mode: "bus"
  },
  {
    name: "vel'OH morning loop",
    desc: "Limpertsberg → Belair",
    legs: [
    { type: "line", code: "vel'OH", mode: "bike" }],

    meta: "18 min · weekdays",
    mode: "bike"
  }];

  return (
    <Device dark={dark}>
      <TopBar
        title="Saved journeys"
        leading={<BackButton />}
        trailing={
        <button className="iconbtn iconbtn--tonal" aria-label="Sort">
            <Icon name="funnel-simple" size={20} />
          </button>
        } />
      

      <div style={{ flex: 1, overflowY: "auto", padding: "4px 16px 100px" }}>
        {/* Segmented tab strip */}
        <div className="seg" style={{ width: "100%", marginBottom: 14 }}>
          <button className="seg__btn seg__btn--active" style={{ flex: 1, textAlign: "center", justifyContent: "center", padding: "0px" }}>Journeys</button>
          <button className="seg__btn" style={{ flex: 1, justifyContent: "center", padding: "0px" }}>Places</button>
          <button className="seg__btn" style={{ flex: 1, justifyContent: "center", padding: "0px" }}>Lines</button>
        </div>

        <div className="stack-3">
          {saved.map((s, i) =>
          <article key={i} className="card" style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <MTile icon={s.mode === "bike" ? "bicycle" : s.mode === "bus" ? "bus" : "bookmark-simple"} mode={s.mode} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: "var(--t-body-em)", fontSize: 15 }}>{s.name}</div>
                  <div style={{ font: "var(--t-caption)", color: "var(--fg-3)", marginTop: 2 }}>{s.desc}</div>
                </div>
                <button className="iconbtn" aria-label="More" style={{ width: 36, height: 36 }}>
                  <Icon name="dots-three" size={20} />
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
                {s.legs.map((l, k) =>
              <React.Fragment key={k}>
                    {k > 0 && <Icon name="caret-right" size={12} style={{ color: "var(--fg-4)" }} />}
                    {l.type === "walk" ?
                <span className="mtile mtile--sm mtile--walk"><Icon name="person-simple-walk" size={16} /></span> :

                <Line code={l.code} mode={l.mode} />
                }
                  </React.Fragment>
              )}
                <span className="space" />
                <span style={{ font: "var(--t-caption)", color: "var(--fg-3)" }} className="tabular">{s.meta}</span>
              </div>
            </article>
          )}
        </div>

        <div style={{ height: 16 }} />
        <button className="btn btn--outline btn--full" style={{ height: 52, borderRadius: 18 }}>
          <Icon name="plus" size={18} />Add a journey
        </button>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        <BottomNav active="plan" rail />
      </div>
    </Device>);

}

// ─────────────────────────────────────────────────────────────
// Saved — empty state
// ─────────────────────────────────────────────────────────────
function SavedEmptyScreen({ dark = false }) {
  return (
    <Device dark={dark}>
      <TopBar title="Saved journeys" leading={<BackButton />} />
      <div style={{ flex: 1, padding: "4px 16px", display: "flex", flexDirection: "column" }}>
        <div className="seg" style={{ width: "100%", marginBottom: 14 }}>
          <button className="seg__btn seg__btn--active" style={{ flex: 1, justifyContent: "center" }}>Journeys</button>
          <button className="seg__btn" style={{ flex: 1, justifyContent: "center" }}>Places</button>
          <button className="seg__btn" style={{ flex: 1, justifyContent: "center" }}>Lines</button>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
          <div style={{
            width: 80, height: 80, borderRadius: 28,
            background: "var(--ac-secondary-soft)", color: "var(--ac-secondary)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Icon name="bookmark-simple" size={36} />
          </div>
          <div style={{ height: 18 }} />
          <h3 className="display-l" style={{ fontSize: 28, textWrap: "balance" }}>
            No saved journeys yet.
          </h3>
          <p style={{ color: "var(--fg-3)", fontSize: 14, marginTop: 8, maxWidth: 280, textWrap: "pretty", lineHeight: 1.5 }}>
            Save your commute or favourite trip and we'll show live departures right on the home screen.
          </p>
          <div style={{ height: 22 }} />
          <Btn size="lg" icon="plus">Plan and save a trip</Btn>
        </div>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        <BottomNav active="plan" rail />
      </div>
    </Device>);

}

// ─────────────────────────────────────────────────────────────
// Alerts — disruption feed
// ─────────────────────────────────────────────────────────────
function AlertsScreen({ dark = false }) {
  const items = [
  {
    tone: "danger",
    icon: "x-circle",
    title: "RE11 Trier – Luxembourg cancelled",
    desc: "Trains 17:54 and 18:24 are cancelled today due to signalling works between Wasserbillig and Manternach.",
    time: "12 min ago",
    affects: [{ code: "RE11", mode: "train" }],
    cta: "Find alternatives"
  },
  {
    tone: "warn",
    icon: "clock-countdown",
    title: "Tram 1 delays · Glacis–Stäreplaz",
    desc: "Average +4 min until 19:00 due to high demand around Glacis.",
    time: "32 min ago",
    affects: [{ code: "T1", mode: "tram" }]
  },
  {
    tone: "info",
    icon: "info",
    title: "Night reroute · Bus 12",
    desc: "After 23:00 service runs via Rue d'Anvers; stop \"Hollerich-Église\" is not served.",
    time: "2 h ago",
    affects: [{ code: "12", mode: "bus" }]
  },
  {
    tone: "success",
    icon: "check-circle",
    title: "Service restored · Bus 120",
    desc: "Bus 120 is back to its regular route after this morning's diversion.",
    time: "Yesterday",
    affects: [{ code: "120", mode: "bus" }]
  }];


  return (
    <Device dark={dark}>
      <TopBar
        title="Service a lerts"
        leading={<BackButton />}
        trailing={
        <button className="iconbtn iconbtn--tonal" aria-label="Filters">
            <Icon name="funnel" size={20} />
          </button>
        } />
      

      <div style={{ padding: "0 16px 8px" }}>
        <div className="card card--warn" style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, borderRadius: 20 }}>
          <span className="mtile" style={{ background: "rgba(255,255,255,0.6)", color: "var(--st-warning-fg)" }}>
            <Icon name="warning" weight="fill" />
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ font: "var(--t-body-em)", fontSize: 14 }}>1 alert affects your saved trips</div>
            <div style={{ font: "var(--t-caption)", color: "var(--fg-2)", marginTop: 2 }}>Home → Work · RE11 cancelled</div>
          </div>
          <Icon name="caret-right" style={{ color: "var(--fg-3)" }} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 100px" }}>
        <div className="stack-3">
          {items.map((a, i) =>
          <article key={i} className="card" style={{ padding: 16, display: "flex", gap: 12 }}>
              <span className={`mtile mtile--lg`} style={{ background: `var(--st-${a.tone}-bg)`, color: `var(--st-${a.tone}-fg)` }}>
                <Icon name={a.icon} weight="fill" />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  {a.affects.map((l) => <Line key={l.code} code={l.code} mode={l.mode} />)}
                  <span style={{ font: "var(--t-caption)", color: "var(--fg-3)" }}>· {a.time}</span>
                </div>
                <div style={{ font: "var(--t-body-em)", fontSize: 15, marginTop: 6, lineHeight: 1.3 }}>
                  {a.title}
                </div>
                <div style={{ font: "var(--t-caption)", color: "var(--fg-2)", marginTop: 4, lineHeight: 1.5 }}>
                  {a.desc}
                </div>
                {a.cta &&
              <div style={{ marginTop: 12 }}>
                    <button className="btn btn--tonal btn--sm" style={{ color: "var(--ac-secondary)", background: "var(--ac-secondary-soft)" }}>
                      {a.cta}<Icon name="arrow-right" size={14} />
                    </button>
                  </div>
              }
              </div>
            </article>
          )}
        </div>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        <BottomNav active="lines" rail />
      </div>
    </Device>);

}

// ─────────────────────────────────────────────────────────────
// Account — profile + settings
// ─────────────────────────────────────────────────────────────
function AccountScreen({ dark = false }) {
  const groups = [
  {
    title: "Travel",
    items: [
    { icon: "clock-counter-clockwise", label: "Trip history" },
    { icon: "bell-ringing", label: "Departure alarms", trailing: "3 active" }]

  },
  {
    title: "Preferences",
    items: [
    { icon: "wheelchair", label: "Accessibility", trailing: "Step-free" },
    { icon: "translate", label: "Language", trailing: "English" },
    { icon: "moon", label: "Appearance", trailing: "Auto" }]

  },
  {
    title: "Support",
    items: [
    { icon: "question", label: "Help & FAQ" },
    { icon: "envelope", label: "Contact us" },
    { icon: "shield-check", label: "Privacy & data" }]

  }];

  return (
    <Device dark={dark}>
      <TopBar
        title="Account"
        trailing={
        <button className="iconbtn iconbtn--tonal" aria-label="Settings"><Icon name="gear-six" size={20} /></button>
        } />
      

      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 100px" }}>
        {/* Profile hero */}
        <button className="card card--brand" style={{ padding: 18, borderRadius: 26, display: "flex", alignItems: "center", gap: 14, width: "100%", textAlign: "left", border: 0, cursor: "pointer" }}>
          <span style={{ position: "relative", flexShrink: 0 }}>
            <span
              className="avatar--lg"
              style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "linear-gradient(135deg, #5669FF 0%, #B847FF 50%, #E5007E 100%)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 22px -10px rgba(86,105,255,0.5)"
              }}>
              <img
                src="assets/avatar-tiago.png"
                alt="Account"
                style={{
                  width: 56, height: 56, borderRadius: "50%",
                  objectFit: "cover", display: "block"
                }} />
            </span>
            <span
              aria-hidden="true"
              style={{
                position: "absolute", right: -2, bottom: -2,
                width: 24, height: 24, borderRadius: "50%",
                background: "var(--bg-elevated)", color: "var(--fg-1)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 6px -2px rgba(20,22,26,0.35)"
              }}>
              <Icon name="pencil-simple" size={13} weight="bold" />
            </span>
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: "var(--t-title-3)", fontSize: 18, fontWeight: 700 }}>Tiago Rodrigues</div>
            <div style={{ font: "var(--t-caption)", color: "var(--fg-2)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>tiago.rodrigues@example.lu</div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <span className="pill" style={{ background: "rgba(255,255,255,0.7)", color: "var(--fg-1)" }}>
                <Icon name="seal-check" weight="fill" style={{ color: "var(--ac-primary)" }} />Verified
              </span>
              <span className="pill" style={{ background: "rgba(255,255,255,0.7)", color: "var(--fg-1)" }}>Member since 2024</span>
            </div>
          </div>
          <Icon name="caret-right" size={18} style={{ color: "var(--fg-3)", flexShrink: 0, alignSelf: "center" }} />
        </button>

        {/* Stat bento — 1 primary + 2 small */}
        <div className="bento" style={{ marginTop: 14, height: 168 }}>
          <div className="bento__primary">
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.78)" }}>
                Distance saved · 2026
              </div>
            </div>
            <div>
              <div className="tabular" style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1, color: "#fff" }}>
                2,418
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>
                kilometres on transit
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12 }}>
                <Icon name="trend-up" size={14} style={{ color: "rgba(255,255,255,0.9)" }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>+18% vs 2025</span>
              </div>
            </div>
          </div>

          <div className="bento__small">
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="path" size={14} style={{ color: "var(--ac-secondary)" }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--fg-3)", letterSpacing: "0.02em" }}>Trips</span>
            </div>
            <div>
              <div className="tabular" style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.022em", color: "var(--fg-1)", lineHeight: 1 }}>184</div>
              <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 4 }}>this year</div>
            </div>
          </div>

          <div className="bento__small">
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="leaf" size={14} weight="fill" style={{ color: "var(--st-success-fg)" }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--fg-3)", letterSpacing: "0.02em" }}>CO₂</span>
            </div>
            <div>
              <div className="tabular" style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.022em", color: "var(--fg-1)", lineHeight: 1 }}>
                312<span style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-3)", marginLeft: 4 }}>kg</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 4 }}>avoided</div>
            </div>
          </div>
        </div>

        {/* Groups */}
        {groups.map((g) =>
        <React.Fragment key={g.title}>
            <div className="section-title">{g.title}</div>
            <div className="card" style={{ padding: 8 }}>
              {g.items.map((it, i, arr) =>
            <React.Fragment key={it.label}>
                  <div className="row" style={{ minHeight: 56 }}>
                    <span className="mtile mtile--sm" style={{ borderRadius: 12, background: "var(--bg-sunken)", color: "var(--fg-2)" }}>
                      <Icon name={it.icon} size={18} />
                    </span>
                    <span style={{ flex: 1, font: "var(--t-body)", fontSize: 15 }}>{it.label}</span>
                    {it.trailing &&
                <span style={{ font: "var(--t-caption)", color: "var(--fg-3)" }}>{it.trailing}</span>
                }
                    <Icon name="caret-right" className="row__chev" />
                  </div>
                  {i < arr.length - 1 && <div style={{ height: 1, background: "var(--bd-subtle)", marginLeft: 60 }} />}
                </React.Fragment>
            )}
            </div>
          </React.Fragment>
        )}

        <div style={{ height: 20 }} />
        <button className="btn btn--ghost btn--full" style={{ color: "var(--st-danger-fg)", height: 52 }}>
          Sign out
        </button>
        <div style={{ height: 8 }} />
        <div style={{ textAlign: "center", font: "var(--t-caption)", color: "var(--fg-4)" }}>v 4.2.1 · build 2026.05</div>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        <BottomNav active="account" rail />
      </div>
    </Device>);

}

// ─────────────────────────────────────────────────────────────
// Departures — live board + search across lines (train · bus · tram)
// ─────────────────────────────────────────────────────────────
function DeparturesScreen({ dark = false }) {
  const modeLabel = { train: "Train", bus: "Bus", tram: "Tram" };

  const nearby = [
  { code: "RE11", mode: "train", to: "Luxembourg", meta: "Plat. 2", min: 3, live: true },
  { code: "485", mode: "bus", to: "Grevenmacher, Bréil", meta: "Quai B", min: 8, live: true },
  { code: "RB60", mode: "train", to: "Wecker", meta: "Plat. 1", min: 14, live: false }];


  const lines = [
  { code: "T1", mode: "tram", route: "Luxexpo ↔ Stäreplaz", freq: "every 6 min", min: 2 },
  { code: "RE11", mode: "train", route: "Trier ↔ Luxembourg", freq: "every 30 min", min: 12 },
  { code: "12", mode: "bus", route: "Gare ↔ Cents-Waassertuerm", freq: "every 10 min", min: 4 },
  { code: "16", mode: "bus", route: "Gare ↔ Kirchberg", freq: "every 12 min", min: 7 },
  { code: "120", mode: "bus", route: "Luxembourg ↔ Echternach", freq: "every 20 min", min: 9 }];


  return (
    <Device dark={dark}>
      <TopBar
        title="Departures"
        trailing={
        <button className="iconbtn iconbtn--tonal" aria-label="Saved lines"><Icon name="bookmark-simple" size={20} /></button>
        } />
      

      {/* Search */}
      <div style={{ padding: "0 16px 4px" }}>
        <div className="field field--elevated" style={{ height: 50, borderRadius: 16 }}>
          <span className="field__icon"><Icon name="magnifying-glass" size={20} /></span>
          <span className="field__placeholder">Search a line, stop or station…</span>
        </div>
      </div>

      {/* Mode filter chips */}
      <div className="scroll-x" style={{ paddingTop: 8, paddingBottom: 8, textAlign: "right", padding: "8px 16px 8px 32px" }}>
        <button className="modechip modechip--selected" style={{ background: "var(--ac-secondary)", height: 32, padding: "18px 16px" }}>
          <Icon name="squares-four" weight="fill" size={20} /><span>All</span>
        </button>
        <button className="modechip" style={{ height: 32, padding: "18px 16px", backgroundColor: "var(--chip-inactive-bg)" }}><Icon name="train" size={20} style={{ color: "var(--chip-inactive-fg)" }} /><span style={{ color: "var(--chip-inactive-fg)" }}>Train</span></button>
        <button className="modechip" style={{ height: 32, padding: "18px 16px", backgroundColor: "var(--chip-inactive-bg)" }}><Icon name="bus" size={20} style={{ color: "var(--chip-inactive-fg)" }} /><span style={{ color: "var(--chip-inactive-fg)" }}>Bus</span></button>
        <button className="modechip" style={{ height: 32, padding: "18px 16px", backgroundColor: "var(--chip-inactive-bg)" }}><Icon name="tram" size={20} style={{ color: "var(--chip-inactive-fg)" }} /><span style={{ color: "var(--chip-inactive-fg)" }}>Tram</span></button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 100px" }}>
        {/* Near you — live board for the closest stop */}
        <div className="section-title">Near you</div>
        <div className="card" style={{ padding: 6, textAlign: "left" }}>
          {/* Stop header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px 10px" }}>
            <span className="mtile mtile--sm" style={{ background: "var(--ac-primary-soft)", color: "var(--ac-primary)" }}>
              <Icon name="map-pin" weight="fill" size={18} />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="row__title">Wasserbillig, Gare</div>
              <div className="row__sub tabular">120 m · 2 min walk</div>
            </div>
            <span className="liverail__label" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--st-success-fg)" }}>
              <span className="liverail__dot" />Live
            </span>
          </div>
          <div style={{ height: 1, background: "var(--bd-subtle)" }} />

          {nearby.map((d, i) =>
          <div key={i} className="row" style={{ minHeight: 60, padding: "10px", gap: 12, alignItems: "flex-start" }}>
              <Line code={d.code} mode={d.mode} size="lg" />
              <div className="row__body">
                <div className="row__title">{d.to}</div>
                <div className="row__sub">{d.meta} · {modeLabel[d.mode]}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-end" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                  <span className="tabular" style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1, color: d.min <= 5 ? "var(--ac-secondary)" : "var(--fg-1)" }}>{d.min}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--fg-3)" }}>min</span>
                </div>
                {d.live &&
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <span className="liverail__dot" style={{ width: 6, height: 6 }} />
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-3)" }}>ON TIME</span>
                  </span>
              }
              </div>
            </div>
          )}

          <button className="row" style={{ minHeight: 44, padding: "8px 10px", justifyContent: "center", gap: 6, border: 0, background: "transparent", cursor: "pointer", color: "var(--ac-secondary)", font: "var(--t-body-em)", fontSize: 14 }}>
            See all 14 departures<Icon name="caret-right" size={14} />
          </button>
        </div>

        {/* Lines — browsable / search results across modes */}
        <div className="section-title">Lines</div>
        <div className="card" style={{ padding: 6 }}>
          {lines.map((l, i, arr) =>
          <React.Fragment key={i}>
              <div className="row" style={{ minHeight: 58, padding: "10px", gap: 12 }}>
                <Line code={l.code} mode={l.mode} size="lg" />
                <div className="row__body">
                  <div className="row__title">{l.route}</div>
                  <div className="row__sub">{modeLabel[l.mode]} · {l.freq}</div>
                </div>
                <div style={{ textAlign: "right", marginRight: 2 }}>
                  <div className="tabular" style={{ fontSize: 13, fontWeight: 700, color: "var(--fg-1)" }}>{l.min} min</div>
                  <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 1 }}>next</div>
                </div>
                <Icon name="caret-right" className="row__chev" />
              </div>
              {i < arr.length - 1 && <div style={{ height: 1, background: "var(--bd-subtle)", marginLeft: 58 }} />}
            </React.Fragment>
          )}
        </div>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        <BottomNav active="departures" rail />
      </div>
    </Device>);

}

// ─────────────────────────────────────────────────────────────
// Edit profile — form reached from the Account hero
// ─────────────────────────────────────────────────────────────
function EditProfileScreen({ dark = false }) {
  const fields = [
  { label: "Full name", icon: "user", value: "Tiago Rodrigues" },
  { label: "Email", icon: "envelope", value: "tiago.rodrigues@example.lu", verified: true },
  { label: "Phone", icon: "phone", value: "+352 691 234 567", verified: true },
  { label: "Home address", icon: "house", value: "Rue du Port 12, Mertert" },
  { label: "Language", icon: "translate", value: "English", select: true }];


  return (
    <Device dark={dark}>
      <TopBar
        title="Edit profile"
        leading={<BackButton />}
        trailing={
        <button className="btn btn--ghost btn--sm" style={{ color: "var(--ac-secondary)", fontWeight: 700 }}>Save</button>
        } />
      

      <div style={{ flex: 1, overflowY: "auto", padding: "4px 16px 40px" }}>
        {/* Avatar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4px 0 6px" }}>
          <span style={{ position: "relative" }}>
            <span
              style={{
                width: 96, height: 96, borderRadius: "50%",
                background: "linear-gradient(135deg, #5669FF 0%, #B847FF 50%, #E5007E 100%)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 12px 30px -12px rgba(86,105,255,0.55)"
              }}>
              <img
                src="assets/avatar-tiago.png"
                alt="Account"
                style={{ width: 86, height: 86, borderRadius: "50%", objectFit: "cover", display: "block" }} />
            </span>
            <button
              aria-label="Change photo"
              style={{
                position: "absolute", right: 0, bottom: 0,
                width: 32, height: 32, borderRadius: "50%", border: "2px solid var(--bg-canvas)",
                background: "var(--fg-1)", color: "#fff", cursor: "pointer",
                display: "inline-flex", alignItems: "center", justifyContent: "center"
              }}>
              <Icon name="camera" weight="fill" size={15} />
            </button>
          </span>
          <button className="btn btn--ghost btn--sm" style={{ marginTop: 10, color: "var(--ac-secondary)" }}>
            Change photo
          </button>
        </div>

        {/* Fields */}
        <div className="stack-4" style={{ marginTop: 6 }}>
          {fields.map((f) =>
          <label key={f.label} style={{ display: "block" }}>
              <div style={{ font: "var(--t-micro)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--fg-3)", fontWeight: 700, marginBottom: 8 }}>
                {f.label}
              </div>
              <div
              style={{
                display: "flex", alignItems: "center", gap: 12, minHeight: 52, padding: "0 14px",
                border: `1px solid ${f.label === "Email" ? "var(--bd-focus)" : "var(--bd-default)"}`,
                boxShadow: f.label === "Email" ? "0 0 0 3px color-mix(in oklab, var(--ac-primary) 16%, transparent)" : "none",
                borderRadius: 14, background: "var(--bg-elevated)"
              }}>
                <Icon name={f.icon} size={18} style={{ color: "var(--fg-3)", flexShrink: 0 }} />
                <span style={{ flex: 1, minWidth: 0, font: "var(--t-body)", fontSize: 15, color: "var(--fg-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {f.value}{f.label === "Email" && <span className="typing-caret" />}
                </span>
                {f.verified &&
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, flexShrink: 0, color: "var(--st-success-fg)", fontSize: 12, fontWeight: 700 }}>
                    <Icon name="seal-check" weight="fill" size={15} />Verified
                  </span>
              }
                {f.select && <Icon name="caret-down" size={16} style={{ color: "var(--fg-3)", flexShrink: 0 }} />}
              </div>
            </label>
          )}
        </div>

        <div style={{ height: 24 }} />
        <Btn size="lg" full icon="check">Save changes</Btn>
        <div style={{ height: 10 }} />
        <button className="btn btn--ghost btn--full" style={{ color: "var(--st-danger-fg)", height: 48 }}>
          Delete account
        </button>
      </div>
    </Device>);

}

// ─────────────────────────────────────────────────────────────
// Account — v2
// Calmer, flatter take (Google-Maps "You" register): a quiet white
// profile card, a 2×2 quick-access grid, a flat impact strip and
// grouped settings. No gradient hero, no fares (transit is free).
// ─────────────────────────────────────────────────────────────
function AccountScreenV2({ dark = false }) {
  const quick = [
  { icon: "bookmark-simple", label: "Saved journeys", meta: "12 saved", mode: "brand", color: "#E5007E" },
  { icon: "bell-ringing", label: "Departure alarms", meta: "3 active", mode: "train" },
  { icon: "clock-counter-clockwise", label: "Trip history", meta: "184 trips", mode: "bus" },
  { icon: "wheelchair", label: "Accessibility", meta: "Step-free", mode: "tram" }];


  const stats = [
  { icon: "path", color: "var(--ac-secondary)", value: "184", unit: "", label: "Trips" },
  { icon: "train", color: "var(--mode-train)", value: "2,418", unit: "km", label: "Distance" },
  { icon: "leaf", color: "var(--st-success-fg)", value: "312", unit: "kg", label: "CO₂ saved" }];


  const prefs = [
  { icon: "translate", label: "Language", value: "English" },
  { icon: "moon", label: "Appearance", value: "Light" },
  { icon: "bell", label: "Notifications", value: "On" },
  { icon: "map-trifold", label: "Default home", value: "Map" }];


  const support = [
  { icon: "question", label: "Help & FAQ" },
  { icon: "chat-circle-text", label: "Contact us" },
  { icon: "shield-check", label: "Privacy & data" },
  { icon: "info", label: "About Mobiliteit" }];


  const ListCard = ({ items }) =>
  <div className="card" style={{ padding: 6 }}>
      {items.map((it, i, arr) =>
    <React.Fragment key={it.label}>
          <div className="row" style={{ minHeight: 54, padding: "10px 12px" }}>
            <span className="mtile mtile--sm" style={{ borderRadius: 12, background: "var(--bg-sunken)", color: "var(--fg-2)" }}>
              <Icon name={it.icon} size={18} />
            </span>
            <span style={{ flex: 1, font: "var(--t-body)", fontSize: 15, color: "var(--fg-1)" }}>{it.label}</span>
            {it.value &&
        <span style={{ font: "var(--t-caption)", color: "var(--fg-3)" }}>{it.value}</span>
        }
            <Icon name="caret-right" className="row__chev" />
          </div>
          {i < arr.length - 1 && <div style={{ height: 1, background: "var(--bd-subtle)", marginLeft: 56 }} />}
        </React.Fragment>
    )}
    </div>;


  return (
    <Device dark={dark}>
      <TopBar
        title="Account"
        trailing={
        <button className="iconbtn iconbtn--tonal" aria-label="Settings"><Icon name="gear-six" size={20} /></button>
        } />


      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 100px" }}>
        {/* Profile — flat white card, rounded-square avatar */}
        <button className="card" style={{ padding: 14, borderRadius: 22, display: "flex", alignItems: "center", gap: 14, width: "100%", textAlign: "left", border: 0, cursor: "pointer", background: "var(--bg-elevated)" }}>
          <img
            src="assets/avatar-tiago.png"
            alt="Account"
            style={{ width: 60, height: 60, borderRadius: 20, objectFit: "cover", display: "block", flexShrink: 0, boxShadow: "inset 0 0 0 1px rgba(20,22,26,0.06)" }} />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ font: "var(--t-title-3)", fontSize: 18, fontWeight: 700, color: "var(--fg-1)" }}>Tiago Rodrigues</span>
              <Icon name="seal-check" weight="fill" size={16} style={{ color: "var(--ac-primary)", flexShrink: 0 }} />
            </div>
            <div style={{ font: "var(--t-caption)", color: "var(--fg-3)", marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>tiago.rodrigues@example.lu</div>
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--ac-secondary)", font: "var(--t-sub-em)", fontSize: 13, flexShrink: 0, paddingRight: 4 }}>
            Edit<Icon name="caret-right" size={14} />
          </span>
        </button>

        {/* Quick access — 2×2 grid of flat tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
          {quick.map((q) =>
          <button key={q.label} className="card" style={{ padding: 14, borderRadius: 18, border: 0, cursor: "pointer", background: "var(--bg-elevated)", textAlign: "left", display: "flex", flexDirection: "column", gap: 10 }}>
              <span className={`mtile mtile--${q.mode}`}><Icon name={q.icon} weight="fill" style={q.color ? { color: q.color } : undefined} /></span>
              <div>
                <div style={{ font: "var(--t-body-em)", fontSize: 14, color: "var(--fg-1)", lineHeight: 1.2 }}>{q.label}</div>
                <div style={{ font: "var(--t-caption)", color: "var(--fg-3)", marginTop: 2 }}>{q.meta}</div>
              </div>
            </button>
          )}
        </div>

        {/* Impact — flat 3-up strip, no gradient, no fares */}
        <div className="section-title">Your 2026 on transit</div>
        <div className="card" style={{ padding: "16px 4px" }}>
          <div style={{ display: "flex", alignItems: "stretch" }}>
            {stats.map((s, i) =>
            <React.Fragment key={s.label}>
                {i > 0 && <span style={{ width: 1, background: "var(--bd-subtle)", margin: "2px 0" }} />}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "0 6px" }}>
                  <Icon name={s.icon} weight="fill" size={18} style={{ color: s.color }} />
                  <div className="tabular" style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--fg-1)", lineHeight: 1 }}>
                    {s.value}{s.unit && <span style={{ fontSize: 12, fontWeight: 600, color: "var(--fg-3)", marginLeft: 2 }}>{s.unit}</span>}
                  </div>
                  <div style={{ font: "var(--t-micro)", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--fg-3)", fontWeight: 700 }}>{s.label}</div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>

        {/* Preferences */}
        <div className="section-title">Preferences</div>
        <ListCard items={prefs} />

        {/* Support */}
        <div className="section-title">Support</div>
        <ListCard items={support} />

        <div style={{ height: 18 }} />
        <button className="btn btn--ghost btn--full" style={{ color: "var(--st-danger-fg)", height: 52 }}>
          Sign out
        </button>
        <div style={{ height: 8 }} />
        <div style={{ textAlign: "center", font: "var(--t-caption)", color: "var(--fg-4)" }}>v 4.2.1 · build 2026.05</div>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        <BottomNav active="account" rail />
      </div>
    </Device>);

}

// ─────────────────────────────────────────────────────────────
// Lines — network browser + line detail
// Search across train/bus/tram, filter by mode, then a single line's
// stops drawn as a coloured vertical strip with a direction arrow,
// transfer badges, a live vehicle marker, a "download line map"
// action and a direct entry into Service alerts.
// ─────────────────────────────────────────────────────────────
function LineStop({ s, mode, isFirst, isLast }) {
  const col = `var(--mode-${mode})`;
  // Live vehicle marker — rides the line between two stops
  if (s.vehicle) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 14, minHeight: 30, marginTop: -8, marginBottom: 2 }}>
        <div style={{ position: "relative", width: 28, flexShrink: 0, alignSelf: "stretch" }}>
          <span style={{ position: "absolute", left: 13, top: 0, bottom: 0, width: 4, background: col, borderRadius: 2 }} />
          <span
            style={{
              position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
              width: 26, height: 26, borderRadius: "50%", background: "var(--bg-elevated)", color: col,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 0 3px ${col}, 0 0 0 6px var(--bg-elevated)`
            }}>
            <Icon name="tram" weight="fill" size={15} />
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", minWidth: 0 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 26, padding: "0 11px", borderRadius: 13, background: "var(--st-success-bg)", color: "var(--st-success-fg)", font: "var(--t-caption)", fontWeight: 700 }}>
            <span className="liverail__dot" />Tram here · {s.eta}
          </span>
        </div>
      </div>);

  }
  const big = isFirst || isLast;
  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: 14 }}>
      <div style={{ position: "relative", width: 28, flexShrink: 0 }}>
        {/* upper segment */}
        {!isFirst && <span style={{ position: "absolute", left: 13, top: 0, height: 14, width: 4, background: col }} />}
        {/* lower segment */}
        {!isLast && <span style={{ position: "absolute", left: 13, top: 14, bottom: 0, width: 4, background: col }} />}
        {/* dot */}
        {big ?
        <span style={{ position: "absolute", left: "50%", top: 2, transform: "translateX(-50%)", width: 18, height: 18, borderRadius: "50%", background: col, boxShadow: `0 0 0 4px var(--bg-elevated), inset 0 0 0 3px #fff` }} /> :

        <span style={{ position: "absolute", left: "50%", top: 5, transform: "translateX(-50%)", width: 13, height: 13, borderRadius: "50%", background: "var(--bg-elevated)", boxShadow: `0 0 0 3.5px ${col}` }} />
        }
      </div>
      <div style={{ minWidth: 0, paddingBottom: isLast ? 0 : 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ font: big ? "var(--t-body-em)" : "var(--t-body)", fontSize: big ? 16 : 15, fontWeight: big ? 700 : 500, color: "var(--fg-1)", lineHeight: 1.2 }}>{s.name}</span>
          {(s.connect || []).map((l) => <Line key={l.code} code={l.code} mode={l.mode} />)}
        </div>
        {(s.sub || s.note || big) &&
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, font: "var(--t-caption)", color: "var(--fg-3)" }}>
            {big && <span style={{ font: "var(--t-micro)", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 800, color: "var(--mode-tram)" }}>{isFirst ? "Start" : "Terminus"}</span>}
            {big && (s.sub || s.note) && <span style={{ color: "var(--fg-4)" }}>·</span>}
            {s.note ?
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="arrows-left-right" size={13} />{s.note}</span> :
          s.sub}
          </div>
        }
      </div>
    </div>);

}

function LinesScreen({ dark = false }) {
  const mode = "tram";
  const filters = [
  { id: "all", icon: "squares-four", label: "All" },
  { id: "train", icon: "train", label: "Train" },
  { id: "bus", icon: "bus", label: "Bus" },
  { id: "tram", icon: "tram", label: "Tram", selected: true, bg: "var(--mode-tram-bg)", fg: "var(--mode-tram)" }];


  const stops = [
  { name: "Luxexpo", terminal: true, sub: "Park & Ride · 312 spaces", connect: [{ code: "P+R", mode: "pr" }, { code: "302", mode: "bus" }] },
  { name: "Nationalbibliothéik" },
  { name: "Universitéit", sub: "Campus Kirchberg" },
  { name: "Coque", sub: "Stade · Piscine olympique" },
  { name: "Rout Bréck – Pafendall", note: "Train + funicular", connect: [{ code: "RE11", mode: "train" }, { code: "RB60", mode: "train" }] },
  { vehicle: true, eta: "arriving Glacis · 1 min" },
  { name: "Glacis", connect: [{ code: "12", mode: "bus" }, { code: "16", mode: "bus" }] },
  { name: "Stäreplaz / Étoile", terminal: true, connect: [{ code: "9", mode: "bus" }, { code: "14", mode: "bus" }] }];


  const realStops = stops.filter((s) => !s.vehicle);
  const lastName = realStops[realStops.length - 1].name;

  return (
    <Device dark={dark}>
      <TopBar
        title="Lines"
        trailing={
        <button className="iconbtn iconbtn--tonal" aria-label="Saved lines"><Icon name="bookmark-simple" size={20} /></button>
        } />


      {/* Search across lines */}
      <div style={{ padding: "0 16px 4px" }}>
        <div className="field field--elevated" style={{ height: 50, borderRadius: 16 }}>
          <span className="field__icon"><Icon name="magnifying-glass" size={20} /></span>
          <span className="field__placeholder">Search line number, stop or station…</span>
        </div>
      </div>

      {/* Mode / number filter */}
      <div className="scroll-x" style={{ textAlign: "center", padding: "8px 16px 8px 32px" }}>
        {filters.map((f) =>
        <button
          key={f.id}
          className="modechip"
          style={{
            background: f.selected ? f.bg : "var(--chip-inactive-bg)",
            color: f.selected ? f.fg : "var(--chip-inactive-fg)",
            fontWeight: f.selected ? 700 : 600,
            flexShrink: 0, height: 32, padding: "18px 16px"
          }}>
            <Icon name={f.icon} weight={f.selected ? "fill" : "regular"} size={20} style={{ color: f.selected ? f.fg : "var(--chip-inactive-fg)" }} /><span>{f.label}</span>
          </button>
        )}
        <button className="modechip" style={{ backgroundColor: "var(--chip-inactive-bg)", color: "var(--chip-inactive-fg)", flexShrink: 0, height: 32, padding: "18px 16px" }}>
          <Icon name="hash" size={20} style={{ color: "var(--chip-inactive-fg)" }} /><span>By number</span>
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "4px 16px 100px" }}>
        {/* Selected line header */}
        <article className="card" style={{ padding: 16, borderRadius: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Line code="T1" mode={mode} size="lg" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: "var(--t-title-3)", fontSize: 17, fontWeight: 700, color: "var(--fg-1)", lineHeight: 1.2 }}>Luxtram 1</div>
              <div style={{ font: "var(--t-caption)", color: "var(--fg-3)", marginTop: 2 }}>Tram · every 6 min · 09 stops</div>
            </div>
            <button className="iconbtn iconbtn--tonal" aria-label="Save this line" style={{ backgroundColor: "rgba(232, 230, 225, 0)" }}><Icon name="bookmark-simple" size={18} /></button>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button className="btn btn--tonal btn--sm" style={{ flex: 1, minWidth: 0, height: 46, borderRadius: 14 }}>
              <Icon name="download-simple" size={18} />Line map
            </button>
            <button
              className="btn btn--sm"
              style={{ flex: 1, minWidth: 0, height: 46, borderRadius: 14, background: "var(--st-warning-bg)", color: "var(--st-warning-fg)", position: "relative" }}>
              <Icon name="warning" weight="fill" size={18} />Service alerts
            </button>
          </div>
        </article>

        {/* Stops timeline */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 4px 10px" }}>
          <span className="section-title" style={{ margin: 0 }}>Stops</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, font: "var(--t-caption)", color: "var(--mode-tram)", fontWeight: 600 }}>
            <Icon name="wheelchair" weight="fill" size={15} />All step-free
          </span>
        </div>

        <div className="card" style={{ padding: "18px 16px" }}>
          {stops.map((s, i) =>
          <LineStop
            key={i}
            s={s}
            mode={mode}
            isFirst={i === 0}
            isLast={i === stops.length - 1} />

          )}
        </div>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        <BottomNav active="lines" rail />
      </div>
    </Device>);

}

Object.assign(window, {
  SavedScreen, SavedEmptyScreen, AlertsScreen, AccountScreen, DeparturesScreen, EditProfileScreen,
  AccountScreenV2, LinesScreen, LineStop
});