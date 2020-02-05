// ============================================================================

var cart_json_data = {}; // カートデータ

var URL_FUNC001 = "/api/cartinfo.do"; // 連携機能設計書 FUNC001パス (script.js)
var URL_FUNC002 = '/api/ticketstock.do'; // 連携機能設計書 FUNC002パス (sp_calendar.js, serchc-result.js)
var URL_FUNC003 = "/api/apc.do"; // 連携機能設計書 FUNC003パス (select_apass_up.js)
var URL_FUNC004 = '/api/ticketinfo.do'; // 連携機能設計書 Func004パス (select.js)
var URL_FUNC005 = '/api/timezoneinfo.do'; // 連携機能設計書 Func005パス (select.js)
var URL_FUNC006 = '/api/zipcode.do'; // 連携機能設計書 Func006パス (inputnm.js)
var URL_FUNC007 = '/api/changedate.do'; // 連携機能設計書 FUNC007パス (sp_calendar.js)
var URL_FUNC008 = "/today.json"; // タイムスタンプ
var ACTION_FUNC007 = 'cad.do'; // func007 form action値 (sp_calendar.js)

// JSON_DATA_LOADER 共通部分jsonデータ取得用 (jsonDataLoader.js)
var URL_Calendar2 = 'https://www.usj.co.jp/ticket/json/calendar2.json'; // calendar2.json パス
var URL_ticket = 'https://www.usj.co.jp/ticket/json/ticket.json'; // ticket.json パス
var URL_constini = '/const.ini'; // const_ini.json パス

var URL_MEGA_MENU = 'https://www.usj.co.jp/ticket/list.html'; // PC チケット一覧（iframe）のURL

// iframeクロスドメイン対策 postMessage Origin指定
var ORIGIN_WWW = 'https://www.usj.co.jp'; // www
var ORIGIN_TICKET2 = 'https://ticket2.usj.co.jp'; // ticket2


// ============================================================================
// 通信エラーモーダルの文言
var ERROR_TXT_01 = '<p>予期しないエラーが発生しました。しばらく時間が経ってから再度お試しください。</p>'; // func系 result: 1 エラー
var ERROR_TXT_02 = '<p class="mb10">ご選択いただいたチケットは、現在販売していないか、在庫が無いため選べません。</p><p class="mb10">枚数限定のため、すでに在庫がない日もあります。<br />チケット一覧から、在庫のあるチケットを選び直してください。</p><p>また、先にカートに入れたチケットと同じ入場日の在庫がない場合もあります。<br />入場日を変更したい場合は、カートの中のチケットをすべて削除してから、再度チケット一覧からチケットを選択して別の入場日をお選びください。</p>'; // カレンダー選択在庫無し
var ERROR_TXT_03 = '<p>通信エラー： <br />通信状態が不安定になっている可能性があります。<br />しばらく時間が経ってから再度お試しください。</p>'; // タイムアウトエラー
var ERROR_TXT_04 = '<p class="mb10">ご不便をかけて申し訳ありません。ただいまサーバが混み合っているか、定期メンテナンス中です。 しばらくたってから再度お試しください。</p><p>定期メンテナンス時間<br />毎週火曜日AM5:00～AM6:00</p>'; // システムメンテナンス時
var ERROR_TXT_05 = '<p>申し訳ありません。現在、入場日が変更可能な在庫がありません。</p>'; // カレンダー選択在庫無し 購入履歴
var ERROR_TXT_06 = '<p>申し訳ありません。<br />現在、選択した日付の在庫がありません。<br />別日程をお選びください。</p>'; // カレンダー選択在庫無し 購入履歴

/* ***************************************************************************** */

/** -------------------------------------------------------
 ** Global Var
 ** ------------------------------------------------------- */

ua_userAgent = window.navigator.userAgent.toLowerCase();
ua_appVersion = window.navigator.appVersion.toLowerCase();
browser_version = '';
browser_name = '';
mobile_name = '';
window_w = '';
contents_w = 950;
body_id = $('body').attr('id');

var megamenuLoadFlag = false;

/** -------------------------------------------------------
 ** Execution
 ** ------------------------------------------------------- */

$(function () {

	//**** Default Function ****//
	userAgent_name();
	window_width();
	set_error_modal();
});

