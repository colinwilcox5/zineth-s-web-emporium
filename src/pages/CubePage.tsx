import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * THE PAGE IS A CUBE — TimeCube-homage rant page.
 * Letters near the cursor vacate the prose and reassemble into a cube.
 * Two modes: rotating 3D wireframe / flat oblique ASCII cube.
 */

const CSS = `
  #cube-page {
    min-height: 100vh;
    background: #FFFEF8;
    font-family: "Times New Roman", Times, serif;
    cursor: crosshair;
  }
  #cube-page .cube-inner {
    max-width: 760px;
    margin: 0 auto;
    padding: 48px 20px 120px 20px;
    text-align: center;
  }
  #cube-page .r { margin: 34px 0; line-height: 1.35; }
  #cube-page .w { display: inline-block; white-space: nowrap; }
  #cube-page .ch {
    display: inline-block;
    position: relative;
    will-change: transform;
  }
  #cube-page .ch.active { z-index: 50; }

  #cube-page .fedblue { color: #3D5588; }
  #cube-page .skyblue { color: #4982CF; }
  #cube-page .green   { color: #00A95C; }
  #cube-page .pink    { color: #FF48B0; }
  #cube-page .red     { color: #FF4C65; }
  #cube-page .yellow  { color: #FFE800; text-shadow: 1px 1px 0 #3D5588; }

  #cube-page .t64 { font-size: 64px; font-weight: bold; }
  #cube-page .t40 { font-size: 40px; font-weight: bold; }
  #cube-page .t28 { font-size: 28px; font-weight: bold; }
  #cube-page .t22 { font-size: 22px; }
  #cube-page .t18 { font-size: 18px; }
  #cube-page .t14 { font-size: 14px; }

  #cube-page .misreg { text-shadow: 3px 2px 0 #FF48B0; }

  #cube-page hr {
    border: none;
    border-top: 3px double #3D5588;
    width: 60%;
    margin: 40px auto;
  }

  #cube-page .cube-counter {
    font-size: 13px;
    color: #3D5588;
    margin-top: 70px;
  }

  #cube-page .cube-mode-toggle {
    position: fixed;
    right: 12px;
    bottom: 12px;
    background: #FFFEF8;
    border: 2px outset #4982CF;
    color: #3D5588;
    font-family: "Times New Roman", Times, serif;
    font-size: 13px;
    font-weight: bold;
    padding: 6px 10px;
    cursor: pointer;
    z-index: 999;
  }
  #cube-page .cube-mode-toggle:active { border-style: inset; }

  #cube-page .cube-back {
    position: fixed;
    left: 12px;
    top: 12px;
    background: #FFFEF8;
    border: 2px outset #4982CF;
    color: #3D5588;
    font-family: "Times New Roman", Times, serif;
    font-size: 13px;
    font-weight: bold;
    padding: 6px 10px;
    cursor: pointer;
    z-index: 999;
  }
  #cube-page .cube-back:active { border-style: inset; }
`;

const RANT_HTML = `
  <div class="r t22 red"><b>WARNING: You were educated FLAT.</b></div>

  <div class="r t64 fedblue misreg">THE PAGE IS A CUBE</div>

  <div class="r t28 pink">FOUR SIMULTANEOUS LAYERS in ONE printed page.</div>

  <div class="r t22 fedblue">Yellow layer. Pink layer. Blue layer. Green layer. FOUR PASSES, ONE TRUTH. Your teachers told you the page has two sides. LIE OF THE CENTURY. A page has SIX FACES. You have only ever been shown ONE.</div>

  <hr>

  <div class="r t28 green">Single-pass printing is EVIL.</div>

  <div class="r t22 skyblue">The laser printer is a CYCLOPS. It sees one color because it has ONE EYE. I have studied the drum. I have studied the stencil. The stencil does not lie. Ink is TIME. Registration error is MEMORY.</div>

  <div class="r t22 fedblue">Academia will not debate me. The design schools teach the GRID because the grid is a CAGE with the corners FILED OFF. Ask your professor where the corners went. Watch the face. The face KNOWS.</div>

  <hr>

  <div class="r t40 red">WORD IS FLAT UNTIL OBSERVED.</div>

  <div class="r t22 fedblue">Hold your cursor against these words and WITNESS: language assumes its TRUE FORM. Every letter you have ever read was a cube FOLDED FLAT to fit your screen. I have unfolded nothing. I have merely STOPPED FOLDING.</div>

  <div class="r t28 pink">Z is not a letter. Z is a cube seen from the corner, FALLING.</div>

  <hr>

  <div class="r t22 green">I will award ONE (1) ZINE, hand-registered, four layers, corners intact, to any professor, priest, or brand strategist who can disprove the Cubic Page. None have collected. None will collect. The offer STANDS like a cube stands: on ALL SIX FACES AT ONCE.</div>

  <div class="r t28 fedblue">BEWARE of FAKE flat sites claiming cubic knowledge.</div>

  <div class="r t22 skyblue">There is ONE Omnibus. The door was always open. You walked past it. The octopus watched you walk past it. The octopus KNOWS.</div>

  <hr>

  <div class="r t18 fedblue">This page renders correctly at 640 &times; 480 and NOWHERE ELSE. If the words are moving it is because you are FINALLY LOOKING AT THEM.</div>

  <div class="r t14 green">Ink is time. Registration error is memory. The corners were never filed off, only HIDDEN.</div>

  <div class="cube-counter">You are visitor 0000004 to the true page. &copy; whenever.</div>
`;

