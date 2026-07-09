// shared.jsx — Mobiliteit Android · shared primitives
// Loaded as <script type="text/babel"> — registers components on window.

// ─────────────────────────────────────────────────────────────
// Icon — Phosphor wrapper. `weight="fill"` for selected states.
// ─────────────────────────────────────────────────────────────
function Icon({ name, weight = "regular", size, style, className = "" }) {
  return (
    <i
      className={`ph${weight === "fill" ? "-fill" : ""} ph-${name} ${className}`}
      style={{ fontSize: size, lineHeight: 1, ...style }} />);


}

// ─────────────────────────────────────────────────────────────
// Android frame — Pixel 9 inspired, 2026 (Mobiliteit themed)
// ─────────────────────────────────────────────────────────────
function Device({ children, dark = false, statusOn = "light", time = "9:41", fullBleed = false }) {
  return (
    <div className={`dev ${dark ? "dev--dark" : ""} ${fullBleed ? "dev--fullbleed" : ""}`} data-theme={dark ? "dark" : "light"}>
      <StatusBar time={time} on={dark ? "on-dark" : statusOn} />
      <div className="screen">{children}</div>
      <GestureNav onDark={dark} />
    </div>);

}

function StatusBar({ time = "9:41", on = "light" }) {
  const color = on === "on-dark" ? "#fff" : "var(--fg-1)";
  return (
    <div className={`statusbar statusbar--${on}`} style={{ color }}>
      <span>{time}</span>
      <span className="statusbar__punch" />
      <div className="statusbar__icons">
        {/* Signal */}
        <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor">
          <rect x="0" y="9" width="3" height="5" rx="0.5" />
          <rect x="4.5" y="6.5" width="3" height="7.5" rx="0.5" />
          <rect x="9" y="3.5" width="3" height="10.5" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="14" rx="0.5" opacity="0.55" />
        </svg>
        {/* Wifi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 11.2c.83 0 1.5-.67 1.5-1.5S8.83 8.2 8 8.2s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" />
          <path d="M3.7 6.6a6 6 0 018.6 0l-1.4 1.4a4 4 0 00-5.8 0L3.7 6.6z" />
          <path d="M.85 3.75a10 10 0 0114.3 0l-1.4 1.4a8 8 0 00-11.5 0l-1.4-1.4z" />
        </svg>
        {/* Battery */}
        <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
          <rect x="0.5" y="0.5" width="19" height="11" rx="2.5" stroke="currentColor" />
          <rect x="20" y="3.5" width="2" height="5" rx="0.6" fill="currentColor" />
          <rect x="2" y="2" width="13.5" height="8" rx="1.4" fill="currentColor" />
        </svg>
      </div>
    </div>);

}

function GestureNav({ onDark = false }) {
  return (
    <div className="sysnav" style={{ padding: 0 }}>
      <img
        src="assets/android-home-indicator.png"
        alt="System navigation"
        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", filter: onDark ? "invert(1) brightness(0.82)" : "none" }} />
      <button
        aria-label="Back"
        style={{ position: "absolute", inset: 0, left: "66.66%", border: 0, background: "transparent", cursor: "pointer", padding: 0 }} />
    </div>);

}

// ─────────────────────────────────────────────────────────────
// Top app bar
// ─────────────────────────────────────────────────────────────
function TopBar({ title, leading, trailing, center }) {
  return (
    <div className={`topbar ${center ? "topbar--center" : ""}`}>
      {leading ?? <span style={{ width: 12 }} />}
      <div className="topbar__title" style={{ textAlign: "left" }}>{title}</div>
      {trailing}
    </div>);

}

function BackButton({ onClick, scrim = false }) {
  return (
    <button
      aria-label="Back"
      className={`iconbtn ${scrim ? "iconbtn--scrim" : ""}`}
      onClick={onClick}>
      
      <Icon name="arrow-left" size={22} />
    </button>);

}

// ─────────────────────────────────────────────────────────────
// Buttons
// ─────────────────────────────────────────────────────────────
function Btn({
  children, variant = "filled", brand = false, size = "md", full = false,
  icon, trailing, onClick, style
}) {
  const cls = [
  "btn",
  `btn--${variant}`,
  brand ? "btn--brand" : "",
  size !== "md" ? `btn--${size}` : "",
  full ? "btn--full" : ""].
  join(" ");
  return (
    <button className={cls} onClick={onClick} style={style}>
      {icon && <Icon name={icon} size={size === "sm" ? 16 : 18} />}
      {children}
      {trailing && <Icon name={trailing} size={size === "sm" ? 16 : 18} />}
    </button>);

}

