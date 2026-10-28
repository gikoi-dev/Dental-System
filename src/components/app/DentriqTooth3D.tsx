import { useId } from "react";

export function DentriqTooth3D() {
  const id = useId().replace(/:/g, "");
  const gradientId = `${id}-enamel`;
  const highlightId = `${id}-highlight`;
  const shadowId = `${id}-shadow`;
  const glowId = `${id}-glow`;
  const clipId = `${id}-clip`;

  return (
    <div className="dentriq-tooth-scene" role="img" aria-label="Floating realistic 3D tooth">
      <style>{`
        .dentriq-tooth-scene {
          position: relative;
          width: min(100%, 34rem);
          aspect-ratio: 1 / 1;
          animation: dentriq-tooth-float 7s ease-in-out infinite;
        }
        .dentriq-tooth-svg {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          overflow: visible;
          animation: dentriq-tooth-turn 16s ease-in-out infinite;
          transform-origin: 50% 52%;
        }
        .dentriq-tooth-halo {
          position: absolute;
          inset: 20%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(115, 255, 221, .3), rgba(35, 174, 145, .1) 42%, transparent 72%);
          filter: blur(18px);
          animation: dentriq-tooth-breathe 5s ease-in-out infinite;
        }
        .dentriq-tooth-particle {
          position: absolute;
          z-index: 3;
          width: .35rem;
          height: .35rem;
          border-radius: 999px;
          background: #b8ffed;
          box-shadow: 0 0 14px 4px rgba(116, 255, 220, .65);
          animation: dentriq-particle-drift 6s ease-in-out infinite;
        }
        .dentriq-tooth-particle:nth-child(2) { top: 22%; left: 13%; animation-delay: -2s; transform: scale(.65); }
        .dentriq-tooth-particle:nth-child(3) { top: 30%; right: 12%; animation-delay: -4s; transform: scale(.8); }
        .dentriq-tooth-particle:nth-child(4) { bottom: 21%; left: 18%; animation-delay: -1s; transform: scale(.5); }
        .dentriq-tooth-particle:nth-child(5) { right: 19%; bottom: 27%; animation-delay: -3s; transform: scale(.7); }
        @keyframes dentriq-tooth-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes dentriq-tooth-turn {
          0%, 100% { transform: rotate(-2deg) scale(1); }
          50% { transform: rotate(2deg) scale(1.015); }
        }
        @keyframes dentriq-tooth-breathe {
          0%, 100% { opacity: .62; transform: scale(.92); }
          50% { opacity: .95; transform: scale(1.08); }
        }
        @keyframes dentriq-particle-drift {
          0%, 100% { opacity: .25; translate: 0 8px; }
          50% { opacity: 1; translate: 0 -10px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dentriq-tooth-scene,
          .dentriq-tooth-svg,
          .dentriq-tooth-halo,
          .dentriq-tooth-particle { animation: none; }
        }
      `}</style>
      <div className="dentriq-tooth-halo" aria-hidden="true" />
      <span className="dentriq-tooth-particle" aria-hidden="true" />
      <span className="dentriq-tooth-particle" aria-hidden="true" />
      <span className="dentriq-tooth-particle" aria-hidden="true" />
      <span className="dentriq-tooth-particle" aria-hidden="true" />
      <svg className="dentriq-tooth-svg" viewBox="0 0 320 360" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="18%" y1="4%" x2="84%" y2="96%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset=".3" stopColor="#f0fff9" />
            <stop offset=".62" stopColor="#b9f8e8" />
            <stop offset=".84" stopColor="#66cdb6" />
            <stop offset="1" stopColor="#277c70" />
          </linearGradient>
          <radialGradient id={highlightId} cx="32%" cy="20%" r="68%">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".92" />
            <stop offset=".45" stopColor="#dffff6" stopOpacity=".3" />
            <stop offset="1" stopColor="#dffff6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={shadowId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c3fff0" stopOpacity=".7" />
            <stop offset="1" stopColor="#0b4c43" stopOpacity=".85" />
          </linearGradient>
          <filter id={glowId} x="-35%" y="-30%" width="170%" height="175%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id={clipId}>
            <path d="M160 42C132 39 119 60 98 65C78 70 58 51 42 68C22 89 32 125 44 153C56 182 72 198 74 230C76 261 68 294 82 322C91 341 105 344 116 329L142 293L160 354L178 293L204 329C215 344 229 341 238 322C252 294 244 261 246 230C248 198 264 182 276 153C288 125 298 89 278 68C262 51 242 70 222 65C201 60 188 39 160 42Z" />
          </clipPath>
        </defs>
        <ellipse
          cx="160"
          cy="190"
          rx="111"
          ry="135"
          fill="#76f4d2"
          opacity=".17"
          filter={`url(#${glowId})`}
        />
        <path
          d="M160 42C132 39 119 60 98 65C78 70 58 51 42 68C22 89 32 125 44 153C56 182 72 198 74 230C76 261 68 294 82 322C91 341 105 344 116 329L142 293L160 354L178 293L204 329C215 344 229 341 238 322C252 294 244 261 246 230C248 198 264 182 276 153C288 125 298 89 278 68C262 51 242 70 222 65C201 60 188 39 160 42Z"
          fill={`url(#${gradientId})`}
          stroke="#dffff7"
          strokeWidth="3"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
        />
        <g clipPath={`url(#${clipId})`}>
          <ellipse cx="116" cy="100" rx="92" ry="74" fill={`url(#${highlightId})`} />
          <path
            d="M48 105C86 135 118 137 160 113C202 137 234 135 272 105"
            fill="none"
            stroke="#ffffff"
            strokeOpacity=".66"
            strokeWidth="5"
          />
          <path
            d="M73 174C104 190 132 190 160 175C188 190 216 190 247 174"
            fill="none"
            stroke="#2a8f7e"
            strokeOpacity=".46"
            strokeWidth="7"
          />
          <path
            d="M112 77C128 98 137 119 139 152C141 180 133 207 123 226"
            fill="none"
            stroke="#ffffff"
            strokeOpacity=".55"
            strokeWidth="13"
            strokeLinecap="round"
          />
          <path
            d="M208 82C193 111 186 143 188 177C190 203 198 226 205 244"
            fill="none"
            stroke={`url(#${shadowId})`}
            strokeOpacity=".6"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M138 214L160 337L182 214"
            fill="none"
            stroke="#eafff9"
            strokeOpacity=".52"
            strokeWidth="4"
          />
        </g>
      </svg>
    </div>
  );
}
