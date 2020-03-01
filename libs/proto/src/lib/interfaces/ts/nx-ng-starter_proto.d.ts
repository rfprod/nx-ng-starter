import * as $protobuf from "protobufjs";
/** Namespace nxngstarter. */
export namespace nxngstarter {

    /** Properties of a CommonEntities. */
    interface ICommonEntities {

        /** CommonEntities count */
        count?: (number|null);

        /** CommonEntities entities */
        entities?: (nxngstarter.ICommonEntity[]|null);
    }

    /** Represents a CommonEntities. */
    class CommonEntities implements ICommonEntities {

        /**
         * Constructs a new CommonEntities.
         * @param [p] Properties to set
         */
        constructor(p?: nxngstarter.ICommonEntities);

        /** CommonEntities count. */
        public count: number;

        /** CommonEntities entities. */
        public entities: nxngstarter.ICommonEntity[];

        /**
         * Creates a CommonEntities message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns CommonEntities
         */
        public static fromObject(d: { [k: string]: any }): nxngstarter.CommonEntities;

        /**
         * Creates a plain object from a CommonEntities message. Also converts values to other types if specified.
         * @param m CommonEntities
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: nxngstarter.CommonEntities, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonEntities to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CommonEntity. */
    interface ICommonEntity {

        /** CommonEntity string1 */
        string1?: (string|null);

        /** CommonEntity num1 */
        num1?: (number|null);

        /** CommonEntity num2 */
        num2?: (number|null);

        /** CommonEntity boolean1 */
        boolean1?: (boolean|null);

        /** CommonEntity float1 */
        float1?: (number|null);

        /** CommonEntity any1 */
        any1?: (google.protobuf.IAny|null);

        /** CommonEntity subEntitiesArray */
        subEntitiesArray?: (nxngstarter.ISubEntity[]|null);

        /** CommonEntity subEntittObj */
        subEntittObj?: (nxngstarter.ISubEntity|null);
    }

    /** Represents a CommonEntity. */
    class CommonEntity implements ICommonEntity {

        /**
         * Constructs a new CommonEntity.
         * @param [p] Properties to set
         */
        constructor(p?: nxngstarter.ICommonEntity);

        /** CommonEntity string1. */
        public string1: string;

        /** CommonEntity num1. */
        public num1: number;

        /** CommonEntity num2. */
        public num2: number;

        /** CommonEntity boolean1. */
        public boolean1: boolean;

        /** CommonEntity float1. */
        public float1: number;

        /** CommonEntity any1. */
        public any1?: (google.protobuf.IAny|null);

        /** CommonEntity subEntitiesArray. */
        public subEntitiesArray: nxngstarter.ISubEntity[];

        /** CommonEntity subEntittObj. */
        public subEntittObj?: (nxngstarter.ISubEntity|null);

        /**
         * Creates a CommonEntity message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns CommonEntity
         */
        public static fromObject(d: { [k: string]: any }): nxngstarter.CommonEntity;

        /**
         * Creates a plain object from a CommonEntity message. Also converts values to other types if specified.
         * @param m CommonEntity
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: nxngstarter.CommonEntity, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonEntity to JSON.
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

    /** Properties of a CommonEntityFilterDto. */
    interface ICommonEntityFilterDto {

        /** CommonEntityFilterDto num1 */
        num1?: (number|null);
    }

    /** Represents a CommonEntityFilterDto. */
    class CommonEntityFilterDto implements ICommonEntityFilterDto {

        /**
         * Constructs a new CommonEntityFilterDto.
         * @param [p] Properties to set
         */
        constructor(p?: nxngstarter.ICommonEntityFilterDto);

        /** CommonEntityFilterDto num1. */
        public num1: number;

        /**
         * Creates a CommonEntityFilterDto message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns CommonEntityFilterDto
         */
        public static fromObject(d: { [k: string]: any }): nxngstarter.CommonEntityFilterDto;

        /**
         * Creates a plain object from a CommonEntityFilterDto message. Also converts values to other types if specified.
         * @param m CommonEntityFilterDto
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: nxngstarter.CommonEntityFilterDto, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonEntityFilterDto to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SampleServiceRequest. */
    interface ISampleServiceRequest {

