/*! For license information please see 907.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[907],{907:(t,e,r)=>{r.r(e),r.d(e,{default:()=>R});function n(t){const e=new Uint8Array(t);let r="";for(const t of e)r+=String.fromCharCode(t);return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function o(t){const e=t.replace(/-/g,"+").replace(/_/g,"/"),r=(4-e.length%4)%4,n=e.padEnd(e.length+r,"="),o=atob(n),i=new ArrayBuffer(o.length),a=new Uint8Array(i);for(let t=0;t<o.length;t++)a[t]=o.charCodeAt(t);return i}function i(){return a.stubThis(void 0!==globalThis?.PublicKeyCredential&&"function"==typeof globalThis.PublicKeyCredential)}const a={stubThis:t=>t};function s(t){const{id:e}=t;return{...t,id:o(e),transports:t.transports}}function c(t){return"localhost"===t||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t)}class u extends Error{constructor({message:t,code:e,cause:r,name:n}){super(t,{cause:r}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.name=n??r.name,this.code=e}}const l=new class{constructor(){Object.defineProperty(this,"controller",{enumerable:!0,configurable:!0,writable:!0,value:void 0})}createNewAbortSignal(){if(this.controller){const t=new Error("Cancelling existing WebAuthn API call for new one");t.name="AbortError",this.controller.abort(t)}const t=new AbortController;return this.controller=t,t.signal}cancelCeremony(){if(this.controller){const t=new Error("Manually cancelling existing WebAuthn API call");t.name="AbortError",this.controller.abort(t),this.controller=void 0}}},h=["cross-platform","platform"];function f(t){if(t&&!(h.indexOf(t)<0))return t}async function d(t){!t.optionsJSON&&t.challenge&&(console.warn("startRegistration() was not called correctly. It will try to continue with the provided options, but this call should be refactored to use the expected call structure instead. See https://simplewebauthn.dev/docs/packages/browser#typeerror-cannot-read-properties-of-undefined-reading-challenge for more information."),t={optionsJSON:t});const{optionsJSON:e,useAutoRegister:r=!1}=t;if(!i())throw new Error("WebAuthn is not supported in this browser");const a={...e,challenge:o(e.challenge),user:{...e.user,id:o(e.user.id)},excludeCredentials:e.excludeCredentials?.map(s)},h={};let d;r&&(h.mediation="conditional"),h.publicKey=a,h.signal=l.createNewAbortSignal();try{d=await navigator.credentials.create(h)}catch(t){throw function({error:t,options:e}){const{publicKey:r}=e;if(!r)throw Error("options was missing required publicKey property");if("AbortError"===t.name){if(e.signal instanceof AbortSignal)return new u({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else if("ConstraintError"===t.name){if(!0===r.authenticatorSelection?.requireResidentKey)return new u({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:t});if("conditional"===e.mediation&&"required"===r.authenticatorSelection?.userVerification)return new u({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:t});if("required"===r.authenticatorSelection?.userVerification)return new u({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:t})}else{if("InvalidStateError"===t.name)return new u({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:t});if("NotAllowedError"===t.name)return new u({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if("NotSupportedError"===t.name)return 0===r.pubKeyCredParams.filter((t=>"public-key"===t.type)).length?new u({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:t}):new u({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:t});if("SecurityError"===t.name){const e=globalThis.location.hostname;if(!c(e))return new u({message:`${globalThis.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t});if(r.rp.id!==e)return new u({message:`The RP ID "${r.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else if("TypeError"===t.name){if(r.user.id.byteLength<1||r.user.id.byteLength>64)return new u({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:t})}else if("UnknownError"===t.name)return new u({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return t}({error:t,options:h})}if(!d)throw new Error("Registration was not completed");const{id:m,rawId:g,response:y,type:w}=d;let v,b,E,R;if("function"==typeof y.getTransports&&(v=y.getTransports()),"function"==typeof y.getPublicKeyAlgorithm)try{b=y.getPublicKeyAlgorithm()}catch(t){p("getPublicKeyAlgorithm()",t)}if("function"==typeof y.getPublicKey)try{const t=y.getPublicKey();null!==t&&(E=n(t))}catch(t){p("getPublicKey()",t)}if("function"==typeof y.getAuthenticatorData)try{R=n(y.getAuthenticatorData())}catch(t){p("getAuthenticatorData()",t)}return{id:m,rawId:n(g),response:{attestationObject:n(y.attestationObject),clientDataJSON:n(y.clientDataJSON),transports:v,publicKeyAlgorithm:b,publicKey:E,authenticatorData:R},type:w,clientExtensionResults:d.getClientExtensionResults(),authenticatorAttachment:f(d.authenticatorAttachment)}}function p(t,e){console.warn(`The browser extension that intercepted this WebAuthn API call incorrectly implemented ${t}. You should report this error to them.\n`,e)}const m={stubThis:t=>t};async function g(t){!t.optionsJSON&&t.challenge&&(console.warn("startAuthentication() was not called correctly. It will try to continue with the provided options, but this call should be refactored to use the expected call structure instead. See https://simplewebauthn.dev/docs/packages/browser#typeerror-cannot-read-properties-of-undefined-reading-challenge for more information."),t={optionsJSON:t});const{optionsJSON:e,useBrowserAutofill:r=!1,verifyBrowserAutofillInput:a=!0}=t;if(!i())throw new Error("WebAuthn is not supported in this browser");let h;0!==e.allowCredentials?.length&&(h=e.allowCredentials?.map(s));const d={...e,challenge:o(e.challenge),allowCredentials:h},p={};if(r){if(!await function(){if(!i())return m.stubThis(new Promise((t=>t(!1))));const t=globalThis.PublicKeyCredential;return void 0===t?.isConditionalMediationAvailable?m.stubThis(new Promise((t=>t(!1)))):m.stubThis(t.isConditionalMediationAvailable())}())throw Error("Browser does not support WebAuthn autofill");if(document.querySelectorAll("input[autocomplete$='webauthn']").length<1&&a)throw Error('No <input> with "webauthn" as the only or last value in its `autocomplete` attribute was detected');p.mediation="conditional",d.allowCredentials=[]}let g;p.publicKey=d,p.signal=l.createNewAbortSignal();try{g=await navigator.credentials.get(p)}catch(t){throw function({error:t,options:e}){const{publicKey:r}=e;if(!r)throw Error("options was missing required publicKey property");if("AbortError"===t.name){if(e.signal instanceof AbortSignal)return new u({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else{if("NotAllowedError"===t.name)return new u({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if("SecurityError"===t.name){const e=globalThis.location.hostname;if(!c(e))return new u({message:`${globalThis.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t});if(r.rpId!==e)return new u({message:`The RP ID "${r.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else if("UnknownError"===t.name)return new u({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return t}({error:t,options:p})}if(!g)throw new Error("Authentication was not completed");const{id:y,rawId:w,response:v,type:b}=g;let E;return v.userHandle&&(E=n(v.userHandle)),{id:y,rawId:n(w),response:{authenticatorData:n(v.authenticatorData),clientDataJSON:n(v.clientDataJSON),signature:n(v.signature),userHandle:E},type:b,clientExtensionResults:g.getClientExtensionResults(),authenticatorAttachment:f(g.authenticatorAttachment)}}function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function w(){w=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var i=e&&e.prototype instanceof v?e:v,a=Object.create(i.prototype),s=new P(n||[]);return o(a,"_invoke",{value:T(t,r,s)}),a}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=l;var f="suspendedStart",d="suspendedYield",p="executing",m="completed",g={};function v(){}function b(){}function E(){}var R={};u(R,a,(function(){return this}));var _=Object.getPrototypeOf,A=_&&_(_(L([])));A&&A!==r&&n.call(A,a)&&(R=A);var x=E.prototype=v.prototype=Object.create(R);function O(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function S(t,e){function r(o,i,a,s){var c=h(t[o],t,i);if("throw"!==c.type){var u=c.arg,l=u.value;return l&&"object"==y(l)&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,a,s)}),(function(t){r("throw",t,a,s)})):e.resolve(l).then((function(t){u.value=t,a(u)}),(function(t){return r("throw",t,a,s)}))}s(c.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}})}function T(e,r,n){var o=f;return function(i,a){if(o===p)throw Error("Generator is already running");if(o===m){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var s=n.delegate;if(s){var c=C(s,n);if(c){if(c===g)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===f)throw o=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=p;var u=h(e,r,n);if("normal"===u.type){if(o=n.done?m:d,u.arg===g)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(o=m,n.method="throw",n.arg=u.arg)}}}function C(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,C(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var i=h(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,g;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,g):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function I(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function N(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(I,this),this.reset(!0)}function L(e){if(e||""===e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}throw new TypeError(y(e)+" is not iterable")}return b.prototype=E,o(x,"constructor",{value:E,configurable:!0}),o(E,"constructor",{value:b,configurable:!0}),b.displayName=u(E,c,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,E):(t.__proto__=E,u(t,c,"GeneratorFunction")),t.prototype=Object.create(x),t},e.awrap=function(t){return{__await:t}},O(S.prototype),u(S.prototype,s,(function(){return this})),e.AsyncIterator=S,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new S(l(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},O(x),u(x,c,"Generator"),u(x,a,(function(){return this})),u(x,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=L,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(N),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return s.type="throw",s.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),N(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;N(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:L(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),g}},e}function v(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o)}function b(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){v(i,n,o,a,s,"next",t)}function s(t){v(i,n,o,a,s,"throw",t)}a(void 0)}))}}var E=function(t,e,r,n,o,i,a,s){var c,u="function"==typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=r,u._compiled=!0),n&&(u.functional=!0),i&&(u._scopeId="data-v-"+i),a?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},u._ssrRegister=c):o&&(c=s?function(){o.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:o),c)if(u.functional){u._injectStyles=c;var l=u.render;u.render=function(t,e){return c.call(e),l(t,e)}}else{var h=u.beforeCreate;u.beforeCreate=h?[].concat(h,c):[c]}return{exports:t,options:u}}({name:"LoginPage",data:function(){return{username:"xx",errors:{},isBrowserSupported:i()}},mounted:function(){i()||alert("WebAuthn is not supported in this browser")},methods:{submitRegister:function(){var t=this;return b(w().mark((function e(){return w().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.trackEvent("D5MKGI4J"),console.log("submitRegister...."),t.$http.post("/auth/registration/options",{username:t.username}).then((function(t){return d(t.data)})).then((function(e){return t.$http.post("/auth/registration/verify",e)})).then((function(t){console.log("verificationResponse",t)})).catch((function(t){console.error("error",t)}));case 3:case"end":return e.stop()}}),e)})))()},submitLogin:function(){var t=this;return b(w().mark((function e(){var r,n,o,i,a;return w().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.trackEvent("OHHWLXDF"),e.next=3,t.$http.post("/authentication/options",{username:t.username});case 3:if(n=e.sent,(o=n.data).challenge){e.next=8;break}return alert("Invalid authentication options received"),e.abrupt("return");case 8:return e.next=10,g(o);case 10:return i=e.sent,console.log("attResp",i),e.next=14,t.$http.post("/authentication/verify",i);case 14:a=e.sent,console.log("verificationResponse",a),null!==(r=a.data)&&void 0!==r&&r.verified?(t.trackEvent("D7T81ZST"),alert("Authentication successful")):alert("Something went wrong verifying the authentication.");case 17:case"end":return e.stop()}}),e)})))()},trackEvent:function(t){"undefined"!=typeof fathom&&(console.log("fathom..."),fathom.trackGoal(t,0))}}},(function(){var t=this,e=t._self._c;return t.isBrowserSupported?e("div",{staticClass:"px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10"},[e("form",{staticClass:"space-y-6",on:{submit:function(e){return e.preventDefault(),t.submitRegister.apply(null,arguments)}}},[e("h2",{staticClass:"text-xl font-bold text-center"},[t._v("Register")]),t._v(" "),e("div",[e("label",{staticClass:"block text-sm font-medium text-gray-700",attrs:{for:"username"}},[t._v("Username")]),t._v(" "),e("div",{staticClass:"relative mt-1 rounded-md shadow-sm"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"block w-full px-3 py-2 placeholder-gray-400 border rounded-md appearance-none focus:outline-none sm:text-sm",class:t.errors.username?"border-red-300 focus:border-red-500 focus:ring-red-500":"border-gray-300 focus:border-sky-500 focus:ring-sky-500",attrs:{type:"text",id:"username",autocomplete:"off",required:"",autocapitalize:"off"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),t._v(" "),t.errors.username?e("div",{staticClass:"absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"},[e("svg",{staticClass:"w-5 h-5 text-red-500",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"}},[e("path",{attrs:{"fill-rule":"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z","clip-rule":"evenodd"}})])]):t._e()])]),t._v(" "),e("div",[e("button",{staticClass:"flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",attrs:{type:"submit"}},[t._v("\n                Register with Passkey\n            ")]),t._v(" "),e("button",{staticClass:"mt-3 flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",attrs:{type:"button"},on:{click:t.submitLogin}},[t._v("\n                Login with Passkey\n            ")])])])]):e("div",[t._m(0)])}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10"},[e("h2",{staticClass:"text-xl font-bold text-center"},[t._v("Browser not supported")]),t._v(" "),e("p",{staticClass:"mt-4 text-center"},[t._v("\n            WebAuthn is not supported in this browser. Please use a modern\n            browser like Chrome, Firefox, or Safari.\n        ")])])}],!1,null,null,null);const R=E.exports}}]);
//# sourceMappingURL=907.js.map