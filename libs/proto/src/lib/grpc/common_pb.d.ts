import * as jspb from 'google-protobuf'

import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';


export class Entity extends jspb.Message {
  getId(): string;
  setId(value: string): Entity;

  getInteger(): number;
  setInteger(value: number): Entity;

  getBoolean(): boolean;
  setBoolean(value: boolean): Entity;

  getFloat(): number;
  setFloat(value: number): Entity;

  getAny(): google_protobuf_any_pb.Any | undefined;
  setAny(value?: google_protobuf_any_pb.Any): Entity;
  hasAny(): boolean;
  clearAny(): Entity;

  getSubentitiesList(): Array<SubEntity>;
  setSubentitiesList(value: Array<SubEntity>): Entity;
  clearSubentitiesList(): Entity;
  addSubentities(value?: SubEntity, index?: number): SubEntity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Entity.AsObject;
  static toObject(includeInstance: boolean, msg: Entity): Entity.AsObject;
  static serializeBinaryToWriter(message: Entity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Entity;
  static deserializeBinaryFromReader(message: Entity, reader: jspb.BinaryReader): Entity;
}

export namespace Entity {
  export type AsObject = {
    id: string,
    integer: number,
    pb_boolean: boolean,
    pb_float: number,
    any?: google_protobuf_any_pb.Any.AsObject,
    subentitiesList: Array<SubEntity.AsObject>,
  }
}

export class SubEntity extends jspb.Message {
  getId(): string;
  setId(value: string): SubEntity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubEntity.AsObject;
  static toObject(includeInstance: boolean, msg: SubEntity): SubEntity.AsObject;
  static serializeBinaryToWriter(message: SubEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubEntity;
  static deserializeBinaryFromReader(message: SubEntity, reader: jspb.BinaryReader): SubEntity;
}

export namespace SubEntity {
  export type AsObject = {
    id: string,
  }
}

export class EntityById extends jspb.Message {
  getId(): string;
  setId(value: string): EntityById;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntityById.AsObject;
  static toObject(includeInstance: boolean, msg: EntityById): EntityById.AsObject;
  static serializeBinaryToWriter(message: EntityById, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntityById;
  static deserializeBinaryFromReader(message: EntityById, reader: jspb.BinaryReader): EntityById;
}

export namespace EntityById {
  export type AsObject = {
    id: string,
  }
}

