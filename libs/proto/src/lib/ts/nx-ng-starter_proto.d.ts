import * as $protobuf from "protobufjs";
/** Namespace nxngstarter. */
export namespace nxngstarter {

    /** Properties of an Entity. */
    interface IEntity {

        /** Entity id */
        id?: (string|null);

        /** Entity integer */
        integer?: (number|null);

        /** Entity boolean */
        boolean?: (boolean|null);

        /** Entity float */
        float?: (number|null);

        /** Entity any */
        any?: (google.protobuf.IAny|null);

        /** Entity subEntities */
        subEntities?: (nxngstarter.ISubEntity[]|null);
    }

    /** Represents an Entity. */
    class Entity implements IEntity {

        /**
         * Constructs a new Entity.
         * @param [p] Properties to set
         */
        constructor(p?: nxngstarter.IEntity);

        /** Entity id. */
        public id: string;

        /** Entity integer. */
        public integer: number;

        /** Entity boolean. */
        public boolean: boolean;

        /** Entity float. */
        public float: number;

        /** Entity any. */
        public any?: (google.protobuf.IAny|null);

        /** Entity subEntities. */
        public subEntities: nxngstarter.ISubEntity[];

        /**
         * Creates an Entity message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns Entity
         */
        public static fromObject(d: { [k: string]: any }): nxngstarter.Entity;

        /**
         * Creates a plain object from an Entity message. Also converts values to other types if specified.
         * @param m Entity
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: nxngstarter.Entity, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Entity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SubEntity. */
    interface ISubEntity {

        /** SubEntity id */
        id?: (string|null);
    }

    /** Represents a SubEntity. */
    class SubEntity implements ISubEntity {

        /**
         * Constructs a new SubEntity.
         * @param [p] Properties to set
         */
        constructor(p?: nxngstarter.ISubEntity);

        /** SubEntity id. */
        public id: string;

        /**
         * Creates a SubEntity message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns SubEntity
         */
        public static fromObject(d: { [k: string]: any }): nxngstarter.SubEntity;

        /**
         * Creates a plain object from a SubEntity message. Also converts values to other types if specified.
         * @param m SubEntity
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: nxngstarter.SubEntity, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SubEntity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EntityById. */
    interface IEntityById {

        /** EntityById id */
        id?: (string|null);
    }

    /** Represents an EntityById. */
    class EntityById implements IEntityById {

        /**
         * Constructs a new EntityById.
         * @param [p] Properties to set
         */
        constructor(p?: nxngstarter.IEntityById);

        /** EntityById id. */
        public id: string;

        /**
         * Creates an EntityById message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns EntityById
         */
        public static fromObject(d: { [k: string]: any }): nxngstarter.EntityById;

        /**
         * Creates a plain object from an EntityById message. Also converts values to other types if specified.
         * @param m EntityById
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: nxngstarter.EntityById, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EntityById to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Represents an EntityService */
    class EntityService extends $protobuf.rpc.Service {

        /**
         * Constructs a new EntityService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Calls FindOne.
         * @param request EntityById message or plain object
         * @param callback Node-style callback called with the error, if any, and Entity
         */
        public findOne(request: nxngstarter.IEntityById, callback: nxngstarter.EntityService.FindOneCallback): void;

        /**
         * Calls FindOne.
         * @param request EntityById message or plain object
         * @returns Promise
         */
        public findOne(request: nxngstarter.IEntityById): Promise<nxngstarter.Entity>;

        /**
         * Calls FindMany.
         * @param request EntityById message or plain object
         * @param callback Node-style callback called with the error, if any, and Entity
         */
        public findMany(request: nxngstarter.IEntityById, callback: nxngstarter.EntityService.FindManyCallback): void;

        /**
         * Calls FindMany.
         * @param request EntityById message or plain object
         * @returns Promise
         */
        public findMany(request: nxngstarter.IEntityById): Promise<nxngstarter.Entity>;
    }

    namespace EntityService {

        /**
         * Callback as used by {@link nxngstarter.EntityService#findOne}.
         * @param error Error, if any
         * @param [response] Entity
         */
        type FindOneCallback = (error: (Error|null), response?: nxngstarter.Entity) => void;

        /**
         * Callback as used by {@link nxngstarter.EntityService#findMany}.
         * @param error Error, if any
         * @param [response] Entity
         */
        type FindManyCallback = (error: (Error|null), response?: nxngstarter.Entity) => void;
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [p] Properties to set
             */
            constructor(p?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param d Plain object
             * @returns Any
             */
            public static fromObject(d: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param m Any
             * @param [o] Conversion options
             * @returns Plain object
             */
            public static toObject(m: google.protobuf.Any, o?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
