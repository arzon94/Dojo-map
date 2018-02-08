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

define(["require","exports","../../../../core/Logger","./Graphics3DIconSymbolLayer","./Graphics3DObjectSymbolLayer","./Graphics3DLineSymbolLayer","./Graphics3DPathSymbolLayer","./Graphics3DFillSymbolLayer","./Graphics3DExtrudeSymbolLayer","./Graphics3DTextSymbolLayer"],function(e,r,a,o,i,y,t,c,l,n){function p(e,r,a,o){var i=b[r.type];return i?new i(e,r,a,o):(s.error("GraphicsLayerFactory#make","unknown symbol type "+r.type),null)}Object.defineProperty(r,"__esModule",{value:!0});var s=a.getLogger("esri.views.3d.graphics");r.make=p;var b={icon:o,object:i,line:y,path:t,fill:c,extrude:l,text:n}});