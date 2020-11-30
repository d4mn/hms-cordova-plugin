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
exports.CircleImpl = void 0;
const utils_1 = require("./utils");
class CircleImpl {
    constructor(mapDivId, mapCapsuleId, componentId) {
        this.mapDivId = mapDivId;
        this.mapCapsuleId = mapCapsuleId;
        this.id = componentId;
    }
    getCenter() {
        return this.getComponentOptions('getCenter');
    }
    getFillColor() {
        return this.getComponentOptions('getFillColor');
    }
    getId() {
        return this.id;
    }
    getRadius() {
        return this.getComponentOptions('getRadius');
    }
    getStrokeColor() {
        return this.getComponentOptions('getStrokeColor');
    }
    getStrokePattern() {
        return this.getComponentOptions('getStrokePattern');
    }
    getStrokeWidth() {
        return this.getComponentOptions('getStrokeWidth');
    }
    getTag() {
        return this.getComponentOptions('getTag');
    }
    getZIndex() {
        return this.getComponentOptions('getZIndex');
    }
    isClickable() {
        return this.getComponentOptions('isClickable');
    }
    isVisible() {
        return this.getComponentOptions('isVisible');
    }
    remove() {
        return utils_1.asyncExec("HMSMap", "removeComponent", [this.mapDivId, this.id]);
    }
    setCenter(center) {
        return this.setComponentOptions('setCenter', { 'center': center });
    }
    setFillColor(fillColor) {
        return this.setComponentOptions('setFillColor', { 'fillColor': fillColor });
    }
    setRadius(radius) {
        return this.setComponentOptions('setRadius', { 'radius': radius });
    }
    setStrokeColor(strokeColor) {
        return this.setComponentOptions('setStrokeColor', { 'strokeColor': strokeColor });
    }
    setStrokePattern(strokePattern) {
        return this.setComponentOptions('setStrokePattern', { 'strokePattern': strokePattern });
    }
    setStrokeWidth(strokeWidth) {
        return this.setComponentOptions('setStrokeWidth', { 'strokeWidth': strokeWidth });
    }
    setTag(tag) {
        return this.setComponentOptions('setTag', { 'tag': tag });
    }
    setZIndex(zIndex) {
        return this.setComponentOptions('setZIndex', { 'zIndex': zIndex });
    }
    setClickable(clickable) {
        return this.setComponentOptions('setClickable', { 'clickable': clickable });
    }
    setVisible(visible) {
        return this.setComponentOptions('setVisible', { 'visible': visible });
    }
    setComponentOptions(func, params) {
        return utils_1.asyncExec('HMSMap', 'componentOptions', [this.mapDivId, this.id, 'set', func, params]);
    }
    getComponentOptions(func) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield utils_1.asyncExec("HMSMap", "componentOptions", [this.mapDivId, this.id, 'get', func, {}]);
            return result.value;
        });
    }
}
exports.CircleImpl = CircleImpl;
//# sourceMappingURL=circle.js.map