import * as jspb from "google-protobuf"
import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';

export class CommonEntities extends jspb.Message {
  getCount(): number;
  setCount(value: number): void;

  getEntitiesList(): Array<CommonEntity>;
  setEntitiesList(value: Array<CommonEntity>): void;
  clearEntitiesList(): void;
  addEntities(value?: CommonEntity, index?: number): CommonEntity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommonEntities.AsObject;
  static toObject(includeInstance: boolean, msg: CommonEntities): CommonEntities.AsObject;
  static serializeBinaryToWriter(message: CommonEntities, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommonEntities;
  static deserializeBinaryFromReader(message: CommonEntities, reader: jspb.BinaryReader): CommonEntities;
}

export namespace CommonEntities {
  export type AsObject = {
    count: number,
    entitiesList: Array<CommonEntity.AsObject>,
  }
}

export class CommonEntity extends jspb.Message {
  getString1(): string;
  setString1(value: string): void;

  getNum1(): number;
  setNum1(value: number): void;

  getNum2(): number;
  setNum2(value: number): void;

  getBoolean1(): boolean;
  setBoolean1(value: boolean): void;

  getFloat1(): number;
  setFloat1(value: number): void;

  getAny1(): google_protobuf_any_pb.Any | undefined;
  setAny1(value?: google_protobuf_any_pb.Any): void;
  hasAny1(): boolean;
  clearAny1(): void;

  getSubentitiesarrayList(): Array<SubEntity>;
  setSubentitiesarrayList(value: Array<SubEntity>): void;
  clearSubentitiesarrayList(): void;
  addSubentitiesarray(value?: SubEntity, index?: number): SubEntity;

  getSubentittobj(): SubEntity | undefined;
  setSubentittobj(value?: SubEntity): void;
  hasSubentittobj(): boolean;
  clearSubentittobj(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommonEntity.AsObject;
  static toObject(includeInstance: boolean, msg: CommonEntity): CommonEntity.AsObject;
  static serializeBinaryToWriter(message: CommonEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommonEntity;
  static deserializeBinaryFromReader(message: CommonEntity, reader: jspb.BinaryReader): CommonEntity;
}

export namespace CommonEntity {
  export type AsObject = {
    string1: string,
    num1: number,
    num2: number,
    boolean1: boolean,
    float1: number,
    any1?: google_protobuf_any_pb.Any.AsObject,
    subentitiesarrayList: Array<SubEntity.AsObject>,
    subentittobj?: SubEntity.AsObject,
  }
}

export class SubEntity extends jspb.Message {
  getId(): string;
  setId(value: string): void;

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

export class CommonEntityFilterDto extends jspb.Message {
  getNum1(): number;
  setNum1(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommonEntityFilterDto.AsObject;
  static toObject(includeInstance: boolean, msg: CommonEntityFilterDto): CommonEntityFilterDto.AsObject;
  static serializeBinaryToWriter(message: CommonEntityFilterDto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommonEntityFilterDto;
  static deserializeBinaryFromReader(message: CommonEntityFilterDto, reader: jspb.BinaryReader): CommonEntityFilterDto;
}

export namespace CommonEntityFilterDto {
  export type AsObject = {
    num1: number,
  }
}

export class SampleServiceRequest extends jspb.Message {
  getInput1(): string;
  setInput1(value: string): void;

  getInput2(): string;
  setInput2(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SampleServiceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SampleServiceRequest): SampleServiceRequest.AsObject;
  static serializeBinaryToWriter(message: SampleServiceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SampleServiceRequest;
  static deserializeBinaryFromReader(message: SampleServiceRequest, reader: jspb.BinaryReader): SampleServiceRequest;
}

export namespace SampleServiceRequest {
  export type AsObject = {
    input1: string,
    input2: string,
  }
}

export class SampleServiceResponse extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): void;

  getData(): SampleServiceResponse.ResponseData | undefined;
  setData(value?: SampleServiceResponse.ResponseData): void;
  hasData(): boolean;
  clearData(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SampleServiceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SampleServiceResponse): SampleServiceResponse.AsObject;
  static serializeBinaryToWriter(message: SampleServiceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SampleServiceResponse;
  static deserializeBinaryFromReader(message: SampleServiceResponse, reader: jspb.BinaryReader): SampleServiceResponse;
}

export namespace SampleServiceResponse {
  export type AsObject = {
    status: string,
    data?: SampleServiceResponse.ResponseData.AsObject,
  }

  export class ResponseData extends jspb.Message {
    getStringvalue(): string;
    setStringvalue(value: string): void;

    getIntvalue(): number;
    setIntvalue(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResponseData.AsObject;
    static toObject(includeInstance: boolean, msg: ResponseData): ResponseData.AsObject;
    static serializeBinaryToWriter(message: ResponseData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResponseData;
    static deserializeBinaryFromReader(message: ResponseData, reader: jspb.BinaryReader): ResponseData;
  }

  export namespace ResponseData {
    export type AsObject = {
      stringvalue: string,
      intvalue: number,
    }
  }

}

