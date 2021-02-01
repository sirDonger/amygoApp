import { ApiProperty } from '@nestjs/swagger';

export class FilesUploadDto {
  @ApiProperty({
    title: 'Attachment',
    description: 'Size < 5Mb and format [jpg, png, svg, tiff, webp]',
    type: 'file',
    required: false,
  })
  documents: string;
}
