parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"crkq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Animation=l,exports.setImagePath=k,exports.setAudioPath=O,exports.setDataPath=I,exports.loadImage=L,exports.loadAudio=M,exports.loadData=D,exports.load=C,exports.init=a,exports.getCanvas=r,exports.getContext=h,exports.on=s,exports.off=n,exports.emit=o,exports.GameLoop=W,exports.initKeys=q,exports.bindKeys=F,exports.unbindKeys=B,exports.keyPressed=G,exports.registerPlugin=Q,exports.unregisterPlugin=V,exports.extendObject=X,exports.initPointer=pt,exports.track=ft,exports.untrack=mt,exports.pointerOver=gt,exports.onPointerDown=xt,exports.onPointerUp=_t,exports.pointerPressed=wt,exports.Pool=bt,exports.Quadtree=jt,exports.Sprite=kt,exports.SpriteSheet=Lt,exports.setStoreItem=Mt,exports.getStoreItem=Dt,exports.TileEngine=Ct,exports.Vector=St,exports.default=exports.pointer=exports.keyMap=exports.dataAssets=exports.audioAssets=exports.imageAssets=void 0;let t,e,i={};function s(t,e){i[t]=i[t]||[],i[t].push(e)}function n(t,e){let s;!i[t]||(s=i[t].indexOf(e))<0||i[t].splice(s,1)}function o(t,...e){i[t]&&i[t].map(t=>t(...e))}function r(){return t}function h(){return e}function a(i){if(!(t=document.getElementById(i)||i||document.querySelector("canvas")))throw Error("You must provide a canvas element for the game");return(e=t.getContext("2d")).imageSmoothingEnabled=!1,o("init"),{canvas:t,context:e}}class c{constructor({spriteSheet:t,frames:e,frameRate:i,loop:s=!0}={}){this.spriteSheet=t,this.frames=e,this.frameRate=i,this.loop=s;let{width:n,height:o,margin:r=0}=t.frame;this.width=n,this.height=o,this.margin=r,this._f=0,this._a=0}clone(){return l(this)}reset(){this._f=0,this._a=0}update(t=1/60){if(this.loop||this._f!=this.frames.length-1)for(this._a+=t;this._a*this.frameRate>=1;)this._f=++this._f%this.frames.length,this._a-=1/this.frameRate}render({x:t,y:e,width:i=this.width,height:s=this.height,context:n=h()}={}){let o=this.frames[this._f]/this.spriteSheet._f|0,r=this.frames[this._f]%this.spriteSheet._f|0;n.drawImage(this.spriteSheet.image,r*this.width+(2*r+1)*this.margin,o*this.height+(2*o+1)*this.margin,this.width,this.height,t,e,i,s)}}function l(t){return new c(t)}l.prototype=c.prototype,l.class=c;let d=/(jpeg|jpg|gif|png)$/,u=/(wav|mp3|ogg|aac)$/,p=/^\//,f=/\/$/,m=new WeakMap,g="",x="",_="";function w(t,e){return new URL(t,e).href}function y(t,e){return[t.replace(f,""),t?e.replace(p,""):e].filter(t=>t).join("/")}function b(t){return t.split(".").pop()}function v(t){let e=t.replace("."+b(t),"");return 2==e.split("/").length?e.replace(p,""):e}function A(t){return{wav:"",mp3:t.canPlayType("audio/mpeg;"),ogg:t.canPlayType('audio/ogg; codecs="vorbis"'),aac:t.canPlayType("audio/aac;")}}let j={};exports.imageAssets=j;let P={};exports.audioAssets=P;let S={};function E(){window.__k||(window.__k={dm:m,u:w,d:S,i:j})}function k(t){g=t}function O(t){x=t}function I(t){_=t}function L(t){return E(),new Promise((e,i)=>{let s,n,r;if(s=y(g,t),j[s])return e(j[s]);(n=new Image).onload=function(){r=w(s,window.location.href),j[v(t)]=j[s]=j[r]=this,o("assetLoaded",this,t),e(this)},n.onerror=function(){i("Unable to load image "+s)},n.src=s})}function M(t){return new Promise((e,i)=>{let s,n,r,h;return s=new Audio,n=A(s),(t=[].concat(t).reduce((t,e)=>t||(n[b(e)]?e:null),0))?(r=y(x,t),P[r]?e(P[r]):(s.addEventListener("canplay",function(){h=w(r,window.location.href),P[v(t)]=P[r]=P[h]=this,o("assetLoaded",this,t),e(this)}),s.onerror=function(){i("Unable to load audio "+r)},s.src=r,void s.load())):i("cannot play any of the audio formats provided"+t)})}function D(t){let e,i;return E(),e=y(_,t),S[e]?Promise.resolve(S[e]):fetch(e).then(t=>{if(!t.ok)throw t;return t.clone().json().catch(()=>t.text())}).then(s=>(i=w(e,window.location.href),"object"==typeof s&&m.set(s,i),S[v(t)]=S[e]=S[i]=s,o("assetLoaded",s,t),s))}function C(...t){return E(),Promise.all(t.map(t=>{let e=b([].concat(t)[0]);return e.match(d)?L(t):e.match(u)?M(t):D(t)}))}exports.dataAssets=S;const z=()=>{};function R(){let t=r();h().clearRect(0,0,t.width,t.height)}function W({fps:t=60,clearCanvas:e=!0,update:i,render:s}={}){if(!i||!s)throw Error("You must provide update() and render() functions");let n,r,h,a,c,l=0,d=1e3/t,u=1/t,p=e?R:z;function f(){if(r=requestAnimationFrame(f),h=performance.now(),a=h-n,n=h,!(a>1e3)){for(o("tick"),l+=a;l>=d;)c.update(u),l-=d;p(),c.render()}}return c={update:i,render:s,isStopped:!0,start(){n=performance.now(),this.isStopped=!1,requestAnimationFrame(f)},stop(){this.isStopped=!0,cancelAnimationFrame(r)},_frame:f,set _last(t){n=t}}}let Y={},T={},U={13:"enter",27:"esc",32:"space",37:"left",38:"up",39:"right",40:"down"};function K(t){let e=U[t.which];T[e]=!0,Y[e]&&Y[e](t)}function N(t){T[U[t.which]]=!1}function $(){T={}}function q(){let t;for(t=0;t<26;t++)U[65+t]=(10+t).toString(36);for(t=0;t<10;t++)U[48+t]=""+t;window.addEventListener("keydown",K),window.addEventListener("keyup",N),window.addEventListener("blur",$)}function F(t,e){[].concat(t).map(t=>Y[t]=e)}function B(t){[].concat(t).map(t=>Y[t]=0)}function G(t){return!!T[t]}function H(t){let e=t.substr(t.search(/[A-Z]/));return e[0].toLowerCase()+e.substr(1)}function J(t,e){let i=t.indexOf(e);-1!==i&&t.splice(i,1)}function Q(t,e){let i=t.prototype;i&&(i._inc||(i._inc={},i._bInc=function(t,e,...i){return this._inc[e].before.reduce((e,i)=>{let s=i(t,...e);return s||e},i)},i._aInc=function(t,e,i,...s){return this._inc[e].after.reduce((e,i)=>{let n=i(t,e,...s);return n||e},i)}),Object.getOwnPropertyNames(e).forEach(t=>{let s=H(t);i[s]&&(i["_o"+s]||(i["_o"+s]=i[s],i[s]=function(...t){let e=this._bInc(this,s,...t),n=i["_o"+s].call(this,...e);return this._aInc(this,s,n,...t)}),i._inc[s]||(i._inc[s]={before:[],after:[]}),t.startsWith("before")?i._inc[s].before.push(e[t]):t.startsWith("after")&&i._inc[s].after.push(e[t]))}))}function V(t,e){let i=t.prototype;i&&i._inc&&Object.getOwnPropertyNames(e).forEach(t=>{let s=H(t);t.startsWith("before")?J(i._inc[s].before,e[t]):t.startsWith("after")&&J(i._inc[s].after,e[t])})}function X(t,e){let i=t.prototype;i&&Object.getOwnPropertyNames(e).forEach(t=>{i[t]||(i[t]=e[t])})}exports.keyMap=U;let Z=[],tt=[],et={},it=[],st={},nt={0:"left",1:"middle",2:"right"},ot={x:0,y:0,radius:5};function rt(t){let e=t.x,i=t.y;t.anchor&&(e-=t.width*t.anchor.x,i-=t.height*t.anchor.y);let s=ot.x-Math.max(e,Math.min(ot.x,e+t.width)),n=ot.y-Math.max(i,Math.min(ot.y,i+t.height));return s*s+n*n<ot.radius*ot.radius}function ht(){let t,e,i=tt.length?tt:Z;for(let s=i.length-1;s>=0;s--)if(e=(t=i[s]).collidesWithPointer?t.collidesWithPointer(ot):rt(t))return t}function at(t){let e=void 0!==t.button?nt[t.button]:"left";st[e]=!0,ut(t,"onDown")}function ct(t){let e=void 0!==t.button?nt[t.button]:"left";st[e]=!1,ut(t,"onUp")}function lt(t){ut(t,"onOver")}function dt(){st={}}function ut(t,e){let i,s,n=r();if(!n)return;-1!==["touchstart","touchmove","touchend"].indexOf(t.type)?(i=(t.touches[0]||t.changedTouches[0]).clientX,s=(t.touches[0]||t.changedTouches[0]).clientY):(i=t.clientX,s=t.clientY);let o=n.height/n.offsetHeight,h=n.getBoundingClientRect(),a=(i-h.left)*o,c=(s-h.top)*o;ot.x=a,ot.y=c,t.preventDefault();let l=ht();l&&l[e]&&l[e](t),et[e]&&et[e](t,l)}function pt(){let t=r();t.addEventListener("mousedown",at),t.addEventListener("touchstart",at),t.addEventListener("mouseup",ct),t.addEventListener("touchend",ct),t.addEventListener("blur",dt),t.addEventListener("mousemove",lt),t.addEventListener("touchmove",lt),s("tick",()=>{tt.length=0,Z.map(t=>{tt.push(t)}),Z.length=0})}function ft(t){[].concat(t).map(t=>{t._r||(t._r=t.render,t.render=function(){Z.push(this),this._r()},it.push(t))})}function mt(t){[].concat(t).map(t=>{t.render=t._r,t._r=0;let e=it.indexOf(t);-1!==e&&it.splice(e,1)})}function gt(t){return!!it.includes(t)&&ht()===t}function xt(t){et.onDown=t}function _t(t){et.onUp=t}function wt(t){return!!st[t]}exports.pointer=ot;class yt{constructor({create:t,maxSize:e=1024}={}){let i;if(!t||!(i=t())||!(i.update&&i.init&&i.isAlive))throw Error("Must provide create() function which returns an object with init(), update(), and isAlive() functions");this._c=t,this._i=0,this.objects=[t()],this.size=1,this.maxSize=e}get(t={}){if(this.objects.length==this._i){if(this.size===this.maxSize)return;for(let t=0;t<this.size&&this.objects.length<this.maxSize;t++)this.objects.unshift(this._c());this.size=this.objects.length}let e=this.objects.shift();return e.init(t),this.objects.push(e),this._i++,e}getAliveObjects(){return this.objects.slice(this.objects.length-this._i)}clear(){this._i=this.objects.length=0,this.size=1,this.objects.push(this._c())}update(t){let e,i=this.size-1,s=Math.max(this.objects.length-this._i,0);for(;i>=s;)(e=this.objects[i]).update(t),e.isAlive()?i--:(this.objects=this.objects.splice(i,1).concat(this.objects),this._i--,s++)}render(){let t=Math.max(this.objects.length-this._i,0);for(let e=this.size-1;e>=t;e--)this.objects[e].render()}}function bt(t){return new yt(t)}function vt(t,e){let i=[],s=e.x+e.width/2,n=e.y+e.height/2,o=t.y<n&&t.y+t.height>=e.y,r=t.y+t.height>=n&&t.y<e.y+e.height;return t.x<s&&t.x+t.width>=e.x&&(o&&i.push(0),r&&i.push(2)),t.x+t.width>=s&&t.x<e.x+e.width&&(o&&i.push(1),r&&i.push(3)),i}bt.prototype=yt.prototype,bt.class=yt;class At{constructor({maxDepth:t=3,maxObjects:e=25,bounds:i}={}){this.maxDepth=t,this.maxObjects=e;let s=r();this.bounds=i||{x:0,y:0,width:s.width,height:s.height},this._b=!1,this._d=0,this._o=[],this._s=[],this._p=null}clear(){this._s.map(function(t){t.clear()}),this._b=!1,this._o.length=0}get(t){let e,i,s=new Set;for(;this._s.length&&this._b;){for(e=vt(t,this.bounds),i=0;i<e.length;i++)this._s[e[i]].get(t).forEach(t=>s.add(t));return Array.from(s)}return this._o.filter(e=>e!==t)}add(){let t,e,i,s;for(e=0;e<arguments.length;e++)if(i=arguments[e],Array.isArray(i))this.add.apply(this,i);else if(this._b)this._a(i);else if(this._o.push(i),this._o.length>this.maxObjects&&this._d<this.maxDepth){for(this._sp(),t=0;s=this._o[t];t++)this._a(s);this._o.length=0}}_a(t,e,i){for(e=vt(t,this.bounds),i=0;i<e.length;i++)this._s[e[i]].add(t)}_sp(t,e,i){if(this._b=!0,!this._s.length)for(t=this.bounds.width/2|0,e=this.bounds.height/2|0,i=0;i<4;i++)this._s[i]=jt({bounds:{x:this.bounds.x+(i%2==1?t:0),y:this.bounds.y+(i>=2?e:0),width:t,height:e},maxDepth:this.maxDepth,maxObjects:this.maxObjects}),this._s[i]._d=this._d+1,this._s[i]._p=this}}function jt(t){return new At(t)}jt.prototype=At.prototype,jt.class=At;class Pt{constructor(t=0,e=0){this._x=t,this._y=e}add(t,e=1){return St(this.x+(t.x||0)*e,this.y+(t.y||0)*e,this)}clamp(t,e,i,s){this._c=!0,this._a=t,this._b=e,this._d=i,this._e=s}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?Math.min(Math.max(this._a,t),this._d):t}set y(t){this._y=this._c?Math.min(Math.max(this._b,t),this._e):t}}function St(t,e,i={}){let s=new Pt(t,e);return i._c&&(s.clamp(i._a,i._b,i._d,i._e),s.x=t,s.y=e),s}St.prototype=Pt.prototype,St.class=Pt;class Et{constructor(t){this.init(t)}init(t={}){let{x:e,y:i,dx:s,dy:n,ddx:o,ddy:r,width:a,height:c,image:l}=t;this.position=St(e,i),this.velocity=St(s,n),this.acceleration=St(o,r),this.width=this.height=this.rotation=0,this.ttl=1/0,this.anchor={x:0,y:0},this.context=h();for(let h in t)this[h]=t[h];l&&(this.width=void 0!==a?a:l.width,this.height=void 0!==c?c:l.height)}get x(){return this.position.x}get y(){return this.position.y}get dx(){return this.velocity.x}get dy(){return this.velocity.y}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}get animations(){return this._a}set x(t){this.position.x=t}set y(t){this.position.y=t}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}set animations(t){let e,i;for(e in this._a={},t)this._a[e]=t[e].clone(),i=i||this._a[e];this.currentAnimation=i,this.width=this.width||i.width,this.height=this.height||i.height}isAlive(){return this.ttl>0}collidesWith(t){if(this.rotation||t.rotation)return null;let e=this.x-this.width*this.anchor.x,i=this.y-this.height*this.anchor.y,s=t.x,n=t.y;return t.anchor&&(s-=t.width*t.anchor.x,n-=t.height*t.anchor.y),e<s+t.width&&e+this.width>s&&i<n+t.height&&i+this.height>n}update(t){this.advance(t)}render(){this.draw()}playAnimation(t){this.currentAnimation=this.animations[t],this.currentAnimation.loop||this.currentAnimation.reset()}advance(t){this.velocity=this.velocity.add(this.acceleration,t),this.position=this.position.add(this.velocity,t),this.ttl--,this.currentAnimation&&this.currentAnimation.update(t)}draw(){let t=-this.width*this.anchor.x,e=-this.height*this.anchor.y;this.context.save(),this.context.translate(this.x,this.y),this.rotation&&this.context.rotate(this.rotation),this.image?this.context.drawImage(this.image,0,0,this.image.width,this.image.height,t,e,this.width,this.height):this.currentAnimation?this.currentAnimation.render({x:t,y:e,width:this.width,height:this.height,context:this.context}):(this.context.fillStyle=this.color,this.context.fillRect(t,e,this.width,this.height)),this.context.restore()}}function kt(t){return new Et(t)}function Ot(t){if(+t===t)return t;let e=[],i=t.split(".."),s=+i[0],n=+i[1],o=s;if(s<n)for(;o<=n;o++)e.push(o);else for(;o>=n;o--)e.push(o);return e}kt.prototype=Et.prototype,kt.class=Et;class It{constructor({image:t,frameWidth:e,frameHeight:i,frameMargin:s,animations:n}={}){if(!t)throw Error("You must provide an Image for the SpriteSheet");this.animations={},this.image=t,this.frame={width:e,height:i,margin:s},this._f=t.width/e|0,this.createAnimations(n)}createAnimations(t){let e,i;for(i in t){let{frames:s,frameRate:n,loop:o}=t[i];if(e=[],void 0===s)throw Error("Animation "+i+" must provide a frames property");[].concat(s).map(t=>{e=e.concat(Ot(t))}),this.animations[i]=l({spriteSheet:this,frames:e,frameRate:n,loop:o})}}}function Lt(t){return new It(t)}function Mt(t,e){void 0===e?localStorage.removeItem(t):localStorage.setItem(t,JSON.stringify(e))}function Dt(t){let e=localStorage.getItem(t);try{e=JSON.parse(e)}catch(i){}return e}function Ct(t={}){let{width:e,height:i,tilewidth:s,tileheight:n,context:o=h(),tilesets:a,layers:c}=t,l=e*s,d=i*n,u=document.createElement("canvas"),p=u.getContext("2d");u.width=l,u.height=d;let f={},m={},g=Object.assign({context:o,mapwidth:l,mapheight:d,_sx:0,_sy:0,get sx(){return this._sx},get sy(){return this._sy},set sx(t){this._sx=Math.min(Math.max(0,t),l-r().width)},set sy(t){this._sy=Math.min(Math.max(0,t),d-r().height)},render(){y(u)},renderLayer(t){let e=m[t],i=f[t];e||((e=document.createElement("canvas")).width=l,e.height=d,m[t]=e,g._r(i,e.getContext("2d"))),y(e)},layerCollidesWith(t,e){let i=x(e.y),s=_(e.x),n=x(e.y+e.height),o=_(e.x+e.width),r=f[t];for(let h=i;h<=n;h++)for(let t=s;t<=o;t++)if(r.data[t+h*this.width])return!0;return!1},tileAtLayer(t,e){let i=e.row||x(e.y),s=e.col||_(e.x);return f[t]?f[t].data[s+i*g.width]:-1},setTileAtLayer(t,e,i){let s=e.row||x(e.y),n=e.col||_(e.x);f[t]&&(f[t].data[n+s*g.width]=i,w())},_r:function(t,e){e.save(),e.globalAlpha=t.opacity,t.data.map((t,i)=>{if(!t)return;let s;for(let e=g.tilesets.length-1;e>=0&&(s=g.tilesets[e],!(t/s.firstgid>=1));e--);let n=s.tilewidth||g.tilewidth,o=s.tileheight||g.tileheight,r=s.margin||0,h=s.image,a=t-s.firstgid,c=s.columns||h.width/(n+r)|0,l=i%g.width*n,d=(i/g.width|0)*o,u=a%c*(n+r),p=(a/c|0)*(o+r);e.drawImage(h,u,p,n,o,l,d,n,o)}),e.restore()},layerCanvases:m},t);function x(t){return(g.sy+t)/g.tileheight|0}function _(t){return(g.sx+t)/g.tilewidth|0}function w(){g.layers&&g.layers.map(t=>{f[t.name]=t,!1!==t.visible&&g._r(t,p)})}function y(t){let{width:e,height:i}=r();g.context.drawImage(t,g.sx,g.sy,e,i,0,0,e,i)}return g.tilesets.map(e=>{let i=(window.__k?window.__k.dm.get(t):"")||window.location.href;if(e.source){if(!window.__k)throw Error('You must use "load" or "loadData" to resolve tileset.source');let t=window.__k.d[window.__k.u(e.source,i)];if(!t)throw Error(`You must load the tileset source "${e.source}" before loading the tileset`);Object.keys(t).map(i=>{e[i]=t[i]})}if(""+e.image===e.image){if(!window.__k)throw Error('You must use "load" or "loadImage" to resolve tileset.image');let t=window.__k.i[window.__k.u(e.image,i)];if(!t)throw Error(`You must load the image "${e.image}" before loading the tileset`);e.image=t}}),w(),g}Lt.prototype=It.prototype,Lt.class=It;let zt={Animation:l,imageAssets:j,audioAssets:P,dataAssets:S,setImagePath:k,setAudioPath:O,setDataPath:I,loadImage:L,loadAudio:M,loadData:D,load:C,init:a,getCanvas:r,getContext:h,on:s,off:n,emit:o,GameLoop:W,keyMap:U,initKeys:q,bindKeys:F,unbindKeys:B,keyPressed:G,registerPlugin:Q,unregisterPlugin:V,extendObject:X,initPointer:pt,pointer:ot,track:ft,untrack:mt,pointerOver:gt,onPointerDown:xt,onPointerUp:_t,pointerPressed:wt,Pool:bt,Quadtree:jt,Sprite:kt,SpriteSheet:Lt,setStoreItem:Mt,getStoreItem:Dt,TileEngine:Ct,Vector:St};var Rt=zt;exports.default=Rt;
},{}],"BNiF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.MovingObject=exports.Constants=exports.AABB=exports.overlaps=void 0;var t=require("kontra");function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var r=function(t,e,r){return t>e&&t<r},o=function(r,o){var n=0,c=0;return"object"===e(o)?(n=r.x*o.x,c=r.y*o.y):(n=r.x*o,c=r.y*o),(0,t.Vector)(n,c)},n=function(t){return!(Math.Abs(center.x-t.center.x)>halfSize.x+t.halfSize.x)&&!(Math.Abs(center.y-t.center.y)>halfSize.y+t.halfSize.y)};exports.overlaps=n;var c=function(){var e=(0,t.Vector)(0,0),r=(0,t.Vector)(0,0);return{center:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){return e}),halfSize:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){return r})}};exports.AABB=c;var a={cGravity:100,cMaxFallingSpeed:32,cMovementSpeed:2,cMaxVelocity:4};exports.Constants=a;var u=function(){(0,t.Vector)(0,0);var e=(0,t.Vector)(0,0),n=((0,t.Vector)(0,0),(0,t.Vector)(0,0)),u=(0,t.Vector)(0,0),i=c(),f=(0,t.Vector)(0,0),x=!1;return{velocity:{goRight:function(){n.x+=a.cMovementSpeed,n.x=Math.max(n.x,a.cMaxVelocity)},goLeft:function(){n.x-=a.cMovementSpeed,n.x=Math.max(n.x,a.cMaxVelocity)}},fixedUpdate:function(c){return e,n,x,!1,!1,!1,x=r(e.y,99,100),i.center=e.add(f),x?(n=(0,t.Vector)(0,0),{pos:(0,t.Vector)(Math.round(e.x),Math.round(e.y)),localScale:(0,t.Vector)(u.x,u.y)}):(e=e.add(o(n,c)),n.y+=a.cGravity*c,n.y=Math.max(n.y,a.cMaxFallingSpeed),{pos:(0,t.Vector)(Math.round(e.x),Math.round(e.y)),localScale:(0,t.Vector)(u.x,u.y)})}}};exports.MovingObject=u;var i=function(){return{}};exports.default=i;
},{"kontra":"crkq"}],"H99C":[function(require,module,exports) {
"use strict";var e=require("kontra"),t=require("./physics"),r=(0,e.init)(),n=r.canvas,i=function(){return(0,e.Sprite)({x:100,y:80,color:"red",width:20,height:40,dx:2})},o=function(){var e=(0,t.MovingObject)(),r=i();return{move:function(t){t>0?e.velocity.goRight():t<0&&e.velocity.goLeft()},update:function(t){r.update();var n=e.fixedUpdate(t).pos;r.x=n.x,r.y=n.y},render:function(){return r.render()}}},u=o(),c=(0,e.GameLoop)({update:function(e){u.update(e)},render:function(){u.render()}});c.start();
},{"kontra":"crkq","./physics":"BNiF"}]},{},["H99C"], null)
//# sourceMappingURL=/src.d881a703.js.map