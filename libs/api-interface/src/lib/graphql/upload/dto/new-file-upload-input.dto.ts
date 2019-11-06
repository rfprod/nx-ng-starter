import { Field, InputType } from 'type-graphql';

import { FileUpload } from 'graphql-upload';

@InputType()
export class NewFileUploadInputDto implements Partial<FileUpload> {
  @Field(_ => String)
  public filename: string;

  @Field(_ => String)
  public mimetype: string;

  @Field(_ => String)
  public encoding: string;
}
