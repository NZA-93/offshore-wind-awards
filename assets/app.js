(function () {
  "use strict";

  var board = window.BOARD;
  var mount = document.getElementById("app");
  var filter = "all";
  var FILTERS = ["all", "A", "B", "C", "D", "E", "N"];
  var strip = document.getElementById("come-funziona");

  if (!board || !mount) {
    return;
  }

  var initial = new URLSearchParams(window.location.search).get("band");
  if (initial && FILTERS.indexOf(initial) !== -1) {
    filter = initial;
  }

  document.querySelectorAll("[data-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      filter = button.getAttribute("data-filter");
      syncTabs();
      writeUrl();
      render();
    });
  });

  if (strip) {
    var langParam = new URLSearchParams(window.location.search).get("lang");
    setStripLang(langParam === "en" ? "en" : "it");
    strip.querySelectorAll("[data-lang-btn]").forEach(function (button) {
      button.addEventListener("click", function () {
        setStripLang(button.getAttribute("data-lang-btn"));
      });
    });
  }

  syncTabs();
  render();

  function setStripLang(lang) {
    if (!strip) return;
    strip.setAttribute("data-lang", lang);
    strip.querySelectorAll("[data-lang-btn]").forEach(function (button) {
      var on = button.getAttribute("data-lang-btn") === lang;
      button.setAttribute("aria-pressed", on ? "true" : "false");
    });
    strip.querySelectorAll("[data-lang-panel]").forEach(function (panel) {
      var on = panel.getAttribute("data-lang-panel") === lang;
      if (on) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "");
      }
    });
    var url = new URL(window.location.href);
    if (lang === "it") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", "en");
    }
    window.history.replaceState(null, "", url);
  }

  function syncTabs() {
    document.querySelectorAll("[data-filter]").forEach(function (button) {
      var on = button.getAttribute("data-filter") === filter;
      button.setAttribute("aria-selected", on ? "true" : "false");
      button.tabIndex = on ? 0 : -1;
    });
  }

  function writeUrl() {
    var url = new URL(window.location.href);
    if (filter === "all") {
      url.searchParams.delete("band");
    } else {
      url.searchParams.set("band", filter);
    }
    window.history.replaceState(null, "", url);
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function rowVisible(row) {
    if (filter === "all") return true;
    if (filter === "N") return row.kind === "null" || row.kind === "gap";
    return row.band === filter;
  }

  function axisVisible(axis) {
    return axis.showOn.indexOf(filter) !== -1;
  }

  function pct(value, max) {
    var n = (value / max) * 100;
    if (!isFinite(n) || n < 0) return 0;
    if (n > 100) return 100;
    return n;
  }

  function tickStyle(tick, max) {
    var left = pct(tick, max);
    var shift = "translateX(-50%)";
    if (left < 4) shift = "translateX(0)";
    if (left > 96) shift = "translateX(-100%)";
    return "left:" + left + "%;transform:" + shift;
  }

  function linksHtml(links) {
    if (!links || !links.length) {
      return '<span class="muted">No primary URL in this pass</span>';
    }
    return links
      .map(function (link) {
        var label = (link.n ? link.n + " · " : "") + link.label;
        return (
          '<a href="' +
          esc(link.href) +
          '" target="_blank" rel="noopener noreferrer">' +
          esc(label) +
          "</a>"
        );
      })
      .join('<span class="link-gap" aria-hidden="true"> · </span>');
  }

  function signHtml(row) {
    if (!row.sign) {
      return '<span class="sign sign-gap">Gap</span>';
    }
    var hint = row.signHint ? '<span class="sign-hint">' + esc(row.signHint) + "</span>" : "";
    return '<span class="sign sign-' + esc(row.sign.toLowerCase()) + '">' + esc(row.sign) + "</span>" + hint;
  }

  function renderCeiling() {
    var card = board.ceilingCard;
    if (card.showOn.indexOf(filter) === -1) return "";
    return (
      '<section class="panel panel-ceiling" id="italy-ceiling">' +
      "<h3>" + esc(board.copy.italy) + "</h3>" +
      '<p class="ceiling-figure"><span class="num">' + esc(card.figure) + '</span> <span class="ceiling-unit">' + esc(card.unit) + "</span></p>" +
      '<p class="ceiling-badge">' + esc(card.badge) + "</p>" +
      "<ul>" +
      card.points.map(function (point) { return "<li>" + esc(point) + "</li>"; }).join("") +
      "</ul>" +
      '<p class="source-line">' + linksHtml(card.links) + "</p>" +
      "</section>"
    );
  }

  function renderAxis(axis) {
    var rows = board.rows.filter(function (row) {
      return row.chart && row.chart.axis === axis.id;
    });
    if (!rows.length) return "";
    var note = filter === "C" && axis.whenC ? '<p class="when-filter">' + esc(axis.whenC) + "</p>" : "";
    var bars = rows
      .map(function (row, index) {
        var width = pct(row.chart.value, axis.max);
        var cap = "";
        if (axis.ceiling != null) {
          var capClass = index === 0 ? "hcap labeled" : "hcap";
          cap =
            '<span class="' + capClass + '" style="left:' + pct(axis.ceiling, axis.max) + '%" title="Italy FER 2 ceiling, 185 €/MWh, not an award"></span>';
        }
        return (
          '<div class="hrow">' +
          '<div class="hname"><strong>' + esc(row.chart.name) + "</strong><span>" + esc(row.chart.sub) + "</span></div>" +
          '<div class="htrack-wrap"><div class="htrack" role="presentation">' +
          '<span class="hfill tone-' + esc(axis.tone) + '" style="width:' + width + '%"></span>' +
          cap +
          "</div></div>" +
          '<div class="hval"><strong class="num">' + esc(row.chart.display) + "</strong><span>" + esc(row.chart.unit) + "</span></div>" +
          "</div>"
        );
      })
      .join("");
    var ticks = axis.ticks
      .map(function (tick) {
        var cls = axis.ceiling != null && tick === axis.ceiling ? "tick tick-ceiling" : "tick";
        return '<span class="' + cls + '" style="' + tickStyle(tick, axis.max) + '">' + esc(tick) + "</span>";
      })
      .join("");
    var callout = axis.callout
      ? '<aside class="callout"><p class="kicker">' + esc(axis.callout.kicker) + "</p><p>" + esc(axis.callout.text) + "</p></aside>"
      : "";
    var aside = axis.aside ? '<p class="aside">' + esc(axis.aside) + "</p>" : "";
    var legend = axis.ceiling != null
      ? '<p class="chart-legend"><span class="swatch tone-' + esc(axis.tone) + '"></span> Published clear <span class="swatch swatch-ceiling"></span> Dashed/hatched 185, ceiling only, never in the strike series</p>'
      : '<p class="chart-legend"><span class="swatch tone-' + esc(axis.tone) + '"></span> Published clear, original units. Axis starts at 0.</p>';
    var kicker = axis.kicker ? '<p class="kicker">' + esc(axis.kicker) + "</p>" : "";
    return (
      '<div class="chart-pane">' +
      kicker +
      "<p class=\"caption\">" + esc(axis.caption) + "</p>" +
      note +
      legend +
      '<div class="hchart' + (axis.ceiling != null ? " has-ceiling" : "") + '">' +
      bars +
      '<div class="haxis-row"><div class="hspacer"></div><div class="haxis">' + ticks + '</div><div class="hspacer"></div></div>' +
      "</div>" +
      callout +
      aside +
      "</div>"
    );
  }

  function renderCharts() {
    var axes = board.axes.filter(axisVisible);
    var html = "";
    var i = 0;
    while (i < axes.length) {
      var group = axes[i].group;
      var batch = [];
      while (i < axes.length && axes[i].group === group) {
        batch.push(axes[i]);
        i++;
      }
      html +=
        '<section class="panel">' +
        "<h3>" + esc(board.copy[group]) + "</h3>" +
        batch.map(renderAxis).join("") +
        "</section>";
    }
    return html;
  }

  function renderBandE() {
    if (filter !== "all" && filter !== "E") return "";
    var rows = board.rows.filter(function (row) { return row.band === "E"; });
    return (
      '<section class="panel panel-e" id="band-e">' +
      "<h3>" + esc(board.copy.capacity) + "</h3>" +
      "<p class=\"caption\">Context only. These are payments to the state, site fees, or rounds with no award. They are not €/MWh strikes and they are not on the charts above.</p>" +
      tableHtml(rows, "Band E metrics in their published units") +
      "</section>"
    );
  }

  function renderUnplotted() {
    var rows = board.rows.filter(function (row) {
      if (row.kind !== "null" && row.kind !== "gap") return false;
      if (!rowVisible(row)) return false;
      if (row.band === "E" && (filter === "all" || filter === "E")) return false;
      return true;
    });
    if (!rows.length) return "";
    var items = rows
      .map(function (row) {
        return "<li><strong>" + esc(row.country) + " · " + esc(row.round) + ".</strong> " + esc(row.priceText) + ". " + esc(row.note) + "</li>";
      })
      .join("");
    return (
      '<section class="panel panel-null" id="not-plotted">' +
      '<p class="kicker">Not a price</p>' +
      "<h3>Null rounds and coverage gaps</h3>" +
      "<p class=\"caption\">These are not zeroes, and they are not bars. A failed or empty round is left out of every chart on purpose.</p>" +
      "<ul>" + items + "</ul>" +
      "</section>"
    );
  }

  function renderTimeline() {
    var years = ["2021", "2022", "2023", "2024", "2025", "2026"];
    var columns = years
      .map(function (year) {
        var events = board.timeline.filter(function (event) {
          if (event.year !== year) return false;
          if (filter === "all") return true;
          return event.bands.indexOf(filter) !== -1;
        });
        var body = events.length
          ? "<ul>" + events.map(function (event) {
              return '<li class="tone-' + esc(event.bands[0]) + '">' + esc(event.text) + "</li>";
            }).join("") + "</ul>"
          : '<p class="muted year-empty">Nothing in this view.</p>';
        return '<li class="year-col"><p class="year num">' + esc(year) + "</p>" + body + "</li>";
      })
      .join("");
    return (
      '<section class="panel" id="timeline">' +
      "<h3>" + esc(board.copy.timeline) + "</h3>" +
      "<p class=\"caption\">The strip follows the briefing timeline. Prices here are the same published figures as the register.</p>" +
      '<ol class="years">' + columns + "</ol>" +
      "</section>"
    );
  }

  function tableHtml(rows, caption) {
    if (!rows.length) {
      return '<p class="muted">Nothing in this view.</p>';
    }
    var body = rows
      .map(function (row) {
        var priceClass = row.kind === "ceiling" ? "price price-ceiling" : "price";
        return (
          "<tr>" +
          td("Band", bandLabel(row)) +
          td("Year", esc(row.year)) +
          td("Round", "<strong>" + esc(row.country) + "</strong><br>" + esc(row.round)) +
          td("Published price", '<span class="' + priceClass + '">' + esc(row.priceText) + "</span>") +
          td("Capacity", esc(row.capacity)) +
          td("Critic sign", signHtml(row)) +
          td("Note", esc(row.note)) +
          td("Source", linksHtml(row.links)) +
          "</tr>"
        );
      })
      .join("");
    return (
      '<div class="table-scroll"><table><caption class="sr-only">' + esc(caption) + "</caption><thead><tr>" +
      "<th>Band</th><th>Year</th><th>Round</th><th>Published price</th><th>Capacity</th><th>Critic sign</th><th>Note</th><th>Source</th>" +
      "</tr></thead><tbody>" + body + "</tbody></table></div>"
    );
  }

  function td(label, html) {
    return '<td data-label="' + esc(label) + '">' + html + "</td>";
  }

  function bandLabel(row) {
    if (row.band === "gap") return "Gap";
    return esc(row.band);
  }

  function renderRegister() {
    var rows = board.rows.filter(rowVisible);
    return (
      '<section class="panel" id="register">' +
      '<p class="kicker">Register</p>' +
      "<h3>Every figure, in the units that were published</h3>" +
      '<p class="caption">' + rows.length + " rows in this view. Research date " + esc(board.researchDate) + " (" + esc(board.timezone) + "). Original units only.</p>" +
      tableHtml(rows, "Offshore wind public prices by scheme band") +
      "</section>"
    );
  }

  function renderSources() {
    var groups = board.sources
      .map(function (group) {
        var items = group.items
          .map(function (item) {
            var body = item.href
              ? '<a href="' + esc(item.href) + '" target="_blank" rel="noopener noreferrer">' + esc(item.title) + "</a>"
              : esc(item.title);
            return '<li id="source-' + item.n + '"><span class="sn">' + item.n + "</span> " + body + "</li>";
          })
          .join("");
        return "<h4>" + esc(group.group) + "</h4><ol class=\"src\">" + items + "</ol>";
      })
      .join("");
    var extra = board.alsoCited
      .map(function (item) {
        return '<li><a href="' + esc(item.href) + '" target="_blank" rel="noopener noreferrer">' + esc(item.title) + "</a></li>";
      })
      .join("");
    return (
      '<section class="panel" id="sources">' +
      "<h3>" + esc(board.copy.sources) + "</h3>" +
      "<p class=\"caption\">Numbering follows the research source list of " + esc(board.researchDate) + ". Prefer the official document where both a primary and a secondary link are given.</p>" +
      groups +
      "<h4>Also cited from the briefing or the scout tables</h4><ul class=\"src extra\">" + extra + "</ul>" +
      "</section>"
    );
  }

  function render() {
    mount.innerHTML =
      renderCeiling() +
      renderCharts() +
      renderBandE() +
      renderUnplotted() +
      renderTimeline() +
      renderRegister() +
      renderSources();
  }
})();
