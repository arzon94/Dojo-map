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

define(["require","exports"],function(e,t){function r(e,t){switch(t){case"primary":return"touch"===e.pointerType||0===e.button;case"secondary":return"touch"!==e.pointerType&&2===e.button;case"tertiary":return"touch"!==e.pointerType&&1===e.button}}Object.defineProperty(t,"__esModule",{value:!0}),t.eventMatchesPointerType=r});