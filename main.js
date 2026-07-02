(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.from((scope || document).querySelectorAll(sel)); };
  var escHTML = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  };
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ---------------------------------------------------------
     Icon set — used for products without a photo
  --------------------------------------------------------- */
  var ICONS = {
    strip: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="27" width="48" height="10" rx="5" stroke="#35e2ff" stroke-width="2"/><circle cx="16" cy="32" r="2.4" fill="#35e2ff"/><circle cx="26" cy="32" r="2.4" fill="#7c6bff"/><circle cx="36" cy="32" r="2.4" fill="#c165ff"/><circle cx="46" cy="32" r="2.4" fill="#35e2ff"/></svg>',
    panel: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="14" width="44" height="36" rx="4" stroke="#35e2ff" stroke-width="2"/><line x1="16" y1="24" x2="48" y2="24" stroke="#35e2ff" stroke-width="1.4" opacity=".6"/><line x1="16" y1="32" x2="48" y2="32" stroke="#7c6bff" stroke-width="1.4" opacity=".6"/><line x1="16" y1="40" x2="48" y2="40" stroke="#c165ff" stroke-width="1.4" opacity=".6"/></svg>',
    neon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 44 Q14 18 32 18 Q50 18 50 34 Q50 46 36 46 L22 46" stroke="#c165ff" stroke-width="3" stroke-linecap="round"/></svg>',
    bulb: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="26" r="14" stroke="#35e2ff" stroke-width="2"/><path d="M27 40h10M28 46h8" stroke="#35e2ff" stroke-width="2" stroke-linecap="round"/><path d="M32 12v-4M46 26h4M18 26h-4M41 15l3-3M23 15l-3-3" stroke="#7c6bff" stroke-width="1.6" stroke-linecap="round"/></svg>',
    facade: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="10" width="32" height="44" stroke="#35e2ff" stroke-width="2"/><line x1="16" y1="20" x2="48" y2="20" stroke="#7c6bff" stroke-width="1.5"/><line x1="16" y1="30" x2="48" y2="30" stroke="#7c6bff" stroke-width="1.5"/><line x1="16" y1="40" x2="48" y2="40" stroke="#c165ff" stroke-width="1.5"/></svg>',
    track: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="10" y1="16" x2="54" y2="16" stroke="#35e2ff" stroke-width="2"/><path d="M22 16v8a10 10 0 1 0 20 0v-8" stroke="#7c6bff" stroke-width="2"/><circle cx="32" cy="44" r="4" fill="#c165ff"/></svg>'
  };

  /* ---------------------------------------------------------
     Mounts — idempotent, fill from window.__BRAND__
  --------------------------------------------------------- */
  function mountNav() {
    var target = $("[data-nav-links]");
    if (!target || target.children.length > 0 || !data.nav) return;
    var here = document.body.getAttribute("data-page");
    target.innerHTML = data.nav.map(function (item) {
      var active = item.href === here ? " active" : "";
      return '<a href="' + escHTML(item.href) + '" class="' + active.trim() + '">' + escHTML(item.label) + "</a>";
    }).join("");

    var mobile = $("[data-mobile-links]");
    if (mobile && mobile.children.length === 0) {
      mobile.innerHTML = data.nav.map(function (item) {
        var active = item.href === here ? " active" : "";
        return '<a href="' + escHTML(item.href) + '" class="' + active.trim() + '">' + escHTML(item.label) + "</a>";
      }).join("");
    }
  }

  function mountBrandBits() {
    $$("[data-brand-name]").forEach(function (el) { el.textContent = data.name || ""; });
    $$("[data-brand-email]").forEach(function (el) {
      el.textContent = data.contact ? data.contact.email : "";
      if (el.tagName === "A") el.href = "mailto:" + (data.contact ? data.contact.email : "");
    });
    $$("[data-brand-phone]").forEach(function (el) {
      el.textContent = data.contact ? data.contact.phone : "";
      if (el.tagName === "A") el.href = "tel:" + (data.contact ? data.contact.phone.replace(/\s+/g, "") : "");
    });
    $$("[data-brand-address]").forEach(function (el) { el.textContent = data.contact ? data.contact.address : ""; });
    $$("[data-brand-hours]").forEach(function (el) { el.textContent = data.contact ? data.contact.hours : ""; });
    $$("[data-brand-year]").forEach(function (el) { el.textContent = data.year || ""; });
    var socials = $("[data-socials]");
    if (socials && socials.children.length === 0 && data.social) {
      socials.innerHTML = data.social.map(function (s) {
        return '<a href="' + escHTML(s.href) + '" target="_blank" rel="noopener">' + escHTML(s.label) + "</a>";
      }).join("");
    }
  }

  function mountStats() {
    var target = $("[data-stats]");
    if (!target || target.children.length > 0 || !data.stats) return;
    target.innerHTML = data.stats.map(function (s) {
      return '<div class="stat reveal"><div class="num"><span data-count-to="' + s.value + '">0</span><span class="suffix">' + escHTML(s.suffix) + '</span></div><div class="label">' + escHTML(s.label) + "</div></div>";
    }).join("");
  }

  function mountBenefits() {
    var target = $("[data-benefits]");
    if (!target || target.children.length > 0 || !data.benefits) return;
    target.innerHTML = data.benefits.map(function (b, i) {
      var n = String(i + 1).padStart(2, "0");
      return '<div class="benefit-item reveal" style="--i:' + i + '"><div class="num">' + n + '</div><h3>' + escHTML(b.title) + '</h3><p>' + escHTML(b.text) + "</p></div>";
    }).join("");
  }

  function productCard(p, i) {
    var visual = p.photo
      ? '<img src="' + escHTML(p.photo) + '" alt="' + escHTML(p.photoAlt || p.name) + '" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover" />'
      : (ICONS[p.icon] || "");
    return (
      '<article class="card-glass reveal" style="--i:' + (i % 6) + '" data-tilt>' +
        '<div class="card-visual">' + visual + "</div>" +
        '<span class="eyebrow-mute">' + escHTML(p.category) + "</span>" +
        "<h3>" + escHTML(p.name) + "</h3>" +
        "<p>" + escHTML(p.desc) + "</p>" +
        '<div class="card-foot"><span class="price">' + escHTML(p.price) + '</span><a class="btn-glass btn-sm btn-ghost" href="contacto.html">Consultar</a></div>' +
      "</article>"
    );
  }

  function mountProducts(limit) {
    var target = $("[data-products]");
    if (!target || target.children.length > 0 || !data.products) return;
    var list = limit ? data.products.slice(0, limit) : data.products;
    target.innerHTML = list.map(productCard).join("");
  }

  function mountServices() {
    var target = $("[data-services]");
    if (!target || target.children.length > 0 || !data.services) return;
    target.innerHTML = data.services.map(function (s) {
      return '<div class="service-row reveal"><div class="step">' + escHTML(s.step) + '</div><div><h3>' + escHTML(s.title) + "</h3><p>" + escHTML(s.text) + "</p></div></div>";
    }).join("");
  }

  function mountGallery(limit) {
    var target = $("[data-gallery]");
    if (!target || target.children.length > 0 || !data.gallery) return;
    var list = limit ? data.gallery.slice(0, limit) : data.gallery;
    target.innerHTML = list.map(function (g, i) {
      return (
        '<div class="frame-glass reveal" style="--i:' + i + '" data-tilt>' +
          '<img src="' + escHTML(g.photo) + '" alt="' + escHTML(g.photoAlt) + '" loading="lazy" decoding="async" />' +
          '<div class="frame-caption"><span class="eyebrow-mute">' + escHTML(g.category) + "</span><h3>" + escHTML(g.title) + "</h3></div>" +
        "</div>"
      );
    }).join("");
  }

  function mountTestimonials() {
    var target = $("[data-testimonials]");
    if (!target || target.children.length > 0 || !data.testimonials) return;
    target.innerHTML = data.testimonials.map(function (t, i) {
      var initials = t.name.split(" ").map(function (n) { return n[0]; }).slice(0, 2).join("");
      return (
        '<div class="testimonial-card reveal" style="--i:' + i + '">' +
          '<span class="quote-mark" aria-hidden="true">&ldquo;</span>' +
          '<p class="quote">' + escHTML(t.quote) + "</p>" +
          '<div class="who"><div class="avatar-ring">' + escHTML(initials) + '</div><div><div class="name">' + escHTML(t.name) + '</div><div class="role">' + escHTML(t.role) + "</div></div></div>" +
        "</div>"
      );
    }).join("");
  }

  function mountFaqs() {
    var target = $("[data-faqs]");
    if (!target || target.children.length > 0 || !data.faqs) return;
    target.innerHTML = data.faqs.map(function (f) {
      return (
        '<div class="accordion-item">' +
          '<button class="accordion-trigger" type="button" aria-expanded="false">' + escHTML(f.q) + '<span class="plus" aria-hidden="true"></span></button>' +
          '<div class="accordion-panel"><p>' + escHTML(f.a) + "</p></div>" +
        "</div>"
      );
    }).join("");
    bindAccordion(target);
  }

  /* ---------------------------------------------------------
     Nav behavior
  --------------------------------------------------------- */
  function initNav() {
    var nav = $(".nav");
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 24) nav.classList.add("is-solid");
      else nav.classList.remove("is-solid");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = $(".nav-toggle");
    var menu = $(".mobile-menu");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
      document.body.style.overflow = !open ? "hidden" : "";
    });
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------------------------------------------------------
     Scroll reveals
  --------------------------------------------------------- */
  function initReveals() {
    var items = $$(".reveal");
    if (!items.length) return;
    if (typeof IntersectionObserver === "undefined") {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    items.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      $$(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      });
    }, 6000);
  }

  /* ---------------------------------------------------------
     Count-up stats
  --------------------------------------------------------- */
  function initCountUp() {
    var items = $$("[data-count-to]");
    if (!items.length || typeof IntersectionObserver === "undefined") {
      items.forEach(function (el) { el.textContent = el.getAttribute("data-count-to"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        var el = entry.target;
        var target = parseFloat(el.getAttribute("data-count-to")) || 0;
        var duration = reduced ? 400 : 1400;
        var start = performance.now();
        function tick(now) {
          var p = Math.min(1, (now - start) / duration);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      items.forEach(function (el) {
        if (el.textContent === "0" && el.getBoundingClientRect().top < window.innerHeight) {
          el.textContent = el.getAttribute("data-count-to");
        }
      });
    }, 6000);
  }

  /* ---------------------------------------------------------
     Subtle tilt on glass cards
  --------------------------------------------------------- */
  function initTilt() {
    if (!fineHover) return;
    $$("[data-tilt]").forEach(function (card) {
      var rect;
      card.addEventListener("mouseover", function (e) {
        if (card.contains(e.relatedTarget)) return;
        rect = card.getBoundingClientRect();
      });
      card.addEventListener("mousemove", function (e) {
        if (!rect) rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = "perspective(800px) rotateX(" + (-py * 6) + "deg) rotateY(" + (px * 6) + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseout", function (e) {
        if (card.contains(e.relatedTarget)) return;
        card.style.transform = "";
      });
    });
  }

  /* ---------------------------------------------------------
     Mouse-follow ambient glow (hero + cta)
  --------------------------------------------------------- */
  function initMouseGlow() {
    if (!fineHover || reduced) return;
    var glow = document.createElement("div");
    glow.className = "mouse-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);
    var raf = null;
    window.addEventListener("mousemove", function (e) {
      glow.classList.add("is-active");
      if (raf) return;
      raf = requestAnimationFrame(function () {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
        raf = null;
      });
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     FAQ accordion
  --------------------------------------------------------- */
  function bindAccordion(scope) {
    $$(".accordion-trigger", scope).forEach(function (trigger) {
      if (trigger.dataset.bound) return;
      trigger.dataset.bound = "1";
      trigger.addEventListener("click", function () {
        var item = trigger.closest(".accordion-item");
        var panel = $(".accordion-panel", item);
        var isOpen = item.classList.contains("is-open");
        $$(".accordion-item", item.parentElement).forEach(function (other) {
          other.classList.remove("is-open");
          $(".accordion-trigger", other).setAttribute("aria-expanded", "false");
          $(".accordion-panel", other).style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }
  function initAccordion() {
    $$(".accordion-item").forEach(function (item) { bindAccordion(item.parentElement); });
  }

  /* ---------------------------------------------------------
     Contact form
  --------------------------------------------------------- */
  function initForm() {
    var form = $("[data-contact-form]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var btn = $("[type=submit]", form);
      var success = $("[data-form-success]", form.parentElement) || $("[data-form-success]");
      if (btn) {
        btn.textContent = "Enviando…";
        btn.disabled = true;
      }
      setTimeout(function () {
        form.reset();
        if (btn) {
          btn.textContent = "Enviado ✓";
          btn.disabled = false;
        }
        if (success) success.classList.add("is-visible");
        setTimeout(function () {
          if (btn) btn.textContent = "Enviar mensaje";
        }, 2600);
      }, 700);
    });
  }

  /* ---------------------------------------------------------
     Smooth anchor scroll (native)
  --------------------------------------------------------- */
  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navOffset = 84;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navOffset,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  /* ---------------------------------------------------------
     WebGL2 "liquid crystal" hero shader — provided verbatim,
     wrapped with feature detection + graceful CSS fallback.
  --------------------------------------------------------- */
  function initLiquidCrystal() {
    var host = $("#liquid-crystal");
    var canvas = $("#lc-canvas");
    if (!host || !canvas) return;
    var heroEl = host.closest(".hero") || host.parentElement;

    var gl = canvas.getContext("webgl2", { antialias: true, alpha: false });
    if (!gl) {
      if (heroEl) heroEl.classList.add("no-webgl");
      return;
    }

    var vsSrc = "#version 300 es\n" +
      "precision highp float;\n" +
      "const vec2 verts[3] = vec2[3](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));\n" +
      "void main(){ gl_Position = vec4(verts[gl_VertexID], 0.0, 1.0); }";

    var fsSrc = "#version 300 es\n" +
      "precision highp float;\n" +
      "out vec4 fragColor;\n" +
      "uniform vec2 u_resolution;\n" +
      "uniform float u_time;\n" +
      "float sdCircle(vec2 p, vec2 c, float r){ return length(p-c)-r; }\n" +
      "float smoothUnion(float d1, float d2, float k){\n" +
      "  float h = clamp(0.5+0.5*(d2-d1)/k, 0.0, 1.0);\n" +
      "  return mix(d2,d1,h) - k*h*(1.0-h);\n" +
      "}\n" +
      "vec3 hsv2rgb(vec3 c){\n" +
      "  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);\n" +
      "  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n" +
      "  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n" +
      "}\n" +
      "void main(){\n" +
      "  vec2 uv = (gl_FragCoord.xy - 0.5*u_resolution.xy) / u_resolution.y;\n" +
      "  float t = u_time * 0.6;\n" +
      "  vec2 c1 = vec2(sin(t*0.7)*0.38, cos(t*0.5)*0.32);\n" +
      "  vec2 c2 = vec2(cos(t*0.4)*0.32+0.15, sin(t*0.9)*0.27-0.10);\n" +
      "  vec2 c3 = vec2(sin(t*0.55+2.0)*0.27-0.20, cos(t*0.35+1.0)*0.37+0.10);\n" +
      "  vec2 c4 = vec2(cos(t*0.6+1.3)*0.30-0.05, sin(t*0.45+2.5)*0.30-0.22);\n" +
      "  vec2 c5 = vec2(sin(t*0.42+3.4)*0.34+0.18, cos(t*0.65+0.6)*0.24+0.20);\n" +
      "  float d1 = sdCircle(uv, c1, 0.20);\n" +
      "  float d2 = sdCircle(uv, c2, 0.14);\n" +
      "  float d3 = sdCircle(uv, c3, 0.24);\n" +
      "  float d4 = sdCircle(uv, c4, 0.16);\n" +
      "  float d5 = sdCircle(uv, c5, 0.12);\n" +
      "  float d = smoothUnion(d1, d2, 0.18);\n" +
      "  d = smoothUnion(d, d3, 0.24);\n" +
      "  d = smoothUnion(d, d4, 0.20);\n" +
      "  d = smoothUnion(d, d5, 0.16);\n" +
      "  float line = abs(d);\n" +
      "  float pulse = 0.5 + 0.5 * sin(u_time * 0.15);\n" +
      "  float widthScale = mix(0.12, 1.0, pulse);\n" +
      "  float core = (0.00025 * widthScale) / (line * line + 0.00004 * widthScale);\n" +
      "  float halo = (0.00015 * widthScale) / (line + 0.006 * widthScale);\n" +
      "  float glow = core + halo;\n" +
      "  float hue = 0.60 + 0.14 * sin(u_time * 0.25);\n" +
      "  float sat = 0.85;\n" +
      "  vec3 hueColor = hsv2rgb(vec3(hue, sat, 1.0));\n" +
      "  vec3 colorCore = vec3(0.75, 0.92, 1.0);\n" +
      "  vec3 col = mix(hueColor, colorCore, clamp(glow * 0.5, 0.0, 1.0));\n" +
      "  col *= glow;\n" +
      "  fragColor = vec4(col, 1.0);\n" +
      "}";

    function compile(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    }

    var program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vsSrc));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fsSrc));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      if (heroEl) heroEl.classList.add("no-webgl");
      return;
    }
    gl.useProgram(program);
    gl.bindVertexArray(gl.createVertexArray());

    var uRes = gl.getUniformLocation(program, "u_resolution");
    var uTime = gl.getUniformLocation(program, "u_time");

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var rect = canvas.getBoundingClientRect();
      var w = Math.max(1, Math.round(rect.width * dpr));
      var h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    var start = performance.now();
    var rafId;
    function loop(now) {
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    var lostHandler = function () { if (rafId) cancelAnimationFrame(rafId); };
    canvas.addEventListener("webglcontextlost", lostHandler, false);
  }

  /* ---------------------------------------------------------
     Boot
  --------------------------------------------------------- */
  function boot() {
    safe(mountNav, "mountNav");
    safe(mountBrandBits, "mountBrandBits");
    safe(mountStats, "mountStats");
    safe(mountBenefits, "mountBenefits");
    safe(function () { mountProducts(document.body.getAttribute("data-products-limit")); }, "mountProducts");
    safe(mountServices, "mountServices");
    safe(function () { mountGallery(document.body.getAttribute("data-gallery-limit")); }, "mountGallery");
    safe(mountTestimonials, "mountTestimonials");
    safe(mountFaqs, "mountFaqs");

    safe(initNav, "initNav");
    safe(initReveals, "initReveals");
    safe(initCountUp, "initCountUp");
    safe(initTilt, "initTilt");
    safe(initMouseGlow, "initMouseGlow");
    safe(initAccordion, "initAccordion");
    safe(initForm, "initForm");
    safe(initSmoothScroll, "initSmoothScroll");
    safe(initLiquidCrystal, "initLiquidCrystal");

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
