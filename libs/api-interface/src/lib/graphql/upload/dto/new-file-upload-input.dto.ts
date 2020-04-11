import { Field, InputType } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';

@InputType()
export class NewFileUploadInputDto implements Partial<FileUpload> {
  @Field(() => String)
  public filename: string;

  @Field(() => String)
  public mimetype: string;

  @Field(() => String)
  public encoding: string;
}
