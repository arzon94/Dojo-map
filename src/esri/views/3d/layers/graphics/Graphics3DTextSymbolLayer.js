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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../Color","../../../../core/screenUtils","../../../../symbols/callouts/calloutUtils","./Graphics3DSymbolLayer","./Graphics3DGraphicLayer","./ElevationAligners","./Graphics3DSymbolCommonCode","./graphicUtils","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryUtil","../../webgl-engine/lib/TextTexture","../../webgl-engine/materials/HUDMaterial"],function(e,t,n,o,i,r,l,a,s,c,p,f,h,u,d){var g=[1,1,1,1],y=[0,0,1],v=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._elevationOptions={supportsOffsetAdjustment:!0,supportsOnTheGround:!1},t}return n(t,e),t.prototype._prepareResources=function(){if(!this._isPropertyDriven("size")){var e=p.validateSymbolLayerSize(this._getTextSize());if(e)return this._logWarning(e),void this.reject()}this._anchor="center",this.resolve()},t.prototype.destroy=function(){this.isFulfilled()||this.reject()},t.prototype.createGraphics3DGraphic=function(e,t,n,o){var i="polyline"===e.geometry.type,r=this._getGeometry(e);if(!r)return this._logWarning("unsupported geometry type for text symbol: "+e.geometry.type),null;var l=this._context.layer.id+"_label_"+e.uid,a=t.text||this.symbol.text;if(!a||a.length<1)return null;t&&null!=t.needsOffsetAdjustment&&(this._elevationOptions.needsOffsetAdjustment=t.needsOffsetAdjustment);var s=this.getGraphicElevationInfo(e,t.elevationOffset||0);return this._createAs3DShape(this.symbol,r,a,s,l,e.uid,t,n,o,i)},t.prototype.getGraphicElevationInfo=function(t,n){void 0===n&&(n=0);var o=e.prototype.getGraphicElevationInfo.call(this,t);return n&&(o.offset+=n),o},t.prototype._getGeometry=function(e){var t=e.geometry;return"polyline"===t.type?c.placePointOnPolyline(t):"polygon"===t.type?c.placePointOnPolygon(t):"extent"===t.type?t.center:"point"!==t.type?null:t},t.prototype.layerPropertyChanged=function(e,t,n){if("opacity"===e)this._logWarning("layer opacity change not yet implemented in Graphics3DTextSymbolLayer");else if("elevationInfo"===e){if(this._updateElevationInfo(),t)for(var o in t){var i=t[o],r=n(i);r&&this.updateGraphicElevationInfo(i.graphic,r)}return!0}return!1},t.prototype.updateGraphicElevationInfo=function(e,t){var n=this.getGraphicElevationInfo(e,t.metadata.elevationOffset);t.elevationInfo.set(n),t.needsElevationUpdates=c.needsElevationUpdates2D(n.mode)||"absolute-height"===n.mode},t.prototype._defaultElevationInfoNoZ=function(){return m},t.prototype._createAs3DShape=function(e,t,n,l,p,v,m,b,O,S){var _=m.centerOffset||x,G=m.screenOffset||[0,0],E=m.debugDrawBorder||!1,P=m.translation||[0,0,0],w=m.anchor||this._anchor||"center";this._anchor=w;var z,I=e.material?o.toUnitRGBA(e.material.color):g,T=e.halo&&e.halo.color&&e.halo.size>0,A=T?o.toUnitRGBA(e.halo.color):g,D=T?i.pt2px(e.halo.size):0,U=this._getTextSize(e),L=null!=O,j=new u(n,{size:U,color:I,font:{family:e.font&&e.font.family?e.font.family:"Arial",weight:e.font&&e.font.weight?e.font.weight:"normal",style:e.font&&e.font.style?e.font.style:"normal"},halo:{size:D,color:A},usedInAtlas:L},p),C=L?O.addTextTexture(j):null;b?z=m:r.isCalloutSupport(this.symbolContainer)&&this.symbolContainer.hasVisibleVerticalOffset()&&(z=this.symbolContainer);var W={textureId:L?C.texture.getId():j.getId(),texCoordScale:j.getTexcoordScale(),occlusionTest:!0,screenOffset:G,anchorPos:w,polygonOffset:!0,color:[1,1,1,1],centerOffsetUnits:m.centerOffsetUnits,debugDrawBorder:E,drawInSecondSlot:!0};if(z&&z.verticalOffset){var M=z.verticalOffset,B=M.screenLength,H=M.minWorldLength,R=M.maxWorldLength;W.verticalOffset={screenLength:i.pt2px(B),minWorldLength:H||0,maxWorldLength:null!=R?R:1/0}}if(this._context.screenSizePerspectiveEnabled){var F=this._context.sharedResources,N=F.screenSizePerspectiveSettings,V=F.screenSizePerspectiveSettingsLabels;W.screenSizePerspective=V.overridePadding(D),W.screenSizePerspectiveAlignment=N}S&&(W.shaderPolygonOffset=1e-4);var q=null,J=JSON.stringify(W);null!=b?(q=b.getMaterial(J),null==q?(q=new d(W,p),b.addMaterial(J,q)):L&&q.setTextureDirty()):q=new d(W,p);var Z=[q],k=[j.getTextWidth(),j.getTextHeight()],K=h.createPointGeometry(y,P,void 0,k,_,C?C.uvMinMax:null),Q=[new f(K,p)],X=this._context.layer.id,Y=c.createStageObjectForPoint.call(this,t,Q,[Z],null,null,l,p,X,v,!0),$=s.perObjectElevationAligner,ee=new a(this,Y.object,Q,null==b?Z:null,null==O?[j]:null,$,l);ee.alignedTerrainElevation=Y.terrainElevation,ee.needsElevationUpdates=c.needsElevationUpdates2D(l.mode)||"absolute-height"===l.mode;var te=j.getWidth(),ne=j.getHeight();return ee.getScreenSize=function(e){return void 0===e&&(e=new Array(2)),e[0]=te,e[1]=ne,e},ee.metadata={labelText:n,elevationOffset:m.elevationOffset||0},c.extendPointGraphicElevationInfo(ee,t,this._context.elevationProvider),ee},t.prototype._getTextSize=function(e){return i.pt2px((e||this.symbol).size)||12},t}(l),m={mode:"relative-to-ground",offset:0},x=[0,0,0,1];return v});