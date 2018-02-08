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

define(["require","exports","../../../symbols/Symbol3D","../../../symbols/SimpleMarkerSymbol","../../../symbols/PictureMarkerSymbol","../../../symbols/SimpleLineSymbol","../../../symbols/support/symbolUtils","../../../core/numberUtils","./utils"],function(e,n,r,l,t,i,o,u,a){function s(e){return e.isInstanceOf(l)}function f(e){return e.isInstanceOf(t)}function c(e){return e.isInstanceOf(i)}function m(e){return e.isInstanceOf(i)}function p(e){return e.isInstanceOf(r)}function y(e,n,r,l){var t=n.legendOptions,i=t&&t.customValues,s=v(e,r),f=!!s,c=!!i,m=null!=n.minSize&&null!=n.maxSize,p=n.stops&&n.stops.length>1,y=!!n.target;if(f&&(c||m||p&&!y)){var b=o.isVolumetricSymbol(s),h=null,g=null,S=null;g=b&&!p?[n.minDataValue,n.maxDataValue]:i||d(e,n,s,l),!g&&p&&(g=n.stops.map(function(e){return e.value}),h=n.stops.some(function(e){return!!e.label}),h&&(S=n.stops.map(function(e){return e.label})));var x=!b||g&&2===g.length;if(!g||!x)return null;var z=[12,30],I=g.map(function(r,t){var i=b?z[t]:O(e,n,s,r,l),o=V(s,i),f=h?S[t]:a.getLabelPrefix(t,g.length-1)+u.format(r);return{value:r,symbol:o,label:f,size:i}});return I.reverse()}}function v(e,n){var r=null,l=null;if("simple"===e.type)r=e.symbol;else if("uniqueValue"===e.type||"classBreaks"===e.type){var t=e.classBreakInfos||e.uniqueValueInfos,i=t&&t[0];r=i&&i.symbol,l=t.length>1}return!r||b(r)?null:(r=r.clone(),(n||l)&&(r.type.indexOf("3d")>-1?h(r):g(r)),r)}function b(e){if(e){if(e.type.indexOf("3d")>-1){var n=e.symbolLayers;return n?n.some(function(e){return e&&"fill"===e.type}):!1}return-1!==e.type.indexOf("fill-symbol")}}function h(e){o.isVolumetricSymbol(e)||(-1!==e.type.indexOf("line-symbol-3d")?e.symbolLayers.forEach(function(e){e.material={color:D}}):e.symbolLayers.forEach(function(e){"icon"!==e.type||e.resource&&e.resource.href?e.material={color:k}:(e.material={color:I},e.outline={color:D,size:1.5})}))}function g(e){-1!==e.type.indexOf("line-symbol")?e.color=D:(e.color=I,"simple-marker-symbol"===e.type&&(e.outline={color:D,width:1.5}))}function d(e,n,r,l){var t=e.getSizeRangeAtScale(n,l),i=t&&S(t);if(t||i){var o=i.map(function(e){return x(e,n,t)});o=u.round(o);for(var a=1;a<o.length-1;a++){var s=z(e,n,r,o[a],o[a-1],l);s&&(o[a]=s[0],i[a]=s[1])}return o}}function S(e){for(var n=e.minSize,r=e.maxSize,l=w,t=(r-n)/(l-1),i=[],o=0;l>o;o++)i.push(n+t*o);return i}function x(e,n,r){var l=r.minSize,t=r.maxSize,i=n.minDataValue,o=n.maxDataValue,u=null;if(l>=e)u=i;else if(e>=t)u=o;else{var a=(e-l)/(t-l);u=a*(o-i)+i}return u}function z(e,n,r,l,t,i){var o=O(e,n,r,l,i),a=O(e,n,r,t,i),s=u.numDigits(l),f=s.fractional,c=M,m=s.integer,p=null,y=null;l>0&&1>l&&(p=Math.pow(10,f),l*=p,m=u.numDigits(l).integer);for(var v=m-1;v>=0;v--){var b=Math.pow(10,v),h=Math.floor(l/b)*b,g=Math.ceil(l/b)*b;null!=p&&(h/=p,g/=p);var d=(h+g)/2;L=u.round([h,d,g],{indexes:[1]}),d=L[1];var S=O(e,n,r,h,i),x=O(e,n,r,g,i),z=O(e,n,r,d,i),V=u.percentChange(o,S,a,null),I=u.percentChange(o,x,a,null),k=u.percentChange(o,z,a,null),D=V.previous<=c,w=I.previous<=c;if(D&&w&&(V.previous<=I.previous?(D=!0,w=!1):(w=!0,D=!1)),D?y=[h,S]:w?y=[g,x]:k.previous<=c&&(y=[d,z]),y)break}return y;var L}function O(e,n,r,l,t){return e.getSize(l,{sizeInfo:n,scale:t,shape:-1!==r.type.indexOf("marker-symbol")?r.style:null})}function V(e,n){var r=e.clone();if(p(r))o.isVolumetricSymbol(r)||r.symbolLayers.forEach(function(e){"fill"!==e.type&&(e.size=n)});else if(s(r))r.size=n;else if(f(r)){var l=r.width,t=r.height;r.height=n,r.width=n*(l/t)}else c(r)?r.width=n:m(r)&&r.font&&(r.font.size=n);return r}Object.defineProperty(n,"__esModule",{value:!0});var I=[255,255,255],k=[200,200,200],D=[128,128,128],M=20,w=5;n.getRampStops=y});