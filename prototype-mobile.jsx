// prototype-mobile.jsx — vertical, mobile-sized clickable prototype.
// No floating toolbar / bezel chrome, no scale-to-arbitrary-viewport stage —
// this renders as a plain vertical mobile screen (390x844 aspect, letterboxed
// only if the embedding frame is a different shape), the way you'd drop it
// into a device mockup or a Framer phone frame.

const SCREENS = {
  splash:          { title: "Splash",                render: () => <SplashScreen /> },
  onb1:            { title: "Onboarding · 1 of 3",    render: () => <OnboardingScreen step={1} /> },
  onb2:            { title: "Onboarding · 2 of 3",    render: () => <OnboardingScreen step={2} /> },
  onb3:            { title: "Onboarding · 3 of 3",    render: () => <OnboardingScreen step={3} /> },
  login:           { title: "Log in",                render: () => <LogInScreen /> },
  signup:          { title: "Sign up",               render: () => <SignUpScreen /> },
  forgot:          { title: "Forgot password",       render: () => <ForgotPasswordScreen /> },
  verify:          { title: "Verification",          render: () => <VerificationScreen filled={["4","8","1","9","0","2"]} active={-1} /> },
  home:            { title: "Plan · home",           render: () => <MapHomeGoogleScreen /> },
  search:          { title: "Search",                render: () => <PlanSearchV2Map /> },
  placeResult:     { title: "Search · place selected", render: () => <PlanPlaceResultV2 /> },
  routeOptions:    { title: "Route options",         render: () => <RefRouteOptionsV2Marais /> },
  optionsPrefs:    { title: "Options",               render: () => <PlanOptionsPrefsV2Marais /> },
  timePicker:      { title: "Departure time",        render: () => <RefTimePickerV2Marais /> },
  preferredModes:  { title: "Preferred modes",       render: () => <RefPreferredModesV2Marais /> },
  filters:         { title: "Filter by",             render: () => <RefFiltersV2Marais /> },
  journeyOverview: { title: "Journey · overview",    render: () => <TrainJourneyMapOverview /> },
  journeyOverviewB: { title: "Journey · overview", render: () => <TrainJourneyMapOverviewB /> },
  journeyBoarding: { title: "Journey · boarding",    render: () => <TrainStepsBoarding /> },
  journeyTransfer: { title: "Journey · transfer",    render: () => <TrainStepsTransfer /> },
  journeyArrival:  { title: "Journey · arrival",     render: () => <TrainStepsArrival /> },
  departures:      { title: "Departures",            render: () => <DeparturesScreen /> },
  lines:           { title: "Lines",                 render: () => <LinesScreen /> },
  alerts:          { title: "Service alerts",        render: () => <AlertsScreen /> },
  saved:           { title: "Saved journeys",        render: () => <SavedScreen /> },
  account:         { title: "Account",               render: () => <AccountScreenV2 /> },
  editProfile:     { title: "Edit profile",          render: () => <EditProfileScreen /> },
};

const ADVANCE_MAP = {
  splash: "onb1",
  search: "placeResult",
  journeyOverview: "journeyBoarding",
  journeyBoarding: "journeyTransfer",
  journeyTransfer: "journeyArrival",
  journeyArrival: "home",
};

const TAB_SCREENS = ["home", "departures", "lines", "account"];

const CLICKABLE_CLASSES = ["row", "field", "field--elevated", "modechip", "bnav__item", "fab-mini", "iconbtn", "seg__btn", "card"];

function findClickable(target, root) {
  let el = target;
  while (el && el !== root && el !== document.body) {
    if (el.tagName === "BUTTON" || el.tagName === "A" || el.getAttribute?.("role") === "button") return el;
    if (el.style && el.style.cursor === "pointer") return el;
    if (el.classList && CLICKABLE_CLASSES.some((c) => el.classList.contains(c))) return el;
    el = el.parentElement;
  }
  return null;
}

function norm(s) { return (s || "").trim().toLowerCase(); }

