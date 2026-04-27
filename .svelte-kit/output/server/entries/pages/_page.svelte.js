import { a1 as fallback, e as escape_html, a2 as bind_props, a3 as sanitize_props, a4 as rest_props, a5 as attributes, a6 as clsx, a7 as ensure_array_like, a8 as element, s as slot, a9 as spread_props, aa as attr, ab as attr_class, ac as head } from "../../chunks/renderer.js";
function Hero($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let guestName = fallback($$props["guestName"], "Honored Guest");
    let opened = fallback($$props["opened"], false);
    $$renderer2.push(`<section class="relative isolate flex min-h-screen items-center overflow-hidden px-4 py-6"><div class="absolute inset-0 bg-cover bg-center" style="background-image: linear-gradient(180deg, rgba(63, 46, 46, 0.34), rgba(63, 46, 46, 0.76)), url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&amp;fit=crop&amp;w=1800&amp;q=80');"></div> <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),transparent_30%),linear-gradient(135deg,rgba(212,175,55,0.1),transparent_35%)]"></div> <div class="section-shell relative z-10 flex min-h-screen items-center py-12"><div class="mx-auto max-w-3xl text-center text-cream"><p data-hero-item="" class="eyebrow border-white/20 bg-white/10 text-gold">The Wedding Of</p> <p data-hero-item="" class="mb-5 text-sm tracking-[0.3em] text-cream/80">Dear ${escape_html(guestName)}</p> <h1 data-hero-item="" class="font-display text-5xl font-semibold leading-[0.92] md:text-7xl">Aruna <span class="text-gold">&amp;</span> Bima</h1> <p data-hero-item="" class="mx-auto mt-6 max-w-2xl text-sm leading-8 text-cream/80 md:text-base">A romantic celebration wrapped in warm heritage, delicate florals, and the timeless grace of Javanese tradition.</p> <div data-hero-item="" class="mt-8 inline-flex flex-col items-center gap-4 sm:flex-row"><button class="rounded-full bg-gold-gradient px-7 py-4 font-medium text-bark shadow-glow transition duration-300 hover:-translate-y-1">Open Invitation</button> <a class="rounded-full border border-white/25 bg-white/10 px-7 py-4 font-medium text-cream backdrop-blur transition duration-300 hover:-translate-y-1" href="#details">View Event</a></div></div></div> `);
    if (!opened) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="pointer-events-none absolute bottom-8 left-1/2 z-10 h-14 w-8 -translate-x-1/2 rounded-full border border-white/30"><div class="mx-auto mt-3 h-2 w-2 animate-bounce rounded-full bg-cream"></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></section>`);
    bind_props($$props, { guestName, opened });
  });
}
function LoadingScreen($$renderer, $$props) {
  let visible = fallback($$props["visible"], true);
  if (visible) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div class="fixed inset-0 z-[120] grid place-items-center bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.2),transparent_30%),linear-gradient(180deg,#3F2E2E,#1f1616)]"><div class="text-center"><div class="mx-auto mb-5 grid h-24 w-24 place-items-center rounded-full border border-gold/35"><div class="h-16 w-16 animate-spin rounded-full border border-dashed border-gold/55"></div></div> <p class="font-display text-3xl text-cream">Preparing Your Invitation</p> <p class="mt-3 text-xs uppercase tracking-[0.45em] text-cream/70">Gracefully unfolding</p></div></div>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]-->`);
  bind_props($$props, { visible });
}
/**
 * @license lucide-svelte v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Icon($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode"
  ]);
  $$renderer.component(($$renderer2) => {
    let name = fallback($$props["name"], void 0);
    let color = fallback($$props["color"], "currentColor");
    let size = fallback($$props["size"], 24);
    let strokeWidth = fallback($$props["strokeWidth"], 2);
    let absoluteStrokeWidth = fallback($$props["absoluteStrokeWidth"], false);
    let iconNode = fallback($$props["iconNode"], () => [], true);
    const mergeClasses = (...classes) => classes.filter((className, index, array) => {
      return Boolean(className) && array.indexOf(className) === index;
    }).join(" ");
    $$renderer2.push(`<svg${attributes(
      {
        ...defaultAttributes,
        ...$$restProps,
        width: size,
        height: size,
        stroke: color,
        "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        class: clsx(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$sanitized_props.class))
      },
      void 0,
      void 0,
      void 0,
      3
    )}><!--[-->`);
    const each_array = ensure_array_like(iconNode);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [tag, attrs] = each_array[$$index];
      element($$renderer2, tag, () => {
        $$renderer2.push(`${attributes({ ...attrs }, void 0, void 0, void 0, 3)}`);
      });
    }
    $$renderer2.push(`<!--]--><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></svg>`);
    bind_props($$props, {
      name,
      color,
      size,
      strokeWidth,
      absoluteStrokeWidth,
      iconNode
    });
  });
}
function Calendar_days($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M8 2v4" }],
    ["path", { "d": "M16 2v4" }],
    [
      "rect",
      { "width": "18", "height": "18", "x": "3", "y": "4", "rx": "2" }
    ],
    ["path", { "d": "M3 10h18" }],
    ["path", { "d": "M8 14h.01" }],
    ["path", { "d": "M12 14h.01" }],
    ["path", { "d": "M16 14h.01" }],
    ["path", { "d": "M8 18h.01" }],
    ["path", { "d": "M12 18h.01" }],
    ["path", { "d": "M16 18h.01" }]
  ];
  Icon($$renderer, spread_props([
    { name: "calendar-days" },
    $$sanitized_props,
    {
      /**
       * @component @name CalendarDays
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOCAydjQiIC8+CiAgPHBhdGggZD0iTTE2IDJ2NCIgLz4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjQiIHJ4PSIyIiAvPgogIDxwYXRoIGQ9Ik0zIDEwaDE4IiAvPgogIDxwYXRoIGQ9Ik04IDE0aC4wMSIgLz4KICA8cGF0aCBkPSJNMTIgMTRoLjAxIiAvPgogIDxwYXRoIGQ9Ik0xNiAxNGguMDEiIC8+CiAgPHBhdGggZD0iTTggMThoLjAxIiAvPgogIDxwYXRoIGQ9Ik0xMiAxOGguMDEiIC8+CiAgPHBhdGggZD0iTTE2IDE4aC4wMSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/calendar-days
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Calendar_plus($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M8 2v4" }],
    ["path", { "d": "M16 2v4" }],
    [
      "path",
      {
        "d": "M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"
      }
    ],
    ["path", { "d": "M3 10h18" }],
    ["path", { "d": "M16 19h6" }],
    ["path", { "d": "M19 16v6" }]
  ];
  Icon($$renderer, spread_props([
    { name: "calendar-plus" },
    $$sanitized_props,
    {
      /**
       * @component @name CalendarPlus
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOCAydjQiIC8+CiAgPHBhdGggZD0iTTE2IDJ2NCIgLz4KICA8cGF0aCBkPSJNMjEgMTNWNmEyIDIgMCAwIDAtMi0ySDVhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDgiIC8+CiAgPHBhdGggZD0iTTMgMTBoMTgiIC8+CiAgPHBhdGggZD0iTTE2IDE5aDYiIC8+CiAgPHBhdGggZD0iTTE5IDE2djYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/calendar-plus
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Clock_3($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["polyline", { "points": "12 6 12 12 16.5 12" }]
  ];
  Icon($$renderer, spread_props([
    { name: "clock-3" },
    $$sanitized_props,
    {
      /**
       * @component @name Clock3
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cG9seWxpbmUgcG9pbnRzPSIxMiA2IDEyIDEyIDE2LjUgMTIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/clock-3
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Map_pin($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      }
    ],
    ["circle", { "cx": "12", "cy": "10", "r": "3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "map-pin" },
    $$sanitized_props,
    {
      /**
       * @component @name MapPin
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgMTBjMCA0Ljk5My01LjUzOSAxMC4xOTMtNy4zOTkgMTEuNzk5YTEgMSAwIDAgMS0xLjIwMiAwQzkuNTM5IDIwLjE5MyA0IDE0Ljk5MyA0IDEwYTggOCAwIDAgMSAxNiAwIiAvPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/map-pin
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Moon_star($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" }],
    ["path", { "d": "M20 3v4" }],
    ["path", { "d": "M22 5h-4" }]
  ];
  Icon($$renderer, spread_props([
    { name: "moon-star" },
    $$sanitized_props,
    {
      /**
       * @component @name MoonStar
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgM2E2IDYgMCAwIDAgOSA5IDkgOSAwIDEgMS05LTkiIC8+CiAgPHBhdGggZD0iTTIwIDN2NCIgLz4KICA8cGF0aCBkPSJNMjIgNWgtNCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/moon-star
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Pause($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "rect",
      { "x": "14", "y": "4", "width": "4", "height": "16", "rx": "1" }
    ],
    [
      "rect",
      { "x": "6", "y": "4", "width": "4", "height": "16", "rx": "1" }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "pause" },
    $$sanitized_props,
    {
      /**
       * @component @name Pause
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB4PSIxNCIgeT0iNCIgd2lkdGg9IjQiIGhlaWdodD0iMTYiIHJ4PSIxIiAvPgogIDxyZWN0IHg9IjYiIHk9IjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjE2IiByeD0iMSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/pause
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Play($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [["polygon", { "points": "6 3 20 12 6 21 6 3" }]];
  Icon($$renderer, spread_props([
    { name: "play" },
    $$sanitized_props,
    {
      /**
       * @component @name Play
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cG9seWdvbiBwb2ludHM9IjYgMyAyMCAxMiA2IDIxIDYgMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/play
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Send_horizontal($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"
      }
    ],
    ["path", { "d": "M6 12h16" }]
  ];
  Icon($$renderer, spread_props([
    { name: "send-horizontal" },
    $$sanitized_props,
    {
      /**
       * @component @name SendHorizontal
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMy43MTQgMy4wNDhhLjQ5OC40OTggMCAwIDAtLjY4My42MjdsMi44NDMgNy42MjdhMiAyIDAgMCAxIDAgMS4zOTZsLTIuODQyIDcuNjI3YS40OTguNDk4IDAgMCAwIC42ODIuNjI3bDE4LTguNWEuNS41IDAgMCAwIDAtLjkwNHoiIC8+CiAgPHBhdGggZD0iTTYgMTJoMTYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/send-horizontal
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Sparkles($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
      }
    ],
    ["path", { "d": "M20 3v4" }],
    ["path", { "d": "M22 5h-4" }],
    ["path", { "d": "M4 17v2" }],
    ["path", { "d": "M5 18H3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "sparkles" },
    $$sanitized_props,
    {
      /**
       * @component @name Sparkles
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOS45MzcgMTUuNUEyIDIgMCAwIDAgOC41IDE0LjA2M2wtNi4xMzUtMS41ODJhLjUuNSAwIDAgMSAwLS45NjJMOC41IDkuOTM2QTIgMiAwIDAgMCA5LjkzNyA4LjVsMS41ODItNi4xMzVhLjUuNSAwIDAgMSAuOTYzIDBMMTQuMDYzIDguNUEyIDIgMCAwIDAgMTUuNSA5LjkzN2w2LjEzNSAxLjU4MWEuNS41IDAgMCAxIDAgLjk2NEwxNS41IDE0LjA2M2EyIDIgMCAwIDAtMS40MzcgMS40MzdsLTEuNTgyIDYuMTM1YS41LjUgMCAwIDEtLjk2MyAweiIgLz4KICA8cGF0aCBkPSJNMjAgM3Y0IiAvPgogIDxwYXRoIGQ9Ik0yMiA1aC00IiAvPgogIDxwYXRoIGQ9Ik00IDE3djIiIC8+CiAgPHBhdGggZD0iTTUgMThIMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/sparkles
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Sun_medium($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "4" }],
    ["path", { "d": "M12 3v1" }],
    ["path", { "d": "M12 20v1" }],
    ["path", { "d": "M3 12h1" }],
    ["path", { "d": "M20 12h1" }],
    ["path", { "d": "m18.364 5.636-.707.707" }],
    ["path", { "d": "m6.343 17.657-.707.707" }],
    ["path", { "d": "m5.636 5.636.707.707" }],
    ["path", { "d": "m17.657 17.657.707.707" }]
  ];
  Icon($$renderer, spread_props([
    { name: "sun-medium" },
    $$sanitized_props,
    {
      /**
       * @component @name SunMedium
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiAvPgogIDxwYXRoIGQ9Ik0xMiAzdjEiIC8+CiAgPHBhdGggZD0iTTEyIDIwdjEiIC8+CiAgPHBhdGggZD0iTTMgMTJoMSIgLz4KICA8cGF0aCBkPSJNMjAgMTJoMSIgLz4KICA8cGF0aCBkPSJtMTguMzY0IDUuNjM2LS43MDcuNzA3IiAvPgogIDxwYXRoIGQ9Im02LjM0MyAxNy42NTctLjcwNy43MDciIC8+CiAgPHBhdGggZD0ibTUuNjM2IDUuNjM2LjcwNy43MDciIC8+CiAgPHBhdGggZD0ibTE3LjY1NyAxNy42NTcuNzA3LjcwNyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/sun-medium
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Volume_2($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
      }
    ],
    ["path", { "d": "M16 9a5 5 0 0 1 0 6" }],
    ["path", { "d": "M19.364 18.364a9 9 0 0 0 0-12.728" }]
  ];
  Icon($$renderer, spread_props([
    { name: "volume-2" },
    $$sanitized_props,
    {
      /**
       * @component @name Volume2
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTEgNC43MDJhLjcwNS43MDUgMCAwIDAtMS4yMDMtLjQ5OEw2LjQxMyA3LjU4N0ExLjQgMS40IDAgMCAxIDUuNDE2IDhIM2ExIDEgMCAwIDAtMSAxdjZhMSAxIDAgMCAwIDEgMWgyLjQxNmExLjQgMS40IDAgMCAxIC45OTcuNDEzbDMuMzgzIDMuMzg0QS43MDUuNzA1IDAgMCAwIDExIDE5LjI5OHoiIC8+CiAgPHBhdGggZD0iTTE2IDlhNSA1IDAgMCAxIDAgNiIgLz4KICA8cGF0aCBkPSJNMTkuMzY0IDE4LjM2NGE5IDkgMCAwIDAgMC0xMi43MjgiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/volume-2
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function ThemeToggle($$renderer, $$props) {
  let darkMode = fallback($$props["darkMode"], false);
  let onToggle = fallback($$props["onToggle"], () => {
  });
  $$renderer.push(`<button class="fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/70 px-4 py-3 text-sm font-medium text-cocoa shadow-glow backdrop-blur transition duration-300 hover:-translate-y-1 dark:bg-white/10 dark:text-cream">`);
  if (darkMode) {
    $$renderer.push("<!--[0-->");
    Moon_star($$renderer, { size: 16 });
    $$renderer.push(`<!----> <span>Dark</span>`);
  } else {
    $$renderer.push("<!--[-1-->");
    Sun_medium($$renderer, { size: 16 });
    $$renderer.push(`<!----> <span>Light</span>`);
  }
  $$renderer.push(`<!--]--></button>`);
  bind_props($$props, { darkMode, onToggle });
}
function MusicPlayer($$renderer, $$props) {
  let playing = fallback($$props["playing"], false);
  let onToggle = fallback($$props["onToggle"], () => {
  });
  $$renderer.push(`<button class="fixed bottom-4 right-4 z-50 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-white/70 px-4 py-3 text-sm font-medium text-cocoa shadow-glow backdrop-blur transition duration-300 hover:-translate-y-1 dark:bg-white/10 dark:text-cream"${attr("aria-pressed", playing)}><span class="grid h-9 w-9 place-items-center rounded-full bg-gold text-bark">`);
  if (playing) {
    $$renderer.push("<!--[0-->");
    Pause($$renderer, { size: 18 });
  } else {
    $$renderer.push("<!--[-1-->");
    Play($$renderer, { size: 18 });
  }
  $$renderer.push(`<!--]--></span> <span>${escape_html(playing ? "Pause Music" : "Play Music")}</span> `);
  Volume_2($$renderer, { size: 16, class: playing ? "animate-pulseSoft" : "" });
  $$renderer.push(`<!----></button>`);
  bind_props($$props, { playing, onToggle });
}
function SectionHeading($$renderer, $$props) {
  let eyebrow = fallback($$props["eyebrow"], "");
  let title = fallback($$props["title"], "");
  let description = fallback($$props["description"], "");
  $$renderer.push(`<div class="mx-auto mb-12 max-w-3xl text-center"><p class="eyebrow">${escape_html(eyebrow)}</p> <h2 class="section-title">${escape_html(title)}</h2> `);
  if (description) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<p class="mt-4 text-sm leading-8 text-cocoa/75 dark:text-cream/75 md:text-base">${escape_html(description)}</p>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div>`);
  bind_props($$props, { eyebrow, title, description });
}
const westlifeMusic = "/_app/immutable/assets/YTDown_YouTube_I-Wanna-Grow-Old-With-You-Westlife_Media_0LHmevWVvpc_008_128k.DaBmp59u.mp3";
const couple = {
  bride: {
    name: "Aruna Maharani",
    role: "The Bride",
    description: "The beloved daughter of Mr. Hadi Santoso and Mrs. Ratih Kusuma, carrying warmth, gentleness, and a love for heritage.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80"
  },
  groom: {
    name: "Bima Adiwangsa",
    role: "The Groom",
    description: "The beloved son of Mr. Surya Adiputra and Mrs. Sekar Ayu, known for his calm heart, quiet humor, and thoughtful spirit.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80"
  }
};
const events = [
  {
    title: "Akad Nikah",
    time: "08:00 WIB",
    date: "Saturday, 14 February 2027",
    location: "Pendopo Agung Larasati, Yogyakarta",
    note: "A sacred ceremony with intimate family blessings and traditional Javanese touches."
  },
  {
    title: "Wedding Reception",
    time: "11:00 WIB - 14:00 WIB",
    date: "Saturday, 14 February 2027",
    location: "Pendopo Agung Larasati, Yogyakarta",
    note: "An elegant celebration of love, music, and togetherness."
  }
];
const timeline = [
  {
    year: "2021",
    title: "First Meeting",
    description: "We met at a cultural festival in Yogyakarta, drawn to the same colors, stories, and quiet sense of wonder."
  },
  {
    year: "2023",
    title: "Growing Together",
    description: "What began as long conversations turned into a home built on trust, tenderness, and shared dreams."
  },
  {
    year: "2026",
    title: "The Proposal",
    description: "Under a soft golden evening sky, surrounded by batik lanterns and flowers, we said yes to forever."
  }
];
const gallery = [
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    alt: "Couple smiling under warm light"
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    alt: "Hands with rings and floral details"
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    alt: "Elegant couple portrait outdoors"
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    alt: "Reception table styling and candles"
  },
  {
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    alt: "Couple walking hand in hand"
  }
];
const initialWishes = [
  {
    name: "Nadya",
    attendance: "Attending",
    message: "May your home be filled with patience, joy, and endless blessings.",
    timestamp: "Today"
  },
  {
    name: "Rizky",
    attendance: "Maybe",
    message: "Wishing you both a gentle life together, wrapped in laughter and grace.",
    timestamp: "Today"
  }
];
const musicSrc = westlifeMusic;
function CoupleSection($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<section id="couple" class="section-shell"><div class="ornament-ring left-0 top-20 hidden md:block"></div> <div class="ornament-ring bottom-16 right-0 hidden md:block"></div> `);
    SectionHeading($$renderer2, {
      eyebrow: "Bride & Groom",
      title: "Two hearts becoming one graceful story",
      description: "Honoring family, tradition, and a love that feels soft, sincere, and enduring."
    });
    $$renderer2.push(`<!----> <div class="grid gap-5 md:grid-cols-[1fr_0.75fr_1fr]"><!--[-->`);
    const each_array = ensure_array_like([couple.bride, couple.groom]);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let person = each_array[index];
      $$renderer2.push(`<article class="group glass-card overflow-hidden p-4"><div class="overflow-hidden rounded-[1.6rem]"><img class="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"${attr("src", person.image)}${attr("alt", person.name)} loading="lazy"/></div> <div class="p-3 text-center"><p class="mt-3 text-xs uppercase tracking-[0.35em] text-gold">${escape_html(person.role)}</p> <h3 class="mt-3 font-display text-3xl text-cocoa dark:text-cream">${escape_html(person.name)}</h3> <p class="mt-3 text-sm leading-7 text-cocoa/75 dark:text-cream/75">${escape_html(person.description)}</p></div></article> `);
      if (index === 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="glass-card grid place-items-center px-6 py-10 text-center"><div class="space-y-5"><div class="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold/25 bg-gold/10 text-2xl font-display text-gold">A | B</div> <p class="text-sm leading-8 text-cocoa/75 dark:text-cream/75">With the warmth of family blessings and the beauty of ancestral traditions, we invite you to witness a day full of tenderness and joy.</p></div></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
  });
}
function CountdownSection($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let remaining = { days: "00", hours: "00", minutes: "00", seconds: "00" };
    const items = [
      { key: "days", label: "Days" },
      { key: "hours", label: "Hours" },
      { key: "minutes", label: "Minutes" },
      { key: "seconds", label: "Seconds" }
    ];
    $$renderer2.push(`<section id="countdown" class="section-shell">`);
    SectionHeading($$renderer2, {
      eyebrow: "Save The Date",
      title: "Counting every moment until forever",
      description: "A gentle ticking reminder that our special day is getting closer."
    });
    $$renderer2.push(`<!----> <div class="glass-card grid grid-cols-2 gap-4 p-4 md:grid-cols-4 md:p-6"><!--[-->`);
    const each_array = ensure_array_like(items);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let item = each_array[index];
      $$renderer2.push(`<div class="rounded-[1.75rem] bg-white/60 px-4 py-6 text-center dark:bg-white/5"><div class="font-display text-5xl text-cocoa dark:text-cream md:text-6xl"><!---->`);
      {
        $$renderer2.push(`<span>${escape_html(remaining[item.key])}</span>`);
      }
      $$renderer2.push(`<!----></div> <p class="mt-2 text-xs uppercase tracking-[0.35em] text-gold">${escape_html(item.label)}</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
  });
}
function generateCalendarLinks(event) {
  const { title, date, time, location, note } = event;
  const year = 2027;
  const month = "02";
  const day = "14";
  const hour = time.split(":")[0];
  const minutes = "00";
  const startDateTime = `${year}${month}${day}T${hour}${minutes}00Z`;
  const endDateTime = `${year}${month}${day}T${parseInt(hour) + 3}${minutes}00Z`;
  const details = encodeURIComponent(note);
  const locationEncoded = encodeURIComponent(location);
  const titleEncoded = encodeURIComponent(`The Wedding of Aruna & Bima - ${title}`);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  return {
    google: `https://www.google.com/calendar/render?action=TEMPLATE&text=${titleEncoded}&dates=${startDateTime}/${endDateTime}&details=${details}&location=${locationEncoded}`,
    outlook: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${titleEncoded}&startdt=${year}-${month}-${day}T${hour}:${minutes}:00&enddt=${year}-${month}-${day}T${parseInt(hour) + 3}:${minutes}:00&body=${details}&location=${locationEncoded}`,
    ics: `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:${encodeURIComponent(currentUrl)}%0ADTSTART:${startDateTime}%0ADTEND:${endDateTime}%0ASUMMARY:${titleEncoded}%0ADESCRIPTION:${details}%0ALOCATION:${locationEncoded}%0AEND:VEVENT%0AEND:VCALENDAR`
  };
}
function EventDetails($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<section id="details" class="section-shell">`);
    SectionHeading($$renderer2, {
      eyebrow: "Wedding Event",
      title: "A celebration steeped in warmth and elegance",
      description: "Join us for our sacred vows and joyful reception in the heart of Yogyakarta."
    });
    $$renderer2.push(`<!----> <div class="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"><div class="grid gap-5"><!--[-->`);
    const each_array = ensure_array_like(events);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let event = each_array[$$index];
      $$renderer2.push(`<article class="glass-card p-6"><div class="mb-5 inline-flex items-center gap-3 rounded-full bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold">`);
      Sparkles($$renderer2, { size: 14 });
      $$renderer2.push(`<!----> ${escape_html(event.title)}</div> <div class="space-y-4"><div class="flex items-start gap-3">`);
      Clock_3($$renderer2, { size: 18, class: "mt-1 text-gold" });
      $$renderer2.push(`<!----> <div><h3 class="font-display text-3xl text-cocoa dark:text-cream">${escape_html(event.time)}</h3> <p class="mt-1 text-sm text-cocoa/75 dark:text-cream/75">${escape_html(event.date)}</p></div></div> <div class="flex items-start gap-3">`);
      Map_pin($$renderer2, { size: 18, class: "mt-1 text-gold" });
      $$renderer2.push(`<!----> <p class="text-sm leading-7 text-cocoa/75 dark:text-cream/75">${escape_html(event.location)}</p></div> <p class="rounded-[1.5rem] bg-white/55 p-4 text-sm leading-7 text-cocoa/75 dark:bg-white/5 dark:text-cream/75">${escape_html(event.note)}</p> <div class="flex flex-wrap gap-2 pt-2"><a${attr("href", generateCalendarLinks(event).google)} target="_blank" class="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/40 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-wider text-cocoa transition hover:bg-gold/10 dark:bg-white/5 dark:text-cream">`);
      Calendar_plus($$renderer2, { size: 14, class: "text-gold" });
      $$renderer2.push(`<!----> Google Calendar</a> <a${attr("href", generateCalendarLinks(event).ics)}${attr("download", `${event.title}.ics`)} class="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/40 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-wider text-cocoa transition hover:bg-gold/10 dark:bg-white/5 dark:text-cream">`);
      Calendar_plus($$renderer2, { size: 14, class: "text-gold" });
      $$renderer2.push(`<!----> iCal / Outlook</a></div></div></article>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="glass-card overflow-hidden p-3"><div class="rounded-[1.75rem] bg-white/50 p-5 dark:bg-white/5"><div class="mb-5 flex items-center gap-3">`);
    Calendar_days($$renderer2, { size: 18, class: "text-gold" });
    $$renderer2.push(`<!----> <div><h3 class="font-display text-3xl text-cocoa dark:text-cream">Venue Location</h3> <p class="text-sm text-cocoa/70 dark:text-cream/70">Pendopo Agung Larasati</p></div></div> <iframe class="min-h-[340px] w-full rounded-[1.5rem]" title="Wedding venue location" loading="lazy" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Keraton%20Yogyakarta&amp;z=14&amp;output=embed"></iframe></div></div></div></section>`);
  });
}
function LoveStoryTimeline($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<section id="story" class="section-shell">`);
    SectionHeading($$renderer2, {
      eyebrow: "Love Story",
      title: "A journey told in soft and meaningful chapters",
      description: "From our first meeting to the promise of forever, every step has led us here."
    });
    $$renderer2.push(`<!----> <div class="relative mx-auto max-w-4xl"><div class="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-gold via-gold/20 to-transparent md:left-1/2"></div> <div class="space-y-6"><!--[-->`);
    const each_array = ensure_array_like(timeline);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let item = each_array[index];
      $$renderer2.push(`<article data-story-item="" class="relative grid gap-3 md:grid-cols-2 md:items-start md:gap-10"><div${attr_class(clsx(index % 2 === 0 ? "md:text-right" : "md:order-2 md:text-left"))}><span class="inline-flex rounded-full bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-gold">${escape_html(item.year)}</span></div> <div${attr_class(clsx(index % 2 === 0 ? "" : "md:order-1"))}><div class="glass-card rounded-[1.75rem] p-6"><div class="absolute left-4 top-7 h-3 w-3 rounded-full bg-gold shadow-[0_0_0_8px_rgba(212,175,55,0.14)] md:left-1/2 md:-translate-x-1/2"></div> <h3 class="font-display text-3xl text-cocoa dark:text-cream">${escape_html(item.title)}</h3> <p class="mt-3 text-sm leading-8 text-cocoa/75 dark:text-cream/75">${escape_html(item.description)}</p></div></div></article>`);
    }
    $$renderer2.push(`<!--]--></div></div></section>`);
  });
}
function GallerySection($$renderer) {
  $$renderer.push(`<section id="gallery" class="section-shell">`);
  SectionHeading($$renderer, {
    eyebrow: "Gallery",
    title: "Glimpses of our sweetest moments",
    description: "A visual keepsake of the tenderness, glow, and joy that carry our story."
  });
  $$renderer.push(`<!----> <div class="columns-1 gap-4 sm:columns-2 lg:columns-3"><!--[-->`);
  const each_array = ensure_array_like(gallery);
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let item = each_array[index];
    $$renderer.push(`<button class="group mb-4 w-full overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/50 text-left shadow-velvet backdrop-blur transition duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"><img class="w-full object-cover transition duration-500 group-hover:scale-[1.03]"${attr("src", item.src)}${attr("alt", item.alt)}${attr("loading", index < 2 ? "eager" : "lazy")}/></button>`);
  }
  $$renderer.push(`<!--]--></div> `);
  {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></section>`);
}
function RSVPSection($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let defaultName = fallback($$props["defaultName"], "");
    let name = defaultName;
    let attendance = "";
    let message = "";
    $$renderer2.push(`<section id="rsvp" class="section-shell">`);
    SectionHeading($$renderer2, {
      eyebrow: "RSVP",
      title: "Let us know if you can celebrate with us",
      description: "Your presence means the world to us, and your wishes will become part of our treasured memories."
    });
    $$renderer2.push(`<!----> <form class="glass-card grid gap-5 p-5 md:grid-cols-[1fr_1fr] md:p-8"><label class="grid gap-2 text-sm font-medium text-cocoa dark:text-cream">Full Name <input${attr("value", name)} class="rounded-[1.25rem] border border-gold/15 bg-white/70 px-4 py-3 text-cocoa outline-none transition focus:border-gold dark:bg-white/5 dark:text-cream" placeholder="Your full name"/></label> <label class="grid gap-2 text-sm font-medium text-cocoa dark:text-cream">Attendance `);
    $$renderer2.select(
      {
        value: attendance,
        class: "rounded-[1.25rem] border border-gold/15 bg-white/70 px-4 py-3 text-cocoa outline-none transition focus:border-gold dark:bg-white/5 dark:text-cream"
      },
      ($$renderer3) => {
        $$renderer3.option(
          { value: "", class: "" },
          ($$renderer4) => {
            $$renderer4.push(`Choose one`);
          },
          "svelte-1bebwck"
        );
        $$renderer3.option(
          { value: "Attending", class: "" },
          ($$renderer4) => {
            $$renderer4.push(`Attending`);
          },
          "svelte-1bebwck"
        );
        $$renderer3.option(
          { value: "Maybe", class: "" },
          ($$renderer4) => {
            $$renderer4.push(`Maybe`);
          },
          "svelte-1bebwck"
        );
        $$renderer3.option(
          { value: "Unable to Attend", class: "" },
          ($$renderer4) => {
            $$renderer4.push(`Unable to Attend`);
          },
          "svelte-1bebwck"
        );
      },
      "svelte-1bebwck"
    );
    $$renderer2.push(`</label> <label class="grid gap-2 text-sm font-medium text-cocoa dark:text-cream md:col-span-2">Message <textarea rows="5" class="rounded-[1.25rem] border border-gold/15 bg-white/70 px-4 py-3 text-cocoa outline-none transition focus:border-gold dark:bg-white/5 dark:text-cream" placeholder="Share your blessings and kind words">`);
    const $$body = escape_html(message);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></label> <div class="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><button class="inline-flex items-center justify-center gap-3 rounded-full bg-gold-gradient px-6 py-4 font-medium text-bark shadow-glow transition duration-300 hover:-translate-y-1" type="submit">`);
    Send_horizontal($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> Send RSVP</button> <div class="min-h-8">`);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div></form></section>`);
    bind_props($$props, { defaultName });
  });
}
function WishesSection($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let wishes = fallback($$props["wishes"], () => [], true);
    $$renderer2.push(`<section id="wishes" class="section-shell pt-0">`);
    SectionHeading($$renderer2, {
      eyebrow: "Guest Wishes",
      title: "Kind words from the people we cherish",
      description: "A growing collection of blessings, love, and beautiful notes from our closest family and friends."
    });
    $$renderer2.push(`<!----> <div class="grid gap-4 md:grid-cols-2"><!--[-->`);
    const each_array = ensure_array_like(wishes.slice().reverse());
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let wish = each_array[index];
      $$renderer2.push(`<article class="glass-card rounded-[1.75rem] p-6"><div class="mb-3 flex items-center justify-between gap-3"><h3 class="font-display text-2xl text-cocoa dark:text-cream">${escape_html(wish.name)}</h3> <span class="rounded-full bg-gold/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.3em] text-gold">${escape_html(wish.attendance)}</span></div> <p class="text-sm leading-8 text-cocoa/75 dark:text-cream/75">${escape_html(wish.message)}</p> <p class="mt-4 text-xs uppercase tracking-[0.3em] text-cocoa/45 dark:text-cream/45">${escape_html(wish.timestamp)}</p></article>`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
    bind_props($$props, { wishes });
  });
}
const themeKey = "svelte-wedding-theme";
function writeStorage(key, value) {
  if (typeof localStorage === "undefined") {
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let opened = false;
    let isLoading = true;
    let playing = false;
    let darkMode = false;
    let wishes = [...initialWishes];
    async function toggleMusic() {
      {
        return;
      }
    }
    function toggleTheme() {
      darkMode = !darkMode;
      document.body.classList.toggle("dark", darkMode);
      writeStorage(themeKey, darkMode);
    }
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Aruna &amp; Bima | Wedding Invitation</title>`);
      });
    });
    LoadingScreen($$renderer2, { visible: isLoading });
    $$renderer2.push(`<!----> `);
    ThemeToggle($$renderer2, { darkMode, onToggle: toggleTheme });
    $$renderer2.push(`<!----> `);
    MusicPlayer($$renderer2, { playing, onToggle: toggleMusic });
    $$renderer2.push(`<!----> <div class="relative overflow-x-hidden transition duration-700">`);
    Hero($$renderer2, { guestName: data.guestName, opened });
    $$renderer2.push(`<!----> <main${attr_class("transition-all duration-700", void 0, {
      "pointer-events-none": !opened,
      "translate-y-10": !opened,
      "opacity-40": !opened,
      "blur-md": !opened
    })}><div data-reveal="">`);
    CoupleSection($$renderer2);
    $$renderer2.push(`<!----></div> <div data-reveal="">`);
    CountdownSection($$renderer2);
    $$renderer2.push(`<!----></div> <div data-reveal="">`);
    EventDetails($$renderer2);
    $$renderer2.push(`<!----></div> <div data-reveal="">`);
    LoveStoryTimeline($$renderer2);
    $$renderer2.push(`<!----></div> <div data-reveal="">`);
    GallerySection($$renderer2);
    $$renderer2.push(`<!----></div> <div data-reveal="">`);
    RSVPSection($$renderer2, {
      defaultName: data.guestName !== "Honored Guest" ? data.guestName : ""
    });
    $$renderer2.push(`<!----></div> <div data-reveal="">`);
    WishesSection($$renderer2, { wishes });
    $$renderer2.push(`<!----></div></main></div> <audio preload="auto" autoplay="" loop=""${attr("src", musicSrc)}></audio>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
