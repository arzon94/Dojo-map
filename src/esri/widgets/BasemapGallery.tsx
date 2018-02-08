/**
 * The BasemapGallery widget displays a collection images representing basemaps from ArcGIS.com or a user-defined set
 * of map or image services. When a new basemap is selected from the BasemapGallery, the map's basemap
 * layers are removed and replaced with the basemap layers of the associated basemap selected in the gallery. By default,
 * the BasemapGallery widget looks like the following image.
 *
 * ![basemap-gallery](../assets/img/apiref/widgets/basemap-gallery.png)
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * All basemaps added to the gallery need to have the same spatial reference.
 * :::
 *
 * @module esri/widgets/BasemapGallery
 * @since 4.3
 *
 * @see [BasemapGallery.tsx (widget view)]({{ JSAPI_BOWER_URL }}/widgets/BasemapGallery.tsx)
 * @see [BasemapGallery.scss]({{ JSAPI_BOWER_URL }}/themes/base/widgets/_BasemapGallery.scss)
 * @see [Sample - BasemapGallery widget](../sample-code/widgets-basemapgallery/index.html)
 * @see module:esri/widgets/BasemapGallery/BasemapGalleryViewModel
 *
 * @example
 * var basemapGallery = new BasemapGallery({
 *   view: view
 * });
 * // Add widget to the bottom left corner of the view
 * view.ui.add(basemapGallery, {
 *   position: "top-right"
 * });
 */

/// <amd-dependency path="../core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="../core/tsSupport/decorateHelper" name="__decorate" />

import { BasemapsSource } from "./BasemapGallery/interfaces";
import { accessibleHandler, tsx, renderable } from "./support/widget";
import { aliasOf, subclass, declared, property } from "../core/accessorSupport/decorators";
import { on } from "../core/watchUtils";

import BasemapGalleryViewModel = require("./BasemapGallery/BasemapGalleryViewModel");
import BasemapGalleryItem = require("./BasemapGallery/support/BasemapGalleryItem");
import Widget = require("./Widget");
import Basemap = require("../Basemap");
import Collection = require("../core/Collection");
import HandleRegistry = require("../core/HandleRegistry");
import MapView = require("../views/MapView");
import SceneView = require("../views/SceneView");

import * as i18n from "dojo/i18n!./BasemapGallery/nls/BasemapGallery";

interface CollectionChangeEventPayload<T> {
  added: T[];
  removed: T[];
  moved: T[];
}

const DEFAULT_BASEMAP_IMAGE = require.toUrl("../themes/base/images/basemap-toggle-64.svg");

const CSS = {
  base: "esri-basemap-gallery esri-widget",
  sourceLoading: "esri-basemap-gallery--source-loading",
  loadingIndicator: "esri-basemap-gallery_loading-indicator",
  item: "esri-basemap-gallery__item",
  itemContainer: "esri-basemap-gallery__item-container",
  itemTitle: "esri-basemap-gallery__item-title",
  itemThumbnail: "esri-basemap-gallery__item-thumbnail",
  selectedItem: "esri-basemap-gallery__item--selected",
  itemLoading: "esri-basemap-gallery__item--loading",
  itemError: "esri-basemap-gallery__item--error",
  emptyMessage: "esri-basemap-gallery__empty-message",

  // common
  disabled: "esri-disabled"
};

@subclass("esri.widgets.BasemapGallery")
class BasemapGallery extends declared(Widget) {

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * @extends module:esri/widgets/Widget
   * @constructor
   * @alias module:esri/widgets/BasemapGallery
   * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
   *                                that may be passed into the constructor.
   *
   * @example
   * // typical usage
   * var basemapGallery = new BasemapGallery({
   *   view: view
   * });
   */
  constructor(params?: any) {
    super();
  }

