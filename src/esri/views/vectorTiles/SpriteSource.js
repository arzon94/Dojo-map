// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.4/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/extendsHelper","../../core/tsSupport/decorateHelper","dojo/Deferred","dojo/promise/all","../../request","../../kernel","../../core/promiseUtils"],function(t,e,i,r,a,n,o,s,h){var d=function(){function t(t,e){this.baseURL=t,this.devicePixelRatio=e,this._isRetina=!1,this._spritesData={},this.image=null,this.width=null,this.height=null,this.loadStatus="not-loaded"}return Object.defineProperty(t.prototype,"spriteNames",{get:function(){var t=[];for(var e in this._spritesData)t.push(e);return t.sort(),t},enumerable:!0,configurable:!0}),t.prototype.getSpritePosition=function(t){return this._spritesData[t]},t.prototype.load=function(){var t=this;return this.loadStatus="loading",this.baseURL?this._loadSprites().then(function(){return t.loadStatus="loaded",t}).otherwise(function(e){return t.loadStatus="failed",t}):h.resolve(this)},t.prototype._loadSprites=function(){var t=this;this._isRetina=this.devicePixelRatio>1.15?!0:!1;var e=this.baseURL,i=this._isRetina?"@2x":"",r=o(e+i+".json",{callbackParamName:"callback",responseType:"json"}).then(function(e){t._spritesData=e.data}),h=new a,d=new Image;d.crossOrigin="anonymous",d.onload=function(){d.onload=null,t.width=d.width,t.height=d.height;var e=document.createElement("canvas");e.width=d.width,e.height=d.height;var i=e.getContext("2d");i.drawImage(d,0,0,d.width,d.height);for(var r,a=i.getImageData(0,0,d.width,d.height),n=new Uint8Array(a.data),o=0;o<n.length;o+=4)r=n[o+3]/255,n[o]=n[o]*r,n[o+1]=n[o+1]*r,n[o+2]=n[o+2]*r;t.image=n,h.resolve()};var l=""+e+i+".png";if(s.id){var u=s.id.findCredential(l);u&&u.token&&(l+="?token="+u.token)}return d.src=l,n([r,h.promise])},t}();return d});