function resolveDestination(screenId, el, text, aria) {
  const t = norm(text);

  if (aria === "Account" && screenId !== "account") return "account";
  if (aria === "Saved lines") return "saved";

  switch (screenId) {
    case "onb1":
    case "onb2":
    case "onb3": {
      const isStepBack = el.classList?.contains("btn--tonal") && el.querySelector?.(".ph-arrow-left");
      if (isStepBack) return screenId === "onb3" ? "onb2" : "onb1";
      if (t.includes("skip") || t.includes("get started")) return "login";
      if (t.includes("next")) return screenId === "onb1" ? "onb2" : "onb3";
      return null;
    }
    case "login": {
      if (t === "log in") return "home";
      if (t.includes("create an account")) return "signup";
      if (t.includes("forgot password")) return "forgot";
      if (t.includes("continue with a secure link") || t.includes("continue as guest")) return "home";
      return null;
    }
    case "signup": {
      if (t.includes("create account")) return "verify";
      if (t.includes("log in")) return "login";
      if (t.includes("continue as guest")) return "home";
      return null;
    }
    case "forgot": {
      if (t.includes("send reset link") || t.includes("back to log in")) return "login";
      return null;
    }
    case "verify": {
      if (t.includes("verify")) return "home";
      return null;
    }
    case "home": {
      if (aria === "Account") return "account";
      if (t.includes("where to")) return "search";
      if (t.includes("see all")) return "saved";
      if (el.classList?.contains("row")) return "routeOptions";
      return null;
    }
    case "search": {
      if (el.tagName === "DIV" && !el.classList?.contains("field")) return "placeResult";
      return null;
    }
    case "placeResult": {
      if (t.includes("start trip")) return "routeOptions";
      if (t.includes("save journey")) return "saved";
      return null;
    }
    case "routeOptions": {
      if (aria === "Options") return "optionsPrefs";
      if (el.tagName === "BUTTON") {
        if (t.includes("best route")) return "filters";
        if (t.includes("leave 14")) return "timePicker";
        if (t === "modes") return "preferredModes";
        if (t.includes("step free")) return "filters";
        return null;
      }
      if (el.classList?.contains("field")) return null;
      if (el.tagName === "DIV") return "journeyOverviewB";
      return null;
    }
    case "timePicker": {
      if (t.includes("set time")) return "BACK";
      return null;
    }
    case "journeyOverview": {
      if (t.includes("save journey")) return null;
      return null;
    }
    case "departures": {
      if (t.includes("see all")) return "lines";
      return null;
    }
    case "lines": {
      if (t.includes("service alerts")) return "alerts";
      return null;
    }
    case "saved": {
      if (t.includes("add a journey")) return "search";
      if (el.closest?.(".card")) return "journeyOverview";
      return null;
    }
    case "account": {
      if (t.includes("sign out")) return "login";
      if (t.includes("saved journeys")) return "saved";
      if (t.includes("tiago rodrigues")) return "editProfile";
      return null;
    }
    case "editProfile": {
      if (t === "save") return "BACK";
      return null;
    }
    default:
      return null;
  }
}

const PHONE_W = 390, PHONE_H = 844;

// Would clicking this element actually navigate somewhere? Mirrors the
// routing rules in handleClick, minus firing the navigation itself — used to
// decide which elements get the "this is interactive" highlight treatment.
function isNavigable(screenId, el) {
  const aria = el.getAttribute?.("aria-label") || "";
  if (aria === "Back" || aria === "Close") return true;
  if (el.classList?.contains("bnav__item")) return true;
  const text = el.textContent || "";
  return !!resolveDestination(screenId, el, text, aria);
}

// Briefly highlights whatever was just tapped, Figma-prototype-style, so it's
// obvious which icons/cards are interactive.
function flashHotspot(el) {
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const radius = cs.borderRadius && cs.borderRadius !== "0px" ? cs.borderRadius : "10px";
  const div = document.createElement("div");
  div.className = "tap-hotspot";
  div.style.left = r.left + "px";
  div.style.top = r.top + "px";
  div.style.width = r.width + "px";
  div.style.height = r.height + "px";
  div.style.borderRadius = radius;
  document.body.appendChild(div);
  requestAnimationFrame(() => div.classList.add("tap-hotspot--in"));
  setTimeout(() => {
    div.classList.remove("tap-hotspot--in");
    setTimeout(() => div.remove(), 120);
  }, 220);
}

const HOTSPOT_SELECTOR = 'button, a, [role="button"], .row, .field, .field--elevated, .modechip, .bnav__item, .fab-mini, .iconbtn, .seg__btn, .card';

