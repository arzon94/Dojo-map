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

define(["require","exports","../../support/earthUtils","../../support/projectionUtils","../../support/intersectionUtils","../../lib/glMatrix"],function(i,t,e,n,r,s){var o=s.vec3d,a=s.vec4d,u=-.3*e.earthRadius,l=1.2,h=.5*Math.PI,c=h/Math.PI*180,p=h*e.earthRadius,f=.9*e.earthRadius,d=function(){function i(){this.extent=new Array(4),this.planes=new Array(4),this.maxSpan=0,this.center={origin:o.create(),direction:o.create()};for(var i=0;4>i;i++)this.extent[i]={origin:o.create(),originLength:0,direction:o.create(),cap:{next:null,direction:o.create()}},this.planes[i]=a.create();this.planes[4]=a.create()}return i.prototype.update=function(i,t,e,r,s,a){var u=this.extent;if(o.set3(i[0],i[1],a,u[0].origin),o.set3(i[2],i[1],a,u[1].origin),o.set3(i[2],i[3],a,u[2].origin),o.set3(i[0],i[3],a,u[3].origin),!s)for(var l=0;4>l;l++)n.vectorToVector(u[l].origin,r,u[l].origin,e);o.add(u[0].origin,u[2].origin,this.center.origin),o.scale(this.center.origin,.5),t(this.center.origin,this.center.direction);for(var l=0;4>l;l++){var h=u[l];t(h.origin,h.direction),h.originLength=o.length(h.origin);var c=u[3===l?0:l+1];h.cap.next=c.origin,o.direction(c.origin,h.origin,h.cap.direction),this._computePlane(h.cap.direction,h.direction,h.origin,this.planes[l])}this._computePlane(u[1].cap.direction,u[0].cap.direction,u[0].origin,this.planes[4]),this.maxSpan=Math.max(Math.abs(i[0]-i[2]),Math.abs(i[1]-i[3]))},i.prototype.isVisibleInFrustumGlobal=function(i){if(o.dot(this.center.direction,i.direction)<0)return!0;for(var t=0;4>t;t++){var e=this.extent[t];if(o.dot(e.direction,i.direction)<0)return!0}return!1},i.prototype.isVisibleInFrustum=function(i,t,e){if("global"===i.viewingMode){var n=i.spatialReference.isWGS84?c:p;if(this.maxSpan>n)return!0;if(t.altitude()>=f)return this.isVisibleInFrustumGlobal(t)}for(var s=0;s<this.extent.length;s++){var o=this.extent[s];if(r.frustumRay(t.planes,o.origin,null,o.direction))return!0;if(r.frustumLineSegment(t.planes,o.origin,o.cap.next,o.cap.direction))return!0}for(var s=0;s<t.lines.length;s++){var a=t.lines[s];if(r.frustumLineSegment(this.planes,a.origin,a.endpoint,a.direction))return!0}return!1},i.prototype._computePlane=function(i,t,e,n){o.cross(i,t,n),n[3]=-o.dot(n,e)},i}(),y=function(){function i(){this.frustumVisibility=!0,this.frustumVisibilityDirty=!0,this.extent=null,this.extentEngine=new d,this.extentEngineDirty=!0,this.renderSREqualsViewSR=null,this._isVisibleBelowSurface=!1,this.layerView=null}return i.prototype.initialize=function(i){this.layerView=i;var t=i.view.spatialReference,e=i.view.renderSpatialReference;this.renderSREqualsViewSR=e.equals(t)},i.prototype.destroy=function(){this.layerView=null,this.extent=null,this.extentEngine=null},i.prototype.needsIdleUpdate=function(){return this.frustumVisibilityDirty},i.prototype.canResume=function(){return this.frustumVisibility},i.prototype.setExtent=function(i){this.extent=i,this.extentEngineDirty=!0,this.frustumVisibilityDirty=!0},i.prototype.viewChange=function(){this.frustumVisibilityDirty=!0},i.prototype.elevationBoundsChange=function(){this.frustumVisibilityDirty=!0,this.extentEngineDirty=!0},Object.defineProperty(i.prototype,"isVisibleBelowSurface",{set:function(i){this._isVisibleBelowSurface=i,this.frustumVisibilityDirty=!0,this.extentEngineDirty=!0},enumerable:!0,configurable:!0}),i.prototype.idleUpdate=function(i){i.done()||this.frustumVisibilityDirty&&(this.updateSuspendFrustumVisible(),this.frustumVisibilityDirty=!1)},i.prototype.updateExtentEngine=function(){if(this.extentEngineDirty){this.extentEngineDirty=!1;var i,t=this.layerView.view,e=t.renderCoordsHelper.worldUpAtPosition;if(this._isVisibleBelowSurface)i=u;else{var n=t.basemapTerrain.getElevationBounds(),r=n[0],s=n[1],o=Math.max(1,(s-r)*(l-1));i=r-o}this.extentEngine.update(this.extent,e,t.renderSpatialReference,t.spatialReference,this.renderSREqualsViewSR,i)}},i.prototype.updateSuspendFrustumVisible=function(){if(!this.extent)return void(this.frustumVisibility=!0);this.updateExtentEngine();var i=this.layerView.view.getFrustum(),t=this.extentEngine.isVisibleInFrustum(this.layerView.view,i,this._isVisibleBelowSurface);t!==this.frustumVisibility&&(this.frustumVisibility=t,this.layerView._notifySuspendedChange())},i}();return y});