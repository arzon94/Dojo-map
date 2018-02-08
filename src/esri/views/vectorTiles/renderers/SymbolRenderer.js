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

define(["require","exports","./IconRenderer","./SDFRenderer"],function(e,r,n,i){var s=function(){function e(){this._iconRenderer=new n,this._sdfRenderer=new i}return e.prototype.dispose=function(){this._iconRenderer&&(this._iconRenderer.dispose(),this._iconRenderer=null),this._sdfRenderer&&(this._sdfRenderer.dispose(),this._sdfRenderer=null)},e.prototype.render=function(e,r,n,i,s,t,d,o,h,R,c,f,p){r.hasData()&&(r.markerPerPageElementsMap.size>0&&(r.isSDF||this._iconRenderer.render(e,r,n,i,s,t,d,o,R,c,p)),r.glyphPerPageElementsMap.size>0&&this._sdfRenderer.render(e,r,n,i,s,t,d,h,R,c,f,p))},e}();return s});