$(window).load(function () {

	//**** Basic Function ****//
	link_focus();
	page_top();
	totop_btn();
	histry_back();
	add_child();
	tab_change();
	hd_ticket_modal();
	contents_modal();
	if (!$('body').hasClass('apass_update')) {
		img_hover();
		radio_check();
		radiobox_check();
		checkbox_check();
		custom_select();
	}
	disabled_check();
	height_line();

	//**** Advanced Function ****//
	cart_check();
	api_loading_icon();
	set_megamenu_url();
	set_param_backbtn();
});

/* ***************************************************************************** */

/** -------------------------------------------------------
 ** Default Function
 ** ------------------------------------------------------- */

/* UserAgent
----------------------------------------------------*/

function userAgent_name() {
	if (ua_userAgent.indexOf('msie') != -1) {
		//Old IE
		browser_name = 'ie';
		if (ua_appVersion.indexOf('msie 6.') != -1) {
			//IE6
			browser_version = 'ie6';
		} else if (ua_appVersion.indexOf('msie 7.') != -1) {
			//IE7
			browser_version = 'ie7';
		} else if (ua_appVersion.indexOf('msie 8.') != -1) {
			//IE8
			browser_version = 'ie8';
		} else if (ua_appVersion.indexOf('msie 9.') != -1) {
			//IE9
			browser_version = 'ie9';
		} else if (ua_appVersion.indexOf('msie 10.') != -1) {
			//IE10
			browser_version = 'ie10';
		}
	} else if (ua_userAgent.indexOf('trident') != -1) {
		//Modern IE
		browser_name = 'ie';
		if (ua_appVersion.indexOf('rv:11.') != -1) {
			browser_version = 'ie11';
		}
	} else if (ua_userAgent.indexOf('chrome') != -1) {
		//Chrome
		browser_name = 'chrome';
	} else if (ua_userAgent.indexOf('safari') != -1) {
		//Safari
		browser_name = 'safari';
	} else if (ua_userAgent.indexOf('firefox') != -1) {
		//Firefox
		browser_name = 'firefox';
	} else if (ua_userAgent.indexOf('opera') != -1) {
		//Old Opera
		browser_name = 'opera';
	}
	if (ua_userAgent.indexOf('android') != -1) {
		if (ua_userAgent.indexOf('mobile') != -1) {
			//Mobile Android
			mobile_name = 'mb_android';
		} else {
			//Android
			mobile_name = 'android';
		}
	}
	if (ua_userAgent.indexOf('iphone') != -1) {
		//iPhone
		mobile_name = 'iphone';
	}
	if (ua_userAgent.indexOf('ipad') != -1) {
		//iPad
		mobile_name = 'ipad';
	}
}

/* Window Width
----------------------------------------------------*/

function window_width() {
	window_width_action();
	$(window).resize(function () {
		window_width_action();
	});
}

function window_width_action() {
	window_w = $(window).width();
}

/* ***************************************************************************** */

/** -------------------------------------------------------
 ** Basic Function
 ** ------------------------------------------------------- */

/* Img Hover
----------------------------------------------------*/

function img_hover() {
	if (browser_version == 'ie7' || browser_version == 'ie8') {
		//for IE7,IE8
		$('#header a img, .contents a img, #footer a img').not('[src*="_of."], [src*="_ov."], [src*=".png"], .nohover a img').fadeTo(0, 1.0);
		$('#header a img, .contents a img, #footer a img').not('[src*="_of."], [src*="_ov."], [src*=".png"], .nohover a img').hover(function () {
			$(this).stop().fadeTo(300, 0.7);
		}, function () {
			$(this).stop().fadeTo(300, 1.0);
		});
	} else {
		$('#header a img, .contents a img, .cmn_btn a, .cmn_btn button, #footer a img').not('[src*="_of."], [src*="_ov."], .nohover a img, .cmn_btn button:disabled, .no_img_hover').fadeTo(0, 1.0);
		$('#header a img, .contents a img, .cmn_btn a, .cmn_btn button, #footer a img').not('[src*="_of."], [src*="_ov."], .nohover a img, .cmn_btn button:disabled, .no_img_hover').hover(function () {
			$(this).stop().fadeTo(300, 0.7);
		}, function () {
			$(this).stop().fadeTo(300, 1.0);
		});
	}
}

/* Link focus
----------------------------------------------------*/

function link_focus() {
	$('a, area').focus(function () {
		$(this).blur();
	})
	$('input[type=image]').focus(function () {
		$(this).blur();
	})
	$('button').focus(function () {
		$(this).blur();
	})
}

/* Page Top
----------------------------------------------------*/

