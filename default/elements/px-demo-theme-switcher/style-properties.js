this.Px=this.Px||{},this.Px.StyleProperties=function(){'use strict';function a(a){return a=b(a),d(c(a),a)}function b(a){return a.replace(B.comments,'').replace(B.port,'')}function c(a){let b=new x;b.start=0,b.end=a.length;let c=b;for(let d=0,e=a.length;d<e;d++)if(a[d]===z){c.rules||(c.rules=[]);let a=c,b=a.rules[a.rules.length-1]||null;c=new x,c.start=d+1,c.parent=a,c.previous=b,a.rules.push(c)}else a[d]===A&&(c.end=d+1,c=c.parent||b);return b}function d(a,b){let c=b.substring(a.start,a.end-1);if(a.parsedCssText=a.cssText=c.trim(),a.parent){let d=a.previous?a.previous.end:a.parent.start;c=b.substring(d,a.start-1),c=e(c),c=c.replace(B.multipleSpaces,' '),c=c.substring(c.lastIndexOf(';')+1);let f=a.parsedSelector=a.selector=c.trim();a.atRule=0===f.indexOf(E),a.atRule?0===f.indexOf(D)?a.type=y.MEDIA_RULE:f.match(B.keyframesRule)&&(a.type=y.KEYFRAMES_RULE,a.keyframesName=a.selector.split(B.multipleSpaces).pop()):0===f.indexOf(C)?a.type=y.MIXIN_RULE:a.type=y.STYLE_RULE}let f=a.rules;if(f)for(let a,c=0,e=f.length;c<e&&(a=f[c]);c++)d(a,b);return a}function e(a){return a.replace(/\\([0-9a-f]{1,6})\s/gi,function(){let a=arguments[1],b=6-a.length;for(;b--;)a='0'+a;return'\\'+a})}function f(a,b,c=''){let d='';if(a.cssText||a.rules){let c=a.rules;if(c&&!g(c))for(let a,e=0,g=c.length;e<g&&(a=c[e]);e++)d=f(a,b,d);else d=b?a.cssText:h(a.cssText),d=d.trim(),d&&(d='  '+d+'\n')}return d&&(a.selector&&(c+=a.selector+' '+z+'\n'),c+=d,a.selector&&(c+=A+'\n\n')),c}function g(a){let b=a[0];return!!b&&!!b.selector&&0===b.selector.indexOf(C)}function h(a){return a=i(a),j(a)}function i(a){return a.replace(B.customProp,'').replace(B.mixinProp,'')}function j(a){return a.replace(B.mixinApply,'').replace(B.varApply,'')}function k(a){F=a&&a.shimcssproperties?!1:G||!!(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports('box-shadow','0 0 0 var(--foo)'))}function l(b,c){return b?('string'===typeof b&&(b=a(b)),c&&p(b,c),f(b,F)):''}function m(b){return!b.__cssRules&&b.textContent&&(b.__cssRules=a(b.textContent)),b.__cssRules||null}function n(a){return!!a.parent&&a.parent.type===y.KEYFRAMES_RULE}function p(a,b,c,d){if(!a)return;let e=!1,f=a.type;if(d&&f===y.MEDIA_RULE){let b=a.selector.match(L);b&&!window.matchMedia(b[1]).matches&&(e=!0)}f===y.STYLE_RULE?b(a):c&&f===y.KEYFRAMES_RULE?c(a):f===y.MIXIN_RULE&&(e=!0);let g=a.rules;if(g&&!e)for(let a,e=0,f=g.length;e<f&&(a=g[e]);e++)p(a,b,c,d)}function o(a,b,c,d){let e=q(a,b);return r(e,c,d),e}function q(a,b){let c=document.createElement('style');return b&&c.setAttribute('scope',b),c.textContent=a,c}function r(a,b,c){b=b||document.head;let d=c&&c.nextSibling||b.firstChild;if(b.insertBefore(a,d),!N)N=a;else{let b=a.compareDocumentPosition(N);b===Node.DOCUMENT_POSITION_PRECEDING&&(N=a)}}function s(a,b){let c=0;for(let d=b,e=a.length;d<e;d++)if('('===a[d])c++;else if(')'===a[d]&&0===--c)return d;return-1}function t(a,b){let c=a.indexOf('var(');if(-1===c)return b(a,'','','');let d=s(a,c+3),e=a.substring(c+4,d),f=a.substring(0,c),g=t(a.substring(d+1),b),h=e.indexOf(',');if(-1===h)return b(f,e.trim(),'',g);let i=e.substring(0,h).trim(),j=e.substring(h+1).trim();return b(f,i,j,g)}function u(a,b){G?a.setAttribute('class',b):window.ShadyDOM.nativeMethods.setAttribute.call(a,'class',b)}function v(a){let b=a.localName,c='',d='';return b?-1<b.indexOf('-')?c=b:(d=b,c=a.getAttribute&&a.getAttribute('is')||''):(c=a.is,d=a.extends),{is:c,typeExtension:d}}function w(a,b){let c=parseInt(a/32,10);b[c]=(b[c]||0)|1<<a%32}class x{constructor(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText='',this.cssText='',this.atRule=!1,this.type=0,this.keyframesName='',this.selector='',this.parsedSelector=''}}const y={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},z='{',A='}',B={comments:/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},C='--',D='@media',E='@';let F,G=!(window.ShadyDOM&&window.ShadyDOM.inUse);window.ShadyCSS&&window.ShadyCSS.nativeCss!==void 0?F=window.ShadyCSS.nativeCss:window.ShadyCSS?(k(window.ShadyCSS),window.ShadyCSS=void 0):k(window.WebComponents&&window.WebComponents.flags);const H=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,I=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,J=/(--[\w-]+)\s*([:,;)]|$)/gi,K=/(animation\s*:)|(animation-name\s*:)/,L=/@media\s(.*)/,M=/\{[^}]*\}/g;let N=null;const O='style-scope';class P{get SCOPE_NAME(){return O}dom(a,b,c){a.__styleScoped?a.__styleScoped=null:this._transformDom(a,b||'',c)}_transformDom(a,b,c){a.nodeType===Node.ELEMENT_NODE&&this.element(a,b,c);let d='template'===a.localName?(a.content||a._content).childNodes:a.children||a.childNodes;if(d)for(let a=0;a<d.length;a++)this._transformDom(d[a],b,c)}element(a,b,d){if(b)if(a.classList)d?(a.classList.remove(O),a.classList.remove(b)):(a.classList.add(O),a.classList.add(b));else if(a.getAttribute){let e=a.getAttribute(ca);if(!d){let c=(e?e+' ':'')+O+' '+b;u(a,c)}else if(e){let c=e.replace(O,'').replace(b,'');u(a,c)}}}elementStyles(a,b,c){let d=a.__cssBuild,e='';if(G||'shady'===d)e=l(b,c);else{let{is:d,typeExtension:f}=v(a);e=this.css(b,d,f,c)+'\n\n'}return e.trim()}css(a,b,c,d){let e=this._calcHostScope(b,c);b=this._calcElementScope(b);let f=this;return l(a,function(a){a.isScoped||(f.rule(a,b,e),a.isScoped=!0),d&&d(a,b,e)})}_calcElementScope(a){return a?aa+a:''}_calcHostScope(a,b){return b?`[is=${a}]`:a}rule(a,b,c){this._transformRule(a,this._transformComplexSelector,b,c)}_transformRule(a,b,c,d){a.selector=a.transformedSelector=this._transformRuleCss(a,b,c,d)}_transformRuleCss(a,b,c,d){let e=a.selector.split(S);if(!n(a))for(let a,f=0,g=e.length;f<g&&(a=e[f]);f++)e[f]=b.call(this,a,c,d);return e.join(S)}_twiddleNthPlus(a){return a.replace(Q,(a,b,c)=>(-1<c.indexOf('+')?c=c.replace(/\+/g,'___'):-1<c.indexOf('___')&&(c=c.replace(/___/g,'+')),`:${b}(${c})`))}_transformComplexSelector(a,b,d){let e=!1;a=a.trim();let c=Q.test(a);return c&&(a=a.replace(Q,(a,b,c)=>`:${b}(${c.replace(/\s/g,'')})`),a=this._twiddleNthPlus(a)),a=a.replace(Y,`${V} $1`),a=a.replace(T,(a,f,c)=>{if(!e){let a=this._transformCompoundSelector(c,f,b,d);e=e||a.stop,f=a.combinator,c=a.value}return f+c}),c&&(a=this._twiddleNthPlus(a)),a}_transformCompoundSelector(a,b,c,d){let e=a.indexOf(X);0<=a.indexOf(V)?a=this._transformHostSelector(a,d):0!==e&&(a=c?this._transformSimpleSelector(a,c):a);let f=!1;0<=e&&(b='',f=!0);let g;return f&&(g=!0,f&&(a=a.replace($,(a,b)=>` > ${b}`))),a=a.replace(_,(a,b,c)=>`[dir="${c}"] ${b}, ${b}[dir="${c}"]`),{value:a,combinator:b,stop:g}}_transformSimpleSelector(a,b){let c=a.split(ba);return c[0]+=b,c.join(ba)}_transformHostSelector(a,b){let c=a.match(Z),d=c&&c[2].trim()||'';if(d){if(!d[0].match(U)){let a=d.split(U)[0];return a===b?d:da}return a.replace(Z,function(a,c,d){return b+d})}return a.replace(V,b)}documentRule(a){a.selector=a.parsedSelector,this.normalizeRootSelector(a),this._transformRule(a,this._transformDocumentSelector)}normalizeRootSelector(a){a.selector===W&&(a.selector='html')}_transformDocumentSelector(a){return a.match(X)?this._transformComplexSelector(a,R):this._transformSimpleSelector(a.trim(),R)}}let Q=/:(nth[-\w]+)\(([^)]+)\)/,R=`:not(.${O})`,S=',',T=/(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,U=/[[.:#*]/,V=':host',W=':root',X='::slotted',Y=/^(::slotted)/,Z=/(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,$=/(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,_=/(.*):dir\((?:(ltr|rtl))\)/,aa='.',ba=':',ca='class',da='should_not_match';var ea=new P;const fa='__styleInfo';class ga{static get(a){return a?a[fa]:null}static set(a,b){return a[fa]=b,b}constructor(a,b,c,d,e,f){this.styleRules=a||null,this.placeholder=b||null,this.ownStylePropertyNames=c||[],this.overrideStyleProperties=null,this.elementName=d||'',this.cssBuild=f||'',this.typeExtension=e||'',this.styleProperties=null,this.scopeSelector=null,this.customStyle=null}_getStyleRules(){return this.styleRules}}ga.prototype._getStyleRules=ga.prototype._getStyleRules;const ha=((a)=>a.matches||a.matchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector||a.webkitMatchesSelector)(window.Element.prototype),ia=navigator.userAgent.match('Trident'),ja='x-scope';class ka{get XSCOPE_NAME(){return ja}decorateStyles(a){let b=this,c={},d=[],e=0;p(a,function(a){b.decorateRule(a),a.index=e++,b.collectPropertiesInCssText(a.propertyInfo.cssText,c)},function(a){d.push(a)}),a._keyframes=d;let f=[];for(let b in c)f.push(b);return f}decorateRule(a){if(a.propertyInfo)return a.propertyInfo;let b={},c={},d=this.collectProperties(a,c);return d&&(b.properties=c,a.rules=null),b.cssText=this.collectCssText(a),a.propertyInfo=b,b}collectProperties(a,b){let c=a.propertyInfo;if(!c){let c,d,e,f=a.parsedCssText;for(;c=H.exec(f);)d=(c[2]||c[3]).trim(),('inherit'!==d||'unset'!==d)&&(b[c[1].trim()]=d),e=!0;return e}else if(c.properties)return Object.assign(b,c.properties),!0}collectCssText(a){return this.collectConsumingCssText(a.parsedCssText)}collectConsumingCssText(a){return a.replace(M,'').replace(H,'')}collectPropertiesInCssText(a,b){for(let c;c=J.exec(a);){let a=c[1];':'!==c[2]&&(b[a]=!0)}}reify(a){let b=Object.getOwnPropertyNames(a);for(let c,d=0;d<b.length;d++)c=b[d],a[c]=this.valueForProperty(a[c],a)}valueForProperty(a,b){if(a)if(0<=a.indexOf(';'))a=this.valueForProperties(a,b);else{let c=this;a=t(a,function(a,d,e,f){if(!d)return a+f;let g=c.valueForProperty(b[d],b);return g&&'initial'!==g?'apply-shim-inherit'===g&&(g='inherit'):g=c.valueForProperty(b[e]||e,b)||e,a+(g||'')+f})}return a&&a.trim()||''}valueForProperties(a,b){let c=a.split(';');for(let d,e,f=0;f<c.length;f++)if(d=c[f]){if(I.lastIndex=0,e=I.exec(d),e)d=this.valueForProperty(b[e[1]],b);else{let a=d.indexOf(':');if(-1!==a){let c=d.substring(a);c=c.trim(),c=this.valueForProperty(c,b)||c,d=d.substring(0,a)+c}}c[f]=d&&d.lastIndexOf(';')===d.length-1?d.slice(0,-1):d||''}return c.join(';')}applyProperties(a,b){let c='';a.propertyInfo||this.decorateRule(a),a.propertyInfo.cssText&&(c=this.valueForProperties(a.propertyInfo.cssText,b)),a.cssText=c}applyKeyframeTransforms(a,b){let c=a.cssText,d=a.cssText;if(null==a.hasAnimations&&(a.hasAnimations=K.test(c)),a.hasAnimations){let e;if(null==a.keyframeNamesToTransform)for(let f in a.keyframeNamesToTransform=[],b)e=b[f],d=e(c),c!==d&&(c=d,a.keyframeNamesToTransform.push(f));else{for(let d=0;d<a.keyframeNamesToTransform.length;++d)e=b[a.keyframeNamesToTransform[d]],c=e(c);d=c}}a.cssText=d}propertyDataFromStyles(a,b){let c={},d=this,e=[];return p(a,function(a){a.propertyInfo||d.decorateRule(a);let f=a.transformedSelector||a.parsedSelector;b&&a.propertyInfo.properties&&f&&ha.call(b,f)&&(d.collectProperties(a,c),w(a.index,e))},null,!0),{properties:c,key:e}}whenHostOrRootRule(a,b,c,d){if(b.propertyInfo||this.decorateRule(b),!b.propertyInfo.properties)return;let{is:e,typeExtension:f}=v(a),g=e?ea._calcHostScope(e,f):'html',h=b.parsedSelector,i=':host > *'===h||'html'===h,j=0===h.indexOf(':host')&&!i;if('shady'===c&&(i=h===g+' > *.'+g||-1!==h.indexOf('html'),j=!i&&0===h.indexOf(g)),'shadow'===c&&(i=':host > *'===h||'html'===h,j=j&&!i),!i&&!j)return;let k=g;j&&(G&&!b.transformedSelector&&(b.transformedSelector=ea._transformRuleCss(b,ea._transformComplexSelector,ea._calcElementScope(e),g)),k=b.transformedSelector||g),d({selector:k,isHost:j,isRoot:i})}hostAndRootPropertiesForScope(a,b){let c={},d={},e=this,f=b&&b.__cssBuild;return p(b,function(b){e.whenHostOrRootRule(a,b,f,function(f){let g=a._element||a;ha.call(g,f.selector)&&(f.isHost?e.collectProperties(b,c):e.collectProperties(b,d))})},null,!0),{rootProps:d,hostProps:c}}transformStyles(a,b,c){let d=this,{is:e,typeExtension:f}=v(a),g=ea._calcHostScope(e,f),h=a.extends?'\\'+g.slice(0,-1)+'\\]':g,i=new RegExp('(?:^|[^.#[:])'+h+'($|[.:[\\s>+~])'),j=ga.get(a).styleRules,k=this._elementKeyframeTransforms(a,j,c);return ea.elementStyles(a,j,function(a){d.applyProperties(a,b),G||n(a)||!a.cssText||(d.applyKeyframeTransforms(a,k),d._scopeSelector(a,i,g,c))})}_elementKeyframeTransforms(a,b,c){let d=b._keyframes,e={};if(!G&&d)for(let a=0,b=d[a];a<d.length;b=d[++a])this._scopeKeyframes(b,c),e[b.keyframesName]=this._keyframesRuleTransformer(b);return e}_keyframesRuleTransformer(a){return function(b){return b.replace(a.keyframesNameRx,a.transformedKeyframesName)}}_scopeKeyframes(a,b){a.keyframesNameRx=new RegExp(`\\b${a.keyframesName}(?!\\B|-)`,'g'),a.transformedKeyframesName=a.keyframesName+'-'+b,a.transformedSelector=a.transformedSelector||a.selector,a.selector=a.transformedSelector.replace(a.keyframesName,a.transformedKeyframesName)}_scopeSelector(a,b,c,d){a.transformedSelector=a.transformedSelector||a.selector;let e=a.transformedSelector,f='.'+d,g=e.split(',');for(let e,h=0,i=g.length;h<i&&(e=g[h]);h++)g[h]=e.match(b)?e.replace(c,f):f+' '+e;a.selector=g.join(',')}applyElementScopeSelector(a,b,d){let e=a.getAttribute('class')||'',c=e;d&&(c=e.replace(new RegExp('\\s*'+ja+'\\s*'+d+'\\s*','g'),' ')),c+=(c?' ':'')+ja+' '+b,e!==c&&u(a,c)}applyElementStyle(a,b,c,d){let e=d?d.textContent||'':this.transformStyles(a,b,c),f=ga.get(a),g=f.customStyle;return g&&!G&&g!==d&&(g._useCount--,0>=g._useCount&&g.parentNode&&g.parentNode.removeChild(g)),G?f.customStyle?(f.customStyle.textContent=e,d=f.customStyle):e&&(d=o(e,c,a.shadowRoot,f.placeholder)):d?!d.parentNode&&(ia&&-1<e.indexOf('@media')&&(d.textContent=e),r(d,null,f.placeholder)):e&&(d=o(e,c,null,f.placeholder)),d&&(d._useCount=d._useCount||0,f.customStyle!=d&&d._useCount++,f.customStyle=d),d}applyCustomStyle(a,b){let c=m(a),d=this;a.textContent=l(c,function(a){let c=a.cssText=a.parsedCssText;a.propertyInfo&&a.propertyInfo.cssText&&(c=i(c),a.cssText=d.valueForProperties(c,b))})}}var la=new ka;return la}();