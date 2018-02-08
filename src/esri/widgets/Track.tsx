/**
 * Provides a simple button that animates the {@link module:esri/views/View}
 * to the user's location when clicked. While tracking, the default button looks like the following:
 *
 * ![track-button](../assets/img/apiref/widgets/widgets-track.png)
 *
 * You can use the view's {@link module:esri/views/ui/DefaultUI} to add widgets
 * to the view's user interface via the {@link module:esri/views/View#ui ui} property on the view. The snippet below demonstrates this.
 *
 * ::: esri-md class="panel trailer-1"
 * The Track widget is not supported on insecure origins.
 * To use it, switch your application to a secure origin, such as HTTPS.
 * Note that localhost is considered "potentially secure" and can be used for easy testing in browsers that supports
 * [Window.isSecureContext](https://developer.mozilla.org/en-US/docs/Web/API/Window/isSecureContext#Browser_compatibility)
 * (currently Chrome and Firefox).
 *
 * As of version 4.2, the Track Button no longer displays in non-secure web apps. At version
 * [4.1](https://blogs.esri.com/esri/arcgis/2016/04/14/increased-web-api-security-in-google-chrome/)
 * this only applied to Google Chrome.
 * :::
 * For additional information regarding this, visit the ArcGIS blog,
 * [Increased web API security in Google Chrome](https://blogs.esri.com/esri/arcgis/2016/04/14/increased-web-api-security-in-google-chrome/).
 * :::
 *
 * @module esri/widgets/Track
 * @since 4.0
 *
 * @see [Track.tsx (widget view)]({{ JSAPI_BOWER_URL }}/widgets/Track.tsx)
 * @see [button.scss]({{ JSAPI_BOWER_URL }}/themes/base/widgets/_Widget.scss)
 * @see module:esri/widgets/Track/TrackViewModel
 * @see {@link module:esri/views/View#ui View.ui}
 * @see module:esri/views/ui/DefaultUI
 * @see [Sample - track widget](../sample-code/widgets-track/index.html)
 *
 * @example
 * var trackWidget = new Track({
 *   view: view
 * });
 *
 * view.ui.add(trackWidget, "top-left");
 */

/// <amd-dependency path="../core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="../core/tsSupport/decorateHelper" name="__decorate" />

import {aliasOf, subclass, property, declared} from "../core/accessorSupport/decorators";
import {accessibleHandler, join, tsx, renderable, vmEvent} from "./support/widget";

import Widget = require("./Widget");
import TrackViewModel = require("./Track/TrackViewModel");
import Graphic = require("../Graphic");
import View = require("../views/View");

import * as i18n from "dojo/i18n!./Track/nls/Track";

const CSS = {
  base: "esri-track esri-widget-button esri-widget",
  text: "esri-icon-font-fallback-text",
  icon: "esri-icon",
  loading: "esri-icon-loading-indicator",
  rotating: "esri-rotating",
  startTrackingIcon: "esri-icon-tracking",
  stopTrackingIcon: "esri-icon-pause",

  // common
  disabled: "esri-disabled",
  hidden: "esri-hidden"
};

@subclass("esri.widgets.Track")
class Track extends declared(Widget) {

  /**
   * Fires after the [track()](#track) method is called and a position is found.
   *
   * @event module:esri/widgets/Track#track
   * @property {Object} position - Geoposition returned from the [Geolocation API](#geolocationOptions).
   */

