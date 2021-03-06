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

define(["../core/JSONSupport","./SpatialReference"],function(e,n){var t=e.createSubclass({declaredClass:"esri.geometry.Geometry",type:null,properties:{cache:{value:null,readOnly:!0,dependsOn:["spatialReference"],get:function(){return{}}},extent:{value:null,readOnly:!0,dependsOn:["spatialReference"]},hasM:!1,hasZ:!1,spatialReference:n.WGS84},isSR:function(e){return e&&("esri.SpatialReference"===e.declaredClass||null!=e.wkid)},clone:function(){return console.warn(".clone() is not implemented for "+this.declaredClass),null},toJSON:function(){return console.warn(".toJSON() is not implemented for "+this.declaredClass),null},clearCache:function(){this.notifyChange("cache")},getCacheValue:function(e){return this.cache[e]},setCacheValue:function(e,n){this.cache[e]=n}});return t});