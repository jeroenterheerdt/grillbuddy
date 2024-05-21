!function(e){"use strict";var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},t(e,r)};function r(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function i(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}var i=function(){return i=Object.assign||function(e){for(var t,r=1,i=arguments.length;r<i;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},i.apply(this,arguments)};function n(e,t,r,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(s<3?n(o):s>3?n(t,r,o):n(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}function s(e,t,r){if(r||2===arguments.length)for(var i,n=0,s=t.length;n<s;n++)!i&&n in t||(i||(i=Array.prototype.slice.call(t,0,n)),i[n]=t[n]);return e.concat(i||Array.prototype.slice.call(t))}"function"==typeof SuppressedError&&SuppressedError;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const o=window,a=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,l=Symbol(),h=new WeakMap;class c{constructor(e,t,r){if(this._$cssResult$=!0,r!==l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(a&&void 0===e){const r=void 0!==t&&1===t.length;r&&(e=h.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&h.set(t,e))}return e}toString(){return this.cssText}}const u=(e,...t)=>{const r=1===e.length?e[0]:t.reduce(((t,r,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[i+1]),e[0]);return new c(r,e,l)},d=a?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return(e=>new c("string"==typeof e?e:e+"",void 0,l))(t)})(e):e
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var p;const m=window,g=m.trustedTypes,f=g?g.emptyScript:"",b=m.reactiveElementPolyfillSupport,v={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch(e){r=null}}return r}},y=(e,t)=>t!==e&&(t==t||e==e),_={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},E="finalized";class A extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,r)=>{const i=this._$Ep(r,t);void 0!==i&&(this._$Ev.set(i,r),e.push(i))})),e}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const r="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,r,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(i){const n=this[e];this[t]=i,this.requestUpdate(e,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||_}static finalize(){if(this.hasOwnProperty(E))return!1;this[E]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const r of t)this.createProperty(r,e[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const e of r)t.unshift(d(e))}else void 0!==e&&t.push(d(e));return t}static _$Ep(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,r;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(r=e.hostConnected)||void 0===r||r.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{a?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const r=document.createElement("style"),i=o.litNonce;void 0!==i&&r.setAttribute("nonce",i),r.textContent=t.cssText,e.appendChild(r)}))})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$EO(e,t,r=_){var i;const n=this.constructor._$Ep(e,r);if(void 0!==n&&!0===r.reflect){const s=(void 0!==(null===(i=r.converter)||void 0===i?void 0:i.toAttribute)?r.converter:v).toAttribute(t,r.type);this._$El=e,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(e,t){var r;const i=this.constructor,n=i._$Ev.get(e);if(void 0!==n&&this._$El!==n){const e=i.getPropertyOptions(n),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(r=e.converter)||void 0===r?void 0:r.fromAttribute)?e.converter:v;this._$El=n,this[n]=s.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,r){let i=!0;void 0!==e&&(((r=r||this.constructor.getPropertyOptions(e)).hasChanged||y)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===r.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,r))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(r)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(r)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var w;A[E]=!0,A.elementProperties=new Map,A.elementStyles=[],A.shadowRootOptions={mode:"open"},null==b||b({ReactiveElement:A}),(null!==(p=m.reactiveElementVersions)&&void 0!==p?p:m.reactiveElementVersions=[]).push("1.6.3");const H=window,T=H.trustedTypes,S=T?T.createPolicy("lit-html",{createHTML:e=>e}):void 0,$="$lit$",B=`lit$${(Math.random()+"").slice(9)}$`,P="?"+B,C=`<${P}>`,L=document,O=()=>L.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,M="[ \t\n\f\r]",x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,U=/>/g,k=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,G=/"/g,j=/^(?:script|style|textarea|title)$/i,z=(e=>(t,...r)=>({_$litType$:e,strings:t,values:r}))(1),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,X=L.createTreeWalker(L,129,null,!1);function K(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Y=(e,t)=>{const r=e.length-1,i=[];let n,s=2===t?"<svg>":"",o=x;for(let t=0;t<r;t++){const r=e[t];let a,l,h=-1,c=0;for(;c<r.length&&(o.lastIndex=c,l=o.exec(r),null!==l);)c=o.lastIndex,o===x?"!--"===l[1]?o=R:void 0!==l[1]?o=U:void 0!==l[2]?(j.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=k):void 0!==l[3]&&(o=k):o===k?">"===l[0]?(o=null!=n?n:x,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?k:'"'===l[3]?G:D):o===G||o===D?o=k:o===R||o===U?o=x:(o=k,n=void 0);const u=o===k&&e[t+1].startsWith("/>")?" ":"";s+=o===x?r+C:h>=0?(i.push(a),r.slice(0,h)+$+r.slice(h)+B+u):r+B+(-2===h?(i.push(void 0),t):u)}return[K(e,s+(e[r]||"<?>")+(2===t?"</svg>":"")),i]};class Z{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let n=0,s=0;const o=e.length-1,a=this.parts,[l,h]=Y(e,t);if(this.el=Z.createElement(l,r),X.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(i=X.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes()){const e=[];for(const t of i.getAttributeNames())if(t.endsWith($)||t.startsWith(B)){const r=h[s++];if(e.push(t),void 0!==r){const e=i.getAttribute(r.toLowerCase()+$).split(B),t=/([.?@])?(.*)/.exec(r);a.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?te:"?"===t[1]?ie:"@"===t[1]?ne:ee})}else a.push({type:6,index:n})}for(const t of e)i.removeAttribute(t)}if(j.test(i.tagName)){const e=i.textContent.split(B),t=e.length-1;if(t>0){i.textContent=T?T.emptyScript:"";for(let r=0;r<t;r++)i.append(e[r],O()),X.nextNode(),a.push({type:2,index:++n});i.append(e[t],O())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:n});else{let e=-1;for(;-1!==(e=i.data.indexOf(B,e+1));)a.push({type:7,index:n}),e+=B.length-1}n++}}static createElement(e,t){const r=L.createElement("template");return r.innerHTML=e,r}}function q(e,t,r=e,i){var n,s,o,a;if(t===F)return t;let l=void 0!==i?null===(n=r._$Co)||void 0===n?void 0:n[i]:r._$Cl;const h=N(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===h?l=void 0:(l=new h(e),l._$AT(e,r,i)),void 0!==i?(null!==(o=(a=r)._$Co)&&void 0!==o?o:a._$Co=[])[i]=l:r._$Cl=l),void 0!==l&&(t=q(e,l._$AS(e,t.values),l,i)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:r},parts:i}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:L).importNode(r,!0);X.currentNode=n;let s=X.nextNode(),o=0,a=0,l=i[0];for(;void 0!==l;){if(o===l.index){let t;2===l.type?t=new Q(s,s.nextSibling,this,e):1===l.type?t=new l.ctor(s,l.name,l.strings,this,e):6===l.type&&(t=new se(s,this,e)),this._$AV.push(t),l=i[++a]}o!==(null==l?void 0:l.index)&&(s=X.nextNode(),o++)}return X.currentNode=L,n}v(e){let t=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class Q{constructor(e,t,r,i){var n;this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cp=null===(n=null==i?void 0:i.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=q(this,e,t),N(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>I(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==V&&N(this._$AH)?this._$AA.nextSibling.data=e:this.$(L.createTextNode(e)),this._$AH=e}g(e){var t;const{values:r,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.v(r);else{const e=new J(n,this),t=e.u(this.options);e.v(r),this.$(t),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new Z(e)),t}T(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,i=0;for(const n of e)i===t.length?t.push(r=new Q(this.k(O()),this.k(O()),this,this.options)):r=t[i],r._$AI(n),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var r;for(null===(r=this._$AP)||void 0===r||r.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class ee{constructor(e,t,r,i,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=V}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,r,i){const n=this.strings;let s=!1;if(void 0===n)e=q(this,e,t,0),s=!N(e)||e!==this._$AH&&e!==F,s&&(this._$AH=e);else{const i=e;let o,a;for(e=n[0],o=0;o<n.length-1;o++)a=q(this,i[r+o],t,o),a===F&&(a=this._$AH[o]),s||(s=!N(a)||a!==this._$AH[o]),a===V?e=V:e!==V&&(e+=(null!=a?a:"")+n[o+1]),this._$AH[o]=a}s&&!i&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}const re=T?T.emptyScript:"";class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){e&&e!==V?this.element.setAttribute(this.name,re):this.element.removeAttribute(this.name)}}class ne extends ee{constructor(e,t,r,i,n){super(e,t,r,i,n),this.type=5}_$AI(e,t=this){var r;if((e=null!==(r=q(this,e,t,0))&&void 0!==r?r:V)===F)return;const i=this._$AH,n=e===V&&i!==V||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==V&&(i===V||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,r;"function"==typeof this._$AH?this._$AH.call(null!==(r=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==r?r:this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){q(this,e)}}const oe=H.litHtmlPolyfillSupport;null==oe||oe(Z,Q),(null!==(w=H.litHtmlVersions)&&void 0!==w?w:H.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var ae,le;class he extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const r=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=r.firstChild),r}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,r)=>{var i,n;const s=null!==(i=null==r?void 0:r.renderBefore)&&void 0!==i?i:t;let o=s._$litPart$;if(void 0===o){const e=null!==(n=null==r?void 0:r.renderBefore)&&void 0!==n?n:null;s._$litPart$=o=new Q(t.insertBefore(O(),e),e,void 0,null!=r?r:{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return F}}he.finalized=!0,he._$litElement$=!0,null===(ae=globalThis.litElementHydrateSupport)||void 0===ae||ae.call(globalThis,{LitElement:he});const ce=globalThis.litElementPolyfillSupport;null==ce||ce({LitElement:he}),(null!==(le=globalThis.litElementVersions)&&void 0!==le?le:globalThis.litElementVersions=[]).push("3.3.3");
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
function ge(e,t){return(({finisher:e,descriptor:t})=>(r,i)=>{var n;if(void 0===i){const i=null!==(n=r.originalKey)&&void 0!==n?n:r.key,s=null!=t?{kind:"method",placement:"prototype",key:i,descriptor:t(r.key)}:{...r,key:i};return null!=e&&(s.finisher=function(t){e(t,i)}),s}{const n=r.constructor;void 0!==t&&Object.defineProperty(r,i,t(i)),null==e||e(n,i)}})({descriptor:r=>{const i={get(){var t,r;return null!==(r=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==r?r:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof r?Symbol():"__"+r;i.get=function(){var r,i;return void 0===this[t]&&(this[t]=null!==(i=null===(r=this.renderRoot)||void 0===r?void 0:r.querySelector(e))&&void 0!==i?i:null),this[t]}}return i}})}
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var fe,be,ve;null===(fe=window.HTMLSlotElement)||void 0===fe||fe.prototype.assignedElements,function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(be||(be={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(ve||(ve={}));var ye=function(e,t,r,i){i=i||{},r=null==r?{}:r;var n=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return n.detail=r,e.dispatchEvent(n),n};const _e=async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load()},Ee="grill_buddy",Ae="probe_name",we="probe_source",He="probe_preset",Te="probe_lower_bound",Se="probe_upper_bound",$e="probe_state_update_setting",Be="metric",Pe=e=>e.callWS({type:Ee+"/config"}),Ce=e=>{class t extends e{connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then((e=>e())):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return[]}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}}return n([me({attribute:!1})],t.prototype,"hass",void 0),t};function Le(e,t){!function(e,t){const r=e.hasOwnProperty("tagName")?e:e.target;ye(r,"show-dialog",{dialogTag:"error-dialog",dialogImport:()=>Promise.resolve().then((function(){return Hr})),dialogParams:{error:t}})}(t,z`
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
  `)}function Oe(e){return e.units==Be?"°C":"°F"}const Ne=u`
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
`;let Ie=class extends(Ce(he)){hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage((()=>this._fetchData()),{type:Ee+"_config_updated"})]}async _fetchData(){this.hass&&(this.config=await Pe(this.hass),this.data=this.config)}firstUpdated(){(async()=>{await _e()})()}render(){return this.hass&&this.config&&this.data?z`<h1>Barf</h1>`:z``}saveData(e){var t,r;this.hass&&this.data&&(this.data=Object.assign(Object.assign({},this.data),e),(t=this.hass,r=this.data,t.callApi("POST",Ee+"/config",r)).catch((e=>Le(e,this.shadowRoot.querySelector("ha-card")))).then())}toggleInformation(e){var t;const r=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#"+e);r&&("hidden"!=r.className?r.className="hidden":r.className="information")}static get styles(){return u`
      ${Ne}
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
    `}};n([me()],Ie.prototype,"narrow",void 0),n([me()],Ie.prototype,"path",void 0),n([me()],Ie.prototype,"data",void 0),n([me()],Ie.prototype,"config",void 0),Ie=n([ue("grill-buddy-view-general")],Ie);
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const Me=2;class xe{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */class Re extends xe{constructor(e){if(super(e),this.et=V,e.type!==Me)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===V||null==e)return this.ft=void 0,this.et=e;if(e===F)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.ft;this.et=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Re.directiveName="unsafeHTML",Re.resultType=1;const Ue=(e=>(...t)=>({_$litDirective$:e,values:t}))(Re);var ke,De,Ge,je={actions:{delete:"Delete"},labels:{module:"Module",no:"No",select:"Select",yes:"Yes"}},ze={general:{cards:{"automatic-duration-calculation":{header:"Automatic duration calculation",description:"Calculation takes collected weatherdata up to that point and updates the bucket for each automatic zone. Then, the duration is adjusted based on the new bucket value and the collected weatherdata is removed.",labels:{"auto-calc-enabled":"Automatically calculate zone durations","auto-calc-time":"Calculate at"}},"automatic-update":{errors:{"warning-update-time-on-or-after-calc-time":"Warning: weatherdata update time on or after calculation time"},header:"Automatic weather data update",description:"Collect and store weather data automatically. Weather data is required to calculate zone buckets and durations.",labels:{"auto-update-enabled":"Automatically update weather data","auto-update-delay":"Update delay","auto-update-interval":"Update sensor data every"},options:{days:"days",hours:"hours",minutes:"minutes"}},"automatic-clear":{header:"Automatic weather data pruning",description:"Automatically remove collected weatherdata at a configured time. Use this to make sure that there is no left over weatherdata from previous days. Don't remove the weatherdata before you calculate and only use this option if you expect the automatic update to collect weatherdata after you calculated for the day. Ideally, you want to prune as late in the day as possible.",labels:{"automatic-clear-enabled":"Automatically clear collected weather data","automatic-clear-time":"Clear weather data at"}}},description:"This page provides global settings.",title:"General"},probes:{title:"Probes",description:"Set up your probes here",labels:{name:"Name",source:"Source",preset:"Preset",state_update_setting:"Update state when",upper_bound:"Upper bound",lower_bound:"Lower bound"},cards:{"add-probe":{header:"Add probe",actions:{add:"Add"}}}},help:{title:"Help",cards:{"how-to-get-help":{title:"How to get help","first-read-the":"First, read the",wiki:"Wiki","if-you-still-need-help":"If you still need help reach out on the","community-forum":"Community forum","or-open-a":"or open a","github-issue":"Github Issue","english-only":"English only"}}},mappings:{cards:{"add-mapping":{actions:{add:"Add sensor group"},header:"Add sensor groups"},mapping:{aggregates:{average:"Average",first:"First",last:"Last",maximum:"Maximum",median:"Median",minimum:"Minimum",sum:"Sum"},errors:{"cannot-delete-mapping-because-zones-use-it":"You cannot delete this sensor group because there is at least one zone using it."},items:{dewpoint:"Dewpoint",evapotranspiration:"Evapotranspiration",humidity:"Humidity","maximum temperature":"Maximum temperature","minimum temperature":"Minimum temperature",precipitation:"Total precipitation",pressure:"Pressure","solar radiation":"Solar radiation",temperature:"Temperature",windspeed:"Wind speed"},pressure_types:{absolute:"absolute",relative:"relative"},"pressure-type":"Pressure is","sensor-aggregate-of-sensor-values-to-calculate":"of sensor values to calculate duration","sensor-aggregate-use-the":"Use the","sensor-entity":"Sensor entity",static_value:"Value","input-units":"Input provides values in",source:"Source",sources:{none:"None",openweathermap:"OpenWeatherMap",sensor:"Sensor",static:"Static value"}}},description:"Add one or more sensor groups that retrieve weather data from OpenWeatherMap, from sensors or a combination of these. You can map each sensor group to one or more zones",labels:{"mapping-name":"Name"},no_items:"There are no sensor group defined yet.",title:"Sensor Groups"},modules:{cards:{"add-module":{actions:{add:"Add module"},header:"Add module"},module:{errors:{"cannot-delete-module-because-zones-use-it":"You cannot delete this module because there is at least one zone using it."},labels:{configuration:"Configuration",required:"indicates a required field"},"translated-options":{DontEstimate:"Do not estimate",EstimateFromSunHours:"Estimate from sun hours",EstimateFromTemp:"Estimate from temperature"}}},description:"Add one or more modules that calculate irrigation duration. Each module comes with its own configuration and can be used to calculate duration for one or more zones.",no_items:"There are no modules defined yet.",title:"Modules"},zones:{actions:{add:"Add",calculate:"Calculate",information:"Information",update:"Update","reset-bucket":"Reset bucket"},cards:{"add-zone":{actions:{add:"Add zone"},header:"Add zone"},"zone-actions":{actions:{"calculate-all":"Calculate all zones","update-all":"Update all zones","reset-all-buckets":"Reset all buckets","clear-all-weatherdata":"Clear all weatherdata"},header:"Actions on all zones"}},description:"Specify one or more irrigation zones here. The irrigation duration is calculated per zone, depending on size, throughput, state, module and sensor group.",labels:{bucket:"Bucket",duration:"Duration","lead-time":"Lead time",mapping:"Sensor Group","maximum-duration":"Maximum duration",multiplier:"Multiplier",name:"Name",size:"Size",state:"State",states:{automatic:"Automatic",disabled:"Disabled",manual:"Manual"},throughput:"Throughput","maximum-bucket":"Maximum bucket",last_calculated:"Last calculated","data-last-updated":"Data last updated","data-number-of-data-points":"Number of data points"},no_items:"There are no zones defined yet.",title:"Zones"}},Fe="Grill Buddy",Ve={common:je,panels:ze,title:Fe},We=Object.freeze({__proto__:null,common:je,panels:ze,title:Fe,default:Ve}),Xe={actions:{delete:"Verwijderen"},labels:{module:"Module",no:"Nee",select:"Kies",yes:"Ja"}},Ke={general:{cards:{"automatic-duration-calculation":{header:"Automatische berekening van irrigatietijd",description:"Bij het berekenen wordt de verzamelde weersinformatie gebruikt om the voorraad en irrigatieduur per zone aan te passen. Daarna wordt de verzamelde weersinformatie verwijderd.",labels:{"auto-calc-enabled":"Automatisch irrigatietijd berekening voor elke zone","auto-calc-time":"Berekenen op"}},"automatic-update":{errors:{"warning-update-time-on-or-after-calc-time":"Let op: het automatisch bijwerken van weersinformatie vind plaats op of na de automatische berekening van irrigatietijd"},header:"Automatisch bijwerken van weersinformatie",description:"Verzamel en bewaar weersinformatie automatisch. Weersinformatie is nodig om vorraad en irrigatieduur per zone te berekenen.",labels:{"auto-update-enabled":"Automatisch weersinformatie bijwerken","auto-update-delay":"Vertraging","auto-update-interval":"Sensor data bijwerken elke"},options:{days:"dagen",hours:"uren",minutes:"minuten"}},"automatic-clear":{header:"Automatisch weersinformatie opruimen",description:"Verwijder weersinformatie op het ingestelde moment. Dit zorgt ervoor dat er geen weersinformatie van de vorige dag gebruikt kan worden voor berekeningen. Let op: verwijder geen weersinformatie voordat de berekening heeft plaatsgevonden. Gebruik deze optie als je verwacht dat er weersinformatie zal worden verzameld nadat de berekeningen voor de dag gedaan zijn. Verwijder weersinformatie zo laat mogelijk op de dag.",labels:{"automatic-clear-enabled":"Automatisch weersinformatie verwijderen","automatic-clear-time":"Verwijder weersinformatie om"}}},description:"Dit zijn de algemene instellingen.",title:"Algemeen"},help:{title:"Hulp",cards:{"how-to-get-help":{title:"Hulp vragen","first-read-the":"Allereerst, lees de",wiki:"Wiki","if-you-still-need-help":"Als je hierna nog steeds hulp nodig hebt, laat een bericht achter op het","community-forum":"Community forum","or-open-a":"of open een","github-issue":"Github Issue","english-only":"alleen Engels"}}},mappings:{cards:{"add-mapping":{actions:{add:"Toevoegen"},header:"Voeg sensorgroep toe"},mapping:{aggregates:{average:"Gemiddelde",first:"Eerste",last:"Laatste",maximum:"Maximum",median:"Mediaan",minimum:"Minimum",sum:"Totaal"},errors:{"cannot-delete-mapping-because-zones-use-it":"Deze sensorgroep kan niet worden verwijderd omdat er minimaal een zone gebruik van maakt."},items:{dewpoint:"Dauwpunt",evapotranspiration:"Verdamping",humidity:"Vochtigheid","maximum temperature":"Maximum temperatuur","minimum temperature":"Minimum temperatuur",precipitation:"Totale neerslag",pressure:"Druk","solar radiation":"Zonnestraling",temperature:"Temperatuur",windspeed:"Wind snelheid"},pressure_types:{absolute:"absoluut",relative:"relatief"},"pressure-type":"Druk is","sensor-aggregate-of-sensor-values-to-calculate":"van de sensor waardes om irrigatietijd te berekenen","sensor-aggregate-use-the":"Gebruik de/het","sensor-entity":"Sensor entiteit","input-units":"Invoer geeft waardes in",static_value:"Waarde",source:"Bron",sources:{none:"Geen",openweathermap:"OpenWeatherMap",sensor:"Sensor",static:"Vaste waarde"}}},description:"Voeg een of meer sensorgroepen toe die weergegevens ophalen van OpenWeatherMap, van sensoren of een combinatie. Elke sensorgroep kan worden gebruikt voor een of meerdere zones",labels:{"mapping-name":"Name"},no_items:"Er zijn nog geen sensorgroepen.",title:"Sensorgroepen"},modules:{cards:{"add-module":{actions:{add:"Toevoegen"},header:"Voeg module toe"},module:{errors:{"cannot-delete-module-because-zones-use-it":"Deze module kan niet worden verwijderd omdat er minimaal een zone gebruik van maakt."},labels:{configuration:"Instellingen",required:"verplicht veld"},"translated-options":{DontEstimate:"Niet berekenen",EstimateFromSunHours:"Gebaseerd op zon uren",EstimateFromTemp:"Gebaseerd op temperatuur"}}},description:"Voeg een of meerdere modules toe. Modules berekenen irrigatietijd. Elke module heeft zijn eigen configuratie and kan worden gebruikt voor het berekening van irrigatietijd voor een of meerdere zones.",no_items:"Er zijn nog geen modules.",title:"Modules"},zones:{actions:{add:"Toevoegen",calculate:"Bereken",information:"Informatie",update:"Bijwerken","reset-bucket":"Leeg voorraad"},cards:{"add-zone":{actions:{add:"Toevoegen"},header:"Voeg zone toe"},"zone-actions":{actions:{"calculate-all":"Bereken alle zones","update-all":"Werk alle zone data bij","reset-all-buckets":"Leeg alle voorraden","clear-all-weatherdata":"Verwijder alle weersinformatie"},header:"Acties voor alle zones"}},description:"Voeg een of meerdere zones toe. Per zone wordt de irrigatietijd berekend, afhankelijk van de afmeting, doorvoer, status, module en sensorgroep.",labels:{bucket:"Voorraad",duration:"Irrigatieduur","lead-time":"Aanlooptijd",mapping:"Sensorgroep","maximum-duration":"Maximale duur",multiplier:"Vermenigvuldiger",name:"Naam",size:"Afmeting",state:"Status",states:{automatic:"Automatisch",disabled:"Uit",manual:"Manueel"},throughput:"Doorvoer","maximum-bucket":"Maximale voorraad",last_calculated:"Berekend op","data-last-updated":"Bijgewerkt op","data-number-of-data-points":"Aantal datapunten"},no_items:"Er zijn nog geen zones.",title:"Zones"}},Ye="Grill Buddy",Ze={common:Xe,panels:Ke,title:Ye},qe=Object.freeze({__proto__:null,common:Xe,panels:Ke,title:Ye,default:Ze});function Je(e){return e.type===De.literal}function Qe(e){return e.type===De.argument}function et(e){return e.type===De.number}function tt(e){return e.type===De.date}function rt(e){return e.type===De.time}function it(e){return e.type===De.select}function nt(e){return e.type===De.plural}function st(e){return e.type===De.pound}function ot(e){return e.type===De.tag}function at(e){return!(!e||"object"!=typeof e||e.type!==Ge.number)}function lt(e){return!(!e||"object"!=typeof e||e.type!==Ge.dateTime)}!function(e){e[e.EXPECT_ARGUMENT_CLOSING_BRACE=1]="EXPECT_ARGUMENT_CLOSING_BRACE",e[e.EMPTY_ARGUMENT=2]="EMPTY_ARGUMENT",e[e.MALFORMED_ARGUMENT=3]="MALFORMED_ARGUMENT",e[e.EXPECT_ARGUMENT_TYPE=4]="EXPECT_ARGUMENT_TYPE",e[e.INVALID_ARGUMENT_TYPE=5]="INVALID_ARGUMENT_TYPE",e[e.EXPECT_ARGUMENT_STYLE=6]="EXPECT_ARGUMENT_STYLE",e[e.INVALID_NUMBER_SKELETON=7]="INVALID_NUMBER_SKELETON",e[e.INVALID_DATE_TIME_SKELETON=8]="INVALID_DATE_TIME_SKELETON",e[e.EXPECT_NUMBER_SKELETON=9]="EXPECT_NUMBER_SKELETON",e[e.EXPECT_DATE_TIME_SKELETON=10]="EXPECT_DATE_TIME_SKELETON",e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE=11]="UNCLOSED_QUOTE_IN_ARGUMENT_STYLE",e[e.EXPECT_SELECT_ARGUMENT_OPTIONS=12]="EXPECT_SELECT_ARGUMENT_OPTIONS",e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE=13]="EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE",e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE=14]="INVALID_PLURAL_ARGUMENT_OFFSET_VALUE",e[e.EXPECT_SELECT_ARGUMENT_SELECTOR=15]="EXPECT_SELECT_ARGUMENT_SELECTOR",e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR=16]="EXPECT_PLURAL_ARGUMENT_SELECTOR",e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT=17]="EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT",e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT=18]="EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT",e[e.INVALID_PLURAL_ARGUMENT_SELECTOR=19]="INVALID_PLURAL_ARGUMENT_SELECTOR",e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR=20]="DUPLICATE_PLURAL_ARGUMENT_SELECTOR",e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR=21]="DUPLICATE_SELECT_ARGUMENT_SELECTOR",e[e.MISSING_OTHER_CLAUSE=22]="MISSING_OTHER_CLAUSE",e[e.INVALID_TAG=23]="INVALID_TAG",e[e.INVALID_TAG_NAME=25]="INVALID_TAG_NAME",e[e.UNMATCHED_CLOSING_TAG=26]="UNMATCHED_CLOSING_TAG",e[e.UNCLOSED_TAG=27]="UNCLOSED_TAG"}(ke||(ke={})),function(e){e[e.literal=0]="literal",e[e.argument=1]="argument",e[e.number=2]="number",e[e.date=3]="date",e[e.time=4]="time",e[e.select=5]="select",e[e.plural=6]="plural",e[e.pound=7]="pound",e[e.tag=8]="tag"}(De||(De={})),function(e){e[e.number=0]="number",e[e.dateTime=1]="dateTime"}(Ge||(Ge={}));var ht=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,ct=/(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;function ut(e){var t={};return e.replace(ct,(function(e){var r=e.length;switch(e[0]){case"G":t.era=4===r?"long":5===r?"narrow":"short";break;case"y":t.year=2===r?"2-digit":"numeric";break;case"Y":case"u":case"U":case"r":throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");case"q":case"Q":throw new RangeError("`q/Q` (quarter) patterns are not supported");case"M":case"L":t.month=["numeric","2-digit","short","long","narrow"][r-1];break;case"w":case"W":throw new RangeError("`w/W` (week) patterns are not supported");case"d":t.day=["numeric","2-digit"][r-1];break;case"D":case"F":case"g":throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");case"E":t.weekday=4===r?"long":5===r?"narrow":"short";break;case"e":if(r<4)throw new RangeError("`e..eee` (weekday) patterns are not supported");t.weekday=["short","long","narrow","short"][r-4];break;case"c":if(r<4)throw new RangeError("`c..ccc` (weekday) patterns are not supported");t.weekday=["short","long","narrow","short"][r-4];break;case"a":t.hour12=!0;break;case"b":case"B":throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");case"h":t.hourCycle="h12",t.hour=["numeric","2-digit"][r-1];break;case"H":t.hourCycle="h23",t.hour=["numeric","2-digit"][r-1];break;case"K":t.hourCycle="h11",t.hour=["numeric","2-digit"][r-1];break;case"k":t.hourCycle="h24",t.hour=["numeric","2-digit"][r-1];break;case"j":case"J":case"C":throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");case"m":t.minute=["numeric","2-digit"][r-1];break;case"s":t.second=["numeric","2-digit"][r-1];break;case"S":case"A":throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");case"z":t.timeZoneName=r<4?"short":"long";break;case"Z":case"O":case"v":case"V":case"X":case"x":throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead")}return""})),t}var dt=/[\t-\r \x85\u200E\u200F\u2028\u2029]/i;var pt=/^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,mt=/^(@+)?(\+|#+)?[rs]?$/g,gt=/(\*)(0+)|(#+)(0+)|(0+)/g,ft=/^(0+)$/;function bt(e){var t={};return"r"===e[e.length-1]?t.roundingPriority="morePrecision":"s"===e[e.length-1]&&(t.roundingPriority="lessPrecision"),e.replace(mt,(function(e,r,i){return"string"!=typeof i?(t.minimumSignificantDigits=r.length,t.maximumSignificantDigits=r.length):"+"===i?t.minimumSignificantDigits=r.length:"#"===r[0]?t.maximumSignificantDigits=r.length:(t.minimumSignificantDigits=r.length,t.maximumSignificantDigits=r.length+("string"==typeof i?i.length:0)),""})),t}function vt(e){switch(e){case"sign-auto":return{signDisplay:"auto"};case"sign-accounting":case"()":return{currencySign:"accounting"};case"sign-always":case"+!":return{signDisplay:"always"};case"sign-accounting-always":case"()!":return{signDisplay:"always",currencySign:"accounting"};case"sign-except-zero":case"+?":return{signDisplay:"exceptZero"};case"sign-accounting-except-zero":case"()?":return{signDisplay:"exceptZero",currencySign:"accounting"};case"sign-never":case"+_":return{signDisplay:"never"}}}function yt(e){var t;if("E"===e[0]&&"E"===e[1]?(t={notation:"engineering"},e=e.slice(2)):"E"===e[0]&&(t={notation:"scientific"},e=e.slice(1)),t){var r=e.slice(0,2);if("+!"===r?(t.signDisplay="always",e=e.slice(2)):"+?"===r&&(t.signDisplay="exceptZero",e=e.slice(2)),!ft.test(e))throw new Error("Malformed concise eng/scientific notation");t.minimumIntegerDigits=e.length}return t}function _t(e){var t=vt(e);return t||{}}function Et(e){for(var t={},r=0,n=e;r<n.length;r++){var s=n[r];switch(s.stem){case"percent":case"%":t.style="percent";continue;case"%x100":t.style="percent",t.scale=100;continue;case"currency":t.style="currency",t.currency=s.options[0];continue;case"group-off":case",_":t.useGrouping=!1;continue;case"precision-integer":case".":t.maximumFractionDigits=0;continue;case"measure-unit":case"unit":t.style="unit",t.unit=s.options[0].replace(/^(.*?)-/,"");continue;case"compact-short":case"K":t.notation="compact",t.compactDisplay="short";continue;case"compact-long":case"KK":t.notation="compact",t.compactDisplay="long";continue;case"scientific":t=i(i(i({},t),{notation:"scientific"}),s.options.reduce((function(e,t){return i(i({},e),_t(t))}),{}));continue;case"engineering":t=i(i(i({},t),{notation:"engineering"}),s.options.reduce((function(e,t){return i(i({},e),_t(t))}),{}));continue;case"notation-simple":t.notation="standard";continue;case"unit-width-narrow":t.currencyDisplay="narrowSymbol",t.unitDisplay="narrow";continue;case"unit-width-short":t.currencyDisplay="code",t.unitDisplay="short";continue;case"unit-width-full-name":t.currencyDisplay="name",t.unitDisplay="long";continue;case"unit-width-iso-code":t.currencyDisplay="symbol";continue;case"scale":t.scale=parseFloat(s.options[0]);continue;case"rounding-mode-floor":t.roundingMode="floor";continue;case"rounding-mode-ceiling":t.roundingMode="ceil";continue;case"rounding-mode-down":t.roundingMode="trunc";continue;case"rounding-mode-up":t.roundingMode="expand";continue;case"rounding-mode-half-even":t.roundingMode="halfEven";continue;case"rounding-mode-half-down":t.roundingMode="halfTrunc";continue;case"rounding-mode-half-up":t.roundingMode="halfExpand";continue;case"integer-width":if(s.options.length>1)throw new RangeError("integer-width stems only accept a single optional option");s.options[0].replace(gt,(function(e,r,i,n,s,o){if(r)t.minimumIntegerDigits=i.length;else{if(n&&s)throw new Error("We currently do not support maximum integer digits");if(o)throw new Error("We currently do not support exact integer digits")}return""}));continue}if(ft.test(s.stem))t.minimumIntegerDigits=s.stem.length;else if(pt.test(s.stem)){if(s.options.length>1)throw new RangeError("Fraction-precision stems only accept a single optional option");s.stem.replace(pt,(function(e,r,i,n,s,o){return"*"===i?t.minimumFractionDigits=r.length:n&&"#"===n[0]?t.maximumFractionDigits=n.length:s&&o?(t.minimumFractionDigits=s.length,t.maximumFractionDigits=s.length+o.length):(t.minimumFractionDigits=r.length,t.maximumFractionDigits=r.length),""}));var o=s.options[0];"w"===o?t=i(i({},t),{trailingZeroDisplay:"stripIfInteger"}):o&&(t=i(i({},t),bt(o)))}else if(mt.test(s.stem))t=i(i({},t),bt(s.stem));else{var a=vt(s.stem);a&&(t=i(i({},t),a));var l=yt(s.stem);l&&(t=i(i({},t),l))}}return t}var At,wt={"001":["H","h"],AC:["H","h","hb","hB"],AD:["H","hB"],AE:["h","hB","hb","H"],AF:["H","hb","hB","h"],AG:["h","hb","H","hB"],AI:["H","h","hb","hB"],AL:["h","H","hB"],AM:["H","hB"],AO:["H","hB"],AR:["H","h","hB","hb"],AS:["h","H"],AT:["H","hB"],AU:["h","hb","H","hB"],AW:["H","hB"],AX:["H"],AZ:["H","hB","h"],BA:["H","hB","h"],BB:["h","hb","H","hB"],BD:["h","hB","H"],BE:["H","hB"],BF:["H","hB"],BG:["H","hB","h"],BH:["h","hB","hb","H"],BI:["H","h"],BJ:["H","hB"],BL:["H","hB"],BM:["h","hb","H","hB"],BN:["hb","hB","h","H"],BO:["H","hB","h","hb"],BQ:["H"],BR:["H","hB"],BS:["h","hb","H","hB"],BT:["h","H"],BW:["H","h","hb","hB"],BY:["H","h"],BZ:["H","h","hb","hB"],CA:["h","hb","H","hB"],CC:["H","h","hb","hB"],CD:["hB","H"],CF:["H","h","hB"],CG:["H","hB"],CH:["H","hB","h"],CI:["H","hB"],CK:["H","h","hb","hB"],CL:["H","h","hB","hb"],CM:["H","h","hB"],CN:["H","hB","hb","h"],CO:["h","H","hB","hb"],CP:["H"],CR:["H","h","hB","hb"],CU:["H","h","hB","hb"],CV:["H","hB"],CW:["H","hB"],CX:["H","h","hb","hB"],CY:["h","H","hb","hB"],CZ:["H"],DE:["H","hB"],DG:["H","h","hb","hB"],DJ:["h","H"],DK:["H"],DM:["h","hb","H","hB"],DO:["h","H","hB","hb"],DZ:["h","hB","hb","H"],EA:["H","h","hB","hb"],EC:["H","hB","h","hb"],EE:["H","hB"],EG:["h","hB","hb","H"],EH:["h","hB","hb","H"],ER:["h","H"],ES:["H","hB","h","hb"],ET:["hB","hb","h","H"],FI:["H"],FJ:["h","hb","H","hB"],FK:["H","h","hb","hB"],FM:["h","hb","H","hB"],FO:["H","h"],FR:["H","hB"],GA:["H","hB"],GB:["H","h","hb","hB"],GD:["h","hb","H","hB"],GE:["H","hB","h"],GF:["H","hB"],GG:["H","h","hb","hB"],GH:["h","H"],GI:["H","h","hb","hB"],GL:["H","h"],GM:["h","hb","H","hB"],GN:["H","hB"],GP:["H","hB"],GQ:["H","hB","h","hb"],GR:["h","H","hb","hB"],GT:["H","h","hB","hb"],GU:["h","hb","H","hB"],GW:["H","hB"],GY:["h","hb","H","hB"],HK:["h","hB","hb","H"],HN:["H","h","hB","hb"],HR:["H","hB"],HU:["H","h"],IC:["H","h","hB","hb"],ID:["H"],IE:["H","h","hb","hB"],IL:["H","hB"],IM:["H","h","hb","hB"],IN:["h","H"],IO:["H","h","hb","hB"],IQ:["h","hB","hb","H"],IR:["hB","H"],IS:["H"],IT:["H","hB"],JE:["H","h","hb","hB"],JM:["h","hb","H","hB"],JO:["h","hB","hb","H"],JP:["H","K","h"],KE:["hB","hb","H","h"],KG:["H","h","hB","hb"],KH:["hB","h","H","hb"],KI:["h","hb","H","hB"],KM:["H","h","hB","hb"],KN:["h","hb","H","hB"],KP:["h","H","hB","hb"],KR:["h","H","hB","hb"],KW:["h","hB","hb","H"],KY:["h","hb","H","hB"],KZ:["H","hB"],LA:["H","hb","hB","h"],LB:["h","hB","hb","H"],LC:["h","hb","H","hB"],LI:["H","hB","h"],LK:["H","h","hB","hb"],LR:["h","hb","H","hB"],LS:["h","H"],LT:["H","h","hb","hB"],LU:["H","h","hB"],LV:["H","hB","hb","h"],LY:["h","hB","hb","H"],MA:["H","h","hB","hb"],MC:["H","hB"],MD:["H","hB"],ME:["H","hB","h"],MF:["H","hB"],MG:["H","h"],MH:["h","hb","H","hB"],MK:["H","h","hb","hB"],ML:["H"],MM:["hB","hb","H","h"],MN:["H","h","hb","hB"],MO:["h","hB","hb","H"],MP:["h","hb","H","hB"],MQ:["H","hB"],MR:["h","hB","hb","H"],MS:["H","h","hb","hB"],MT:["H","h"],MU:["H","h"],MV:["H","h"],MW:["h","hb","H","hB"],MX:["H","h","hB","hb"],MY:["hb","hB","h","H"],MZ:["H","hB"],NA:["h","H","hB","hb"],NC:["H","hB"],NE:["H"],NF:["H","h","hb","hB"],NG:["H","h","hb","hB"],NI:["H","h","hB","hb"],NL:["H","hB"],NO:["H","h"],NP:["H","h","hB"],NR:["H","h","hb","hB"],NU:["H","h","hb","hB"],NZ:["h","hb","H","hB"],OM:["h","hB","hb","H"],PA:["h","H","hB","hb"],PE:["H","hB","h","hb"],PF:["H","h","hB"],PG:["h","H"],PH:["h","hB","hb","H"],PK:["h","hB","H"],PL:["H","h"],PM:["H","hB"],PN:["H","h","hb","hB"],PR:["h","H","hB","hb"],PS:["h","hB","hb","H"],PT:["H","hB"],PW:["h","H"],PY:["H","h","hB","hb"],QA:["h","hB","hb","H"],RE:["H","hB"],RO:["H","hB"],RS:["H","hB","h"],RU:["H"],RW:["H","h"],SA:["h","hB","hb","H"],SB:["h","hb","H","hB"],SC:["H","h","hB"],SD:["h","hB","hb","H"],SE:["H"],SG:["h","hb","H","hB"],SH:["H","h","hb","hB"],SI:["H","hB"],SJ:["H"],SK:["H"],SL:["h","hb","H","hB"],SM:["H","h","hB"],SN:["H","h","hB"],SO:["h","H"],SR:["H","hB"],SS:["h","hb","H","hB"],ST:["H","hB"],SV:["H","h","hB","hb"],SX:["H","h","hb","hB"],SY:["h","hB","hb","H"],SZ:["h","hb","H","hB"],TA:["H","h","hb","hB"],TC:["h","hb","H","hB"],TD:["h","H","hB"],TF:["H","h","hB"],TG:["H","hB"],TH:["H","h"],TJ:["H","h"],TL:["H","hB","hb","h"],TM:["H","h"],TN:["h","hB","hb","H"],TO:["h","H"],TR:["H","hB"],TT:["h","hb","H","hB"],TW:["hB","hb","h","H"],TZ:["hB","hb","H","h"],UA:["H","hB","h"],UG:["hB","hb","H","h"],UM:["h","hb","H","hB"],US:["h","hb","H","hB"],UY:["H","h","hB","hb"],UZ:["H","hB","h"],VA:["H","h","hB"],VC:["h","hb","H","hB"],VE:["h","H","hB","hb"],VG:["h","hb","H","hB"],VI:["h","hb","H","hB"],VN:["H","h"],VU:["h","H"],WF:["H","hB"],WS:["h","H"],XK:["H","hB","h"],YE:["h","hB","hb","H"],YT:["H","hB"],ZA:["H","h","hb","hB"],ZM:["h","hb","H","hB"],ZW:["H","h"],"af-ZA":["H","h","hB","hb"],"ar-001":["h","hB","hb","H"],"ca-ES":["H","h","hB"],"en-001":["h","hb","H","hB"],"es-BO":["H","h","hB","hb"],"es-BR":["H","h","hB","hb"],"es-EC":["H","h","hB","hb"],"es-ES":["H","h","hB","hb"],"es-GQ":["H","h","hB","hb"],"es-PE":["H","h","hB","hb"],"fr-CA":["H","h","hB"],"gl-ES":["H","h","hB"],"gu-IN":["hB","hb","h","H"],"hi-IN":["hB","h","H"],"it-CH":["H","h","hB"],"it-IT":["H","h","hB"],"kn-IN":["hB","h","H"],"ml-IN":["hB","h","H"],"mr-IN":["hB","hb","h","H"],"pa-IN":["hB","hb","h","H"],"ta-IN":["hB","h","hb","H"],"te-IN":["hB","h","H"],"zu-ZA":["H","hB","hb","h"]};function Ht(e){var t=e.hourCycle;if(void 0===t&&e.hourCycles&&e.hourCycles.length&&(t=e.hourCycles[0]),t)switch(t){case"h24":return"k";case"h23":return"H";case"h12":return"h";case"h11":return"K";default:throw new Error("Invalid hourCycle")}var r,i=e.language;return"root"!==i&&(r=e.maximize().region),(wt[r||""]||wt[i||""]||wt["".concat(i,"-001")]||wt["001"])[0]}var Tt=new RegExp("^".concat(ht.source,"*")),St=new RegExp("".concat(ht.source,"*$"));function $t(e,t){return{start:e,end:t}}var Bt=!!String.prototype.startsWith&&"_a".startsWith("a",1),Pt=!!String.fromCodePoint,Ct=!!Object.fromEntries,Lt=!!String.prototype.codePointAt,Ot=!!String.prototype.trimStart,Nt=!!String.prototype.trimEnd,It=!!Number.isSafeInteger?Number.isSafeInteger:function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e&&Math.abs(e)<=9007199254740991},Mt=!0;try{Mt="a"===(null===(At=zt("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu").exec("a"))||void 0===At?void 0:At[0])}catch(R){Mt=!1}var xt,Rt=Bt?function(e,t,r){return e.startsWith(t,r)}:function(e,t,r){return e.slice(r,r+t.length)===t},Ut=Pt?String.fromCodePoint:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var r,i="",n=e.length,s=0;n>s;){if((r=e[s++])>1114111)throw RangeError(r+" is not a valid code point");i+=r<65536?String.fromCharCode(r):String.fromCharCode(55296+((r-=65536)>>10),r%1024+56320)}return i},kt=Ct?Object.fromEntries:function(e){for(var t={},r=0,i=e;r<i.length;r++){var n=i[r],s=n[0],o=n[1];t[s]=o}return t},Dt=Lt?function(e,t){return e.codePointAt(t)}:function(e,t){var r=e.length;if(!(t<0||t>=r)){var i,n=e.charCodeAt(t);return n<55296||n>56319||t+1===r||(i=e.charCodeAt(t+1))<56320||i>57343?n:i-56320+(n-55296<<10)+65536}},Gt=Ot?function(e){return e.trimStart()}:function(e){return e.replace(Tt,"")},jt=Nt?function(e){return e.trimEnd()}:function(e){return e.replace(St,"")};function zt(e,t){return new RegExp(e,t)}if(Mt){var Ft=zt("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu");xt=function(e,t){var r;return Ft.lastIndex=t,null!==(r=Ft.exec(e)[1])&&void 0!==r?r:""}}else xt=function(e,t){for(var r=[];;){var i=Dt(e,t);if(void 0===i||Kt(i)||Yt(i))break;r.push(i),t+=i>=65536?2:1}return Ut.apply(void 0,r)};var Vt=function(){function e(e,t){void 0===t&&(t={}),this.message=e,this.position={offset:0,line:1,column:1},this.ignoreTag=!!t.ignoreTag,this.locale=t.locale,this.requiresOtherClause=!!t.requiresOtherClause,this.shouldParseSkeletons=!!t.shouldParseSkeletons}return e.prototype.parse=function(){if(0!==this.offset())throw Error("parser can only be used once");return this.parseMessage(0,"",!1)},e.prototype.parseMessage=function(e,t,r){for(var i=[];!this.isEOF();){var n=this.char();if(123===n){if((s=this.parseArgument(e,r)).err)return s;i.push(s.val)}else{if(125===n&&e>0)break;if(35!==n||"plural"!==t&&"selectordinal"!==t){if(60===n&&!this.ignoreTag&&47===this.peek()){if(r)break;return this.error(ke.UNMATCHED_CLOSING_TAG,$t(this.clonePosition(),this.clonePosition()))}if(60===n&&!this.ignoreTag&&Wt(this.peek()||0)){if((s=this.parseTag(e,t)).err)return s;i.push(s.val)}else{var s;if((s=this.parseLiteral(e,t)).err)return s;i.push(s.val)}}else{var o=this.clonePosition();this.bump(),i.push({type:De.pound,location:$t(o,this.clonePosition())})}}}return{val:i,err:null}},e.prototype.parseTag=function(e,t){var r=this.clonePosition();this.bump();var i=this.parseTagName();if(this.bumpSpace(),this.bumpIf("/>"))return{val:{type:De.literal,value:"<".concat(i,"/>"),location:$t(r,this.clonePosition())},err:null};if(this.bumpIf(">")){var n=this.parseMessage(e+1,t,!0);if(n.err)return n;var s=n.val,o=this.clonePosition();if(this.bumpIf("</")){if(this.isEOF()||!Wt(this.char()))return this.error(ke.INVALID_TAG,$t(o,this.clonePosition()));var a=this.clonePosition();return i!==this.parseTagName()?this.error(ke.UNMATCHED_CLOSING_TAG,$t(a,this.clonePosition())):(this.bumpSpace(),this.bumpIf(">")?{val:{type:De.tag,value:i,children:s,location:$t(r,this.clonePosition())},err:null}:this.error(ke.INVALID_TAG,$t(o,this.clonePosition())))}return this.error(ke.UNCLOSED_TAG,$t(r,this.clonePosition()))}return this.error(ke.INVALID_TAG,$t(r,this.clonePosition()))},e.prototype.parseTagName=function(){var e=this.offset();for(this.bump();!this.isEOF()&&Xt(this.char());)this.bump();return this.message.slice(e,this.offset())},e.prototype.parseLiteral=function(e,t){for(var r=this.clonePosition(),i="";;){var n=this.tryParseQuote(t);if(n)i+=n;else{var s=this.tryParseUnquoted(e,t);if(s)i+=s;else{var o=this.tryParseLeftAngleBracket();if(!o)break;i+=o}}}var a=$t(r,this.clonePosition());return{val:{type:De.literal,value:i,location:a},err:null}},e.prototype.tryParseLeftAngleBracket=function(){return this.isEOF()||60!==this.char()||!this.ignoreTag&&(Wt(e=this.peek()||0)||47===e)?null:(this.bump(),"<");var e},e.prototype.tryParseQuote=function(e){if(this.isEOF()||39!==this.char())return null;switch(this.peek()){case 39:return this.bump(),this.bump(),"'";case 123:case 60:case 62:case 125:break;case 35:if("plural"===e||"selectordinal"===e)break;return null;default:return null}this.bump();var t=[this.char()];for(this.bump();!this.isEOF();){var r=this.char();if(39===r){if(39!==this.peek()){this.bump();break}t.push(39),this.bump()}else t.push(r);this.bump()}return Ut.apply(void 0,t)},e.prototype.tryParseUnquoted=function(e,t){if(this.isEOF())return null;var r=this.char();return 60===r||123===r||35===r&&("plural"===t||"selectordinal"===t)||125===r&&e>0?null:(this.bump(),Ut(r))},e.prototype.parseArgument=function(e,t){var r=this.clonePosition();if(this.bump(),this.bumpSpace(),this.isEOF())return this.error(ke.EXPECT_ARGUMENT_CLOSING_BRACE,$t(r,this.clonePosition()));if(125===this.char())return this.bump(),this.error(ke.EMPTY_ARGUMENT,$t(r,this.clonePosition()));var i=this.parseIdentifierIfPossible().value;if(!i)return this.error(ke.MALFORMED_ARGUMENT,$t(r,this.clonePosition()));if(this.bumpSpace(),this.isEOF())return this.error(ke.EXPECT_ARGUMENT_CLOSING_BRACE,$t(r,this.clonePosition()));switch(this.char()){case 125:return this.bump(),{val:{type:De.argument,value:i,location:$t(r,this.clonePosition())},err:null};case 44:return this.bump(),this.bumpSpace(),this.isEOF()?this.error(ke.EXPECT_ARGUMENT_CLOSING_BRACE,$t(r,this.clonePosition())):this.parseArgumentOptions(e,t,i,r);default:return this.error(ke.MALFORMED_ARGUMENT,$t(r,this.clonePosition()))}},e.prototype.parseIdentifierIfPossible=function(){var e=this.clonePosition(),t=this.offset(),r=xt(this.message,t),i=t+r.length;return this.bumpTo(i),{value:r,location:$t(e,this.clonePosition())}},e.prototype.parseArgumentOptions=function(e,t,r,n){var s,o=this.clonePosition(),a=this.parseIdentifierIfPossible().value,l=this.clonePosition();switch(a){case"":return this.error(ke.EXPECT_ARGUMENT_TYPE,$t(o,l));case"number":case"date":case"time":this.bumpSpace();var h=null;if(this.bumpIf(",")){this.bumpSpace();var c=this.clonePosition();if((v=this.parseSimpleArgStyleIfPossible()).err)return v;if(0===(m=jt(v.val)).length)return this.error(ke.EXPECT_ARGUMENT_STYLE,$t(this.clonePosition(),this.clonePosition()));h={style:m,styleLocation:$t(c,this.clonePosition())}}if((y=this.tryParseArgumentClose(n)).err)return y;var u=$t(n,this.clonePosition());if(h&&Rt(null==h?void 0:h.style,"::",0)){var d=Gt(h.style.slice(2));if("number"===a)return(v=this.parseNumberSkeletonFromString(d,h.styleLocation)).err?v:{val:{type:De.number,value:r,location:u,style:v.val},err:null};if(0===d.length)return this.error(ke.EXPECT_DATE_TIME_SKELETON,u);var p=d;this.locale&&(p=function(e,t){for(var r="",i=0;i<e.length;i++){var n=e.charAt(i);if("j"===n){for(var s=0;i+1<e.length&&e.charAt(i+1)===n;)s++,i++;var o=1+(1&s),a=s<2?1:3+(s>>1),l=Ht(t);for("H"!=l&&"k"!=l||(a=0);a-- >0;)r+="a";for(;o-- >0;)r=l+r}else r+="J"===n?"H":n}return r}(d,this.locale));var m={type:Ge.dateTime,pattern:p,location:h.styleLocation,parsedOptions:this.shouldParseSkeletons?ut(p):{}};return{val:{type:"date"===a?De.date:De.time,value:r,location:u,style:m},err:null}}return{val:{type:"number"===a?De.number:"date"===a?De.date:De.time,value:r,location:u,style:null!==(s=null==h?void 0:h.style)&&void 0!==s?s:null},err:null};case"plural":case"selectordinal":case"select":var g=this.clonePosition();if(this.bumpSpace(),!this.bumpIf(","))return this.error(ke.EXPECT_SELECT_ARGUMENT_OPTIONS,$t(g,i({},g)));this.bumpSpace();var f=this.parseIdentifierIfPossible(),b=0;if("select"!==a&&"offset"===f.value){if(!this.bumpIf(":"))return this.error(ke.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,$t(this.clonePosition(),this.clonePosition()));var v;if(this.bumpSpace(),(v=this.tryParseDecimalInteger(ke.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,ke.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE)).err)return v;this.bumpSpace(),f=this.parseIdentifierIfPossible(),b=v.val}var y,_=this.tryParsePluralOrSelectOptions(e,a,t,f);if(_.err)return _;if((y=this.tryParseArgumentClose(n)).err)return y;var E=$t(n,this.clonePosition());return"select"===a?{val:{type:De.select,value:r,options:kt(_.val),location:E},err:null}:{val:{type:De.plural,value:r,options:kt(_.val),offset:b,pluralType:"plural"===a?"cardinal":"ordinal",location:E},err:null};default:return this.error(ke.INVALID_ARGUMENT_TYPE,$t(o,l))}},e.prototype.tryParseArgumentClose=function(e){return this.isEOF()||125!==this.char()?this.error(ke.EXPECT_ARGUMENT_CLOSING_BRACE,$t(e,this.clonePosition())):(this.bump(),{val:!0,err:null})},e.prototype.parseSimpleArgStyleIfPossible=function(){for(var e=0,t=this.clonePosition();!this.isEOF();){switch(this.char()){case 39:this.bump();var r=this.clonePosition();if(!this.bumpUntil("'"))return this.error(ke.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE,$t(r,this.clonePosition()));this.bump();break;case 123:e+=1,this.bump();break;case 125:if(!(e>0))return{val:this.message.slice(t.offset,this.offset()),err:null};e-=1;break;default:this.bump()}}return{val:this.message.slice(t.offset,this.offset()),err:null}},e.prototype.parseNumberSkeletonFromString=function(e,t){var r=[];try{r=function(e){if(0===e.length)throw new Error("Number skeleton cannot be empty");for(var t=e.split(dt).filter((function(e){return e.length>0})),r=[],i=0,n=t;i<n.length;i++){var s=n[i].split("/");if(0===s.length)throw new Error("Invalid number skeleton");for(var o=s[0],a=s.slice(1),l=0,h=a;l<h.length;l++)if(0===h[l].length)throw new Error("Invalid number skeleton");r.push({stem:o,options:a})}return r}(e)}catch(e){return this.error(ke.INVALID_NUMBER_SKELETON,t)}return{val:{type:Ge.number,tokens:r,location:t,parsedOptions:this.shouldParseSkeletons?Et(r):{}},err:null}},e.prototype.tryParsePluralOrSelectOptions=function(e,t,r,i){for(var n,s=!1,o=[],a=new Set,l=i.value,h=i.location;;){if(0===l.length){var c=this.clonePosition();if("select"===t||!this.bumpIf("="))break;var u=this.tryParseDecimalInteger(ke.EXPECT_PLURAL_ARGUMENT_SELECTOR,ke.INVALID_PLURAL_ARGUMENT_SELECTOR);if(u.err)return u;h=$t(c,this.clonePosition()),l=this.message.slice(c.offset,this.offset())}if(a.has(l))return this.error("select"===t?ke.DUPLICATE_SELECT_ARGUMENT_SELECTOR:ke.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,h);"other"===l&&(s=!0),this.bumpSpace();var d=this.clonePosition();if(!this.bumpIf("{"))return this.error("select"===t?ke.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT:ke.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,$t(this.clonePosition(),this.clonePosition()));var p=this.parseMessage(e+1,t,r);if(p.err)return p;var m=this.tryParseArgumentClose(d);if(m.err)return m;o.push([l,{value:p.val,location:$t(d,this.clonePosition())}]),a.add(l),this.bumpSpace(),l=(n=this.parseIdentifierIfPossible()).value,h=n.location}return 0===o.length?this.error("select"===t?ke.EXPECT_SELECT_ARGUMENT_SELECTOR:ke.EXPECT_PLURAL_ARGUMENT_SELECTOR,$t(this.clonePosition(),this.clonePosition())):this.requiresOtherClause&&!s?this.error(ke.MISSING_OTHER_CLAUSE,$t(this.clonePosition(),this.clonePosition())):{val:o,err:null}},e.prototype.tryParseDecimalInteger=function(e,t){var r=1,i=this.clonePosition();this.bumpIf("+")||this.bumpIf("-")&&(r=-1);for(var n=!1,s=0;!this.isEOF();){var o=this.char();if(!(o>=48&&o<=57))break;n=!0,s=10*s+(o-48),this.bump()}var a=$t(i,this.clonePosition());return n?It(s*=r)?{val:s,err:null}:this.error(t,a):this.error(e,a)},e.prototype.offset=function(){return this.position.offset},e.prototype.isEOF=function(){return this.offset()===this.message.length},e.prototype.clonePosition=function(){return{offset:this.position.offset,line:this.position.line,column:this.position.column}},e.prototype.char=function(){var e=this.position.offset;if(e>=this.message.length)throw Error("out of bound");var t=Dt(this.message,e);if(void 0===t)throw Error("Offset ".concat(e," is at invalid UTF-16 code unit boundary"));return t},e.prototype.error=function(e,t){return{val:null,err:{kind:e,message:this.message,location:t}}},e.prototype.bump=function(){if(!this.isEOF()){var e=this.char();10===e?(this.position.line+=1,this.position.column=1,this.position.offset+=1):(this.position.column+=1,this.position.offset+=e<65536?1:2)}},e.prototype.bumpIf=function(e){if(Rt(this.message,e,this.offset())){for(var t=0;t<e.length;t++)this.bump();return!0}return!1},e.prototype.bumpUntil=function(e){var t=this.offset(),r=this.message.indexOf(e,t);return r>=0?(this.bumpTo(r),!0):(this.bumpTo(this.message.length),!1)},e.prototype.bumpTo=function(e){if(this.offset()>e)throw Error("targetOffset ".concat(e," must be greater than or equal to the current offset ").concat(this.offset()));for(e=Math.min(e,this.message.length);;){var t=this.offset();if(t===e)break;if(t>e)throw Error("targetOffset ".concat(e," is at invalid UTF-16 code unit boundary"));if(this.bump(),this.isEOF())break}},e.prototype.bumpSpace=function(){for(;!this.isEOF()&&Kt(this.char());)this.bump()},e.prototype.peek=function(){if(this.isEOF())return null;var e=this.char(),t=this.offset(),r=this.message.charCodeAt(t+(e>=65536?2:1));return null!=r?r:null},e}();function Wt(e){return e>=97&&e<=122||e>=65&&e<=90}function Xt(e){return 45===e||46===e||e>=48&&e<=57||95===e||e>=97&&e<=122||e>=65&&e<=90||183==e||e>=192&&e<=214||e>=216&&e<=246||e>=248&&e<=893||e>=895&&e<=8191||e>=8204&&e<=8205||e>=8255&&e<=8256||e>=8304&&e<=8591||e>=11264&&e<=12271||e>=12289&&e<=55295||e>=63744&&e<=64975||e>=65008&&e<=65533||e>=65536&&e<=983039}function Kt(e){return e>=9&&e<=13||32===e||133===e||e>=8206&&e<=8207||8232===e||8233===e}function Yt(e){return e>=33&&e<=35||36===e||e>=37&&e<=39||40===e||41===e||42===e||43===e||44===e||45===e||e>=46&&e<=47||e>=58&&e<=59||e>=60&&e<=62||e>=63&&e<=64||91===e||92===e||93===e||94===e||96===e||123===e||124===e||125===e||126===e||161===e||e>=162&&e<=165||166===e||167===e||169===e||171===e||172===e||174===e||176===e||177===e||182===e||187===e||191===e||215===e||247===e||e>=8208&&e<=8213||e>=8214&&e<=8215||8216===e||8217===e||8218===e||e>=8219&&e<=8220||8221===e||8222===e||8223===e||e>=8224&&e<=8231||e>=8240&&e<=8248||8249===e||8250===e||e>=8251&&e<=8254||e>=8257&&e<=8259||8260===e||8261===e||8262===e||e>=8263&&e<=8273||8274===e||8275===e||e>=8277&&e<=8286||e>=8592&&e<=8596||e>=8597&&e<=8601||e>=8602&&e<=8603||e>=8604&&e<=8607||8608===e||e>=8609&&e<=8610||8611===e||e>=8612&&e<=8613||8614===e||e>=8615&&e<=8621||8622===e||e>=8623&&e<=8653||e>=8654&&e<=8655||e>=8656&&e<=8657||8658===e||8659===e||8660===e||e>=8661&&e<=8691||e>=8692&&e<=8959||e>=8960&&e<=8967||8968===e||8969===e||8970===e||8971===e||e>=8972&&e<=8991||e>=8992&&e<=8993||e>=8994&&e<=9e3||9001===e||9002===e||e>=9003&&e<=9083||9084===e||e>=9085&&e<=9114||e>=9115&&e<=9139||e>=9140&&e<=9179||e>=9180&&e<=9185||e>=9186&&e<=9254||e>=9255&&e<=9279||e>=9280&&e<=9290||e>=9291&&e<=9311||e>=9472&&e<=9654||9655===e||e>=9656&&e<=9664||9665===e||e>=9666&&e<=9719||e>=9720&&e<=9727||e>=9728&&e<=9838||9839===e||e>=9840&&e<=10087||10088===e||10089===e||10090===e||10091===e||10092===e||10093===e||10094===e||10095===e||10096===e||10097===e||10098===e||10099===e||10100===e||10101===e||e>=10132&&e<=10175||e>=10176&&e<=10180||10181===e||10182===e||e>=10183&&e<=10213||10214===e||10215===e||10216===e||10217===e||10218===e||10219===e||10220===e||10221===e||10222===e||10223===e||e>=10224&&e<=10239||e>=10240&&e<=10495||e>=10496&&e<=10626||10627===e||10628===e||10629===e||10630===e||10631===e||10632===e||10633===e||10634===e||10635===e||10636===e||10637===e||10638===e||10639===e||10640===e||10641===e||10642===e||10643===e||10644===e||10645===e||10646===e||10647===e||10648===e||e>=10649&&e<=10711||10712===e||10713===e||10714===e||10715===e||e>=10716&&e<=10747||10748===e||10749===e||e>=10750&&e<=11007||e>=11008&&e<=11055||e>=11056&&e<=11076||e>=11077&&e<=11078||e>=11079&&e<=11084||e>=11085&&e<=11123||e>=11124&&e<=11125||e>=11126&&e<=11157||11158===e||e>=11159&&e<=11263||e>=11776&&e<=11777||11778===e||11779===e||11780===e||11781===e||e>=11782&&e<=11784||11785===e||11786===e||11787===e||11788===e||11789===e||e>=11790&&e<=11798||11799===e||e>=11800&&e<=11801||11802===e||11803===e||11804===e||11805===e||e>=11806&&e<=11807||11808===e||11809===e||11810===e||11811===e||11812===e||11813===e||11814===e||11815===e||11816===e||11817===e||e>=11818&&e<=11822||11823===e||e>=11824&&e<=11833||e>=11834&&e<=11835||e>=11836&&e<=11839||11840===e||11841===e||11842===e||e>=11843&&e<=11855||e>=11856&&e<=11857||11858===e||e>=11859&&e<=11903||e>=12289&&e<=12291||12296===e||12297===e||12298===e||12299===e||12300===e||12301===e||12302===e||12303===e||12304===e||12305===e||e>=12306&&e<=12307||12308===e||12309===e||12310===e||12311===e||12312===e||12313===e||12314===e||12315===e||12316===e||12317===e||e>=12318&&e<=12319||12320===e||12336===e||64830===e||64831===e||e>=65093&&e<=65094}function Zt(e){e.forEach((function(e){if(delete e.location,it(e)||nt(e))for(var t in e.options)delete e.options[t].location,Zt(e.options[t].value);else et(e)&&at(e.style)||(tt(e)||rt(e))&&lt(e.style)?delete e.style.location:ot(e)&&Zt(e.children)}))}function qt(e,t){void 0===t&&(t={}),t=i({shouldParseSkeletons:!0,requiresOtherClause:!0},t);var r=new Vt(e,t).parse();if(r.err){var n=SyntaxError(ke[r.err.kind]);throw n.location=r.err.location,n.originalMessage=r.err.message,n}return(null==t?void 0:t.captureLocation)||Zt(r.val),r.val}function Jt(e,t){var r=t&&t.cache?t.cache:or,i=t&&t.serializer?t.serializer:ir;return(t&&t.strategy?t.strategy:rr)(e,{cache:r,serializer:i})}function Qt(e,t,r,i){var n,s=null==(n=i)||"number"==typeof n||"boolean"==typeof n?i:r(i),o=t.get(s);return void 0===o&&(o=e.call(this,i),t.set(s,o)),o}function er(e,t,r){var i=Array.prototype.slice.call(arguments,3),n=r(i),s=t.get(n);return void 0===s&&(s=e.apply(this,i),t.set(n,s)),s}function tr(e,t,r,i,n){return r.bind(t,e,i,n)}function rr(e,t){return tr(e,this,1===e.length?Qt:er,t.cache.create(),t.serializer)}var ir=function(){return JSON.stringify(arguments)};function nr(){this.cache=Object.create(null)}nr.prototype.get=function(e){return this.cache[e]},nr.prototype.set=function(e,t){this.cache[e]=t};var sr,or={create:function(){return new nr}},ar={variadic:function(e,t){return tr(e,this,er,t.cache.create(),t.serializer)},monadic:function(e,t){return tr(e,this,Qt,t.cache.create(),t.serializer)}};!function(e){e.MISSING_VALUE="MISSING_VALUE",e.INVALID_VALUE="INVALID_VALUE",e.MISSING_INTL_API="MISSING_INTL_API"}(sr||(sr={}));var lr,hr=function(e){function t(t,r,i){var n=e.call(this,t)||this;return n.code=r,n.originalMessage=i,n}return r(t,e),t.prototype.toString=function(){return"[formatjs Error: ".concat(this.code,"] ").concat(this.message)},t}(Error),cr=function(e){function t(t,r,i,n){return e.call(this,'Invalid values for "'.concat(t,'": "').concat(r,'". Options are "').concat(Object.keys(i).join('", "'),'"'),sr.INVALID_VALUE,n)||this}return r(t,e),t}(hr),ur=function(e){function t(t,r,i){return e.call(this,'Value for "'.concat(t,'" must be of type ').concat(r),sr.INVALID_VALUE,i)||this}return r(t,e),t}(hr),dr=function(e){function t(t,r){return e.call(this,'The intl string context variable "'.concat(t,'" was not provided to the string "').concat(r,'"'),sr.MISSING_VALUE,r)||this}return r(t,e),t}(hr);function pr(e){return"function"==typeof e}function mr(e,t,r,i,n,s,o){if(1===e.length&&Je(e[0]))return[{type:lr.literal,value:e[0].value}];for(var a=[],l=0,h=e;l<h.length;l++){var c=h[l];if(Je(c))a.push({type:lr.literal,value:c.value});else if(st(c))"number"==typeof s&&a.push({type:lr.literal,value:r.getNumberFormat(t).format(s)});else{var u=c.value;if(!n||!(u in n))throw new dr(u,o);var d=n[u];if(Qe(c))d&&"string"!=typeof d&&"number"!=typeof d||(d="string"==typeof d||"number"==typeof d?String(d):""),a.push({type:"string"==typeof d?lr.literal:lr.object,value:d});else if(tt(c)){var p="string"==typeof c.style?i.date[c.style]:lt(c.style)?c.style.parsedOptions:void 0;a.push({type:lr.literal,value:r.getDateTimeFormat(t,p).format(d)})}else if(rt(c)){p="string"==typeof c.style?i.time[c.style]:lt(c.style)?c.style.parsedOptions:i.time.medium;a.push({type:lr.literal,value:r.getDateTimeFormat(t,p).format(d)})}else if(et(c)){(p="string"==typeof c.style?i.number[c.style]:at(c.style)?c.style.parsedOptions:void 0)&&p.scale&&(d*=p.scale||1),a.push({type:lr.literal,value:r.getNumberFormat(t,p).format(d)})}else{if(ot(c)){var m=c.children,g=c.value,f=n[g];if(!pr(f))throw new ur(g,"function",o);var b=f(mr(m,t,r,i,n,s).map((function(e){return e.value})));Array.isArray(b)||(b=[b]),a.push.apply(a,b.map((function(e){return{type:"string"==typeof e?lr.literal:lr.object,value:e}})))}if(it(c)){if(!(v=c.options[d]||c.options.other))throw new cr(c.value,d,Object.keys(c.options),o);a.push.apply(a,mr(v.value,t,r,i,n))}else if(nt(c)){var v;if(!(v=c.options["=".concat(d)])){if(!Intl.PluralRules)throw new hr('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n',sr.MISSING_INTL_API,o);var y=r.getPluralRules(t,{type:c.pluralType}).select(d-(c.offset||0));v=c.options[y]||c.options.other}if(!v)throw new cr(c.value,d,Object.keys(c.options),o);a.push.apply(a,mr(v.value,t,r,i,n,d-(c.offset||0)))}else;}}}return function(e){return e.length<2?e:e.reduce((function(e,t){var r=e[e.length-1];return r&&r.type===lr.literal&&t.type===lr.literal?r.value+=t.value:e.push(t),e}),[])}(a)}function gr(e,t){return t?Object.keys(e).reduce((function(r,n){var s,o;return r[n]=(s=e[n],(o=t[n])?i(i(i({},s||{}),o||{}),Object.keys(s).reduce((function(e,t){return e[t]=i(i({},s[t]),o[t]||{}),e}),{})):s),r}),i({},e)):e}function fr(e){return{create:function(){return{get:function(t){return e[t]},set:function(t,r){e[t]=r}}}}}!function(e){e[e.literal=0]="literal",e[e.object=1]="object"}(lr||(lr={}));var br=function(){function e(t,r,n,o){var a,l=this;if(void 0===r&&(r=e.defaultLocale),this.formatterCache={number:{},dateTime:{},pluralRules:{}},this.format=function(e){var t=l.formatToParts(e);if(1===t.length)return t[0].value;var r=t.reduce((function(e,t){return e.length&&t.type===lr.literal&&"string"==typeof e[e.length-1]?e[e.length-1]+=t.value:e.push(t.value),e}),[]);return r.length<=1?r[0]||"":r},this.formatToParts=function(e){return mr(l.ast,l.locales,l.formatters,l.formats,e,void 0,l.message)},this.resolvedOptions=function(){var e;return{locale:(null===(e=l.resolvedLocale)||void 0===e?void 0:e.toString())||Intl.NumberFormat.supportedLocalesOf(l.locales)[0]}},this.getAst=function(){return l.ast},this.locales=r,this.resolvedLocale=e.resolveLocale(r),"string"==typeof t){if(this.message=t,!e.__parse)throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");var h=o||{};h.formatters;var c=function(e,t){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(r[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(i=Object.getOwnPropertySymbols(e);n<i.length;n++)t.indexOf(i[n])<0&&Object.prototype.propertyIsEnumerable.call(e,i[n])&&(r[i[n]]=e[i[n]])}return r}(h,["formatters"]);this.ast=e.__parse(t,i(i({},c),{locale:this.resolvedLocale}))}else this.ast=t;if(!Array.isArray(this.ast))throw new TypeError("A message must be provided as a String or AST.");this.formats=gr(e.formats,n),this.formatters=o&&o.formatters||(void 0===(a=this.formatterCache)&&(a={number:{},dateTime:{},pluralRules:{}}),{getNumberFormat:Jt((function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new((e=Intl.NumberFormat).bind.apply(e,s([void 0],t,!1)))}),{cache:fr(a.number),strategy:ar.variadic}),getDateTimeFormat:Jt((function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new((e=Intl.DateTimeFormat).bind.apply(e,s([void 0],t,!1)))}),{cache:fr(a.dateTime),strategy:ar.variadic}),getPluralRules:Jt((function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new((e=Intl.PluralRules).bind.apply(e,s([void 0],t,!1)))}),{cache:fr(a.pluralRules),strategy:ar.variadic})})}return Object.defineProperty(e,"defaultLocale",{get:function(){return e.memoizedDefaultLocale||(e.memoizedDefaultLocale=(new Intl.NumberFormat).resolvedOptions().locale),e.memoizedDefaultLocale},enumerable:!1,configurable:!0}),e.memoizedDefaultLocale=null,e.resolveLocale=function(e){if(void 0!==Intl.Locale){var t=Intl.NumberFormat.supportedLocalesOf(e);return t.length>0?new Intl.Locale(t[0]):new Intl.Locale("string"==typeof e?e:e[0])}},e.__parse=qt,e.formats={number:{integer:{maximumFractionDigits:0},currency:{style:"currency"},percent:{style:"percent"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}},e}(),vr=br;const yr={en:We,nl:qe};function _r(e,t,...r){const i=t.replace(/['"]+/g,"");let n;try{n=e.split(".").reduce(((e,t)=>e[t]),yr[i])}catch(t){n=e.split(".").reduce(((e,t)=>e[t]),yr.en)}if(void 0===n&&(n=e.split(".").reduce(((e,t)=>e[t]),yr.en)),!r.length)return n;const s={};for(let e=0;e<r.length;e+=2){let t=r[e];t=t.replace(/^{([^}]+)?}$/,"$1"),s[t]=r[e+1]}try{return new vr(n,t).format(s)}catch(e){return"Translation "+e}}let Er=class extends(Ce(he)){constructor(){super(...arguments),this.probes=[],this.presets=[],this.state_update_settings=[],this.sensors=[]}firstUpdated(){(async()=>{await _e()})()}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage((()=>this._fetchData()),{type:Ee+"_config_updated"})]}async _fetchData(){var e;this.hass&&(this.config=await Pe(this.hass),this.probes=await(e=this.hass,e.callWS({type:Ee+"/probes"})),this.presets=await(e=>e.callWS({type:Ee+"/presets"}))(this.hass),this.state_update_settings=await(e=>e.callWS({type:Ee+"/stateupdatesettings"}))(this.hass),this.sensors=await(e=>e.callWS({type:Ee+"/sensor"}))(this.hass))}handleAddProbe(){const e={probe_id:this.probes.length,probe_name:this.nameInput.value,probe_source:this.sourceInput.value,probe_preset:void 0};this.probes=[...this.probes,e],this.saveToHA(e)}handleEditProbe(e,t){this.hass&&(this.probes=Object.values(this.probes).map(((r,i)=>i===e?t:r)),this.saveToHA(t))}handleRemoveProbe(e,t){if(!this.hass)return;const r=Object.values(this.probes).at(t);var i,n;r&&(this.probes=this.probes.filter(((e,r)=>r!==t)),this.hass&&(i=this.hass,n=r.probe_id.toString(),i.callApi("POST",Ee+"/probes",{id:n,remove:!0})))}saveToHA(e){var t,r;this.hass&&(t=this.hass,r=e,console.log(r),t.callApi("POST",Ee+"/probes",r))}renderTheOptions(e,t){if(this.hass){let r=z`<option value="" ?selected=${void 0===t}">---${_r("common.labels.select",this.hass.language)}---</option>`;return Object.entries(e).map((([e,i])=>r=z`${r}
            <option
              value="${i.preset_id}"
              ?selected="${t===i.preset_id}"
            >
              ${Ue(i.preset_icon)} ${i.preset_name}
              (${function(e,t){if(null!=t)return e.units!=Be?Math.round(10*(1.8*t+32))/10:t}(this.config,i.preset_target_temperature)}
              ${Oe(this.config)})
            </option>`)),r}return z``}renderTheUpdateStatusWhenOptions(e,t){if(this.hass){let r=z`<option value="" ?selected=${void 0===t}">---${_r("common.labels.select",this.hass.language)}---</option>`;return Object.entries(e).map((([e,i])=>r=z`${r}
            <option
              value="${i.stateupdatesetting_id}"
              ?selected="${t===i.stateupdatesetting_id}"
            >
              ${i.stateupdatesetting_name}
            </option>`)),r}return z``}renderProbe(e,t){return this.hass?z`
        <ha-card header="${e.probe_name}">
          <div class="card-content">
          </div>
          <div class="card-content">
          </div>
          <div class="card-content">
          </div>
          <div class="card-content">
            <label for="probe_name${t}"
              >${_r("panels.probes.labels.name",this.hass.language)}:</label
            >
            <input
              id="probe_name${t}"
              type="text"
              .value="${e.probe_name}"
              @input="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[Ae]:r.target.value}))}"
            />
            <div class="probeline">
              <label for="probe_source${t}"
                >${_r("panels.probes.labels.source",this.hass.language)}:</label
              >
              <select id="probe_source${t}"
              .value="${e.probe_source}"
              @change="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[we]:r.target.value}))}"
              >
              ${this.renderTheSourceOptions(this.sensors,e.probe_source)}
              </select>
            </div>
            <div class="probeline">
            <label for="probe_preset${t}">${_r("panels.probes.labels.preset",this.hass.language)}:</label>
            <select
            id="probe_preset${t}"
            @change="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[He]:parseInt(r.target.value)}))}"
          >
            ${this.renderTheOptions(this.presets,e.probe_preset)}
          </select>

            </div>
            <div class="probeline">
            <label for="probe_lower_bound${t}">${_r("panels.probes.labels.lower_bound",this.hass.language)}:</label>
      <input id="probe_lower_bound${t}" class="shortinput" type="text"
      .value="${e.probe_lower_bound}"
      @input="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[Te]:parseFloat(r.target.value)}))}"
      /> ${Oe(this.config)}
      </div>
      <div class="probeline">
      <label for="probe_upper_bound${t}">${_r("panels.probes.labels.upper_bound",this.hass.language)}:</label>
<input id="probe_upper_bound${t}" class="shortinput" type="text"
.value="${e.probe_upper_bound}"
@input="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[Se]:parseFloat(r.target.value)}))}"
/> ${Oe(this.config)}
</div>
<div class="probeline">
            <label for="probe_state_update_setting${t}">${_r("panels.probes.labels.state_update_setting",this.hass.language)}:</label>
            <select
            id="probe_state_update_setting${t}"
            @change="${r=>this.handleEditProbe(t,Object.assign(Object.assign({},e),{[$e]:parseInt(r.target.value)}))}"
          >
            ${this.renderTheUpdateStatusWhenOptions(this.state_update_settings,e.probe_state_update_setting)}
          </select>
            </div>
        </ha-card>
      `:z``}render(){return this.hass&&this.config?z`
        <ha-card
          header="${_r("panels.probes.title",this.hass.language)}"
        >
          <div class="card-content">
            ${_r("panels.probes.description",this.hass.language)}
          </div>
        </ha-card>
        <ha-card
          header="${_r("panels.probes.cards.add-probe.header",this.hass.language)}"
        >
          <div class="card-content">
            <div class="probeline">
              <label for="nameInput"
                >${_r("panels.probes.labels.name",this.hass.language)}:</label
              >
              <input id="nameInput" type="text" />
            </div>
            <div class="probeline">
              <label for="sourceInput"
                >${_r("panels.probes.labels.source",this.hass.language)}:</label
              >
              <select id="sourceInput">
                ${this.renderTheSourceOptions(this.sensors)}
              </select>
            </div>

            <div class="probeline">
              <button @click="${this.handleAddProbe}">
                ${_r("panels.probes.cards.add-probe.actions.add",this.hass.language)}
              </button>
            </div>
          </div>
        </ha-card>
        ${Object.entries(this.probes).map((([e,t])=>this.renderProbe(t,parseInt(e))))}
      `:z``}renderTheSourceOptions(e,t){if(this.hass){let r=z`<option value="" ?selected=${void 0===t}">---${_r("common.labels.select",this.hass.language)}---</option>`;return Object.entries(e).map((([e,i])=>r=z`${r}
            <option
              value="${i.name}"
              ?selected="${t===i.name}"
            >
              ${i.name}
            </option>`)),r}return z``}static get styles(){return u`
      ${Ne}
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
    `}};n([me()],Er.prototype,"config",void 0),n([me({type:Array})],Er.prototype,"probes",void 0),n([me({type:Array})],Er.prototype,"presets",void 0),n([me({type:Array})],Er.prototype,"state_update_settings",void 0),n([me({type:Array})],Er.prototype,"sensors",void 0),n([ge("#nameInput")],Er.prototype,"nameInput",void 0),n([ge("#sourceInput")],Er.prototype,"sourceInput",void 0),Er=n([ue("grill-buddy-view-probes")],Er);const Ar=()=>{const e=e=>{let t={};for(let r=0;r<e.length;r+=2){const i=e[r],n=r<e.length?e[r+1]:void 0;t=Object.assign(Object.assign({},t),{[i]:n})}return t},t=window.location.pathname.split("/");let r={page:t[2]||"general",params:{}};if(t.length>3){let i=t.slice(3);if(t.includes("filter")){const t=i.findIndex((e=>"filter"==e)),n=i.slice(t+1);i=i.slice(0,t),r=Object.assign(Object.assign({},r),{filter:e(n)})}i.length&&(i.length%2&&(r=Object.assign(Object.assign({},r),{subpage:i.shift()})),i.length&&(r=Object.assign(Object.assign({},r),{params:e(i)})))}return r};e.GrillBuddyPanel=class extends he{async firstUpdated(){window.addEventListener("location-changed",(()=>{window.location.pathname.includes("grill-buddy")&&this.requestUpdate()})),await _e(),this.requestUpdate()}render(){if(!customElements.get("ha-panel-config"))return z` loading... `;const e=Ar();return z`
      <div class="header">
        <div class="toolbar">
          <ha-menu-button
            .hass=${this.hass}
            .narrow=${this.narrow}
          ></ha-menu-button>
          <div class="main-title">${_r("title",this.hass.language)}</div>
          <div class="version">${"v2024.4.0"}</div>
        </div>

        <ha-tabs
          scrollable
          attr-for-selected="page-name"
          .selected=${e.page}
          @iron-activate=${this.handlePageSelected}
        >
          <paper-tab page-name="general">
            ${_r("panels.general.title",this.hass.language)}
          </paper-tab>
          <paper-tab page-name="probes">
            ${_r("panels.probes.title",this.hass.language)}
          </paper-tab>
          <paper-tab page-name="help"
            >${_r("panels.help.title",this.hass.language)}</paper-tab
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
          header="${_r("panels.help.cards.how-to-get-help.title",this.hass.language)}"
        >
          <div class="card-content">
            ${_r("panels.help.cards.how-to-get-help.first-read-the",this.hass.language)}
            <a href="https://github.com/jeroenterheerdt/grill_buddy/wiki"
              >${_r("panels.help.cards.how-to-get-help.wiki",this.hass.language)}</a
            >.
            ${_r("panels.help.cards.how-to-get-help.if-you-still-need-help",this.hass.language)}
            ${_r("panels.help.cards.how-to-get-help.or-open-a",this.hass.language)}
            <a href="https://github.com/jeroenterheerdt/grill_buddy/issues"
              >${_r("panels.help.cards.how-to-get-help.github-issue",this.hass.language)}</a
            >
            (${_r("panels.help.cards.how-to-get-help.english-only",this.hass.language)}).
          </div></ha-card
        >`;default:return z`
          <ha-card header="Page not found">
            <div class="card-content">
              The page you are trying to reach cannot be found. Please select a
              page from the menu above to continue.
            </div>
          </ha-card>
        `}}handlePageSelected(e){const t=e.detail.item.getAttribute("page-name");t!==Ar().page?(!function(e,t,r){void 0===r&&(r=!1),r?history.replaceState(null,"",t):history.pushState(null,"",t),ye(window,"location-changed",{replace:r})}(0,((e,...t)=>{let r={page:e,params:{}};t.forEach((e=>{"string"==typeof e?r=Object.assign(Object.assign({},r),{subpage:e}):"params"in e?r=Object.assign(Object.assign({},r),{params:e.params}):"filter"in e&&(r=Object.assign(Object.assign({},r),{filter:e.filter}))}));const i=e=>{let t=Object.keys(e);t=t.filter((t=>e[t])),t.sort();let r="";return t.forEach((t=>{const i=e[t];r=r.length?`${r}/${t}/${i}`:`${t}/${i}`})),r};let n=`/${Ee}/${r.page}`;return r.subpage&&(n=`${n}/${r.subpage}`),i(r.params).length&&(n=`${n}/${i(r.params)}`),r.filter&&(n=`${n}/filter/${i(r.filter)}`),n})(t)),this.requestUpdate()):scrollTo(0,0)}static get styles(){return u`
      ${Ne} :host {
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
    `}},n([me()],e.GrillBuddyPanel.prototype,"hass",void 0),n([me({type:Boolean,reflect:!0})],e.GrillBuddyPanel.prototype,"narrow",void 0),e.GrillBuddyPanel=n([ue("grill-buddy")],e.GrillBuddyPanel);let wr=class extends he{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?z`
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
    `}};n([me({attribute:!1})],wr.prototype,"hass",void 0),n([function(e){return me({...e,state:!0})}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */()],wr.prototype,"_params",void 0),wr=n([ue("error-dialog")],wr);var Hr=Object.freeze({__proto__:null,get ErrorDialog(){return wr}});Object.defineProperty(e,"__esModule",{value:!0})}({});
