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

define(["../../core/Accessor","../../core/kebabDictionary","dojo/_base/array"],function(e,t,n){var r=t({0:"default-curve-extension",1:"relocate-ends",2:"keep-end-attributes",4:"no-end-attributes",8:"no-extend-at-from",16:"no-extend-at-to"}),o=e.createSubclass({declaredClass:"esri.tasks.support.TrimExtendParameters",properties:{extendHow:"default-curve-extension",polylines:null,trimExtendTo:null},toJSON:function(){var e=n.map(this.polylines,function(e){return e.toJSON()}),t={};return t.polylines=JSON.stringify(e),t.trimExtendTo=JSON.stringify(this.trimExtendTo.toJSON()),t.sr=JSON.stringify(this.polylines[0].spatialReference.toJSON()),t.extendHow=r.toJSON(this.extendHow),t}});return o});