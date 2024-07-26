import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';

//Add validation to file
@Injectable()
export class ParseFilePipeDocument implements PipeTransform {
  private readonly allowedExtensions = ['.bin', '.gz', '.csv']; //we will be dealing only with this 3 types of files

  transform(files: Express.Multer.File[]): void {
    for (const file of files) {
      const extension = extname(file.originalname);
      if (!this.allowedExtensions.includes(extension)) {
        throw new BadRequestException(
          `File type ${extension} not supported, only the following extensions are allowed: bin, gz, csv`,
        );
      }
    }
  }
}
