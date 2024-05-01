!function(e){"use strict";var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},t(e,r)};function r(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function i(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}var i=function(){return i=Object.assign||function(e){for(var t,r=1,i=arguments.length;r<i;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},i.apply(this,arguments)};function n(e,t,r,i){var n,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(o<3?n(a):o>3?n(t,r,a):n(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a}function o(e,t,r){if(r||2===arguments.length)for(var i,n=0,o=t.length;n<o;n++)!i&&n in t||(i||(i=Array.prototype.slice.call(t,0,n)),i[n]=t[n]);return e.concat(i||Array.prototype.slice.call(t))}"function"==typeof SuppressedError&&SuppressedError;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const a=window,s=a.ShadowRoot&&(void 0===a.ShadyCSS||a.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,l=Symbol(),h=new WeakMap;class c{constructor(e,t,r){if(this._$cssResult$=!0,r!==l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const r=void 0!==t&&1===t.length;r&&(e=h.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&h.set(t,e))}return e}toString(){return this.cssText}}const u=(e,...t)=>{const r=1===e.length?e[0]:t.reduce(((t,r,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[i+1]),e[0]);return new c(r,e,l)},d=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return(e=>new c("string"==typeof e?e:e+"",void 0,l))(t)})(e):e
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var p;const m=window,g=m.trustedTypes,f=g?g.emptyScript:"",b=m.reactiveElementPolyfillSupport,v={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch(e){r=null}}return r}},y=(e,t)=>t!==e&&(t==t||e==e),E={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},_="finalized";class A extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,r)=>{const i=this._$Ep(r,t);void 0!==i&&(this._$Ev.set(i,r),e.push(i))})),e}static createProperty(e,t=E){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const r="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,r,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(i){const n=this[e];this[t]=i,this.requestUpdate(e,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||E}static finalize(){if(this.hasOwnProperty(_))return!1;this[_]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const r of t)this.createProperty(r,e[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const e of r)t.unshift(d(e))}else void 0!==e&&t.push(d(e));return t}static _$Ep(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,r;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(r=e.hostConnected)||void 0===r||r.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{s?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const r=document.createElement("style"),i=a.litNonce;void 0!==i&&r.setAttribute("nonce",i),r.textContent=t.cssText,e.appendChild(r)}))})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$EO(e,t,r=E){var i;const n=this.constructor._$Ep(e,r);if(void 0!==n&&!0===r.reflect){const o=(void 0!==(null===(i=r.converter)||void 0===i?void 0:i.toAttribute)?r.converter:v).toAttribute(t,r.type);this._$El=e,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(e,t){var r;const i=this.constructor,n=i._$Ev.get(e);if(void 0!==n&&this._$El!==n){const e=i.getPropertyOptions(n),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(r=e.converter)||void 0===r?void 0:r.fromAttribute)?e.converter:v;this._$El=n,this[n]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,r){let i=!0;void 0!==e&&(((r=r||this.constructor.getPropertyOptions(e)).hasChanged||y)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===r.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,r))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(r)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(r)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var w;A[_]=!0,A.elementProperties=new Map,A.elementStyles=[],A.shadowRootOptions={mode:"open"},null==b||b({ReactiveElement:A}),(null!==(p=m.reactiveElementVersions)&&void 0!==p?p:m.reactiveElementVersions=[]).push("1.6.3");const H=window,T=H.trustedTypes,S=T?T.createPolicy("lit-html",{createHTML:e=>e}):void 0,B="$lit$",P=`lit$${(Math.random()+"").slice(9)}$`,$="?"+P,C=`<${$}>`,L=document,N=()=>L.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,M="[ \t\n\f\r]",x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,k=/>/g,U=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,G=/"/g,j=/^(?:script|style|textarea|title)$/i,z=(e=>(t,...r)=>({_$litType$:e,strings:t,values:r}))(1),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),X=new WeakMap,W=L.createTreeWalker(L,129,null,!1);function K(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Y=(e,t)=>{const r=e.length-1,i=[];let n,o=2===t?"<svg>":"",a=x;for(let t=0;t<r;t++){const r=e[t];let s,l,h=-1,c=0;for(;c<r.length&&(a.lastIndex=c,l=a.exec(r),null!==l);)c=a.lastIndex,a===x?"!--"===l[1]?a=R:void 0!==l[1]?a=k:void 0!==l[2]?(j.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=U):void 0!==l[3]&&(a=U):a===U?">"===l[0]?(a=null!=n?n:x,h=-1):void 0===l[1]?h=-2:(h=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?U:'"'===l[3]?G:D):a===G||a===D?a=U:a===R||a===k?a=x:(a=U,n=void 0);const u=a===U&&e[t+1].startsWith("/>")?" ":"";o+=a===x?r+C:h>=0?(i.push(s),r.slice(0,h)+B+r.slice(h)+P+u):r+P+(-2===h?(i.push(void 0),t):u)}return[K(e,o+(e[r]||"<?>")+(2===t?"</svg>":"")),i]};class Z{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let n=0,o=0;const a=e.length-1,s=this.parts,[l,h]=Y(e,t);if(this.el=Z.createElement(l,r),W.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(i=W.nextNode())&&s.length<a;){if(1===i.nodeType){if(i.hasAttributes()){const e=[];for(const t of i.getAttributeNames())if(t.endsWith(B)||t.startsWith(P)){const r=h[o++];if(e.push(t),void 0!==r){const e=i.getAttribute(r.toLowerCase()+B).split(P),t=/([.?@])?(.*)/.exec(r);s.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?te:"?"===t[1]?ie:"@"===t[1]?ne:ee})}else s.push({type:6,index:n})}for(const t of e)i.removeAttribute(t)}if(j.test(i.tagName)){const e=i.textContent.split(P),t=e.length-1;if(t>0){i.textContent=T?T.emptyScript:"";for(let r=0;r<t;r++)i.append(e[r],N()),W.nextNode(),s.push({type:2,index:++n});i.append(e[t],N())}}}else if(8===i.nodeType)if(i.data===$)s.push({type:2,index:n});else{let e=-1;for(;-1!==(e=i.data.indexOf(P,e+1));)s.push({type:7,index:n}),e+=P.length-1}n++}}static createElement(e,t){const r=L.createElement("template");return r.innerHTML=e,r}}function q(e,t,r=e,i){var n,o,a,s;if(t===F)return t;let l=void 0!==i?null===(n=r._$Co)||void 0===n?void 0:n[i]:r._$Cl;const h=O(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===h?l=void 0:(l=new h(e),l._$AT(e,r,i)),void 0!==i?(null!==(a=(s=r)._$Co)&&void 0!==a?a:s._$Co=[])[i]=l:r._$Cl=l),void 0!==l&&(t=q(e,l._$AS(e,t.values),l,i)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:r},parts:i}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:L).importNode(r,!0);W.currentNode=n;let o=W.nextNode(),a=0,s=0,l=i[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new Q(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new oe(o,this,e)),this._$AV.push(t),l=i[++s]}a!==(null==l?void 0:l.index)&&(o=W.nextNode(),a++)}return W.currentNode=L,n}v(e){let t=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class Q{constructor(e,t,r,i){var n;this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cp=null===(n=null==i?void 0:i.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=q(this,e,t),O(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>I(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==V&&O(this._$AH)?this._$AA.nextSibling.data=e:this.$(L.createTextNode(e)),this._$AH=e}g(e){var t;const{values:r,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.v(r);else{const e=new J(n,this),t=e.u(this.options);e.v(r),this.$(t),this._$AH=e}}_$AC(e){let t=X.get(e.strings);return void 0===t&&X.set(e.strings,t=new Z(e)),t}T(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,i=0;for(const n of e)i===t.length?t.push(r=new Q(this.k(N()),this.k(N()),this,this.options)):r=t[i],r._$AI(n),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var r;for(null===(r=this._$AP)||void 0===r||r.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class ee{constructor(e,t,r,i,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=V}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,r,i){const n=this.strings;let o=!1;if(void 0===n)e=q(this,e,t,0),o=!O(e)||e!==this._$AH&&e!==F,o&&(this._$AH=e);else{const i=e;let a,s;for(e=n[0],a=0;a<n.length-1;a++)s=q(this,i[r+a],t,a),s===F&&(s=this._$AH[a]),o||(o=!O(s)||s!==this._$AH[a]),s===V?e=V:e!==V&&(e+=(null!=s?s:"")+n[a+1]),this._$AH[a]=s}o&&!i&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}const re=T?T.emptyScript:"";class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){e&&e!==V?this.element.setAttribute(this.name,re):this.element.removeAttribute(this.name)}}class ne extends ee{constructor(e,t,r,i,n){super(e,t,r,i,n),this.type=5}_$AI(e,t=this){var r;if((e=null!==(r=q(this,e,t,0))&&void 0!==r?r:V)===F)return;const i=this._$AH,n=e===V&&i!==V||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==V&&(i===V||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,r;"function"==typeof this._$AH?this._$AH.call(null!==(r=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==r?r:this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){q(this,e)}}const ae=H.litHtmlPolyfillSupport;null==ae||ae(Z,Q),(null!==(w=H.litHtmlVersions)&&void 0!==w?w:H.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var se,le;class he extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const r=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=r.firstChild),r}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,r)=>{var i,n;const o=null!==(i=null==r?void 0:r.renderBefore)&&void 0!==i?i:t;let a=o._$litPart$;if(void 0===a){const e=null!==(n=null==r?void 0:r.renderBefore)&&void 0!==n?n:null;o._$litPart$=a=new Q(t.insertBefore(N(),e),e,void 0,null!=r?r:{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return F}}he.finalized=!0,he._$litElement$=!0,null===(se=globalThis.litElementHydrateSupport)||void 0===se||se.call(globalThis,{LitElement:he});const ce=globalThis.litElementPolyfillSupport;null==ce||ce({LitElement:he}),(null!==(le=globalThis.litElementVersions)&&void 0!==le?le:globalThis.litElementVersions=[]).push("3.3.3");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const ue=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:r,elements:i}=t;return{kind:r,elements:i,finisher(t){customElements.define(e,t)}}})(e,t)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */,de=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(r){r.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}},pe=(e,t,r)=>{t.constructor.createProperty(r,e)};function me(e){return(t,r)=>void 0!==r?pe(e,t,r):de(e,t)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
function ge(e,t){return(({finisher:e,descriptor:t})=>(r,i)=>{var n;if(void 0===i){const i=null!==(n=r.originalKey)&&void 0!==n?n:r.key,o=null!=t?{kind:"method",placement:"prototype",key:i,descriptor:t(r.key)}:{...r,key:i};return null!=e&&(o.finisher=function(t){e(t,i)}),o}{const n=r.constructor;void 0!==t&&Object.defineProperty(r,i,t(i)),null==e||e(n,i)}})({descriptor:r=>{const i={get(){var t,r;return null!==(r=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==r?r:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof r?Symbol():"__"+r;i.get=function(){var r,i;return void 0===this[t]&&(this[t]=null!==(i=null===(r=this.renderRoot)||void 0===r?void 0:r.querySelector(e))&&void 0!==i?i:null),this[t]}}return i}})}
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var fe,be,ve;null===(fe=window.HTMLSlotElement)||void 0===fe||fe.prototype.assignedElements,function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(be||(be={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(ve||(ve={}));var ye=function(e,t,r,i){i=i||{},r=null==r?{}:r;var n=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return n.detail=r,e.dispatchEvent(n),n};const Ee=async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load()},_e="grill_buddy",Ae="probe_name",we="probe_source",He="probe_preset",Te=e=>e.callWS({type:_e+"/config"}),Se=e=>{class t extends e{connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then((e=>e())):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return[]}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}}return n([me({attribute:!1})],t.prototype,"hass",void 0),t};function Be(e,t){!function(e,t){const r=e.hasOwnProperty("tagName")?e:e.target;ye(r,"show-dialog",{dialogTag:"error-dialog",dialogImport:()=>Promise.resolve().then((function(){return fr})),dialogParams:{error:t}})}(t,z`
    <b>Something went wrong!</b>
    <br />
    ${e.body.message?z`
          ${e.body.message}
          <br />
          <br />
        `:""}
    ${e.error}
    <br />
    <br />
    Please
    <a href="https://github.com/jeroenterheerdt/grill_buddy/issues">report</a>
    the bug.
  `)}function Pe(e){return"°F"==e.config.unit_system.temperature?"°F":"°C"}const $e=u`
  ha-card {
    display: flex;
    flex-direction: column;
    margin: 5px;
    max-width: calc(100vw - 10px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .card-header .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div.warning {
    color: var(--error-color);
    margin-top: 20px;
  }

  div.checkbox-row {
    min-height: 40px;
    display: flex;
    align-items: center;
  }

  div.checkbox-row ha-switch {
    margin-right: 20px;
  }

  div.checkbox-row.right ha-switch {
    margin-left: 20px;
    position: absolute;
    right: 0px;
  }

  mwc-button.active {
    background: var(--primary-color);
    --mdc-theme-primary: var(--text-primary-color);
    border-radius: 4px;
  }
  mwc-button.warning {
    --mdc-theme-primary: var(--error-color);
  }
  mwc-button.success {
    --mdc-theme-primary: var(--success-color);
  }

  mwc-button.disabled.active {
    opacity: 0.5;
  }

  div.entity-row {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 10px 0px;
  }
  div.entity-row .info {
    margin-left: 16px;
    flex: 1 0 60px;
  }
  div.entity-row .info,
  div.entity-row .info > * {
    color: var(--primary-text-color);
    transition: color 0.2s ease-in-out;
  }
  div.entity-row .secondary {
    display: block;
    color: var(--secondary-text-color);
    transition: color 0.2s ease-in-out;
  }
  div.entity-row state-badge {
    flex: 0 0 40px;
  }

  ha-dialog div.wrapper {
    margin-bottom: -20px;
  }

  ha-textfield {
    min-width: 220px;
  }


  a,
  a:visited {
    color: var(--primary-color);
  }
  mwc-button ha-icon {
    padding-right: 11px;
  }
  mwc-button[trailingIcon] ha-icon {
    padding: 0px 0px 0px 6px;
  }
  mwc-button.vertical {
    height: 60px;
    --mdc-button-height: 60px;
    background: var(--primary-color);
    --mdc-theme-primary: var(--text-primary-color);
  }
  mwc-button.vertical div {
    display: flex;
    flex-direction: column;
  }
  mwc-button.vertical span {
    display: flex;
  }
  mwc-button.vertical ha-icon {
    display: flex;
    margin-left: 50%;
  }
  mwc-tab {
    --mdc-tab-color-default: var(--secondary-text-color);
    --mdc-tab-text-label-color-default: var(--secondary-text-color);
  }
  mwc-tab ha-icon {
    --mdc-icon-size: 20px;
  }
  mwc-tab.disabled {
    --mdc-theme-primary: var(--disabled-text-color);
    --mdc-tab-color-default: var(--disabled-text-color);
    --mdc-tab-text-label-color-default: var(--disabled-text-color);
  }

  ha-card settings-row:first-child,
  ha-card settings-row:first-of-type {
    border-top: 0px;
  }

  ha-card > ha-card {
    margin: 10px;
  }

`;u`
  /* mwc-dialog (ha-dialog) styles */
  ha-dialog {
    --mdc-dialog-min-width: 400px;
    --mdc-dialog-max-width: 600px;
    --mdc-dialog-heading-ink-color: var(--primary-text-color);
    --mdc-dialog-content-ink-color: var(--primary-text-color);
    --justify-action-buttons: space-between;
  }
  /* make dialog fullscreen on small screens */
  @media all and (max-width: 450px), all and (max-height: 500px) {
    ha-dialog {
      --mdc-dialog-min-width: calc(100vw - env(safe-area-inset-right) - env(safe-area-inset-left));
      --mdc-dialog-max-width: calc(100vw - env(safe-area-inset-right) - env(safe-area-inset-left));
      --mdc-dialog-min-height: 100%;
      --mdc-dialog-max-height: 100%;
      --vertial-align-dialog: flex-end;
      --ha-dialog-border-radius: 0px;
    }
  }
  ha-dialog div.description {
    margin-bottom: 10px;
  }
`;let Ce=class extends(Se(he)){hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage((()=>this._fetchData()),{type:_e+"_config_updated"})]}async _fetchData(){this.hass&&(this.config=await Te(this.hass),this.data=[])}firstUpdated(){(async()=>{await Ee()})()}render(){return this.hass&&this.config&&this.data?z`<h1>Barf</h1>`:z``}saveData(e){var t,r;this.hass&&this.data&&(this.data=Object.assign(Object.assign({},this.data),e),(t=this.hass,r=this.data,t.callApi("POST",_e+"/config",r)).catch((e=>Be(e,this.shadowRoot.querySelector("ha-card")))).then())}toggleInformation(e){var t;const r=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#"+e);r&&("hidden"!=r.className?r.className="hidden":r.className="information")}static get styles(){return u`
      ${$e}
      .hidden {
        display: none;
      }
      .shortinput {
        width: 50px;
      }
      .information {
        margin-left: 20px;
        margin-top: 5px;
      }
    `}};n([me()],Ce.prototype,"narrow",void 0),n([me()],Ce.prototype,"path",void 0),n([me()],Ce.prototype,"data",void 0),n([me()],Ce.prototype,"config",void 0),Ce=n([ue("grill-buddy-view-general")],Ce);var Le,Ne,Oe,Ie={actions:{delete:"Delete"},labels:{module:"Module",no:"No",select:"Select",yes:"Yes"}},Me={general:{cards:{"automatic-duration-calculation":{header:"Automatic duration calculation",description:"Calculation takes collected weatherdata up to that point and updates the bucket for each automatic zone. Then, the duration is adjusted based on the new bucket value and the collected weatherdata is removed.",labels:{"auto-calc-enabled":"Automatically calculate zone durations","auto-calc-time":"Calculate at"}},"automatic-update":{errors:{"warning-update-time-on-or-after-calc-time":"Warning: weatherdata update time on or after calculation time"},header:"Automatic weather data update",description:"Collect and store weather data automatically. Weather data is required to calculate zone buckets and durations.",labels:{"auto-update-enabled":"Automatically update weather data","auto-update-delay":"Update delay","auto-update-interval":"Update sensor data every"},options:{days:"days",hours:"hours",minutes:"minutes"}},"automatic-clear":{header:"Automatic weather data pruning",description:"Automatically remove collected weatherdata at a configured time. Use this to make sure that there is no left over weatherdata from previous days. Don't remove the weatherdata before you calculate and only use this option if you expect the automatic update to collect weatherdata after you calculated for the day. Ideally, you want to prune as late in the day as possible.",labels:{"automatic-clear-enabled":"Automatically clear collected weather data","automatic-clear-time":"Clear weather data at"}}},description:"This page provides global settings.",title:"General"},probes:{title:"Probes",description:"Set up your probes here",labels:{name:"Name",source:"Source",preset:"Preset"},cards:{"add-probe":{header:"Add probe",actions:{add:"Add"}}}},help:{title:"Help",cards:{"how-to-get-help":{title:"How to get help","first-read-the":"First, read the",wiki:"Wiki","if-you-still-need-help":"If you still need help reach out on the","community-forum":"Community forum","or-open-a":"or open a","github-issue":"Github Issue","english-only":"English only"}}},mappings:{cards:{"add-mapping":{actions:{add:"Add sensor group"},header:"Add sensor groups"},mapping:{aggregates:{average:"Average",first:"First",last:"Last",maximum:"Maximum",median:"Median",minimum:"Minimum",sum:"Sum"},errors:{"cannot-delete-mapping-because-zones-use-it":"You cannot delete this sensor group because there is at least one zone using it."},items:{dewpoint:"Dewpoint",evapotranspiration:"Evapotranspiration",humidity:"Humidity","maximum temperature":"Maximum temperature","minimum temperature":"Minimum temperature",precipitation:"Total precipitation",pressure:"Pressure","solar radiation":"Solar radiation",temperature:"Temperature",windspeed:"Wind speed"},pressure_types:{absolute:"absolute",relative:"relative"},"pressure-type":"Pressure is","sensor-aggregate-of-sensor-values-to-calculate":"of sensor values to calculate duration","sensor-aggregate-use-the":"Use the","sensor-entity":"Sensor entity",static_value:"Value","input-units":"Input provides values in",source:"Source",sources:{none:"None",openweathermap:"OpenWeatherMap",sensor:"Sensor",static:"Static value"}}},description:"Add one or more sensor groups that retrieve weather data from OpenWeatherMap, from sensors or a combination of these. You can map each sensor group to one or more zones",labels:{"mapping-name":"Name"},no_items:"There are no sensor group defined yet.",title:"Sensor Groups"},modules:{cards:{"add-module":{actions:{add:"Add module"},header:"Add module"},module:{errors:{"cannot-delete-module-because-zones-use-it":"You cannot delete this module because there is at least one zone using it."},labels:{configuration:"Configuration",required:"indicates a required field"},"translated-options":{DontEstimate:"Do not estimate",EstimateFromSunHours:"Estimate from sun hours",EstimateFromTemp:"Estimate from temperature"}}},description:"Add one or more modules that calculate irrigation duration. Each module comes with its own configuration and can be used to calculate duration for one or more zones.",no_items:"There are no modules defined yet.",title:"Modules"},zones:{actions:{add:"Add",calculate:"Calculate",information:"Information",update:"Update","reset-bucket":"Reset bucket"},cards:{"add-zone":{actions:{add:"Add zone"},header:"Add zone"},"zone-actions":{actions:{"calculate-all":"Calculate all zones","update-all":"Update all zones","reset-all-buckets":"Reset all buckets","clear-all-weatherdata":"Clear all weatherdata"},header:"Actions on all zones"}},description:"Specify one or more irrigation zones here. The irrigation duration is calculated per zone, depending on size, throughput, state, module and sensor group.",labels:{bucket:"Bucket",duration:"Duration","lead-time":"Lead time",mapping:"Sensor Group","maximum-duration":"Maximum duration",multiplier:"Multiplier",name:"Name",size:"Size",state:"State",states:{automatic:"Automatic",disabled:"Disabled",manual:"Manual"},throughput:"Throughput","maximum-bucket":"Maximum bucket",last_calculated:"Last calculated","data-last-updated":"Data last updated","data-number-of-data-points":"Number of data points"},no_items:"There are no zones defined yet.",title:"Zones"}},xe="Grill Buddy",Re={common:Ie,panels:Me,title:xe},ke=Object.freeze({__proto__:null,common:Ie,panels:Me,title:xe,default:Re}),Ue={actions:{delete:"Verwijderen"},labels:{module:"Module",no:"Nee",select:"Kies",yes:"Ja"}},De={general:{cards:{"automatic-duration-calculation":{header:"Automatische berekening van irrigatietijd",description:"Bij het berekenen wordt de verzamelde weersinformatie gebruikt om the voorraad en irrigatieduur per zone aan te passen. Daarna wordt de verzamelde weersinformatie verwijderd.",labels:{"auto-calc-enabled":"Automatisch irrigatietijd berekening voor elke zone","auto-calc-time":"Berekenen op"}},"automatic-update":{errors:{"warning-update-time-on-or-after-calc-time":"Let op: het automatisch bijwerken van weersinformatie vind plaats op of na de automatische berekening van irrigatietijd"},header:"Automatisch bijwerken van weersinformatie",description:"Verzamel en bewaar weersinformatie automatisch. Weersinformatie is nodig om vorraad en irrigatieduur per zone te berekenen.",labels:{"auto-update-enabled":"Automatisch weersinformatie bijwerken","auto-update-delay":"Vertraging","auto-update-interval":"Sensor data bijwerken elke"},options:{days:"dagen",hours:"uren",minutes:"minuten"}},"automatic-clear":{header:"Automatisch weersinformatie opruimen",description:"Verwijder weersinformatie op het ingestelde moment. Dit zorgt ervoor dat er geen weersinformatie van de vorige dag gebruikt kan worden voor berekeningen. Let op: verwijder geen weersinformatie voordat de berekening heeft plaatsgevonden. Gebruik deze optie als je verwacht dat er weersinformatie zal worden verzameld nadat de berekeningen voor de dag gedaan zijn. Verwijder weersinformatie zo laat mogelijk op de dag.",labels:{"automatic-clear-enabled":"Automatisch weersinformatie verwijderen","automatic-clear-time":"Verwijder weersinformatie om"}}},description:"Dit zijn de algemene instellingen.",title:"Algemeen"},help:{title:"Hulp",cards:{"how-to-get-help":{title:"Hulp vragen","first-read-the":"Allereerst, lees de",wiki:"Wiki","if-you-still-need-help":"Als je hierna nog steeds hulp nodig hebt, laat een bericht achter op het","community-forum":"Community forum","or-open-a":"of open een","github-issue":"Github Issue","english-only":"alleen Engels"}}},mappings:{cards:{"add-mapping":{actions:{add:"Toevoegen"},header:"Voeg sensorgroep toe"},mapping:{aggregates:{average:"Gemiddelde",first:"Eerste",last:"Laatste",maximum:"Maximum",median:"Mediaan",minimum:"Minimum",sum:"Totaal"},errors:{"cannot-delete-mapping-because-zones-use-it":"Deze sensorgroep kan niet worden verwijderd omdat er minimaal een zone gebruik van maakt."},items:{dewpoint:"Dauwpunt",evapotranspiration:"Verdamping",humidity:"Vochtigheid","maximum temperature":"Maximum temperatuur","minimum temperature":"Minimum temperatuur",precipitation:"Totale neerslag",pressure:"Druk","solar radiation":"Zonnestraling",temperature:"Temperatuur",windspeed:"Wind snelheid"},pressure_types:{absolute:"absoluut",relative:"relatief"},"pressure-type":"Druk is","sensor-aggregate-of-sensor-values-to-calculate":"van de sensor waardes om irrigatietijd te berekenen","sensor-aggregate-use-the":"Gebruik de/het","sensor-entity":"Sensor entiteit","input-units":"Invoer geeft waardes in",static_value:"Waarde",source:"Bron",sources:{none:"Geen",openweathermap:"OpenWeatherMap",sensor:"Sensor",static:"Vaste waarde"}}},description:"Voeg een of meer sensorgroepen toe die weergegevens ophalen van OpenWeatherMap, van sensoren of een combinatie. Elke sensorgroep kan worden gebruikt voor een of meerdere zones",labels:{"mapping-name":"Name"},no_items:"Er zijn nog geen sensorgroepen.",title:"Sensorgroepen"},modules:{cards:{"add-module":{actions:{add:"Toevoegen"},header:"Voeg module toe"},module:{errors:{"cannot-delete-module-because-zones-use-it":"Deze module kan niet worden verwijderd omdat er minimaal een zone gebruik van maakt."},labels:{configuration:"Instellingen",required:"verplicht veld"},"translated-options":{DontEstimate:"Niet berekenen",EstimateFromSunHours:"Gebaseerd op zon uren",EstimateFromTemp:"Gebaseerd op temperatuur"}}},description:"Voeg een of meerdere modules toe. Modules berekenen irrigatietijd. Elke module heeft zijn eigen configuratie and kan worden gebruikt voor het berekening van irrigatietijd voor een of meerdere zones.",no_items:"Er zijn nog geen modules.",title:"Modules"},zones:{actions:{add:"Toevoegen",calculate:"Bereken",information:"Informatie",update:"Bijwerken","reset-bucket":"Leeg voorraad"},cards:{"add-zone":{actions:{add:"Toevoegen"},header:"Voeg zone toe"},"zone-actions":{actions:{"calculate-all":"Bereken alle zones","update-all":"Werk alle zone data bij","reset-all-buckets":"Leeg alle voorraden","clear-all-weatherdata":"Verwijder alle weersinformatie"},header:"Acties voor alle zones"}},description:"Voeg een of meerdere zones toe. Per zone wordt de irrigatietijd berekend, afhankelijk van de afmeting, doorvoer, status, module en sensorgroep.",labels:{bucket:"Voorraad",duration:"Irrigatieduur","lead-time":"Aanlooptijd",mapping:"Sensorgroep","maximum-duration":"Maximale duur",multiplier:"Vermenigvuldiger",name:"Naam",size:"Afmeting",state:"Status",states:{automatic:"Automatisch",disabled:"Uit",manual:"Manueel"},throughput:"Doorvoer","maximum-bucket":"Maximale voorraad",last_calculated:"Berekend op","data-last-updated":"Bijgewerkt op","data-number-of-data-points":"Aantal datapunten"},no_items:"Er zijn nog geen zones.",title:"Zones"}},Ge="Grill Buddy",je={common:Ue,panels:De,title:Ge},ze=Object.freeze({__proto__:null,common:Ue,panels:De,title:Ge,default:je});function Fe(e){return e.type===Ne.literal}function Ve(e){return e.type===Ne.argument}function Xe(e){return e.type===Ne.number}function We(e){return e.type===Ne.date}function Ke(e){return e.type===Ne.time}function Ye(e){return e.type===Ne.select}function Ze(e){return e.type===Ne.plural}function qe(e){return e.type===Ne.pound}function Je(e){return e.type===Ne.tag}function Qe(e){return!(!e||"object"!=typeof e||e.type!==Oe.number)}function et(e){return!(!e||"object"!=typeof e||e.type!==Oe.dateTime)}!function(e){e[e.EXPECT_ARGUMENT_CLOSING_BRACE=1]="EXPECT_ARGUMENT_CLOSING_BRACE",e[e.EMPTY_ARGUMENT=2]="EMPTY_ARGUMENT",e[e.MALFORMED_ARGUMENT=3]="MALFORMED_ARGUMENT",e[e.EXPECT_ARGUMENT_TYPE=4]="EXPECT_ARGUMENT_TYPE",e[e.INVALID_ARGUMENT_TYPE=5]="INVALID_ARGUMENT_TYPE",e[e.EXPECT_ARGUMENT_STYLE=6]="EXPECT_ARGUMENT_STYLE",e[e.INVALID_NUMBER_SKELETON=7]="INVALID_NUMBER_SKELETON",e[e.INVALID_DATE_TIME_SKELETON=8]="INVALID_DATE_TIME_SKELETON",e[e.EXPECT_NUMBER_SKELETON=9]="EXPECT_NUMBER_SKELETON",e[e.EXPECT_DATE_TIME_SKELETON=10]="EXPECT_DATE_TIME_SKELETON",e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE=11]="UNCLOSED_QUOTE_IN_ARGUMENT_STYLE",e[e.EXPECT_SELECT_ARGUMENT_OPTIONS=12]="EXPECT_SELECT_ARGUMENT_OPTIONS",e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE=13]="EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE",e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE=14]="INVALID_PLURAL_ARGUMENT_OFFSET_VALUE",e[e.EXPECT_SELECT_ARGUMENT_SELECTOR=15]="EXPECT_SELECT_ARGUMENT_SELECTOR",e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR=16]="EXPECT_PLURAL_ARGUMENT_SELECTOR",e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT=17]="EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT",e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT=18]="EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT",e[e.INVALID_PLURAL_ARGUMENT_SELECTOR=19]="INVALID_PLURAL_ARGUMENT_SELECTOR",e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR=20]="DUPLICATE_PLURAL_ARGUMENT_SELECTOR",e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR=21]="DUPLICATE_SELECT_ARGUMENT_SELECTOR",e[e.MISSING_OTHER_CLAUSE=22]="MISSING_OTHER_CLAUSE",e[e.INVALID_TAG=23]="INVALID_TAG",e[e.INVALID_TAG_NAME=25]="INVALID_TAG_NAME",e[e.UNMATCHED_CLOSING_TAG=26]="UNMATCHED_CLOSING_TAG",e[e.UNCLOSED_TAG=27]="UNCLOSED_TAG"}(Le||(Le={})),function(e){e[e.literal=0]="literal",e[e.argument=1]="argument",e[e.number=2]="number",e[e.date=3]="date",e[e.time=4]="time",e[e.select=5]="select",e[e.plural=6]="plural",e[e.pound=7]="pound",e[e.tag=8]="tag"}(Ne||(Ne={})),function(e){e[e.number=0]="number",e[e.dateTime=1]="dateTime"}(Oe||(Oe={}));var tt=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,rt=/(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;function it(e){var t={};return e.replace(rt,(function(e){var r=e.length;switch(e[0]){case"G":t.era=4===r?"long":5===r?"narrow":"short";break;case"y":t.year=2===r?"2-digit":"numeric";break;case"Y":case"u":case"U":case"r":throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");case"q":case"Q":throw new RangeError("`q/Q` (quarter) patterns are not supported");case"M":case"L":t.month=["numeric","2-digit","short","long","narrow"][r-1];break;case"w":case"W":throw new RangeError("`w/W` (week) patterns are not supported");case"d":t.day=["numeric","2-digit"][r-1];break;case"D":case"F":case"g":throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");case"E":t.weekday=4===r?"long":5===r?"narrow":"short";break;case"e":if(r<4)throw new RangeError("`e..eee` (weekday) patterns are not supported");t.weekday=["short","long","narrow","short"][r-4];break;case"c":if(r<4)throw new RangeError("`c..ccc` (weekday) patterns are not supported");t.weekday=["short","long","narrow","short"][r-4];break;case"a":t.hour12=!0;break;case"b":case"B":throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");case"h":t.hourCycle="h12",t.hour=["numeric","2-digit"][r-1];break;case"H":t.hourCycle="h23",t.hour=["numeric","2-digit"][r-1];break;case"K":t.hourCycle="h11",t.hour=["numeric","2-digit"][r-1];break;case"k":t.hourCycle="h24",t.hour=["numeric","2-digit"][r-1];break;case"j":case"J":case"C":throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");case"m":t.minute=["numeric","2-digit"][r-1];break;case"s":t.second=["numeric","2-digit"][r-1];break;case"S":case"A":throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");case"z":t.timeZoneName=r<4?"short":"long";break;case"Z":case"O":case"v":case"V":case"X":case"x":throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead")}return""})),t}var nt=/[\t-\r \x85\u200E\u200F\u2028\u2029]/i;var ot=/^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,at=/^(@+)?(\+|#+)?[rs]?$/g,st=/(\*)(0+)|(#+)(0+)|(0+)/g,lt=/^(0+)$/;function ht(e){var t={};return"r"===e[e.length-1]?t.roundingPriority="morePrecision":"s"===e[e.length-1]&&(t.roundingPriority="lessPrecision"),e.replace(at,(function(e,r,i){return"string"!=typeof i?(t.minimumSignificantDigits=r.length,t.maximumSignificantDigits=r.length):"+"===i?t.minimumSignificantDigits=r.length:"#"===r[0]?t.maximumSignificantDigits=r.length:(t.minimumSignificantDigits=r.length,t.maximumSignificantDigits=r.length+("string"==typeof i?i.length:0)),""})),t}function ct(e){switch(e){case"sign-auto":return{signDisplay:"auto"};case"sign-accounting":case"()":return{currencySign:"accounting"};case"sign-always":case"+!":return{signDisplay:"always"};case"sign-accounting-always":case"()!":return{signDisplay:"always",currencySign:"accounting"};case"sign-except-zero":case"+?":return{signDisplay:"exceptZero"};case"sign-accounting-except-zero":case"()?":return{signDisplay:"exceptZero",currencySign:"accounting"};case"sign-never":case"+_":return{signDisplay:"never"}}}function ut(e){var t;if("E"===e[0]&&"E"===e[1]?(t={notation:"engineering"},e=e.slice(2)):"E"===e[0]&&(t={notation:"scientific"},e=e.slice(1)),t){var r=e.slice(0,2);if("+!"===r?(t.signDisplay="always",e=e.slice(2)):"+?"===r&&(t.signDisplay="exceptZero",e=e.slice(2)),!lt.test(e))throw new Error("Malformed concise eng/scientific notation");t.minimumIntegerDigits=e.length}return t}function dt(e){var t=ct(e);return t||{}}function pt(e){for(var t={},r=0,n=e;r<n.length;r++){var o=n[r];switch(o.stem){case"percent":case"%":t.style="percent";continue;case"%x100":t.style="percent",t.scale=100;continue;case"currency":t.style="currency",t.currency=o.options[0];continue;case"group-off":case",_":t.useGrouping=!1;continue;case"precision-integer":case".":t.maximumFractionDigits=0;continue;case"measure-unit":case"unit":t.style="unit",t.unit=o.options[0].replace(/^(.*?)-/,"");continue;case"compact-short":case"K":t.notation="compact",t.compactDisplay="short";continue;case"compact-long":case"KK":t.notation="compact",t.compactDisplay="long";continue;case"scientific":t=i(i(i({},t),{notation:"scientific"}),o.options.reduce((function(e,t){return i(i({},e),dt(t))}),{}));continue;case"engineering":t=i(i(i({},t),{notation:"engineering"}),o.options.reduce((function(e,t){return i(i({},e),dt(t))}),{}));continue;case"notation-simple":t.notation="standard";continue;case"unit-width-narrow":t.currencyDisplay="narrowSymbol",t.unitDisplay="narrow";continue;case"unit-width-short":t.currencyDisplay="code",t.unitDisplay="short";continue;case"unit-width-full-name":t.currencyDisplay="name",t.unitDisplay="long";continue;case"unit-width-iso-code":t.currencyDisplay="symbol";continue;case"scale":t.scale=parseFloat(o.options[0]);continue;case"rounding-mode-floor":t.roundingMode="floor";continue;case"rounding-mode-ceiling":t.roundingMode="ceil";continue;case"rounding-mode-down":t.roundingMode="trunc";continue;case"rounding-mode-up":t.roundingMode="expand";continue;case"rounding-mode-half-even":t.roundingMode="halfEven";continue;case"rounding-mode-half-down":t.roundingMode="halfTrunc";continue;case"rounding-mode-half-up":t.roundingMode="halfExpand";continue;case"integer-width":if(o.options.length>1)throw new RangeError("integer-width stems only accept a single optional option");o.options[0].replace(st,(function(e,r,i,n,o,a){if(r)t.minimumIntegerDigits=i.length;else{if(n&&o)throw new Error("We currently do not support maximum integer digits");if(a)throw new Error("We currently do not support exact integer digits")}return""}));continue}if(lt.test(o.stem))t.minimumIntegerDigits=o.stem.length;else if(ot.test(o.stem)){if(o.options.length>1)throw new RangeError("Fraction-precision stems only accept a single optional option");o.stem.replace(ot,(function(e,r,i,n,o,a){return"*"===i?t.minimumFractionDigits=r.length:n&&"#"===n[0]?t.maximumFractionDigits=n.length:o&&a?(t.minimumFractionDigits=o.length,t.maximumFractionDigits=o.length+a.length):(t.minimumFractionDigits=r.length,t.maximumFractionDigits=r.length),""}));var a=o.options[0];"w"===a?t=i(i({},t),{trailingZeroDisplay:"stripIfInteger"}):a&&(t=i(i({},t),ht(a)))}else if(at.test(o.stem))t=i(i({},t),ht(o.stem));else{var s=ct(o.stem);s&&(t=i(i({},t),s));var l=ut(o.stem);l&&(t=i(i({},t),l))}}return t}var mt,gt={"001":["H","h"],AC:["H","h","hb","hB"],AD:["H","hB"],AE:["h","hB","hb","H"],AF:["H","hb","hB","h"],AG:["h","hb","H","hB"],AI:["H","h","hb","hB"],AL:["h","H","hB"],AM:["H","hB"],AO:["H","hB"],AR:["H","h","hB","hb"],AS:["h","H"],AT:["H","hB"],AU:["h","hb","H","hB"],AW:["H","hB"],AX:["H"],AZ:["H","hB","h"],BA:["H","hB","h"],BB:["h","hb","H","hB"],BD:["h","hB","H"],BE:["H","hB"],BF:["H","hB"],BG:["H","hB","h"],BH:["h","hB","hb","H"],BI:["H","h"],BJ:["H","hB"],BL:["H","hB"],BM:["h","hb","H","hB"],BN:["hb","hB","h","H"],BO:["H","hB","h","hb"],BQ:["H"],BR:["H","hB"],BS:["h","hb","H","hB"],BT:["h","H"],BW:["H","h","hb","hB"],BY:["H","h"],BZ:["H","h","hb","hB"],CA:["h","hb","H","hB"],CC:["H","h","hb","hB"],CD:["hB","H"],CF:["H","h","hB"],CG:["H","hB"],CH:["H","hB","h"],CI:["H","hB"],CK:["H","h","hb","hB"],CL:["H","h","hB","hb"],CM:["H","h","hB"],CN:["H","hB","hb","h"],CO:["h","H","hB","hb"],CP:["H"],CR:["H","h","hB","hb"],CU:["H","h","hB","hb"],CV:["H","hB"],CW:["H","hB"],CX:["H","h","hb","hB"],CY:["h","H","hb","hB"],CZ:["H"],DE:["H","hB"],DG:["H","h","hb","hB"],DJ:["h","H"],DK:["H"],DM:["h","hb","H","hB"],DO:["h","H","hB","hb"],DZ:["h","hB","hb","H"],EA:["H","h","hB","hb"],EC:["H","hB","h","hb"],EE:["H","hB"],EG:["h","hB","hb","H"],EH:["h","hB","hb","H"],ER:["h","H"],ES:["H","hB","h","hb"],ET:["hB","hb","h","H"],FI:["H"],FJ:["h","hb","H","hB"],FK:["H","h","hb","hB"],FM:["h","hb","H","hB"],FO:["H","h"],FR:["H","hB"],GA:["H","hB"],GB:["H","h","hb","hB"],GD:["h","hb","H","hB"],GE:["H","hB","h"],GF:["H","hB"],GG:["H","h","hb","hB"],GH:["h","H"],GI:["H","h","hb","hB"],GL:["H","h"],GM:["h","hb","H","hB"],GN:["H","hB"],GP:["H","hB"],GQ:["H","hB","h","hb"],GR:["h","H","hb","hB"],GT:["H","h","hB","hb"],GU:["h","hb","H","hB"],GW:["H","hB"],GY:["h","hb","H","hB"],HK:["h","hB","hb","H"],HN:["H","h","hB","hb"],HR:["H","hB"],HU:["H","h"],IC:["H","h","hB","hb"],ID:["H"],IE:["H","h","hb","hB"],IL:["H","hB"],IM:["H","h","hb","hB"],IN:["h","H"],IO:["H","h","hb","hB"],IQ:["h","hB","hb","H"],IR:["hB","H"],IS:["H"],IT:["H","hB"],JE:["H","h","hb","hB"],JM:["h","hb","H","hB"],JO:["h","hB","hb","H"],JP:["H","K","h"],KE:["hB","hb","H","h"],KG:["H","h","hB","hb"],KH:["hB","h","H","hb"],KI:["h","hb","H","hB"],KM:["H","h","hB","hb"],KN:["h","hb","H","hB"],KP:["h","H","hB","hb"],KR:["h","H","hB","hb"],KW:["h","hB","hb","H"],KY:["h","hb","H","hB"],KZ:["H","hB"],LA:["H","hb","hB","h"],LB:["h","hB","hb","H"],LC:["h","hb","H","hB"],LI:["H","hB","h"],LK:["H","h","hB","hb"],LR:["h","hb","H","hB"],LS:["h","H"],LT:["H","h","hb","hB"],LU:["H","h","hB"],LV:["H","hB","hb","h"],LY:["h","hB","hb","H"],MA:["H","h","hB","hb"],MC:["H","hB"],MD:["H","hB"],ME:["H","hB","h"],MF:["H","hB"],MG:["H","h"],MH:["h","hb","H","hB"],MK:["H","h","hb","hB"],ML:["H"],MM:["hB","hb","H","h"],MN:["H","h","hb","hB"],MO:["h","hB","hb","H"],MP:["h","hb","H","hB"],MQ:["H","hB"],MR:["h","hB","hb","H"],MS:["H","h","hb","hB"],MT:["H","h"],MU:["H","h"],MV:["H","h"],MW:["h","hb","H","hB"],MX:["H","h","hB","hb"],MY:["hb","hB","h","H"],MZ:["H","hB"],NA:["h","H","hB","hb"],NC:["H","hB"],NE:["H"],NF:["H","h","hb","hB"],NG:["H","h","hb","hB"],NI:["H","h","hB","hb"],NL:["H","hB"],NO:["H","h"],NP:["H","h","hB"],NR:["H","h","hb","hB"],NU:["H","h","hb","hB"],NZ:["h","hb","H","hB"],OM:["h","hB","hb","H"],PA:["h","H","hB","hb"],PE:["H","hB","h","hb"],PF:["H","h","hB"],PG:["h","H"],PH:["h","hB","hb","H"],PK:["h","hB","H"],PL:["H","h"],PM:["H","hB"],PN:["H","h","hb","hB"],PR:["h","H","hB","hb"],PS:["h","hB","hb","H"],PT:["H","hB"],PW:["h","H"],PY:["H","h","hB","hb"],QA:["h","hB","hb","H"],RE:["H","hB"],RO:["H","hB"],RS:["H","hB","h"],RU:["H"],RW:["H","h"],SA:["h","hB","hb","H"],SB:["h","hb","H","hB"],SC:["H","h","hB"],SD:["h","hB","hb","H"],SE:["H"],SG:["h","hb","H","hB"],SH:["H","h","hb","hB"],SI:["H","hB"],SJ:["H"],SK:["H"],SL:["h","hb","H","hB"],SM:["H","h","hB"],SN:["H","h","hB"],SO:["h","H"],SR:["H","hB"],SS:["h","hb","H","hB"],ST:["H","hB"],SV:["H","h","hB","hb"],SX:["H","h","hb","hB"],SY:["h","hB","hb","H"],SZ:["h","hb","H","hB"],TA:["H","h","hb","hB"],TC:["h","hb","H","hB"],TD:["h","H","hB"],TF:["H","h","hB"],TG:["H","hB"],TH:["H","h"],TJ:["H","h"],TL:["H","hB","hb","h"],TM:["H","h"],TN:["h","hB","hb","H"],TO:["h","H"],TR:["H","hB"],TT:["h","hb","H","hB"],TW:["hB","hb","h","H"],TZ:["hB","hb","H","h"],UA:["H","hB","h"],UG:["hB","hb","H","h"],UM:["h","hb","H","hB"],US:["h","hb","H","hB"],UY:["H","h","hB","hb"],UZ:["H","hB","h"],VA:["H","h","hB"],VC:["h","hb","H","hB"],VE:["h","H","hB","hb"],VG:["h","hb","H","hB"],VI:["h","hb","H","hB"],VN:["H","h"],VU:["h","H"],WF:["H","hB"],WS:["h","H"],XK:["H","hB","h"],YE:["h","hB","hb","H"],YT:["H","hB"],ZA:["H","h","hb","hB"],ZM:["h","hb","H","hB"],ZW:["H","h"],"af-ZA":["H","h","hB","hb"],"ar-001":["h","hB","hb","H"],"ca-ES":["H","h","hB"],"en-001":["h","hb","H","hB"],"es-BO":["H","h","hB","hb"],"es-BR":["H","h","hB","hb"],"es-EC":["H","h","hB","hb"],"es-ES":["H","h","hB","hb"],"es-GQ":["H","h","hB","hb"],"es-PE":["H","h","hB","hb"],"fr-CA":["H","h","hB"],"gl-ES":["H","h","hB"],"gu-IN":["hB","hb","h","H"],"hi-IN":["hB","h","H"],"it-CH":["H","h","hB"],"it-IT":["H","h","hB"],"kn-IN":["hB","h","H"],"ml-IN":["hB","h","H"],"mr-IN":["hB","hb","h","H"],"pa-IN":["hB","hb","h","H"],"ta-IN":["hB","h","hb","H"],"te-IN":["hB","h","H"],"zu-ZA":["H","hB","hb","h"]};function ft(e){var t=e.hourCycle;if(void 0===t&&e.hourCycles&&e.hourCycles.length&&(t=e.hourCycles[0]),t)switch(t){case"h24":return"k";case"h23":return"H";case"h12":return"h";case"h11":return"K";default:throw new Error("Invalid hourCycle")}var r,i=e.language;return"root"!==i&&(r=e.maximize().region),(gt[r||""]||gt[i||""]||gt["".concat(i,"-001")]||gt["001"])[0]}var bt=new RegExp("^".concat(tt.source,"*")),vt=new RegExp("".concat(tt.source,"*$"));function yt(e,t){return{start:e,end:t}}var Et=!!String.prototype.startsWith&&"_a".startsWith("a",1),_t=!!String.fromCodePoint,At=!!Object.fromEntries,wt=!!String.prototype.codePointAt,Ht=!!String.prototype.trimStart,Tt=!!String.prototype.trimEnd,St=!!Number.isSafeInteger?Number.isSafeInteger:function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e&&Math.abs(e)<=9007199254740991},Bt=!0;try{Bt="a"===(null===(mt=Mt("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu").exec("a"))||void 0===mt?void 0:mt[0])}catch(R){Bt=!1}var Pt,$t=Et?function(e,t,r){return e.startsWith(t,r)}:function(e,t,r){return e.slice(r,r+t.length)===t},Ct=_t?String.fromCodePoint:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var r,i="",n=e.length,o=0;n>o;){if((r=e[o++])>1114111)throw RangeError(r+" is not a valid code point");i+=r<65536?String.fromCharCode(r):String.fromCharCode(55296+((r-=65536)>>10),r%1024+56320)}return i},Lt=At?Object.fromEntries:function(e){for(var t={},r=0,i=e;r<i.length;r++){var n=i[r],o=n[0],a=n[1];t[o]=a}return t},Nt=wt?function(e,t){return e.codePointAt(t)}:function(e,t){var r=e.length;if(!(t<0||t>=r)){var i,n=e.charCodeAt(t);return n<55296||n>56319||t+1===r||(i=e.charCodeAt(t+1))<56320||i>57343?n:i-56320+(n-55296<<10)+65536}},Ot=Ht?function(e){return e.trimStart()}:function(e){return e.replace(bt,"")},It=Tt?function(e){return e.trimEnd()}:function(e){return e.replace(vt,"")};function Mt(e,t){return new RegExp(e,t)}if(Bt){var xt=Mt("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu");Pt=function(e,t){var r;return xt.lastIndex=t,null!==(r=xt.exec(e)[1])&&void 0!==r?r:""}}else Pt=function(e,t){for(var r=[];;){var i=Nt(e,t);if(void 0===i||Dt(i)||Gt(i))break;r.push(i),t+=i>=65536?2:1}return Ct.apply(void 0,r)};var Rt=function(){function e(e,t){void 0===t&&(t={}),this.message=e,this.position={offset:0,line:1,column:1},this.ignoreTag=!!t.ignoreTag,this.locale=t.locale,this.requiresOtherClause=!!t.requiresOtherClause,this.shouldParseSkeletons=!!t.shouldParseSkeletons}return e.prototype.parse=function(){if(0!==this.offset())throw Error("parser can only be used once");return this.parseMessage(0,"",!1)},e.prototype.parseMessage=function(e,t,r){for(var i=[];!this.isEOF();){var n=this.char();if(123===n){if((o=this.parseArgument(e,r)).err)return o;i.push(o.val)}else{if(125===n&&e>0)break;if(35!==n||"plural"!==t&&"selectordinal"!==t){if(60===n&&!this.ignoreTag&&47===this.peek()){if(r)break;return this.error(Le.UNMATCHED_CLOSING_TAG,yt(this.clonePosition(),this.clonePosition()))}if(60===n&&!this.ignoreTag&&kt(this.peek()||0)){if((o=this.parseTag(e,t)).err)return o;i.push(o.val)}else{var o;if((o=this.parseLiteral(e,t)).err)return o;i.push(o.val)}}else{var a=this.clonePosition();this.bump(),i.push({type:Ne.pound,location:yt(a,this.clonePosition())})}}}return{val:i,err:null}},e.prototype.parseTag=function(e,t){var r=this.clonePosition();this.bump();var i=this.parseTagName();if(this.bumpSpace(),this.bumpIf("/>"))return{val:{type:Ne.literal,value:"<".concat(i,"/>"),location:yt(r,this.clonePosition())},err:null};if(this.bumpIf(">")){var n=this.parseMessage(e+1,t,!0);if(n.err)return n;var o=n.val,a=this.clonePosition();if(this.bumpIf("</")){if(this.isEOF()||!kt(this.char()))return this.error(Le.INVALID_TAG,yt(a,this.clonePosition()));var s=this.clonePosition();return i!==this.parseTagName()?this.error(Le.UNMATCHED_CLOSING_TAG,yt(s,this.clonePosition())):(this.bumpSpace(),this.bumpIf(">")?{val:{type:Ne.tag,value:i,children:o,location:yt(r,this.clonePosition())},err:null}:this.error(Le.INVALID_TAG,yt(a,this.clonePosition())))}return this.error(Le.UNCLOSED_TAG,yt(r,this.clonePosition()))}return this.error(Le.INVALID_TAG,yt(r,this.clonePosition()))},e.prototype.parseTagName=function(){var e=this.offset();for(this.bump();!this.isEOF()&&Ut(this.char());)this.bump();return this.message.slice(e,this.offset())},e.prototype.parseLiteral=function(e,t){for(var r=this.clonePosition(),i="";;){var n=this.tryParseQuote(t);if(n)i+=n;else{var o=this.tryParseUnquoted(e,t);if(o)i+=o;else{var a=this.tryParseLeftAngleBracket();if(!a)break;i+=a}}}var s=yt(r,this.clonePosition());return{val:{type:Ne.literal,value:i,location:s},err:null}},e.prototype.tryParseLeftAngleBracket=function(){return this.isEOF()||60!==this.char()||!this.ignoreTag&&(kt(e=this.peek()||0)||47===e)?null:(this.bump(),"<");var e},e.prototype.tryParseQuote=function(e){if(this.isEOF()||39!==this.char())return null;switch(this.peek()){case 39:return this.bump(),this.bump(),"'";case 123:case 60:case 62:case 125:break;case 35:if("plural"===e||"selectordinal"===e)break;return null;default:return null}this.bump();var t=[this.char()];for(this.bump();!this.isEOF();){var r=this.char();if(39===r){if(39!==this.peek()){this.bump();break}t.push(39),this.bump()}else t.push(r);this.bump()}return Ct.apply(void 0,t)},e.prototype.tryParseUnquoted=function(e,t){if(this.isEOF())return null;var r=this.char();return 60===r||123===r||35===r&&("plural"===t||"selectordinal"===t)||125===r&&e>0?null:(this.bump(),Ct(r))},e.prototype.parseArgument=function(e,t){var r=this.clonePosition();if(this.bump(),this.bumpSpace(),this.isEOF())return this.error(Le.EXPECT_ARGUMENT_CLOSING_BRACE,yt(r,this.clonePosition()));if(125===this.char())return this.bump(),this.error(Le.EMPTY_ARGUMENT,yt(r,this.clonePosition()));var i=this.parseIdentifierIfPossible().value;if(!i)return this.error(Le.MALFORMED_ARGUMENT,yt(r,this.clonePosition()));if(this.bumpSpace(),this.isEOF())return this.error(Le.EXPECT_ARGUMENT_CLOSING_BRACE,yt(r,this.clonePosition()));switch(this.char()){case 125:return this.bump(),{val:{type:Ne.argument,value:i,location:yt(r,this.clonePosition())},err:null};case 44:return this.bump(),this.bumpSpace(),this.isEOF()?this.error(Le.EXPECT_ARGUMENT_CLOSING_BRACE,yt(r,this.clonePosition())):this.parseArgumentOptions(e,t,i,r);default:return this.error(Le.MALFORMED_ARGUMENT,yt(r,this.clonePosition()))}},e.prototype.parseIdentifierIfPossible=function(){var e=this.clonePosition(),t=this.offset(),r=Pt(this.message,t),i=t+r.length;return this.bumpTo(i),{value:r,location:yt(e,this.clonePosition())}},e.prototype.parseArgumentOptions=function(e,t,r,n){var o,a=this.clonePosition(),s=this.parseIdentifierIfPossible().value,l=this.clonePosition();switch(s){case"":return this.error(Le.EXPECT_ARGUMENT_TYPE,yt(a,l));case"number":case"date":case"time":this.bumpSpace();var h=null;if(this.bumpIf(",")){this.bumpSpace();var c=this.clonePosition();if((v=this.parseSimpleArgStyleIfPossible()).err)return v;if(0===(m=It(v.val)).length)return this.error(Le.EXPECT_ARGUMENT_STYLE,yt(this.clonePosition(),this.clonePosition()));h={style:m,styleLocation:yt(c,this.clonePosition())}}if((y=this.tryParseArgumentClose(n)).err)return y;var u=yt(n,this.clonePosition());if(h&&$t(null==h?void 0:h.style,"::",0)){var d=Ot(h.style.slice(2));if("number"===s)return(v=this.parseNumberSkeletonFromString(d,h.styleLocation)).err?v:{val:{type:Ne.number,value:r,location:u,style:v.val},err:null};if(0===d.length)return this.error(Le.EXPECT_DATE_TIME_SKELETON,u);var p=d;this.locale&&(p=function(e,t){for(var r="",i=0;i<e.length;i++){var n=e.charAt(i);if("j"===n){for(var o=0;i+1<e.length&&e.charAt(i+1)===n;)o++,i++;var a=1+(1&o),s=o<2?1:3+(o>>1),l=ft(t);for("H"!=l&&"k"!=l||(s=0);s-- >0;)r+="a";for(;a-- >0;)r=l+r}else r+="J"===n?"H":n}return r}(d,this.locale));var m={type:Oe.dateTime,pattern:p,location:h.styleLocation,parsedOptions:this.shouldParseSkeletons?it(p):{}};return{val:{type:"date"===s?Ne.date:Ne.time,value:r,location:u,style:m},err:null}}return{val:{type:"number"===s?Ne.number:"date"===s?Ne.date:Ne.time,value:r,location:u,style:null!==(o=null==h?void 0:h.style)&&void 0!==o?o:null},err:null};case"plural":case"selectordinal":case"select":var g=this.clonePosition();if(this.bumpSpace(),!this.bumpIf(","))return this.error(Le.EXPECT_SELECT_ARGUMENT_OPTIONS,yt(g,i({},g)));this.bumpSpace();var f=this.parseIdentifierIfPossible(),b=0;if("select"!==s&&"offset"===f.value){if(!this.bumpIf(":"))return this.error(Le.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,yt(this.clonePosition(),this.clonePosition()));var v;if(this.bumpSpace(),(v=this.tryParseDecimalInteger(Le.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,Le.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE)).err)return v;this.bumpSpace(),f=this.parseIdentifierIfPossible(),b=v.val}var y,E=this.tryParsePluralOrSelectOptions(e,s,t,f);if(E.err)return E;if((y=this.tryParseArgumentClose(n)).err)return y;var _=yt(n,this.clonePosition());return"select"===s?{val:{type:Ne.select,value:r,options:Lt(E.val),location:_},err:null}:{val:{type:Ne.plural,value:r,options:Lt(E.val),offset:b,pluralType:"plural"===s?"cardinal":"ordinal",location:_},err:null};default:return this.error(Le.INVALID_ARGUMENT_TYPE,yt(a,l))}},e.prototype.tryParseArgumentClose=function(e){return this.isEOF()||125!==this.char()?this.error(Le.EXPECT_ARGUMENT_CLOSING_BRACE,yt(e,this.clonePosition())):(this.bump(),{val:!0,err:null})},e.prototype.parseSimpleArgStyleIfPossible=function(){for(var e=0,t=this.clonePosition();!this.isEOF();){switch(this.char()){case 39:this.bump();var r=this.clonePosition();if(!this.bumpUntil("'"))return this.error(Le.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE,yt(r,this.clonePosition()));this.bump();break;case 123:e+=1,this.bump();break;case 125:if(!(e>0))return{val:this.message.slice(t.offset,this.offset()),err:null};e-=1;break;default:this.bump()}}return{val:this.message.slice(t.offset,this.offset()),err:null}},e.prototype.parseNumberSkeletonFromString=function(e,t){var r=[];try{r=function(e){if(0===e.length)throw new Error("Number skeleton cannot be empty");for(var t=e.split(nt).filter((function(e){return e.length>0})),r=[],i=0,n=t;i<n.length;i++){var o=n[i].split("/");if(0===o.length)throw new Error("Invalid number skeleton");for(var a=o[0],s=o.slice(1),l=0,h=s;l<h.length;l++)if(0===h[l].length)throw new Error("Invalid number skeleton");r.push({stem:a,options:s})}return r}(e)}catch(e){return this.error(Le.INVALID_NUMBER_SKELETON,t)}return{val:{type:Oe.number,tokens:r,location:t,parsedOptions:this.shouldParseSkeletons?pt(r):{}},err:null}},e.prototype.tryParsePluralOrSelectOptions=function(e,t,r,i){for(var n,o=!1,a=[],s=new Set,l=i.value,h=i.location;;){if(0===l.length){var c=this.clonePosition();if("select"===t||!this.bumpIf("="))break;var u=this.tryParseDecimalInteger(Le.EXPECT_PLURAL_ARGUMENT_SELECTOR,Le.INVALID_PLURAL_ARGUMENT_SELECTOR);if(u.err)return u;h=yt(c,this.clonePosition()),l=this.message.slice(c.offset,this.offset())}if(s.has(l))return this.error("select"===t?Le.DUPLICATE_SELECT_ARGUMENT_SELECTOR:Le.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,h);"other"===l&&(o=!0),this.bumpSpace();var d=this.clonePosition();if(!this.bumpIf("{"))return this.error("select"===t?Le.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT:Le.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,yt(this.clonePosition(),this.clonePosition()));var p=this.parseMessage(e+1,t,r);if(p.err)return p;var m=this.tryParseArgumentClose(d);if(m.err)return m;a.push([l,{value:p.val,location:yt(d,this.clonePosition())}]),s.add(l),this.bumpSpace(),l=(n=this.parseIdentifierIfPossible()).value,h=n.location}return 0===a.length?this.error("select"===t?Le.EXPECT_SELECT_ARGUMENT_SELECTOR:Le.EXPECT_PLURAL_ARGUMENT_SELECTOR,yt(this.clonePosition(),this.clonePosition())):this.requiresOtherClause&&!o?this.error(Le.MISSING_OTHER_CLAUSE,yt(this.clonePosition(),this.clonePosition())):{val:a,err:null}},e.prototype.tryParseDecimalInteger=function(e,t){var r=1,i=this.clonePosition();this.bumpIf("+")||this.bumpIf("-")&&(r=-1);for(var n=!1,o=0;!this.isEOF();){var a=this.char();if(!(a>=48&&a<=57))break;n=!0,o=10*o+(a-48),this.bump()}var s=yt(i,this.clonePosition());return n?St(o*=r)?{val:o,err:null}:this.error(t,s):this.error(e,s)},e.prototype.offset=function(){return this.position.offset},e.prototype.isEOF=function(){return this.offset()===this.message.length},e.prototype.clonePosition=function(){return{offset:this.position.offset,line:this.position.line,column:this.position.column}},e.prototype.char=function(){var e=this.position.offset;if(e>=this.message.length)throw Error("out of bound");var t=Nt(this.message,e);if(void 0===t)throw Error("Offset ".concat(e," is at invalid UTF-16 code unit boundary"));return t},e.prototype.error=function(e,t){return{val:null,err:{kind:e,message:this.message,location:t}}},e.prototype.bump=function(){if(!this.isEOF()){var e=this.char();10===e?(this.position.line+=1,this.position.column=1,this.position.offset+=1):(this.position.column+=1,this.position.offset+=e<65536?1:2)}},e.prototype.bumpIf=function(e){if($t(this.message,e,this.offset())){for(var t=0;t<e.length;t++)this.bump();return!0}return!1},e.prototype.bumpUntil=function(e){var t=this.offset(),r=this.message.indexOf(e,t);return r>=0?(this.bumpTo(r),!0):(this.bumpTo(this.message.length),!1)},e.prototype.bumpTo=function(e){if(this.offset()>e)throw Error("targetOffset ".concat(e," must be greater than or equal to the current offset ").concat(this.offset()));for(e=Math.min(e,this.message.length);;){var t=this.offset();if(t===e)break;if(t>e)throw Error("targetOffset ".concat(e," is at invalid UTF-16 code unit boundary"));if(this.bump(),this.isEOF())break}},e.prototype.bumpSpace=function(){for(;!this.isEOF()&&Dt(this.char());)this.bump()},e.prototype.peek=function(){if(this.isEOF())return null;var e=this.char(),t=this.offset(),r=this.message.charCodeAt(t+(e>=65536?2:1));return null!=r?r:null},e}();function kt(e){return e>=97&&e<=122||e>=65&&e<=90}function Ut(e){return 45===e||46===e||e>=48&&e<=57||95===e||e>=97&&e<=122||e>=65&&e<=90||183==e||e>=192&&e<=214||e>=216&&e<=246||e>=248&&e<=893||e>=895&&e<=8191||e>=8204&&e<=8205||e>=8255&&e<=8256||e>=8304&&e<=8591||e>=11264&&e<=12271||e>=12289&&e<=55295||e>=63744&&e<=64975||e>=65008&&e<=65533||e>=65536&&e<=983039}function Dt(e){return e>=9&&e<=13||32===e||133===e||e>=8206&&e<=8207||8232===e||8233===e}function Gt(e){return e>=33&&e<=35||36===e||e>=37&&e<=39||40===e||41===e||42===e||43===e||44===e||45===e||e>=46&&e<=47||e>=58&&e<=59||e>=60&&e<=62||e>=63&&e<=64||91===e||92===e||93===e||94===e||96===e||123===e||124===e||125===e||126===e||161===e||e>=162&&e<=165||166===e||167===e||169===e||171===e||172===e||174===e||176===e||177===e||182===e||187===e||191===e||215===e||247===e||e>=8208&&e<=8213||e>=8214&&e<=8215||8216===e||8217===e||8218===e||e>=8219&&e<=8220||8221===e||8222===e||8223===e||e>=8224&&e<=8231||e>=8240&&e<=8248||8249===e||8250===e||e>=8251&&e<=8254||e>=8257&&e<=8259||8260===e||8261===e||8262===e||e>=8263&&e<=8273||8274===e||8275===e||e>=8277&&e<=8286||e>=8592&&e<=8596||e>=8597&&e<=8601||e>=8602&&e<=8603||e>=8604&&e<=8607||8608===e||e>=8609&&e<=8610||8611===e||e>=8612&&e<=8613||8614===e||e>=8615&&e<=8621||8622===e||e>=8623&&e<=8653||e>=8654&&e<=8655||e>=8656&&e<=8657||8658===e||8659===e||8660===e||e>=8661&&e<=8691||e>=8692&&e<=8959||e>=8960&&e<=8967||8968===e||8969===e||8970===e||8971===e||e>=8972&&e<=8991||e>=8992&&e<=8993||e>=8994&&e<=9e3||9001===e||9002===e||e>=9003&&e<=9083||9084===e||e>=9085&&e<=9114||e>=9115&&e<=9139||e>=9140&&e<=9179||e>=9180&&e<=9185||e>=9186&&e<=9254||e>=9255&&e<=9279||e>=9280&&e<=9290||e>=9291&&e<=9311||e>=9472&&e<=9654||9655===e||e>=9656&&e<=9664||9665===e||e>=9666&&e<=9719||e>=9720&&e<=9727||e>=9728&&e<=9838||9839===e||e>=9840&&e<=10087||10088===e||10089===e||10090===e||10091===e||10092===e||10093===e||10094===e||10095===e||10096===e||10097===e||10098===e||10099===e||10100===e||10101===e||e>=10132&&e<=10175||e>=10176&&e<=10180||10181===e||10182===e||e>=10183&&e<=10213||10214===e||10215===e||10216===e||10217===e||10218===e||10219===e||10220===e||10221===e||10222===e||10223===e||e>=10224&&e<=10239||e>=10240&&e<=10495||e>=10496&&e<=10626||10627===e||10628===e||10629===e||10630===e||10631===e||10632===e||10633===e||10634===e||10635===e||10636===e||10637===e||10638===e||10639===e||10640===e||10641===e||10642===e||10643===e||10644===e||10645===e||10646===e||10647===e||10648===e||e>=10649&&e<=10711||10712===e||10713===e||10714===e||10715===e||e>=10716&&e<=10747||10748===e||10749===e||e>=10750&&e<=11007||e>=11008&&e<=11055||e>=11056&&e<=11076||e>=11077&&e<=11078||e>=11079&&e<=11084||e>=11085&&e<=11123||e>=11124&&e<=11125||e>=11126&&e<=11157||11158===e||e>=11159&&e<=11263||e>=11776&&e<=11777||11778===e||11779===e||11780===e||11781===e||e>=11782&&e<=11784||11785===e||11786===e||11787===e||11788===e||11789===e||e>=11790&&e<=11798||11799===e||e>=11800&&e<=11801||11802===e||11803===e||11804===e||11805===e||e>=11806&&e<=11807||11808===e||11809===e||11810===e||11811===e||11812===e||11813===e||11814===e||11815===e||11816===e||11817===e||e>=11818&&e<=11822||11823===e||e>=11824&&e<=11833||e>=11834&&e<=11835||e>=11836&&e<=11839||11840===e||11841===e||11842===e||e>=11843&&e<=11855||e>=11856&&e<=11857||11858===e||e>=11859&&e<=11903||e>=12289&&e<=12291||12296===e||12297===e||12298===e||12299===e||12300===e||12301===e||12302===e||12303===e||12304===e||12305===e||e>=12306&&e<=12307||12308===e||12309===e||12310===e||12311===e||12312===e||12313===e||12314===e||12315===e||12316===e||12317===e||e>=12318&&e<=12319||12320===e||12336===e||64830===e||64831===e||e>=65093&&e<=65094}function jt(e){e.forEach((function(e){if(delete e.location,Ye(e)||Ze(e))for(var t in e.options)delete e.options[t].location,jt(e.options[t].value);else Xe(e)&&Qe(e.style)||(We(e)||Ke(e))&&et(e.style)?delete e.style.location:Je(e)&&jt(e.children)}))}function zt(e,t){void 0===t&&(t={}),t=i({shouldParseSkeletons:!0,requiresOtherClause:!0},t);var r=new Rt(e,t).parse();if(r.err){var n=SyntaxError(Le[r.err.kind]);throw n.location=r.err.location,n.originalMessage=r.err.message,n}return(null==t?void 0:t.captureLocation)||jt(r.val),r.val}function Ft(e,t){var r=t&&t.cache?t.cache:Jt,i=t&&t.serializer?t.serializer:Yt;return(t&&t.strategy?t.strategy:Kt)(e,{cache:r,serializer:i})}function Vt(e,t,r,i){var n,o=null==(n=i)||"number"==typeof n||"boolean"==typeof n?i:r(i),a=t.get(o);return void 0===a&&(a=e.call(this,i),t.set(o,a)),a}function Xt(e,t,r){var i=Array.prototype.slice.call(arguments,3),n=r(i),o=t.get(n);return void 0===o&&(o=e.apply(this,i),t.set(n,o)),o}function Wt(e,t,r,i,n){return r.bind(t,e,i,n)}function Kt(e,t){return Wt(e,this,1===e.length?Vt:Xt,t.cache.create(),t.serializer)}var Yt=function(){return JSON.stringify(arguments)};function Zt(){this.cache=Object.create(null)}Zt.prototype.get=function(e){return this.cache[e]},Zt.prototype.set=function(e,t){this.cache[e]=t};var qt,Jt={create:function(){return new Zt}},Qt={variadic:function(e,t){return Wt(e,this,Xt,t.cache.create(),t.serializer)},monadic:function(e,t){return Wt(e,this,Vt,t.cache.create(),t.serializer)}};!function(e){e.MISSING_VALUE="MISSING_VALUE",e.INVALID_VALUE="INVALID_VALUE",e.MISSING_INTL_API="MISSING_INTL_API"}(qt||(qt={}));var er,tr=function(e){function t(t,r,i){var n=e.call(this,t)||this;return n.code=r,n.originalMessage=i,n}return r(t,e),t.prototype.toString=function(){return"[formatjs Error: ".concat(this.code,"] ").concat(this.message)},t}(Error),rr=function(e){function t(t,r,i,n){return e.call(this,'Invalid values for "'.concat(t,'": "').concat(r,'". Options are "').concat(Object.keys(i).join('", "'),'"'),qt.INVALID_VALUE,n)||this}return r(t,e),t}(tr),ir=function(e){function t(t,r,i){return e.call(this,'Value for "'.concat(t,'" must be of type ').concat(r),qt.INVALID_VALUE,i)||this}return r(t,e),t}(tr),nr=function(e){function t(t,r){return e.call(this,'The intl string context variable "'.concat(t,'" was not provided to the string "').concat(r,'"'),qt.MISSING_VALUE,r)||this}return r(t,e),t}(tr);function or(e){return"function"==typeof e}function ar(e,t,r,i,n,o,a){if(1===e.length&&Fe(e[0]))return[{type:er.literal,value:e[0].value}];for(var s=[],l=0,h=e;l<h.length;l++){var c=h[l];if(Fe(c))s.push({type:er.literal,value:c.value});else if(qe(c))"number"==typeof o&&s.push({type:er.literal,value:r.getNumberFormat(t).format(o)});else{var u=c.value;if(!n||!(u in n))throw new nr(u,a);var d=n[u];if(Ve(c))d&&"string"!=typeof d&&"number"!=typeof d||(d="string"==typeof d||"number"==typeof d?String(d):""),s.push({type:"string"==typeof d?er.literal:er.object,value:d});else if(We(c)){var p="string"==typeof c.style?i.date[c.style]:et(c.style)?c.style.parsedOptions:void 0;s.push({type:er.literal,value:r.getDateTimeFormat(t,p).format(d)})}else if(Ke(c)){p="string"==typeof c.style?i.time[c.style]:et(c.style)?c.style.parsedOptions:i.time.medium;s.push({type:er.literal,value:r.getDateTimeFormat(t,p).format(d)})}else if(Xe(c)){(p="string"==typeof c.style?i.number[c.style]:Qe(c.style)?c.style.parsedOptions:void 0)&&p.scale&&(d*=p.scale||1),s.push({type:er.literal,value:r.getNumberFormat(t,p).format(d)})}else{if(Je(c)){var m=c.children,g=c.value,f=n[g];if(!or(f))throw new ir(g,"function",a);var b=f(ar(m,t,r,i,n,o).map((function(e){return e.value})));Array.isArray(b)||(b=[b]),s.push.apply(s,b.map((function(e){return{type:"string"==typeof e?er.literal:er.object,value:e}})))}if(Ye(c)){if(!(v=c.options[d]||c.options.other))throw new rr(c.value,d,Object.keys(c.options),a);s.push.apply(s,ar(v.value,t,r,i,n))}else if(Ze(c)){var v;if(!(v=c.options["=".concat(d)])){if(!Intl.PluralRules)throw new tr('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n',qt.MISSING_INTL_API,a);var y=r.getPluralRules(t,{type:c.pluralType}).select(d-(c.offset||0));v=c.options[y]||c.options.other}if(!v)throw new rr(c.value,d,Object.keys(c.options),a);s.push.apply(s,ar(v.value,t,r,i,n,d-(c.offset||0)))}else;}}}return function(e){return e.length<2?e:e.reduce((function(e,t){var r=e[e.length-1];return r&&r.type===er.literal&&t.type===er.literal?r.value+=t.value:e.push(t),e}),[])}(s)}function sr(e,t){return t?Object.keys(e).reduce((function(r,n){var o,a;return r[n]=(o=e[n],(a=t[n])?i(i(i({},o||{}),a||{}),Object.keys(o).reduce((function(e,t){return e[t]=i(i({},o[t]),a[t]||{}),e}),{})):o),r}),i({},e)):e}function lr(e){return{create:function(){return{get:function(t){return e[t]},set:function(t,r){e[t]=r}}}}}!function(e){e[e.literal=0]="literal",e[e.object=1]="object"}(er||(er={}));var hr=function(){function e(t,r,n,a){var s,l=this;if(void 0===r&&(r=e.defaultLocale),this.formatterCache={number:{},dateTime:{},pluralRules:{}},this.format=function(e){var t=l.formatToParts(e);if(1===t.length)return t[0].value;var r=t.reduce((function(e,t){return e.length&&t.type===er.literal&&"string"==typeof e[e.length-1]?e[e.length-1]+=t.value:e.push(t.value),e}),[]);return r.length<=1?r[0]||"":r},this.formatToParts=function(e){return ar(l.ast,l.locales,l.formatters,l.formats,e,void 0,l.message)},this.resolvedOptions=function(){var e;return{locale:(null===(e=l.resolvedLocale)||void 0===e?void 0:e.toString())||Intl.NumberFormat.supportedLocalesOf(l.locales)[0]}},this.getAst=function(){return l.ast},this.locales=r,this.resolvedLocale=e.resolveLocale(r),"string"==typeof t){if(this.message=t,!e.__parse)throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");var h=a||{};h.formatters;var c=function(e,t){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(r[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(i=Object.getOwnPropertySymbols(e);n<i.length;n++)t.indexOf(i[n])<0&&Object.prototype.propertyIsEnumerable.call(e,i[n])&&(r[i[n]]=e[i[n]])}return r}(h,["formatters"]);this.ast=e.__parse(t,i(i({},c),{locale:this.resolvedLocale}))}else this.ast=t;if(!Array.isArray(this.ast))throw new TypeError("A message must be provided as a String or AST.");this.formats=sr(e.formats,n),this.formatters=a&&a.formatters||(void 0===(s=this.formatterCache)&&(s={number:{},dateTime:{},pluralRules:{}}),{getNumberFormat:Ft((function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new((e=Intl.NumberFormat).bind.apply(e,o([void 0],t,!1)))}),{cache:lr(s.number),strategy:Qt.variadic}),getDateTimeFormat:Ft((function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new((e=Intl.DateTimeFormat).bind.apply(e,o([void 0],t,!1)))}),{cache:lr(s.dateTime),strategy:Qt.variadic}),getPluralRules:Ft((function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new((e=Intl.PluralRules).bind.apply(e,o([void 0],t,!1)))}),{cache:lr(s.pluralRules),strategy:Qt.variadic})})}return Object.defineProperty(e,"defaultLocale",{get:function(){return e.memoizedDefaultLocale||(e.memoizedDefaultLocale=(new Intl.NumberFormat).resolvedOptions().locale),e.memoizedDefaultLocale},enumerable:!1,configurable:!0}),e.memoizedDefaultLocale=null,e.resolveLocale=function(e){if(void 0!==Intl.Locale){var t=Intl.NumberFormat.supportedLocalesOf(e);return t.length>0?new Intl.Locale(t[0]):new Intl.Locale("string"==typeof e?e:e[0])}},e.__parse=zt,e.formats={number:{integer:{maximumFractionDigits:0},currency:{style:"currency"},percent:{style:"percent"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}},e}(),cr=hr;const ur={en:ke,nl:ze};function dr(e,t,...r){const i=t.replace(/['"]+/g,"");let n;try{n=e.split(".").reduce(((e,t)=>e[t]),ur[i])}catch(t){n=e.split(".").reduce(((e,t)=>e[t]),ur.en)}if(void 0===n&&(n=e.split(".").reduce(((e,t)=>e[t]),ur.en)),!r.length)return n;const o={};for(let e=0;e<r.length;e+=2){let t=r[e];t=t.replace(/^{([^}]+)?}$/,"$1"),o[t]=r[e+1]}try{return new cr(n,t).format(o)}catch(e){return"Translation "+e}}let pr=class extends(Se(he)){constructor(){super(...arguments),this.probes=[],this.presets=[]}firstUpdated(){(async()=>{await Ee()})()}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage((()=>this._fetchData()),{type:_e+"_config_updated"})]}async _fetchData(){var e;this.hass&&(this.config=await Te(this.hass),this.probes=await(e=this.hass,e.callWS({type:_e+"/probes"})),this.presets=await(e=>e.callWS({type:_e+"/presets"}))(this.hass))}handleAddProbe(){const e={probe_id:this.probes.length,probe_name:this.nameInput.value,probe_source:this.sourceInput.value,probe_preset:void 0};this.probes=[...this.probes,e],this.saveToHA(e)}handleEditProbe(e,t){this.hass&&(this.probes=Object.values(this.probes).map(((r,i)=>i===e?t:r)),this.saveToHA(t))}handleRemoveProbe(e,t){if(!this.hass)return;const r=Object.values(this.probes).at(t);var i,n;r&&(this.probes=this.probes.filter(((e,r)=>r!==t)),this.hass&&(i=this.hass,n=r.probe_id.toString(),i.callApi("POST",_e+"/probes",{id:n,remove:!0})))}saveToHA(e){var t,r;this.hass&&(t=this.hass,r=e,console.log(r),t.callApi("POST",_e+"/probes",r))}renderTheOptions(e,t){if(this.hass){let r=z`<option value="" ?selected=${void 0===t}">---${dr("common.labels.select",this.hass.language)}---</option>`;return Object.entries(e).map((([e,i])=>{return r=z`${r}
            <option
              value="${i.preset_id}"
              ?selected="${t===i.preset_id}"
            >
              ${i.preset_name}
              (${n=this.hass,o=i.preset_target_temperature,"°F"==Pe(n)?Math.round(1.8*o+32):o}
              ${Pe(this.hass)})
            </option>`;var n,o})),r}return z``}renderProbe(e,t){return this.hass?z`
        <ha-card header="${e.probe_name}">
          <div class="card-content">
          </div>
          <div class="card-content">
          </div>
          <div class="card-content">
          </div>
          <div class="card-content">
            <label for="probe_name${t}"
              >${dr("panels.probes.labels.name",this.hass.language)}:</label
            >
            <input
              id="probe_name${t}"
              type="text"
              .value="${e.probe_name}"
              @input="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[Ae]:r.target.value}))}"
            />
            <div class="probeline">
              <label for="probe_source${t}"
                >${dr("panels.probes.labels.source",this.hass.language)}:</label
              >
              <input id="probe_source${t}" type="text""
              .value="${e.probe_source}"
              @input="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[we]:r.target.value}))}"
              />
            </div>
            <div class="probeline">
            <label for="probe_preset${t}">${dr("panels.probes.labels.preset",this.hass.language)}:</label>
            <select
            id="probe_preset${t}"
            @change="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[He]:parseInt(r.target.value)}))}"
          >
            ${this.renderTheOptions(this.presets,e.probe_preset)}
          </select>
            </div>
        </ha-card>
      `:z``}render(){return this.hass&&this.config?z`
        <ha-card header="${dr("panels.probes.title",this.hass.language)}">
          <div class="card-content">
            ${dr("panels.probes.description",this.hass.language)}
          </div>
        </ha-card>
          <ha-card header="${dr("panels.probes.cards.add-probe.header",this.hass.language)}">
            <div class="card-content">
              <div class="probeline"><label for="nameInput">${dr("panels.probes.labels.name",this.hass.language)}:</label>
              <input id="nameInput" type="text"/>
              </div>
              <div class="probeline">
              <label for="sourceInput">${dr("panels.probes.labels.source",this.hass.language)}:</label>
              <input id="sourceInput" type="text"/>
              </div>

              <div class="probeline">
              <button @click="${this.handleAddProbe}">${dr("panels.probes.cards.add-probe.actions.add",this.hass.language)}</button>
              </div>
              </ha-card>
            <ha-card>
          ${Object.entries(this.probes).map((([e,t])=>this.renderProbe(t,parseInt(e))))}
        </ha-card>
      `:z``}static get styles(){return u`
      ${$e}
      .probe {
        margin-top: 25px;
        margin-bottom: 25px;
      }
      .hidden {
        display: none;
      }
      .shortinput {
        width: 50px;
      }
      .probeline {
        margin-left: 20px;
        margin-top: 5px;
      }
    `}};n([me()],pr.prototype,"config",void 0),n([me({type:Array})],pr.prototype,"probes",void 0),n([me({type:Array})],pr.prototype,"presets",void 0),n([ge("#nameInput")],pr.prototype,"nameInput",void 0),n([ge("#sourceInput")],pr.prototype,"sourceInput",void 0),pr=n([ue("grill-buddy-view-probes")],pr);const mr=()=>{const e=e=>{let t={};for(let r=0;r<e.length;r+=2){const i=e[r],n=r<e.length?e[r+1]:void 0;t=Object.assign(Object.assign({},t),{[i]:n})}return t},t=window.location.pathname.split("/");let r={page:t[2]||"general",params:{}};if(t.length>3){let i=t.slice(3);if(t.includes("filter")){const t=i.findIndex((e=>"filter"==e)),n=i.slice(t+1);i=i.slice(0,t),r=Object.assign(Object.assign({},r),{filter:e(n)})}i.length&&(i.length%2&&(r=Object.assign(Object.assign({},r),{subpage:i.shift()})),i.length&&(r=Object.assign(Object.assign({},r),{params:e(i)})))}return r};e.GrillBuddyPanel=class extends he{async firstUpdated(){window.addEventListener("location-changed",(()=>{window.location.pathname.includes("grill-buddy")&&this.requestUpdate()})),await Ee(),this.requestUpdate()}render(){if(!customElements.get("ha-panel-config"))return z` loading... `;const e=mr();return z`
      <div class="header">
        <div class="toolbar">
          <ha-menu-button
            .hass=${this.hass}
            .narrow=${this.narrow}
          ></ha-menu-button>
          <div class="main-title">${dr("title",this.hass.language)}</div>
          <div class="version">${"v2024.4.0"}</div>
        </div>

        <ha-tabs
          scrollable
          attr-for-selected="page-name"
          .selected=${e.page}
          @iron-activate=${this.handlePageSelected}
        >
          <paper-tab page-name="general">
            ${dr("panels.general.title",this.hass.language)}
          </paper-tab>
          <paper-tab page-name="probes">
            ${dr("panels.probes.title",this.hass.language)}
          </paper-tab>
          <paper-tab page-name="help"
            >${dr("panels.help.title",this.hass.language)}</paper-tab
          >
        </ha-tabs>
      </div>
      <div class="view">${this.getView(e)}</div>
    `}getView(e){switch(e.page){case"general":return z`
          <grill-buddy-view-general
            .hass=${this.hass}
            .narrow=${this.narrow}
            .path=${e}
          ></grill-buddy-view-general>
        `;case"probes":return z`
          <grill-buddy-view-probes
            .hass=${this.hass}
            .narrow=${this.narrow}
            .path=${e}
          ></grill-buddy-view-probes>
        `;case"help":return z`<ha-card
          header="${dr("panels.help.cards.how-to-get-help.title",this.hass.language)}"
        >
          <div class="card-content">
            ${dr("panels.help.cards.how-to-get-help.first-read-the",this.hass.language)}
            <a href="https://github.com/jeroenterheerdt/grill_buddy/wiki"
              >${dr("panels.help.cards.how-to-get-help.wiki",this.hass.language)}</a
            >.
            ${dr("panels.help.cards.how-to-get-help.if-you-still-need-help",this.hass.language)}
            ${dr("panels.help.cards.how-to-get-help.or-open-a",this.hass.language)}
            <a href="https://github.com/jeroenterheerdt/grill_buddy/issues"
              >${dr("panels.help.cards.how-to-get-help.github-issue",this.hass.language)}</a
            >
            (${dr("panels.help.cards.how-to-get-help.english-only",this.hass.language)}).
          </div></ha-card
        >`;default:return z`
          <ha-card header="Page not found">
            <div class="card-content">
              The page you are trying to reach cannot be found. Please select a
              page from the menu above to continue.
            </div>
          </ha-card>
        `}}handlePageSelected(e){const t=e.detail.item.getAttribute("page-name");t!==mr().page?(!function(e,t,r){void 0===r&&(r=!1),r?history.replaceState(null,"",t):history.pushState(null,"",t),ye(window,"location-changed",{replace:r})}(0,((e,...t)=>{let r={page:e,params:{}};t.forEach((e=>{"string"==typeof e?r=Object.assign(Object.assign({},r),{subpage:e}):"params"in e?r=Object.assign(Object.assign({},r),{params:e.params}):"filter"in e&&(r=Object.assign(Object.assign({},r),{filter:e.filter}))}));const i=e=>{let t=Object.keys(e);t=t.filter((t=>e[t])),t.sort();let r="";return t.forEach((t=>{const i=e[t];r=r.length?`${r}/${t}/${i}`:`${t}/${i}`})),r};let n=`/${_e}/${r.page}`;return r.subpage&&(n=`${n}/${r.subpage}`),i(r.params).length&&(n=`${n}/${i(r.params)}`),r.filter&&(n=`${n}/filter/${i(r.filter)}`),n})(t)),this.requestUpdate()):scrollTo(0,0)}static get styles(){return u`
      ${$e} :host {
        color: var(--primary-text-color);
        --paper-card-header-color: var(--primary-text-color);
      }
      .header {
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color, white);
        border-bottom: var(--app-header-border-bottom, none);
      }
      .toolbar {
        height: var(--header-height);
        display: flex;
        align-items: center;
        font-size: 20px;
        padding: 0 16px;
        font-weight: 400;
        box-sizing: border-box;
      }
      .main-title {
        margin: 0 0 0 24px;
        line-height: 20px;
        flex-grow: 1;
      }
      ha-tabs {
        margin-left: max(env(safe-area-inset-left), 24px);
        margin-right: max(env(safe-area-inset-right), 24px);
        --paper-tabs-selection-bar-color: var(
          --app-header-selection-bar-color,
          var(--app-header-text-color, #fff)
        );
        text-transform: uppercase;
      }

      .view {
        height: calc(100vh - 112px);
        display: flex;
        justify-content: center;
      }

      .view > * {
        width: 600px;
        max-width: 600px;
      }

      .view > *:last-child {
        margin-bottom: 20px;
      }

      .version {
        font-size: 14px;
        font-weight: 500;
        color: rgba(var(--rgb-text-primary-color), 0.9);
      }
    `}},n([me()],e.GrillBuddyPanel.prototype,"hass",void 0),n([me({type:Boolean,reflect:!0})],e.GrillBuddyPanel.prototype,"narrow",void 0),e.GrillBuddyPanel=n([ue("grill-buddy")],e.GrillBuddyPanel);let gr=class extends he{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?z`
      <ha-dialog
        open
        .heading=${!0}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
      >
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button
              slot="navigationIcon"
              dialogAction="cancel"
              .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
            ></ha-icon-button>
            <span slot="title">
              ${this.hass.localize("state_badge.default.error")}
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">${this._params.error||""}</div>

        <mwc-button
          slot="primaryAction"
          style="float: left"
          @click=${this.closeDialog}
          dialogAction="close"
        >
          ${this.hass.localize("ui.dialogs.generic.ok")}
        </mwc-button>
      </ha-dialog>
    `:z``}static get styles(){return u`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};n([me({attribute:!1})],gr.prototype,"hass",void 0),n([function(e){return me({...e,state:!0})}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */()],gr.prototype,"_params",void 0),gr=n([ue("error-dialog")],gr);var fr=Object.freeze({__proto__:null,get ErrorDialog(){return gr}});Object.defineProperty(e,"__esModule",{value:!0})}({});
