function setCookie(c_name, value, expiredays) {
    var path = "/";
    var paths = new Array();
    paths = path.split("/");
    if (paths[paths.length - 1] != "") {
        paths[paths.length - 1] = "";
        path = paths.join("/");
    }
    var extime = new Date().getTime();
    var cltime = new Date(extime + (60 * 60 * 24 * 1000 * expiredays));
    var exdate = cltime.toUTCString();
    var s = "";
    s += c_name + "=" + escape(value);
    s += "; path=" + path;
    if (expiredays) {
        s += "; expires=" + exdate + "; ";
    } else {
        s += "; ";
    }
    document.cookie = s;
}

function getCookie(c_name) {
    var st = "";
    var ed = "";
    if (document.cookie.length > 0) {
        st = document.cookie.indexOf(c_name + "=");
        if (st != -1) {
            st = st + c_name.length + 1;
            ed = document.cookie.indexOf(";", st);
            if (ed == -1) ed = document.cookie.length;
            return unescape(document.cookie.substring(st, ed));
        }
    }
    return "";
}

function loadjscssfile(filename, filetype) {
    if (filetype == "js") {
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") {
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

var jsPath = {};
function jsloader3(urlpath) {
    if (jsPath[urlpath]) return 1;
    var xhr;
    if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        xhr = new XMLHttpRequest();
    }
    xhr.open("GET", urlpath, false);
    xhr.send(null);
    if (xhr.status == 200) {
        eval(xhr.responseText);
        jsPath[urlpath] = true;
    } else {
        return xhr.status;
    }
    return 0;
}

function loadjscssfile(filename, filetype) {
    if (filetype == "js") {
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") {
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

loadjscssfile("//www.usj.co.jp/ga/css/thickbox.css", "css");
loadjscssfile("//www.usj.co.jp/ga/css/custom.css", "css");

if (window.$ == undefined) {
    jsloader3('/ga/js/jquery-1.4.2.min.js');
    jsloader3('/ga/js/jquery.cookie.js');
    jsloader3('/ga/js/jquery.timer.js');
    jsloader3('/ga/js/thickbox.js');

} else {

    if (window.$.cookie == undefined) {
        jsloader3('/ga/js/jquery.cookie.js');
    }

    if (window.$.timer == undefined) {
        jsloader3('/ga/js/jquery.timer.js');
    }

    if (typeof (tb_init) != 'function' &&
			typeof (tb_show) != 'function' &&
			typeof (tb_remove) != 'function') {
        jsloader3('/ga/js/thickbox.js');
    }
}

    var urlUSJ1 = new RegExp('s\.usj\.co\.jp', 'gi');
    var urlUSJ2 = new RegExp('s\.usj\.co\.jp\/attraction\/character\/', 'gi');
    var urlUSJ3 = new RegExp('onepiece_summer2013', 'gi');

    if (location.href.match(urlUSJ3)) { jsloader3('/ga/js/jquery.timer.js') }
    if (location.href.match(urlUSJ1)) { setCookie('__spPage', 1) }
    if (location.href.match(urlUSJ2)) {

        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-17238174-1']);
        _gaq.push(['_setDomainName', '.usj.co.jp']);
        _gaq.push(['_trackPageview']);

        (function () {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

    } else {
        // --start ga_conf
        //20120315 updated

        var _gaq = _gaq || [];
        var _gaContext;

        // 本番用
        var _gaConfig = {
            /**
            * ページ表示時に_gaq.push()に格納する値の配列。
            * ここに記載された順番でpushされる。
            * 
            * sourceが指定されており、かつeval()の値が空だった場合は、
            * 該当のcommandはpush()されない仕様なので注意すること。
            * 
            * @param array  command _gaq.push()に格納するコマンド
            * @param string source  この値をeval()したものを、commandの配列に含まれる '__VALUE__' の箇所に置換する（省略可）
            * @param string replace '__VALUE__' 以外の文字列を置換したい場合はここに指定する（省略可）
            */
            queue: [
		{ command: ['_setAccount', 'UA-17238174-1'] },
		{ command: ['_setDomainName', '.usj.co.jp'] },
		{ command: ['_setCustomVar', 1, 'p_hist', '__VALUE__', 1], source: 'this.getPersistentCookie()' },
		{ command: ['_setCustomVar', 2, 's_hist', '__VALUE__', 2], source: 'this.getSessionCookie()' },
		{ command: ['_setCustomVar', 4, 'group', '__VALUE__', 3], source: 'this.getContentsGroup()' },
		{ command: ['_trackPageview'] }
	],

            /**
            * データストレージとして用いるCookieの設定。
            * 
            * cookie.p_hist：永続Cookie
            * cookie.s_hist：セッションCookie
            * 
            * 実装はjQueryのCookieプラグインなので、どちらも同じパラメータをとる。
            * 
            * @param string  key             Cookie名
            * @param integer options.expires Cookieの有効期限。s_histには設定しないこと
            * @param string  options.path    Cookieの有効パス。普通は '/' で問題ない
            * @param string  options.domain  Cookieの有効ドメイン
            * @param bool    options.secure  CookieをSSL時のみ有効にするかどうか
            */
            cookie: {
                p_hist: {
                    key: 'p_hist_20110218',
                    options: { expires: 60, path: '/', domain: 'usj.co.jp', secure: false }
                },
                s_hist: {
                    key: 's_hist',
                    options: { path: '/', domain: 'usj.co.jp', secure: false }
                }
            },

            /**
            * アンケート用の設定
            * 
            * @param array   disablePatterns         アンケートを無効にするURLをRegExpオブジェクトで指定
            * @param integer threshold.visitCount    指定された訪問回数以上でアンケート表示（訪問回数）。0が指定された場合は訪問回数によるアンケート表示は行わない
            * @param integer threshold.second        指定された訪問時間以上でアンケート表示（秒数）
            * @param string  config.version          アンケートのバージョン。空文字が指定された場合はバージョン情報を付加しない
            * @param string  config.url              アンケートURL
            * @param integer config.width            アンケートウィンドウの横サイズ
            * @param integer config.height           アンケートウィンドウの縦サイズ
            * @param string  config.title            アンケートウィンドウのタイトル
            * @param string  config.closeCaption     アンケートウィンドウ右上の閉じるキャプション
            * @param string  config.outer_enquete.url   外部アンケートのURL
            * @param integer config.outer_enquete.ratio 外部アンケートの出現比率（％）。0～100のいずれか。0を指定した場合は外部アンケートは無効となり、表示されない
            * @param string  format.global_separator GAにエクスポートする際のセパレータ
            * @param string  format.ma_separator     GAにエクスポートする際のMAのセパレータ
            */
            enquete: {
                disablePatterns: [
            /^https?:\/\/.*\.usj\.co\.jp\/.*/,
			/^https?:\/\/www\.usj\.co\.jp\/.*/,
			/^https?:\/\/guide\.usj\.co\.jp/,
			/^https?:\/\/member\.usj\.co\.jp/,
			/^https?:\/\/ticket2\.usj\.co\.jp/,
			/^https?:\/\/www\.usj\.co\.jp\/limited/,
			/^http:\/\/www\.usj\.co\.jp\/UWL\/special\/(index\.html)?/
		],
                threshold: {
                    visitCount: 0,
                    second: 5
                },
                config: {
                    version: 'v02',
                    url: '/ga/enquete.html',
                    width: 600,
                    height: 250,
                    title: 'アンケートにご協力ください',
                    closeCaption: '閉じる',
                    outer_enquete: {
                        url: '', // 今回は無視する仕様になります
                        ratio: 0
                    }
                },
                format: {
                    global_separator: '_',
                    ma_separator: '_'
                }
            },

            /**
            * 接触履歴をとるためのパターン設定
            * 
            * @param string group   パターングループ名。ロジック中では特に参照されないが、ラベルとして使う
            * @param string name    パターン名
            * @param array  actions ここで定義されたアクションが行われた場合、接触履歴を保存する
            * 
            * <actionsに格納する配列の仕様>
            * @param string trigger   接触履歴が発生するイベント。'onload'もしくは'onunload'のみ可。
            *                         onunloadはwindow.onunloadイベントではなく、a.onclickイベントで実行される
            * @param string target    接触履歴を判定する値。triggerの値により有効な値が異なる。
            *                         <trigger: 'onload'>
            *                             'referrer': リファラをpatternにマッチするかどうか判定する
            *                             'location': 現在のURLがpatternにマッチするかどうか判定する
            *                         <trigger: 'onunload'>
            *                             'location': クリックされたaタグのhref属性の値がpatternにマッチするかどうか判定する
            *                             'element' : クリックされたaタグのDOM要素内に、tag,attribute,valueで指定された値に
            *                                         マッチするものがあるかどうか判定する
            * @param object pattern   targetがreferrerもしくはlocationの際、パターンマッチに用いるRegExpオブジェクト
            * @param string tag       targetがelementの際、パターンマッチに用いるHTMLタグ名
            * @param string attribute targetがelementの際、パターンマッチに用いるHTMLタグのうち、判定に用いる属性名
            * @param string value     targetがelementの際、パターンマッチに用いるHTMLタグのうち、判定に用いる属性の値（部分一致で検索される）
            */
            patterns: [
		{
		    group: 'メールマガジン',
		    name: 'A',
		    actions: [
				{ trigger: 'onload', target: 'location', pattern: /m[0-9]+_rtm_mail=/ },
				{ trigger: 'onload', target: 'location', pattern: /utm_medium=NL/ },
				{ trigger: 'onload', target: 'location', pattern: /utm_medium=MAIL/ }
			]
		},
		{
		    group: '遊ぶろぐ',
		    name: 'B',
		    actions: [
				{ trigger: 'onload', target: 'referrer', pattern: /www\.osaka-asoblog\.jp/ },
				{ trigger: 'onunload', target: 'location', pattern: /www\.osaka-asoblog\.jp/ },
				{ trigger: 'onunload', target: 'element', tag: 'img', attribute: 'src', value: '/img/index_ban_asoblog.gif' }
			]
		},
		{
		    group: 'mixi',
		    name: 'C',
		    actions: [
				{ trigger: 'onload', target: 'referrer', pattern: /mixi\.jp\// }
			]
		},
		{
		    group: 'シーズナリコンテンツ',
		    name: 'D',
		    actions: [
				{ trigger: 'onload', target: 'location', pattern: /www\.usj\.co\.jp\/10th\// }
			]
		},
		{
		    group: 'オフィシャルブログ',
		    name: 'E',
		    actions: [
				{ trigger: 'onload', target: 'referrer', pattern: /ameblo\.jp\/usj-official/ },
				{ trigger: 'onunload', target: 'location', pattern: /ameblo\.jp\/usj-official/ },
				{ trigger: 'onunload', target: 'element', tag: 'img', attribute: 'src', value: 'img/index_btn_blog.gif' }
			]
		},
		{
		    group: '個人ブログ',
		    name: 'F',
		    actions: [
				{ trigger: 'onload', target: 'referrer', pattern: /ameblo\.jp\/.+\// },
				{ trigger: 'onload', target: 'referrer', pattern: /.+\.blog[0-9]+\.fc2\.com\// },
				{ trigger: 'onload', target: 'referrer', pattern: /blogs\.yahoo\.co\.jp\/.+\// },
				{ trigger: 'onload', target: 'referrer', pattern: /blog\.livedoor\.jp\/.+\// },
				{ trigger: 'onload', target: 'referrer', pattern: /blog\.goo\.ne\.jp\/.+\// },
				{ trigger: 'onload', target: 'referrer', pattern: /.+\.seesaa\.net\// },
				{ trigger: 'onload', target: 'referrer', pattern: /.+\.jugem\.jp\// },
				{ trigger: 'onload', target: 'referrer', pattern: /.+\.blog\.so-net\.ne\.jp\// },
				{ trigger: 'onload', target: 'referrer', pattern: /.+\.blog\.at\.webry\.info\// },
				{ trigger: 'onload', target: 'referrer', pattern: /.+\.exblog\.jp\// },
				{ trigger: 'onload', target: 'referrer', pattern: /.+\.cocolog-nifty\.com\// },
				{ trigger: 'onload', target: 'referrer', pattern: /d\.hatena\.ne\.jp\/.+\// },
				{ trigger: 'onload', target: 'referrer', pattern: /yaplog\.jp\/.+\// },
				{ trigger: 'onload', target: 'referrer', pattern: /plaza\.rakuten\.co\.jp\/.+\// }
			]
		},
		{
		    group: 'Twitter',
		    name: 'G',
		    actions: [
				{ trigger: 'onload', target: 'referrer', pattern: /twitter\.jp/ },
				{ trigger: 'onload', target: 'referrer', pattern: /twitter\.com/ },
				{ trigger: 'onload', target: 'referrer', pattern: /t\.co\// },
				{ trigger: 'onload', target: 'location', pattern: /twitid=/ },
				{ trigger: 'onunload', target: 'location', pattern: /twitter\.com/ }
			]
		},
		{
		    group: 'リスティング広告/ネットAD',
		    name: 'H',
		    actions: [
				{ trigger: 'onload', target: 'location', pattern: /utm_medium=(AF|LS|CM|BA|TU|TE|MM)/ },
				{ trigger: 'onload', target: 'location', pattern: /OVKEY=/ },
				{ trigger: 'onload', target: 'location', pattern: /gclid/ }
			]
		},
		{
		    group: 'UWL',
		    name: 'I',
		    actions: [
				{ trigger: 'onload', target: 'location', pattern: /www\.usj\.co\.jp\/UWL\// }
			]
		},
		{
		    group: 'チケット購入完了',
		    name: 'J',
		    actions: [
				{ trigger: 'onload', target: 'location', pattern: /ticket2\.usj\.co\.jp\/purchase\/result\.do/ }
			]
		}

	],

            /**
            * コンテンツグループ設定
            * 
            * @param string group    コンテンツグループ名。ロジック中では特に参照されないが、ラベルとして使う
            * @param string name     GAに渡されるコンテンツグループ名
            * @param array  patterns 該当グループとして判定するためのRegExpオブジェクト
            */
            groups: [
	],

            /**
            * a.onclickイベント設定
            * 
            * 外部リンク取得時などにイベントトラッキングを行う際の設定。
            * downloadはサイト内のファイルダウンロードへのリンククリックなどの設定、
            * offsiteは外部サイトへのリンククリック時の設定。
            * 
            * @param string category         GAのイベントカテゴリ(category)
            * @param array  patterns         GAの該当イベントカテゴリで取得するパターンの配列
            * @param string patterns.action  GAのイベントアクション(action)
            * @param string patterns.pattern GAの該当イベントアクションとして判定するためのRegExpオブジェクト。
            *                                downloadの場合、クリックされたAタグのhref属性を判定に用いる。
            *                                offsiteの場合、リンク先URL内のホスト名を判定に用いる。
            */
            events: {
                download: {
                    category: 'download',
                    patterns: [
				{ action: 'mailto', pattern: /^mailto:(.+)$/i },
				{ action: 'zip', pattern: /^(.+\.zip)$/i },
				{ action: 'pdf', pattern: /^(.+\.pdf)$/i }
			]
                },
                offsite: {
                    category: 'offsite',
                    patterns: [
				{ action: 'offsite', pattern: /.+?\.usj\.co\.jp$/ }
			]
                }
            }

        };

        // --end ga_conf

        // --start ga_classes
        /**
        * クラスの継承
        */
        function _gaInherit(subClass, superClass) {
            for (var prop in superClass.prototype) {
                subClass.prototype[prop] = superClass.prototype[prop];
            }
        }


        /**
        * gaCookie
        */
        function gaCookie() { this.gaCookie.apply(this, arguments); }
        gaCookie.prototype = {

            gaCookie: function (key, options) {
                this.key = key;
                this.options = options;
            },

            _set: function (value) {
                $.cookie(this.key, value, this.options);
            },

            _get: function () {
                return $.cookie(this.key);
            }
        };


        /**
        * gaSessionCookie
        */
        function gaSessionCookie() { this.gaSessionCookie.apply(this, arguments); }
        gaSessionCookie.prototype = {

            // コンストラクタ
            gaSessionCookie: function (key, options, patternNames) {
                this.gaCookie(key, options);
                this.patternNames = patternNames;

                this._initializeParam();
                this._unserialize();

                if (this.firstAccessTime != 0) {

                    // 初回訪問以外の場合はfalse
                    this.firstAccess = false;

                } else {

                    // 初回訪問時間を初期化
                    var now = (new Date()).getTime();
                    this.firstAccessTime = now;

                }

                this._save();
            },

            // パラメータの初期化
            _initializeParam: function () {
                this.firstAccess = true;
                this.firstAccessTime = 0;
                this.history = {};

                for (var i = 0; i < this.patternNames.length; i++) {
                    var name = this.patternNames[i];
                    this.history[name] = { count: 0 };
                }
            },

            // cookieからパラメータを初期化
            _unserialize: function () {
                try {

                    var cookie = this._get();

                    // cookieがそもそも空
                    if (cookie == null) {
                        return;
                    }

                    // cookieは "123456700|A,0|B,1|C,2|D,3|E,4" の形式で格納されている
                    cookie = cookie.split('|');

                    // cookieがおかしい
                    if (cookie.length < 1) {
                        return;
                    }

                    this.firstAccessTime = parseInt(cookie.shift(), 10);

                    for (var i = 0; i < cookie.length; i++) {

                        var res = cookie[i].split(',');

                        // フォーマットがおかしかったら処理中断
                        if (res.length != 2) {
                            return;
                        }

                        var name = res[0];

                        // パターンに定義されているものだけ取得
                        if (this._isEnablePattern(name)) {

                            this.history[name] = {
                                count: parseInt(res[1], 10)
                            };

                        }

                    }

                } catch (e) {
                }
            },

            // 有効なパターンかどうかチェック
            _isEnablePattern: function (name) {
                var retval = false;

                if (name == '') {
                    return retval;
                }

                for (var i = 0; i < this.patternNames.length; i++) {
                    if (name == this.patternNames[i]) {
                        retval = true;
                        break;
                    }
                }

                return retval;
            },

            // Cookieの保存
            _save: function () {
                var s = [];

                s.push(this.firstAccessTime);

                for (var name in this.history) {
                    var h = name + ',' + this.history[name].count;
                    s.push(h);
                }

                this._set(s.join('|'));
            },

            // 利用回数のエクスポート
            _exportCount: function (count) {
                count = 0 < count ? '1' : '0';

                return count;
            },

            // 接触履歴の追加
            addHistory: function (name) {
                if (this._isEnablePattern(name)) {

                    this.history[name].count++;
                    this._save();

                }
            },

            // Cookieの削除
            clear: function () {
                this._set();
                this._initializeParam();
                this._save();
            },

            // GAへのエクスポート
            exportGA: function () {
                var s = '';

                for (var name in this.history) {
                    s += s != '' ? '-' : '';
                    s += name
			  + this._exportCount(this.history[name].count);
                }

                return s;
            },

            // 初回訪問時はtrue
            isFirstAccess: function () {
                return this.firstAccess;
            },

            // 初回訪問時間取得
            getFirstAccessTime: function () {
                return this.firstAccessTime;
            }
        }
        _gaInherit(gaSessionCookie, gaCookie);


        /**
        * gaPersistentCookie
        */
        function gaPersistentCookie() { this.gaPersistentCookie.apply(this, arguments); }
        gaPersistentCookie.prototype = {

            // コンストラクタ
            gaPersistentCookie: function (key, options, patternNames, isFirstAccess) {
                this.gaCookie(key, options);
                this.patternNames = patternNames;

                this._initializeParam();
                this._unserialize();

                if (isFirstAccess) {
                    // visitCountをインクリメント
                    this.visitCount++;
                }

                this._save();
            },

            // パラメータの初期化
            _initializeParam: function () {
                this.enquete = 0;
                this.visitCount = 0;
                this.history = {};

                for (var i = 0; i < this.patternNames.length; i++) {
                    var name = this.patternNames[i];
                    this.history[name] = { year: 0, month: 0, count: 0 };
                }
            },

            // cookieからパラメータを初期化
            _unserialize: function () {
                try {

                    var cookie = this._get();

                    // cookieがそもそも空
                    if (cookie == null) {
                        return;
                    }

                    // cookieは "9|9|A,2010,7,1|B,2010,7,2|C,2010,7,3|D,2010,7,4|E,2010,7,5" の形式で格納されている
                    cookie = cookie.split('|');

                    // cookieがおかしい
                    if (cookie.length < 2) {
                        return;
                    }

                    this.enquete = parseInt(cookie.shift(), 10);
                    this.visitCount = parseInt(cookie.shift(), 10);

                    for (var i = 0; i < cookie.length; i++) {

                        var res = cookie[i].split(',');

                        // フォーマットがおかしかったら処理中断
                        if (res.length != 4) {
                            return;
                        }

                        var name = res[0];

                        // パターンに定義されているものだけ取得
                        if (this._isEnablePattern(name)) {

                            this.history[name] = {
                                year: parseInt(res[1], 10),
                                month: parseInt(res[2], 10),
                                count: parseInt(res[3], 10)
                            };

                        }

                    }

                } catch (e) {
                }
            },

            // 有効なパターンかどうかチェック
            _isEnablePattern: function (name) {
                var retval = false;

                if (name == '') {
                    return retval;
                }

                for (var i = 0; i < this.patternNames.length; i++) {
                    if (name == this.patternNames[i]) {
                        retval = true;
                        break;
                    }
                }

                return retval;
            },

            // Cookieの保存
            _save: function () {
                var s = [];

                s.push(this.enquete);
                s.push(this.visitCount);

                for (var name in this.history) {
                    var h = name
				   + ',' + this.history[name].year
				   + ',' + this.history[name].month
				   + ',' + this.history[name].count;
                    s.push(h);
                }

                this._set(s.join('|'));
            },

            // 年のエクスポート
            _exportYear: function (year) {
                if (year != 0) {

                    year = String(year);
                    year = year.charAt(year.length - 1);

                } else {

                    year = 'X';

                }

                return year;
            },

            // 月のエクスポート
            _exportMonth: function (month) {
                switch (month) {
                    case 0:
                        month = 'X';
                        break;

                    case 10:
                        month = 'A';
                        break;

                    case 11:
                        month = 'B';
                        break;

                    case 12:
                        month = 'C';
                        break;

                    default:
                        month = String(month);
                        break;
                }

                return month;
            },

            // 利用回数のエクスポート
            _exportCount: function (count) {
                if (9 < count) {

                    count = 'A';

                } else {

                    count = String(count);

                }

                return count;
            },

            // 接触履歴の追加
            addHistory: function (name, year, month) {
                if (this._isEnablePattern(name)) {

                    if (this.history[name].year == 0) {

                        // 年月が空の場合（＝初回接触）のみ上書き
                        var year = parseInt(year, 10);
                        var month = parseInt(month, 10);
                        if (isNaN(year) || year < 1 ||
					isNaN(month) || month < 1 || 12 < month) {
                            return;
                        }
                        this.history[name].year = year;
                        this.history[name].month = month;
                    }

                    this.history[name].count++;
                    this._save();

                }
            },

            // Cookieの削除
            clear: function () {
                this._set();
                this._initializeParam();
                this._save();
            },

            // GAへのエクスポート
            exportGA: function () {
                var s = '';

                for (var name in this.history) {
                    s += s != '' ? '-' : '';
                    s += name
			  + this._exportYear(this.history[name].year)
			  + this._exportMonth(this.history[name].month)
			  + this._exportCount(this.history[name].count);
                }

                s = this._exportCount(this.visitCount) + s;

                return s;
            },

            // 訪問回数取得
            getVisitCount: function () {
                return this.visitCount;
            },

            // アンケート状態取得
            getEnquete: function () {
                // タブブラウザ利用時に、別タブでアンケートが表示された場合、
                // this.enquete だけを参照していると別タブでのアンケート表示が
                // 捕捉できないので、ここだけあえて直接Cookieを読むよう仕様変更
                try {

                    var cookie = this._get();

                    // cookieがそもそも空
                    if (cookie == null) {
                        return;
                    }

                    // cookieは "9|9|A,2010,7,1|B,2010,7,2|C,2010,7,3|D,2010,7,4|E,2010,7,5" の形式で格納されている
                    cookie = cookie.split('|');

                    // cookieがおかしい
                    if (cookie.length < 2) {
                        return;
                    }

                    this.enquete = parseInt(cookie.shift(), 10);

                } catch (e) { }

                return this.enquete;
            },

            // アンケート状態設定
            setEnquete: function (flag) {
                this.enquete = flag;
                this._save();
            }
        };
        _gaInherit(gaPersistentCookie, gaCookie);


        /**
        * コンテンツグループ
        */
        function gaContentsGroup() { this.gaContentsGroup.apply(this, arguments); }
        gaContentsGroup.prototype = {

            // コンストラクタ
            gaContentsGroup: function () {
                this.groups = [];
                this.target = window.location.href;

                switch (arguments.length) {
                    default:
                    case 2: this.target = arguments[1];
                    case 1: this.groups = arguments[0];
                }
            },

            // グループ名の取得
            getGroupName: function () {
                for (var i = 0; i < this.groups.length; i++) {

                    for (var j = 0; j < this.groups[i].patterns.length; j++) {

                        var pattern = this.groups[i].patterns[j];

                        if (pattern.test(this.target)) {

                            return this.groups[i].name;

                        }

                    }

                }

                return '';
            }
        };


        /**
        * gaContext
        */
        function gaContext() { this.gaContext.apply(this, arguments); }
        gaContext.prototype = {

            // コンストラクタ
            gaContext: function (params) {
                this.queue = params.queue;

                this.patternNames = [];
                for (var i in params.patterns) {
                    this.patternNames.push(params.patterns[i].name);
                }

                this.patterns = params.patterns;

                this.s_hist = new gaSessionCookie(
			params.cookie.s_hist.key,
			params.cookie.s_hist.options,
			this.patternNames
		);

                this.p_hist = new gaPersistentCookie(
			params.cookie.p_hist.key,
			params.cookie.p_hist.options,
			this.patternNames,
			this.s_hist.isFirstAccess()
		);

                this.e = new gaEnquete;
                this.enquete = params.enquete;

                this.contentsGroup = new gaContentsGroup(params.groups);

                this.events = params.events;

                this._onload();

                this._dispatchEnquete();
            },

            // onload
            _onload: function () {
                // onload時のみ、当てはまるパターンはすべてaddHistoryする。
                // このため、1回のonloadで複数のパターンがaddHistoryされるケースもある
                for (var i = 0; i < this.patterns.length; i++) {

                    for (var j = 0; j < this.patterns[i].actions.length; j++) {

                        var action = this.patterns[i].actions[j];

                        if (action.trigger != 'onload') {
                            continue;
                        }

                        switch (action.target) {
                            case 'referrer':
                                var referrer = window.document.referrer;
                                if (action.pattern.test(referrer)) {
                                    this.addHistory(this.patterns[i].name);
                                }
                                break;

                            case 'location':
                                var location = window.location.href;
                                if (action.pattern.test(location)) {
                                    this.addHistory(this.patterns[i].name);
                                }
                                break;
                        }

                    }

                }
            },

            // アンケート開始
            _dispatchEnquete: function () {
                // アンケート無効URLの場合は終了
                for (var i = 0; i < this.enquete.disablePatterns.length; i++) {
                    var url = this.enquete.disablePatterns[i];
                    if (url.test(window.location.href)) {
                        return;
                    }
                }

                // contents()が未定義のjQueryの場合も終了
                if (typeof $.fn.contents == 'undefined') {
                    return;
                }

                // SPcookieを持ってる場合はreturnする 2013.05.31
                if (getCookie('__spPage')) { return; }

                // 初回アクセス時間を取得
                var first = this.s_hist.getFirstAccessTime();

                var visitCount = this.enquete.threshold.visitCount;
                var span = 2000;
                var self = this;

                $.timer(span, function (timer) {

                    var now = (new Date()).getTime();

                    if (self.p_hist.getEnquete() != 0) {

                        // すでに回答済みの場合は終了
                        timer.stop();

                    } else if (
					$('#TB_overlay').size() == 0 &&
					((visitCount != 0 && visitCount < self.p_hist.getVisitCount()) ||
					self.enquete.threshold.second * 1000 <= (now - first))
			) {

                        timer.stop();

                        self.showEnquete();

                    } else {

                        timer.reset(span);

                    }

                });
            },

            // onunloadイベント(a.hrefクリックイベント）
            onunload: function (event, e) {
                var gaq = [];

                // ダウンロード
                var href = e.href;

                for (var i = 0; i < this.events.download.patterns.length; i++) {

                    var pattern = this.events.download.patterns[i].pattern;

                    var match = href.match(pattern);

                    if (match) {
                        var category = this.events.download.category;
                        var action = this.events.download.patterns[i].action;
                        var value = match[1];

                        gaq.push(['_trackEvent', category, action, value]);
                        break;
                    }
                }

                // 外部リンク
                if (gaq.length == 0) {

                    var host = e.hostname;

                    for (var i = 0; i < this.events.offsite.patterns.length; i++) {

                        var pattern = this.events.offsite.patterns[i].pattern;

                        if (!pattern.test(host)) {
                            var category = this.events.offsite.category;
                            var action = this.events.offsite.patterns[i].action;
                            var value = href;
							
							if(e.href.indexOf("javascript:")==-1){
	                            gaq.push(['_trackEvent', category, action, value]);
							}
                            break;
                        }
                    }
                }

                // trackEventが存在しないとGAに投げられないので、存在しない場合は
                // ここで終了
                if (gaq.length == 0) {
                    return;
                }

                // 接触履歴を追加
                var hit = false;
                for (var i = 0; i < this.patterns.length; i++) {

                    for (var j = 0; j < this.patterns[i].actions.length; j++) {

                        var action = this.patterns[i].actions[j];

                        if (action.trigger != 'onunload') {
                            continue;
                        }

                        switch (action.target) {
                            case 'location':
                                if (action.pattern.test(href)) {
                                    this.addHistory(this.patterns[i].name);
                                    gaq.unshift(['_setCustomVar', 1, 'p_hist', this.p_hist.exportGA(), 1]);
                                    gaq.unshift(['_setCustomVar', 2, 's_hist', this.s_hist.exportGA(), 2]);
									gaq.unshift(['_setDomainName', '.usj.co.jp']);
                                    hit = true;
                                }
                                break;

                            case 'element':
                                var find = action.tag + '[' + action.attribute + '*=' + action.value + ']';
                                if ($(e).find(find).length != 0) {
                                    this.addHistory(this.patterns[i].name);
                                    gaq.unshift(['_setCustomVar', 1, 'p_hist', this.p_hist.exportGA(), 1]);
                                    gaq.unshift(['_setCustomVar', 2, 's_hist', this.s_hist.exportGA(), 2]);
									gaq.unshift(['_setDomainName', '.usj.co.jp']);
                                    hit = true;
                                }
                                break;
                        }

                        if (hit) {
                            break;
                        }

                    }

                    if (hit) {
                        break;
                    }

                }

                // _gaqはグローバル変数
                for (var i in gaq) {
                    _gaq.push(gaq[i]);
                }

            },

            // 接触履歴の追加
            addHistory: function () {
                var date = new Date();
                var name = '';
                var year = date.getFullYear();
                var month = date.getMonth() + 1;

                switch (arguments.length) {
                    default:
                    case 3: month = arguments[2];
                    case 2: year = arguments[1];
                    case 1: name = arguments[0];
                }

                this.p_hist.addHistory(name, year, month);
                this.s_hist.addHistory(name);
            },

            // cookie初期化
            clear: function () {
                this.p_hist.clear();
                this.s_hist.clear();
            },

            getPersistentCookie: function () {
                return this.p_hist.exportGA();
            },

            getSessionCookie: function () {
                return this.s_hist.exportGA();
            },

            getContentsGroup: function () {
                return this.contentsGroup.getGroupName();
            },

            // _gaq用のキュー作成
            dispatch: function () {
                var gaq = [];

                for (var i in this.queue) {

                    if (this.queue[i].source) {

                        var replacement = this.queue[i].replace != undefined ? this.queue[i].replace : '__VALUE__';

                        try {
                            var value = eval(this.queue[i].source);

                            if (value != '') {

                                for (var j in this.queue[i].command) {
                                    if (this.queue[i].command[j] == replacement) {
                                        this.queue[i].command[j] = value;
                                        gaq.push(this.queue[i].command);
                                        break;
                                    }
                                }

                            }
                        } catch (e) {
                        }

                    } else {

                        gaq.push(this.queue[i].command);

                    }

                }

                // _gaqはグローバル変数
                for (var i in gaq) {
                    _gaq.push(gaq[i]);
                }
            },

            // アンケート表示
            showEnquete: function () {
                this.p_hist.setEnquete(1);

                this.e.show(this.enquete.config);
            },

            // アンケート初期化（iframeのDOM構築後にiframeからコールされる）
            initEnquete: function () {
                this.e.initialize({
                    context: this,
                    submit: this.submitEnquete
                });
            },

            // アンケート送信
            submitEnquete: function (enquete) {
                var sep = this.enquete.format.global_separator;
                var ma_sep = this.enquete.format.ma_separator;
                var e = '';

                for (var i in enquete) {

                    var t = typeof (enquete[i]);

                    if (t.toLowerCase() == 'object') {

                        enquete[i] = enquete[i].join(ma_sep);

                    }

                    e += e != '' ? sep : '';
                    e += enquete[i];

                }

                var date = new Date();
                var year = String(date.getFullYear()).slice(2);
                var month = String(date.getMonth() + 1);
                if (month.length == 1) {
                    month = '0' + month;
                }

                e += sep + year + month;

                e += this.enquete.config.version != '' ? sep + this.enquete.config.version : '';

                _gaq.push(['_setDomainName', '.usj.co.jp']);
				_gaq.push(['_setCustomVar', 3, 'enq', e, 1]);
                _gaq.push(['_trackEvent', 'enq', 'enq', e]);
            }
        };


        /**
        * gaEnquete
        */
        function gaEnquete() { this.gaEnquete.apply(this, arguments); }
        gaEnquete.prototype = {

            gaEnquete: function () {
                this.answer = {};
            },

            _resizeWindow: function (height) {
                //		var maxHeight = $('#TB_overlay').height() - 50;
                var maxHeight = $(window).height() - 50;
                if (maxHeight < height) {
                    height = maxHeight;
                }

                var html = $('#TB_iframeContent').contents().find('html');
                html.css({ overflow: 'hidden' });
                $('#TB_iframeContent').animate({ height: height }, {
                    complete: function () {
                        html.css({ overflow: 'auto' });
                    }
                });

                return '-' + parseInt(((height + 40) / 2), 10);
            },

            _nextPage: function (before, after) {
                var self = this;

                this.$.find(before).css('border-bottom', '1px solid #2BA3E0');
                this.$.find(after).css('border-bottom', '1px solid #2BA3E0');

                this.$.find(before).slideToggle('slow', function () {

                    self.$.find(after).slideToggle('slow', function () {
                        self.$.find(before).css('border-bottom', 'none');
                        self.$.find(after).css('border-bottom', 'none');
                    });

                });
            },

            _validateRadio: function (name) {
                var e = ':radio:checked[name="' + name + '"]';
                return 0 < this.$.find('.gaRadioRequired').filter(e).size() ? true : false;
            },

            _validateCheckbox: function (name, min) {
                var e = ':checkbox:checked[name="' + name + '"]';
                return min <= this.$.find('.gaCheckboxRequired').filter(e).size() ? true : false;
            },

            _getRadioValue: function (name, length) {
                var retval;

                for (var i = 0; i < length; i++) {
                    var e = '#' + name + '_' + (i + 1);

                    if (this.$.find(e).attr('checked')) {
                        retval = i + 1;
                        break;
                    }
                }

                return retval;
            },

            _getCheckBoxValues: function (name, length) {
                var retval = [];

                for (var i = 0; i < length; i++) {
                    var e = '#' + name + '_' + (i + 1);
                    var v = this.$.find(e).attr('checked') ? 1 : 0;
                    retval.push(v);
                }

                return retval;
            },

            _setErrorMessage: function (name, message) {
                if (arguments.length == 0) {

                    this.$.find('.gaErrorMessage').fadeOut();

                } else {

                    this.$.find(name).html(message);
                    this.$.find(name).fadeIn('slow');

                }
            },

            show: function (config) {
                var width = config.width || 600;
                var height = config.height || 230;

                var url = config.url + '?KeepThis=true&TB_iframe=true&width=' + width + '&height=' + height;

                tb_show(config.title, url);
                $('#TB_overlay').unbind('click', tb_remove);
                $('#TB_overlay').addClass('ga_TB_overlay');
                $('#TB_window').addClass('ga_TB_window');
                $('#TB_title').addClass('ga_TB_title');
                $('#TB_ajaxWindowTitle').addClass('ga_TB_ajaxWindowTitle');
                $('#TB_closeAjaxWindow').addClass('ga_TB_closeAjaxWindow');
                $('#TB_closeAjaxWindow').html('<a href="#" id="ga_TB_closeWindowButton">' + config.closeCaption + '</a>');
                $('#TB_iframeContent').addClass('ga_TB_iframeContent');

                $('#ga_TB_closeWindowButton').click(tb_remove);

                // escキー無効
                var keycode;
                window.document.onkeyup = function (e) {
                    if (e == null) { // ie
                        keycode = event.keyCode;
                    } else { // mozilla
                        keycode = e.which;
                    }
                    if (keycode == 27) { // close
                        return false;
                    }
                };
            },

            initialize: function (config) {
                var self = this;

                // インラインフレームのオブジェクトに対して操作を行う
                this.$ = $('#TB_iframeContent').contents();

                // アンケート開始ボタン
                this.$.find('#gaEnqueteStart').click(function () {
                    $(this).blur();

                    // ratioに0が指定された場合は明示的に無効としたいため、乱数の最小値minは1とする
                    // (minを0にしてしまうと、randが0だった場合に外部アンケートが表示される可能性があるため)
                    var min = 1, max = 100, rand, outer_enquete_config;
                    rand = Math.floor(Math.random() * (max - min + 1)) + min;
                    outer_enquete_config = config.context.enquete.config.outer_enquete;

                    if (rand <= outer_enquete_config.ratio) {

                        // リサイズ
                        var top = self._resizeWindow(450);

                        // 画面中央に移動(IE6以外)
                        if (!$.browser.msie ||
					($.browser.msie && 7 <= $.browser.version)) {

                            $('#TB_window').animate({ marginTop: top }, { complete: function () {
                                //self._nextPage('#gaEnqueteIntro', '#gaEnquetePage0');
                                self._nextPage('#gaEnqueteIntro', '#gaEnquetePage1');
                            }
                            });

                        } else {

                            //self._nextPage('#gaEnqueteIntro', '#gaEnquetePage0');
                            self._nextPage('#gaEnqueteIntro', '#gaEnquetePage1');
                        }

                    } else {

                        // リサイズ
                        var top = self._resizeWindow(500);

                        // 画面中央に移動(IE6以外)
                        if (!$.browser.msie ||
					($.browser.msie && 7 <= $.browser.version)) {

                            $('#TB_window').animate({ marginTop: top }, { complete: function () {
                                self._nextPage('#gaEnqueteIntro', '#gaEnquetePage1');
                            }
                            });

                        } else {

                            self._nextPage('#gaEnqueteIntro', '#gaEnquetePage1');

                        }
                    }
                });

                // 回答しないボタン
                this.$.find('#gaEnqueteCancel').click(function () {
                    $(this).blur();
                    tb_remove();
                });

                // 次へ進むボタン（0ページ目）
                this.$.find('#gaEnquetePage0 a').click(function () {
                    $(this).blur();

                    self._nextPage('#gaEnquetePage0', '#gaEnquetePage5');

                    // リサイズ
                    var top = self._resizeWindow(150);

                    // 画面中央に移動(IE6以外)
                    if (!$.browser.msie ||
				($.browser.msie && 7 <= $.browser.version)) {
                        $('#TB_window').animate({ marginTop: top });
                    }

                    return true;
                }).hover(
			function () {
			    $(this).stop().fadeTo('fast', 0.5);
			}, function () {
			    $(this).stop().fadeTo('fast', 1);
			});

                // 次へ進むボタン（1ページ目）
                this.$.find('#gaEnqueteNextPage1').click(function () {
                    $(this).blur();

                    self._setErrorMessage();
                    var error = false;

                    if (!self._validateRadio('enquete1')) {
                        error = true;
                        self._setErrorMessage('#gaErrorEnquete1', 'いずれか1つをお選びください');
                    }

                    if (!error) {

                        self.answer.enquete1 = self._getRadioValue('enquete1', 6);

                        self._nextPage('#gaEnquetePage1', '#gaEnquetePage2');
                        return false;

                    }
                });

                // 次へ進むボタン（2ページ目）
                this.$.find('#gaEnqueteNextPage2').click(function () {
                    $(this).blur();

                    self._setErrorMessage();
                    var error = false;

                    if (!self._validateCheckbox('enquete2', 1)) {
                        error = true;
                        self._setErrorMessage('#gaErrorEnquete2', 'いずれか1つ以上をお選びください');
                    }

                    if (!error) {

                        self.answer.enquete2 = self._getCheckBoxValues('enquete2', 13);

                        self._nextPage('#gaEnquetePage2', '#gaEnquetePage3');

                        return false;

                    }
                });

                // 次へ進むボタン（3ページ目）
                this.$.find('#gaEnqueteNextPage3').click(function () {
                    $(this).blur();

                    self._setErrorMessage();
                    var error = false;

                    if (!self._validateRadio('enquete3')) {
                        error = true;
                        self._setErrorMessage('#gaErrorEnquete3', 'いずれか1つをお選びください');
                    }

                    if (!error) {

                        self.answer.enquete3 = self._getRadioValue('enquete3', 13);

                        self._nextPage('#gaEnquetePage3', '#gaEnquetePage4');
                        return false;

                    }
                });

                // 次へ進むボタン（4ページ目）
                this.$.find('#gaEnqueteNextPage4').click(function () {
                    $(this).blur();

                    self._setErrorMessage();
                    var error = false;

                    if (!self._validateRadio('enquete4')) {
                        error = true;
                        self._setErrorMessage('#gaErrorEnquete4', 'いずれか1つをお選びください');
                    }

                    if (!self._validateRadio('enquete5')) {
                        error = true;
                        self._setErrorMessage('#gaErrorEnquete5', 'いずれか1つをお選びください');
                    }

                    if (!self._validateRadio('enquete6')) {
                        error = true;
                        self._setErrorMessage('#gaErrorEnquete6', 'いずれか1つをお選びください');
                    }

                    if (!error) {

                        self.answer.enquete4 = self._getRadioValue('enquete4', 8);
                        self.answer.enquete5 = self._getRadioValue('enquete5', 2);
                        self.answer.enquete6 = self._getRadioValue('enquete6', 4);

                        // 引数で渡されたcontextのsubmitを呼び出す
                        config.submit.apply(config.context, [self.answer]);

                        self._nextPage('#gaEnquetePage4', '#gaEnquetePage5');

                        // リサイズ
                        var top = self._resizeWindow(150);

                        // 画面中央に移動(IE6以外)
                        if (!$.browser.msie ||
					($.browser.msie && 7 <= $.browser.version)) {
                            $('#TB_window').animate({ marginTop: top });
                        }

                        return false;

                    }
                });

                // ウィンドウを閉じるボタン
                this.$.find('#gaEnqueteClose').click(function () {
                    $(this).blur();
                    tb_remove();
                });

                // ラベルのマウスオーバー時の色
                this.$.find('.gaEnquete li label').hover(function () {
                    $(this).css('background-color', '#97D2F1');
                    $(this).css('cursor', 'pointer');
                }, function () {
                    $(this).css('background-color', 'transparent');
                    $(this).css('cursor', 'default');
                });
            }
        };
        // --end ga_classes

        // --start ga_dispatch
        $(function () {
            _gaContext = new gaContext(_gaConfig);

            /*
            $('a').click(function (event) {
            _gaContext.onunload(event, this);
            });
            */
            if ($('a').hasClass('gaoff')) {
                $('a').click(function (event) {
                    //_gaContext.onunload(event, this);
                })
            } else {
                $('a').click(function (event) {
                    _gaContext.onunload(event, this);
                })
            };

            $('map area').click(function (event) {
                _gaContext.onunload(event, this);
            });

            // -- 2013.05.24

            var curDir = new String();
            var curFile = new String();

            var curUrlarr = location.href.split("/");
            curDir = curUrlarr[3];
            curFile = curUrlarr[curUrlarr.length - 1];
			_gaq.push(['_setDomainName', '.usj.co.jp']);
            if (curUrlarr.length > 4) { _gaq.push(['_setCustomVar', 4, 'group', curDir, 3]) }
            if (curFile == 'result.do') { setCookie('__ujR', 1, 730) }
            if (curFile == 'rup?method=showTop') { setCookie('__ujM', 1, 730) }
            if (curFile == 'rup?method=displayMultiRegistAdd') { setCookie('__ujM', 1, 730) }
            if (!getCookie('__ujM') && !getCookie('__ujR')) { _gaq.push(['_setCustomVar', 5, 'u_type', 'nonMem_nonBuyer', 1]) }
            if (!getCookie('__ujM') && getCookie('__ujR')) { _gaq.push(['_setCustomVar', 5, 'u_type', 'nonMem_Buyer', 1]) }
            if (getCookie('__ujM') && !getCookie('__ujR')) { _gaq.push(['_setCustomVar', 5, 'u_type', 'Mem_nonBuyer', 1]) }
            if (getCookie('__ujM') && getCookie('__ujR')) { _gaq.push(['_setCustomVar', 5, 'u_type', 'Mem_Buyer', 1]) }

            // _gaq.push()
            _gaContext.dispatch();

            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        });
        // --end ga_dispatch
    }