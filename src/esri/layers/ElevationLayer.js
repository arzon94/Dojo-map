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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/accessorSupport/decorators","dojo/_base/lang","../request","../core/Error","../core/promiseUtils","../core/requireUtils","./TiledLayer","./mixins/ArcGISMapService","./mixins/ArcGISCachedService","./mixins/OperationalLayer","./mixins/PortalLayer","./support/rasterFormats/LercCodec"],function(e,r,t,o,a,i,n,p,l,s,u,c,y,d,v,h){var f=function(r){function o(e){var t=r.call(this)||this;return t.type="elevation",t.url=null,t.opacity=1,t.operationalLayerType="ArcGISTiledElevationServiceLayer",t}return t(o,r),o.prototype.normalizeCtorArgs=function(e,r){return"string"==typeof e?i.mixin({},{url:e},r):e},o.prototype.load=function(){var e=this;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Image Service"],supportsData:!1,validateItem:function(e){for(var r=0;r<e.typeKeywords.length;r++)if("elevation 3d layer"===e.typeKeywords[r].toLowerCase())return!0;throw new p("portal:invalid-layer-item-type","Invalid layer item type '${type}', expected '${expectedType}' ",{type:"Image Service",expectedType:"Image Service Elevation 3D Layer"})}}).always(function(){return e._fetchImageService()})),this},o.prototype.fetchTile=function(e,r,t,o){var a=this;return void 0===o&&(o=0),this.load().then(function(){return a._fetchTileAvailability(e,r,t)}).then(function(){var o=a.getTileUrl(e,r,t),i={responseType:"array-buffer",failOk:!0};return n(o,i)}).then(function(e){var r=h.decode(e.data,{noDataValue:o,returnFileInfo:!0});return{values:r.pixelData,width:r.width,height:r.height,maxZError:r.fileInfo.maxZError,noDataValue:r.noDataValue}})},o.prototype.queryElevation=function(r,t){var o=this;return s.when(e,"./support/ElevationQuery").then(function(e){var a=new e.ElevationQuery;return a.query(o,r,t)})},o.prototype._fetchTileAvailability=function(e,r,t){return this.tilemapCache?this.tilemapCache.fetchAvailability(e,r,t):l.resolve("unknown")},o.prototype._fetchImageService=function(){var e=this;return l.resolve().then(function(){if(e.resourceInfo)return e.resourceInfo;var r={query:i.mixin({f:"json"},e.parsedUrl.query),responseType:"json",callbackParamName:"callback"};return n(e.parsedUrl.path,r)}).then(function(r){r.ssl&&(e.url=e.url.replace(/^http:/i,"https:")),e.read(r.data,{origin:"service",url:e.parsedUrl})})},o}(a.declared(u,c,y,d,v));return o([a.shared({"3d":"../views/3d/layers/ElevationLayerView3D"})],f.prototype,"viewModulePaths",void 0),o([a.property()],f.prototype,"resourceInfo",void 0),o([a.property({json:{read:!1},value:"elevation",readOnly:!0})],f.prototype,"type",void 0),o([a.property()],f.prototype,"url",void 0),o([a.property({json:{read:!1,write:!1}})],f.prototype,"opacity",void 0),o([a.property()],f.prototype,"operationalLayerType",void 0),f=o([a.subclass("esri.layers.ElevationLayer")],f)});