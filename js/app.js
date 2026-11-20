(function () {
  "use strict";

  var S = window.SITE || {};
  var main = document.getElementById("main");
  var nav = document.getElementById("sidenav");
  var scrim = document.getElementById("scrim");
  var toggle = document.getElementById("menu-toggle");
  var accountBtn = document.getElementById("account-btn");
  var accountMenu = document.getElementById("account-menu");
  var searchForm = document.getElementById("search-form");
  var searchInput = document.getElementById("q");

  var ICONS = {
    home: '<path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>',
    article: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    image: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-8 8"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    star: '<path d="m12 4 2.5 5 5.5.8-4 3.9.9 5.5L12 16.6 7.1 19.2 8 13.7 4 9.8 9.5 9z"/>'
  };
  function icon(n) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[n] || ICONS.folder) + "</svg>"; }

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function date(iso) {
    var p = String(iso || "").split("-");
    return p.length === 3 ? (+p[2]) + " tháng " + (+p[1]) + ", " + p[0] : iso || "";
  }
  function paras(text) {
    return String(text || "").split(/\n\s*\n/).filter(Boolean).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  }
  function postsSorted() { return (S.posts || []).slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); }); }

  function postList(posts, query) {
    if (!posts.length) return '<p class="empty">Chưa có bài viết nào.</p>';
    return '<ul class="post-list">' + posts.map(function (p) {
      return '<li><a href="#/bai-viet/' + encodeURIComponent(p.id) + '">' +
        '<span class="meta">' + esc(date(p.date)) + (p.tag ? '  <span class="tag">' + esc(p.tag) + "</span>" : "") + "</span>" +
        '<span class="title">' + hl(p.title, query) + "</span>" +
        '<span class="excerpt">' + hl(p.excerpt, query) + "</span></a></li>";
    }).join("") + "</ul>";
  }

  function hl(text, q) {
    var safe = esc(text);
    if (!q) return safe;
    var re = new RegExp("(" + esc(q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
    return safe.replace(re, "<mark>$1</mark>");
  }

  function galleryHtml(items) {
    return '<div class="gallery">' + items.map(function (g) {
      var media = g.src
        ? '<img src="' + esc(g.src) + '" alt="' + esc(g.caption) + '" loading="lazy">'
        : '<div class="ph">' + icon("image") + "</div>";
      return "<figure>" + media + (g.caption ? "<figcaption>" + esc(g.caption) + "</figcaption>" : "") + "</figure>";
    }).join("") + "</div>";
  }

  // ---------- Google Drive & YouTube ----------
  function driveId(url) {
    var m = String(url || "").match(/\/d\/([A-Za-z0-9_-]{10,})|[?&]id=([A-Za-z0-9_-]{10,})/);
    return m ? (m[1] || m[2]) : "";
  }
  function driveView(url) {
    if (!url) return "";
    var id = driveId(url);
    return id && !/folders\//.test(url) ? "https://drive.google.com/file/d/" + id + "/view" : url;
  }
  function driveDownload(url) {
    var id = driveId(url);
    return id && !/folders\//.test(url) ? "https://drive.google.com/uc?export=download&id=" + id : "";
  }
  function youtubeId(url) {
    var m = String(url || "").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : "";
  }

  // ---------- Trang ----------
  var PAGES = {
    "": function () {
      var h = S.home || {};
      return '<h1 class="page-title">' + esc(h.title) + "</h1>" +
        '<p class="lead">' + esc(h.lead) + "</p>" +
        '<div class="feature"><div><h2>Bài mới nhất</h2><p>' + esc((postsSorted()[0] || {}).title || "Chưa có bài viết") + "</p></div>" +
          (postsSorted()[0] ? '<a class="button light" href="#/bai-viet/' + encodeURIComponent(postsSorted()[0].id) + '">Đọc bài</a>' : "") + "</div>" +
        "<h2>Bài viết gần đây</h2>" + postList(postsSorted().slice(0, 3)) +
        "<h2>Ảnh gần đây</h2>" + galleryHtml((S.gallery || []).slice(0, 3));
    },
    "bai-viet": function () {
      return '<h1 class="page-title">Bài viết</h1><p class="lead">' + (S.posts || []).length + " bài, mới nhất ở trên.</p>" + postList(postsSorted());
    },
    "thu-vien": function () {
      return '<h1 class="page-title">Thư viện</h1><p class="lead">Ảnh và khoảnh khắc mình muốn lưu lại.</p>' + galleryHtml(S.gallery || []);
    },
    "tai-lieu": function () {
      var docs = (S.documents || []).slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
      var rows = docs.map(function (d) {
        var view = driveView(d.drive), dl = driveDownload(d.drive);
        var actions = view
          ? '<a class="button ghost" href="' + esc(view) + '" target="_blank" rel="noopener">Xem</a>' +
            (dl ? '<a class="button ghost" href="' + esc(dl) + '" target="_blank" rel="noopener">Tải về</a>' : "")
          : '<span class="hint">Chưa có link</span>';
        return '<li class="doc"><span class="doc-type">' + esc(d.type || "File") + "</span>" +
          '<div class="doc-main"><strong>' + esc(d.title) + "</strong>" +
          '<span class="meta">' + esc(date(d.date)) + (d.note ? ". " + esc(d.note) : "") + "</span></div>" +
          '<div class="doc-actions">' + actions + "</div></li>";
      }).join("");
      return '<h1 class="page-title">Tài liệu</h1><p class="lead">Tài liệu và file gốc, lưu trên Google Drive.</p>' +
        (rows ? '<ul class="docs">' + rows + "</ul>" : '<p class="empty">Chưa có tài liệu nào.</p>');
    },
    "gioi-thieu": function () {
      var a = S.about || {};
      return '<h1 class="page-title">Giới thiệu</h1><p class="lead">' + esc(a.lead) + "</p>" +
        '<dl class="facts">' + (a.facts || []).map(function (f) { return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>"; }).join("") + "</dl>";
    },
    "lien-he": function () {
      return '<h1 class="page-title">Liên hệ</h1><p class="lead">Gửi lời nhắn, mình sẽ trả lời qua email.</p>' +
        '<form class="form" id="contact-form">' +
          '<div class="field"><label for="c-name">Tên của bạn</label><input id="c-name" name="name" required autocomplete="name"></div>' +
          '<div class="field"><label for="c-email">Email</label><input id="c-email" name="email" type="email" required autocomplete="email"></div>' +
          '<div class="field"><label for="c-msg">Lời nhắn</label><textarea id="c-msg" name="message" required></textarea></div>' +
          '<div><button class="button" type="submit">Gửi lời nhắn</button></div>' +
          '<p class="hint">Bấm gửi sẽ mở ứng dụng email của bạn với lời nhắn đã điền sẵn.</p>' +
        "</form>";
    },
    "tai-khoan": function () {
      return '<h1 class="page-title">Tài khoản</h1>' +
        '<div class="profile"><span class="avatar" aria-hidden="true">' + esc((S.owner || "B").charAt(0)) + "</span><div><strong>" + esc(S.owner) + "</strong><span>Chưa đăng nhập</span></div></div>" +
        '<p class="notice">Đây là giao diện mẫu cho phần tài khoản. Đăng nhập thật sẽ được nối sau, khi bạn cần.</p>' +
        '<p style="margin-top:1.5rem"><a class="button" href="#/tai-khoan">Đăng nhập</a> <a class="button ghost" href="#/">Về trang chủ</a></p>';
    }
  };

  function renderPost(id) {
    var p = (S.posts || []).filter(function (x) { return x.id === id; })[0];
    if (!p) return renderNotFound();
    return '<a class="crumb" href="#/bai-viet">Bài viết</a>' +
      '<h1 class="page-title">' + esc(p.title) + "</h1>" +
      '<p class="lead">' + esc(date(p.date)) + (p.tag ? '  <span class="tag">' + esc(p.tag) + "</span>" : "") + "</p>" +
      paras(p.body) +
      (youtubeId(p.youtube) ? '<iframe class="video" src="https://www.youtube-nocookie.com/embed/' + youtubeId(p.youtube) + '" title="Video: ' + esc(p.title) + '" allow="encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>' : "");
  }

  function renderSearch(q) {
    var term = q.trim().toLowerCase();
    var posts = !term ? [] : (S.posts || []).filter(function (p) {
      return [p.title, p.excerpt, p.body, p.tag].join(" ").toLowerCase().indexOf(term) > -1;
    });
    var pages = [];
    (S.menu || []).forEach(function (g) {
      g.items.forEach(function (it) { if (term && it.label.toLowerCase().indexOf(term) > -1) pages.push(it); });
    });
    var pageHtml = pages.length ? "<h2>Trang</h2><ul class=\"post-list\">" + pages.map(function (it) {
      return '<li><a href="#/' + it.id + '"><span class="title">' + hl(it.label, q.trim()) + "</span></a></li>";
    }).join("") + "</ul>" : "";
    var total = posts.length + pages.length;
    return '<h1 class="page-title">Tìm kiếm</h1>' +
      '<p class="lead">' + (term ? total + " kết quả cho “" + esc(q.trim()) + "”" : "Gõ từ khoá vào ô tìm kiếm ở trên.") + "</p>" +
      pageHtml + (posts.length ? "<h2>Bài viết</h2>" + postList(posts, q.trim()) : "") +
      (term && !total ? '<p class="empty">Không thấy kết quả. Thử từ khoá ngắn hơn hoặc kiểm tra dấu tiếng Việt.</p>' : "");
  }

  function renderNotFound() {
    return '<h1 class="page-title">Không tìm thấy trang</h1><p class="lead">Đường dẫn này không có nội dung. Chọn một mục trong menu bên phải, hoặc về trang chủ.</p><a class="button" href="#/">Về trang chủ</a>';
  }

  // ---------- Menu ----------
  function buildNav() {
    nav.innerHTML = (S.menu || []).map(function (g) {
      return '<div class="nav-group"><h2>' + esc(g.title) + "</h2><ul>" + g.items.map(function (it) {
        return '<li><a class="nav-link" href="#/' + it.id + '" data-id="' + it.id + '">' + icon(it.icon) + "<span>" + esc(it.label) + "</span></a></li>";
      }).join("") + "</ul></div>";
    }).join("");
  }

  function setCurrent(id) {
    Array.prototype.forEach.call(nav.querySelectorAll(".nav-link"), function (a) {
      if (a.getAttribute("data-id") === id) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  // ---------- Điều hướng ----------
  function route() {
    var raw = location.hash.replace(/^#\/?/, "");
    var qIndex = raw.indexOf("?");
    var path = qIndex > -1 ? raw.slice(0, qIndex) : raw;
    var params = new URLSearchParams(qIndex > -1 ? raw.slice(qIndex + 1) : "");
    var parts = path.split("/");
    var html, current = parts[0], title = "";

    if (parts[0] === "tim-kiem") {
      html = renderSearch(params.get("q") || "");
      title = "Tìm kiếm";
      current = null;
    } else if (parts[0] === "bai-viet" && parts[1]) {
      html = renderPost(decodeURIComponent(parts[1]));
      title = ((S.posts || []).filter(function (x) { return x.id === decodeURIComponent(parts[1]); })[0] || {}).title || "";
    } else if (PAGES.hasOwnProperty(parts[0])) {
      html = PAGES[parts[0]]();
      (S.menu || []).forEach(function (g) { g.items.forEach(function (it) { if (it.id === parts[0]) title = it.label; }); });
    } else {
      html = renderNotFound();
      current = null;
    }

    main.innerHTML = html;
    document.title = (title && parts[0] ? title + " | " : "") + (S.name || "");
    setCurrent(current);
    closeNav();
    closeAccount();
    window.scrollTo(0, 0);
    if (raw) main.focus({ preventScroll: true });

    var form = document.getElementById("contact-form");
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var body = d.get("message") + "\n\n" + d.get("name") + " (" + d.get("email") + ")";
      location.href = "mailto:" + encodeURIComponent(S.email || "") + "?subject=" + encodeURIComponent("Lời nhắn từ trang web") + "&body=" + encodeURIComponent(body);
    });
  }

  // ---------- Ngăn kéo menu (điện thoại) ----------
  function openNav() { nav.classList.add("open"); scrim.hidden = false; toggle.setAttribute("aria-expanded", "true"); var f = nav.querySelector("a"); if (f) f.focus(); }
  function closeNav() { nav.classList.remove("open"); scrim.hidden = true; toggle.setAttribute("aria-expanded", "false"); }
  toggle.addEventListener("click", function () { nav.classList.contains("open") ? closeNav() : openNav(); });
  scrim.addEventListener("click", closeNav);

  // ---------- Tài khoản ----------
  function closeAccount() { accountMenu.hidden = true; accountBtn.setAttribute("aria-expanded", "false"); }
  accountBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = accountMenu.hidden;
    accountMenu.hidden = !open;
    accountBtn.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", function (e) { if (!accountMenu.contains(e.target)) closeAccount(); });

  // ---------- Tìm kiếm ----------
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    location.hash = "#/tim-kiem?q=" + encodeURIComponent(searchInput.value);
  });
  document.addEventListener("keydown", function (e) {
    var typing = /input|textarea/i.test((document.activeElement || {}).tagName || "");
    if (e.key === "/" && !typing) { e.preventDefault(); searchInput.focus(); }
    if (e.key === "Escape") { closeNav(); closeAccount(); }
  });

  // ---------- Khởi động ----------
  document.getElementById("site-name").textContent = S.name || "";
  var av = accountBtn.querySelector(".avatar");
  if (av) av.textContent = (S.owner || "B").charAt(0);
  buildNav();
  window.addEventListener("hashchange", route);
  route();
})();
