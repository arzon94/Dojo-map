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

define(["require","exports","../../../../core/lang"],function(e,t,s){var n=function(){function e(e){e?this.set(e):(this.mode=null,this.offset=0,this.featureExpression=null,this.hasOffsetAdjustment=!1)}return e.prototype.set=function(e){this.mode=e.mode,this.offset=e.offset,this.featureExpression=e.featureExpression?s.clone(e.featureExpression):null,this.hasOffsetAdjustment=e.hasOffsetAdjustment},e}();return n});