function page_top() {
	$('a[href^=#], area[href^=#]').not('a[href=#], area[href=#], a#hd_ticket').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
			if ($target.length) {
				var targetOffset = $target.offset().top;
				$('html,body').animate({
					scrollTop: targetOffset
				}, 500, 'easeOutQuart');
				return false;
			}
		}
	});
}

/* Totop Btn
----------------------------------------------------*/

function totop_btn() {

	var totop_btn = $('#ft_totop');
	var check = false;

	right_position();

	function right_position() {
		window_width_action();
		if (window_w > contents_w+200) {
			var r_posi = ((window_w/2) - (950/2)) - 100 ;
			totop_btn.stop().animate({
				'right': r_posi
			}, 200);
		} else {
			totop_btn.stop().animate({
				'right': '10px'
			}, 200);
		}
	}

	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 150) {
			if (check == false) {
				check = true;
				if (browser_version == 'ie7' || browser_version == 'ie8') {
					totop_btn.stop().show();
				} else {
					totop_btn.stop().fadeIn();
				}
			}
		} else {
			if (check) {
				check = false;
				if (browser_version == 'ie7' || browser_version == 'ie8') {
					totop_btn.stop().hide();
				} else {
					totop_btn.stop().fadeOut();
				}
			}
		}
	});

	var timer = false;
	$(window).resize(function () {
		if (timer !== false) {
			clearTimeout(timer);
		}
		timer = setTimeout(function () {
			right_position();
		}, 500);
	});

}

/* Histry Back
----------------------------------------------------*/

function histry_back() {
	var $btn = $('#hd_returnbtn, #ft_returnbtn');

	$btn.on('click', function () {
		history.back();
		return false;
	});
}

/* Add Child Class
----------------------------------------------------*/

function add_child() {
	$('ul, dl, table tbody').each(function () {
		$('> *:last', this).addClass('last-child');
		$('> *:first', this).addClass('first-child');
	});
	$('.cmn_calender02 thead tr th:nth-child(odd)').addClass('odd');
	$('.cmn_calender02 tbody tr td:nth-child(odd)').addClass('odd');
}

/* Tab Change
----------------------------------------------------*/

function tab_change() {
	$('.tabContainer01').each(function () {
		var $container = $(this),
			$nav = $container.find('.tabNav > li'),
			$child = $container.find('.tabChild'),
			navIndex = 0;
		if ($nav.hasClass('cmn_tabnavcrt')) {
				navIndex = $nav.index($container.find('.tabNav > .cmn_tabnavcrt'));
			}
		$child.hide().eq(navIndex).show().addClass('cmn_tabcrt');
		$nav.eq(navIndex).addClass('cmn_tabnavcrt');
		$nav.each(function (index) {
				var $self = $(this);
				$self.on('click', function (e) {
					e.preventDefault();
					$child.hide().removeClass('cmn_tabcrt').eq(index).show().addClass('cmn_tabcrt');
					$nav.removeClass('cmn_tabnavcrt');
					$self.addClass('cmn_tabnavcrt');
				});
			});
	});
}


/* hd_ticket_modal
----------------------------------------------------*/

function hd_ticket_modal() {
	if ($("#hd_ticket")[0]) {
		if (browser_version == 'ie8') {
			$("#hd_ticket").colorbox({
				top: '0px',
				transition: 'none',
				width: '986px',
				initialWidth: '986px',
				iframe: true,
				height: '100%'
			});
		} else if (browser_version == 'ie7') {
			$("#hd_ticket").colorbox({
				top: '-16px',
				transition: 'none',
				width: '986px',
				initialWidth: '986px',
				iframe: true,
				height: '100%'
			});
		} else {
			$("#hd_ticket").colorbox({
				top: '0px',
				transition: 'none',
				width: '965px',
				initialWidth: '950px',
				iframe: true,
				height: '100%'
			});
		}
		$('#hd_ticket').colorbox({
			onOpen: function () {
				$('#colorbox').addClass('colorboxPos');
				megamenuLoadFlag = false;
			},
			onClosed: function () {
				$('#colorbox').removeClass('colorboxPos');
			},
			onComplete: function () {
				img_hover();
			}
		});
		$('#cboxClose, #cboxOverlay').click(function () {
			$.colorbox.close();
			return false;
		});

	}
}

/* hd_ticket_modal
----------------------------------------------------*/