// On every screen open, briefly outlines every tappable element that actually
// leads somewhere (per isNavigable) so people can see what's interactive
// before they've clicked anything. Non-functional look-alikes stay plain.
function pulseHotspots(root, screenId) {
  if (!root) return;
  const els = Array.from(root.querySelectorAll(HOTSPOT_SELECTOR)).filter((el) => isNavigable(screenId, el));
  els.forEach((el) => el.classList.add("hotspot-live"));
  const overlays = [];
  els.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return;
    const cs = getComputedStyle(el);
    const radius = cs.borderRadius && cs.borderRadius !== "0px" ? cs.borderRadius : "10px";
    const div = document.createElement("div");
    div.className = "hotspot-pulse";
    div.style.left = r.left + "px";
    div.style.top = r.top + "px";
    div.style.width = r.width + "px";
    div.style.height = r.height + "px";
    div.style.borderRadius = radius;
    document.body.appendChild(div);
    overlays.push(div);
  });
  requestAnimationFrame(() => overlays.forEach((d) => d.classList.add("hotspot-pulse--in")));
  const hideT = setTimeout(() => {
    overlays.forEach((d) => d.classList.remove("hotspot-pulse--in"));
    setTimeout(() => overlays.forEach((d) => d.remove()), 220);
  }, 2000);
  return () => {
    clearTimeout(hideT);
    overlays.forEach((d) => d.remove());
    els.forEach((el) => el.classList.remove("hotspot-live"));
  };
}
const FRAME_IMG_W = 393, FRAME_IMG_H = 836;
const IMG_SCREEN_LEFT = 7, IMG_SCREEN_W = 380;
const FRAME_SCALE = PHONE_W / IMG_SCREEN_W;
const FRAME_W = FRAME_IMG_W * FRAME_SCALE;
const FRAME_H = FRAME_IMG_H * FRAME_SCALE;
const BEZEL = IMG_SCREEN_LEFT * FRAME_SCALE;
const TOOLBAR_H = 40;
const STACK_GAP = 12;
const FIT_MARGIN = 32;

// Scales the whole stage (toolbar + bezelled phone) to fit the viewport.
function useFitScale(width, height, margin = FIT_MARGIN) {
  const [s, setS] = React.useState(1);
  React.useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth - margin * 2;
      const vh = window.innerHeight - margin * 2;
      setS(Math.max(0.15, Math.min(vw / width, vh / height, 1.5)));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [width, height, margin]);
  return s;
}

