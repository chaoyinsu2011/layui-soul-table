/**
 *
 * @name:  表格增强插件
 * @author: yelog
 * @link: https://github.com/yelog/layui-soul-table
 * @license: MIT
 * @version: v1.9.1
 */
layui.define(["table","tableFilter","tableChild","tableMerge"],function(exports){var tableFilter=layui.tableFilter,tableChild=layui.tableChild,tableMerge=layui.tableMerge,$=layui.$,table=layui.table,HIDE="layui-hide",tables={},originCols={},defaultConfig={fixTotal:!1,drag:!0,rowDrag:!1,autoColumnWidth:!0,contextmenu:!1,fixResize:!0,overflow:!1,fixFixedScroll:!0,filter:!1},_BODY=$("body"),_DOC=$(document),mod={render:function(e){tables[e.id]=e;var t,i,l,a=$.extend({},defaultConfig,e);a.filter&&a.filter.cache?(t=location.pathname+location.hash+e.id,i=this.deepStringify(e.cols),originCols[e.id]||(originCols[e.id]=this.deepClone(e.cols),(l=localStorage.getItem(t))&&i===localStorage.getItem("origin"+t)?this.updateCols(e,this.deepParse(l)):(localStorage.setItem("origin"+t,i),localStorage.removeItem(t)))):this.clearCache(e),tableFilter.render(e),tableChild.render(e),tableMerge.render(e),this.suspendConfig[e.id]={drag:!1,rowDrag:!1},a.fixTotal&&this.fixTotal(e),a.drag&&this.drag(e,a.drag),a.rowDrag&&this.rowDrag(e,a.rowDrag),a.autoColumnWidth&&this.autoColumnWidth(e,a.autoColumnWidth),this.contextmenu(e,a.contextmenu),a.fixResize&&this.fixResizeRightFixed(e),a.overflow&&this.overflow(e,a.overflow),a.fixFixedScroll&&this.fixFixedScroll(e)},config:function(e){"object"==typeof e&&$.extend(!0,defaultConfig,e)},updateCols:function(a,n){for(var o,r,e={},t=[],i=[],l=$(a.elem).next().children(".layui-table-box"),d=l.children(".layui-table-fixed").children(".layui-table-header").children("table"),s=$.merge(l.children(".layui-table-header").children("table"),d),c=l.children(".layui-table-header").children("table"),h=l.children(".layui-table-fixed").children(".layui-table-body").children("table"),f=l.children(".layui-table-body").children("table"),u=$.merge(l.children(".layui-table-body").children("table"),h),b=0;b<a.cols.length;b++)for(o=0;o<a.cols[b].length;o++)a.cols[b][o].oldPos=b+"-"+o,e[a.cols[b][o].key]=a.cols[b][o];for(b=0;b<n.length;b++){for(i=[],o=0;o<n[b].length;o++){if(r=n[b][o].key,n[b][o].width&&e[n[b][o].key]!==n[b][o].width&&this.getCssRule(a,r,function(e){e.style.width=(n[b][o].width||0)+"px"}),e[n[b][o].key].hide!==n[b][o].hide&&(s.find('th[data-key="'+r+'"]')[n[b][o].hide?"addClass":"removeClass"]("layui-hide"),u.find('td[data-key="'+r+'"]')[n[b][o].hide?"addClass":"removeClass"]("layui-hide")),e[n[b][o].key].oldPos!==b+"-"+o||e[n[b][o].key].fixed!==n[b][o].fixed)return a.cols=n,void table.reload(a.id);e[n[b][o].key].fixed=n[b][o].fixed,e[n[b][o].key].width=n[b][o].width,e[n[b][o].key].hide=n[b][o].hide,i.push(e[n[b][o].key])}t.push(i)}function p(e,t){for(b=0;b<n.length;b++)for(o=0;o<n[b].length;o++){r=a.index+"-"+n[b][o].key;var i,l=$(e).children(t+":eq("+o+")").attr("data-key");l!==r&&($(e).children(t+":eq("+o+")").before($(e).children(t+'[data-key="'+r+'"]')),n[b][o].fixed)&&(i=("th"===t?d:h).children().children("th"===t?"tr":'tr[data-index="'+$(e).attr("data-index")+'"]')).children(t+'[data-key="'+l+'"]').before(i.children(t+'[data-key="'+r+'"]'))}}c.children().children("tr").each(function(){p(this,"th")}),f.children().children("tr").each(function(){p(this,"td")}),a.cols=t,table.resize(a.id)},export:function(e,t){tableFilter.export(e.config||e,t)},getCssRule:function(e,i,l){e=e.elem.next().find("style")[0],e=e.sheet||e.styleSheet||{},e=e.cssRules||e.rules;layui.each(e,function(e,t){if(t.selectorText===".laytable-cell-"+i)return l(t),!0})},autoColumnWidth:function(e,n){var t=this;function i(d,i){var e=$(i.elem),t=e.next().children(".layui-table-box").children(".layui-table-header").children("table").children("thead").children("tr").children("th"),l=e.next().children(".layui-table-box").children(".layui-table-fixed").children(".layui-table-header").children("table").children("thead").children("tr").children("th"),s=e.next().children(".layui-table-box").children(".layui-table-body").children("table").children("tbody").children("tr"),c=e.next().children(".layui-table-total").find("tr");function a(e,t,i){var l=t.data("key");if(!(1<t.attr("colspan")||t.data("unresize"))&&i){var a=t.text().width(t.css("font"))+21,n=t.css("font");s.children('td[data-key="'+l+'"]').each(function(e,t){var i=0;$(this).children().children()&&0<$(this).children().children().length?i+=$(this).children().html().width(n):i=$(this).text().width(n),a<i&&(a=i)}),0<c.length&&(i=c.children('td[data-key="'+l+'"]').text().width(n),a<i)&&(a=i),a+=32,d.getCssRule(e,l,function(e){e.style.width=a+"px"});for(var o=0;o<e.cols.length;o++)for(var r=0;r<e.cols[o].length;r++)if(e.cols[o][r].key===l){e.cols[o][r].width=a;break}}}String.prototype.width=function(e){var e=e||_BODY.css("font"),e=$("<div>"+this+"</div>").css({position:"absolute",float:"left","white-space":"nowrap",visibility:"hidden",font:e}).appendTo(_BODY),t=e.width();return e.remove(),t},void 0!==n&&void 0!==n.dblclick&&!n.dblclick||t.add(l).on("dblclick",function(e){var t=$(this),e=e.clientX-t.offset().left;a(i,t,0<t.parents(".layui-table-fixed-r").length?e<=10:t.width()-e<=10)}),n&&n.init&&t.add(l).each(function(e){var t=$(this).attr("data-key").split("-");!1===i.cols[t[1]][t[2]].autoWidth||Array.isArray(n.init)&&-1===n.init.indexOf($(this).attr("data-field"))||a(i,$(this),!0)})}"object"==typeof e?i(t,e):"string"==typeof e?i(t,tables[e]):void 0===e&&layui.each(tables,function(){i(t,this)})},drag:function(R,e){var D,t,F,s,_,c,O,W,T,h,z,X,E,Y,B,N;1<R.cols.length||(D=this,t=$(R.elem),F=t.next().children(".layui-table-box"),s=$.merge(F.children(".layui-table-header").children("table"),F.children(".layui-table-fixed").children(".layui-table-header").children("table")),_=F.children(".layui-table-fixed").children(".layui-table-body").children("table"),c=F.children(".layui-table-body").children("table"),O=$.merge(F.children(".layui-table-body").children("table"),_),W=t.next().children(".layui-table-total").children("table"),T=t.next().children(".layui-table-total").children("table.layui-table-total-fixed"),h=t.next().children(".layui-table-total").children("table:eq(0)"),z=R.id,X="simple"===e||e&&"simple"===e.type,E=e&&e.toolbar,B=Y=!1,s.attr("drag"))||(s.attr("drag",!0),E&&(F.append('<div class="soul-drag-bar"><div data-type="left">左固定</div><div data-type="none">不固定</div><div data-type="right">右固定</div></div>'),(N=F.children(".soul-drag-bar")).children("div").on("mouseenter",function(){$(this).addClass("active")}).on("mouseleave",function(){$(this).removeClass("active")})),s.find("th").each(function(){var e,d,k,C,w=$(this),S=w.data("field"),I=w.data("key");I&&(e=I.split("-"),d=R.cols[e[1]][e[2]],k=R.index+"-"+e[1]+"-"+e[2],C=0<w.parents(".layui-table-fixed").length,$(this).find("span:first,.laytable-cell-checkbox").css("cursor","move").on("mousedown",function(e){var p,t,y,x,v,m,r,g;D.suspendConfig[z].drag||0!==e.button||(e.preventDefault(),p=w.clone().css("visibility","hidden"),t=w.position().left,y=w.offset().top,x=e.clientX-t,v=w.parents("tr:eq(0)").css("background-color"),m=w.width(),r=$(this),g=d.fixed,B=!0,_DOC.bind("selectstart",function(){return!1}),_BODY.on("mousemove",function(e){if(B&&p){F.removeClass("no-left-border"),Y||(E&&(N.attr("data-type",g||"none"),N.addClass("active")),w.after(p),w.addClass("isDrag").css({position:"absolute","z-index":1,"border-left":"1px solid #e6e6e6","background-color":v,width:m+1}),X)||((C?_:O).find('td[data-key="'+I+'"]').each(function(){$(this).after($(this).clone().css("visibility","hidden").attr("data-clone","")),$(this).addClass("isDrag").css({position:"absolute","z-index":1,"border-left":"1px solid #e6e6e6","background-color":$(this).css("background-color"),width:m+1})}),0<W.length&&(C?T:W).find('td[data-key="'+I+'"]').each(function(){$(this).after($(this).clone().css("visibility","hidden").attr("data-clone","")),$(this).addClass("isDrag").css({position:"absolute","z-index":1,"background-color":$(this).parents("tr:eq(0)").css("background-color"),width:m+1})})),Y=!0;var t,i,l,a,n,o=e.clientX-x,r=p.prev().prev(),d=0<r.length,s=d?r.data("key").split("-"):[],c=p.next().hasClass("layui-table-patch")?[]:p.next(),h=0<c.length,f=h?c.data("key").split("-"):[],u=d&&p.position().left-o>r.width()/2,b=h&&o-p.position().left>c.width()/2;if(Math.abs(p.position().left-o),0<p.position().left-o?d&&!!g==!!R.cols[s[1]][s[2]].fixed:h&&!!g==!!R.cols[f[1]][f[2]].fixed){if(w.css("left",o),u){for(p.after(r),$("#soul-columns"+z+'>li[data-value="'+S+'"]').after($("#soul-columns"+z+'>li[data-value="'+S+'"]').prev()),l=0;l<R.cols.length;l++){for(a=0;a<R.cols[l].length;a++)if(R.cols[l][a].key===k){t=l,i=a;break}if(void 0!==t&&void 0!==i)break}n=R.cols[t][i-1],R.cols[t][i-1]=R.cols[t][i],R.cols[t][i]=n,D.fixTableRemember(R)}else if(b){for(p.prev().before(c),$("#soul-columns"+z+'>li[data-value="'+S+'"]').before($("#soul-columns"+z+'>li[data-value="'+S+'"]').next()),l=0;l<R.cols.length;l++){for(a=0;a<R.cols[l].length;a++)if(R.cols[l][a].key===k){t=l,i=a;break}if(void 0!==t&&void 0!==i)break}n=R.cols[t][i+1],R.cols[t][i+1]=R.cols[t][i],R.cols[t][i]=n,D.fixTableRemember(R)}O.find('td[data-key="'+I+'"][data-clone]').each(function(){$(this).prev().css("left",o),u?0!==$(this).prev().prev().length&&$(this).after($(this).prev().prev()):b&&0!==$(this).next().length&&$(this).prev().before($(this).next())}),0<W.length&&W.find('td[data-key="'+I+'"][data-clone]').each(function(){$(this).prev().css("left",o),u?0!==$(this).prev().prev().length&&$(this).after($(this).prev().prev()):b&&0!==$(this).next().length&&$(this).prev().before($(this).next())}),e.clientY-y<-15?(0===$("#column-remove").length&&_BODY.append('<i id="column-remove" class="layui-red layui-icon layui-icon-delete"></i>'),$("#column-remove").css({top:e.clientY-$("#column-remove").height()/2,left:e.clientX-$("#column-remove").width()/2,"font-size":y-e.clientY+"px"}),$("#column-remove").show()):$("#column-remove").hide()}else w.css("left",p.position().left),O.find('td[data-key="'+I+'"][data-clone]').each(function(e){$(this).prev().css("left",p.position().left)}),0<W.length&&W.find('td[data-key="'+I+'"][data-clone]').each(function(e){$(this).prev().css("left",p.position().left)}),F.addClass("no-left-border")}}).on("mouseup",function(){if(_DOC.unbind("selectstart"),_BODY.off("mousemove").off("mouseup"),B&&p){if(B=!1,Y){"checkbox"!==d.type&&r.on("click",function(e){e.stopPropagation()}),Y=!1,F.removeClass("no-left-border"),w.removeClass("isDrag").css({position:"relative","z-index":"inherit",left:"inherit","border-left":"inherit",width:"inherit","background-color":"inherit"}),w.next().remove();var e,t=w.prev().data("key");if(g&&(e=F.children(".layui-table-header").children("table").find('th[data-key="'+I+'"]'),t?e.parent().children('th[data-key="'+t+'"]').after(e):"right"===g?0<w.siblings().length&&F.children(".layui-table-header").children("table").find('th[data-key="'+w.next().data("key")+'"]').prev().after(e):(e.parent().prepend('<th class="layui-hide"></th>'),e.parent().children("th:first").after(e),e.parent().children("th:first").remove())),X?(O.find('td[data-key="'+I+'"]').each(function(){var e;t?$(this).parent().children('td[data-key="'+t+'"]').after($(this)):"right"===g?0<w.siblings().length&&(0<(e=$(this).parent().children('td[data-key="'+w.next().data("key")+'"]').prev()).length?e.after($(this)):($(this).parent().prepend('<td class="layui-hide"></td>'),$(this).parent().children("td:first").after($(this)),$(this).parent().children("td:first").remove())):($(this).parent().prepend('<td class="layui-hide"></td>'),$(this).parent().children("td:first").after($(this)),$(this).parent().children("td:first").remove())}),0<W.length&&W.find('td[data-key="'+I+'"]').each(function(){var e;t?$(this).parent().children('td[data-key="'+t+'"]').after($(this)):"right"===g&&0<(e=$(this).parent().children('td[data-key="'+w.next().data("key")+'"]').prev()).length?e.after($(this)):($(this).parent().prepend('<td class="layui-hide"></td>'),$(this).parent().children("td:first").after($(this)),$(this).parent().children("td:first").remove())})):C?(c.find('td[data-key="'+I+'"]').each(function(){var e;t?$(this).parent().children('td[data-key="'+t+'"]').after($(this)):"right"===g?0<w.siblings().length&&(0<(e=$(this).parent().children('td[data-key="'+w.next().data("key")+'"]').prev()).length?e.after($(this)):($(this).parent().prepend('<td class="layui-hide"></td>'),$(this).parent().children("td:first").after($(this)),$(this).parent().children("td:first").remove())):($(this).parent().prepend('<td class="layui-hide"></td>'),$(this).parent().children("td:first").after($(this)),$(this).parent().children("td:first").remove())}),_.find('td[data-key="'+I+'"][data-clone]').each(function(){$(this).prev().removeClass("isDrag").css({position:"relative","z-index":"inherit",left:"inherit","border-left":"inherit",width:"inherit","background-color":"inherit"}),$(this).remove()}),0<W.length&&(h.find('td[data-key="'+I+'"]').each(function(){var e;t?$(this).parent().children('td[data-key="'+t+'"]').after($(this)):"right"===g&&0<(e=$(this).parent().children('td[data-key="'+w.next().data("key")+'"]').prev()).length?e.after($(this)):($(this).parent().prepend('<td class="layui-hide"></td>'),$(this).parent().children("td:first").after($(this)),$(this).parent().children("td:first").remove())}),T.find('td[data-key="'+I+'"][data-clone]').each(function(){$(this).prev().removeClass("isDrag").css({position:"relative","z-index":"inherit",left:"inherit",width:"inherit","background-color":"inherit"}),$(this).remove()}))):(O.find('td[data-key="'+I+'"][data-clone]').each(function(){$(this).prev().removeClass("isDrag").css({position:"relative","z-index":"inherit",left:"inherit",width:"inherit","background-color":"inherit"}),$(this).remove()}),0<W.length&&W.find('td[data-key="'+I+'"][data-clone]').each(function(){$(this).prev().removeClass("isDrag").css({position:"relative","z-index":"inherit",left:"inherit",width:"inherit","background-color":"inherit"}),$(this).remove()})),p=null,E){if(0<N.children(".active").length&&N.children(".active").attr("data-type")!==N.attr("data-type")){for(var i,l,a,n=N.children(".active").attr("data-type"),o=0;o<R.cols.length;o++)for(i=0;i<R.cols[o].length;i++)"right"===n||"none"===n&&"right"===N.attr("data-type")?void 0===a&&("right"===R.cols[o][i].fixed?a={x:o,y:i}:i===R.cols[o].length-1&&(a={x:o,y:i+1})):void 0!==a||R.cols[o][i].fixed&&"right"!==R.cols[o][i].fixed||(a={x:o,y:i}),R.cols[o][i].key===k&&(l={x:o,y:i});d.fixed="none"!==n&&n,l.y!==a.y&&(R.cols[l.x].splice(l.y,1),l.y<a.y&&--a.y,R.cols[a.x].splice(a.y,0,d),D.fixTableRemember(R)),table.reload(z)}N.removeClass("active")}}else r.unbind("click");$("#column-remove").is(":visible")&&(s.find("thead>tr>th[data-key="+I+"]").addClass(HIDE),O.find('tbody>tr>td[data-key="'+I+'"]').addClass(HIDE),W.find('tbody>tr>td[data-key="'+I+'"]').addClass(HIDE),d.hide=!0,D.fixTableRemember(R),$("#soul-columns"+z).find('li[data-value="'+S+'"]>input').prop("checked",!1),tableFilter.resize(R)),$("#column-remove").hide()}}))}))}))},rowDrag:function(b,p){var y,e,x=this,v=$(b.elem),m=v.next().children(".layui-table-box"),g=m.children(".layui-table-fixed").children(".layui-table-body").children("table"),k=m.children(".layui-table-body").children("table"),t=$.merge(m.children(".layui-table-body").children("table"),g),C=b.id,w=!1,i=p.trigger||"row",S=!1!==p.numbers,I=null,R=0,l="row"===i?t.children("tbody").children("tr"):t.find(i);for("row"!==i&&t.find(i).css("cursor","move"),y=0;y<b.cols.length;y++)for(e=0;e<b.cols[y].length;e++)if("numbers"===b.cols[y][e].type){I=b.index+"-"+y+"-"+e,R=parseInt(k.find('td[data-key="'+I+'"]:first').text());break}l.on("mousedown",function(e){var r,d,s,c,h,f,t,u;x.suspendConfig[C].rowDrag||0!==e.button||(r="row"===i?$(this):$(this).parents("tr:eq(0)"),d=parseInt(r.data("index")),s=k.children("tbody").children("tr[data-index="+d+"]"),c=s.clone().css("visibility","hidden"),h=g.children("tbody").children("tr[data-index="+d+"]"),f=m.children(".layui-table-body").scrollTop(),t=r.position().top,u=e.clientY-t,_BODY.on("mousemove",function(e){w||(w=!0,l=(l=v.next().find("style")[0]).sheet||l.styleSheet||{},x.addCSSRule(l,".layui-table-view .layui-table td","cursor: move"),x.addCSSRule(l,".layui-table tr","transition: none"),m.addClass("noselect"),s.after(c),s.css({position:"absolute","z-index":1}),h.each(function(){$(this).after($(this).clone().css("visibility","hidden")),$(this).css({position:"absolute","z-index":102})}));var t=e.clientY-u+(m.children(".layui-table-body").scrollTop()-f),i=c.position().top,l=s.prev(),e=0<l.length,a=c.next(),n=0<a.length,o=e&&i-t>l.height()/2,r=n&&t-i>a.height()/2;function d(e,t){t=parseInt(e.data("index"))+t;return e.data("index",t),e.attr("data-index",t),e}(0<i-t?e:n)?(s.css("top",t),h.each(function(){$(this).css("top",t)}),o?(d(s,-1),c.after(d(l,1)),h.each(function(){d($(this),-1),$(this).next().after(d($(this).prev(),1))})):r&&(d(s,1).before(d(a,-1)),h.each(function(){d($(this),1),$(this).before(d($(this).next().next(),-1))}))):(s.css("top",i),h.each(function(){$(this).css("top",i)}))}).on("mouseup",function(e){if(_BODY.off("mousemove").off("mouseup"),w){w=!1,m.removeClass("noselect"),s.css({position:"inherit","z-index":"inherit"}),s.next().remove(),h.each(function(){$(this).css({position:"inherit","z-index":"inherit"}),$(this).next().remove()});var t=v.next().find("style")[0],t=t.sheet||t.styleSheet||{},t=t.cssRules||t.rules,t=(layui.each(t,function(e,t){".layui-table-view .layui-table td"===t.selectorText&&(t.style.cursor="default")}),r.index()),i=table.cache[C];if(t!==d)if("function"==typeof p.before&&!1===p.before.call(b,{row:i[d],newIndex:t,oldIndex:d,cache:i})){function l(e,t){e.data("index",t),e.attr("data-index",t)}if(t<d){for(y=t;y<d;y++)l(k.find('tr[data-index="'+(y+1)+'"]'),y),l(g.find('tr[data-index="'+(y+1)+'"]'),y);l(s,d),k.find('tr[data-index="'+(d-1)+'"]').after(s),h.each(function(){l($(this),d),$(this).parent().children('tr[data-index="'+(d-1)+'"]').after($(this))})}else{for(y=t;d<y;y--)l(k.find('tr[data-index="'+(y-1)+'"]'),y),l(g.find('tr[data-index="'+(y-1)+'"]'),y);l(s,d),k.find('tr[data-index="'+(d+1)+'"]').before(s),h.each(function(){l($(this),d),$(this).parent().children('tr[data-index="'+(d+1)+'"]').before($(this))})}}else{var a=i.splice(d,1)[0];if(i.splice(t,0,a),I&&S){var n=[t,d].sort();for(y=n[0];y<=n[1];y++){var o=R+y;g.find('td[data-key="'+I+'"]:eq('+y+")").children().html(o),k.find('td[data-key="'+I+'"]:eq('+y+")").children().html(o),i[y][table.config.indexName]=o-1}}"function"==typeof p.done&&p.done.call(b,{row:a,newIndex:t,oldIndex:d,cache:i})}}}))})},fixTableRemember:function(e,t){if(void 0===e.filter?defaultConfig.filter&&defaultConfig.filter.cache:e.filter.cache){if(t&&t.rule)for(var i=t.rule.selectorText.split("-")[3]+"-"+t.rule.selectorText.split("-")[4],l=0;l<e.cols.length;l++)for(var a=0;a<e.cols[l].length;a++)if(e.cols[l][a].key===i){e.cols[l][a].width=t.rule.style.width.replace("px","");break}var n=location.pathname+location.hash+e.id;localStorage.setItem(n,this.deepStringify(e.cols))}},clearCache:function(e){e&&(e="object"==typeof e?(void 0!==e.config?e.config:e).id:e,localStorage.removeItem(location.pathname+location.hash+e),originCols[e])&&this.updateCols(tables[e],this.deepClone(originCols[e]))},overflow:function(e,t){var i={};if("string"==typeof t)i={type:t};else{if("object"!=typeof t)return;i=t}var n,o,t=$(e.elem),e=t.next().find(".layui-table-header"),l=t.next().find(".layui-table-body"),t=t.next().find(".layui-table-total"),a=i.hoverTime||0,r=i.color||"white",d=i.bgColor||"black",s=i.minWidth||300,c=i.maxWidth||300;function h(e){clearTimeout(o);var t=$(this),i=t.children(".layui-table-cell"),l=i.outerWidth(),a=l<s?s:c<l?c:l;t.data("off")||(e?layer.close(n):i.prop("scrollWidth")>l&&(n=layer.tips('<span style="color: '+r+'">'+$(this).text()+"</span>",this,{tips:[1,d],maxWidth:a,time:0})))}"tips"===i.type?(l.off("mouseenter","td").off("mouseleave","td").on("mouseenter","td",function(){var e=this;o=setTimeout(function(){h.call(e)},a)}).on("mouseleave","td",function(){h.call(this,"hide")}),i.header&&e.off("mouseenter","th").off("mouseleave","th").on("mouseenter","th",function(){var e=this;o=setTimeout(function(){h.call(e)},a)}).on("mouseleave","th",function(){h.call(this,"hide")}),i.total&&t.off("mouseenter","td").off("mouseleave","td").on("mouseenter","td",function(){var e=this;o=setTimeout(function(){h.call(e)},a)}).on("mouseleave","td",function(){h.call(this,"hide")})):"title"===i.type&&(l.off("mouseenter","td").on("mouseenter","td",function(){var e=$(this),t=e.children(".layui-table-cell");e.data("off")||t.prop("scrollWidth")>t.outerWidth()&&t.attr("title",$(this).text())}),i.header&&e.off("mouseenter","th").on("mouseenter","th",function(){var e=$(this),t=e.children(".layui-table-cell");e.data("off")||t.prop("scrollWidth")>t.outerWidth()&&t.attr("title",$(this).text())}),i.total)&&t.off("mouseenter","td").on("mouseenter","td",function(){var e=$(this),t=e.children(".layui-table-cell");e.data("off")||t.prop("scrollWidth")>t.outerWidth()&&t.attr("title",$(this).text())})},contextmenu:function(h,e){for(var t=$(h.elem),i=t.next().children(".layui-table-box"),l=$.merge(i.children(".layui-table-header").children("table"),i.children(".layui-table-fixed").children(".layui-table-header").children("table")),a=i.children(".layui-table-fixed").children(".layui-table-body").children("table"),i=$.merge(i.children(".layui-table-body").children("table"),a),a=t.next().children(".layui-table-total").children("table"),f=h.id,n={header:{box:l,tag:"th",opts:e?e.header:"",cols:{}},body:{box:i,tag:"td",opts:e?e.body:"",cols:{},isBody:!0},total:{box:a,tag:"td",opts:e?e.total:"",cols:{}}},o=!1,r=0;r<h.cols.length;r++)for(var d=0;d<h.cols[r].length;d++)h.cols[r][d].contextmenu&&(o=!0,n.header.cols[h.cols[r][d].key]=h.cols[r][d].contextmenu.header,n.body.cols[h.cols[r][d].key]=h.cols[r][d].contextmenu.body,n.total.cols[h.cols[r][d].key]=h.cols[r][d].contextmenu.total);if(e||o){for(var s in n)!function(i){n[i].box.find(n[i].tag).on("contextmenu",function(e){$("#soul-table-contextmenu-wrapper").remove(),_BODY.append('<div id="soul-table-contextmenu-wrapper"></div>'),$("#soul-table-contextmenu-wrapper").on("click",function(e){e.stopPropagation()});var t=n[i].cols[$(this).data("key")];return!1!==t&&(t&&0<t.length?(u($("#soul-table-contextmenu-wrapper"),e.pageX,e.pageY,t,$(this),n[i].box,n[i].tag,n[i].isBody),!1):!1!==n[i].opts&&(n[i].opts&&0<n[i].opts.length?(u($("#soul-table-contextmenu-wrapper"),e.pageX,e.pageY,n[i].opts,$(this),n[i].box,n[i].tag,n[i].isBody),!1):void 0))})}(s);_BODY.on("click",function(){$("#soul-table-contextmenu-wrapper").remove()})}function u(e,t,i,l,o,r,d,s){var a,n=[];for(n.push('<ul class="soul-table-contextmenu">'),a=0;a<l.length;a++)n.push('<li data-index="'+a+'" class="'+(l[a].children&&0<l[a].children.length?"contextmenu-children":"")+'">'),l[a].icon?n.push('<i class="prefixIcon '+l[a].icon+'" />'):n.push('<i class="prefixIcon" />'),n.push(l[a].name),l[a].children&&0<l[a].children.length&&n.push('<i class="endIcon layui-icon layui-icon-right" />'),n.push("</li>");n.push("</ul>"),e.append(n.join(""));var c=e.children().last();for(i+c.outerHeight()>_BODY.prop("scrollHeight")&&(i-=c.outerHeight())<0&&(i=0),"left"===e.parent().data("direction")&&0<e.offset().left-c.outerWidth()?(t=-c.outerWidth(),c.data("direction","left")):t+c.outerWidth()+e.offset().left>_BODY.prop("scrollWidth")&&((t=t-c.outerWidth()-e.outerWidth())+e.offset().left<0&&(t=-e.offset().left),c.data("direction","left")),c.css({top:i+"px",left:t+"px"}),a=0;a<l.length;a++)"function"==typeof l[a].click&&!function(t){e.children(".soul-table-contextmenu:last").children('li[data-index="'+t+'"]').on("click",function(){var e=o.parents("tr:eq(0)").data("index"),a=r.find('tr[data-index="'+e+'"]'),n=layui.table.cache[f][e];l[t].click.call(h,{cell:o,elem:"th"===d?o:s?r.children("tbody").children('tr[data-index="'+e+'"]').children('[data-key="'+o.data("key")+'"]'):r.find('[data-key="'+o.data("key")+'"]'),trElem:r.children("tbody").children('tr[data-index="'+e+'"]'),text:o.text(),field:o.data("field"),del:s?function(){table.cache[f][e]=[],a.remove(),table.resize(f)}:"",update:s?function(e){e=e||{},layui.each(e,function(i,e){var l,t;i in n&&(t=a.children('td[data-field="'+i+'"]'),n[i]=e,table.eachCols(f,function(e,t){t.field==i&&t.templet&&(l=t.templet)}),t.children(".layui-table-cell").html(l?"function"==typeof l?l(n):layui.laytpl($(l).html()||e).render(n):e),t.data("content",e))})}:"",row:s?n:{}}),$("#soul-table-contextmenu-wrapper").remove()})}(a);e.children(".soul-table-contextmenu:last").children("li").on("mouseenter",function(e){e.stopPropagation(),$(this).siblings(".contextmenu-children").children("ul").remove(),$(this).hasClass("contextmenu-children")&&u($(this),$(this).outerWidth(),$(this).position().top,l[$(this).data("index")].children,o,r,d,s)})}},fixTotal:function(e){var t,i,l,e=$(e.elem),a=e.next().children(".layui-table-total"),n=e.next().find("style")[0],n=n.sheet||n.styleSheet||{};0<a.length&&(t=(i=e.next().children(".layui-table-box")).children(".layui-table-fixed-l").children(".layui-table-body").children("table").children("tbody").children("tr:eq(0)").children("td"),i=i.children(".layui-table-fixed-r").children(".layui-table-body").children("table").children("tbody").children("tr:eq(0)").children("td"),l=[],a.children(".layui-table-total-fixed").remove(),0<t.length&&(this.addCSSRule(n,".layui-table-total-fixed-l .layui-table-patch","display: none"),e.next().css("position","relative"),l.push('<table style="position: absolute;background-color: #fff;left: 0;top: '+(a.position().top+1)+'px" cellspacing="0" cellpadding="0" border="0" class="layui-table layui-table-total-fixed layui-table-total-fixed-l"><tbody><tr>'),t.each(function(){$(this).data("key")&&l.push(a.children("table:eq(0)").find('[data-key="'+$(this).data("key")+'"]').prop("outerHTML"))}),l.push("</tr></tbody></table>"),a.append(l.join(""))),0<i.length)&&(this.addCSSRule(n,".layui-table-total-fixed-r td:first-child","border-left:1px solid #e6e6e6"),this.addCSSRule(n,".layui-table-total-fixed-r td:last-child","border-left: none"),e.next().css("position","relative"),(l=[]).push('<table style="position: absolute;background-color: #fff;right: 0;top: '+(a.position().top+1)+'px" cellspacing="0" cellpadding="0" border="0" class="layui-table layui-table-total-fixed layui-table-total-fixed-r"><tbody><tr>'),i.each(function(){l.push(a.children("table:eq(0)").find('[data-key="'+$(this).data("key")+'"]').prop("outerHTML"))}),l.push("</tr></tbody></table>"),a.append(l.join("")))},fixResizeRightFixed:function(l){var t,a=this,e=$(l.elem).next().children(".layui-table-box").children(".layui-table-fixed-r").children(".layui-table-header").children("table"),n={},o="layui-table-sort",r="layui-table-sort-invalid";0<e.length&&(e.find("th").off("mousemove").on("mousemove",function(e){var t=$(this),i=t.offset().left,e=e.clientX-i;t.data("unresize")||n.resizeStart||(t.width()-e<=10&&_BODY.css("cursor","initial"),n.allowResize=e<=10,_BODY.css("cursor",n.allowResize?"col-resize":""))}).off("mousedown").on("mousedown",function(e){var t,i=$(this);n.allowResize&&(i.find("."+o).removeClass(o).addClass(r),t=i.data("key"),e.preventDefault(),n.resizeStart=!0,n.offset=[e.clientX,e.clientY],a.getCssRule(l,t,function(e){var t=e.style.width||i.outerWidth();n.rule=e,n.ruleWidth=parseFloat(t),n.othis=i,n.minWidth=i.data("minwidth")||l.cellMinWidth}))}),_DOC.on("mousemove",function(e){n.resizeStart&&(layui.soulTable.fixTableRemember(l,n),e.preventDefault(),n.rule&&((e=n.ruleWidth-e.clientX+n.offset[0])<n.minWidth&&(e=n.minWidth),n.rule.style.width=e+"px"),t=1)}).on("mouseup",function(e){n.resizeStart&&setTimeout(function(){n.othis.find("."+r).removeClass(r).addClass(o),_BODY.css("cursor",""),n={},a.scrollPatch(l)},30),2===t&&(t=null)}))},fixFixedScroll:function(e){var e=$(e.elem),t=e.next().children(".layui-table-box").children(".layui-table-fixed"),i=e.next().children(".layui-table-box").children(".layui-table-main");t.on("mouseenter",function(){$(this).children(".layui-table-body").addClass("soul-fixed-scroll").on("scroll",function(){var e=$(this).scrollTop();i.scrollTop(e)})}).on("mouseleave",function(){$(this).children(".layui-table-body").removeClass("soul-fixed-scroll").off("scroll")})},scrollPatch:function(e){function t(e){var t;r&&d?(e=e.eq(0)).find(".layui-table-patch")[0]||((t=$('<th class="layui-table-patch"><div class="layui-table-cell"></div></th>')).find("div").css({width:r}),e.find("tr").append(t)):e.find(".layui-table-patch").remove()}var e=$(e.elem),i=e.next().children(".layui-table-box").children(".layui-table-header"),l=e.next().children(".layui-table-total"),a=e.next().children(".layui-table-box").children(".layui-table-main"),n=e.next().children(".layui-table-box").children(".layui-table-fixed"),e=e.next().children(".layui-table-box").children(".layui-table-fixed-r"),o=a.children("table"),r=a.width()-a.prop("clientWidth"),d=a.height()-a.prop("clientHeight"),s=o.outerWidth()-a.width();t(i),t(l);i=a.height()-d;n.find(".layui-table-body").css("height",o.height()>=i?i:"auto"),e[0<s?"removeClass":"addClass"](HIDE),e.css("right",r-1)},copy:function(e){var t;e?((t=document.createElement("div")).id="tempTarget",t.style.opacity="0",t.innerText=e,document.body.appendChild(t)):t=document.querySelector("#"+id);try{var i=document.createRange();i.selectNode(t),window.getSelection().removeAllRanges(),window.getSelection().addRange(i),document.execCommand("copy"),window.getSelection().removeAllRanges()}catch(e){console.log("复制失败")}e&&t.parentElement.removeChild(t)},addCSSRule:function(e,t,i,l){"insertRule"in e?e.insertRule(t+"{"+i+"}",l):"addRule"in e&&e.addRule(t,i,l)},deepStringify:function(e){var i="[[JSON_FUN_PREFIX_",l="_JSON_FUN_SUFFIX]]";return JSON.stringify(e,function(e,t){return"function"==typeof t?i+t.toString()+l:t})},deepParse:function(str){var JSON_SERIALIZE_FIX={PREFIX:"[[JSON_FUN_PREFIX_",SUFFIX:"_JSON_FUN_SUFFIX]]"};return JSON.parse(str,function(key,value){return"string"==typeof value&&0<value.indexOf(JSON_SERIALIZE_FIX.SUFFIX)&&0===value.indexOf(JSON_SERIALIZE_FIX.PREFIX)?eval("("+value.replace(JSON_SERIALIZE_FIX.PREFIX,"").replace(JSON_SERIALIZE_FIX.SUFFIX,"")+")"):value})||{}},clearFilter:function(e){tableFilter.clearFilter(e)},cache:tableFilter.cache,deepClone:function(e){var t=Array.isArray(e)?[]:{};if(e&&"object"==typeof e)for(var i in e)e.hasOwnProperty(i)&&(t[i]=e&&"object"==typeof e[i]?this.deepClone(e[i]):e[i]);return t},clearOriginCols:function(e){e?delete originCols[e]:originCols={}},suspendConfig:{},suspend:function(e,t,i){this.suspendConfig[e][t]=i}};exports("soulTable",mod)});