const HINTS = {
  desktop: '1280px — "4 recipes"',
  mobile: '375px — "<764px"',
};

const tabs = Array.from(document.querySelectorAll(".switcher-tabs button"));
const hint = document.getElementById("switcher-hint");

function show(view) {
  if (!HINTS[view]) return;

  tabs.forEach((tab) => {
    const isActive = tab.dataset.view === view;
    tab.setAttribute("aria-selected", String(isActive));

    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    panel.hidden = !isActive;
    panel.classList.toggle("is-active", isActive);
  });

  hint.textContent = HINTS[view];

  const url = new URL(window.location.href);
  url.searchParams.set("v", view);
  history.replaceState(null, "", url);

  window.scrollTo({ top: 0 });
}

tabs.forEach((tab) => tab.addEventListener("click", () => show(tab.dataset.view)));

document.addEventListener("keydown", (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.target.matches("input, textarea")) return;

  const key = event.key.toLowerCase();
  if (key === "d") show("desktop");
  if (key === "m") show("mobile");
});

show(new URL(window.location.href).searchParams.get("v") || "desktop");

/* ─────────── Players ───────────
   The Figma frame puts fullscreen / mute / captions in an overlay stack, so
   YouTube's own chrome is hidden (controls: 0) and those buttons drive the
   player through the IFrame API instead. Desktop and mobile each get their
   own player, since both are in the DOM at once. */

const VIDEO_ID = "NzDK4S4PCCk";
const VIDEO_TITLE = "Help, My C.S.A. Sent Me A Boatload of Chard";

function setUpPlayer(mountId, frameSelector) {
  const frame = document.querySelector(frameSelector);
  if (!frame || !document.getElementById(mountId)) return null;

  const buttons = new Map(
    Array.from(frame.querySelectorAll(".player-btn")).map((btn) => [btn.dataset.action, btn])
  );

  let yt = null;
  let captionsOn = false;

  const setPressed = (action, pressed) =>
    buttons.get(action)?.setAttribute("aria-pressed", String(pressed));

  buttons.get("fullscreen")?.addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      frame.requestFullscreen?.();
    }
  });

  buttons.get("mute")?.addEventListener("click", () => {
    if (!yt) return;

    const muted = yt.isMuted();
    if (muted) {
      yt.unMute();
    } else {
      yt.mute();
    }

    setPressed("mute", !muted);
    buttons.get("mute").setAttribute("aria-label", muted ? "Mute" : "Unmute");
  });

  buttons.get("cc")?.addEventListener("click", () => {
    if (!yt) return;

    captionsOn = !captionsOn;
    // Module name differs between the HTML5 and legacy players; call both.
    ["captions", "cc"].forEach((mod) => {
      if (captionsOn) {
        yt.loadModule(mod);
      } else {
        yt.unloadModule(mod);
      }
    });

    setPressed("cc", captionsOn);
  });

  return () => {
    yt = new YT.Player(mountId, {
      videoId: VIDEO_ID,
      width: "100%",
      height: "100%",
      playerVars: {
        start: 3,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
      },
      events: {
        onReady: () => {
          yt.getIframe().setAttribute("title", VIDEO_TITLE);
          setPressed("mute", yt.isMuted());
        },
      },
    });
  };
}

const mountPlayers = [
  setUpPlayer("d-player-embed", ".d-player"),
  setUpPlayer("m-player-embed", ".m-hero"),
].filter(Boolean);

window.onYouTubeIframeAPIReady = () => mountPlayers.forEach((mount) => mount());
