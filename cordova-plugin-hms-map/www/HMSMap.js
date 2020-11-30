/*
    Copyright 2020. Huawei Technologies Co., Ltd. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License")
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapStyleOptions = exports.CameraUpdateFactory = exports.enableLogger = exports.disableLogger = exports.setApiKey = exports.computeDistanceBetween = exports.requestPermission = exports.hasPermission = exports.showMap = exports.getMap = exports.sync = exports.maps = exports.TileType = exports.PatternItemType = exports.Hue = exports.JointType = exports.MapEvent = exports.MapType = exports.Color = exports.CameraMoveStartedReason = exports.ErrorCodes = exports.InterpolatorType = exports.AnimationSet = exports.Cap = exports.SquareCap = exports.RoundCap = exports.CustomCap = exports.ButtCap = void 0;
const utils_1 = require("./utils");
const interfaces_1 = require("./interfaces");
const circle_1 = require("./circle");
const marker_1 = require("./marker");
const groundOverlay_1 = require("./groundOverlay");
const tileOverlay_1 = require("./tileOverlay");
const polygon_1 = require("./polygon");
const polyline_1 = require("./polyline");
var polyline_2 = require("./polyline");
Object.defineProperty(exports, "ButtCap", { enumerable: true, get: function () { return polyline_2.ButtCap; } });
Object.defineProperty(exports, "CustomCap", { enumerable: true, get: function () { return polyline_2.CustomCap; } });
Object.defineProperty(exports, "RoundCap", { enumerable: true, get: function () { return polyline_2.RoundCap; } });
Object.defineProperty(exports, "SquareCap", { enumerable: true, get: function () { return polyline_2.SquareCap; } });
Object.defineProperty(exports, "Cap", { enumerable: true, get: function () { return polyline_2.Cap; } });
var interfaces_2 = require("./interfaces");
Object.defineProperty(exports, "AnimationSet", { enumerable: true, get: function () { return interfaces_2.AnimationSet; } });
Object.defineProperty(exports, "InterpolatorType", { enumerable: true, get: function () { return interfaces_2.InterpolatorType; } });
Object.defineProperty(exports, "ErrorCodes", { enumerable: true, get: function () { return interfaces_2.ErrorCodes; } });
Object.defineProperty(exports, "CameraMoveStartedReason", { enumerable: true, get: function () { return interfaces_2.CameraMoveStartedReason; } });
Object.defineProperty(exports, "Color", { enumerable: true, get: function () { return interfaces_2.Color; } });
Object.defineProperty(exports, "MapType", { enumerable: true, get: function () { return interfaces_2.MapType; } });
Object.defineProperty(exports, "MapEvent", { enumerable: true, get: function () { return interfaces_2.MapEvent; } });
Object.defineProperty(exports, "JointType", { enumerable: true, get: function () { return interfaces_2.JointType; } });
Object.defineProperty(exports, "Hue", { enumerable: true, get: function () { return interfaces_2.Hue; } });
Object.defineProperty(exports, "PatternItemType", { enumerable: true, get: function () { return interfaces_2.PatternItemType; } });
Object.defineProperty(exports, "TileType", { enumerable: true, get: function () { return interfaces_2.TileType; } });
exports.maps = new Map();
function initialPropsOf(map) {
    const clientRect = map.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(map, null);
    let props = {};
    props['x'] = clientRect.x;
    props['y'] = clientRect.y;
    props['width'] = parseInt(computedStyle.getPropertyValue('width'));
    props['height'] = parseInt(computedStyle.getPropertyValue('height'));
    return props;
}
function sync(mapId, mapDiv, components) {
    console.log(`SYNC_FUNCTION --- mapId = ${mapId},,,  ${JSON.stringify(components)}`);
    if (!exports.maps.has(mapId)) {
        const huaweiMap = new HuaweiMapImpl(mapDiv, mapId);
        exports.maps.set(mapId, huaweiMap);
    }
    const map = exports.maps.get(mapId);
    const hashMap = map.components;
    for (let i = 0; i < components.length; i++) {
        console.log(`[FOR_LOOP_TAG] -- ${JSON.stringify(components[i])}`);
        if (hashMap.has(components[i]['_id']))
            continue;
        let obj = null;
        let id = components[i]['_id'];
        if (components[i]['_type'] === "circle")
            obj = new circle_1.CircleImpl(mapDiv, mapId, id);
        else if (components[i]['_type'] === 'marker')
            obj = new marker_1.MarkerImpl(mapDiv, mapId, id);
        else if (components[i]['_type'] === 'polygon')
            obj = new polygon_1.PolygonImpl(mapDiv, mapId, id);
        else if (components[i]['_type'] === 'polyline')
            obj = new polyline_1.PolylineImpl(mapDiv, mapId, id);
        else if (components[i]['_type'] === 'groundOverlay')
            obj = new groundOverlay_1.GroundOverlayImpl(mapDiv, mapId, id);
        else if (components[i]['_type'] === 'tileOverlay')
            obj = new tileOverlay_1.TileOverlayImpl(mapDiv, mapId, id);
        hashMap.set(components[i]['_id'], obj);
    }
}
exports.sync = sync;
function getMap(divId, huaweiMapOptions, bounds) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!document.getElementById(divId))
            return Promise.reject(interfaces_1.ErrorCodes.toString(interfaces_1.ErrorCodes.NO_DOM_ELEMENT_FOUND));
        const initialProps = initialPropsOf(document.getElementById(divId));
        if (bounds) {
            if (bounds.marginTop)
                initialProps['marginTop'] = bounds.marginTop;
            if (bounds.marginBottom)
                initialProps['marginBottom'] = bounds.marginBottom;
        }
        const mapId = yield utils_1.asyncExec('HMSMap', 'initMap', [divId,
            { 'mapOptions': huaweiMapOptions, 'initialProps': initialProps }]);
        const huaweiMap = new HuaweiMapImpl(divId, mapId);
        exports.maps.set(huaweiMap.getId(), huaweiMap);
        return huaweiMap;
    });
}
exports.getMap = getMap;
function showMap(divId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!document.getElementById(divId))
            return Promise.reject(interfaces_1.ErrorCodes.toString(interfaces_1.ErrorCodes.NO_DOM_ELEMENT_FOUND));
        const mapId = yield utils_1.asyncExec("HMSMap", "showMap", [divId]);
        return exports.maps.get(mapId);
    });
}
exports.showMap = showMap;
function hasPermission() {
    return __awaiter(this, void 0, void 0, function* () {
        const json = yield utils_1.asyncExec("HMSMap", "hasPermission", []);
        return json.result;
    });
}
exports.hasPermission = hasPermission;
function requestPermission() {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.asyncExec("HMSMap", "requestPermission", []);
    });
}
exports.requestPermission = requestPermission;
function computeDistanceBetween(from, to) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.asyncExec("HMSMap", "computeDistanceBetween", [{ "from": from, "to": to }]);
    });
}
exports.computeDistanceBetween = computeDistanceBetween;
function setApiKey(apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.asyncExec("HMSMap", "setApiKey", [{ "apiKey": apiKey }]);
    });
}
exports.setApiKey = setApiKey;
function disableLogger() {
    return utils_1.asyncExec('HMSMap', 'disableLogger', []);
}
exports.disableLogger = disableLogger;
function enableLogger() {
    return utils_1.asyncExec('HMSMap', 'enableLogger', []);
}
exports.enableLogger = enableLogger;
class HuaweiMapImpl {
    constructor(divId, mapId) {
        this.components = new Map();
        console.log(`Huawei map constructed with the div id ${divId} :: and the props ${mapId}`);
        this.id = mapId;
        this.divId = divId;
        this.projection = new ProjectionImpl(divId);
        this.uiSettings = new UiSettingsImpl(divId);
        this.htmlElement = document.getElementById(divId);
        this.mo = new MutationObserver(() => {
            const x = document.getElementById(this.divId).getBoundingClientRect().x;
            const y = document.getElementById(this.divId).getBoundingClientRect().y;
            this.forceUpdateXAndY(x, y);
        });
        const config = { attributes: true, childList: true, subtree: true };
        this.mo.observe(document.body, config);
    }
    // IONIC FRAMEWORK SCROLL EVENT
    scroll() {
        const mapRect = document.getElementById(this.divId).getBoundingClientRect();
        this.forceUpdateXAndY(mapRect.x, mapRect.y);
    }
    destroyMap() {
        return __awaiter(this, void 0, void 0, function* () {
            this.components.clear();
            exports.maps.delete(this.id);
            return utils_1.asyncExec("HMSMap", "destroyMap", [this.divId]);
        });
    }
    hideMap() {
        return __awaiter(this, void 0, void 0, function* () {
            return utils_1.asyncExec("HMSMap", "hideMap", [this.divId]);
        });
    }
    on(event, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const fixedFunctionNameForJavaScript = `${event}_${this.id}`;
            const fixedFunctionNameForJava = `set${event[0].toUpperCase()}${event.substr(1)}Listener`;
            return utils_1.asyncExec('HMSMap', 'mapOptions', [this.divId, 'setListener', fixedFunctionNameForJava, { 'content': callback.toString() }])
                .then(value => {
                window.subscribeHMSEvent(fixedFunctionNameForJavaScript, callback);
            }).catch(err => console.log(err));
        });
    }
    addCircle(circleOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!circleOptions["center"])
                return Promise.reject(interfaces_1.ErrorCodes.toString(interfaces_1.ErrorCodes.CENTER_PROPERTY_MUST_DEFINED));
            const componentId = yield utils_1.asyncExec('HMSMap', 'addComponent', [this.divId, "CIRCLE", circleOptions]);
            const circle = new circle_1.CircleImpl(this.divId, this.id, componentId);
            this.components.set(circle.getId(), circle);
            return circle;
        });
    }
    addMarker(markerOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!markerOptions["position"])
                return Promise.reject(interfaces_1.ErrorCodes.toString(interfaces_1.ErrorCodes.POSITION_PROPERTY_MUST_DEFINED));
            const componentId = yield utils_1.asyncExec('HMSMap', 'addComponent', [this.divId, "MARKER", markerOptions]);
            const marker = new marker_1.MarkerImpl(this.divId, this.id, componentId);
            this.components.set(marker.getId(), marker);
            return marker;
        });
    }
    addGroundOverlay(groundOverlayOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!groundOverlayOptions["position"])
                return Promise.reject(interfaces_1.ErrorCodes.toString(interfaces_1.ErrorCodes.POSITION_PROPERTY_MUST_DEFINED));
            const componentId = yield utils_1.asyncExec('HMSMap', 'addComponent', [this.divId, "GROUND_OVERLAY", groundOverlayOptions]);
            const groundOverlay = new groundOverlay_1.GroundOverlayImpl(this.divId, this.id, componentId);
            this.components.set(groundOverlay.getId(), groundOverlay);
            return groundOverlay;
        });
    }
    addTileOverlay(tileOverlayOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const componentId = yield utils_1.asyncExec('HMSMap', 'addComponent', [this.divId, "TILE_OVERLAY", tileOverlayOptions]);
            const tileOverlay = new tileOverlay_1.TileOverlayImpl(this.divId, this.id, componentId);
            this.components.set(tileOverlay.getId(), tileOverlay);
            return tileOverlay;
        });
    }
    addPolygon(polygonOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!polygonOptions["points"])
                return Promise.reject(interfaces_1.ErrorCodes.toString(interfaces_1.ErrorCodes.POINTS_PROPERTY_MUST_DEFINED));
            const componentId = yield utils_1.asyncExec('HMSMap', 'addComponent', [this.divId, "POLYGON", polygonOptions]);
            const polygon = new polygon_1.PolygonImpl(this.divId, this.id, componentId);
            this.components.set(polygon.getId(), polygon);
            return polygon;
        });
    }
    addPolyline(polylineOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!polylineOptions["points"])
                return Promise.reject(interfaces_1.ErrorCodes.toString(interfaces_1.ErrorCodes.POINTS_PROPERTY_MUST_DEFINED));
            const componentId = yield utils_1.asyncExec('HMSMap', 'addComponent', [this.divId, "POLYLINE", polylineOptions]);
            const polyline = new polyline_1.PolylineImpl(this.divId, this.id, componentId);
            this.components.set(polyline.getId(), polyline);
            return polyline;
        });
    }
    animateCamera(cameraUpdate, cancelableCallback, durationMs) {
        const onFinishEventForJavascript = `${interfaces_1.MapEvent.ON_CANCELABLE_CALLBACK_FINISH}_${this.id}`;
        const onCancelEventForJavascript = `${interfaces_1.MapEvent.ON_CANCELABLE_CALLBACK_CANCEL}_${this.id}`;
        window[onFinishEventForJavascript] = cancelableCallback.onFinish;
        window[onCancelEventForJavascript] = cancelableCallback.onCancel;
        const props = {};
        if (cancelableCallback.onFinish)
            props["isOnFinish"] = true;
        if (cancelableCallback.onCancel)
            props["isOnCancel"] = true;
        if (durationMs)
            props["duration"] = durationMs;
        return cameraUpdate.animateCamera(this.divId, props);
    }
    moveCamera(cameraUpdate) {
        return cameraUpdate.moveCamera(this.divId);
    }
    clear() {
        this.components.clear();
        return this.getHuaweiMapOptions('clear');
    }
    resetMinMaxZoomPreference() {
        return this.getHuaweiMapOptions('resetMinMaxZoomPreference');
    }
    stopAnimation() {
        return this.getHuaweiMapOptions('stopAnimation');
    }
    getCameraPosition() {
        return this.getHuaweiMapOptions('getCameraPosition');
    }
    getMapType() {
        return this.getHuaweiMapOptions('getMapType');
    }
    getMaxZoomLevel() {
        return this.getHuaweiMapOptions('getMaxZoomLevel');
    }
    getMinZoomLevel() {
        return this.getHuaweiMapOptions('getMinZoomLevel');
    }
    getProjection() {
        return this.projection;
    }
    getUiSettings() {
        return this.uiSettings;
    }
    isBuildingsEnabled() {
        return this.getHuaweiMapOptions('isBuildingsEnabled');
    }
    isMyLocationEnabled() {
        return this.getHuaweiMapOptions('isMyLocationEnabled');
    }
    isTrafficEnabled() {
        return this.getHuaweiMapOptions('isTrafficEnabled');
    }
    isIndoorEnabled() {
        return this.getHuaweiMapOptions('isIndoorEnabled');
    }
    setBuildingsEnabled(buildingsEnabled) {
        return this.setHuaweiMapOptions('setBuildingsEnabled', { 'buildingsEnabled': buildingsEnabled });
    }
    setContentDescription(contentDescription) {
        return this.setHuaweiMapOptions('setContentDescription', { 'contentDescription': contentDescription });
    }
    setInfoWindowAdapter(infoWindowAdapter) {
        return this.setHuaweiMapOptions('setInfoWindowAdapter', { 'infoWindowAdapter': infoWindowAdapter });
    }
    setLatLngBoundsForCameraTarget(latLngBounds) {
        return this.setHuaweiMapOptions('setLatLngBoundsForCameraTarget', { 'latLngBounds': latLngBounds });
    }
    setLocationSource(locationSource) {
        return this.setHuaweiMapOptions('setLocationSource', { 'locationSource': locationSource });
    }
    setMapStyle(mapStyle) {
        return this.setHuaweiMapOptions('setMapStyle', { 'mapStyle': mapStyle.getResourceId() });
    }
    setMapType(mapType) {
        return this.setHuaweiMapOptions('setMapType', { 'mapType': mapType });
    }
    setMarkersClustering(markersClustering) {
        return this.setHuaweiMapOptions('setMarkersClustering', { 'markersClustering': markersClustering });
    }
    setMaxZoomPreference(maxZoomPreference) {
        return this.setHuaweiMapOptions('setMaxZoomPreference', { 'maxZoomPreference': maxZoomPreference });
    }
    setMinZoomPreference(minZoomPreference) {
        return this.setHuaweiMapOptions('setMinZoomPreference', { 'minZoomPreference': minZoomPreference });
    }
    setMyLocationEnabled(myLocationEnabled) {
        return this.setHuaweiMapOptions('setMyLocationEnabled', { 'myLocationEnabled': myLocationEnabled });
    }
    setPadding(left, top, right, bottom) {
        return this.setHuaweiMapOptions('setPadding', { 'left': left, 'top': top, 'right': right, 'bottom': bottom });
    }
    setTrafficEnabled(trafficEnabled) {
        return this.setHuaweiMapOptions('setTrafficEnabled', { 'trafficEnabled': trafficEnabled });
    }
    getComponent(key) {
        return this.components.get(key);
    }
    getId() {
        return this.id;
    }
    snapshot(onReadyCallback) {
        const eventName = `${interfaces_1.MapEvent.ON_SNAPSHOT_READY_CALLBACK}_${this.id}`;
        window[eventName] = onReadyCallback;
        return this.getHuaweiMapOptions('snapshot');
    }
    removeComponent(key) {
        if (this.components.has(key)) {
            this.components.get(key).remove();
            this.components.delete(key);
        }
        else {
            throw interfaces_1.ErrorCodes.toString(interfaces_1.ErrorCodes.NO_COMPONENT_EXISTS_GIVEN_ID);
        }
    }
    forceUpdateXAndY(x, y) {
        return utils_1.asyncExec("HMSMap", "forceUpdateXAndY", [this.divId, x, y]);
    }
    setHuaweiMapOptions(func, props) {
        return utils_1.asyncExec("HMSMap", "mapOptions", [this.divId, 'setHuaweiMapOptions', func, props]);
    }
    getHuaweiMapOptions(func) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield utils_1.asyncExec("HMSMap", "mapOptions", [this.divId, 'getHuaweiMapOptions', func, {}]);
            return result.value;
        });
    }
}
class UiSettingsImpl {
    constructor(mapDivId) {
        this.mapDivId = mapDivId;
    }
    isCompassEnabled() {
        return this.getUiSettings('isCompassEnabled');
    }
    isIndoorLevelPickerEnabled() {
        return this.getUiSettings('isIndoorLevelPickerEnabled');
    }
    isMapToolbarEnabled() {
        return this.getUiSettings('isMapToolbarEnabled');
    }
    isMyLocationButtonEnabled() {
        return this.getUiSettings('isMyLocationButtonEnabled');
    }
    isRotateGesturesEnabled() {
        return this.getUiSettings('isRotateGesturesEnabled');
    }
    isScrollGesturesEnabled() {
        return this.getUiSettings('isScrollGesturesEnabled');
    }
    isScrollGesturesEnabledDuringRotateOrZoom() {
        return this.getUiSettings('isScrollGesturesEnabledDuringRotateOrZoom');
    }
    isTiltGesturesEnabled() {
        return this.getUiSettings('isTiltGesturesEnabled');
    }
    isZoomControlsEnabled() {
        return this.getUiSettings('isZoomControlsEnabled');
    }
    isZoomGesturesEnabled() {
        return this.getUiSettings('isZoomGesturesEnabled');
    }
    setAllGesturesEnabled(allGesturesEnabled) {
        return this.setUiSettings('setAllGesturesEnabled', { 'allGesturesEnabled': allGesturesEnabled });
    }
    setCompassEnabled(compassEnabled) {
        return this.setUiSettings('setCompassEnabled', { 'compassEnabled': compassEnabled });
    }
    setIndoorLevelPickerEnabled(indoorLevelPickerEnabled) {
        return this.setUiSettings('setIndoorLevelPickerEnabled', { 'indoorLevelPickerEnabled': indoorLevelPickerEnabled });
    }
    setMapToolbarEnabled(mapToolbarEnabled) {
        return this.setUiSettings('setMapToolbarEnabled', { 'mapToolbarEnabled': mapToolbarEnabled });
    }
    setMyLocationButtonEnabled(myLocationButtonEnabled) {
        return this.setUiSettings('setMyLocationButtonEnabled', { 'myLocationButtonEnabled': myLocationButtonEnabled });
    }
    setRotateGesturesEnabled(rotateGesturesEnabled) {
        return this.setUiSettings("setRotateGesturesEnabled", { 'rotateGesturesEnabled': rotateGesturesEnabled });
    }
    setScrollGesturesEnabled(scrollGesturesEnabled) {
        return this.setUiSettings('setScrollGesturesEnabled', { 'scrollGesturesEnabled': scrollGesturesEnabled });
    }
    setScrollGesturesEnabledDuringRotateOrZoom(scrollGesturesEnabledDuringRotateOrZoom) {
        return this.setUiSettings('setScrollGesturesEnabledDuringRotateOrZoom', { 'scrollGesturesEnabledDuringRotateOrZoom': scrollGesturesEnabledDuringRotateOrZoom });
    }
    setTiltGesturesEnabled(tiltGesturesEnabled) {
        return this.setUiSettings('setTiltGesturesEnabled', { 'tiltGesturesEnabled': tiltGesturesEnabled });
    }
    setZoomControlsEnabled(zoomControlsEnabled) {
        return this.setUiSettings('setZoomControlsEnabled', { 'zoomControlsEnabled': zoomControlsEnabled });
    }
    setZoomGesturesEnabled(zoomGesturesEnabled) {
        return this.setUiSettings('setZoomGesturesEnabled', { 'zoomGesturesEnabled': zoomGesturesEnabled });
    }
    setUiSettings(func, props) {
        return utils_1.asyncExec('HMSMap', 'mapOptions', [this.mapDivId, 'setUiSettings', func, props]);
    }
    getUiSettings(func) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield utils_1.asyncExec("HMSMap", "mapOptions", [this.mapDivId, 'getUiSettings', func, {}]);
            return result.value;
        });
    }
}
class CameraUpdateImpl {
    moveCamera(mapId) {
        return utils_1.asyncExec('HMSMap', 'mapOptions', [mapId, "moveCamera", this.event, this.props]);
    }
    animateCamera(mapId, props) {
        return utils_1.asyncExec('HMSMap', 'mapOptions', [mapId, "animateCamera", this.event, Object.assign(Object.assign({}, this.props), props)]);
    }
}
class CameraUpdateFactory {
    constructor() {
    }
    static newCameraPosition(cameraPosition) {
        return this.constructCameraUpdateImpl("newCameraPosition", { 'cameraPosition': cameraPosition });
    }
    static newLatLng(latLng) {
        return this.constructCameraUpdateImpl("newLatLng", { 'latLng': latLng });
    }
    static newLatLngBounds(latLngBounds, padding, width, height) {
        let props = {};
        props['bounds'] = latLngBounds;
        props['padding'] = padding;
        if (width && height) {
            props['width'] = width;
            props['height'] = height;
        }
        return this.constructCameraUpdateImpl("newLatLngBounds", props);
    }
    static newLatLngZoom(latLng, zoom) {
        return this.constructCameraUpdateImpl("newLatLngZoom", { "latLng": latLng, "zoom": zoom });
    }
    static scrollBy(xPixel, yPixel) {
        return this.constructCameraUpdateImpl("scrollBy", { 'xPixel': xPixel, 'yPixel': yPixel });
    }
    static zoomBy(amount, focus) {
        let props = {};
        props['amount'] = amount;
        if (focus)
            props['focus'] = focus;
        return this.constructCameraUpdateImpl("zoomBy", props);
    }
    static zoomIn() {
        return this.constructCameraUpdateImpl("zoomIn", {});
    }
    static zoomOut() {
        return this.constructCameraUpdateImpl("zoomOut", {});
    }
    static zoomTo(zoom) {
        return this.constructCameraUpdateImpl("zoomTo", { "zoom": zoom });
    }
    static constructCameraUpdateImpl(event, props) {
        let cameraUpdate = new CameraUpdateImpl();
        cameraUpdate.event = event;
        cameraUpdate.props = props;
        return cameraUpdate;
    }
}
exports.CameraUpdateFactory = CameraUpdateFactory;
class ProjectionImpl {
    constructor(divId) {
        this.divId = divId;
    }
    fromScreenLocation(point) {
        return utils_1.asyncExec("HMSMap", "mapOptions", [this.divId, "projections", "fromScreenLocation", { "point": point }]);
    }
    getVisibleRegion() {
        return utils_1.asyncExec("HMSMap", "mapOptions", [this.divId, "projections", "getVisibleRegion", {}]);
    }
    toScreenLocation(latLng) {
        return utils_1.asyncExec("HMSMap", "mapOptions", [this.divId, "projections", "toScreenLocation", { "latLng": latLng }]);
    }
}
class MapStyleOptions {
    constructor(resourceId) {
        this.resourceId = resourceId;
    }
    static loadRawResourceStyle(resourceId) {
        return new MapStyleOptions(resourceId);
    }
    getResourceId() {
        return this.resourceId;
    }
}
exports.MapStyleOptions = MapStyleOptions;
//# sourceMappingURL=HMSMap.js.map
