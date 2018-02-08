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

define(["require","exports","../core/tsSupport/extendsHelper","../core/tsSupport/decorateHelper","../core/typescript","./core/ExtensionConfigurationBase"],function(e,t,r,n,o,i){var s=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype._initializeResponseReceived=function(e){var t=this;this.inherited(arguments).then(function(){return t.getMapWidgetProxy(t.config.mapWidgetId).then(function(e){this.mapWidgetProxy=e})})},t}(i);return n([o.shared("esri.opsdashboard.MapToolConfigurationProxy")],s.prototype,"declaredClass",void 0),s=n([o.subclass()],s)});