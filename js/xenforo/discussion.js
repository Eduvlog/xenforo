/*
 * XenForo discussion.min.js
 * Copyright 2010-2016 XenForo Ltd.
 * Released under the XenForo License Agreement: http://xenforo.com/license-agreement
 */
(function(c,h,i){XenForo.QuickReply=function(a){if(c("#messageList").length==0)return console.error("Quick Reply not possible for %o, no #messageList found.",a);var b=c('input[name="last_date"]',a);b.data("load-value")&&b.val(Math.max(b.val(),b.data("load-value")));var d=XenForo.MultiSubmitFix(a);this.scrollAndFocus=function(){c(i).scrollTop(a.offset().top);var b=XenForo.getEditorInForm(a);if(!b)return!1;b.$editor?b.focus(!0):b.focus();return this};a.data("QuickReply",this).bind({AutoValidationBeforeSubmit:function(a){if(c(a.clickedSubmitButton).is('input[name="more_options"]'))a.preventDefault(),
a.returnValue=!0;setTimeout(function(){c("#messageList").find(".messagesSinceReplyingNotice").remove()},250)},AutoValidationComplete:function(b){if(b.ajaxData._redirectTarget)h.location=b.ajaxData._redirectTarget;c('input[name="last_date"]',a).val(b.ajaxData.lastDate);d&&d();a.find("input:submit").blur();new XenForo.ExtLoader(b.ajaxData,function(){c(b.ajaxData.templateHtml).each(function(){this.tagName&&c(this).xfInsert("appendTo",c("#messageList"))})});var f=c("#QuickReply").find("textarea");f.val("");
(f=f.data("XenForo.BbCodeWysiwygEditor"))&&f.resetEditor(null,!0);a.trigger("QuickReplyComplete");return!1},BbCodeWysiwygEditorAutoSaveComplete:function(a){var b=c("#messageList"),d=b.find(".messagesSinceReplyingNotice");a.ajaxData.newPostCount&&a.ajaxData.templateHtml?d.length?(d.remove(),c(a.ajaxData.templateHtml).appendTo(b).show().xfActivate()):c(a.ajaxData.templateHtml).xfInsert("appendTo",b):d.remove()}})};XenForo.QuickReplyTrigger=function(a){a.click(function(){console.info("Quick Reply Trigger Click");
var b=null,d=null,e={},f=null;a.is(".MultiQuote")?b=c(a.data("form")):(b=c("#QuickReply"),b.data("QuickReply").scrollAndFocus());f=new c.Event("QuickReplyDataPrepare");f.$trigger=a;f.queryData=e;c(i).trigger(f);d||(d=XenForo.ajax(a.data("posturl")||a.attr("href"),e,function(c){if(XenForo.hasResponseError(c))return!1;delete d;var e=XenForo.getEditorInForm(b);if(!e)return!1;e.$editor?(e.insertHtml(c.quoteHtml),console.info("QuoteHTML: %s",c.quoteHtml),e.$editor.data("xenForoElastic")&&e.$editor.data("xenForoElastic")()):
e.val(e.val()+c.quote);a.is(".MultiQuote")&&b.trigger("MultiQuoteComplete")}));return!1})};XenForo.InlineMessageEditor=function(a){new XenForo.MultiSubmitFix(a);a.bind({AutoValidationBeforeSubmit:function(a){if(c(a.clickedSubmitButton).is('input[name="more_options"]'))a.preventDefault(),a.returnValue=!0},AutoValidationComplete:function(b){var d=a.closest("div.xenOverlay").data("overlay");d.getTrigger().data("target");XenForo.hasTemplateHtml(b.ajaxData,"messagesTemplateHtml")||XenForo.hasTemplateHtml(b.ajaxData)?
(b.preventDefault(),d.close().getTrigger().data("XenForo.OverlayTrigger").deCache(),XenForo.showMessages(b.ajaxData,d.getTrigger(),"instant")):console.warn("No template HTML!")}})};XenForo.NewMessageLoader=function(a){var b=!1;a.click(function(d){d.preventDefault();b||(b=!0,XenForo.ajax(a.data("href")||a.attr("href"),{},function(a){if(XenForo.hasResponseError(a))return!1;var b=c("#QuickReply"),d=c("#messageList");c('input[name="last_date"]',b).val(a.lastDate);new XenForo.ExtLoader(a,function(){d.find(".messagesSinceReplyingNotice").remove();
c(a.templateHtml).each(function(){this.tagName&&c(this).xfInsert("appendTo",d)})})}).always(function(){b=!1}))})};XenForo.MessageLoader=function(a){a.click(function(b){b.preventDefault();var d=[];c(a.data("messageselector")).each(function(a,b){d.push(b.id)});d.length?XenForo.ajax(a.attr("href"),{messageIds:d},function(b){XenForo.showMessages(b,a,"fadeDown")}):console.warn("No messages found to load.")})};XenForo.showMessages=function(a,b,d){var e=function(a,b){switch(d){case "instant":d={show:"xfShow",
hide:"xfHide",speed:0};break;case "fadeIn":d={show:"xfFadeIn",hide:"xfFadeOut",speed:XenForo.speed.fast};break;default:d={show:"xfFadeDown",hide:"xfFadeUp",speed:XenForo.speed.normal}}c(a)[d.hide](d.speed/2,function(){c(b).xfInsert("replaceAll",a,d.show,d.speed)})};if(XenForo.hasResponseError(a))return!1;XenForo.hasTemplateHtml(a,"messagesTemplateHtml")?new XenForo.ExtLoader(a,function(){c.each(a.messagesTemplateHtml,e)}):XenForo.hasTemplateHtml(a)&&new XenForo.ExtLoader(a,function(){e(b.data("messageselector"),
a.templateHtml)})};XenForo.PollVoteForm=function(a){var b=function(b){new XenForo.ExtLoader(b,function(){var d=a.closest(".PollContainer");a.xfFadeUp(XenForo.speed.normal,function(){a.empty().remove();var g=c(b.templateHtml);g.is(".PollContainer")?g=g.children():g.find(".PollContainer").length&&(g=g.find(".PollContainer").children());g.xfInsert("appendTo",d);d.xfActivate()},XenForo.speed.normal,"swing")})};a.bind("AutoValidationComplete",function(a){a.preventDefault();XenForo.hasTemplateHtml(a.ajaxData)&&
b(a.ajaxData)});a.on("click",".PollChangeVote",function(a){a.preventDefault();XenForo.ajax(c(a.target).attr("href"),{},function(a){XenForo.hasTemplateHtml(a)&&b(a)},{method:"get"})});var d=a.data("max-votes")||0;if(d>1)a.on("click",".PollResponse",function(){var b=a.find(".PollResponse"),c=b.filter(":not(:checked)");b.length-c.length>=d?c.prop("disabled",!0):c.prop("disabled",!1)})};XenForo.MultiQuote=function(a){this.__construct(a)};XenForo.MultiQuote.prototype={__construct:function(a){this.$button=
a.click(c.context(this,"prepareOverlay"));this.$form=a.closest("form");this.cookieName=a.data("mq-cookie")||"MultiQuote";this.cookieValue=[];this.submitUrl=a.data("submiturl");this.$controls=new jQuery;this.getCookieValue();this.setButtonState();var b=this;this.$form.bind("MultiQuoteComplete",c.context(this,"reset"));this.$form.bind("MultiQuoteRemove MultiQuoteAdd",function(a,c){c&&c.messageId&&b.toggleControl(c.messageId,a.type=="MultiQuoteAdd")});c(i).bind("QuickReplyDataPrepare",c.context(this,
"quickReplyDataPrepare"))},getCookieValue:function(){var a=c.getCookie(this.cookieName);this.cookieValue=a==null?[]:a.split(",")},setButtonState:function(){this.getCookieValue();this.cookieValue.length?this.$button.show():this.$button.hide()},addControl:function(a){a.click(c.context(this,"clickControl"));this.getCookieValue();this.setControlState(a,c.inArray(a.data("messageid")+"",this.cookieValue)>=0,!0);this.$controls=this.$controls.add(a)},setControls:function(){var a=this;a.getCookieValue();this.$controls.each(function(){a.setControlState(c(this),
c.inArray(c(this).data("messageid")+"",a.cookieValue)>=0)})},setControlState:function(a,b,d){var c;c=this.$button;var f;b?(c=c.data("remove")||"-",f=!0):(c=c.data("add")||"+",f=!1);(!d||a.hasClass("active")!==f)&&a.toggleClass("active",b).find("span.symbol").text(c)},clickControl:function(a){a.preventDefault();var b,d,e,a=c(a.target).closest("a.MultiQuoteControl");a.is(".QuoteSelected")?(b=!0,d=c("#QuoteSelected").data("quote-html"),a.trigger("QuoteSelectedClicked")):(b=!a.is(".active"),d=null);this.toggleControl(a.data("messageid"),
b,d);(e=this.$button.data(b?"add-message":"remove-message"))&&XenForo.alert(e,"",2E3)},toggleControl:function(a,b,d){this.getCookieValue();var e=null;a+="";a.indexOf("-")>0&&(e=a.split("-"),a=e[0],e=e[1]);var f,g=c.inArray(a,this.cookieValue);f=this.$controls.filter(function(){return c(this).data("messageid")==a}).first();b?(f.length&&this.setControlState(f,!0),d!==null?this.storeSelectedQuote(a,d):this.removeQuotesFromStorage(a),g<0&&this.cookieValue.push(a)):(this.removeQuotesFromStorage(a,e),this.getStorageForId(a)||
(f.length&&this.setControlState(f,!1),g>=0&&this.cookieValue.splice(g,1)));this.cookieValue.length>0?c.setCookie(this.cookieName,this.cookieValue.join(",")):c.deleteCookie(this.cookieName);this.setButtonState()},storeSelectedQuote:function(a,b){var d=this.getStorageObject(),e=0;if(!d[a]||typeof d[a]!="object")d[a]={};c.each(d[a],function(a){e=a});e=parseInt(e,10)+1;d[a][e]=b;this.saveStorageObject(d)},removeQuotesFromStorage:function(a,b){var d=this.getStorageObject();a+="";if(!b&&a.indexOf("-")>
0)var e=a.split("-"),a=e[0],b=e[1];b?(delete d[a][b],c.isEmptyObject(d[a])&&delete d[a]):delete d[a];this.saveStorageObject(d)},getStorageObject:function(){if(!h.localStorage)return{};var a=null;try{a=JSON.parse(localStorage.getItem(this.cookieName))}catch(b){}if(a===null||typeof a!=="object")a={};return a},getStorageForId:function(a){var b=this.getStorageObject();return b[a]&&typeof b[a]=="object"&&!c.isEmptyObject(b[a])?b[a]:null},getStorageObjectFlat:function(){var a={};c.each(this.getStorageObject(),
function(b,d){typeof d=="object"&&c.each(d,function(d,c){a[b+"-"+d]=c})});return a},saveStorageObject:function(a){h.localStorage&&localStorage.setItem(this.cookieName,JSON.stringify(a))},prepareOverlay:function(){var a=this.getStorageObjectFlat();c.each(a,function(b,d){a[b]=XenForo.unparseBbCode(d)});XenForo.ajax(this.$button.data("href"),{quoteSelections:a},function(a){XenForo.hasTemplateHtml(a)&&new XenForo.ExtLoader(a,function(a){a.noCache=!0;XenForo.createOverlay(null,a.templateHtml,a).load()})})},
quickReplyDataPrepare:function(a){if(a.$trigger.is(".MultiQuote")){var b=this.getStorageObjectFlat();c.each(b,function(a,c){b[a]=XenForo.unparseBbCode(c)});a.queryData.quoteSelections=b;a.queryData.postIds=c(a.$trigger.data("inputs")).map(function(){return this.value}).get()}},reset:function(){c.deleteCookie(this.cookieName);this.cookieValue=[];h.localStorage&&localStorage.removeItem(this.cookieName);this.setControls();this.setButtonState()}};XenForo.MultiQuoteControl=function(a){var b=a.data("mq-target")||
"#MultiQuote";(b=c(b).data("XenForo.MultiQuote"))&&b.addControl(a)};XenForo.MultiQuoteRemove=function(a){a.click(function(){var b=a.closest(".MultiQuoteItem"),d=b.find(".MultiQuoteId").val(),e=c(c("#MultiQuoteForm").data("form")),f=a.closest(".xenOverlay");d&&e.trigger("MultiQuoteRemove",{messageId:d});b.remove();f.length&&!f.find(".MultiQuoteItem").length&&f.overlay().close()})};XenForo.Sortable=function(a){a.sortable({forcePlaceholderSize:!0}).bind({sortupdate:function(){},dragstart:function(a){console.log("drag start, %o",
a.target)},dragend:function(){console.log("drag end")}})};XenForo.SelectQuotable=function(a){this.__construct(a)};XenForo.SelectQuotable.prototype={__construct:function(a){if(h.getSelection&&c("#QuickReply").length){this.$messageTextContainer=null;var b=this,d=!1,e,f=function(){!e&&!b.processing&&(e=setTimeout(function(){e=null;b._handleSelection()},100))};a.on("mousedown",function(){d=!0});a.on("mouseup",function(){d=!1;f()});c(i).on("selectionchange",function(){d||f()});c(i).on("QuickReplyDataPrepare",
function(a){var b=a.$trigger.closest("#QuoteSelected");if(b.length)a.queryData.quoteHtml=XenForo.unparseBbCode(b.data("quote-html")),a.$trigger.trigger("QuoteSelectedClicked")})}},buttonClicked:function(){var a=h.getSelection();a.isCollapsed||(a.collapse(a.getRangeAt(0).commonAncestorContainer,0),this.hideQuoteButton())},_handleSelection:function(){this.processing=!0;var a=h.getSelection();this._isValidSelection(a)?this.showQuoteButton(a):this.hideQuoteButton();var b=this;setTimeout(function(){b.processing=
!1},0)},_isValidSelection:function(a){this.$messageTextContainer=null;if(a.isCollapsed||!a.rangeCount)return!1;a=a.getRangeAt(0);this._adjustRange(a);if(!c.trim(a.toString()).length&&!a.cloneContents().querySelectorAll("img").length)return!1;var b=c(a.commonAncestorContainer).closest(".SelectQuoteContainer");if(!b.length)return!1;if(!b.closest(".message").find("a.MultiQuoteControl, a.ReplyQuote").length)return!1;if(c(a.startContainer).closest(".bbCodeQuote, .NoSelectToQuote").length||c(a.endContainer).closest(".bbCodeQuote, .NoSelectToQuote").length)return!1;
this.$messageTextContainer=b;return!0},_adjustRange:function(a){var b=!1,d=!1;a.endOffset==0&&(d=c(a.endContainer),a.endContainer.nodeType==3&&!a.endContainer.previousSibling&&(d=d.parent()),d=d.is(".quote, .attribution, .bbCodeQuote"));d&&(d=c(a.endContainer).closest(".bbCodeQuote"),d.length&&(a.setEndBefore(d[0]),b=!0));b&&(b=h.getSelection(),b.removeAllRanges(),b.addRange(a))},showQuoteButton:function(a){var b=this.$messageTextContainer.closest("[id]").attr("id");if(this.$button===void 0||this.$button.data("id")!==
b)this.hideQuoteButton(),this.createButton(),this.$button.data("id",b);this.$button.data("quote-html",this.getSelectionHtml(a));var b=this.$button.width(),a=this.getButtonPositionMarker(a),d=this.$messageTextContainer?this.$messageTextContainer.offset().left:0;a.left-b<d?this.$button[XenForo.isRTL()?"addClass":"removeClass"]("flipped").css("left",a.left-16):this.$button[XenForo.isRTL()?"removeClass":"addClass"]("flipped").css("left",a.left-b-5);this.$button.css({position:"absolute",top:a.top+6}).show()},
getButtonPositionMarker:function(a){var b,d,e;b=c("<span />");b.text(c.browser.opera?"x":"\u200b");d=a.getRangeAt(0).cloneRange();a=d.getBoundingClientRect?d.getBoundingClientRect():null;d.collapse(!1);d.insertNode(b[0]);var f=0;do{d=!1;f++;b[0].parentNode&&b[0].parentNode.className=="messageTextEndMarker"&&(b.insertBefore(b[0].parentNode),d=!0);b[0].previousSibling&&b[0].previousSibling.nodeType==3&&c.trim(b[0].previousSibling.textContent).length==0&&(b.insertBefore(b[0].previousSibling),d=!0);if(b[0].parentNode&&
b[0].parentNode.tagName=="LI"&&!b[0].previousSibling){var g=b[0].parentNode;c(g).prev("li").length?(b.appendTo(c(g).prev("li")),d=!0):g.parentNode&&(b.insertBefore(g.parentNode),d=!0)}b[0].parentNode&&!b[0].previousSibling&&c.inArray(b[0].parentNode.tagName,["DIV","BLOCKQUOTE","PRE"])!=-1&&(b.insertBefore(b[0].parentNode),d=!0);b[0].previousSibling&&c.inArray(b[0].previousSibling.tagName,["OL","UL"])!=-1&&(c(b[0].previousSibling).find("li:last").append(b),d=!0);b[0].previousSibling&&c.inArray(b[0].previousSibling.tagName,
["DIV","BLOCKQUOTE","PRE"])!=-1&&(b.appendTo(b[0].previousSibling),d=!0);b[0].previousSibling&&b[0].previousSibling.tagName=="BR"&&(b.insertBefore(b[0].previousSibling),d=!0)}while(d&&f<5);e=b.offset();d=b.height();b.parentsUntil("body").each(function(){var a=c(this),b;switch(a.css("overflow-x")){case "hidden":case "scroll":case "auto":b=a.offset().left;a=b+a.outerWidth();if(e.left<b)e.left=b;if(a<e.left)e.left=a}});b.remove();a&&!XenForo.isRTL()&&e.left-a.left>32&&(e.left-=16);e.top+=d;return e},
createButton:function(){if(!this.$messageTextContainer.length)return!1;var a=this.$messageTextContainer.closest(".message");this.$button=c('<div id="QuoteSelected" class="xenTooltip"></div>').click(c.context(this,"hideQuoteButton")).append('<span class="arrow"></span>');var b=a.find("a.MultiQuoteControl").first().clone();b.length&&(b.addClass("QuoteSelected").attr("title","").on("QuoteSelectedClicked",c.context(this,"buttonClicked")),b.find("span.symbol").text(c(".MultiQuoteWatcher").data("add")),
new XenForo.MultiQuoteControl(b),this.$button.append(b),this.$button.append(i.createTextNode(" | ")));a=a.find("a.ReplyQuote").clone();a.addClass("QuoteSelected").attr("title","").on("QuoteSelectedClicked",c.context(this,"buttonClicked"));new XenForo.QuickReplyTrigger(a);this.$button.append(a);c(i.body).append(this.$button);var d=this,e=c(h).width();c(h).on("resize.SelectQuotable",function(){var a=c(h).width();a!=e&&(e=a,d._handleSelection())});c(i).on("XFOverlay.SelectQuotable",function(){d.hideQuoteButton();
h.getSelection().collapseToEnd()})},hideQuoteButton:function(){this.$button!==void 0&&(this.$button.remove(),delete this.$button);c(h).off("resize.SelectQuotable");c(i).off("XFOverlay.SelectQuotable")},getSelectionHtml:function(a){var b=i.createElement("div"),d,c;for(d=0,c=a.rangeCount;d<c;d++)b.appendChild(a.getRangeAt(d).cloneContents());return this.prepareSelectionHtml(b.innerHTML)},prepareSelectionHtml:function(a){return a}};XenForo.unparseBbCode=function(a){var b=c(i.createElement("div"));b.html(a);
console.log(b.find(".bbCodeQuote").length);b.find(".NoSelectToQuote").each(function(){c(this).remove()});c.each(["B","I","U"],function(a,e){b.find(e).each(function(){c(this).replaceWith("["+e+"]"+c(this).html()+"[/"+e+"]")})});b.find(".bbCodeQuote").each(function(){var a=c(this),b=a.find(".quote");b.length?a.replaceWith("<div>[QUOTE]"+b.html()+"[/QUOTE]</div>"):b.find(".quoteExpand").remove()});b.find(".bbCodeCode, .bbCodeHtml, .bbCodePHP").each(function(){var a=c(this),b=c(this).find("div.type").first().text(),
f="pre";b!==""&&(b=b.replace(/^(.+):$/,"$1"));a.is(".bbCodePHP")&&(f="code");a.replaceWith(a.find(f).first().attr("data-type",b))});b.find('div[style*="text-align"]').each(function(){var a=c(this).css("text-align").toUpperCase();c(this).replaceWith("["+a+"]"+c(this).html()+"[/"+a+"]")});b.find(".bbCodeSpoilerContainer").each(function(){var a,b;a=c(this).find(".bbCodeSpoilerButton");if(a.length&&(a=a.data("target")))b=c(this).find(a).html(),$spoilerTitle=c(this).find(".SpoilerTitle"),a=$spoilerTitle.length?
'="'+$spoilerTitle.text()+'"':"",c(this).replaceWith("[SPOILER"+a+"]"+b+"[/SPOILER]")});console.info("HTML to be sent: %s",b.html());return b.html()};XenForo.register("#QuickReply","XenForo.QuickReply");XenForo.register("a.ReplyQuote, a.MultiQuote, a.QuoteSelected","XenForo.QuickReplyTrigger");XenForo.register("form.InlineMessageEditor","XenForo.InlineMessageEditor");XenForo.register("a.MessageLoader","XenForo.MessageLoader");XenForo.register("a.NewMessageLoader","XenForo.NewMessageLoader");XenForo.register("form.PollVoteForm",
"XenForo.PollVoteForm");XenForo.register(".MultiQuoteWatcher","XenForo.MultiQuote");XenForo.register("a.MultiQuoteControl","XenForo.MultiQuoteControl");XenForo.register("a.MultiQuoteRemove","XenForo.MultiQuoteRemove");XenForo.register(".Sortable","XenForo.Sortable");XenForo.register(".SelectQuotable","XenForo.SelectQuotable")})(jQuery,this,document);