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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/accessorSupport/decorators","../../../core/Accessor","./Evented"],function(e,r,t,i,n,o,s){var a=function(e){function r(r){var t=e.call(this)||this;return t.providers={im:[],ground:[],scene:[]},t.handles=new Map,t.elevationChange=function(e){t.emit("elevation-change",e)},t.view=r,t}return t(r,e),r.prototype.getElevation=function(e,r){var t=-(1/0),i=!1;if("scene"===r)for(var n=0,o=this.providers.im;n<o.length;n++){var s=o[n],a=s.getElevation(e,r);null!=a&&(t=Math.max(a,t),!i&&isFinite(t)&&(i=!0))}if(!i)for(var l=0,p=this.providers.ground;l<p.length;l++){var s=p[l],a=s.getElevation(e,r);null!=a&&(t=Math.max(a,t))}if("scene"===r)for(var v=0,d=this.providers.scene;v<d.length;v++){var s=d[v],a=s.getElevation(e,r);null!=a&&(t=Math.max(a,t))}return isFinite(t)?t:null},r.prototype.register=function(e,r){this.handles.set(r,r.on("elevation-change",this.elevationChange)),this.providers[e].push(r)},r.prototype.unregister=function(e){this.handles.has(e)&&(this.handles.get(e).remove(),this.handles["delete"](e));for(var r=0,t=Object.keys(this.providers);r<t.length;r++){var i=t[r],n=this.providers[i].indexOf(e);n>-1&&this.providers[i].splice(n,1)}},r}(n.declared(o,s.Evented));return i([n.property({readOnly:!0})],a.prototype,"view",void 0),i([n.property({readOnly:!0,aliasOf:"view.basemapTerrain.spatialReference"})],a.prototype,"spatialReference",void 0),a=i([n.subclass("esri.views.3d.support.CombinedElevationProvider")],a)});