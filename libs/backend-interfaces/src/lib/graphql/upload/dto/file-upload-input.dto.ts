import { Field, InputType } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';

@InputType()
export class AppFileUploadInputDto implements Partial<FileUpload> {
  @Field(() => String)
  public filename = '';

  @Field(() => String)
  public mimetype = '';

  @Field(() => String)
  public encoding = '';
}
