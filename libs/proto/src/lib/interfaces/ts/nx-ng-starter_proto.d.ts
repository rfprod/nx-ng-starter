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
         * @param [properties] Properties to set
         */
        constructor(properties?: nxngstarter.ICommonEntities);

        /** CommonEntities count. */
        public count: number;

        /** CommonEntities entities. */
        public entities: nxngstarter.ICommonEntity[];

        /**
         * Creates a new CommonEntities instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonEntities instance
         */
        public static create(properties?: nxngstarter.ICommonEntities): nxngstarter.CommonEntities;

        /**
         * Encodes the specified CommonEntities message. Does not implicitly {@link nxngstarter.CommonEntities.verify|verify} messages.
         * @param message CommonEntities message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: nxngstarter.ICommonEntities, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonEntities message, length delimited. Does not implicitly {@link nxngstarter.CommonEntities.verify|verify} messages.
         * @param message CommonEntities message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: nxngstarter.ICommonEntities, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonEntities message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonEntities
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): nxngstarter.CommonEntities;

        /**
         * Decodes a CommonEntities message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonEntities
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): nxngstarter.CommonEntities;

        /**
         * Verifies a CommonEntities message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonEntities message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonEntities
         */
        public static fromObject(object: { [k: string]: any }): nxngstarter.CommonEntities;

        /**
         * Creates a plain object from a CommonEntities message. Also converts values to other types if specified.
         * @param message CommonEntities
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: nxngstarter.CommonEntities, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
         * @param [properties] Properties to set
         */
        constructor(properties?: nxngstarter.ICommonEntity);

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
         * Creates a new CommonEntity instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonEntity instance
         */
        public static create(properties?: nxngstarter.ICommonEntity): nxngstarter.CommonEntity;

        /**
         * Encodes the specified CommonEntity message. Does not implicitly {@link nxngstarter.CommonEntity.verify|verify} messages.
         * @param message CommonEntity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: nxngstarter.ICommonEntity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonEntity message, length delimited. Does not implicitly {@link nxngstarter.CommonEntity.verify|verify} messages.
         * @param message CommonEntity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: nxngstarter.ICommonEntity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonEntity message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonEntity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): nxngstarter.CommonEntity;

        /**
         * Decodes a CommonEntity message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonEntity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): nxngstarter.CommonEntity;

        /**
         * Verifies a CommonEntity message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonEntity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonEntity
         */
        public static fromObject(object: { [k: string]: any }): nxngstarter.CommonEntity;

        /**
         * Creates a plain object from a CommonEntity message. Also converts values to other types if specified.
         * @param message CommonEntity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: nxngstarter.CommonEntity, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
         * @param [properties] Properties to set
         */
        constructor(properties?: nxngstarter.ISubEntity);

        /** SubEntity id. */
        public id: string;

        /**
         * Creates a new SubEntity instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SubEntity instance
         */
        public static create(properties?: nxngstarter.ISubEntity): nxngstarter.SubEntity;

        /**
         * Encodes the specified SubEntity message. Does not implicitly {@link nxngstarter.SubEntity.verify|verify} messages.
         * @param message SubEntity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: nxngstarter.ISubEntity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SubEntity message, length delimited. Does not implicitly {@link nxngstarter.SubEntity.verify|verify} messages.
         * @param message SubEntity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: nxngstarter.ISubEntity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SubEntity message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SubEntity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): nxngstarter.SubEntity;

        /**
         * Decodes a SubEntity message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SubEntity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): nxngstarter.SubEntity;

        /**
         * Verifies a SubEntity message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SubEntity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SubEntity
         */
        public static fromObject(object: { [k: string]: any }): nxngstarter.SubEntity;

        /**
         * Creates a plain object from a SubEntity message. Also converts values to other types if specified.
         * @param message SubEntity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: nxngstarter.SubEntity, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
         * @param [properties] Properties to set
         */
        constructor(properties?: nxngstarter.ICommonEntityFilterDto);

        /** CommonEntityFilterDto num1. */
        public num1: number;

        /**
         * Creates a new CommonEntityFilterDto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonEntityFilterDto instance
         */
        public static create(properties?: nxngstarter.ICommonEntityFilterDto): nxngstarter.CommonEntityFilterDto;

        /**
         * Encodes the specified CommonEntityFilterDto message. Does not implicitly {@link nxngstarter.CommonEntityFilterDto.verify|verify} messages.
         * @param message CommonEntityFilterDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: nxngstarter.ICommonEntityFilterDto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonEntityFilterDto message, length delimited. Does not implicitly {@link nxngstarter.CommonEntityFilterDto.verify|verify} messages.
         * @param message CommonEntityFilterDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: nxngstarter.ICommonEntityFilterDto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonEntityFilterDto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonEntityFilterDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): nxngstarter.CommonEntityFilterDto;

        /**
         * Decodes a CommonEntityFilterDto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonEntityFilterDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): nxngstarter.CommonEntityFilterDto;

        /**
         * Verifies a CommonEntityFilterDto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonEntityFilterDto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonEntityFilterDto
         */
        public static fromObject(object: { [k: string]: any }): nxngstarter.CommonEntityFilterDto;

        /**
         * Creates a plain object from a CommonEntityFilterDto message. Also converts values to other types if specified.
         * @param message CommonEntityFilterDto
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: nxngstarter.CommonEntityFilterDto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonEntityFilterDto to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Empty. */
        interface IEmpty {
        }

        /** Represents an Empty. */
        class Empty implements IEmpty {

            /**
             * Constructs a new Empty.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEmpty);

            /**
             * Creates a new Empty instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Empty instance
             */
            public static create(properties?: google.protobuf.IEmpty): google.protobuf.Empty;

            /**
             * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Empty;

            /**
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Empty;

            /**
             * Verifies an Empty message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Empty message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Empty
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Empty;

            /**
             * Creates a plain object from an Empty message. Also converts values to other types if specified.
             * @param message Empty
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Empty, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Empty to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

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
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Creates a new Any instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Any instance
             */
            public static create(properties?: google.protobuf.IAny): google.protobuf.Any;

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Any;

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Any;

            /**
             * Verifies an Any message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Any
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param message Any
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Any, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
