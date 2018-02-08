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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/accessorSupport/decorators","../../core/lang","../../geometry/support/jsonUtils","../../core/JSONSupport","../../core/Logger"],function(e,r,t,o,a,s,n,i,p){var u=p.getLogger("esri.tasks.support.ProjectParameters"),c=function(e){function r(r){var t=e.call(this)||this;return t.geometries=null,t.outSpatialReference=null,t.transformation=null,t.transformForward=null,t}return t(r,e),Object.defineProperty(r.prototype,"outSR",{get:function(){return u.warn("ProjectParameters.outSR is deprecated. Use outSpatialReference instead."),this.outSpatialReference},set:function(e){u.warn("ProjectParameters.outSR is deprecated. Use outSpatialReference instead."),this.outSpatialReference=e},enumerable:!0,configurable:!0}),r.prototype.toJSON=function(){var e=this.geometries.map(function(e){return e.toJSON()}),r=this.geometries[0],t={};return t.outSR=this.outSpatialReference.wkid||JSON.stringify(this.outSpatialReference.toJSON()),t.inSR=r.spatialReference.wkid||JSON.stringify(r.spatialReference.toJSON()),t.geometries=JSON.stringify({geometryType:n.getJsonType(r),geometries:e}),this.transformation&&(t.transformation=this.transformation.wkid||JSON.stringify(this.transformation)),s.isDefined(this.transformForward)&&(t.transformForward=this.transformForward),t},r}(a.declared(i));return o([a.property()],c.prototype,"geometries",void 0),o([a.property({json:{read:{source:"outSR"}}})],c.prototype,"outSpatialReference",void 0),o([a.property({json:{read:!1}})],c.prototype,"outSR",null),o([a.property()],c.prototype,"transformation",void 0),o([a.property()],c.prototype,"transformForward",void 0),c=o([a.subclass("esri.tasks.support.ProjectParameters")],c)});