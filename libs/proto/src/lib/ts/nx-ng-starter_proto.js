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
        Entity.prototype.integer = 0;
        Entity.prototype.boolean = false;
        Entity.prototype.float = 0;
        Entity.prototype.any = null;
        Entity.prototype.subEntities = $util.emptyArray;

        Entity.fromObject = function fromObject(d) {
            if (d instanceof $root.nxngstarter.Entity)
                return d;
            var m = new $root.nxngstarter.Entity();
            if (d.id != null) {
                m.id = String(d.id);
            }
            if (d.integer != null) {
                m.integer = d.integer | 0;
            }
            if (d.boolean != null) {
                m.boolean = Boolean(d.boolean);
            }
            if (d.float != null) {
                m.float = Number(d.float);
            }
            if (d.any != null) {
                if (typeof d.any !== "object")
                    throw TypeError(".nxngstarter.Entity.any: object expected");
                m.any = $root.google.protobuf.Any.fromObject(d.any);
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
                d.integer = 0;
                d.boolean = false;
                d.float = 0;
                d.any = null;
            }
            if (m.id != null && m.hasOwnProperty("id")) {
                d.id = m.id;
            }
            if (m.integer != null && m.hasOwnProperty("integer")) {
                d.integer = m.integer;
            }
            if (m.boolean != null && m.hasOwnProperty("boolean")) {
                d.boolean = m.boolean;
            }
            if (m.float != null && m.hasOwnProperty("float")) {
                d.float = o.json && !isFinite(m.float) ? String(m.float) : m.float;
            }
            if (m.any != null && m.hasOwnProperty("any")) {
                d.any = $root.google.protobuf.Any.toObject(m.any, o);
            }
            if (m.subEntities && m.subEntities.length) {
                d.subEntities = [];
                for (var j = 0; j < m.subEntities.length; ++j) {
                    d.subEntities[j] = $root.nxngstarter.SubEntity.toObject(m.subEntities[j], o);
                }
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