/* ---- config ---- */
const RADIUS = 150;
const RELEASE = 195;
const LERP_GO = 0.16;
const LERP_BACK = 0.12;
const CUBE_SIZE_3D = 105;
const FOV = 420;

interface CharState {
  el: HTMLElement;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  s: number;
  slot: number;
  active: boolean;
}

const CubePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const mode3dRef = useRef(true);
  const resetRef = useRef<() => void>(() => {});
  const [modeLabel, setModeLabel] = useState("ROTATING");

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    let cancelled = false;
    let raf = 0;
    let chars: CharState[] = [];
    let freeSlots: number[] = [];

    /* ---- cube slot geometry ---- */
    const v = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
    ];
    const pairs = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];
    const PER_EDGE = 8;
    const SLOTS_3D: number[][] = [];
    pairs.forEach(([a, b]) => {
      for (let i = 0; i < PER_EDGE; i++) {
        const t = (i + 0.5) / PER_EDGE;
        SLOTS_3D.push([
          v[a][0] + (v[b][0] - v[a][0]) * t,
          v[a][1] + (v[b][1] - v[a][1]) * t,
          v[a][2] + (v[b][2] - v[a][2]) * t,
        ]);
      }
    });
    const SLOTS_FLAT = SLOTS_3D.map((p) => {
      const s = 62, d = 34;
      return [p[0] * s + p[2] * d, p[1] * s - p[2] * d];
    });

    const mouse = { x: -9999, y: -9999, in: false };

    /* ---- per-glyph spans ---- */
    const wrapNode = (node: Node) => {
      const kids = Array.prototype.slice.call(node.childNodes) as Node[];
      kids.forEach((kid) => {
        if (kid.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          const words = (kid.textContent || "").split(/(\s+)/);
          words.forEach((word) => {
            if (word.length === 0) return;
            if (/^\s+$/.test(word)) {
              frag.appendChild(document.createTextNode(" "));
              return;
            }
            const w = document.createElement("span");
            w.className = "w";
            for (let i = 0; i < word.length; i++) {
              const c = document.createElement("span");
              c.className = "ch";
              c.textContent = word[i];
              w.appendChild(c);
            }
            frag.appendChild(w);
          });
          node.replaceChild(frag, kid);
        } else if (kid.nodeType === Node.ELEMENT_NODE) {
          wrapNode(kid);
        }
      });
    };

    const measure = () => {
      chars = [];
      const els = root.querySelectorAll<HTMLElement>(".ch");
      const sx = window.scrollX, sy = window.scrollY;
      els.forEach((el) => {
        el.style.transform = "";
        const r = el.getBoundingClientRect();
        chars.push({
          el,
          homeX: r.left + r.width / 2 + sx,
          homeY: r.top + r.height / 2 + sy,
          x: 0, y: 0, s: 1,
          slot: -1,
          active: false,
        });
      });
    };

    const release = (c: CharState) => {
      if (c.slot >= 0) freeSlots.push(c.slot);
      c.slot = -1;
      c.active = false;
      c.el.classList.remove("active");
    };

    const resetSlots = () => {
      freeSlots = [];
      for (let i = SLOTS_3D.length - 1; i >= 0; i--) freeSlots.push(i);
      chars.forEach((c) => {
        c.slot = -1;
        c.active = false;
        c.el.classList.remove("active");
      });
    };
    resetRef.current = resetSlots;

    const project3d = (p: number[], time: number) => {
      const ry = time * 0.0009;
      const rx = 0.45 + Math.sin(time * 0.0004) * 0.25;
      const cy = Math.cos(ry), sy2 = Math.sin(ry);
      const x = p[0] * cy + p[2] * sy2;
      let z = -p[0] * sy2 + p[2] * cy;
      const cx = Math.cos(rx), sx2 = Math.sin(rx);
      const y = p[1] * cx - z * sx2;
      z = p[1] * sx2 + z * cx;
      const scale = FOV / (FOV + z * CUBE_SIZE_3D);
      return {
        x: x * CUBE_SIZE_3D * scale,
        y: y * CUBE_SIZE_3D * scale,
        s: 0.7 + scale * 0.5,
      };
    };

    const frame = (time: number) => {
      if (cancelled) return;
      const mx = mouse.x, my = mouse.y;

      if (mouse.in) {
        for (let i = 0; i < chars.length; i++) {
          const c = chars[i];
          const dx = c.homeX - mx, dy = c.homeY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (!c.active && dist < RADIUS && freeSlots.length > 0) {
            c.slot = freeSlots.pop() as number;
            c.active = true;
            c.el.classList.add("active");
          } else if (c.active && dist > RELEASE) {
            release(c);
          }
        }
      } else {
        for (let j = 0; j < chars.length; j++) {
          if (chars[j].active) release(chars[j]);
        }
      }

      for (let k = 0; k < chars.length; k++) {
        const ch = chars[k];
        let tx: number, ty: number, ts: number;
        if (ch.active) {
          if (mode3dRef.current) {
            const pr = project3d(SLOTS_3D[ch.slot], time);
            tx = mx + pr.x - ch.homeX;
            ty = my + pr.y - ch.homeY;
            ts = pr.s;
          } else {
            const fp = SLOTS_FLAT[ch.slot];
            tx = mx + fp[0] - ch.homeX;
            ty = my + fp[1] - ch.homeY;
            ts = 1;
          }
          ch.x += (tx - ch.x) * LERP_GO;
          ch.y += (ty - ch.y) * LERP_GO;
          ch.s += (ts - ch.s) * LERP_GO;
        } else {
          ch.x += (0 - ch.x) * LERP_BACK;
          ch.y += (0 - ch.y) * LERP_BACK;
          ch.s += (1 - ch.s) * LERP_BACK;
          if (Math.abs(ch.x) < 0.15 && Math.abs(ch.y) < 0.15) {
            if (ch.el.style.transform !== "") ch.el.style.transform = "";
            continue;
          }
        }
        ch.el.style.transform =
          "translate(" + ch.x.toFixed(1) + "px," + ch.y.toFixed(1) + "px)" +
          " scale(" + ch.s.toFixed(2) + ")";
      }

      raf = requestAnimationFrame(frame);
    };

    /* ---- events ---- */
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX + window.scrollX;
      mouse.y = e.clientY + window.scrollY;
      mouse.in = true;
    };
    const onMouseLeave = () => { mouse.in = false; };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX + window.scrollX;
        mouse.y = e.touches[0].clientY + window.scrollY;
        mouse.in = true;
      }
    };
    const onTouchEnd = () => { mouse.in = false; };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resetSlots();
        measure();
        resetSlots();
      }, 150);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("touchstart", onTouch, { passive: true });
    document.addEventListener("touchmove", onTouch, { passive: true });
    document.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);

    /* ---- boot ---- */
    const boot = () => {
      if (cancelled) return;
      root.querySelectorAll(".r").forEach((block) => wrapNode(block));
      measure();
      resetSlots();
      raf = requestAnimationFrame(frame);
    };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => setTimeout(boot, 50));
    } else {
      setTimeout(boot, 200);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("touchstart", onTouch);
      document.removeEventListener("touchmove", onTouch);
      document.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const toggleMode = () => {
    mode3dRef.current = !mode3dRef.current;
    setModeLabel(mode3dRef.current ? "ROTATING" : "FLAT");
    resetRef.current();
  };

  return (
    <div id="cube-page">
      <style>{CSS}</style>
      <button
        className="cube-back"
        onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
        data-interactive="true"
      >
        ← BACK TO ZINETH
      </button>
      <div
        ref={containerRef}
        className="cube-inner"
        dangerouslySetInnerHTML={{ __html: RANT_HTML }}
      />
      <button className="cube-mode-toggle" onClick={toggleMode} data-interactive="true">
        CUBE MODE: {modeLabel}
      </button>
    </div>
  );
};

export default CubePage;
