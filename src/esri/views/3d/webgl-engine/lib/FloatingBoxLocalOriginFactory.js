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

define(["require","exports","./gl-matrix"],function(i,t,r){var s=r.vec3d,n=function(){function i(i,t){this._origins=[],this._boxSize=i,this._maxNumOrigins=t}return i.prototype.getOrigin=function(t){for(var r,n=this._origins.length,h=!1,a=Number.MAX_VALUE,o=0;n>o;o++){var _=this._origins[o],g=_.vec3;s.subtract(t,g,e),e[0]=Math.abs(e[0]),e[1]=Math.abs(e[1]),e[2]=Math.abs(e[2]);var u=e[0]+e[1]+e[2];a>u&&(r=_,a=u,h=e[0]<this._boxSize&&e[1]<this._boxSize&&e[2]<this._boxSize)}if(!h&&(!r||null==this._maxNumOrigins||this._origins.length<this._maxNumOrigins)){var b=i.OFFSET;r={vec3:[t[0]+b,t[1]+b,t[2]+b],id:i.ORIGIN_PREFIX+this._origins.length},this._origins.push(r)}return r},i}();n.OFFSET=1.11,n.ORIGIN_PREFIX="fb_";var e=s.create();return n});