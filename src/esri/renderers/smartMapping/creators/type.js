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

define(["require","exports","dojo/i18n!../../nls/smartMapping","dojo/_base/lang","../symbology/type","../../../core/promiseUtils","../../../core/lang","../support/utils","./support/utils","../../../views/SceneView","../statistics/uniqueValues","../../UniqueValueRenderer","../../support/utils"],function(e,r,l,a,o,n,t,u,s,i,c,d,y){function p(e){if(!e||!e.layer||!e.field&&!e.valueExpression)return n.reject(s.createError("type-renderer:missing-parameters","'layer' and 'field' or 'valueExpression' parameters are required"));var r=a.mixin({},e);return r.symbolType=r.symbolType||"2d",r.layer=u.createLayerAdapter(r.layer),r.numTypes=null==r.numTypes?10:r.numTypes,r.defaultSymbolEnabled=null==r.defaultSymbolEnabled?!0:r.defaultSymbolEnabled,r.sortBy=null==r.sortBy?"count":r.sortBy,r.statistics=t.clone(r.statistics),r.layer?r.layer.load().then(function(){var e=r.layer.geometryType,l=r.symbolType.indexOf("3d")>-1;if("mesh"===e)r.symbolType="3d-volumetric",r.colorMixMode=r.colorMixMode||"replace";else{if(l&&("polyline"===e||"polygon"===e))return n.reject(s.createError("type-renderer:not-supported","3d symbols are not supported for polyline and polygon layers"));if(r.symbolType.indexOf("3d-volumetric")>-1&&!(r.view instanceof i))return n.reject(s.createError("type-renderer:invalid-parameters","'view' parameter should be an instance of SceneView when 'symbolType' parameter is '3d-volumetric' or '3d-volumetric-uniform'"))}var a=u.getFieldsList({field:r.field,valueExpression:r.valueExpression}),o=s.verifyBasicFieldValidity(r.layer,a,"type-renderer:invalid-parameters");return o?n.reject(o):r}):n.reject(s.createError("type-renderer:invalid-parameters","'layer' must be one of these types: "+E))}function m(e,r){var l=e.typeScheme,a=e.basemap;if(l)l=o.cloneScheme(l);else{var n=o.getSchemes({basemap:e.basemap,geometryType:r,worldScale:e.symbolType.indexOf("3d-volumetric")>-1,view:e.view});l=n&&n.primaryScheme,a=n&&n.basemapId}return{scheme:l,basemapId:a}}function f(e,r){var l;return l=e.label<r.label?-1:e.label>r.label?1:0}function v(e,r){var l;return l=e.value<r.value?-1:e.value>r.value?1:0}function b(e,r){var l=r.count-e.count;return 0===l&&(l=f(e,r)),l}function h(e,r){var l=r.count-e.count;return 0===l&&(l=v(e,r)),l}function x(e,r,l){var a;"count"===r?(a=h,l&&l.codedValues&&(a=b)):"value"===r&&(a=v,l&&l.codedValues&&(a=f)),a&&e.sort(a)}function g(e,r){var o,n=e.uniqueValueInfos,t=r.layer,u=r.field,i=u?t.getField(u):null,c=i?t.getFieldDomain(i.name):null,p=-1===r.numTypes?n.length:r.numTypes,f=t.geometryType,v=m(r,f),b=v.scheme,h=new d({field:u}),g=-1,T={value:null,domain:c,fieldInfo:i};if(n.forEach(function(e,r){T.value=e.value,e.label=y.createUniqueValueLabel(T),null===e.value&&(g=r)}),g>-1&&(o=n.splice(g,1)[0]),x(n,r.sortBy,c),i&&i.type===S){var E=n.filter(function(e,r){return p>r}),V=E.map(function(e){return e.value});T.dateFormatInterval=y.calculateDateFormatInterval(V)}var M=s.createColors(b.colors,n.length);n.forEach(function(e,l){T.value=e.value,e.label=y.createUniqueValueLabel(T),e.symbol=s.createSymbol(b,M[l],f,r.symbolType,r.colorMixMode)}),r.valueExpression&&(h.valueExpression=r.valueExpression,h.valueExpressionTitle=r.valueExpressionTitle),h.legendOptions=r.legendOptions,M=s.createColors(b.colors,p);for(var I=0;p>I;I++){var q=n[I];q&&h.addUniqueValueInfo({value:q.value,label:q.label,symbol:s.createSymbol(b,M[I],f,r.symbolType,r.colorMixMode)})}r.defaultSymbolEnabled&&(h.defaultSymbol=s.createSymbol(b,b.noDataColor,f,r.symbolType,r.colorMixMode),h.defaultLabel=l.other),o&&(o.symbol=s.createSymbol(b,b.noDataColor,f,r.symbolType,r.colorMixMode),n.push(o));var w=[],j=h.uniqueValueInfos.length===n.length?-1:h.uniqueValueInfos.length;if(j>-1)for(var I=j;I<n.length;I++)w.push(a.mixin({},n[I]));return{renderer:h,uniqueValueInfos:n,excludedUniqueValueInfos:w,typeScheme:m(r,f).scheme,basemapId:v.basemapId}}function T(e){return p(e).then(function(e){var r=null!=e.statistics?n.resolve(e.statistics):c({layer:e.layer,field:e.field,valueExpression:e.valueExpression,returnAllCodedValues:e.returnAllCodedValues});return r.then(function(r){return g(r,e)})})}Object.defineProperty(r,"__esModule",{value:!0});var E=u.supportedLayerTypes.join(", "),S="date";r.createRenderer=T});