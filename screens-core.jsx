// screens-core.jsx — Map home · Plan · Google-map home variant

// ─────────────────────────────────────────────────────────────
// Map home — primary entry
// ─────────────────────────────────────────────────────────────
function MapHomeScreen({ thinChips = false, newMap = false, dark = false }) {
  const saved = [
  { name: "Home", desc: "Rue du Port 12, Mertert", icon: "house", mode: "brand" },
  { name: "Work", desc: "Cote d'Eich 6, Ville-Haute Luxembourg", icon: "briefcase", mode: "brand" },
  { name: "Vello Station Limpertsberg", desc: "Bike station · 6 bikes free", icon: "bicycle", mode: "bike" }];


  return (
    <Device statusOn="on-photo" fullBleed dark={dark}>
      <div style={{ position: "absolute", inset: 0 }}>
        {newMap ?
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img
            src={dark ? "assets/home-map-roosevelt-dark2.png" : "assets/map-neighborhood.png"}
            alt="Map — neighborhood"
            draggable={false}
            className={dark ? "" : "map-photo--dark"}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: dark ? "contain" : "cover", objectPosition: dark ? "center -40%" : "center center", userSelect: "none", background: dark ? "#0E0F12" : undefined }} />
          <span className="locdot" style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 2 }}>
            <span className="locdot__ring" />
            <span className="locdot__ring" />
            <span className="locdot__core" />
          </span>
        </div> :
        <MapView fit="whole" liveLocation liveAt={[195, 250]} />}

        {/* Top glass search bar */}
        <div className="topbar-glass" style={{ top: 36, paddingTop: 8, background: "transparent", backdropFilter: "none" }}>
          <div className="field field--elevated" style={{ flex: 1, height: 46, borderRadius: 23 }}>
            <span className="field__icon"><Icon name="magnifying-glass" size={20} /></span>
            <span className="field__placeholder">Where to?</span>
            <span className="field__trailing"><Icon name="microphone" size={20} /></span>
          </div>
          <button className="iconbtn" aria-label="Account" style={{ background: "transparent", padding: 0, width: 44, height: 44 }}>
            <span
              style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "linear-gradient(135deg, #5669FF 0%, #B847FF 50%, #E5007E 100%)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 16px -6px rgba(86,105,255,0.55)"
              }}>
              
              <img
                src="assets/avatar-tiago.png"
                alt="Account"
                style={{
                  width: 38, height: 38, borderRadius: "50%",
                  objectFit: "cover", display: "block"
                }} />
              
            </span>
          </button>
        </div>

        {/* Floating actions over map — sit just above the sheet's top edge */}
        <div style={{ position: "absolute", right: 14, bottom: "calc(49% + 12px)", display: "flex", flexDirection: "column", gap: 10, zIndex: 10 }}>
          <button className="fab-mini" aria-label="Map layers" style={{ background: "var(--ac-secondary-soft)", color: "var(--ac-secondary)" }}><Icon name="stack" weight="fill" size={20} /></button>
          <button className="fab-mini" aria-label="Locate me">
            <span className="locdot">
              <span className="locdot__ring" />
              <span className="locdot__ring" />
              <span className="locdot__core" />
            </span>
          </button>
        </div>

        {/* Bottom sheet — quick saved */}
        <Sheet height="peek">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 0 8px" }}>
            <h3 className="display-l" style={{ fontSize: 26, letterSpacing: "-0.022em" }}>Quick journeys</h3>
            <button className="btn btn--ghost btn--sm" style={{ color: "var(--ac-secondary)" }}>See all</button>
          </div>

          {/* Mode strip — choose a mode to start planning */}
          <div style={{ display: "flex", gap: 8, padding: "2px 0 10px" }}>
            {[
            { id: "train", icon: "train", label: "Train", selected: true },
            { id: "bus", icon: "bus", label: "Bus", selected: true },
            { id: "tram", icon: "tram", label: "Tram" },
            { id: "bike", icon: "bicycle", label: "Bike", selected: true }].
            map((m) =>
            <button
              key={m.id}
              className={`modechip modechip--soft ${m.selected ? `modechip--selected modechip--mode-${m.id}` : ""}`}
              style={{ height: 32, flexShrink: 0, justifyContent: "center", padding: "18px 16px", borderRadius: 32, gap: 6, fontSize: thinChips ? 13 : undefined }}>
                <Icon name={m.icon} weight="regular" size={thinChips ? 17 : 20} />
                <span>{m.label}</span>
              </button>
            )}
          </div>

          <div className="stack-2">
            {saved.map((s, i) =>
            <div key={i} className="row" style={{ padding: 0, gap: 14 }}>
                <MTile icon={s.icon} mode={s.mode} />
                <div className="row__body">
                  <div className="row__title">{s.name}</div>
                  <div className="row__sub">{s.desc}</div>
                </div>
                <Icon name="caret-right" className="row__chev" />
              </div>
            )}
          </div>
        </Sheet>

        <BottomNav active="plan" />
      </div>
    </Device>);

}