function App() {
  const [stack, setStack] = React.useState(["home"]);
  const [flash, setFlash] = React.useState(0);
  const wrapRef = React.useRef(null);
  const current = stack[stack.length - 1];
  const contentW = FRAME_W;
  const contentH = FRAME_H + TOOLBAR_H + STACK_GAP;
  const fit = useFitScale(contentW, contentH);

  const go = React.useCallback((id) => {
    if (!SCREENS[id]) return;
    setStack((s) => (s[s.length - 1] === id ? s : [...s, id]));
    setFlash((f) => f + 1);
  }, []);
  const goReset = React.useCallback((id) => {
    if (!SCREENS[id]) return;
    setStack([id]);
    setFlash((f) => f + 1);
  }, []);
  const goBack = React.useCallback(() => {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
    setFlash((f) => f + 1);
  }, []);
  const restart = React.useCallback(() => {
    setStack(["splash"]);
    setFlash((f) => f + 1);
  }, []);

  // Pulse every tappable element that actually leads somewhere, whenever a
  // new screen opens.
  React.useEffect(() => {
    const t = setTimeout(() => pulseHotspots(wrapRef.current, current), 180);
    return () => clearTimeout(t);
  }, [current, flash]);

  const handleClick = React.useCallback((e) => {
    const root = wrapRef.current;
    const el = findClickable(e.target, root);

    if (!el) {
      if (ADVANCE_MAP[current]) go(ADVANCE_MAP[current]);
      return;
    }

    if (isNavigable(current, el)) flashHotspot(el);

    const aria = el.getAttribute?.("aria-label") || "";
    if (aria === "Back" || aria === "Close") { goBack(); return; }

    if (el.classList?.contains("bnav__item")) {
      const parent = el.parentElement;
      const idx = parent ? Array.from(parent.children).indexOf(el) : -1;
      const dest = TAB_SCREENS[idx];
      if (dest) goReset(dest);
      return;
    }

    const text = el.textContent || "";
    const dest = resolveDestination(current, el, text, aria);
    if (dest === "BACK") goBack();
    else if (dest) go(dest);
  }, [current, go, goReset, goBack]);

  const meta = SCREENS[current];

  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", overflow: "hidden" }}>
      <div style={{ width: contentW * fit, height: contentH * fit, position: "relative" }}>
        <div style={{
          width: contentW, height: contentH,
          transform: `scale(${fit})`, transformOrigin: "top left",
          display: "flex", flexDirection: "column", alignItems: "center", gap: STACK_GAP
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, font: "var(--t-sub-em)", fontSize: 13, color: "var(--fg-1)", height: TOOLBAR_H }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 999,
              background: "var(--bg-elevated)", boxShadow: "var(--sh-2)", border: "1px solid var(--bd-default)", fontWeight: 600
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ac-secondary)" }} />
              {meta ? meta.title : current}
            </span>
            <button
              onClick={restart}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 12px", borderRadius: 999,
                border: "1px solid var(--bd-default)", background: "var(--bg-elevated)", boxShadow: "var(--sh-2)", color: "var(--fg-1)",
                font: "var(--t-sub-em)", fontSize: 13, fontWeight: 600, cursor: "pointer"
              }}>
              <Icon name="arrow-counter-clockwise" size={15} />Restart
            </button>
            <button
              onClick={goBack}
              disabled={stack.length <= 1}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 12px", borderRadius: 999,
                border: stack.length <= 1 ? "1px solid var(--bd-default)" : "1px solid transparent",
                background: stack.length <= 1 ? "var(--bg-elevated)" : "var(--ac-secondary-soft)",
                color: stack.length <= 1 ? "var(--fg-4)" : "var(--ac-secondary)",
                boxShadow: "var(--sh-2)", font: "var(--t-sub-em)", fontSize: 13, fontWeight: 600,
                cursor: stack.length <= 1 ? "default" : "pointer"
              }}>
              <Icon name="arrow-left" size={15} />Back
            </button>
          </div>

          <div className="phone-shell" style={{ width: FRAME_W, height: FRAME_H, position: "relative", flexShrink: 0, borderRadius: 47, overflow: "hidden", background: "#999A9A", filter: "drop-shadow(0 30px 60px rgba(20,22,26,0.4)) drop-shadow(0 8px 20px rgba(20,22,26,0.25))" }}>
            <div
              ref={wrapRef}
              onClick={handleClick}
              style={{
                position: "absolute", left: BEZEL, top: BEZEL,
                width: PHONE_W, height: PHONE_H,
                borderRadius: 34, overflow: "hidden",
              }}>
              <div key={flash + ":" + current} className="proto-enter" style={{ width: "100%", height: "100%" }} data-screen={current}>
                {meta ? meta.render() : <div>Unknown screen: {current}</div>}
              </div>
            </div>
            <img src="assets/android-bezel-frame.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
          </div>
        </div>
      </div>

      <style>{`
        html, body { margin: 0; padding: 0; background: transparent; }
        @media (prefers-reduced-motion: no-preference) {
          .proto-enter { animation: protoEnter 260ms var(--ease-out, ease-out); }
        }
        @keyframes protoEnter {
          from { opacity: 0; transform: scale(0.985) translateY(6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .tap-hotspot {
          position: fixed; pointer-events: none; z-index: 2147483000;
          background: rgba(86,105,255,0.16);
          box-shadow: 0 0 0 1.5px rgba(86,105,255,0.55) inset;
          opacity: 0;
          transition: opacity 90ms ease-out;
        }
        .tap-hotspot--in { opacity: 1; }
        .hotspot-pulse {
          position: fixed; pointer-events: none; z-index: 2147482900;
          background: rgba(86,105,255,0.09);
          box-shadow: 0 0 0 1.5px rgba(86,105,255,0.4) inset;
          opacity: 0;
          transition: opacity 320ms ease-out;
        }
        .hotspot-pulse--in { opacity: 1; }
      `}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