function contents_modal() {
	//cmn_modal_btn01
	$('.cmn_modal_btn01').click(function (e) {
		var tgt = $(this).attr('id') + '_target';
		$('#' + tgt).modal({
			containerId: 'cmn_modal_container_470',
			opacity: 85,
			overlayClose: true,
			onClose:function(dialog){
				$(document).trigger('closemodal.XP');
				$.modal.close();
			}
		});
		return false;
	});
	//cmn_modal_btns01（1モーダルに対して複数のボタン）
	$('.cmn_modal_btns01').click(function (e) {
		var tgt = $(this).attr('role') + '_target';
		$('#' + tgt).modal({
			containerId: 'cmn_modal_container_470',
			opacity: 85,
			overlayClose: true,
			onClose:function(dialog){
				$(document).trigger('closemodal.XP');
				$.modal.close();
			}
		});
		return false;
	});
	//cmn_modal_address01
	return;
	$('.cmn_modalbtn_address01').click(function (e) {
		$('.cmn_modal_address01').modal({
			containerId: 'cmn_modal_container_700',
			opacity: 85,
			overlayClose: true,
			autoResize: true
		});
		radio_check();
		return false;
	});
}

/* Radio Check
----------------------------------------------------*/

function radio_check() {
	if ($('.cmn_form_radio input[type=radio]').length==0&&$('.cmn_form_radiolist01 input[type=radio]').length==0) return;

	var $radio = $('.cmn_form_radio input[type=radio], .cmn_form_radiolist01 input[type=radio]');
	var $cls = 'current';
	change_check();
	$radio.on('change', function () {
		change_check();
	});

	function change_check() {
		$radio.next('label').removeClass($cls);
		$radio.filter(':checked').each(function () {
			$(this).next('label').addClass($cls);
		});
	}
}

/* Radiobox Check
----------------------------------------------------*/

function radiobox_check() {
	var $radio = $('.cmn_form_radiobox01 input[type=radio]');
	var $box = $('.cmn_form_radiobox01 .cmn_form_radiowrap01');
	var $cls = 'current';
	if ($radio.parents('#pay_creditcard').length===1) return;
	if ($radio.parents('#pay_convenience').length===1) return;

	$box.on('click', function () {
		$(this).parents('.cmn_form_radiobox01').children('.cmn_form_radiowrap01').removeClass($cls);
		$(this).parents('.cmn_form_radiobox01').find('input[type=radio]').each(function () {
			$(this).prop('checked', false);
		});
		$(this).find('input[type=radio]').prop('checked', true);
		$(this).addClass($cls);
	});

	change_check();
	$radio.on('change', function () {
		change_check();
	});

	function change_check() {
		$radio.parents('.cmn_form_radiowrap01').removeClass($cls);
		$radio.filter(':checked').each(function () {
			$(this).parents('.cmn_form_radiowrap01').addClass($cls);
		});
	}
}

/* Checkbox Check
----------------------------------------------------*/

function checkbox_check() {
	var $checkbox = $('.cmn_form_check input[type=checkbox]');
	var $cls = 'current';

	change_check();
	$checkbox.on('change', function () {
		change_check();
	});

	function change_check() {
		$checkbox.next('label').removeClass($cls);
		$checkbox.filter(':checked').each(function () {
			$(this).next('label').addClass($cls);
		});
	}
}


/* Disabled Check
----------------------------------------------------*/

function disabled_check() {
	if ($('body').attr('id')=='inputnm') return; // 購入者情報で不具合が出るため

	var $check = $('.disabled_check input');
	var $target = $('.disabled_check_target button');
	var flag = 0;

	$target.css({
		'opacity': 0.2
	});

	d_check();
	$check.on('click', function () {
		d_check();
	});

	function d_check() {
		$check.each(function () {
			if ($(this).attr("type") == "radio") return;
			if ($(this).prop('checked') == true) {
				flag = 1;
			} else {
				flag = 0;
				return false;
			}
		});

		if (flag == 1) {
			$check.each(function () {
				if ($(this).attr("type") != "radio") return;
				if ($("input[name=" + this.name + "]:checked").val() !== undefined && $("input[name=" + this.name + "]:checked").val() != "") {
					flag = 1;
				} else {
					flag = 0;
					return false;
				}
			});
		}

		if (flag == 0) {
			$target.prop('disabled', true);
			$target.css({
				'opacity': 0.2
			});
		} else {
			$target.prop('disabled', false);
			$target.css({
				'opacity': 1
			});
		}
	}
}

/* Custom Select
----------------------------------------------------*/

function custom_select() {
	var $tgt = $('.cmn_form_select');
	$tgt.each(function () {
		$($(this)).customSelect();
	});
}
/* Height Line
----------------------------------------------------*/

