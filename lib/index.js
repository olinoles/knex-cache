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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachCache = void 0;
const knex_1 = __importDefault(require("knex"));
const cache = {};
function attachCache() {
    function setCache(_a) {
        return __awaiter(this, arguments, void 0, function* ({ key }) {
            try {
                const cacheKey = key || this.toString();
                if (cache[cacheKey]) {
                    return cache[cacheKey];
                }
                const data = yield this;
                cache[cacheKey] = data;
                return data;
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    function invalidateCache({ key }) {
        try {
            const cacheKey = key || this.toString();
            if (cache[cacheKey]) {
                delete cache[cacheKey];
            }
            return this;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    function clearCache() {
        Object.keys(cache).forEach((key) => {
            delete cache[key];
        });
        return this;
    }
    knex_1.default.QueryBuilder.extend("cache", setCache);
    knex_1.default.QueryBuilder.extend("invalidate", invalidateCache);
    knex_1.default.QueryBuilder.extend("clearCache", clearCache);
}
exports.attachCache = attachCache;
