var FixedMidashi = new function() {

    var DISABLED = false;

    var ROWS = 1;
    var COLS = 0;
    var DIV_FULL_MODE = false;
    var DIV_AUTO_SIZE = "both";
    var COPY_ID = true;
    var BORDER_COLOR = null;
    var BORDER_STYLE = null;
    var BORDER_WIDTH = null;
    var BOX_SHADOW = null;

    var DIV_MIN_WIDTH = 150;
    var DIV_MIN_HEIGHT = 150;

    var DIV_BODY_SCROLL = 1;

    var RADIO_PREFIX = "_FIXED_HEADER_";

    var POS_FIXED = 1;
    var POS_ABSOLUTE = 2;
    var POS_MIX = 3;
    var _positionMode = -1;

    var l = "textarea",
        i = "password",
        h = "checkbox",
        f = "select-multiple",
        e = "select-one",
        g = "change",
        k = "radio",
        j = "INPUT",
        bc = "fixed",
        ac = "transparent",
        Zb = "0px",
        Yb = "absolute",
        Xb = "none",
        Wb = "hidden",
        Vb = "auto",
        Ub = "",
        Tb = "THEAD",
        Sb = "scroll",
        n = "resize",
        Rb = -1,
        Qb = null,
        Pb = true,
        Ob = "both",
        Nb = false,
        Mb = this;

    var TIMER_WATCH_TABLESIZE = 3e3,
        TID_HEADER = "H",
        TID_NUMBER = "N",
        TID_CORNER = "C",
        PX = "px",
        HEIGHT_MARGIN = 10,
        MIN_SIZE = 1,
        _isIE = Nb,
        _IEver = 0,
        _isIE11 = Nb,
        _isFirefox = Nb,
        _isOpera = Nb,
        _isSafari = Nb,
        _isChrome = Nb,
        _isMobile = Nb,
        _isBackCompat = Nb,
        _fixedHeaders = Qb,
        _fixedList = Qb,
        _body = Qb,
        _resizeTimerId = Qb,
        _execFlag = Nb,
        _IE_retryCount = 0;
    Mb.create = function() { var f = "_fixedhead"; if (DISABLED) return Rb; if (!document.body.getBoundingClientRect) return -2; if (!window.addEventListener && !window.attachEvent) return -3; var l = (new Date).getTime(),
            h = _fixedHeaders == Qb; if (!h)
            for (var b = 0; b < _fixedHeaders.length; b++) _fixedHeaders[b].removeAllTables(Nb); for (var i = document.body.getElementsByTagName("TABLE"), e = [], b = 0; b < i.length; b++) { var c = i[b],
                d = c.getAttribute(f); if (d == Qb) d = c._fixedhead; if (d == undefined) continue; if (c.rows.length == 0) continue;
            e.push(c) } if (e.length == 0) return -4; var g = Qb; if (h) { var a = navigator.userAgent.toLowerCase();
            _isIE = a.indexOf("msie") >= 0; if (_isIE) { var j = a.indexOf("msie"),
                    m = a.indexOf(";", j);
                _IEver = Number(a.substring(j + 5, m)) } if (!_isIE) _isIE11 = a.indexOf("trident") >= 0;
            _isFirefox = a.indexOf("firefox") >= 0;
            _isOpera = a.indexOf("opera") >= 0;
            _isSafari = a.indexOf("safari") >= 0 && a.indexOf("chrome") < 0;
            _isChrome = a.indexOf("chrome") >= 0;
            _isMobile = a.indexOf("mobile") >= 0; if (_isIE && _rect(i[0]).right >= 1e4 && _IE_retryCount < 10) { setTimeout(FixedMidashi.create, 10);
                _IE_retryCount++; return -5 }
            _isBackCompat = document.compatMode == "BackCompat";
            _body = _isBackCompat ? document.body : document.documentElement; if (_isIE && (_IEver <= 7 || _IEver <= 9 && _isBackCompat)) _positionMode = POS_ABSOLUTE;
            else if (_positionMode == Rb) { _positionMode = POS_MIX; if (_isMobile) _positionMode = POS_FIXED } if (_isIE && _IEver == 8 && !_isBackCompat) _fixedList = new _FixedElementList; if (_isFirefox) g = _createObjectForFirefox();
            _isChrome && _createObjectForChrome();
            _addEventListener(window, n, _onBodyResize);
            _isMobile && _addEventListener(window, "orientationchange", _onBodyResize);
            (_isFirefox || _isSafari) && !_isMobile && TIMER_WATCH_TABLESIZE >= 0 && setInterval(_checkZoom, TIMER_WATCH_TABLESIZE);
            _addEventListener(window, Sb, _onBodyScroll) }
        _fixedHeaders = []; for (var b = 0; b < e.length; b++) { var c = e[b],
                d = c.getAttribute(f); if (d == Qb) d = c._fixedhead; var k = _createFixedHeader(c, d, e.length);
            _fixedHeaders.push(k) }
        _execute("init");
        h && _createCSS("print", ".fixed_header_display_none_at_print { display: none; visibility: hidden; }");
        g != Qb && g.parentNode.removeChild(g); return (new Date).getTime() - l };

    function _checkZoom() { if (_fixedHeaders == Qb) return; for (var a = 0; a < _fixedHeaders.length; a++)
            if (_fixedHeaders[a].checkZoom()) { _execute(n); break } }
    Mb.remove = function() { if (_fixedHeaders == Qb) return; for (var a = 0; a < _fixedHeaders.length; a++) _fixedHeaders[a].removeAllTables(Pb);
        _fixedHeaders = [] };
    Mb.syncValue = function(a) { if (_fixedHeaders == Qb) return; if (!a) return;
        _copyValues(a) };
    Mb.syncStyle = function(a, d) { if (_fixedHeaders == Qb) return; if (!a) return; if (_fixedList != Qb) { var e = _fixedList.getAll(a); if (e == Qb) return; for (var b = 0; b < e.length; b++) _copyStyle(a, e[b], d); return } var c = a.$FXH_FIXED_ELEMENT; if (c == undefined) return; if (!c.$IS_ARRAY) _copyStyle(a, c, d);
        else
            for (var b = 0; b < c.length; b++) _copyStyle(a, c[b], d) };
    Mb.getFixedElement = function(b) { if (_fixedHeaders == Qb) return Qb; if (!b) return Qb; if (_fixedList != Qb) return _fixedList.get(b); var a = b.$FXH_FIXED_ELEMENT; if (!a) return Qb; if (!a.$IS_ARRAY) return a; if (a.length == 0) return Qb; return a[a.length - 1] };
    Mb.getFixedElements = function(b) { if (_fixedHeaders == Qb) return Qb; if (!b) return Qb; if (_fixedList != Qb) return _fixedList.getAll(b); var a = b.$FXH_FIXED_ELEMENT; if (!a) return Qb; if (a.$IS_ARRAY && a.length == 0) return Qb; var c = []; if (!a.$IS_ARRAY) c.push(a);
        else
            for (var d = 0; d < a.length; d++) c.push(a[d]); return c };
    Mb.getSourceElement = function(a) { if (_fixedHeaders == Qb) return Qb; if (!a) return Qb; var b = a.$SOURCE_ELEMENT; return !b ? Qb : b };
    Mb.isFixedElement = function(a) { if (_fixedHeaders == Qb) return Nb; if (!a) return Nb; return a.$SOURCE_ELEMENT != undefined };

    function _createFixedHeader(k, G, E) { for (var B = k.rows, A = _cells(B[0]), r = 0, e = 0; e < A.length; e++) r += A[e].colSpan; var d = ROWS,
            j = COLS,
            c = Rb,
            b = Rb,
            z = COPY_ID,
            f = BORDER_COLOR,
            g = BORDER_STYLE,
            h = BORDER_WIDTH,
            i = BOX_SHADOW,
            l = Qb,
            m = 1,
            s = DIV_FULL_MODE,
            v = DIV_AUTO_SIZE,
            p = Qb,
            q = Qb,
            C = _getElementByTagName(k, Tb); if (C != Qb) d = C.rows.length; for (var D = G.split(";"), e = 0; e < D.length; e++) { var t = D[e].split(":"); if (t.length != 2) continue; var F = _trim(t[0]).toLowerCase(),
                a = _trim(t[1]); switch (F) {
                case "rows":
                    d = Number(a); break;
                case "cols":
                    j = Number(a); break;
                case "div-max-width":
                    c = _percent(a); break;
                case "div-max-height":
                    b = _percent(a); break;
                case "div-full-mode":
                    s = a.toLowerCase() == "yes"; break;
                case "div-auto-size":
                    v = a.toLowerCase(); break;
                case "copyid":
                    z = a.toLowerCase() == "yes"; break;
                case "border-color":
                    f = a; break;
                case "border-style":
                    g = a; break;
                case "border-width":
                    h = a; break;
                case "box-shadow":
                    i = a.replace(/ +/g, " "); break;
                case "bgcolor":
                    l = a; break;
                case "opacity":
                    m = Number(a); break;
                case "body-header-id":
                    p = a; break;
                case "body-left-header-id":
                    q = a } } if (d < 0 || d >= Math.min(B.length, 11)) d = 0; if (j < 0 || j >= Math.min(r, 11)) j = 0; if (!c || c < 1 || c > 100) c = Rb; if (!b || b < 1 || b > 100) b = Rb; if (E > 1) s = Nb; if (m < 0 || m > 1) m = 1; var n = document.createElement("DIV"); if (f != Qb && !_setStyle(n, "borderColor", f)) f = Qb; if (g != Qb && !_setStyle(n, "borderStyle", g)) g = Qb; if (h != Qb && !_setStyle(n, "borderWidth", h)) h = Qb; if (i != Qb && !_setStyle(n, "boxShadow", i)) i = Qb; if (l != Qb && !_setStyle(n, "backgroundColor", l)) l = Qb; var w = Qb,
            x = Qb; if (p != Qb && !(_isIE && (_IEver <= 7 || _IEver <= 9 && _isBackCompat))) w = document.getElementById(p); if (q != Qb && !(_isIE && (_IEver <= 7 || _IEver <= 9 && _isBackCompat))) x = document.getElementById(q); var y = Qb; if (k.parentNode.tagName == "DIV") { var u = k.parentNode,
                o = u.currentStyle || document.defaultView.getComputedStyle(u, Ub); if (o.overflowX == Vb || o.overflowX == Sb || (o.overflowY == Vb || o.overflowY == Sb)) y = u } return new _FixedHeader(y, k, r, d, j, c, b, s, v, z, f, g, h, i, l, m, w, x) }

    function _onBodyScroll() { for (var a = 0; a < _fixedHeaders.length; a++) _fixedHeaders[a].onBodyScroll() }

    function _onBodyResize() {
        if (_execFlag) return;
        _resizeTimerId != Qb && clearTimeout(_resizeTimerId);
        var a = function() { _execute(n) };
        _resizeTimerId = setTimeout(a, 500)
    }

    function _execute(b) { _execFlag = Pb;
        _resizeTimerId = Qb; for (var a = 0; a < _fixedHeaders.length; a++)
            if (b == n) _fixedHeaders[a].initOnResize();
            else _fixedHeaders[a].init();
        _resizeSourceDiv(); for (var a = 0; a < _fixedHeaders.length; a++) _fixedHeaders[a].main();
        _execFlag = Nb }

    function _resizeSourceDiv() { for (var b = Nb, a = 0; a < _fixedHeaders.length; a++)
            if (_fixedHeaders[a].hideAllDivs(Pb)) b = Pb;
        if (!b) return; for (var a = 0; a < _fixedHeaders.length; a++) _fixedHeaders[a].resizeSourceDiv1(); var d = document.body.style.overflowX,
            c = document.body.currentStyle || document.defaultView.getComputedStyle(document.body, Ub); if (_body.scrollWidth <= _body.clientWidth && c.overflowX != Sb) document.body.style.overflowX = Wb; for (var a = 0; a < _fixedHeaders.length; a++) _fixedHeaders[a].resizeDivHeight(); for (var a = 0; a < _fixedHeaders.length; a++) _fixedHeaders[a].resizeDivWidth();
        document.body.style.overflowX = d; for (var a = 0; a < _fixedHeaders.length; a++) _fixedHeaders[a].resizeSourceDiv2(); for (var a = 0; a < _fixedHeaders.length; a++) _fixedHeaders[a].hideAllDivs(Nb) }

    function _FixedHeader(a, d, E, p, y, v, B, wb, Y, F, I, J, K, yb, P, ab, L, M) {
        var o = "CLIENT",
            j = "TBODY",
            g = "1px",
            q = this,
            f = a != Qb,
            b = Qb,
            c = Qb,
            e = Qb,
            qb = 0,
            pb = 0,
            gb = Ub,
            fb = Ub,
            T = Qb,
            V = Qb,
            u = [],
            xb = [],
            X = 0,
            eb = 0,
            Bb = d.style.zIndex ? d.style.zIndex : 0,
            r = Nb,
            x = Nb,
            k = 0,
            n = 0,
            Q = 0,
            R = 0,
            hb = 0,
            lb = 0,
            kb = 0,
            nb = 0,
            db = 0,
            cb = 0,
            W = 0,
            Hb = d.style.display,
            ib = Rb,
            mb = Rb,
            m = Qb,
            z = Rb,
            A = Rb,
            i = 0,
            l = 0,
            U = Qb,
            S = Qb;
        q.init = function() { if (P == Qb) { var e = f ? a : d,
                    b = _getBackgroundColor(e); if (b == Qb) { var c = e.parentNode; while (c) { b = _getBackgroundColor(c); if (b != Qb) break; if (c.tagName == "HTML") break;
                        c = c.parentNode } if (b == Qb) b = "white" }
                P = b } if (f) { _addEventListener(a, Sb, Z);
                Ib();
                W = _offsetWidth(d) } if (L) i = Math.max(_rect(L).bottom, 0); if (M) l = Math.max(_rect(M).right, 0);
            vb() };
        q.initOnResize = function() { A = Rb;
            z = Rb;
            mb = Rb;
            ib = Rb; if (L) i = Math.max(_rect(L).bottom, 0); if (M) l = Math.max(_rect(M).right, 0); if (f) { if (r || v > 0) a.style.width = Ub; if (x || B > 0) a.style.height = Ub;
                W = _offsetWidth(d) }
            vb() };
        q.removeAllTables = function(d) { b && w(b);
            c && w(c);
            e && w(e);
            b = Qb;
            c = Qb;
            e = Qb; if (f) { _removeEventListener(a, Sb, Z); if (d) { if (r || v > 0) a.style.width = Ub; if (x || B > 0) a.style.height = Ub } } };
        q.hideAllDivs = function(h) { if (!f) return Nb; var d = b == Qb ? Qb : b.parentNode,
                g = c == Qb ? Qb : c.parentNode,
                j = e == Qb ? Qb : e.parentNode; if (h) { d && H(d, DIV_MIN_WIDTH);
                g && G(g, DIV_MIN_HEIGHT) } var i = h ? Xb : Ub; if (d) d.style.display = i; if (g) g.style.display = i; if (j) j.style.display = i;
            (r || x || v > 0 || B > 0) && Eb(h); if (h) { r && t(a, DIV_MIN_WIDTH);
                x && D(a, DIV_MIN_HEIGHT) } return Pb };
        q.resizeSourceDiv1 = function() { if (!f) return; var e = m != Qb ? m : d; if (v > 0) { k = _body.clientWidth / 100 * v;
                k = Math.max(k, DIV_MIN_WIDTH); var c = _offsetWidth(e) + db;
                c = Math.min(c, k);
                t(a, c) } if (B > 0) { n = _body.clientHeight / 100 * B;
                n = Math.max(n, DIV_MIN_HEIGHT); var b = _offsetHeight(e) + cb;
                b = Math.min(b, n);
                D(a, b) } };
        q.resizeDivHeight = function() { if (!f) return; if (!x) return; if (_body.scrollHeight > _body.clientHeight) { var e = Math.max(_body.scrollHeight - _body.clientHeight, 0);
                a.style.height = Math.max(_body.clientHeight - 30, MIN_SIZE) + PX; var g = Math.max(_body.scrollHeight - _body.clientHeight, 0);
                n = _offsetHeight(a) - (g - e) } else { a.style.height = _body.clientHeight + PX; var h = Math.max(_body.scrollHeight - _body.clientHeight, 0);
                n = _offsetHeight(a) - h }
            n--;
            n = Math.max(n, DIV_MIN_HEIGHT); var c = m != Qb ? m : d,
                b = _offsetHeight(c) + cb;
            b = Math.min(b, n); if (wb) b = n;
            D(a, b) };
        q.resizeDivWidth = function() { if (!f) return; if (!r) return; if (_body.scrollWidth > _body.clientWidth) { var e = Math.max(_body.scrollWidth - _body.clientWidth, 0);
                a.style.width = Math.max(_body.clientWidth - 16, MIN_SIZE) + PX; var g = Math.max(_body.scrollWidth - _body.clientWidth, 0);
                k = _offsetWidth(a) - (g - e) } else { a.style.width = _body.clientWidth + PX; var h = Math.max(_body.scrollWidth - _body.clientWidth, 0);
                k = _offsetWidth(a) - h }
            k--;
            k = Math.max(k, DIV_MIN_WIDTH); var c = m != Qb ? m : d,
                b = _offsetWidth(c) + db;
            b = Math.min(b, k); if (wb) b = k; if (_isIE) b--;
            t(a, b) };
        q.resizeSourceDiv2 = function() { if (!f) return; var b = m != Qb ? m : d; if ((r || v > 0) && a.scrollWidth > a.clientWidth && _offsetWidth(a) < k) { var e = a.scrollWidth - a.clientWidth,
                    c = Math.min(_offsetWidth(a) + e, k),
                    i = a.style.overflowY; if (_isIE) a.style.overflowY = Wb;
                t(a, c); if (_isIE) a.style.overflowY = i } if ((x || B > 0) && a.scrollHeight > a.clientHeight && _offsetHeight(a) < n) { var e = a.scrollHeight - a.clientHeight,
                    g = Math.min(_offsetHeight(a) + e, n);
                D(a, g) } if ((r || v > 0) && W > _offsetWidth(b) && _offsetWidth(a) < k) { var h = W - _offsetWidth(b),
                    c = Math.min(_offsetWidth(a) + h, k);
                t(a, c) } };
        q.checkZoom = function() { if (Math.abs(_offsetWidth(d) - qb) >= 1 || Math.abs(_offsetHeight(d) - pb) >= 1 || _colsWidthList(_cells(d.rows[0])) != gb || _rowsHeightList(d.rows) != fb) return Pb };
        q.main = function() { var h = _offsetWidth(d),
                g = _offsetHeight(d),
                b = qb != h,
                a = pb != g;
            qb = h;
            pb = g; var c = _colsWidthList(_cells(d.rows[0])); if (gb != c) { gb = c;
                b = Pb } var e = _rowsHeightList(d.rows); if (fb != e) { fb = e;
                a = Pb } var i = Fb(b || a);
            (i || b || a) && Gb();
            f && Kb(); if (f) { tb();
                Z() } else jb(Pb) };

        function Fb(l) { if (l) { b != Qb && w(b);
                c != Qb && w(c);
                e != Qb && w(e);
                b = Qb;
                c = Qb;
                e = Qb } var i = Nb,
                j = d.rows,
                k = f ? d.parentNode : _body,
                h = Nb,
                g = Nb; if (f) { h = a.clientHeight < a.scrollHeight && a.clientHeight != 0;
                g = a.clientWidth < a.scrollWidth && a.clientWidth != 0 } if (!f || DIV_BODY_SCROLL != 0) { if (!h) h = _body.clientHeight < _body.scrollHeight; if (!g) g = _body.clientWidth < _body.scrollWidth; if (!h && !g && _body == document.documentElement) { h = document.body.clientHeight < document.body.scrollHeight;
                    g = document.body.clientWidth < document.body.scrollWidth } } if (p > 0 && h)
                if (_rowsHeight(j, p) + 30 >= k.clientHeight) h = Nb;
            if (y > 0 && g) { var m = _cells(j[0]); if (_colsWidth(m, y) + 30 >= k.clientWidth) g = Nb } if (y > 0 && g) { if (c == Qb) { c = ob(TID_NUMBER, j.length, y); if (c != Qb) i = Pb } } else if (c != Qb) { w(c);
                c = Qb } if (p > 0 && h) { if (b == Qb) { b = ob(TID_HEADER, p, E); if (b != Qb) i = Pb } } else if (b != Qb) { w(b);
                b = Qb } if (b != Qb && c != Qb) { if (e == Qb) { e = ob(TID_CORNER, p, y);
                    i = Pb } } else if (e != Qb) { w(e);
                e = Qb } return i }

        function Gb() { if (b != Qb) { t(b, _offsetWidth(d));
                bb(b) } if (c != Qb) { var g = _colsWidth(_cells(d.rows[0]), y),
                    f = _colsWidth(_cells(c.rows[0]), y),
                    a = f - g;
                a != 0 && t(c, _offsetWidth(c) - a);
                bb(c);
                D(c, _offsetHeight(d)) } if (e != Qb) { t(e, _offsetWidth(c));
                bb(e);
                D(e, _offsetHeight(b)) } }

        function Kb() { var j = 1,
                d = b == Qb ? Qb : b.parentNode,
                f = c == Qb ? Qb : c.parentNode,
                g = e == Qb ? Qb : e.parentNode;
            d != Qb && s(d);
            f != Qb && s(f);
            g != Qb && s(g); if (d != Qb) { H(d, a.clientWidth);
                G(d, _offsetHeight(b)); var i = _rect(b).bottom - _rect(d).bottom;
                i > 0 && G(d, _offsetHeight(b) + i);
                d.clientHeight >= a.clientHeight && G(d, a.clientHeight - j) } if (f != Qb) { G(f, a.clientHeight);
                H(f, _offsetWidth(c)); var h = _rect(c).right - _rect(f).right;
                h > 0 && H(f, _offsetWidth(c) + h);
                f.clientWidth >= a.clientWidth && H(f, a.clientWidth - j) } if (g != Qb) { G(g, d.clientHeight);
                H(g, f.clientWidth) } }

        function Ib() { var b = a.cloneNode(Nb),
                c = d.cloneNode(Nb);
            b.style.position = Yb;
            b.style.left = Zb;
            b.style.top = Zb;
            b.style.minWidth = g;
            b.style.minHeight = g;
            a.parentNode.appendChild(b); var e = document.createElement("DIV");
            e.style.position = Yb;
            e.style.left = Zb;
            e.style.top = Zb;
            a.parentNode.appendChild(e); var i = _rect(a),
                f = _rect(b);
            R = i.top - f.top;
            Q = i.left - f.left;
            c.style.width = "50px";
            c.style.height = "50px"; var k = document.createElement(j),
                m = document.createElement("TR"),
                l = document.createElement("TD");
            l.appendChild(document.createTextNode("x"));
            m.appendChild(l);
            k.appendChild(m);
            c.appendChild(k); var o = b.offsetWidth,
                n = b.offsetHeight;
            b.appendChild(c);
            r = b.offsetWidth != o;
            x = b.offsetHeight != n; if (r) { if (v > 0 || Y != Ob && Y != "width") r = Nb } else v = Rb; if (x) { if (B > 0 || Y != Ob && Y != "height") x = Nb } else B = Rb;
            db = _offsetWidth(b) - _offsetWidth(c);
            cb = _offsetHeight(b) - _offsetHeight(c); var h = _rect(e);
            lb = f.top - h.top;
            hb = f.left - h.left;
            nb = _rect(c).top - f.top;
            kb = _rect(c).left - f.left;
            b.parentNode.removeChild(b);
            e.parentNode.removeChild(e) }

        function vb() { if (p == 0 && y == 0) return; var a = d.cloneNode(Nb);
            a.style.position = Yb;
            a.style.left = Zb;
            a.style.top = Zb;
            a.style.width = Vb;
            a.style.height = Vb;
            a.width = Ub;
            a.height = Ub; var i, m = _getElementByTagName(d, Tb); if (m == Qb) m = _getElementByTagName(d, j); if (m != Qb) i = m.cloneNode(Nb);
            else i = document.createElement(j);
            a.appendChild(i);
            d.parentNode.appendChild(a); for (var x = Jb(), v = p > 0 ? p : 1, t = d.rows, q = 0, c = 0; c < v; c++) { var o = t[c],
                    n = o.cloneNode(Nb);
                n.style.height = _trHeight(o) + PX; for (var l = _cells(o), f = 0; f < l.length; f++) { var e = l[f],
                        b = e.cloneNode(Nb);
                    b.width = Ub; if (e.colSpan == 1) b.style.width = q + PX;
                    else { for (var s = Pb, r = 1; r < e.colSpan; r++)
                            if (!x[e.$FXH_COLINDEX + r]) { s = Nb; break }
                        if (s) b.style.width = Vb;
                        else b.style.width = q + PX }
                    b.appendChild(document.createTextNode(" "));
                    n.appendChild(b) }
                i.appendChild(n); if (_isIE && _IEver <= 7 && !_isBackCompat) { X = _trHeight(n) - _trHeight(o);
                    X += 2 } } for (var c = 0; c < v; c++)
                for (var l = _cells(t[c]), w = _cells(i.rows[c]), f = 0; f < l.length; f++) { var e = l[f],
                        b = w[f]; if (b.style.width == Vb) continue; var h = c + "." + e.cellIndex;
                    xb[h] = _offsetWidth(b) - b.clientWidth;
                    u[h] = b.clientWidth - q; var g = e.currentStyle || document.defaultView.getComputedStyle(e, Ub),
                        k = Rb; if (g.paddingLeft.match(/px$/) != Qb && g.paddingRight.match(/px$/) != Qb) k = _pixel(g.paddingLeft) + _pixel(g.paddingRight);
                    else if (g.padding.match(/px$/) != Qb) k = _pixel(g.padding) * 2; if (k > 0) u[h] = Math.min(u[h], k);
                    eb = Math.max(u[h], eb) }
            a.parentNode.removeChild(a) }

        function Jb() { for (var g = p > 0 ? p : 1, l = d.rows, f = new Array(g), b = 0; b < g; b++) { f[b] = new Array(E); for (var a = 0; a < E; a++) f[b][a] = Pb } for (var b = 0; b < g; b++)
                for (var m = l[b], i = _cells(m), h = 0, a = 0; a < E;) { if (!f[b][a]) { a++; continue } if (h >= i.length) break; var e = i[h]; if (e.rowSpan >= 2 && e.colSpan >= 2)
                        for (var c = 0; c < e.rowSpan; c++) { if (b + c >= g) break; for (var j = 0; j < e.colSpan; j++) { if (c == 0 && j == 0) continue;
                                f[b + c][a + j] = Nb } } else { if (e.rowSpan >= 2)
                                for (var c = 1; c < e.rowSpan; c++) { if (b + c >= g) break;
                                    f[b + c][a] = Nb }
                            if (e.colSpan >= 2)
                                for (var c = 1; c < e.colSpan; c++) f[b][a + c] = Nb }
                    h++;
                    a += e.colSpan }
            for (var k = new Array(E), a = 0; a < E; a++) k[a] = Nb; for (var b = 0; b < g; b++)
                for (var m = l[b], i = _cells(m), h = 0, a = 0; a < E; a++) { if (!f[b][a]) continue; if (h >= i.length) break; var e = i[h];
                    e.$FXH_COLINDEX = a; if (e.colSpan == 1) k[a] = Pb;
                    h++ }
            return k }

        function ob(e, v, x) { var n = " fixed_header_display_none_at_print",
                c = d.cloneNode(Nb),
                r = _getElementByTagName(d, "CAPTION"),
                s = _getElementByTagName(d, Tb),
                u = _getElementByTagName(d, j),
                k = Qb,
                p = Qb,
                o = Qb; if (r != Qb) { k = r.cloneNode(Pb);
                k.style.backgroundColor = P;
                k.style.overflow = Wb; if (e != TID_HEADER) { k.innerHTML = "&nbsp;";
                    k.style.height = _offsetHeight(r) + PX;
                    k.style.backgroundColor = ac }
                c.appendChild(k) } var t = 0; if (s != Qb) { p = s.cloneNode(Nb);
                c.appendChild(p);
                t = s.rows.length } if (u != Qb && t < v) { o = u.cloneNode(Nb);
                c.appendChild(o) } if (Lb(c, o, p, e, v, x, t) == Nb) return Qb;
            _linkElement(c, d, e, F, Nb);
            k != Qb && _linkElement(k, r, e, F, Pb);
            p != Qb && _linkElement(p, s, e, F, Nb);
            o != Qb && _linkElement(o, u, e, F, Nb); if (e != TID_HEADER) { c.style.marginRight = Zb;
                c.style.borderRightWidth = Zb;
                c.style.paddingRight = Zb } if (e != TID_NUMBER) { c.style.marginBottom = Zb;
                c.style.borderBottomWidth = Zb;
                c.style.paddingBottom = Zb }
            c.style.minWidth = g;
            c.style.minHeight = g; var m = Qb; if (yb != Qb) { var w = yb.split(" ");
                m = Ub; for (var q = 0; q < w.length; q++)
                    if (q == 0 && e == TID_HEADER) m += "0 ";
                    else if (q == 1 && e == TID_NUMBER) m += "0 ";
                else m += w[q] + " " } if (f) { var b = a.cloneNode(Nb);
                b.$FXH_PADDING_WIDTH = undefined;
                b.$FXH_PADDING_HEIGHT = undefined;
                _linkElement(b, a, e, F, Nb);
                b.className += n;
                b.style.overflowX = Wb;
                b.style.overflowY = Wb;
                _removeEventListener(b, Sb, Z);
                e != TID_CORNER && _addEventListener(b, Sb, function() { Db(b, e) }); if (e == TID_HEADER) b.style.borderRightWidth = Zb;
                else { b.style.marginRight = Zb;
                    b.style.borderRightWidth = Zb;
                    b.style.paddingRight = Zb } if (e == TID_NUMBER) b.style.borderBottomWidth = Zb;
                else { b.style.marginBottom = Zb;
                    b.style.borderBottomWidth = Zb;
                    b.style.paddingBottom = Zb }
                b.style.width = "30px";
                b.style.height = "30px";
                b.style.minWidth = g;
                b.style.minHeight = g; if (m != Qb) b.style.boxShadow = m;
                b.style.position = Yb;
                b.style.top = R + PX;
                b.style.left = Q + PX;
                b.style.backgroundColor = P;
                b.appendChild(c);
                a.parentNode.appendChild(b) } else { c.className += n; if (m != Qb) c.style.boxShadow = m; switch (_positionMode) {
                    case POS_FIXED:
                        c.style.position = bc; break;
                    case POS_ABSOLUTE:
                        c.style.position = Yb; break;
                    default:
                        c.style.position = bc }
                c.style.marginTop = Zb;
                c.style.marginLeft = Zb;
                c.style.top = i + PX;
                c.style.left = l + PX;
                c.style.backgroundColor = P;
                d.parentNode.appendChild(c) }
            _isOpera && h(f ? b : c, Nb); return c }

        function Lb(v, w, C, g, x, q, z) { for (var f = new Array(q), h = 0; h < f.length; h++) f[h] = 0; for (var s = d.rows, c = 0; c < x; c++) { var k = s[c],
                    b = k.cloneNode(Nb);
                _linkElement(b, k, g, F, Nb);
                b.style.height = _trHeight(k) - X + PX; if (c == p - 1 && g != TID_NUMBER) { if (I != Qb) b.style.borderBottomColor = I; if (J != Qb) b.style.borderBottomStyle = J; if (K != Qb) b.style.borderBottomWidth = K } if (g != TID_HEADER) b.style.borderRightWidth = Zb; if (c < z) C.appendChild(b);
                else if (w != Qb) w.appendChild(b);
                else v.appendChild(b); for (var t = _cells(k), l = 0, e = 0; e < q;) { if (c < f[e]) { e++; continue } if (l >= t.length) break; var a = t[l];
                    l++; if (c + a.rowSpan > x) return Nb;
                    f[e] = c + a.rowSpan; if (a.colSpan >= 2) { for (var h = 1; h < a.colSpan; h++) f[e + h] = f[e]; if (e + a.colSpan > q) return Nb }
                    _radioCtl(a, "backup"); var j = a.cloneNode(Pb);
                    _radioCtl(a, "restore");
                    _linkElement(j, a, g, F, Pb);
                    b.appendChild(j); try { var o = c + "." + a.cellIndex; if (u[o] != undefined) { var D = u[o] + xb[o];
                            j.style.width = _offsetWidth(a) - D + PX } else if (_isIE && _IEver <= 8 && a.colSpan >= 2) j.style.width = a.clientWidth - eb + PX } catch (E) {} var i = j.style; if (c + a.rowSpan == p && g != TID_NUMBER) { if (I != Qb) i.borderBottomColor = I; if (J != Qb) i.borderBottomStyle = J; if (K != Qb) i.borderBottomWidth = K } if (e + a.colSpan == y && g != TID_HEADER) { if (I != Qb) i.borderRightColor = I; if (J != Qb) i.borderRightStyle = J; if (K != Qb) i.borderRightWidth = K }
                    e += a.colSpan } if (_isIE && _IEver <= 9 && l == 0) { b.style.height = Zb; var A = _rect(k).bottom,
                        m = b.parentNode; if (m.tagName != "TABLE") m = m.parentNode; var r = m.rows,
                        n = c - 1; while (r[n].style.height == Zb) n--; var B = A - _rect(s[n]).top;
                    r[n].style.height = B - X + PX } }
            _radioCtl(v, "sync"); return Pb }

        function s(b) { if (b.style.position == bc) return; var f = _rect(a),
                e = _rect(b),
                d = e.top - f.top,
                c = e.left - f.left; if (_isIE) { if (d == Rb && b.$TOP_DIFF == 1) d = 0;
                else b.$TOP_DIFF = d; if (c == Rb && b.$LEFT_DIFF == 1) c = 0;
                else b.$LEFT_DIFF = c } if (Math.abs(d) >= 1) b.style.top = _pixel(b.style.top) - d + PX; if (Math.abs(c) >= 1) b.style.left = _pixel(b.style.left) - c + PX }

        function w(a) { if (f) a = a.parentNode;
            _unlinkElement(a);
            a.parentNode && a.parentNode.removeChild(a) }
        q.onBodyScroll = function() { if (L) i = Math.max(_rect(L).bottom, 0); if (M) l = Math.max(_rect(M).right, 0); if (f) { tb(); return } if (_positionMode == POS_ABSOLUTE) { if (!_isMobile) { if (_getBodyScrollTop() != A) { h(b, Nb);
                        h(e, Nb) } if (_getBodyScrollLeft() != z) { h(c, Nb);
                        h(e, Nb) } }
                U != Qb && clearTimeout(U);
                U = setTimeout(jb, 200) } else jb() };

        function jb(k) { U = Qb; var j = _getBodyScrollTop() != A,
                g = _getBodyScrollLeft() != z;
            A = _getBodyScrollTop();
            z = _getBodyScrollLeft(); if (j && g) k = Pb; var f = _rect(d),
                o = b != Qb && f.top < i && f.bottom >= b.offsetHeight + i,
                p = c != Qb && f.left < l && f.right >= c.offsetWidth + l;
            b != Qb && h(b, o);
            c != Qb && h(c, p);
            e != Qb && h(e, o && p); if (_positionMode == POS_MIX && b != Qb) { var a = b.style; if (k || j && a.position == Yb) { a.position = bc;
                    a.left = f.left + PX;
                    a.top = i + PX; if (e != Qb) e.style.top = a.top;
                    N(Nb) } else if (!j && g && a.position == bc) { a.position = Yb;
                    a.left = z + f.left + PX;
                    a.top = A + i + PX;
                    ub() } } if (_positionMode == POS_MIX && c != Qb) { var a = c.style; if (k || g && a.position == Yb) { a.position = bc;
                    a.left = l + PX;
                    a.top = f.top + PX;
                    O(Nb) } else if (!g && j && a.position == bc) { a.position = Yb;
                    a.left = z + l + PX;
                    a.top = A + f.top + PX;
                    sb() } } if (_positionMode == POS_FIXED) { if (b != Qb && g) b.style.left = f.left + PX; if (c != Qb && j) c.style.top = f.top + PX; if (b != Qb && b.style.top != i + PX) { b.style.top = i + PX; if (e != Qb) e.style.top = b.style.top } } if (_positionMode == POS_ABSOLUTE && k) { if (b != Qb) b.style.left = z + f.left + PX; if (c != Qb) c.style.top = A + f.top + PX } if (_positionMode == POS_ABSOLUTE && (j || g)) { var n, m, q = _isMobile ? 1 : 4; if (b != Qb && j) { b.style.top = i + A - _offsetHeight(b) + PX; if (e != Qb) e.style.top = b.style.top;
                    n = _offsetHeight(b) / q } if (c != Qb && g) { c.style.left = l + z - _offsetWidth(c) + PX; if (e != Qb) e.style.left = c.style.left;
                    m = _offsetWidth(c) / q }
                S != Qb && clearTimeout(S);
                rb(j, g, n, m) }
            b != Qb && g && N(Nb);
            c != Qb && j && O(Nb) }

        function rb(m, j, k, h) {
            S = Qb;
            var g = _getBodyScrollTop() + i,
                f = _getBodyScrollLeft() + l,
                d = g,
                a = f;
            if (b != Qb && m) { d = _pixel(b.style.top) + k; if (k > 0) d = Math.min(d, g);
                else d = Math.max(d, g);
                b.style.top = d + PX; if (e != Qb) e.style.top = b.style.top }
            if (c != Qb && j) { a = _pixel(c.style.left) + h; if (h > 0) a = Math.min(a, f);
                else a = Math.max(a, f);
                c.style.left = a + PX; if (e != Qb) e.style.left = c.style.left }
            if (g == d && f == a) { if (b != Qb && m) { ub(); if (e != Qb) e.style.top = b.style.top } if (c != Qb && j) { sb(); if (e != Qb) e.style.left = c.style.left } return }
            var n = function() { rb(m, j, k, h) };
            S = setTimeout(n, 20)
        }

        function tb() { if (DIV_BODY_SCROLL == 0) return; if (_positionMode == POS_ABSOLUTE) return; var f = b == Qb ? Qb : b.parentNode,
                g = c == Qb ? Qb : c.parentNode,
                j = e == Qb ? Qb : e.parentNode,
                k = _rect(a),
                o = _rect(d),
                p = 0; if (_isIE11) p = 1; var m = Nb,
                n = Nb; if (f && (DIV_BODY_SCROLL == 2 || a.scrollHeight - p <= a.clientHeight)) { var q = Math.min(k.bottom, o.bottom); if (k.top < i - nb && q >= _offsetHeight(b)) { if (f.style.position != bc) { f.style.position = bc;
                        f.style.top = i - lb - nb + PX }
                    f.style.left = k.left - hb + PX;
                    h(f, Pb);
                    m = Pb } else { if (f.style.position != Yb) { f.style.position = Yb;
                        f.style.top = R + PX;
                        f.style.left = Q + PX }
                    h(f, a.scrollTop > 0);
                    s(f) }
                C(f) && N(Nb) } if (g && (DIV_BODY_SCROLL == 2 || a.scrollWidth <= a.clientWidth)) { var r = Math.min(k.right, o.right); if (k.left < l - kb && r >= _offsetWidth(c)) { if (g.style.position != bc) { g.style.position = bc;
                        g.style.left = l - hb - kb + PX }
                    g.style.top = k.top - lb + PX;
                    h(g, Pb);
                    n = Pb } else { if (g.style.position != Yb) { g.style.position = Yb;
                        g.style.top = R + PX;
                        g.style.left = Q + PX }
                    h(g, a.scrollLeft > 0);
                    s(g) }
                C(g) && O(Nb) } if (j) { if (m || n) { if (j.style.position != bc) j.style.position = bc; if (m) j.style.top = f.style.top;
                    else j.style.top = g.style.top; if (n) j.style.left = g.style.left;
                    else j.style.left = f.style.left } else if (j.style.position != Yb) { j.style.position = Yb;
                    j.style.top = R + PX;
                    j.style.left = Q + PX;
                    s(j) }
                h(j, C(f) && C(g)) } }

        function Z() { var d = b == Qb ? Qb : b.parentNode,
                f = c == Qb ? Qb : c.parentNode,
                g = e == Qb ? Qb : e.parentNode,
                i = d && d.style.position == bc,
                k = f && f.style.position == bc;
            h(d, a.scrollTop > 0 || i);
            h(f, a.scrollLeft > 0 || k);
            h(g, C(d) && C(f));
            d != Qb && s(d);
            f != Qb && s(f);
            g != Qb && s(g); var j = a.scrollLeft != ib,
                l = a.scrollTop != mb;
            ib = a.scrollLeft;
            mb = a.scrollTop; if (d != Qb && j) { d.$FXH_SCROLL_LEFT = a.scrollLeft;
                d.scrollLeft = a.scrollLeft;
                d.scrollLeft > 0 && N(Nb) } if (f != Qb && l) { f.$FXH_SCROLL_TOP = a.scrollTop;
                f.scrollTop = a.scrollTop;
                f.scrollTop > 0 && O(Nb) } }

        function Db(b, c) { if (c == TID_HEADER) { if (Math.abs(b.scrollLeft - b.$FXH_SCROLL_LEFT) < 5) return } else if (Math.abs(b.scrollTop - b.$FXH_SCROLL_TOP) < 5) return; if (c == TID_HEADER) a.scrollLeft = b.scrollLeft;
            else a.scrollTop = b.scrollTop }

        function ub() { if (b == Qb) return; var a = _rect(b); if (a.top <= i) return;
            b.style.top = i + _pixel(b.style.top) - a.top + PX }

        function sb() { if (c == Qb) return; var a = _rect(c); if (a.left <= l) return;
            c.style.left = l + _pixel(c.style.left) - a.left + PX }

        function N(q) { if (b == Qb) return; if (!q) { T != Qb && clearTimeout(T);
                T = setTimeout(function() { N(Pb) }, 200); return }
            T = Qb; var h, j; if (f) { h = _rect(a).left;
                j = h + a.clientWidth } else { h = 0;
                j = _body.clientWidth } if (C(c)) h += _offsetWidth(c); for (var m = _cells(d.rows[0]), o = _cells(b.rows[0]), e = 0, l = 0, i = 0; i < m.length; i++) { var k = _rect(m[i]).left; if (k < h) continue; if (k > j) break; var p = _rect(o[i]).left;
                e += p - k;
                l++ } if (l == 0) return; if (e == 0) return;
            e = e / l;
            e = Math.round(e); if (e == 0) return; if (f) { var g = b.parentNode; if (g.style.position == bc) { var n = _pixel(g.style.left) - e;
                    g.style.left = n + PX } else { g.$FXH_SCROLL_LEFT = g.scrollLeft + e;
                    g.scrollLeft += e } } else { var n = _pixel(b.style.left) - e;
                b.style.left = n + PX } }

        function O(p) { if (c == Qb) return; if (_isOpera) return; if (!p) { V != Qb && clearTimeout(V);
                V = setTimeout(function() { O(Pb) }, 200); return }
            V = Qb; var h, j; if (f) { h = _rect(a).top;
                j = h + a.clientHeight } else { h = 0;
                j = _body.clientHeight } if (C(b)) h += _offsetHeight(b); for (var n = d.rows, m = c.rows, e = 0, l = 0, i = 0; i < n.length; i++) { var k = _rect(n[i]).top; if (k < h) continue; if (k > j) break; if (_cells(m[i]).length == 0) continue; var q = _rect(m[i]).top;
                e += q - k;
                l++ } if (l == 0) return; if (e == 0) return;
            e = e / l;
            e = Math.round(e); if (e == 0) return; if (f) { var g = c.parentNode; if (g.style.position == bc) { var o = _pixel(g.style.top) - e;
                    g.style.top = o + PX } else { g.$FXH_SCROLL_TOP = g.scrollTop + e;
                    g.scrollTop += e } } else { var o = _pixel(c.style.top) - e;
                c.style.top = o + PX } }

        function C(a) { return a != Qb && a.style.visibility == "visible" }

        function h(a, b) { if (a == Qb) return; var c = b ? "visible" : Wb; if (a.style.visibility == c) return;
            a.style.visibility = c; if (_isIE) a.style.zIndex = b ? Bb : Bb - 1; if (_isOpera) a.style.opacity = b ? ab : 0; if (b && ab < 1) { a.style.opacity = ab;
                a.style.filter = "alpha(opacity=" + ab * 100 + ")" } }

        function Eb(b) { if (!_isIE && !_isIE11 && !_isFirefox && !_isOpera) return; if (b) { m = Cb();
                a.appendChild(m);
                t(m, _offsetWidth(d));
                D(m, _offsetHeight(d));
                d.style.display = Xb } else { d.style.display = Hb;
                a.removeChild(m);
                m = Qb } }

        function Cb() { var a = d.cloneNode(Nb),
                b = document.createElement(j),
                e = document.createElement("TR"),
                c = document.createElement("TD");
            c.appendChild(document.createTextNode("dummy"));
            e.appendChild(c);
            b.appendChild(e);
            a.appendChild(b); return a }

        function H(a, b) { Ab(a, o, b) }

        function t(a, b) { Ab(a, "OFFSET", b) }

        function G(a, b) { zb(a, o, b) }

        function D(a, b) { zb(a, "OFFSET", b) }

        function Ab(a, g, f) { var b = f; if (a.$FXH_PADDING_WIDTH != undefined) b -= a.$FXH_PADDING_WIDTH; for (var d, c, e = 0; e < 2; e++) { if (b < MIN_SIZE) b = MIN_SIZE;
                a.style.width = b + PX;
                d = g == o ? a.clientWidth : _offsetWidth(a);
                c = d - f; if (a.$FXH_PADDING_WIDTH == undefined) a.$FXH_PADDING_WIDTH = c; if (c == 0 || b == MIN_SIZE) break;
                b -= c } }

        function zb(a, g, e) { var b = e; if (a.$FXH_PADDING_HEIGHT != undefined) b -= a.$FXH_PADDING_HEIGHT; for (var d, c, f = 0; f < 2; f++) { if (b < MIN_SIZE) b = MIN_SIZE;
                a.style.height = b + PX;
                d = g == o ? a.clientHeight : _offsetHeight(a);
                c = d - e; if (a.$FXH_PADDING_HEIGHT == undefined) a.$FXH_PADDING_HEIGHT = c; if (c == 0 || b == MIN_SIZE) break;
                b -= c } }

        function bb(p) { var g = d.rows,
                c = p.rows,
                e = c.length,
                k = _rowsHeight(g, e) + HEIGHT_MARGIN; if (_rowsHeight(c, e) < k) return; for (var a = 0; a < e; a++) { var q = _trHeight(c[a]) - _trHeight(g[a]); if (q < HEIGHT_MARGIN) continue; for (var o = _cells(g[a]), j = _cells(c[a]), f = 0; f < j.length; f++) { var l = o[f],
                        i = j[f],
                        b = 0,
                        h = a + "." + l.cellIndex; if (u[h] != undefined) { if (u[h] <= 0) continue;
                        b = u[h] - 2; if (b < 0) b = 0 } var n = Math.ceil(b / 2),
                        m = Math.floor(b / 2);
                    i.style.paddingLeft = n + PX;
                    i.style.paddingRight = m + PX;
                    i.style.width = l.clientWidth - b + PX; if (_rowsHeight(c, e) < k) return } } }
    }

    function _FixedElementList() {
        var b = this,
            a = [];
        b.add = function(b) { a.push(b) };
        b.remove = function(c) { for (var b = 0; b < a.length; b++)
                if (a[b] == c) { a.splice(b, 1); return } };
        b.get = function(d) { for (var b = 0; b < a.length; b++) { var c = a[b]; if (c.$SOURCE_ELEMENT == d) return c } return Qb };
        b.getAll = function(e) { for (var b = Qb, c = 0; c < a.length; c++) { var d = a[c]; if (d.$SOURCE_ELEMENT == e) { if (b == Qb) b = [];
                    b.push(d) } } return b }
    }

    function _linkElement(b, a, i, g, f) { a.id && !g && b.removeAttribute("id"); if (a.name)
            if (a.tagName == j && a.type == k) b.name = RADIO_PREFIX + i + "_" + a.name;
            else b.removeAttribute("name");
        b.$SOURCE_ELEMENT = a; if (_fixedList != Qb) _fixedList.add(b);
        else if (!a.$FXH_FIXED_ELEMENT) a.$FXH_FIXED_ELEMENT = b;
        else { var h = a.$FXH_FIXED_ELEMENT; if (!h.$IS_ARRAY) { var d = [];
                d.$IS_ARRAY = Pb;
                a.$FXH_FIXED_ELEMENT = d;
                d.push(h) }
            a.$FXH_FIXED_ELEMENT.push(b) }
        _setEventHandler(b, a); if (f)
            for (var c = 0; c < b.childNodes.length; c++) { var e = b.childNodes[c]; if (!e) continue; if (!e.tagName) continue;
                _linkElement(e, a.childNodes[c], i, g, f) } }

    function _unlinkElement(c) { if (_fixedList != Qb) { _fixedList.remove(c); var a = c.$SOURCE_ELEMENT; if (a && a.$FXH_ON_CHANGE_FUNC && _fixedList.get(a) == Qb) { _removeEventListener(a, g, a.$FXH_ON_CHANGE_FUNC);
                a.$FXH_ON_CHANGE_FUNC = undefined } } else { var a = c.$SOURCE_ELEMENT; if (a && a.$FXH_FIXED_ELEMENT) { var d = a.$FXH_FIXED_ELEMENT; if (!d.$IS_ARRAY || d.length == 1) { a.$FXH_FIXED_ELEMENT = undefined; if (a.$FXH_ON_CHANGE_FUNC) { _removeEventListener(a, g, a.$FXH_ON_CHANGE_FUNC);
                        a.$FXH_ON_CHANGE_FUNC = undefined } } else { for (var f = [], b = 0; b < d.length; b++) d[b] != c && f.push(d[b]);
                    a.$FXH_FIXED_ELEMENT = f } } } for (var b = 0; b < c.childNodes.length; b++) { var e = c.childNodes[b]; if (!e) continue; if (!e.tagName) continue;
            _unlinkElement(e) } }

    function _setEventHandler(b, a) {
        if (a.onclick) b.onclick = function() { return a.onclick() };
        if (a.ondblclick) b.ondblclick = function() { return a.ondblclick() };
        if (a.onkeydown) b.onkeydown = function() { return a.onkeydown() };
        if (a.onkeypress) b.onkeypress = function() { return a.onkeypress() };
        if (a.onkeyup) b.onkeyup = function() { return a.onkeyup() };
        if (a.onmousedown) b.onmousedown = function() { return a.onmousedown() };
        if (a.onmouseup) b.onmouseup = function() { return a.onmouseup() };
        if (a.onmouseover) b.onmouseover = function() { return a.onmouseover() };
        if (a.onmouseout) b.onmouseout = function() { return a.onmouseout() };
        if (a.onmousemove) b.onmousemove = function() { return a.onmousemove() };
        if (a.tagName == j || a.tagName == "SELECT" || a.tagName == "TEXTAREA") {
            switch (a.type) {
                case e:
                case f:
                case h:
                    _copyValue(a, b) }
            switch (a.type) {
                case h:
                case k:
                case e:
                case f:
                case "text":
                case i:
                case l:
                    b.onclick = function() { _copyValue(b, a);
                        _copyValues(a, b); if (a.onclick) return a.onclick(); return Pb };
                    b.onchange = function() { _copyValue(b, a);
                        _copyValues(a, b); if (a.onchange) return a.onchange(); return Pb };
                    if (a.$FXH_ON_CHANGE_FUNC == undefined) {
                        a.$FXH_ON_CHANGE_FUNC = function() { _copyValues(a) };
                        _addEventListener(a, g, a.$FXH_ON_CHANGE_FUNC)
                    }
                    break;
                case "button":
                case "submit":
                case "image":
                case "reset":
                    b.onclick = function() { a.click() }
            }
            if (a.form && a.$FXH_ON_RESET_FUNC == undefined) {
                a.$FXH_ON_RESET_FUNC = function() { for (var b = 0; b < a.form.elements.length; b++) _copyValues(a.form.elements[b]) };
                _addEventListener(a.form, "reset", function() { setTimeout(a.$FXH_ON_RESET_FUNC, 30) })
            }
        } else if (a.tagName == "FORM") b.onsubmit = function() { return Nb }
    }

    function _copyValues(d, c) { if (c == undefined) c = Qb; var a; if (_fixedList != Qb) { a = _fixedList.getAll(d); if (!a) return; for (var b = 0; b < a.length; b++) { if (a[b] == c) continue;
                _copyValue(d, a[b]) } return }
        a = d.$FXH_FIXED_ELEMENT; if (!a) return; if (!a.$IS_ARRAY) a != c && _copyValue(d, a);
        else
            for (var b = 0; b < a.length; b++) { if (a[b] == c) continue;
                _copyValue(d, a[b]) } }

    function _copyValue(a, b) { switch (a.type) {
            case h:
            case k:
                b.checked = a.checked; break;
            case e:
            case f:
                for (var c = 0; c < a.length; c++) b.options[c].selected = a.options[c].selected;
                b.selectedIndex = a.selectedIndex; break;
            case "text":
            case i:
            case l:
                b.value = a.value; break;
            default:
                try { b.value = a.value } catch (d) {} } }

    function _copyStyle(src, dst, styleName) { for (var buf = styleName.split(","), i = 0; i < buf.length; i++) { var name = _trim(buf[i]); try { eval("dst.style." + name + " = src.style." + name) } catch (e) {} } }

    function _setStyle(element, styleName, value) { try { eval("element.style." + styleName + " = value"); return Pb } catch (e) { return Nb } }

    function _radioCtl(d, e) { for (var c = d.getElementsByTagName(j), b = 0; b < c.length; b++) { var a = c[b]; if (a.type != k) continue; switch (e) {
                case "backup":
                    a.$FXH_CHECKED = a.checked; break;
                case "restore":
                    a.checked = a.$FXH_CHECKED; break;
                case "sync":
                    a.checked = a.$SOURCE_ELEMENT.checked } } }

    function _createCSS(c, b) { var a = document.createElement("STYLE");
        a.setAttribute("type", "text/css");
        a.setAttribute("media", c); if (a.styleSheet) a.styleSheet.cssText = b;
        else a.appendChild(document.createTextNode(b));
        document.body.appendChild(a) }

    function _getBackgroundColor(d) { var e = d.currentStyle || document.defaultView.getComputedStyle(d, Ub),
            a = e.backgroundColor; if (a == ac) return Qb; if (a.match(/^rgba\(/) == Qb) return a; var g = a.replace(/^rgba\(/, Ub).replace(/\)/, Ub),
            c = g.split(","),
            b = Number(c[3]); if (b == 1) return a; var f = "rgb(" + _color(Number(c[0]), b) + ", " + _color(Number(c[1]), b) + ", " + _color(Number(c[2]), b) + ")"; return f }

    function _color(a, b) { var c = Math.round(a + (255 - a) * (1 - b)); return Math.min(c, 255) }

    function _addEventListener(a, b, c) { if (a.addEventListener) a.addEventListener(b, c, Nb);
        else a.attachEvent && a.attachEvent("on" + b, c) }

    function _removeEventListener(a, b, c) { if (a.removeEventListener) a.removeEventListener(b, c, Nb);
        else a.detachEvent && a.detachEvent("on" + b, c) }

    function _getBodyScrollTop() { if (_isBackCompat) return document.body.scrollTop; if (_isChrome || _isSafari) return document.body.scrollTop; return document.documentElement.scrollTop }

    function _getBodyScrollLeft() { if (_isBackCompat) return document.body.scrollLeft; if (_isChrome || _isSafari) return document.body.scrollLeft; return document.documentElement.scrollLeft }

    function _offsetWidth(b) { var a = _rect(b); return a.right - a.left }

    function _offsetHeight(b) { var a = _rect(b); return a.bottom - a.top }

    function _rowsHeight(a, b) { return _rect(a[b - 1]).bottom - _rect(a[0]).top }

    function _colsWidth(a, c) { for (var d = 0, b = 0; b < a.length; b++) { d += a[b].colSpan; if (d == c) { c = b + 1; break } } return _rect(a[c - 1]).right - _rect(a[0]).left }

    function _colsWidthList(c) { for (var b = Ub, a = 0; a < c.length; a++) { if (a > 0) b += ",";
            b += c[a].offsetWidth } return b }

    function _rowsHeightList(c) { for (var b = Ub, a = 0; a < c.length; a++) { if (a > 0) b += ",";
            b += c[a].offsetHeight } return b }

    function _trHeight(a) { if (_isIE && _IEver == 8 && !_isBackCompat) return a.clientHeight;
        else return _offsetHeight(a) }

    function _cells(e) { var a = e.childNodes; if (a.length == 0) return a; for (var b = [], d = 0; d < a.length; d++) { var c = a[d];
            (c.tagName == "TD" || c.tagName == "TH") && b.push(c) } if (b.length == 0 && a[0].tagName == "FORM") return _cells(a[0]); return b }

    function _pixel(a) { if (a.match(/px$/) != Qb) a = a.substring(0, a.length - 2); return Number(a) }

    function _percent(a) { if (a.match(/%$/) != Qb) a = a.substring(0, a.length - 1); return Number(a) }

    function _trim(a) { return a.replace(/^[ \u7e32\u0080]+/, Ub).replace(/[ \u7e32\u0080]+$/, Ub) }

    function _rect(a) { return a.getBoundingClientRect() }

    function _getElementByTagName(b, c) { var a = b.getElementsByTagName(c); if (a.length == 0) return Qb; return a[0] }

    function _createObjectForFirefox() { var a = document.createElement("SPAN");
        a.style.display = Xb;
        a.style.position = Yb;
        a.style.top = Zb;
        a.style.left = Zb;
        document.body.appendChild(a); return a }

    function _createObjectForChrome() { var a = document.createElement("SPAN");
        a.style.position = bc;
        a.style.top = "0";
        a.style.left = "0";
        a.style.height = "0";
        a.style.width = "0";
        document.body.appendChild(a) }
}

FixedMidashi.create();