function height_line() {
	var $resulttgt01 = $('.cmn_resultheight01');
	if ($resulttgt01[0]) {
		$resulttgt01.tile();
	}

	var $tgt01 = $('.cmn_calender01 .cmn_calender_tbl_inner01');
	if ($tgt01[0]) {
		$tgt01.tile(7);
	}
	var $tgt02 = $('.cmn_calender01 .cmn_calender_tbl_day01');
	if ($tgt02[0]) {
		$tgt02.tile(7);
	}
	var $tgt02 = $('.cmn_calender02 .cmn_calender_tbl_inner01');
	if ($tgt02[0]) {
		$tgt02.tile();
	}
}


/* ***************************************************************************** */

/** -------------------------------------------------------
 ** Advanced Function
 ** ------------------------------------------------------- */

/* Cart Counter
----------------------------------------------------*/

function cart_check() {


	/*
		カンマ追加 =========================================================================
	*/
	var addFigure = function (str) {
    var num = new String(str).replace(/,/g, "");
    while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
    return num;
	}

	var setCarti = function() {
		if ($('#hd_cart').length==0&&$('#hdnav_nav03').length==0) return;
		var target = null;
		if ($('#hd_cart').length==1)target = $('#hd_cart');
		if ($('#hdnav_nav03').length==1)target = $('#hdnav_nav03');
		$.ajax({
			type: 'POST',
			url: URL_FUNC001,
			dataType: "jsonp",
			jsonpCallback: "jsonCallback_func001",
			scriptCharset: "utf-8",
			timeout:60000
		}).done(function(data) {
			cart_json_data = data;
			if (data.result=='1') {
				$(window).trigger('RESULT1_ERROR');
				return;
			}
			var cartObj = {
				"result": data.result,
				"carti": data.carti,
				"amount": data.amount,
				"admissiondate": data.admissiondate,
				"ticketcode": data.ticketcode
			};

			// 合計金額
			$('#hd_cart_total_txt02').find('strong').text('￥'+addFigure(data.amount));

			// カートカウンター
			if (data.carti == '0') {
				$(window).trigger(new $.Event('CART_INFO_DATA_LOADED', {cartinfo: cartObj}));
				if (target==null) return;
				target.find('span').remove();
			} else {
				$(window).trigger(new $.Event('CART_INFO_DATA_LOADED', {cartinfo: cartObj}));
				if (target==null) return;
				if (target.find('span').length==0) target.find('a').append('<span></span>');
				if ($('#ft_cart').find('span').length==0) $('#ft_cart').find('a').append('<span></span>');
				if (parseInt(data.carti)>=99) data.carti = '99+';
				target.find('span').text(data.carti);
				$('#ft_cart').find('span').text(data.carti);
			}
		}).fail(function(a,b,c) {
			if (b=='timeout') $(window).trigger('TIME_OUT_ERROR');
			$(window).trigger('API_LOAD_END');
		});
	}
	setCarti();
}

/* Loading Animation
----------------------------------------------------*/
function api_loading_icon() {
	$(window).on('API_LOAD_START', function() {
		$('body').append('<div id="apiLoadingOverlay"><img id="apiLoaderIcon" src="/pc/images/ajax-loader.gif"></div>');
		$('#apiLoaderIcon').css({
			'position': 'absolute',
			'top': $(window).height()/2+$(window).scrollTop(),
			'left': $(window).width()/2-64,
			'z-index': '10001'
		})
		$('#apiLoadingOverlay').css({
			'position': 'absolute',
			'top': '0',
			'left': '0',
			'width': $(window).width(),
			'height': $(document).height(),
			'background-color': '#fff',
			'z-index': '10000',
			'opacity': '0.7'
		}).hide();
		$('#apiLoadingOverlay').show();
	}).on('CALENDAR_BUILD_COMPLET', function() {
		$('#apiLoadingOverlay').hide().remove();
	}).on('ADDRESS_JSON_LOADED', function() {
		$('#apiLoadingOverlay').hide().remove();
	}).on('API_LOAD_END', function() {
		$('#apiLoadingOverlay').hide().remove();
	})
}

function set_megamenu_url() {
	if ($('#hd_btn_for_hotel').length==1) return;
	if ($('#hd_btn').length==0) return;
	$('#hd_btn').find('a').attr('href', URL_MEGA_MENU);

}

