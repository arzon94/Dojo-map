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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/accessorSupport/decorators","../../../core/Accessor","../../../core/Evented","../../../core/HandleRegistry","../../../core/Promise","../../../geometry/Extent","./support/TileSet","../../../views/2d/tiling/TileQueue","../../../views/2d/tiling/TileStrategy","../../../views/2d/tiling/TileInfoView","../../../views/2d/tiling/TileKey","../../support/GraphicsManager","../../support/TileInfo"],function(e,t,r,i,n,a,s,o,u,l,c,h,p,f,d,g,y){var _=function(){function e(){this.key=new d(0,0,0,0)}return e.prototype.dispose=function(){},e}(),v=function(e){function t(t){var r=e.call(this)||this;return r._handles=new o,r._pendingQueries=new Map,r._tileRequests=new Map,r.layer=t.layer,r.layerView=t.layerView,r.graphics=t.graphics,r._tileInfo=y.create({spatialReference:r.layerView.view.spatialReference,size:512}),r._tileInfoView=new f(r._tileInfo),r._tileQueue=new h({tileInfoView:r._tileInfoView,process:function(e){return r._fetchTile(e)}}),r._tileSet=new c({layer:r.layer,tileInfo:r._tileInfo}),r._graphicsManager=new g({graphics:r.graphics,objectIdField:r.layer.objectIdField}),r._tileStrategy=new p({cachePolicy:"purge",acquireTile:function(e){return r._acquireTile(e)},releaseTile:function(e){return r._releaseTile(e)},tileInfoView:r._tileInfoView}),r._handles.add([r.layer.watch("definitionExpression",function(){return r._refresh()}),r.layer.on("edits",function(e){return r._editsHandler(e)})],"layer"),r}return r(t,e),t.prototype.destroy=function(){var e=this;this._pendingQueries.forEach(function(e){e.isFulfilled()||e.cancel()}),this._tileStrategy.tiles.forEach(function(t){return e._releaseTile(t)}),this._handles.destroy(),this._graphicsManager.destroy(),this._tileStrategy.destroy(),this._tileQueue.clear(),this._tileRequests.clear()},Object.defineProperty(t.prototype,"graphics",{set:function(e){var t=this,r=this._get("graphics");r!==e&&(this._handles.remove("graphics"),r&&r.forEach(function(e){return e.layer=null}),e&&(e.forEach(function(e){return e.layer=t.layer}),this._handles.add([e.on("after-add",function(e){return e.item.layer=t.layer}),e.on("after-remove",function(e){return e.item.layer=null})],"graphics")),this._set("graphics",e))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updating",{get:function(){return this._tileQueue.length>0},enumerable:!0,configurable:!0}),t.prototype.update=function(e){var t=this;this._tileQueue.pause(),this._tileQueue.state=e.state,this._tileStrategy.update(e),this._graphicsManager.removeAll(),this._tileStrategy.tiles.forEach(function(e){e.featureSet&&t._graphicsManager.add(e.featureSet.features,e.intentId)}),this._tileQueue.resume(),this.notifyChange("updating")},t.prototype._acquireTile=function(e){var t=this,r=new _;r.key.set(e);var i=this._tileQueue.push(r.key).then(function(e){r.attached=!0,r.featureSet=e.featureSet,r.intentId=e.intentId,t._graphicsManager.removeIntent(r.intentId),t.layerView.requestUpdate()});return this._tileRequests.set(r,i),this.notifyChange("updating"),r},t.prototype._releaseTile=function(e){if(this._tileRequests.has(e)){var t=this._tileRequests.get(e);t.isFulfilled()||t.cancel(),this._tileRequests["delete"](e),this.layerView.requestUpdate()}},t.prototype._fetchTile=function(e){var t=this,r=this._graphicsManager.createIntentToAdd(),i=this._tileSet.fetch(e).then(function(e){return{featureSet:e,intentId:r}});return i.otherwise(function(){return t._graphicsManager.removeIntent(r)}),i},t.prototype._refresh=function(){var e=this;this._tileQueue.reset(),this._tileStrategy.tiles.forEach(function(t){var r=e._graphicsManager.createIntentToAdd(),i=e._tileSet.fetch(t.key).then(function(i){return e._graphicsManager.remove(t.featureSet.features),t.intentId=r,t.featureSet=i,e._graphicsManager.add(t.featureSet.features,t.intentId),t});return i.always(function(){return e._graphicsManager.removeIntent(r)}),i}),this.notifyChange("updating")},t.prototype._editsHandler=function(e){var t=this,r=function(e){return e.objectId},i=e.deletedFeatures.map(r);this._graphicsManager["delete"](i);var n=e.addedFeatures.concat(e.updatedFeatures).map(r);if(n.length){var a=this.layer.createQuery();a.objectIds=n,a.outSpatialReference=this._tileInfo.spatialReference;var s=this._graphicsManager.createIntentToAdd(n),o=this.layer.queryFeatures(a);this._pendingQueries.set(s,o),this.notifyChange("updating"),o.then(function(e){return t._refetchHandler(e,s)}).always(function(){t._graphicsManager.removeIntent(s),t._pendingQueries["delete"](s),t.notifyChange("updating")})}},t.prototype._refetchHandler=function(e,t){var r=this,i=e.features;if(i){for(var n=this._tileInfo.spatialReference,a=function(e){var t=e.key.extent,a=new l({xmin:t[0],ymin:t[1],xmax:t[2],ymax:t[3],spatialReference:n});i.forEach(function(t){t.geometry&&a.intersects(t.geometry)&&r._addFeatureToTile(t,e)})},s=0,o=this._tileStrategy.tiles;s<o.length;s++){var u=o[s];a(u)}this._graphicsManager.add(i,t)}},t.prototype._addFeatureToTile=function(e,t){var r,i=t.featureSet.features||[],n=this.layer.objectIdField,a=e.attributes&&e.attributes[n];i.some(function(e){var t=e.attributes&&e.attributes[n];return t===a&&(r=e),!!r}),r?(r.geometry=e.geometry,r.attributes=e.attributes):i.push(e),t.featureSet.features=i},t}(n.declared(a,u,s));return i([n.property()],v.prototype,"graphics",null),i([n.property()],v.prototype,"layer",void 0),i([n.property()],v.prototype,"layerView",void 0),i([n.property()],v.prototype,"updating",null),v=i([n.subclass("esri.layers.graphics.controllers.OnDemandController2D")],v)});