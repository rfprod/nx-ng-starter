import { FileUpload } from 'graphql-upload';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewFileUploadInputDto implements Partial<FileUpload> {
  @Field(_ => String)
  public filename: string;

  @Field(_ => String)
  public mimetype: string;

  @Field(_ => String)
  public encoding: string;
}
