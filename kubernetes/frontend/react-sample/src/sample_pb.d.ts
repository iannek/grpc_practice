import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

export class TemparatureComponent extends jspb.Message {
  getDate(): string;
  setDate(value: string): void;

  getHighTemperature(): number;
  setHighTemperature(value: number): void;

  getPlace(): string;
  setPlace(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TemparatureComponent.AsObject;
  static toObject(includeInstance: boolean, msg: TemparatureComponent): TemparatureComponent.AsObject;
  static serializeBinaryToWriter(message: TemparatureComponent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TemparatureComponent;
  static deserializeBinaryFromReader(message: TemparatureComponent, reader: jspb.BinaryReader): TemparatureComponent;
}

export namespace TemparatureComponent {
  export type AsObject = {
    date: string,
    highTemperature: number,
    place: string,
  }
}

export class TemparatureRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TemparatureRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TemparatureRequest): TemparatureRequest.AsObject;
  static serializeBinaryToWriter(message: TemparatureRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TemparatureRequest;
  static deserializeBinaryFromReader(message: TemparatureRequest, reader: jspb.BinaryReader): TemparatureRequest;
}

export namespace TemparatureRequest {
  export type AsObject = {
  }
}

export class TemparatureReply extends jspb.Message {
  getTemparaturesList(): Array<TemparatureComponent>;
  setTemparaturesList(value: Array<TemparatureComponent>): void;
  clearTemparaturesList(): void;
  addTemparatures(value?: TemparatureComponent, index?: number): TemparatureComponent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TemparatureReply.AsObject;
  static toObject(includeInstance: boolean, msg: TemparatureReply): TemparatureReply.AsObject;
  static serializeBinaryToWriter(message: TemparatureReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TemparatureReply;
  static deserializeBinaryFromReader(message: TemparatureReply, reader: jspb.BinaryReader): TemparatureReply;
}

export namespace TemparatureReply {
  export type AsObject = {
    temparaturesList: Array<TemparatureComponent.AsObject>,
  }
}

