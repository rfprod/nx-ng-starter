/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

const $util = $protobuf.util;

const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const nxngstarter = $root.nxngstarter = (() => {

    const nxngstarter = {};

    nxngstarter.Entity = (function() {

        function Entity(p) {
            this.subEntities = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        Entity.prototype.id = "";
        Entity.prototype.num1 = 0;
        Entity.prototype.num2 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        Entity.prototype.boolean1 = false;
        Entity.prototype.float1 = 0;
        Entity.prototype.any1 = null;
        Entity.prototype.subEntities = $util.emptyArray;

        Entity.fromObject = function fromObject(d) {
            if (d instanceof $root.nxngstarter.Entity)
                return d;
            var m = new $root.nxngstarter.Entity();
            if (d.id != null) {
                m.id = String(d.id);
            }
            if (d.num1 != null) {
                m.num1 = d.num1 | 0;
            }
            if (d.num2 != null) {
                if ($util.Long)
                    (m.num2 = $util.Long.fromValue(d.num2)).unsigned = false;
                else if (typeof d.num2 === "string")
                    m.num2 = parseInt(d.num2, 10);
                else if (typeof d.num2 === "number")
                    m.num2 = d.num2;
                else if (typeof d.num2 === "object")
                    m.num2 = new $util.LongBits(d.num2.low >>> 0, d.num2.high >>> 0).toNumber();
            }
            if (d.boolean1 != null) {
                m.boolean1 = Boolean(d.boolean1);
            }
            if (d.float1 != null) {
                m.float1 = Number(d.float1);
            }
            if (d.any1 != null) {
                if (typeof d.any1 !== "object")
                    throw TypeError(".nxngstarter.Entity.any1: object expected");
                m.any1 = $root.google.protobuf.Any.fromObject(d.any1);
            }
            if (d.subEntities) {
                if (!Array.isArray(d.subEntities))
                    throw TypeError(".nxngstarter.Entity.subEntities: array expected");
                m.subEntities = [];
                for (var i = 0; i < d.subEntities.length; ++i) {
                    if (typeof d.subEntities[i] !== "object")
                        throw TypeError(".nxngstarter.Entity.subEntities: object expected");
                    m.subEntities[i] = $root.nxngstarter.SubEntity.fromObject(d.subEntities[i]);
                }
            }
            return m;
        };

        Entity.toObject = function toObject(m, o) {
            if (!o)
                o = {};
            var d = {};
            if (o.arrays || o.defaults) {
                d.subEntities = [];
            }
            if (o.defaults) {
                d.id = "";
                d.num1 = 0;
                if ($util.Long) {
                    var n = new $util.Long(0, 0, false);
                    d.num2 = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                } else
                    d.num2 = o.longs === String ? "0" : 0;
                d.boolean1 = false;
                d.float1 = 0;
                d.any1 = null;
            }
            if (m.id != null && m.hasOwnProperty("id")) {
                d.id = m.id;
            }
            if (m.num1 != null && m.hasOwnProperty("num1")) {
                d.num1 = m.num1;
            }
            if (m.num2 != null && m.hasOwnProperty("num2")) {
                if (typeof m.num2 === "number")
                    d.num2 = o.longs === String ? String(m.num2) : m.num2;
                else
                    d.num2 = o.longs === String ? $util.Long.prototype.toString.call(m.num2) : o.longs === Number ? new $util.LongBits(m.num2.low >>> 0, m.num2.high >>> 0).toNumber() : m.num2;
            }
            if (m.boolean1 != null && m.hasOwnProperty("boolean1")) {
                d.boolean1 = m.boolean1;
            }
            if (m.float1 != null && m.hasOwnProperty("float1")) {
                d.float1 = o.json && !isFinite(m.float1) ? String(m.float1) : m.float1;
            }
            if (m.subEntities && m.subEntities.length) {
                d.subEntities = [];
                for (var j = 0; j < m.subEntities.length; ++j) {
                    d.subEntities[j] = $root.nxngstarter.SubEntity.toObject(m.subEntities[j], o);
                }
            }
            if (m.any1 != null && m.hasOwnProperty("any1")) {
                d.any1 = $root.google.protobuf.Any.toObject(m.any1, o);
            }
            return d;
        };

        Entity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Entity;
    })();

    nxngstarter.SubEntity = (function() {

        function SubEntity(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        SubEntity.prototype.id = "";

        SubEntity.fromObject = function fromObject(d) {
            if (d instanceof $root.nxngstarter.SubEntity)
                return d;
            var m = new $root.nxngstarter.SubEntity();
            if (d.id != null) {
                m.id = String(d.id);
            }
            return m;
        };

        SubEntity.toObject = function toObject(m, o) {
            if (!o)
                o = {};
            var d = {};
            if (o.defaults) {
                d.id = "";
            }
            if (m.id != null && m.hasOwnProperty("id")) {
                d.id = m.id;
            }
            return d;
        };

        SubEntity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SubEntity;
    })();

    nxngstarter.EntityById = (function() {

        function EntityById(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        EntityById.prototype.id = "";

        EntityById.fromObject = function fromObject(d) {
            if (d instanceof $root.nxngstarter.EntityById)
                return d;
            var m = new $root.nxngstarter.EntityById();
            if (d.id != null) {
                m.id = String(d.id);
            }
            return m;
        };

        EntityById.toObject = function toObject(m, o) {
            if (!o)
                o = {};
            var d = {};
            if (o.defaults) {
                d.id = "";
            }
            if (m.id != null && m.hasOwnProperty("id")) {
                d.id = m.id;
            }
            return d;
        };

        EntityById.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EntityById;
    })();

    nxngstarter.EntityService = (function() {

        function EntityService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (EntityService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = EntityService;


        Object.defineProperty(EntityService.prototype.findOne = function findOne(request, callback) {
            return this.rpcCall(findOne, $root.nxngstarter.EntityById, $root.nxngstarter.Entity, request, callback);
        }, "name", { value: "FindOne" });


        Object.defineProperty(EntityService.prototype.findMany = function findMany(request, callback) {
            return this.rpcCall(findMany, $root.nxngstarter.EntityById, $root.nxngstarter.Entity, request, callback);
        }, "name", { value: "FindMany" });

        return EntityService;
    })();

    return nxngstarter;
})();

export const google = $root.google = (() => {

    const google = {};

    google.protobuf = (function() {

        const protobuf = {};

        protobuf.Any = (function() {

            function Any(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            Any.prototype.type_url = "";
            Any.prototype.value = $util.newBuffer([]);

            Any.fromObject = function fromObject(d) {
                if (d instanceof $root.google.protobuf.Any)
                    return d;
                var m = new $root.google.protobuf.Any();
                if (d.type_url != null) {
                    m.type_url = String(d.type_url);
                }
                if (d.value != null) {
                    if (typeof d.value === "string")
                        $util.base64.decode(d.value, m.value = $util.newBuffer($util.base64.length(d.value)), 0);
                    else if (d.value.length)
                        m.value = d.value;
                }
                return m;
            };

            Any.toObject = function toObject(m, o) {
                if (!o)
                    o = {};
                var d = {};
                if (o.defaults) {
                    d.type_url = "";
                    if (o.bytes === String)
                        d.value = "";
                    else {
                        d.value = [];
                        if (o.bytes !== Array)
                            d.value = $util.newBuffer(d.value);
                    }
                }
                if (m.type_url != null && m.hasOwnProperty("type_url")) {
                    d.type_url = m.type_url;
                }
                if (m.value != null && m.hasOwnProperty("value")) {
                    d.value = o.bytes === String ? $util.base64.encode(m.value, 0, m.value.length) : o.bytes === Array ? Array.prototype.slice.call(m.value) : m.value;
                }
                return d;
            };

            Any.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Any;
        })();

        return protobuf;
    })();

    return google;
})();

export { $root as default };
