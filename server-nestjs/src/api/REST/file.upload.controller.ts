import { FilesInterceptor } from '@nestjs/platform-express';
//import { ParseFilePipeDocument } from './validate.file';
import { diskStorage } from 'multer';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Req,
  Body,
} from '@nestjs/common';
import { extname } from 'path';
import { Request } from 'express';

export const editFileName = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (arg0: any, arg1: any) => void,
) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

//rest controller to handle file uploads cuz graphql is shiet for that 🤦‍♂️🤦‍♂️
@Controller('fileController') //base path, full endpoint path: http://localhost:3000/fileController/uploads
export class FileController {
  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      limits: { files: 3 },
      storage: diskStorage({
        destination: './configFiles',
        filename: editFileName,
      }),
    }),
  )
  async uploadFiles(
    @Req() req: Request,
    @Body() body: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);

    //console.log(files);
    //not compatible with UseInterceptors
    // const validator = new ParseFilePipeDocument();
    // validator.transform(files);
  }
}