  postInitialize() {
    this.own([
      on<CollectionChangeEventPayload<BasemapGalleryItem>>(this, "viewModel.items", "change", event => {
        const key = "basemap-gallery-item-changes";

        this._handleRegistry.remove(key);

        this._handleRegistry.add(
          event.added.map(item => {
            return item.watch("state", () => this.scheduleRender());
          }),
          key
        );
      }),

      this._handleRegistry
    ]);
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  private _handleRegistry = new HandleRegistry();

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  activeBasemap
  //----------------------------------

  /**
   * The map's {@link module:esri/Map#basemap basemap}.
   *
   * @type {module:esri/Basemap}
   * @name activeBasemap
   * @instance
   */
  @aliasOf("viewModel.activeBasemap")
  @renderable()
  activeBasemap: Basemap = null;

  //----------------------------------
  //  source
  //----------------------------------

  /**
   * The source for basemaps that the widget will display.
   * This property can be autocast with an array or {@link module:esri/core/Collection} of {@link module:esri/Basemap}s,
   * a {@link module:esri/portal/Portal} instance, or a URL to a portal instance.
   * The default source is a {@link module:esri/widgets/BasemapGallery/support/PortalBasemapsSource} that points to
   * the default portal instance set in {@link module:esri/config#portalUrl esriConfig.portalUrl}.
   *
   * @type {module:esri/widgets/BasemapGallery/support/LocalBasemapsSource | module:esri/widgets/BasemapGallery/support/PortalBasemapsSource}
   * @name source
   * @instance
   * @autocast
   *
   * @todo doc custom BasemapSource (interface) also supported
   */
  @aliasOf("viewModel.source")
  @renderable("source.state")
  source: BasemapsSource = null;

  //----------------------------------
  //  view
  //----------------------------------

  /**
   * The view from which the widget will operate. This view
   * provides access to the active
   * {@link module:esri/Map#basemap basemap}
   * via the view's {@link module:esri/views/View#map map} property.
   *
   * @name view
   * @instance
   * @type {module:esri/views/MapView | module:esri/views/SceneView}
   */
  @aliasOf("viewModel.view")
  @renderable()
  view: MapView | SceneView =  null;

  //----------------------------------
  //  viewModel
  //----------------------------------

  /**
   * The view model for this widget. This is a class that contains all the logic
   * (properties and methods) that controls this widget's behavior. See the
   * {@link module:esri/widgets/BasemapGallery/BasemapGalleryViewModel} class to access
   * all properties and methods on the widget.
   *
   * @name viewModel
   * @instance
   * @type {module:esri/widgets/BasemapGallery/BasemapGalleryViewModel}
   * @autocast
   */
  @property()
  @renderable([
    "viewModel.state"
  ])
  viewModel = new BasemapGalleryViewModel();

  //-------------------------------------------------------------------
  //
  //  Public methods
  //
  //-------------------------------------------------------------------

  render() {
    const sourceLoading = this.get("source.state") === "loading";
    const isDisabled = this.get("viewModel.state") === "disabled";
    const items = this.get<Collection<BasemapGalleryItem>>("viewModel.items").toArray()
      .map(this._renderBasemapGalleryItem, this);

    const rootClasses = {
      [CSS.sourceLoading]: sourceLoading,
      [CSS.disabled]: isDisabled
    };

    const loadingIndicator = sourceLoading ?
      <div class={CSS.loadingIndicator} key="esri-basemap-gallery_loading-indicator" /> :
      null;

    const content = sourceLoading ? null :
      items.length > 0 ?
        <ul class={CSS.itemContainer} key="esri-basemap-gallery__item-container" role="menu">{items}</ul> :
        <div class={CSS.emptyMessage} key="esri-basemap-gallery__empty-message">{i18n.noBasemaps}</div>;

    return (
      <div class={CSS.base} classes={rootClasses}>
        {loadingIndicator}
        {content}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private methods
  //
  //-------------------------------------------------------------------

  @accessibleHandler()
  private _handleClick(event: Event) {
    const item = event.currentTarget["data-item"] as BasemapGalleryItem;

    if (item.state === "ready") {
      this.activeBasemap = item.basemap;
    }
  }

  private _renderBasemapGalleryItem(item: BasemapGalleryItem): any {
    const thumbnailUrl = item.get<string>("basemap.thumbnailUrl");
    const thumbnailSource = thumbnailUrl || DEFAULT_BASEMAP_IMAGE;
    const title = item.get<string>("basemap.title");
    const tooltip = item.get<string>("error.message") || title;
    const tabIndex = item.state === "ready" ? 0 : -1;
    const isSelected = this.viewModel.basemapEquals(item.basemap, this.activeBasemap);

    const itemClasses = {
      [CSS.selectedItem]: isSelected,
      [CSS.itemLoading]: item.state === "loading",
      [CSS.itemError]: item.state === "error"
    };

    const loadingIndicator = item.state === "loading" ?
      <div class={CSS.loadingIndicator} key="esri-basemap-gallery_loading-indicator" /> :
      null;

    return (
      <li aria-selected={isSelected} bind={this} class={CSS.item} classes={itemClasses}
           data-item={item} onkeydown={this._handleClick} onclick={this._handleClick}
           role="menuitem" tabIndex={tabIndex} title={tooltip}>
        {loadingIndicator}
        <img alt="" class={CSS.itemThumbnail} src={thumbnailSource} />
        <div class={CSS.itemTitle}>{title}</div>
      </li>
    );
  }

}

export = BasemapGallery;