        /** SampleServiceRequest input1 */
        input1?: (string|null);

        /** SampleServiceRequest input2 */
        input2?: (string|null);
    }

    /** Represents a SampleServiceRequest. */
    class SampleServiceRequest implements ISampleServiceRequest {

        /**
         * Constructs a new SampleServiceRequest.
         * @param [p] Properties to set
         */
        constructor(p?: nxngstarter.ISampleServiceRequest);

        /** SampleServiceRequest input1. */
        public input1: string;

        /** SampleServiceRequest input2. */
        public input2: string;

        /**
         * Creates a SampleServiceRequest message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns SampleServiceRequest
         */
        public static fromObject(d: { [k: string]: any }): nxngstarter.SampleServiceRequest;

        /**
         * Creates a plain object from a SampleServiceRequest message. Also converts values to other types if specified.
         * @param m SampleServiceRequest
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: nxngstarter.SampleServiceRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SampleServiceRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SampleServiceResponse. */
    interface ISampleServiceResponse {

        /** SampleServiceResponse status */
        status?: (string|null);

        /** SampleServiceResponse data */
        data?: (nxngstarter.SampleServiceResponse.IResponseData|null);
    }

    /** Represents a SampleServiceResponse. */
    class SampleServiceResponse implements ISampleServiceResponse {

        /**
         * Constructs a new SampleServiceResponse.
         * @param [p] Properties to set
         */
        constructor(p?: nxngstarter.ISampleServiceResponse);

        /** SampleServiceResponse status. */
        public status: string;

        /** SampleServiceResponse data. */
        public data?: (nxngstarter.SampleServiceResponse.IResponseData|null);

        /**
         * Creates a SampleServiceResponse message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns SampleServiceResponse
         */
        public static fromObject(d: { [k: string]: any }): nxngstarter.SampleServiceResponse;

        /**
         * Creates a plain object from a SampleServiceResponse message. Also converts values to other types if specified.
         * @param m SampleServiceResponse
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: nxngstarter.SampleServiceResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SampleServiceResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace SampleServiceResponse {

        /** Properties of a ResponseData. */
        interface IResponseData {

            /** ResponseData stringValue */
            stringValue?: (string|null);

            /** ResponseData intValue */
            intValue?: (number|null);
        }

        /** Represents a ResponseData. */
        class ResponseData implements IResponseData {

            /**
             * Constructs a new ResponseData.
             * @param [p] Properties to set
             */
            constructor(p?: nxngstarter.SampleServiceResponse.IResponseData);

            /** ResponseData stringValue. */
            public stringValue: string;

            /** ResponseData intValue. */
            public intValue: number;

            /**
             * Creates a ResponseData message from a plain object. Also converts values to their respective internal types.
             * @param d Plain object
             * @returns ResponseData
             */
            public static fromObject(d: { [k: string]: any }): nxngstarter.SampleServiceResponse.ResponseData;

            /**
             * Creates a plain object from a ResponseData message. Also converts values to other types if specified.
             * @param m ResponseData
             * @param [o] Conversion options
             * @returns Plain object
             */
            public static toObject(m: nxngstarter.SampleServiceResponse.ResponseData, o?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResponseData to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Represents a SampleService */
    class SampleService extends $protobuf.rpc.Service {

        /**
         * Constructs a new SampleService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Calls SampleServiceMethod.
         * @param request SampleServiceRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and SampleServiceResponse
         */
        public sampleServiceMethod(request: nxngstarter.ISampleServiceRequest, callback: nxngstarter.SampleService.SampleServiceMethodCallback): void;

        /**
         * Calls SampleServiceMethod.
         * @param request SampleServiceRequest message or plain object
         * @returns Promise
         */
        public sampleServiceMethod(request: nxngstarter.ISampleServiceRequest): Promise<nxngstarter.SampleServiceResponse>;
    }

    namespace SampleService {

        /**
         * Callback as used by {@link nxngstarter.SampleService#sampleServiceMethod}.
         * @param error Error, if any
         * @param [response] SampleServiceResponse
         */
        type SampleServiceMethodCallback = (error: (Error|null), response?: nxngstarter.SampleServiceResponse) => void;
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
