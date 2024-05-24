!function(e){"use strict";var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},t(e,r)};function r(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function i(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}var i=function(){return i=Object.assign||function(e){for(var t,r=1,i=arguments.length;r<i;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},i.apply(this,arguments)};function s(e,t,r,i){var s,n=arguments.length,o=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(n<3?s(o):n>3?s(t,r,o):s(t,r))||o);return n>3&&o&&Object.defineProperty(t,r,o),o}function n(e,t,r){if(r||2===arguments.length)for(var i,s=0,n=t.length;s<n;s++)!i&&s in t||(i||(i=Array.prototype.slice.call(t,0,s)),i[s]=t[s]);return e.concat(i||Array.prototype.slice.call(t))}"function"==typeof SuppressedError&&SuppressedError;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const o=window,a=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,l=Symbol(),h=new WeakMap;class c{constructor(e,t,r){if(this._$cssResult$=!0,r!==l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(a&&void 0===e){const r=void 0!==t&&1===t.length;r&&(e=h.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&h.set(t,e))}return e}toString(){return this.cssText}}const u=(e,...t)=>{const r=1===e.length?e[0]:t.reduce(((t,r,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[i+1]),e[0]);return new c(r,e,l)},p=a?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return(e=>new c("string"==typeof e?e:e+"",void 0,l))(t)})(e):e
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var d;const m=window,f=m.trustedTypes,g=f?f.emptyScript:"",b=m.reactiveElementPolyfillSupport,v={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch(e){r=null}}return r}},_=(e,t)=>t!==e&&(t==t||e==e),y={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:_},E="finalized";class A extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,r)=>{const i=this._$Ep(r,t);void 0!==i&&(this._$Ev.set(i,r),e.push(i))})),e}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const r="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,r,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(i){const s=this[e];this[t]=i,this.requestUpdate(e,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||y}static finalize(){if(this.hasOwnProperty(E))return!1;this[E]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const r of t)this.createProperty(r,e[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const e of r)t.unshift(p(e))}else void 0!==e&&t.push(p(e));return t}static _$Ep(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,r;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(r=e.hostConnected)||void 0===r||r.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{a?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const r=document.createElement("style"),i=o.litNonce;void 0!==i&&r.setAttribute("nonce",i),r.textContent=t.cssText,e.appendChild(r)}))})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$EO(e,t,r=y){var i;const s=this.constructor._$Ep(e,r);if(void 0!==s&&!0===r.reflect){const n=(void 0!==(null===(i=r.converter)||void 0===i?void 0:i.toAttribute)?r.converter:v).toAttribute(t,r.type);this._$El=e,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$El=null}}_$AK(e,t){var r;const i=this.constructor,s=i._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=i.getPropertyOptions(s),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(r=e.converter)||void 0===r?void 0:r.fromAttribute)?e.converter:v;this._$El=s,this[s]=n.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,r){let i=!0;void 0!==e&&(((r=r||this.constructor.getPropertyOptions(e)).hasChanged||_)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===r.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,r))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(r)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(r)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var w;A[E]=!0,A.elementProperties=new Map,A.elementStyles=[],A.shadowRootOptions={mode:"open"},null==b||b({ReactiveElement:A}),(null!==(d=m.reactiveElementVersions)&&void 0!==d?d:m.reactiveElementVersions=[]).push("1.6.3");const H=window,$=H.trustedTypes,T=$?$.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",B=`lit$${(Math.random()+"").slice(9)}$`,P="?"+B,L=`<${P}>`,O=document,C=()=>O.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,R="[ \t\n\f\r]",x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,U=/>/g,k=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,G=/"/g,j=/^(?:script|style|textarea|title)$/i,F=(e=>(t,...r)=>({_$litType$:e,strings:t,values:r}))(1),V=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),X=new WeakMap,z=O.createTreeWalker(O,129,null,!1);function W(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(t):t}const Z=(e,t)=>{const r=e.length-1,i=[];let s,n=2===t?"<svg>":"",o=x;for(let t=0;t<r;t++){const r=e[t];let a,l,h=-1,c=0;for(;c<r.length&&(o.lastIndex=c,l=o.exec(r),null!==l);)c=o.lastIndex,o===x?"!--"===l[1]?o=M:void 0!==l[1]?o=U:void 0!==l[2]?(j.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=k):void 0!==l[3]&&(o=k):o===k?">"===l[0]?(o=null!=s?s:x,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?k:'"'===l[3]?G:D):o===G||o===D?o=k:o===M||o===U?o=x:(o=k,s=void 0);const u=o===k&&e[t+1].startsWith("/>")?" ":"";n+=o===x?r+L:h>=0?(i.push(a),r.slice(0,h)+S+r.slice(h)+B+u):r+B+(-2===h?(i.push(void 0),t):u)}return[W(e,n+(e[r]||"<?>")+(2===t?"</svg>":"")),i]};class Y{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let s=0,n=0;const o=e.length-1,a=this.parts,[l,h]=Z(e,t);if(this.el=Y.createElement(l,r),z.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(i=z.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes()){const e=[];for(const t of i.getAttributeNames())if(t.endsWith(S)||t.startsWith(B)){const r=h[n++];if(e.push(t),void 0!==r){const e=i.getAttribute(r.toLowerCase()+S).split(B),t=/([.?@])?(.*)/.exec(r);a.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?te:"?"===t[1]?ie:"@"===t[1]?se:ee})}else a.push({type:6,index:s})}for(const t of e)i.removeAttribute(t)}if(j.test(i.tagName)){const e=i.textContent.split(B),t=e.length-1;if(t>0){i.textContent=$?$.emptyScript:"";for(let r=0;r<t;r++)i.append(e[r],C()),z.nextNode(),a.push({type:2,index:++s});i.append(e[t],C())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=i.data.indexOf(B,e+1));)a.push({type:7,index:s}),e+=B.length-1}s++}}static createElement(e,t){const r=O.createElement("template");return r.innerHTML=e,r}}function q(e,t,r=e,i){var s,n,o,a;if(t===V)return t;let l=void 0!==i?null===(s=r._$Co)||void 0===s?void 0:s[i]:r._$Cl;const h=N(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===h?l=void 0:(l=new h(e),l._$AT(e,r,i)),void 0!==i?(null!==(o=(a=r)._$Co)&&void 0!==o?o:a._$Co=[])[i]=l:r._$Cl=l),void 0!==l&&(t=q(e,l._$AS(e,t.values),l,i)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:r},parts:i}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:O).importNode(r,!0);z.currentNode=s;let n=z.nextNode(),o=0,a=0,l=i[0];for(;void 0!==l;){if(o===l.index){let t;2===l.type?t=new Q(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new ne(n,this,e)),this._$AV.push(t),l=i[++a]}o!==(null==l?void 0:l.index)&&(n=z.nextNode(),o++)}return z.currentNode=O,s}v(e){let t=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class Q{constructor(e,t,r,i){var s;this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cp=null===(s=null==i?void 0:i.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=q(this,e,t),N(e)?e===K||null==e||""===e?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>I(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==K&&N(this._$AH)?this._$AA.nextSibling.data=e:this.$(O.createTextNode(e)),this._$AH=e}g(e){var t;const{values:r,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Y.createElement(W(i.h,i.h[0]),this.options)),i);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.v(r);else{const e=new J(s,this),t=e.u(this.options);e.v(r),this.$(t),this._$AH=e}}_$AC(e){let t=X.get(e.strings);return void 0===t&&X.set(e.strings,t=new Y(e)),t}T(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,i=0;for(const s of e)i===t.length?t.push(r=new Q(this.k(C()),this.k(C()),this,this.options)):r=t[i],r._$AI(s),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var r;for(null===(r=this._$AP)||void 0===r||r.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class ee{constructor(e,t,r,i,s){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=K}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,r,i){const s=this.strings;let n=!1;if(void 0===s)e=q(this,e,t,0),n=!N(e)||e!==this._$AH&&e!==V,n&&(this._$AH=e);else{const i=e;let o,a;for(e=s[0],o=0;o<s.length-1;o++)a=q(this,i[r+o],t,o),a===V&&(a=this._$AH[o]),n||(n=!N(a)||a!==this._$AH[o]),a===K?e=K:e!==K&&(e+=(null!=a?a:"")+s[o+1]),this._$AH[o]=a}n&&!i&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}}const re=$?$.emptyScript:"";class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){e&&e!==K?this.element.setAttribute(this.name,re):this.element.removeAttribute(this.name)}}class se extends ee{constructor(e,t,r,i,s){super(e,t,r,i,s),this.type=5}_$AI(e,t=this){var r;if((e=null!==(r=q(this,e,t,0))&&void 0!==r?r:K)===V)return;const i=this._$AH,s=e===K&&i!==K||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==K&&(i===K||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,r;"function"==typeof this._$AH?this._$AH.call(null!==(r=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==r?r:this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){q(this,e)}}const oe=H.litHtmlPolyfillSupport;null==oe||oe(Y,Q),(null!==(w=H.litHtmlVersions)&&void 0!==w?w:H.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var ae,le;class he extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const r=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=r.firstChild),r}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,r)=>{var i,s;const n=null!==(i=null==r?void 0:r.renderBefore)&&void 0!==i?i:t;let o=n._$litPart$;if(void 0===o){const e=null!==(s=null==r?void 0:r.renderBefore)&&void 0!==s?s:null;n._$litPart$=o=new Q(t.insertBefore(C(),e),e,void 0,null!=r?r:{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return V}}he.finalized=!0,he._$litElement$=!0,null===(ae=globalThis.litElementHydrateSupport)||void 0===ae||ae.call(globalThis,{LitElement:he});const ce=globalThis.litElementPolyfillSupport;null==ce||ce({LitElement:he}),(null!==(le=globalThis.litElementVersions)&&void 0!==le?le:globalThis.litElementVersions=[]).push("3.3.3");
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
     */,pe=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(r){r.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}},de=(e,t,r)=>{t.constructor.createProperty(r,e)};function me(e){return(t,r)=>void 0!==r?de(e,t,r):pe(e,t)
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
function fe(e,t){return(({finisher:e,descriptor:t})=>(r,i)=>{var s;if(void 0===i){const i=null!==(s=r.originalKey)&&void 0!==s?s:r.key,n=null!=t?{kind:"method",placement:"prototype",key:i,descriptor:t(r.key)}:{...r,key:i};return null!=e&&(n.finisher=function(t){e(t,i)}),n}{const s=r.constructor;void 0!==t&&Object.defineProperty(r,i,t(i)),null==e||e(s,i)}})({descriptor:r=>{const i={get(){var t,r;return null!==(r=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==r?r:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof r?Symbol():"__"+r;i.get=function(){var r,i;return void 0===this[t]&&(this[t]=null!==(i=null===(r=this.renderRoot)||void 0===r?void 0:r.querySelector(e))&&void 0!==i?i:null),this[t]}}return i}})}
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var ge,be,ve;null===(ge=window.HTMLSlotElement)||void 0===ge||ge.prototype.assignedElements,function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(be||(be={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(ve||(ve={}));var _e=function(e,t,r,i){i=i||{},r=null==r?{}:r;var s=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return s.detail=r,e.dispatchEvent(s),s};const ye=async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load()},Ee="grill_buddy",Ae="probe_name",we="probe_source",He="probe_preset",$e="probe_lower_bound",Te="probe_upper_bound",Se="probe_state_update_setting",Be="probe_source_type",Pe="source_type_preset",Le="probe_target_temperature",Oe="metric",Ce=e=>e.callWS({type:Ee+"/config"}),Ne=e=>{class t extends e{connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then((e=>e())):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return[]}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}}return s([me({attribute:!1})],t.prototype,"hass",void 0),t};function Ie(e,t){!function(e,t){const r=e;_e(r,"show-dialog",{dialogTag:"error-dialog",dialogImport:()=>Promise.resolve().then((function(){return Or})),dialogParams:{error:t}})}(t,F`
    ${e.error}:${e.body.message?F` ${e.body.message} `:""}
  `)}function Re(e){return e.units==Oe?"°C":"°F"}const xe=u`
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
`;let Me=class extends(Ne(he)){hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage((()=>this._fetchData()),{type:Ee+"_config_updated"})]}async _fetchData(){this.hass&&(this.config=await Ce(this.hass),this.data=this.config)}firstUpdated(){(async()=>{await ye()})()}render(){return this.hass&&this.config&&this.data?F`<h1>Barf</h1>`:F``}saveData(e){var t,r;this.hass&&this.data&&(this.data=Object.assign(Object.assign({},this.data),e),(t=this.hass,r=this.data,t.callApi("POST",Ee+"/config",r)).catch((e=>Ie(e,this.shadowRoot.querySelector("ha-card")))).then())}toggleInformation(e){var t;const r=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#"+e);r&&("hidden"!=r.className?r.className="hidden":r.className="information")}static get styles(){return u`
      ${xe}
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
    `}};s([me()],Me.prototype,"narrow",void 0),s([me()],Me.prototype,"path",void 0),s([me()],Me.prototype,"data",void 0),s([me()],Me.prototype,"config",void 0),Me=s([ue("grill-buddy-view-general")],Me);
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const Ue=2;class ke{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */class De extends ke{constructor(e){if(super(e),this.et=K,e.type!==Ue)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===K||null==e)return this.ft=void 0,this.et=e;if(e===V)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.ft;this.et=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}De.directiveName="unsafeHTML",De.resultType=1;const Ge=(e=>(...t)=>({_$litDirective$:e,values:t}))(De);var je,Fe,Ve,Ke={actions:{delete:"Delete"},labels:{select:"Select"}},Xe={probes:{title:"Probes",description:"Set up your probes here",labels:{name:"Name",source:"Source",preset:"Preset",state_update_setting:"Goal",upper_bound:"Upper threshold",lower_bound:"Lower threshold",sourcetype:"Get target temperature from",sourcetypes:{preset:"Preset",value:"Custom value"},value:"Target temperature"},errors:{invalid_source:"Invalid source",source_does_not_exist:"Source does not exist. Please enter a valid source, such as 'sensor.mysensor'."},cards:{"add-probe":{header:"Add probe",actions:{add:"Add"}}}},help:{title:"Help",cards:{"how-to-get-help":{title:"How to get help","first-read-the":"First, read the",readme:"Readme","if-you-still-need-help":"If you still need help reach out on the","community-forum":"Community forum","or-open-a":"or open a","github-issue":"Github Issue","english-only":"English only"}}}},ze="Grill Buddy",We={presets:{beef_rare:"Beef (rare)",beef_medium_rare:"Beef (medium rare)",beef_medium:"Beef (medium)",beef_medium_well:"Beef (medium well)",beef_well_done:"Beef (well done)",fish:"Fish",ground_beef:"Ground Beef",ground_poultry:"Ground Poultry",lamb_rare:"Lamb (rare)",lamb_medium_rare:"Lamb (medium rare)",lamb_medium:"Lamb (medium)",lamb_medium_well:"Lamb (medium well)",lamb_well_done:"Lamb (well done)",pork_medium:"Pork (medium)",pork_medium_well:"Pork (medium well)",pork_well_done:"Pork (well done)",poultry:"Poultry",turkey:"Turkey",veal_rare:"Veal (rare)",veal_medium_rare:"Veal (medium rare)",veal_medium:"Veal (medium)",veal_medium_well:"Veal (medium well)",veal_well_done:"Veal (well done)"}},Ze={at_target_temperature:"At target temperature",within_bounds:"Temperature within range",outside_bounds:"Temperature outside range",above_upper_bound:"Temperature above upper threshold",below_lower_bound:"Temperature below lower threshold"},Ye={common:Ke,panels:Xe,title:ze,defaults:We,state_update_settings:Ze},qe=Object.freeze({__proto__:null,common:Ke,panels:Xe,title:ze,defaults:We,state_update_settings:Ze,default:Ye}),Je={actions:{delete:"Verwijderen"},labels:{select:"Kies"}},Qe={probes:{title:"Thermometers",description:"Stel je thermometers hier in",labels:{name:"Naam",source:"Bron",preset:"Instelling",state_update_setting:"Doel",upper_bound:"Minimum",lower_bound:"Maximum",sourcetype:"Stel doeltemperatuur in met",sourcetypes:{preset:"Instelling",value:"Eigen waarde"},value:"Doeltemperatuur"},errors:{invalid_source:"Bron bestaat niet",source_does_not_exist:"De bron bestaat niet. Vul een bestaande bron in, zoals bijvoorbeeld 'sensor.mysensor'."},cards:{"add-probe":{header:"Voeg thermometer toe",actions:{add:"Voeg toe"}}}},help:{title:"Hulp",cards:{"how-to-get-help":{title:"Hulp vragen","first-read-the":"Allereerst, lees de",readme:"Readme","if-you-still-need-help":"Als je hierna nog steeds hulp nodig hebt, laat een bericht achter op het","community-forum":"Community forum","or-open-a":"of open een","github-issue":"Github Issue","english-only":"alleen Engels"}}}},et="Grill Buddy",tt={presets:{beef_rare:"Rundvlees (rare)",beef_medium_rare:"Rundvlees (medium rare)",beef_medium:"Rundvlees (medium)",beef_medium_well:"Rundvlees (medium well)",beef_well_done:"Rundvlees (well done)",fish:"Vis",ground_beef:"Rundvleesgehakt",ground_poultry:"Gevogeltegehakt",lamb_rare:"Lamsvlees (rare)",lamb_medium_rare:"Lamvlees (medium rare)",lamb_medium:"Lamsvlees (medium)",lamb_medium_well:"Lamsvlees (medium well)",lamb_well_done:"Lamsvlees (well done)",pork_medium:"Varkensvlees (medium)",pork_medium_well:"Varkensvlees (medium well)",pork_well_done:"Varkensvlees (well done)",poultry:"Gevogelte",turkey:"Kalkoen",veal_rare:"Kalfsvlees (rare)",veal_medium_rare:"Kalfsvlees (medium rare)",veal_medium:"Kalfsvlees (medium)",veal_medium_well:"Kalfsvlees (medium well)",veal_well_done:"Kalfsvlees (well done)"}},rt={at_target_temperature:"Temperatuur bereikt",within_bounds:"Temperatuur binnen bereik",outside_bounds:"Temperatuur buiten bereik",above_upper_bound:"Temperatuur hoger dan maximum",below_lower_bound:"Temperatuur lager dan minimum"},it={common:Je,panels:Qe,title:et,defaults:tt,state_update_settings:rt},st=Object.freeze({__proto__:null,common:Je,panels:Qe,title:et,defaults:tt,state_update_settings:rt,default:it});function nt(e){return e.type===Fe.literal}function ot(e){return e.type===Fe.argument}function at(e){return e.type===Fe.number}function lt(e){return e.type===Fe.date}function ht(e){return e.type===Fe.time}function ct(e){return e.type===Fe.select}function ut(e){return e.type===Fe.plural}function pt(e){return e.type===Fe.pound}function dt(e){return e.type===Fe.tag}function mt(e){return!(!e||"object"!=typeof e||e.type!==Ve.number)}function ft(e){return!(!e||"object"!=typeof e||e.type!==Ve.dateTime)}!function(e){e[e.EXPECT_ARGUMENT_CLOSING_BRACE=1]="EXPECT_ARGUMENT_CLOSING_BRACE",e[e.EMPTY_ARGUMENT=2]="EMPTY_ARGUMENT",e[e.MALFORMED_ARGUMENT=3]="MALFORMED_ARGUMENT",e[e.EXPECT_ARGUMENT_TYPE=4]="EXPECT_ARGUMENT_TYPE",e[e.INVALID_ARGUMENT_TYPE=5]="INVALID_ARGUMENT_TYPE",e[e.EXPECT_ARGUMENT_STYLE=6]="EXPECT_ARGUMENT_STYLE",e[e.INVALID_NUMBER_SKELETON=7]="INVALID_NUMBER_SKELETON",e[e.INVALID_DATE_TIME_SKELETON=8]="INVALID_DATE_TIME_SKELETON",e[e.EXPECT_NUMBER_SKELETON=9]="EXPECT_NUMBER_SKELETON",e[e.EXPECT_DATE_TIME_SKELETON=10]="EXPECT_DATE_TIME_SKELETON",e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE=11]="UNCLOSED_QUOTE_IN_ARGUMENT_STYLE",e[e.EXPECT_SELECT_ARGUMENT_OPTIONS=12]="EXPECT_SELECT_ARGUMENT_OPTIONS",e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE=13]="EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE",e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE=14]="INVALID_PLURAL_ARGUMENT_OFFSET_VALUE",e[e.EXPECT_SELECT_ARGUMENT_SELECTOR=15]="EXPECT_SELECT_ARGUMENT_SELECTOR",e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR=16]="EXPECT_PLURAL_ARGUMENT_SELECTOR",e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT=17]="EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT",e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT=18]="EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT",e[e.INVALID_PLURAL_ARGUMENT_SELECTOR=19]="INVALID_PLURAL_ARGUMENT_SELECTOR",e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR=20]="DUPLICATE_PLURAL_ARGUMENT_SELECTOR",e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR=21]="DUPLICATE_SELECT_ARGUMENT_SELECTOR",e[e.MISSING_OTHER_CLAUSE=22]="MISSING_OTHER_CLAUSE",e[e.INVALID_TAG=23]="INVALID_TAG",e[e.INVALID_TAG_NAME=25]="INVALID_TAG_NAME",e[e.UNMATCHED_CLOSING_TAG=26]="UNMATCHED_CLOSING_TAG",e[e.UNCLOSED_TAG=27]="UNCLOSED_TAG"}(je||(je={})),function(e){e[e.literal=0]="literal",e[e.argument=1]="argument",e[e.number=2]="number",e[e.date=3]="date",e[e.time=4]="time",e[e.select=5]="select",e[e.plural=6]="plural",e[e.pound=7]="pound",e[e.tag=8]="tag"}(Fe||(Fe={})),function(e){e[e.number=0]="number",e[e.dateTime=1]="dateTime"}(Ve||(Ve={}));var gt=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,bt=/(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;function vt(e){var t={};return e.replace(bt,(function(e){var r=e.length;switch(e[0]){case"G":t.era=4===r?"long":5===r?"narrow":"short";break;case"y":t.year=2===r?"2-digit":"numeric";break;case"Y":case"u":case"U":case"r":throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");case"q":case"Q":throw new RangeError("`q/Q` (quarter) patterns are not supported");case"M":case"L":t.month=["numeric","2-digit","short","long","narrow"][r-1];break;case"w":case"W":throw new RangeError("`w/W` (week) patterns are not supported");case"d":t.day=["numeric","2-digit"][r-1];break;case"D":case"F":case"g":throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");case"E":t.weekday=4===r?"long":5===r?"narrow":"short";break;case"e":if(r<4)throw new RangeError("`e..eee` (weekday) patterns are not supported");t.weekday=["short","long","narrow","short"][r-4];break;case"c":if(r<4)throw new RangeError("`c..ccc` (weekday) patterns are not supported");t.weekday=["short","long","narrow","short"][r-4];break;case"a":t.hour12=!0;break;case"b":case"B":throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");case"h":t.hourCycle="h12",t.hour=["numeric","2-digit"][r-1];break;case"H":t.hourCycle="h23",t.hour=["numeric","2-digit"][r-1];break;case"K":t.hourCycle="h11",t.hour=["numeric","2-digit"][r-1];break;case"k":t.hourCycle="h24",t.hour=["numeric","2-digit"][r-1];break;case"j":case"J":case"C":throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");case"m":t.minute=["numeric","2-digit"][r-1];break;case"s":t.second=["numeric","2-digit"][r-1];break;case"S":case"A":throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");case"z":t.timeZoneName=r<4?"short":"long";break;case"Z":case"O":case"v":case"V":case"X":case"x":throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead")}return""})),t}var _t=/[\t-\r \x85\u200E\u200F\u2028\u2029]/i;var yt=/^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,Et=/^(@+)?(\+|#+)?[rs]?$/g,At=/(\*)(0+)|(#+)(0+)|(0+)/g,wt=/^(0+)$/;function Ht(e){var t={};return"r"===e[e.length-1]?t.roundingPriority="morePrecision":"s"===e[e.length-1]&&(t.roundingPriority="lessPrecision"),e.replace(Et,(function(e,r,i){return"string"!=typeof i?(t.minimumSignificantDigits=r.length,t.maximumSignificantDigits=r.length):"+"===i?t.minimumSignificantDigits=r.length:"#"===r[0]?t.maximumSignificantDigits=r.length:(t.minimumSignificantDigits=r.length,t.maximumSignificantDigits=r.length+("string"==typeof i?i.length:0)),""})),t}function $t(e){switch(e){case"sign-auto":return{signDisplay:"auto"};case"sign-accounting":case"()":return{currencySign:"accounting"};case"sign-always":case"+!":return{signDisplay:"always"};case"sign-accounting-always":case"()!":return{signDisplay:"always",currencySign:"accounting"};case"sign-except-zero":case"+?":return{signDisplay:"exceptZero"};case"sign-accounting-except-zero":case"()?":return{signDisplay:"exceptZero",currencySign:"accounting"};case"sign-never":case"+_":return{signDisplay:"never"}}}function Tt(e){var t;if("E"===e[0]&&"E"===e[1]?(t={notation:"engineering"},e=e.slice(2)):"E"===e[0]&&(t={notation:"scientific"},e=e.slice(1)),t){var r=e.slice(0,2);if("+!"===r?(t.signDisplay="always",e=e.slice(2)):"+?"===r&&(t.signDisplay="exceptZero",e=e.slice(2)),!wt.test(e))throw new Error("Malformed concise eng/scientific notation");t.minimumIntegerDigits=e.length}return t}function St(e){var t=$t(e);return t||{}}function Bt(e){for(var t={},r=0,s=e;r<s.length;r++){var n=s[r];switch(n.stem){case"percent":case"%":t.style="percent";continue;case"%x100":t.style="percent",t.scale=100;continue;case"currency":t.style="currency",t.currency=n.options[0];continue;case"group-off":case",_":t.useGrouping=!1;continue;case"precision-integer":case".":t.maximumFractionDigits=0;continue;case"measure-unit":case"unit":t.style="unit",t.unit=n.options[0].replace(/^(.*?)-/,"");continue;case"compact-short":case"K":t.notation="compact",t.compactDisplay="short";continue;case"compact-long":case"KK":t.notation="compact",t.compactDisplay="long";continue;case"scientific":t=i(i(i({},t),{notation:"scientific"}),n.options.reduce((function(e,t){return i(i({},e),St(t))}),{}));continue;case"engineering":t=i(i(i({},t),{notation:"engineering"}),n.options.reduce((function(e,t){return i(i({},e),St(t))}),{}));continue;case"notation-simple":t.notation="standard";continue;case"unit-width-narrow":t.currencyDisplay="narrowSymbol",t.unitDisplay="narrow";continue;case"unit-width-short":t.currencyDisplay="code",t.unitDisplay="short";continue;case"unit-width-full-name":t.currencyDisplay="name",t.unitDisplay="long";continue;case"unit-width-iso-code":t.currencyDisplay="symbol";continue;case"scale":t.scale=parseFloat(n.options[0]);continue;case"rounding-mode-floor":t.roundingMode="floor";continue;case"rounding-mode-ceiling":t.roundingMode="ceil";continue;case"rounding-mode-down":t.roundingMode="trunc";continue;case"rounding-mode-up":t.roundingMode="expand";continue;case"rounding-mode-half-even":t.roundingMode="halfEven";continue;case"rounding-mode-half-down":t.roundingMode="halfTrunc";continue;case"rounding-mode-half-up":t.roundingMode="halfExpand";continue;case"integer-width":if(n.options.length>1)throw new RangeError("integer-width stems only accept a single optional option");n.options[0].replace(At,(function(e,r,i,s,n,o){if(r)t.minimumIntegerDigits=i.length;else{if(s&&n)throw new Error("We currently do not support maximum integer digits");if(o)throw new Error("We currently do not support exact integer digits")}return""}));continue}if(wt.test(n.stem))t.minimumIntegerDigits=n.stem.length;else if(yt.test(n.stem)){if(n.options.length>1)throw new RangeError("Fraction-precision stems only accept a single optional option");n.stem.replace(yt,(function(e,r,i,s,n,o){return"*"===i?t.minimumFractionDigits=r.length:s&&"#"===s[0]?t.maximumFractionDigits=s.length:n&&o?(t.minimumFractionDigits=n.length,t.maximumFractionDigits=n.length+o.length):(t.minimumFractionDigits=r.length,t.maximumFractionDigits=r.length),""}));var o=n.options[0];"w"===o?t=i(i({},t),{trailingZeroDisplay:"stripIfInteger"}):o&&(t=i(i({},t),Ht(o)))}else if(Et.test(n.stem))t=i(i({},t),Ht(n.stem));else{var a=$t(n.stem);a&&(t=i(i({},t),a));var l=Tt(n.stem);l&&(t=i(i({},t),l))}}return t}var Pt,Lt={"001":["H","h"],AC:["H","h","hb","hB"],AD:["H","hB"],AE:["h","hB","hb","H"],AF:["H","hb","hB","h"],AG:["h","hb","H","hB"],AI:["H","h","hb","hB"],AL:["h","H","hB"],AM:["H","hB"],AO:["H","hB"],AR:["H","h","hB","hb"],AS:["h","H"],AT:["H","hB"],AU:["h","hb","H","hB"],AW:["H","hB"],AX:["H"],AZ:["H","hB","h"],BA:["H","hB","h"],BB:["h","hb","H","hB"],BD:["h","hB","H"],BE:["H","hB"],BF:["H","hB"],BG:["H","hB","h"],BH:["h","hB","hb","H"],BI:["H","h"],BJ:["H","hB"],BL:["H","hB"],BM:["h","hb","H","hB"],BN:["hb","hB","h","H"],BO:["H","hB","h","hb"],BQ:["H"],BR:["H","hB"],BS:["h","hb","H","hB"],BT:["h","H"],BW:["H","h","hb","hB"],BY:["H","h"],BZ:["H","h","hb","hB"],CA:["h","hb","H","hB"],CC:["H","h","hb","hB"],CD:["hB","H"],CF:["H","h","hB"],CG:["H","hB"],CH:["H","hB","h"],CI:["H","hB"],CK:["H","h","hb","hB"],CL:["H","h","hB","hb"],CM:["H","h","hB"],CN:["H","hB","hb","h"],CO:["h","H","hB","hb"],CP:["H"],CR:["H","h","hB","hb"],CU:["H","h","hB","hb"],CV:["H","hB"],CW:["H","hB"],CX:["H","h","hb","hB"],CY:["h","H","hb","hB"],CZ:["H"],DE:["H","hB"],DG:["H","h","hb","hB"],DJ:["h","H"],DK:["H"],DM:["h","hb","H","hB"],DO:["h","H","hB","hb"],DZ:["h","hB","hb","H"],EA:["H","h","hB","hb"],EC:["H","hB","h","hb"],EE:["H","hB"],EG:["h","hB","hb","H"],EH:["h","hB","hb","H"],ER:["h","H"],ES:["H","hB","h","hb"],ET:["hB","hb","h","H"],FI:["H"],FJ:["h","hb","H","hB"],FK:["H","h","hb","hB"],FM:["h","hb","H","hB"],FO:["H","h"],FR:["H","hB"],GA:["H","hB"],GB:["H","h","hb","hB"],GD:["h","hb","H","hB"],GE:["H","hB","h"],GF:["H","hB"],GG:["H","h","hb","hB"],GH:["h","H"],GI:["H","h","hb","hB"],GL:["H","h"],GM:["h","hb","H","hB"],GN:["H","hB"],GP:["H","hB"],GQ:["H","hB","h","hb"],GR:["h","H","hb","hB"],GT:["H","h","hB","hb"],GU:["h","hb","H","hB"],GW:["H","hB"],GY:["h","hb","H","hB"],HK:["h","hB","hb","H"],HN:["H","h","hB","hb"],HR:["H","hB"],HU:["H","h"],IC:["H","h","hB","hb"],ID:["H"],IE:["H","h","hb","hB"],IL:["H","hB"],IM:["H","h","hb","hB"],IN:["h","H"],IO:["H","h","hb","hB"],IQ:["h","hB","hb","H"],IR:["hB","H"],IS:["H"],IT:["H","hB"],JE:["H","h","hb","hB"],JM:["h","hb","H","hB"],JO:["h","hB","hb","H"],JP:["H","K","h"],KE:["hB","hb","H","h"],KG:["H","h","hB","hb"],KH:["hB","h","H","hb"],KI:["h","hb","H","hB"],KM:["H","h","hB","hb"],KN:["h","hb","H","hB"],KP:["h","H","hB","hb"],KR:["h","H","hB","hb"],KW:["h","hB","hb","H"],KY:["h","hb","H","hB"],KZ:["H","hB"],LA:["H","hb","hB","h"],LB:["h","hB","hb","H"],LC:["h","hb","H","hB"],LI:["H","hB","h"],LK:["H","h","hB","hb"],LR:["h","hb","H","hB"],LS:["h","H"],LT:["H","h","hb","hB"],LU:["H","h","hB"],LV:["H","hB","hb","h"],LY:["h","hB","hb","H"],MA:["H","h","hB","hb"],MC:["H","hB"],MD:["H","hB"],ME:["H","hB","h"],MF:["H","hB"],MG:["H","h"],MH:["h","hb","H","hB"],MK:["H","h","hb","hB"],ML:["H"],MM:["hB","hb","H","h"],MN:["H","h","hb","hB"],MO:["h","hB","hb","H"],MP:["h","hb","H","hB"],MQ:["H","hB"],MR:["h","hB","hb","H"],MS:["H","h","hb","hB"],MT:["H","h"],MU:["H","h"],MV:["H","h"],MW:["h","hb","H","hB"],MX:["H","h","hB","hb"],MY:["hb","hB","h","H"],MZ:["H","hB"],NA:["h","H","hB","hb"],NC:["H","hB"],NE:["H"],NF:["H","h","hb","hB"],NG:["H","h","hb","hB"],NI:["H","h","hB","hb"],NL:["H","hB"],NO:["H","h"],NP:["H","h","hB"],NR:["H","h","hb","hB"],NU:["H","h","hb","hB"],NZ:["h","hb","H","hB"],OM:["h","hB","hb","H"],PA:["h","H","hB","hb"],PE:["H","hB","h","hb"],PF:["H","h","hB"],PG:["h","H"],PH:["h","hB","hb","H"],PK:["h","hB","H"],PL:["H","h"],PM:["H","hB"],PN:["H","h","hb","hB"],PR:["h","H","hB","hb"],PS:["h","hB","hb","H"],PT:["H","hB"],PW:["h","H"],PY:["H","h","hB","hb"],QA:["h","hB","hb","H"],RE:["H","hB"],RO:["H","hB"],RS:["H","hB","h"],RU:["H"],RW:["H","h"],SA:["h","hB","hb","H"],SB:["h","hb","H","hB"],SC:["H","h","hB"],SD:["h","hB","hb","H"],SE:["H"],SG:["h","hb","H","hB"],SH:["H","h","hb","hB"],SI:["H","hB"],SJ:["H"],SK:["H"],SL:["h","hb","H","hB"],SM:["H","h","hB"],SN:["H","h","hB"],SO:["h","H"],SR:["H","hB"],SS:["h","hb","H","hB"],ST:["H","hB"],SV:["H","h","hB","hb"],SX:["H","h","hb","hB"],SY:["h","hB","hb","H"],SZ:["h","hb","H","hB"],TA:["H","h","hb","hB"],TC:["h","hb","H","hB"],TD:["h","H","hB"],TF:["H","h","hB"],TG:["H","hB"],TH:["H","h"],TJ:["H","h"],TL:["H","hB","hb","h"],TM:["H","h"],TN:["h","hB","hb","H"],TO:["h","H"],TR:["H","hB"],TT:["h","hb","H","hB"],TW:["hB","hb","h","H"],TZ:["hB","hb","H","h"],UA:["H","hB","h"],UG:["hB","hb","H","h"],UM:["h","hb","H","hB"],US:["h","hb","H","hB"],UY:["H","h","hB","hb"],UZ:["H","hB","h"],VA:["H","h","hB"],VC:["h","hb","H","hB"],VE:["h","H","hB","hb"],VG:["h","hb","H","hB"],VI:["h","hb","H","hB"],VN:["H","h"],VU:["h","H"],WF:["H","hB"],WS:["h","H"],XK:["H","hB","h"],YE:["h","hB","hb","H"],YT:["H","hB"],ZA:["H","h","hb","hB"],ZM:["h","hb","H","hB"],ZW:["H","h"],"af-ZA":["H","h","hB","hb"],"ar-001":["h","hB","hb","H"],"ca-ES":["H","h","hB"],"en-001":["h","hb","H","hB"],"es-BO":["H","h","hB","hb"],"es-BR":["H","h","hB","hb"],"es-EC":["H","h","hB","hb"],"es-ES":["H","h","hB","hb"],"es-GQ":["H","h","hB","hb"],"es-PE":["H","h","hB","hb"],"fr-CA":["H","h","hB"],"gl-ES":["H","h","hB"],"gu-IN":["hB","hb","h","H"],"hi-IN":["hB","h","H"],"it-CH":["H","h","hB"],"it-IT":["H","h","hB"],"kn-IN":["hB","h","H"],"ml-IN":["hB","h","H"],"mr-IN":["hB","hb","h","H"],"pa-IN":["hB","hb","h","H"],"ta-IN":["hB","h","hb","H"],"te-IN":["hB","h","H"],"zu-ZA":["H","hB","hb","h"]};function Ot(e){var t=e.hourCycle;if(void 0===t&&e.hourCycles&&e.hourCycles.length&&(t=e.hourCycles[0]),t)switch(t){case"h24":return"k";case"h23":return"H";case"h12":return"h";case"h11":return"K";default:throw new Error("Invalid hourCycle")}var r,i=e.language;return"root"!==i&&(r=e.maximize().region),(Lt[r||""]||Lt[i||""]||Lt["".concat(i,"-001")]||Lt["001"])[0]}var Ct=new RegExp("^".concat(gt.source,"*")),Nt=new RegExp("".concat(gt.source,"*$"));function It(e,t){return{start:e,end:t}}var Rt=!!String.prototype.startsWith&&"_a".startsWith("a",1),xt=!!String.fromCodePoint,Mt=!!Object.fromEntries,Ut=!!String.prototype.codePointAt,kt=!!String.prototype.trimStart,Dt=!!String.prototype.trimEnd,Gt=!!Number.isSafeInteger?Number.isSafeInteger:function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e&&Math.abs(e)<=9007199254740991},jt=!0;try{jt="a"===(null===(Pt=Yt("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu").exec("a"))||void 0===Pt?void 0:Pt[0])}catch(M){jt=!1}var Ft,Vt=Rt?function(e,t,r){return e.startsWith(t,r)}:function(e,t,r){return e.slice(r,r+t.length)===t},Kt=xt?String.fromCodePoint:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var r,i="",s=e.length,n=0;s>n;){if((r=e[n++])>1114111)throw RangeError(r+" is not a valid code point");i+=r<65536?String.fromCharCode(r):String.fromCharCode(55296+((r-=65536)>>10),r%1024+56320)}return i},Xt=Mt?Object.fromEntries:function(e){for(var t={},r=0,i=e;r<i.length;r++){var s=i[r],n=s[0],o=s[1];t[n]=o}return t},zt=Ut?function(e,t){return e.codePointAt(t)}:function(e,t){var r=e.length;if(!(t<0||t>=r)){var i,s=e.charCodeAt(t);return s<55296||s>56319||t+1===r||(i=e.charCodeAt(t+1))<56320||i>57343?s:i-56320+(s-55296<<10)+65536}},Wt=kt?function(e){return e.trimStart()}:function(e){return e.replace(Ct,"")},Zt=Dt?function(e){return e.trimEnd()}:function(e){return e.replace(Nt,"")};function Yt(e,t){return new RegExp(e,t)}if(jt){var qt=Yt("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu");Ft=function(e,t){var r;return qt.lastIndex=t,null!==(r=qt.exec(e)[1])&&void 0!==r?r:""}}else Ft=function(e,t){for(var r=[];;){var i=zt(e,t);if(void 0===i||tr(i)||rr(i))break;r.push(i),t+=i>=65536?2:1}return Kt.apply(void 0,r)};var Jt=function(){function e(e,t){void 0===t&&(t={}),this.message=e,this.position={offset:0,line:1,column:1},this.ignoreTag=!!t.ignoreTag,this.locale=t.locale,this.requiresOtherClause=!!t.requiresOtherClause,this.shouldParseSkeletons=!!t.shouldParseSkeletons}return e.prototype.parse=function(){if(0!==this.offset())throw Error("parser can only be used once");return this.parseMessage(0,"",!1)},e.prototype.parseMessage=function(e,t,r){for(var i=[];!this.isEOF();){var s=this.char();if(123===s){if((n=this.parseArgument(e,r)).err)return n;i.push(n.val)}else{if(125===s&&e>0)break;if(35!==s||"plural"!==t&&"selectordinal"!==t){if(60===s&&!this.ignoreTag&&47===this.peek()){if(r)break;return this.error(je.UNMATCHED_CLOSING_TAG,It(this.clonePosition(),this.clonePosition()))}if(60===s&&!this.ignoreTag&&Qt(this.peek()||0)){if((n=this.parseTag(e,t)).err)return n;i.push(n.val)}else{var n;if((n=this.parseLiteral(e,t)).err)return n;i.push(n.val)}}else{var o=this.clonePosition();this.bump(),i.push({type:Fe.pound,location:It(o,this.clonePosition())})}}}return{val:i,err:null}},e.prototype.parseTag=function(e,t){var r=this.clonePosition();this.bump();var i=this.parseTagName();if(this.bumpSpace(),this.bumpIf("/>"))return{val:{type:Fe.literal,value:"<".concat(i,"/>"),location:It(r,this.clonePosition())},err:null};if(this.bumpIf(">")){var s=this.parseMessage(e+1,t,!0);if(s.err)return s;var n=s.val,o=this.clonePosition();if(this.bumpIf("</")){if(this.isEOF()||!Qt(this.char()))return this.error(je.INVALID_TAG,It(o,this.clonePosition()));var a=this.clonePosition();return i!==this.parseTagName()?this.error(je.UNMATCHED_CLOSING_TAG,It(a,this.clonePosition())):(this.bumpSpace(),this.bumpIf(">")?{val:{type:Fe.tag,value:i,children:n,location:It(r,this.clonePosition())},err:null}:this.error(je.INVALID_TAG,It(o,this.clonePosition())))}return this.error(je.UNCLOSED_TAG,It(r,this.clonePosition()))}return this.error(je.INVALID_TAG,It(r,this.clonePosition()))},e.prototype.parseTagName=function(){var e=this.offset();for(this.bump();!this.isEOF()&&er(this.char());)this.bump();return this.message.slice(e,this.offset())},e.prototype.parseLiteral=function(e,t){for(var r=this.clonePosition(),i="";;){var s=this.tryParseQuote(t);if(s)i+=s;else{var n=this.tryParseUnquoted(e,t);if(n)i+=n;else{var o=this.tryParseLeftAngleBracket();if(!o)break;i+=o}}}var a=It(r,this.clonePosition());return{val:{type:Fe.literal,value:i,location:a},err:null}},e.prototype.tryParseLeftAngleBracket=function(){return this.isEOF()||60!==this.char()||!this.ignoreTag&&(Qt(e=this.peek()||0)||47===e)?null:(this.bump(),"<");var e},e.prototype.tryParseQuote=function(e){if(this.isEOF()||39!==this.char())return null;switch(this.peek()){case 39:return this.bump(),this.bump(),"'";case 123:case 60:case 62:case 125:break;case 35:if("plural"===e||"selectordinal"===e)break;return null;default:return null}this.bump();var t=[this.char()];for(this.bump();!this.isEOF();){var r=this.char();if(39===r){if(39!==this.peek()){this.bump();break}t.push(39),this.bump()}else t.push(r);this.bump()}return Kt.apply(void 0,t)},e.prototype.tryParseUnquoted=function(e,t){if(this.isEOF())return null;var r=this.char();return 60===r||123===r||35===r&&("plural"===t||"selectordinal"===t)||125===r&&e>0?null:(this.bump(),Kt(r))},e.prototype.parseArgument=function(e,t){var r=this.clonePosition();if(this.bump(),this.bumpSpace(),this.isEOF())return this.error(je.EXPECT_ARGUMENT_CLOSING_BRACE,It(r,this.clonePosition()));if(125===this.char())return this.bump(),this.error(je.EMPTY_ARGUMENT,It(r,this.clonePosition()));var i=this.parseIdentifierIfPossible().value;if(!i)return this.error(je.MALFORMED_ARGUMENT,It(r,this.clonePosition()));if(this.bumpSpace(),this.isEOF())return this.error(je.EXPECT_ARGUMENT_CLOSING_BRACE,It(r,this.clonePosition()));switch(this.char()){case 125:return this.bump(),{val:{type:Fe.argument,value:i,location:It(r,this.clonePosition())},err:null};case 44:return this.bump(),this.bumpSpace(),this.isEOF()?this.error(je.EXPECT_ARGUMENT_CLOSING_BRACE,It(r,this.clonePosition())):this.parseArgumentOptions(e,t,i,r);default:return this.error(je.MALFORMED_ARGUMENT,It(r,this.clonePosition()))}},e.prototype.parseIdentifierIfPossible=function(){var e=this.clonePosition(),t=this.offset(),r=Ft(this.message,t),i=t+r.length;return this.bumpTo(i),{value:r,location:It(e,this.clonePosition())}},e.prototype.parseArgumentOptions=function(e,t,r,s){var n,o=this.clonePosition(),a=this.parseIdentifierIfPossible().value,l=this.clonePosition();switch(a){case"":return this.error(je.EXPECT_ARGUMENT_TYPE,It(o,l));case"number":case"date":case"time":this.bumpSpace();var h=null;if(this.bumpIf(",")){this.bumpSpace();var c=this.clonePosition();if((v=this.parseSimpleArgStyleIfPossible()).err)return v;if(0===(m=Zt(v.val)).length)return this.error(je.EXPECT_ARGUMENT_STYLE,It(this.clonePosition(),this.clonePosition()));h={style:m,styleLocation:It(c,this.clonePosition())}}if((_=this.tryParseArgumentClose(s)).err)return _;var u=It(s,this.clonePosition());if(h&&Vt(null==h?void 0:h.style,"::",0)){var p=Wt(h.style.slice(2));if("number"===a)return(v=this.parseNumberSkeletonFromString(p,h.styleLocation)).err?v:{val:{type:Fe.number,value:r,location:u,style:v.val},err:null};if(0===p.length)return this.error(je.EXPECT_DATE_TIME_SKELETON,u);var d=p;this.locale&&(d=function(e,t){for(var r="",i=0;i<e.length;i++){var s=e.charAt(i);if("j"===s){for(var n=0;i+1<e.length&&e.charAt(i+1)===s;)n++,i++;var o=1+(1&n),a=n<2?1:3+(n>>1),l=Ot(t);for("H"!=l&&"k"!=l||(a=0);a-- >0;)r+="a";for(;o-- >0;)r=l+r}else r+="J"===s?"H":s}return r}(p,this.locale));var m={type:Ve.dateTime,pattern:d,location:h.styleLocation,parsedOptions:this.shouldParseSkeletons?vt(d):{}};return{val:{type:"date"===a?Fe.date:Fe.time,value:r,location:u,style:m},err:null}}return{val:{type:"number"===a?Fe.number:"date"===a?Fe.date:Fe.time,value:r,location:u,style:null!==(n=null==h?void 0:h.style)&&void 0!==n?n:null},err:null};case"plural":case"selectordinal":case"select":var f=this.clonePosition();if(this.bumpSpace(),!this.bumpIf(","))return this.error(je.EXPECT_SELECT_ARGUMENT_OPTIONS,It(f,i({},f)));this.bumpSpace();var g=this.parseIdentifierIfPossible(),b=0;if("select"!==a&&"offset"===g.value){if(!this.bumpIf(":"))return this.error(je.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,It(this.clonePosition(),this.clonePosition()));var v;if(this.bumpSpace(),(v=this.tryParseDecimalInteger(je.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,je.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE)).err)return v;this.bumpSpace(),g=this.parseIdentifierIfPossible(),b=v.val}var _,y=this.tryParsePluralOrSelectOptions(e,a,t,g);if(y.err)return y;if((_=this.tryParseArgumentClose(s)).err)return _;var E=It(s,this.clonePosition());return"select"===a?{val:{type:Fe.select,value:r,options:Xt(y.val),location:E},err:null}:{val:{type:Fe.plural,value:r,options:Xt(y.val),offset:b,pluralType:"plural"===a?"cardinal":"ordinal",location:E},err:null};default:return this.error(je.INVALID_ARGUMENT_TYPE,It(o,l))}},e.prototype.tryParseArgumentClose=function(e){return this.isEOF()||125!==this.char()?this.error(je.EXPECT_ARGUMENT_CLOSING_BRACE,It(e,this.clonePosition())):(this.bump(),{val:!0,err:null})},e.prototype.parseSimpleArgStyleIfPossible=function(){for(var e=0,t=this.clonePosition();!this.isEOF();){switch(this.char()){case 39:this.bump();var r=this.clonePosition();if(!this.bumpUntil("'"))return this.error(je.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE,It(r,this.clonePosition()));this.bump();break;case 123:e+=1,this.bump();break;case 125:if(!(e>0))return{val:this.message.slice(t.offset,this.offset()),err:null};e-=1;break;default:this.bump()}}return{val:this.message.slice(t.offset,this.offset()),err:null}},e.prototype.parseNumberSkeletonFromString=function(e,t){var r=[];try{r=function(e){if(0===e.length)throw new Error("Number skeleton cannot be empty");for(var t=e.split(_t).filter((function(e){return e.length>0})),r=[],i=0,s=t;i<s.length;i++){var n=s[i].split("/");if(0===n.length)throw new Error("Invalid number skeleton");for(var o=n[0],a=n.slice(1),l=0,h=a;l<h.length;l++)if(0===h[l].length)throw new Error("Invalid number skeleton");r.push({stem:o,options:a})}return r}(e)}catch(e){return this.error(je.INVALID_NUMBER_SKELETON,t)}return{val:{type:Ve.number,tokens:r,location:t,parsedOptions:this.shouldParseSkeletons?Bt(r):{}},err:null}},e.prototype.tryParsePluralOrSelectOptions=function(e,t,r,i){for(var s,n=!1,o=[],a=new Set,l=i.value,h=i.location;;){if(0===l.length){var c=this.clonePosition();if("select"===t||!this.bumpIf("="))break;var u=this.tryParseDecimalInteger(je.EXPECT_PLURAL_ARGUMENT_SELECTOR,je.INVALID_PLURAL_ARGUMENT_SELECTOR);if(u.err)return u;h=It(c,this.clonePosition()),l=this.message.slice(c.offset,this.offset())}if(a.has(l))return this.error("select"===t?je.DUPLICATE_SELECT_ARGUMENT_SELECTOR:je.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,h);"other"===l&&(n=!0),this.bumpSpace();var p=this.clonePosition();if(!this.bumpIf("{"))return this.error("select"===t?je.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT:je.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,It(this.clonePosition(),this.clonePosition()));var d=this.parseMessage(e+1,t,r);if(d.err)return d;var m=this.tryParseArgumentClose(p);if(m.err)return m;o.push([l,{value:d.val,location:It(p,this.clonePosition())}]),a.add(l),this.bumpSpace(),l=(s=this.parseIdentifierIfPossible()).value,h=s.location}return 0===o.length?this.error("select"===t?je.EXPECT_SELECT_ARGUMENT_SELECTOR:je.EXPECT_PLURAL_ARGUMENT_SELECTOR,It(this.clonePosition(),this.clonePosition())):this.requiresOtherClause&&!n?this.error(je.MISSING_OTHER_CLAUSE,It(this.clonePosition(),this.clonePosition())):{val:o,err:null}},e.prototype.tryParseDecimalInteger=function(e,t){var r=1,i=this.clonePosition();this.bumpIf("+")||this.bumpIf("-")&&(r=-1);for(var s=!1,n=0;!this.isEOF();){var o=this.char();if(!(o>=48&&o<=57))break;s=!0,n=10*n+(o-48),this.bump()}var a=It(i,this.clonePosition());return s?Gt(n*=r)?{val:n,err:null}:this.error(t,a):this.error(e,a)},e.prototype.offset=function(){return this.position.offset},e.prototype.isEOF=function(){return this.offset()===this.message.length},e.prototype.clonePosition=function(){return{offset:this.position.offset,line:this.position.line,column:this.position.column}},e.prototype.char=function(){var e=this.position.offset;if(e>=this.message.length)throw Error("out of bound");var t=zt(this.message,e);if(void 0===t)throw Error("Offset ".concat(e," is at invalid UTF-16 code unit boundary"));return t},e.prototype.error=function(e,t){return{val:null,err:{kind:e,message:this.message,location:t}}},e.prototype.bump=function(){if(!this.isEOF()){var e=this.char();10===e?(this.position.line+=1,this.position.column=1,this.position.offset+=1):(this.position.column+=1,this.position.offset+=e<65536?1:2)}},e.prototype.bumpIf=function(e){if(Vt(this.message,e,this.offset())){for(var t=0;t<e.length;t++)this.bump();return!0}return!1},e.prototype.bumpUntil=function(e){var t=this.offset(),r=this.message.indexOf(e,t);return r>=0?(this.bumpTo(r),!0):(this.bumpTo(this.message.length),!1)},e.prototype.bumpTo=function(e){if(this.offset()>e)throw Error("targetOffset ".concat(e," must be greater than or equal to the current offset ").concat(this.offset()));for(e=Math.min(e,this.message.length);;){var t=this.offset();if(t===e)break;if(t>e)throw Error("targetOffset ".concat(e," is at invalid UTF-16 code unit boundary"));if(this.bump(),this.isEOF())break}},e.prototype.bumpSpace=function(){for(;!this.isEOF()&&tr(this.char());)this.bump()},e.prototype.peek=function(){if(this.isEOF())return null;var e=this.char(),t=this.offset(),r=this.message.charCodeAt(t+(e>=65536?2:1));return null!=r?r:null},e}();function Qt(e){return e>=97&&e<=122||e>=65&&e<=90}function er(e){return 45===e||46===e||e>=48&&e<=57||95===e||e>=97&&e<=122||e>=65&&e<=90||183==e||e>=192&&e<=214||e>=216&&e<=246||e>=248&&e<=893||e>=895&&e<=8191||e>=8204&&e<=8205||e>=8255&&e<=8256||e>=8304&&e<=8591||e>=11264&&e<=12271||e>=12289&&e<=55295||e>=63744&&e<=64975||e>=65008&&e<=65533||e>=65536&&e<=983039}function tr(e){return e>=9&&e<=13||32===e||133===e||e>=8206&&e<=8207||8232===e||8233===e}function rr(e){return e>=33&&e<=35||36===e||e>=37&&e<=39||40===e||41===e||42===e||43===e||44===e||45===e||e>=46&&e<=47||e>=58&&e<=59||e>=60&&e<=62||e>=63&&e<=64||91===e||92===e||93===e||94===e||96===e||123===e||124===e||125===e||126===e||161===e||e>=162&&e<=165||166===e||167===e||169===e||171===e||172===e||174===e||176===e||177===e||182===e||187===e||191===e||215===e||247===e||e>=8208&&e<=8213||e>=8214&&e<=8215||8216===e||8217===e||8218===e||e>=8219&&e<=8220||8221===e||8222===e||8223===e||e>=8224&&e<=8231||e>=8240&&e<=8248||8249===e||8250===e||e>=8251&&e<=8254||e>=8257&&e<=8259||8260===e||8261===e||8262===e||e>=8263&&e<=8273||8274===e||8275===e||e>=8277&&e<=8286||e>=8592&&e<=8596||e>=8597&&e<=8601||e>=8602&&e<=8603||e>=8604&&e<=8607||8608===e||e>=8609&&e<=8610||8611===e||e>=8612&&e<=8613||8614===e||e>=8615&&e<=8621||8622===e||e>=8623&&e<=8653||e>=8654&&e<=8655||e>=8656&&e<=8657||8658===e||8659===e||8660===e||e>=8661&&e<=8691||e>=8692&&e<=8959||e>=8960&&e<=8967||8968===e||8969===e||8970===e||8971===e||e>=8972&&e<=8991||e>=8992&&e<=8993||e>=8994&&e<=9e3||9001===e||9002===e||e>=9003&&e<=9083||9084===e||e>=9085&&e<=9114||e>=9115&&e<=9139||e>=9140&&e<=9179||e>=9180&&e<=9185||e>=9186&&e<=9254||e>=9255&&e<=9279||e>=9280&&e<=9290||e>=9291&&e<=9311||e>=9472&&e<=9654||9655===e||e>=9656&&e<=9664||9665===e||e>=9666&&e<=9719||e>=9720&&e<=9727||e>=9728&&e<=9838||9839===e||e>=9840&&e<=10087||10088===e||10089===e||10090===e||10091===e||10092===e||10093===e||10094===e||10095===e||10096===e||10097===e||10098===e||10099===e||10100===e||10101===e||e>=10132&&e<=10175||e>=10176&&e<=10180||10181===e||10182===e||e>=10183&&e<=10213||10214===e||10215===e||10216===e||10217===e||10218===e||10219===e||10220===e||10221===e||10222===e||10223===e||e>=10224&&e<=10239||e>=10240&&e<=10495||e>=10496&&e<=10626||10627===e||10628===e||10629===e||10630===e||10631===e||10632===e||10633===e||10634===e||10635===e||10636===e||10637===e||10638===e||10639===e||10640===e||10641===e||10642===e||10643===e||10644===e||10645===e||10646===e||10647===e||10648===e||e>=10649&&e<=10711||10712===e||10713===e||10714===e||10715===e||e>=10716&&e<=10747||10748===e||10749===e||e>=10750&&e<=11007||e>=11008&&e<=11055||e>=11056&&e<=11076||e>=11077&&e<=11078||e>=11079&&e<=11084||e>=11085&&e<=11123||e>=11124&&e<=11125||e>=11126&&e<=11157||11158===e||e>=11159&&e<=11263||e>=11776&&e<=11777||11778===e||11779===e||11780===e||11781===e||e>=11782&&e<=11784||11785===e||11786===e||11787===e||11788===e||11789===e||e>=11790&&e<=11798||11799===e||e>=11800&&e<=11801||11802===e||11803===e||11804===e||11805===e||e>=11806&&e<=11807||11808===e||11809===e||11810===e||11811===e||11812===e||11813===e||11814===e||11815===e||11816===e||11817===e||e>=11818&&e<=11822||11823===e||e>=11824&&e<=11833||e>=11834&&e<=11835||e>=11836&&e<=11839||11840===e||11841===e||11842===e||e>=11843&&e<=11855||e>=11856&&e<=11857||11858===e||e>=11859&&e<=11903||e>=12289&&e<=12291||12296===e||12297===e||12298===e||12299===e||12300===e||12301===e||12302===e||12303===e||12304===e||12305===e||e>=12306&&e<=12307||12308===e||12309===e||12310===e||12311===e||12312===e||12313===e||12314===e||12315===e||12316===e||12317===e||e>=12318&&e<=12319||12320===e||12336===e||64830===e||64831===e||e>=65093&&e<=65094}function ir(e){e.forEach((function(e){if(delete e.location,ct(e)||ut(e))for(var t in e.options)delete e.options[t].location,ir(e.options[t].value);else at(e)&&mt(e.style)||(lt(e)||ht(e))&&ft(e.style)?delete e.style.location:dt(e)&&ir(e.children)}))}function sr(e,t){void 0===t&&(t={}),t=i({shouldParseSkeletons:!0,requiresOtherClause:!0},t);var r=new Jt(e,t).parse();if(r.err){var s=SyntaxError(je[r.err.kind]);throw s.location=r.err.location,s.originalMessage=r.err.message,s}return(null==t?void 0:t.captureLocation)||ir(r.val),r.val}function nr(e,t){var r=t&&t.cache?t.cache:dr,i=t&&t.serializer?t.serializer:cr;return(t&&t.strategy?t.strategy:hr)(e,{cache:r,serializer:i})}function or(e,t,r,i){var s,n=null==(s=i)||"number"==typeof s||"boolean"==typeof s?i:r(i),o=t.get(n);return void 0===o&&(o=e.call(this,i),t.set(n,o)),o}function ar(e,t,r){var i=Array.prototype.slice.call(arguments,3),s=r(i),n=t.get(s);return void 0===n&&(n=e.apply(this,i),t.set(s,n)),n}function lr(e,t,r,i,s){return r.bind(t,e,i,s)}function hr(e,t){return lr(e,this,1===e.length?or:ar,t.cache.create(),t.serializer)}var cr=function(){return JSON.stringify(arguments)};function ur(){this.cache=Object.create(null)}ur.prototype.get=function(e){return this.cache[e]},ur.prototype.set=function(e,t){this.cache[e]=t};var pr,dr={create:function(){return new ur}},mr={variadic:function(e,t){return lr(e,this,ar,t.cache.create(),t.serializer)},monadic:function(e,t){return lr(e,this,or,t.cache.create(),t.serializer)}};!function(e){e.MISSING_VALUE="MISSING_VALUE",e.INVALID_VALUE="INVALID_VALUE",e.MISSING_INTL_API="MISSING_INTL_API"}(pr||(pr={}));var fr,gr=function(e){function t(t,r,i){var s=e.call(this,t)||this;return s.code=r,s.originalMessage=i,s}return r(t,e),t.prototype.toString=function(){return"[formatjs Error: ".concat(this.code,"] ").concat(this.message)},t}(Error),br=function(e){function t(t,r,i,s){return e.call(this,'Invalid values for "'.concat(t,'": "').concat(r,'". Options are "').concat(Object.keys(i).join('", "'),'"'),pr.INVALID_VALUE,s)||this}return r(t,e),t}(gr),vr=function(e){function t(t,r,i){return e.call(this,'Value for "'.concat(t,'" must be of type ').concat(r),pr.INVALID_VALUE,i)||this}return r(t,e),t}(gr),_r=function(e){function t(t,r){return e.call(this,'The intl string context variable "'.concat(t,'" was not provided to the string "').concat(r,'"'),pr.MISSING_VALUE,r)||this}return r(t,e),t}(gr);function yr(e){return"function"==typeof e}function Er(e,t,r,i,s,n,o){if(1===e.length&&nt(e[0]))return[{type:fr.literal,value:e[0].value}];for(var a=[],l=0,h=e;l<h.length;l++){var c=h[l];if(nt(c))a.push({type:fr.literal,value:c.value});else if(pt(c))"number"==typeof n&&a.push({type:fr.literal,value:r.getNumberFormat(t).format(n)});else{var u=c.value;if(!s||!(u in s))throw new _r(u,o);var p=s[u];if(ot(c))p&&"string"!=typeof p&&"number"!=typeof p||(p="string"==typeof p||"number"==typeof p?String(p):""),a.push({type:"string"==typeof p?fr.literal:fr.object,value:p});else if(lt(c)){var d="string"==typeof c.style?i.date[c.style]:ft(c.style)?c.style.parsedOptions:void 0;a.push({type:fr.literal,value:r.getDateTimeFormat(t,d).format(p)})}else if(ht(c)){d="string"==typeof c.style?i.time[c.style]:ft(c.style)?c.style.parsedOptions:i.time.medium;a.push({type:fr.literal,value:r.getDateTimeFormat(t,d).format(p)})}else if(at(c)){(d="string"==typeof c.style?i.number[c.style]:mt(c.style)?c.style.parsedOptions:void 0)&&d.scale&&(p*=d.scale||1),a.push({type:fr.literal,value:r.getNumberFormat(t,d).format(p)})}else{if(dt(c)){var m=c.children,f=c.value,g=s[f];if(!yr(g))throw new vr(f,"function",o);var b=g(Er(m,t,r,i,s,n).map((function(e){return e.value})));Array.isArray(b)||(b=[b]),a.push.apply(a,b.map((function(e){return{type:"string"==typeof e?fr.literal:fr.object,value:e}})))}if(ct(c)){if(!(v=c.options[p]||c.options.other))throw new br(c.value,p,Object.keys(c.options),o);a.push.apply(a,Er(v.value,t,r,i,s))}else if(ut(c)){var v;if(!(v=c.options["=".concat(p)])){if(!Intl.PluralRules)throw new gr('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n',pr.MISSING_INTL_API,o);var _=r.getPluralRules(t,{type:c.pluralType}).select(p-(c.offset||0));v=c.options[_]||c.options.other}if(!v)throw new br(c.value,p,Object.keys(c.options),o);a.push.apply(a,Er(v.value,t,r,i,s,p-(c.offset||0)))}else;}}}return function(e){return e.length<2?e:e.reduce((function(e,t){var r=e[e.length-1];return r&&r.type===fr.literal&&t.type===fr.literal?r.value+=t.value:e.push(t),e}),[])}(a)}function Ar(e,t){return t?Object.keys(e).reduce((function(r,s){var n,o;return r[s]=(n=e[s],(o=t[s])?i(i(i({},n||{}),o||{}),Object.keys(n).reduce((function(e,t){return e[t]=i(i({},n[t]),o[t]||{}),e}),{})):n),r}),i({},e)):e}function wr(e){return{create:function(){return{get:function(t){return e[t]},set:function(t,r){e[t]=r}}}}}!function(e){e[e.literal=0]="literal",e[e.object=1]="object"}(fr||(fr={}));var Hr=function(){function e(t,r,s,o){var a,l=this;if(void 0===r&&(r=e.defaultLocale),this.formatterCache={number:{},dateTime:{},pluralRules:{}},this.format=function(e){var t=l.formatToParts(e);if(1===t.length)return t[0].value;var r=t.reduce((function(e,t){return e.length&&t.type===fr.literal&&"string"==typeof e[e.length-1]?e[e.length-1]+=t.value:e.push(t.value),e}),[]);return r.length<=1?r[0]||"":r},this.formatToParts=function(e){return Er(l.ast,l.locales,l.formatters,l.formats,e,void 0,l.message)},this.resolvedOptions=function(){var e;return{locale:(null===(e=l.resolvedLocale)||void 0===e?void 0:e.toString())||Intl.NumberFormat.supportedLocalesOf(l.locales)[0]}},this.getAst=function(){return l.ast},this.locales=r,this.resolvedLocale=e.resolveLocale(r),"string"==typeof t){if(this.message=t,!e.__parse)throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");var h=o||{};h.formatters;var c=function(e,t){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(r[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(i=Object.getOwnPropertySymbols(e);s<i.length;s++)t.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(e,i[s])&&(r[i[s]]=e[i[s]])}return r}(h,["formatters"]);this.ast=e.__parse(t,i(i({},c),{locale:this.resolvedLocale}))}else this.ast=t;if(!Array.isArray(this.ast))throw new TypeError("A message must be provided as a String or AST.");this.formats=Ar(e.formats,s),this.formatters=o&&o.formatters||(void 0===(a=this.formatterCache)&&(a={number:{},dateTime:{},pluralRules:{}}),{getNumberFormat:nr((function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new((e=Intl.NumberFormat).bind.apply(e,n([void 0],t,!1)))}),{cache:wr(a.number),strategy:mr.variadic}),getDateTimeFormat:nr((function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new((e=Intl.DateTimeFormat).bind.apply(e,n([void 0],t,!1)))}),{cache:wr(a.dateTime),strategy:mr.variadic}),getPluralRules:nr((function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new((e=Intl.PluralRules).bind.apply(e,n([void 0],t,!1)))}),{cache:wr(a.pluralRules),strategy:mr.variadic})})}return Object.defineProperty(e,"defaultLocale",{get:function(){return e.memoizedDefaultLocale||(e.memoizedDefaultLocale=(new Intl.NumberFormat).resolvedOptions().locale),e.memoizedDefaultLocale},enumerable:!1,configurable:!0}),e.memoizedDefaultLocale=null,e.resolveLocale=function(e){if(void 0!==Intl.Locale){var t=Intl.NumberFormat.supportedLocalesOf(e);return t.length>0?new Intl.Locale(t[0]):new Intl.Locale("string"==typeof e?e:e[0])}},e.__parse=sr,e.formats={number:{integer:{maximumFractionDigits:0},currency:{style:"currency"},percent:{style:"percent"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}},e}(),$r=Hr;const Tr={en:qe,nl:st};function Sr(e,t,...r){const i=t.replace(/['"]+/g,"");let s;try{s=e.split(".").reduce(((e,t)=>e[t]),Tr[i])}catch(t){s=e.split(".").reduce(((e,t)=>e[t]),Tr.en)}if(void 0===s&&(s=e.split(".").reduce(((e,t)=>e[t]),Tr.en)),!r.length)return s;const n={};for(let e=0;e<r.length;e+=2){let t=r[e];t=t.replace(/^{([^}]+)?}$/,"$1"),n[t]=r[e+1]}try{return new $r(s,t).format(n)}catch(e){return"Translation "+e}}let Br=class extends(Ne(he)){constructor(){super(...arguments),this.probes=[],this.presets=[],this.state_update_settings=[],this.sensors=[]}firstUpdated(){(async()=>{await ye()})()}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage((()=>this._fetchData()),{type:Ee+"_config_updated"})]}async _fetchData(){var e;this.hass&&(this.config=await Ce(this.hass),this.probes=await(e=this.hass,e.callWS({type:Ee+"/probes"})),this.presets=await(e=>e.callWS({type:Ee+"/presets"}))(this.hass),this.state_update_settings=await(e=>e.callWS({type:Ee+"/stateupdatesettings"}))(this.hass))}handleAddProbe(){const e={probe_id:this.probes.length,probe_name:this.nameInput.value,probe_source:this.sourceInput.value,probe_source_type:Pe,probe_preset:void 0};this.probes=[...this.probes,e],this.saveToHA(e)}handleEditProbe(e,t){this.hass&&(this.probes=Object.values(this.probes).map(((r,i)=>i===e?t:r)),this.saveToHA(t))}handleRemoveProbe(e,t){if(!this.hass)return;const r=Object.values(this.probes).at(t);var i,s;r&&(this.probes=this.probes.filter(((e,r)=>r!==t)),this.hass&&(i=this.hass,s=r.probe_id.toString(),i.callApi("POST",Ee+"/probes",{probe_id:s,remove:!0})))}saveToHA(e){var t,r;this.hass&&(e.probe_source in this.hass.states?(t=this.hass,r=e,t.callApi("POST",Ee+"/probes",r)):Ie({body:{message:Sr("panels.probes.errors.source_does_not_exist",this.hass.language)},error:Sr("panels.probes.errors.invalid_source",this.hass.language)},this.shadowRoot.querySelector("ha-card")))}renderTheOptions(e,t){if(this.hass){let r=F`<option value="" ?selected=${void 0===t}">---${Sr("common.labels.select",this.hass.language)}---</option>`;return Object.entries(e).map((([e,i])=>r=F`${r}
            <option
              value="${i.preset_id}"
              ?selected="${t===i.preset_id}"
            >
              ${Ge(i.preset_icon)} ${i.preset_name}
              (${function(e,t){if(null!=t)return e.units!=Oe?Math.round(10*(1.8*t+32))/10:t}(this.config,i.preset_target_temperature)}
              ${Re(this.config)})
            </option>`)),r}return F``}renderTheUpdateStatusWhenOptions(e,t){if(this.hass){let r=F`<option value="" ?selected=${void 0===t}">---${Sr("common.labels.select",this.hass.language)}---</option>`;return Object.entries(e).map((([e,i])=>r=F`${r}
            <option
              value="${i.stateupdatesetting_id}"
              ?selected="${t===i.stateupdatesetting_id}"
            >
              ${i.stateupdatesetting_name}
            </option>`)),r}return F``}renderProbe(e,t){if(this.hass){let r=F``;const i=e.probe_source_type===Pe;return r=i?F`
          <div class="probeline">
            <label for="probe_preset${t}"
              >${Sr("panels.probes.labels.preset",this.hass.language)}:</label
            >
            <select
              id="probe_preset${t}"
              @change="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[He]:parseInt(r.target.value)}))}"
            >
              ${this.renderTheOptions(this.presets,e.probe_preset)}
            </select>
          </div>
        `:F`
          <div class="probeline">
            <label for="probe_target_temperature${t}"
              >${Sr("panels.probes.labels.value",this.hass.language)}:</label
            >
            <input
              text="text"
              id="probe_target_temperature${t}"
              value="${e.probe_target_temperature}"
              @input="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[Le]:parseInt(r.target.value)}))}"
            />
          </div>
        `,F`
        <ha-card header="${e.probe_name}">
          <div class="card-content">
          </div>
          <div class="card-content">
          </div>
          <div class="card-content">
          </div>
          <div class="card-content">
            <label for="probe_name${t}"
              >${Sr("panels.probes.labels.name",this.hass.language)}:</label
            >
            <input
              id="probe_name${t}"
              type="text"
              .value="${e.probe_name}"
              @input="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[Ae]:r.target.value}))}"
            />
            <div class="probeline">
              <label for="probe_source${t}"
                >${Sr("panels.probes.labels.source",this.hass.language)}:</label
              >
              <input id="probe_source${t}" type="text"
              .value="${e.probe_source}"
              @change="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[we]:r.target.value}))}"
              />
            </div>
            <div class="probeline">
            <label for="probe_source_type${t}">${Sr("panels.probes.labels.sourcetype",this.hass.language)}:</label>
            <input type="radio" id="probe_source_type_preset${t}" value="${Pe}" name="probe_source_type${t}"
            ?checked="${i}" @change="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[Be]:r.target.value}))}"/>
              <label for="probe_source_type_preset${t}">${Sr("panels.probes.labels.sourcetypes.preset",this.hass.language)}</label>
              <input type="radio" id="probe_source_type_value${t}" value="${"source_type_value"}" name="probe_source_type${t}"
              ?checked="${!i}" @change="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[Be]:r.target.value}))}"/><label for="probe_source_type_value${t}">${Sr("panels.probes.labels.sourcetypes.value",this.hass.language)}</label>
            </div>${r}
            <div class="probeline">
      <label for="probe_lower_bound${t}">${Sr("panels.probes.labels.lower_bound",this.hass.language)}:</label><input id="probe_lower_bound${t}" class="shortinput" type = "text"
      .value="${e.probe_lower_bound}"
      @input="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[$e]:parseFloat(r.target.value)}))}"
      /> ${Re(this.config)}
      </div>
      <div class="probeline">
      <label for="probe_upper_bound${t}">${Sr("panels.probes.labels.upper_bound",this.hass.language)}:</label>
<input id="probe_upper_bound${t}" class="shortinput" type="text"
.value="${e.probe_upper_bound}"
@input="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[Te]:parseFloat(r.target.value)}))}"
/> ${Re(this.config)}
</div>
<div class="probeline">
            <label for="probe_state_update_setting${t}">${Sr("panels.probes.labels.state_update_setting",this.hass.language)}:</label>
            <select
            id="probe_state_update_setting${t}"
            @change="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[Se]:parseInt(r.target.value)}))}"
          >
            ${this.renderTheUpdateStatusWhenOptions(this.state_update_settings,e.probe_state_update_setting)}
          </select>
            </div>
            <div class="probeline">
            <svg
                style="width:24px;height:24px"
                viewBox="0 0 24 24"
                id="deleteProbe${t}"
                @click="${e=>this.handleRemoveProbe(e,t)}"
              >
                <title>
                  ${Sr("common.actions.delete",this.hass.language)}
                </title>
                <path fill="#404040" d="${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}" />
              </svg>
              </div>
        </ha-card>
      `}return F``}render(){return this.hass&&this.config?F`
        <ha-card
          header="${Sr("panels.probes.title",this.hass.language)}"
        >
          <div class="card-content">
            ${Sr("panels.probes.description",this.hass.language)}
          </div>
        </ha-card>
        <ha-card
          header="${Sr("panels.probes.cards.add-probe.header",this.hass.language)}"
        >
          <div class="card-content">
            <div class="probeline">
              <label for="nameInput"
                >${Sr("panels.probes.labels.name",this.hass.language)}:</label
              >
              <input id="nameInput" type="text" />
            </div>
            <div class="probeline">
              <label for="sourceInput"
                >${Sr("panels.probes.labels.source",this.hass.language)}:</label
              >
              <input id="sourceInput" type="text" />
            </div>

            <div class="probeline">
              <button @click="${this.handleAddProbe}">
                ${Sr("panels.probes.cards.add-probe.actions.add",this.hass.language)}
              </button>
            </div>
          </div>
        </ha-card>
        ${Object.entries(this.probes).map((([e,t])=>this.renderProbe(t,parseInt(e))))}
      `:F``}renderTheSourceOptions(e,t){if(this.hass){let r=F`<option value="" ?selected=${void 0===t}">---${Sr("common.labels.select",this.hass.language)}---</option>`;return Object.entries(e).map((([e,i])=>r=F`${r}
            <option
              value="${i.name}"
              ?selected="${t===i.name}"
            >
              ${i.name}
            </option>`)),r}return F``}static get styles(){return u`
      ${xe}
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
    `}};s([me()],Br.prototype,"config",void 0),s([me({type:Array})],Br.prototype,"probes",void 0),s([me({type:Array})],Br.prototype,"presets",void 0),s([me({type:Array})],Br.prototype,"state_update_settings",void 0),s([me({type:Array})],Br.prototype,"sensors",void 0),s([fe("#nameInput")],Br.prototype,"nameInput",void 0),s([fe("#sourceInput")],Br.prototype,"sourceInput",void 0),Br=s([ue("grill-buddy-view-probes")],Br);const Pr=()=>{const e=e=>{let t={};for(let r=0;r<e.length;r+=2){const i=e[r],s=r<e.length?e[r+1]:void 0;t=Object.assign(Object.assign({},t),{[i]:s})}return t},t=window.location.pathname.split("/");let r={page:t[2]||"probes",params:{}};if(t.length>3){let i=t.slice(3);if(t.includes("filter")){const t=i.findIndex((e=>"filter"==e)),s=i.slice(t+1);i=i.slice(0,t),r=Object.assign(Object.assign({},r),{filter:e(s)})}i.length&&(i.length%2&&(r=Object.assign(Object.assign({},r),{subpage:i.shift()})),i.length&&(r=Object.assign(Object.assign({},r),{params:e(i)})))}return r};e.GrillBuddyPanel=class extends he{async firstUpdated(){window.addEventListener("location-changed",(()=>{window.location.pathname.includes("grill-buddy")&&this.requestUpdate()})),await ye(),this.requestUpdate()}render(){if(!customElements.get("ha-panel-config"))return F` loading... `;const e=Pr();return F`
      <div class="header">
        <div class="toolbar">
          <ha-menu-button
            .hass=${this.hass}
            .narrow=${this.narrow}
          ></ha-menu-button>
          <div class="main-title">${Sr("title",this.hass.language)}</div>
          <div class="version">${"v2024.5.5"}</div>
        </div>

        <ha-tabs
          scrollable
          attr-for-selected="page-name"
          .selected=${e.page}
          @iron-activate=${this.handlePageSelected}
        >
          <paper-tab page-name="probes">
            ${Sr("panels.probes.title",this.hass.language)}
          </paper-tab>
          <paper-tab page-name="help"
            >${Sr("panels.help.title",this.hass.language)}</paper-tab
          >
        </ha-tabs>
      </div>
      <div class="view">${this.getView(e)}</div>
    `}getView(e){switch(e.page){case"probes":return F`
          <grill-buddy-view-probes
            .hass=${this.hass}
            .narrow=${this.narrow}
            .path=${e}
          ></grill-buddy-view-probes>
        `;case"help":return F`<ha-card
          header="${Sr("panels.help.cards.how-to-get-help.title",this.hass.language)}"
        >
          <div class="card-content">
            ${Sr("panels.help.cards.how-to-get-help.first-read-the",this.hass.language)}
            <a href="https://github.com/jeroenterheerdt/grillbuddy/"
              >${Sr("panels.help.cards.how-to-get-help.readme",this.hass.language)}</a
            >.
            ${Sr("panels.help.cards.how-to-get-help.if-you-still-need-help",this.hass.language)}
            <a
              href="https://community.home-assistant.io/t/grill-buddy-your-grilling-companion"
              >${Sr("panels.help.cards.how-to-get-help.community-forum",this.hass.language)}</a
            >
            ${Sr("panels.help.cards.how-to-get-help.or-open-a",this.hass.language)}
            <a href="https://github.com/jeroenterheerdt/grillbuddy/issues"
              >${Sr("panels.help.cards.how-to-get-help.github-issue",this.hass.language)}</a
            >
            (${Sr("panels.help.cards.how-to-get-help.english-only",this.hass.language)}).
          </div></ha-card
        >`;default:return F`
          <ha-card header="Page not found">
            <div class="card-content">
              The page you are trying to reach cannot be found. Please select a
              page from the menu above to continue.
            </div>
          </ha-card>
        `}}handlePageSelected(e){const t=e.detail.item.getAttribute("page-name");t!==Pr().page?(!function(e,t,r){void 0===r&&(r=!1),r?history.replaceState(null,"",t):history.pushState(null,"",t),_e(window,"location-changed",{replace:r})}(0,((e,...t)=>{let r={page:e,params:{}};t.forEach((e=>{"string"==typeof e?r=Object.assign(Object.assign({},r),{subpage:e}):"params"in e?r=Object.assign(Object.assign({},r),{params:e.params}):"filter"in e&&(r=Object.assign(Object.assign({},r),{filter:e.filter}))}));const i=e=>{let t=Object.keys(e);t=t.filter((t=>e[t])),t.sort();let r="";return t.forEach((t=>{const i=e[t];r=r.length?`${r}/${t}/${i}`:`${t}/${i}`})),r};let s=`/${Ee}/${r.page}`;return r.subpage&&(s=`${s}/${r.subpage}`),i(r.params).length&&(s=`${s}/${i(r.params)}`),r.filter&&(s=`${s}/filter/${i(r.filter)}`),s})(t)),this.requestUpdate()):scrollTo(0,0)}static get styles(){return u`
      ${xe} :host {
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
    `}},s([me()],e.GrillBuddyPanel.prototype,"hass",void 0),s([me({type:Boolean,reflect:!0})],e.GrillBuddyPanel.prototype,"narrow",void 0),e.GrillBuddyPanel=s([ue("grill-buddy")],e.GrillBuddyPanel);let Lr=class extends he{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?F`
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
            <span class="errortitle">
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
    `:F``}static get styles(){return u`
      div.wrapper {
        color: var(--primary-text-color);
      }
      span.errortitle {
        font-size: 2em;
        font-weight: bold;
        vertical-align: bottom;
      }
    `}};s([me({attribute:!1})],Lr.prototype,"hass",void 0),s([function(e){return me({...e,state:!0})}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */()],Lr.prototype,"_params",void 0),Lr=s([ue("error-dialog")],Lr);var Or=Object.freeze({__proto__:null,get ErrorDialog(){return Lr}});Object.defineProperty(e,"__esModule",{value:!0})}({});
