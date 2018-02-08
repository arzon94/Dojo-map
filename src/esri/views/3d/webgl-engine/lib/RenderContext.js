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

define(["require","exports","./RenderSlot","./RenderPass"],function(e,n,t,l){var i=function(){function e(){this.camera=null,this.depth=null,this.highlight=null,this.lightingData=null,this.normals=null,this.pass=l.MATERIAL,this.shadowMap=null,this.slot=t.BACKGROUND,this.ssaoHelper=null,this.offscreenRenderingHelper=null,this.stencilRenderingHelper=null,this.framebufferTex=null,this.rctx=null,this.options=null}return Object.defineProperty(e.prototype,"isHighlightPass",{get:function(){return this.pass===l.MATERIAL_HIGHLIGHT},enumerable:!0,configurable:!0}),e}();return i});