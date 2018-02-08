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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/accessorSupport/decorators","../../core/JSONSupport","../../core/kebabDictionary","../../core/lang"],function(o,e,r,t,i,l,n,p){var a=n({esriFeatureEditToolAutoCompletePolygon:"auto-complete-polygon",esriFeatureEditToolCircle:"circle",esriFeatureEditToolEllipse:"ellipse",esriFeatureEditToolFreehand:"freehand",esriFeatureEditToolLine:"line",esriFeatureEditToolNone:"none",esriFeatureEditToolPoint:"point",esriFeatureEditToolPolygon:"polygon",esriFeatureEditToolRectangle:"rectangle",esriFeatureEditToolArrow:"arrow",esriFeatureEditToolTriangle:"triangle",esriFeatureEditToolLeftArrow:"left-arrow",esriFeatureEditToolRightArrow:"right-arrow",esriFeatureEditToolUpArrow:"up-arrow",esriFeatureEditToolDownArrow:"down-arrow"}),u=function(o){function e(e){var r=o.call(this,e)||this;return r.name=null,r.description=null,r.drawingTool=null,r.prototype=null,r.thumbnail=null,r}return r(e,o),e.prototype.writeDrawingTool=function(o,e){e.drawingTool=a.toJSON(o)},e.prototype.writePrototype=function(o,e){e.prototype=p.fixJson(p.clone(o),!0)},e.prototype.writeThumbnail=function(o,e){e.thumbnail=p.fixJson(p.clone(o))},e}(i.declared(l));return t([i.property({json:{write:!0}})],u.prototype,"name",void 0),t([i.property({json:{write:!0}})],u.prototype,"description",void 0),t([i.property({json:{read:a.fromJSON,write:!0}})],u.prototype,"drawingTool",void 0),t([i.writer("drawingTool")],u.prototype,"writeDrawingTool",null),t([i.property({json:{write:!0}})],u.prototype,"prototype",void 0),t([i.writer("prototype")],u.prototype,"writePrototype",null),t([i.property({json:{write:!0}})],u.prototype,"thumbnail",void 0),t([i.writer("thumbnail")],u.prototype,"writeThumbnail",null),u=t([i.subclass("esri.layers.support.FeatureTemplate")],u)});