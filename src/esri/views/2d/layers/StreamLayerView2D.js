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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/accessorSupport/decorators","./FeatureLayerView2D","../../layers/StreamLayerView"],function(e,r,t,a,o,s,c){var i=function(e){function r(){return e.call(this)||this}return t(r,e),r}(o.declared(c,s));return a([o.property({aliasOf:"controller.graphics",readOnly:!0})],i.prototype,"graphics",void 0),i=a([o.subclass("esri.views.2d.layers.StreamLayerView2D")],i)});