// ─────────────────────────────────────────────────────────────
// Fields
// ─────────────────────────────────────────────────────────────
function Field({
  icon, placeholder, value, trailing, elevated = false, size = "md",
  onClick, brandTint = false
}) {
  return (
    <div
      className={[
      "field",
      elevated ? "field--elevated" : "",
      size !== "md" ? `field--${size}` : "",
      brandTint ? "field--filled-brand" : ""].
      join(" ")}
      onClick={onClick}>
      
      {icon &&
      <span className="field__icon">
          <Icon name={icon} size={20} />
        </span>
      }
      {value != null ?
      <span className="field__value">{value}</span> :

      <span className="field__placeholder">{placeholder}</span>
      }
      {trailing && <span className="field__trailing">{trailing}</span>}
    </div>);

}

// ─────────────────────────────────────────────────────────────
// Mode chip
// ─────────────────────────────────────────────────────────────
function ModeChip({ icon, label, mode = "brand", selected, onClick }) {
  return (
    <button
      className={[
      "modechip",
      selected ? "modechip--selected" : "",
      selected ? `modechip--mode-${mode}` : ""].
      join(" ")}
      onClick={onClick}>
      
      <Icon name={icon} weight={selected ? "fill" : "regular"} size={20} />
      <span>{label}</span>
    </button>);

}

// Segmented control
function Seg({ items, value, onChange }) {
  return (
    <div className="seg">
      {items.map((it) =>
      <button
        key={it.id}
        className={`seg__btn ${value === it.id ? "seg__btn--active" : ""}`}
        onClick={() => onChange && onChange(it.id)}>
        
          {it.icon && <Icon name={it.icon} size={14} />}
          {it.label}
        </button>
      )}
    </div>);

}

// ─────────────────────────────────────────────────────────────
// Line badge & mode tile
// ─────────────────────────────────────────────────────────────
function Line({ code, mode = "train", size = "md" }) {
  return (
    <span className={`line line--${mode} ${size === "lg" ? "line--lg" : ""}`}>{code}</span>);

}

function MTile({ icon, mode = "brand", size = "md" }) {
  return (
    <span className={`mtile mtile--${mode} ${size !== "md" ? `mtile--${size}` : ""}`}>
      <Icon name={icon} weight="fill" />
    </span>);

}

// ─────────────────────────────────────────────────────────────
// Pill (status)
// ─────────────────────────────────────────────────────────────
function Pill({ tone = "neutral", icon, children }) {
  return (
    <span className={`pill pill--${tone}`}>
      {icon && <Icon name={icon} />}
      {children}
    </span>);

}

// ─────────────────────────────────────────────────────────────
// Bottom nav (Android 2026 — pill, floating)
// ─────────────────────────────────────────────────────────────
function BottomNav({ active = "plan", rail = false }) {
  const items = [
  { id: "plan", label: "Plan", icon: "map-trifold" },
  { id: "departures", label: "Departures", icon: "clock" },
  { id: "lines", label: "Lines", icon: "path" },
  { id: "account", label: "Account", icon: "user-circle" }];

  return (
    <nav className={`bnav ${rail ? "bnav--rail" : ""}`}>
      {items.map((it) => {
        const a = it.id === active;
        return (
          <button key={it.id} className={`bnav__item ${a ? "bnav__item--active" : ""}`}>
            <Icon
              name={it.icon}
              weight={a ? "fill" : "regular"}
              size={22} />
            
            <span>{it.label}</span>
          </button>);

      })}
    </nav>);

}

// ─────────────────────────────────────────────────────────────
// Sheet
// ─────────────────────────────────────────────────────────────
function Sheet({ children, height = "peek" }) {
  return (
    <div className={`sheet sheet--${height}`}>
      <span className="sheet__handle" />
      <div className="sheet__body">{children}</div>
    </div>);

}

// ─────────────────────────────────────────────────────────────
// Pin-centered map — supplied Ville-Haute / Roosevelt photo, pre-cropped
// so the pink destination pin sits exactly at the image's own center.
// background-size:cover + background-position:center then keeps that
// pin dead-center in any container, regardless of its aspect ratio.
// Used for the "Public transport" reference sections (05 & 06).
// ─────────────────────────────────────────────────────────────
function PinCenteredMap({ style, zoom = 1, focusY = "38%", liftPx = 0, src = "assets/pin-centered-map.png", fit = "cover" }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, transform: liftPx ? `translateY(-${liftPx}px)` : undefined }}>
        <div className="map-photo--dark" style={{ position: "absolute", inset: 0, backgroundColor: "#E0DEE8", backgroundImage: `url(${src})`, backgroundSize: fit, backgroundPosition: `42% ${focusY}`, backgroundRepeat: "no-repeat", transform: zoom !== 1 ? `scale(${zoom})` : undefined, transformOrigin: `50% ${focusY}`, ...style }} />
      </div>
    </div>);
}