  /**
   * Fires after the [track()](#track) method is called and an error is returned.
   *
   * @event module:esri/widgets/Track#track-error
   * @property {Error} error - The Error object returned if an error occurred while tracking.
   */

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * @constructor
   * @alias module:esri/widgets/Track
   * @extends module:esri/widgets/Widget
   * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
   *                              that may be passed into the constructor.
   *
   * @example
   * // typical usage
   * var track = new Track({
   *   view: view
   * });
   */
  constructor(params?: any) {
    super();
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  geolocationOptions
  //----------------------------------

  /**
   * The HTML5 Geolocation Position options for locating. Refer to
   * [Geolocation API Specification](http://www.w3.org/TR/geolocation-API/#position-options)
   * for details.
   *
   * @name geolocationOptions
   * @instance
   *
   * @type {Object}
   * @default { maximumAge: 0, timeout: 15000, enableHighAccuracy: true }
   */
  @aliasOf("viewModel.geolocationOptions")
  geolocationOptions: PositionOptions = null;

  //----------------------------------
  //  goToLocationEnabled
  //----------------------------------

  /**
   * Indicates whether the widget will automatically navigate the view to the user's position
   * when a geolocation result is found. Set to `false` to disable this behavior,
   * leaving full control to the developer.
   *
   * @name goToLocationEnabled
   * @instance
   *
   * @type {boolean}
   * @default true
   */
  @aliasOf("viewModel.goToLocationEnabled")
  goToLocationEnabled: boolean = null;

  //----------------------------------
  //  graphic
  //----------------------------------

  /**
   * The graphic used to show the user's location in the view.
   *
   * @name graphic
   * @instance
   * @autocast
   *
   * @type {module:esri/Graphic}
   *
   * @example
   * var trackWidget = new Track({
   *   view: view,  // Assigns the track widget to a view
   *     graphic: new Graphic({
   *       symbol: new SimpleMarkerSymbol()  // Overwrites the default symbol used for the
   *       // graphic placed at the location of the user when found
   *     })
   * });
   */
  @aliasOf("viewModel.graphic")
  graphic: Graphic = null;

  //----------------------------------
  //  tracking
  //----------------------------------

  /**
   * Indicates whether the widget is watching for new positions.
   *
   * @name tracking
   * @instance
   *
   * @type {boolean}
   * @readonly
   * @default false
   * @readonly
   */
  @aliasOf("viewModel.tracking")
  tracking: boolean = null;

  //----------------------------------
  //  view
  //----------------------------------

  /**
   * A reference to the {@link module:esri/views/MapView} or {@link module:esri/views/SceneView}. Set this to link the widget to a specific view.
   *
   * @name view
   * @instance
   *
   * @type {module:esri/views/MapView | module:esri/views/SceneView}
   */
  @aliasOf("viewModel.view")
  @renderable()
  view: View = null;

  //----------------------------------
  //  viewModel
  //----------------------------------

  /**
   * The view model for this widget. This is a class that contains all the logic
   * (properties and methods) that controls this widget's behavior. See the
   * {@link module:esri/widgets/Track/TrackViewModel} class to access
   * all properties and methods on the widget.
   *
   * @name viewModel
   * @instance
   * @type {module:esri/widgets/Track/TrackViewModel}
   * @autocast
   */
  @property({
    type: TrackViewModel
  })
  @renderable("viewModel.state")
  @vmEvent(["track", "track-error"])
  viewModel = new TrackViewModel();

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * When executed, the widget will start [tracking](#tracking) the
   * user's location.
   *
   * @method start
   * @instance
   */
  @aliasOf("viewModel.start")
  start(): void {}

  /**
   * Stops tracking the user's location when executed.
   *
   * @method stop
   * @instance
   */
  @aliasOf("viewModel.stop")
  stop(): void {}

  render() {
    const state = this.get("viewModel.state");

    const rootClasses = {
      [CSS.disabled]: state === "disabled",
      [CSS.hidden]: state === "feature-unsupported"
    };

    const isTracking = state === "tracking";
    const iconClasses = {
      [CSS.startTrackingIcon]: !isTracking && state !== "waiting",
      [CSS.stopTrackingIcon]: isTracking,
      [CSS.rotating]: state === "waiting",
      [CSS.loading]: state === "waiting"
    };

    const text = isTracking ? i18n.stopTracking : i18n.startTracking;

    return (
      <div bind={this} class={CSS.base} classes={rootClasses}
           hidden={state === "feature-unsupported"}
           onclick={this._toggleTracking} onkeydown={this._toggleTracking}
           role="button" tabIndex={0}>
        <span classes={iconClasses} aria-hidden="true"
              class={join(CSS.icon, CSS.startTrackingIcon)}
              title={text} />
        <span class={CSS.text}>{text}</span>
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  @accessibleHandler()
  private _toggleTracking() {
    const vm = this.viewModel;
    if (!vm) {
      return;
    }

    if (vm.tracking) {
      this.viewModel.stop();
      return;
    }

    this.viewModel.start();
  }

}

export = Track;