// ─────────────────────────────────────────────────────────────
// Plan home — Google-map variant (map swapped for supplied image)
// ─────────────────────────────────────────────────────────────
function MapHomeGoogleScreen({ thinChips = false, dark = false }) {
  const saved = [
  { name: "Home", desc: "Rue du Port 12, Mertert", icon: "house", mode: "brand" },
  { name: "Work", desc: "Cote d'Eich 6, Ville-Haute Luxembourg", icon: "briefcase", mode: "brand" },
  { name: "Vello Station Limpertsberg", desc: "Bike station · 6 bikes free", icon: "bicycle", mode: "bike" }];


  return (
    <Device statusOn="on-photo" fullBleed dark={dark}>
      <div style={{ position: "absolute", inset: 0 }}>
        {/* Map — supplied image instead of the vector MapView */}
        <img
          src={dark ? "assets/home-map-roosevelt-dark.png" : "assets/home-map-roosevelt.png"}
          alt="Map"
          style={{ position: "absolute", left: 0, right: 0, top: -80, width: 400, height: 827, objectFit: "contain", objectPosition: "center top", background: dark ? "#0E0F12" : "#F7F6F4" }} />

        {/* Live location — blue dot with accuracy halo + pulse (matches Route options screen) */}
        <div style={{ position: "absolute", left: "47%", top: "36%", transform: "translate(-50%, -50%)", zIndex: 4, pointerEvents: "none" }}>
          <span style={{ position: "absolute", left: "50%", top: "50%", width: 96, height: 96, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(86,105,255,0.22) 0%, rgba(86,105,255,0.05) 60%, transparent 72%)" }} />
          <span style={{ position: "absolute", left: "50%", top: "50%", width: 26, height: 26, transform: "translate(-50%,-50%)", borderRadius: "50%", border: "2px solid #5669FF", animation: "livedotPulse 2.4s ease-out infinite" }} />
          <span style={{ position: "relative", display: "block", width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(20,22,26,0.35)" }}>
            <span style={{ position: "absolute", inset: 3.5, borderRadius: "50%", background: "#5669FF" }} />
          </span>
        </div>

        {/* Top glass search bar */}
        <div className="topbar-glass" style={{ top: 36, paddingTop: 8, background: "transparent", backdropFilter: "none" }}>
          <div className="field field--elevated" style={{ flex: 1, height: 46, borderRadius: 23 }}>
            <span className="field__icon"><Icon name="magnifying-glass" size={20} /></span>
            <span className="field__placeholder">Where to?</span>
            <span className="field__trailing"><Icon name="microphone" size={20} /></span>
          </div>
          <button className="iconbtn" aria-label="Account" style={{ background: "transparent", padding: 0, width: 44, height: 44 }}>
            <span
              style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "linear-gradient(135deg, #5669FF 0%, #B847FF 50%, #E5007E 100%)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 16px -6px rgba(86,105,255,0.55)"
              }}>
              
              <img
                src="assets/avatar-tiago.png"
                alt="Account"
                style={{
                  width: 38, height: 38, borderRadius: "50%",
                  objectFit: "cover", display: "block"
                }} />
              
            </span>
          </button>
        </div>

        {/* Floating actions over map — sit just above the sheet's top edge */}
        <div style={{ position: "absolute", right: 14, bottom: "calc(49% + 12px)", display: "flex", flexDirection: "column", gap: 10, zIndex: 10 }}>
          <button className="fab-mini" aria-label="Map layers" style={{ background: "var(--ac-secondary-soft)", color: "var(--ac-secondary)" }}><Icon name="stack" weight="fill" size={20} /></button>
          <button className="fab-mini" aria-label="Locate me">
            <span className="locdot">
              <span className="locdot__ring" />
              <span className="locdot__ring" />
              <span className="locdot__core" />
            </span>
          </button>
        </div>

        {/* Bottom sheet — quick saved */}
        <Sheet height="peek">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 0 8px" }}>
            <h3 className="display-l" style={{ fontSize: 26, letterSpacing: "-0.022em" }}>Quick journeys</h3>
            <button className="btn btn--ghost btn--sm" style={{ color: "var(--ac-secondary)" }}>See all</button>
          </div>

          {/* Mode strip — choose a mode to start planning */}
          <div style={{ display: "flex", gap: 8, padding: "2px 0 10px" }}>
            {[
            { id: "train", icon: "train", label: "Train", selected: true },
            { id: "bus", icon: "bus", label: "Bus", selected: true },
            { id: "tram", icon: "tram", label: "Tram" },
            { id: "bike", icon: "bicycle", label: "Bike", selected: true }].
            map((m) =>
            <button
              key={m.id}
              className={`modechip modechip--soft ${m.selected ? `modechip--selected modechip--mode-${m.id}` : ""}`}
              style={{ height: 32, flexShrink: 0, justifyContent: "center", padding: "18px 16px", borderRadius: 32, gap: 6, fontSize: thinChips ? 13 : undefined, ...(!m.selected ? { background: "var(--chip-inactive-bg)", color: "var(--chip-inactive-fg)" } : {}) }}>
                <Icon name={m.icon} weight="regular" size={thinChips ? 17 : 20} style={!m.selected ? { color: "var(--chip-inactive-fg)" } : undefined} />
                <span>{m.label}</span>
              </button>
            )}
          </div>

          <div className="stack-2">
            {saved.map((s, i) =>
            <div key={i} className="row" style={{ padding: 0, gap: 14 }}>
                <MTile icon={s.icon} mode={s.mode} />
                <div className="row__body">
                  <div className="row__title">{s.name}</div>
                  <div className="row__sub">{s.desc}</div>
                </div>
                <Icon name="caret-right" className="row__chev" />
              </div>
            )}
          </div>
        </Sheet>

        <BottomNav active="plan" />
      </div>
    </Device>);

}

Object.assign(window, {
  MapHomeScreen, MapHomeGoogleScreen
});