// ─────────────────────────────────────────────────────────────
// Map background — stylised, hand-rolled
// (named MapView to avoid clobbering JS built-in Map across scripts)
// ─────────────────────────────────────────────────────────────
function MapView({ withRoute = false, variant = "lux", fit = "cover", liveLocation = false, liveAt = [195, 250], routeShiftX = 0, zoom = 1 }) {
  return (
    <div className={`map ${fit === "whole" ? "map--whole" : ""}`} style={zoom !== 1 && fit === "whole" ? { backgroundSize: `${215 * zoom}% auto` } : undefined}>
      <svg viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={{ fill: "rgba(0, 0, 0, 0)", height: "810px", width: "390px" }}>
        <defs>
          {/* Magenta route halo */}
          <filter id="routeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feComponentTransfer in="b"><feFuncA type="linear" slope="0.45" /></feComponentTransfer>
          </filter>
          {/* Pin halo (radial) */}
          <radialGradient id="pinHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E5007E" stopOpacity="0.30" />
            <stop offset="60%" stopColor="#E5007E" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#E5007E" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pinHaloBlue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5669FF" stopOpacity="0.30" />
            <stop offset="60%" stopColor="#5669FF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#5669FF" stopOpacity="0" />
          </radialGradient>
          {/* Live-location accuracy halo */}
          <radialGradient id="liveAccuracy" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5669FF" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#5669FF" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#5669FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {withRoute &&
        <g transform={routeShiftX ? `translate(${routeShiftX} 0)` : undefined}>
            {/* Route halo (blue glow) */}
            <path
            d="M 60 720 Q 100 600 180 500 Q 240 420 300 330 Q 330 280 340 200"
            stroke="#5669FF"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            opacity="0.20"
            filter="url(#routeGlow)" />
          
            {/* Route casing (white) */}
            <path
            d="M 60 720 Q 100 600 180 500 Q 240 420 300 330 Q 330 280 340 200"
            stroke="#FFFFFF"
            strokeWidth="11"
            fill="none"
            strokeLinecap="round" />
          
            {/* Route fill (blue — workhorse, per design system) */}
            <path
            d="M 60 720 Q 100 600 180 500 Q 240 420 300 330 Q 330 280 340 200"
            stroke="#5669FF"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round" />
          
            {/* Animated dash for "in transit" feel */}
            <path
            d="M 60 720 Q 100 600 180 500 Q 240 420 300 330 Q 330 280 340 200"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="2 12"
            opacity="0.85" />
          

            {/* Origin pin — halo + dot */}
            <circle cx="60" cy="720" r="26" fill="url(#pinHalo)" />
            <circle cx="60" cy="720" r="11" fill="#FFFFFF" />
            <circle cx="60" cy="720" r="7" fill="#E5007E" />

            {/* Interchange dot — white on blue route */}
            <circle cx="180" cy="500" r="22" fill="url(#pinHaloBlue)" />
            <circle cx="180" cy="500" r="9" fill="#FFFFFF" stroke="#5669FF" strokeWidth="2.5" />

            {/* Destination pin — taller marker with halo */}
            <circle cx="340" cy="200" r="32" fill="url(#pinHalo)" />
            <g transform="translate(340 200)">
              <circle r="16" fill="#E5007E" />
              <circle r="15" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
              <circle r="6" fill="#FFFFFF" />
            </g>
          </g>
        }

        {liveLocation &&
        <g transform={`translate(${liveAt[0]} ${liveAt[1]})`}>
            {/* Soft accuracy radius */}
            <circle r="56" fill="url(#liveAccuracy)" />
            {/* Expanding pulse ring */}
            <circle r="16" fill="none" stroke="#5669FF" strokeWidth="2" opacity="0">
              <animate attributeName="r" values="14;46" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="2.4s" repeatCount="indefinite" />
            </circle>
            {/* White casing for contrast on any terrain */}
            <circle r="13" fill="#FFFFFF" />
            {/* Blue live dot */}
            <circle r="9" fill="#5669FF" />
            <circle r="9" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
          </g>
        }
      </svg>
    </div>);

}

Object.assign(window, {
  Icon, Device, StatusBar, GestureNav, TopBar, BackButton,
  Btn, Field, ModeChip, Seg, Line, MTile, Pill, BottomNav,
  Sheet, MapView, PinCenteredMap
});