function changeIframeSize(event){
	if (event.originalEvent.origin != ORIGIN_WWW) return;
	var control	= event.originalEvent.data;
	if (!megamenuLoadFlag) {
		$('#cboxLoadedContent').height(control);
		$('#cboxContent').height(control);
		$('#cboxWrapper').height(control);
		$('#colorbox').height(control);
		megamenuLoadFlag = true;
	} else {
		$('body, html').animate({'scrollTop': control+'px'}, 1000, 'easeOutExpo');
	}
}

if (browser_version != 'ie7') $(window).on('message', changeIframeSize);


/* 認証画面 back btn
----------------------------------------------------*/
function set_param_backbtn() {
	if ($('#ft_returnbtn').length==0) return;
	var getQueryString = function() {
	  var result = {};
	  if(1 < window.location.search.length ){
	    var query = window.location.search.substring(1);
	    var parameters = query.split('&');
	    for(var i = 0; i < parameters.length; i++){
	      var element = parameters[i].split('=');
	      result[decodeURIComponent(element[0])] = decodeURIComponent(element[1]);
	    }
	  }
	  return result;
	}
	var querys = getQueryString();
	for(key in querys){
		if (key=='back'&&querys[key]=='1') {
			$('#ft_returnbtn, #hd_returnbtn').hide();
			$('#hd_home').css({'padding': '0 0 0 19px'});
		}
	}
}


/* エラー時のモーダル
----------------------------------------------------*/
function set_error_modal() {
	$(window).on('RESULT1_ERROR', function() {build_error_modal(ERROR_TXT_01, ['WEBチケットストアトップへ'], ['http://www.usj.co.jp/ticket/']);});
	if ( typeof(HOTEL_SALE_FLAG) != "undefined" && HOTEL_SALE_FLAG == '1' ) {
		$(window).on('TICKET_NO_STOCK', function() {build_error_modal(ERROR_TXT_02, ['チケット一覧へ', 'カート画面へ'], ['htlist.do', '/t/tkt/cart.do']);});
	} else {
		$(window).on('TICKET_NO_STOCK', function() {build_error_modal(ERROR_TXT_02, ['チケット一覧へ', 'カート画面へ'], ['http://www.usj.co.jp/ticket/', '/t/tkt/cart.do']);});
	}
	$(window).on('TICKET_NO_STOCK_CONFIRM', function() {build_error_modal(ERROR_TXT_05, ['閉じる'], ['']);});
	$(window).on('TIME_OUT_ERROR', function() {build_error_modal(ERROR_TXT_03, ['閉じる'], ['']);	});
	$(window).on('TICKET_NO_STOCK_2DAY', function() {build_error_modal(ERROR_TXT_06, ['閉じる'], ['']);	});
}

function build_error_modal(errtxt, btntxt, btnurl) {
	var linkbtn = '';
	for (var i = 0, l = btntxt.length; i < l; i++) {
		linkbtn += '<p class="cmn_btn cmn_icobtn03_410x50"><a href="'+btnurl[i]+'" class="simplemodal-close">'+btntxt[i]+'</a></p>'
	};
	$(document.body).append('<div id="errormodal-overlay"></div>'+
														'<div id="errormodal_container" class="errormodal-container">'+
															'<div class="errormodal-wrap">'+
																'<div class="cmn_modal_alert01">'+
																	'<div class="cmn_modal_alert_inner01">'+
																		'<div class="cmn_modal_alert_txt01 cmn_errorbox01 mt0">'+
																			'<div class="cmn_modal_error_txt01">'+errtxt+'</div>'+
																		'</div>'+
																		linkbtn+
																	'</div>'+
																'</div>'+
															'</div>'+
														'</div>'
													);

	var modalResize = function() {
		$('#errormodal-overlay').width($(window).width()).height($(document).height());
		$('#errormodal_container').css({'left':($(window).width()/2)-($('#errormodal_container').width()/2),'top': ($(window).height()/2)-($('#errormodal_container').height()/2) + $(window).scrollTop()});
	}

	if (btnurl[0]=='') {
		$('#errormodal_container').find('.cmn_btn').on('click', function() {
			$(window).off('resize');
			$('#errormodal-overlay').remove();
			$('#errormodal_container').remove();
			return false;
		});
	}

	$(window).on('resize', modalResize);
	modalResize();

	if (btntxt.length==2) $('#errormodal_container').find('.cmn_icobtn03_410x50').eq(0).addClass('mb20');
}

/* システムメンテナンス
----------------------------------------------------*/
function jsonCallback_maintenance() {
	build_error_modal(ERROR_TXT_04, ['閉じる'], ['']);
}


/* ***************************************************************************** */