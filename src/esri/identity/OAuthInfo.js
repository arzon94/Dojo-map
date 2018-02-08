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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/accessorSupport/decorators","../core/JSONSupport"],function(o,r,t,p,e,i){var n=a=function(o){function r(r){var t=o.call(this)||this;return t._oAuthCred=null,t.appId=null,t.authNamespace="/",t.expiration=20160,t.forceLogin=!1,t.locale=null,t.minTimeUntilExpiration=30,t.popup=!1,t.popupCallbackUrl="oauth-callback.html",t.popupWindowFeatures="height=480,width=800,location,resizable,scrollbars,status",t.portalUrl="https://www.arcgis.com",t}return t(r,o),r.prototype.clone=function(){return a.fromJSON(this.toJSON())},r}(e.declared(i));p([e.property({json:{write:!0}})],n.prototype,"appId",void 0),p([e.property({json:{write:!0}})],n.prototype,"authNamespace",void 0),p([e.property({json:{write:!0}})],n.prototype,"expiration",void 0),p([e.property({json:{write:!0}})],n.prototype,"forceLogin",void 0),p([e.property({json:{write:!0}})],n.prototype,"locale",void 0),p([e.property({json:{write:!0}})],n.prototype,"minTimeUntilExpiration",void 0),p([e.property({json:{write:!0}})],n.prototype,"popup",void 0),p([e.property({json:{write:!0}})],n.prototype,"popupCallbackUrl",void 0),p([e.property({json:{write:!0}})],n.prototype,"popupWindowFeatures",void 0),p([e.property({json:{write:!0}})],n.prototype,"portalUrl",void 0),n=a=p([e.subclass("esri.identity.OAuthInfo")],n);var a;return n});