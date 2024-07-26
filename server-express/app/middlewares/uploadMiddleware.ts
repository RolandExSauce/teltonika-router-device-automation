import { Request, Response } from 'express'
import multer, { diskStorage } from 'multer'
import { basename, extname } from 'path'
import fs from 'fs'
import { matcherBeforeFileName } from '../../script/tools/utils'


//TODO:: later set limit on how many files the subfolders can contain
//create the subfolders
const createSubFolders = async (pathName: string) => {
  try {
    if (!fs.existsSync(pathName)) {
      fs.mkdirSync(pathName);
    }
    return pathName;
  } catch (err) {
    return pathName;
  }
}

// edit the filename
const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void
) => {
  // we will keep the original filename
  const originalName = basename(file.originalname, extname(file.originalname))
  const fileExtName = extname(file.originalname)
  const deviceTypeMatch = matcherBeforeFileName(originalName); // Match characters until the first underscore, e.g. will be: RUT950 or CSV

  //remove the part with the CSV_ or DeviceModell_ e.g RUT950_ etc for our file names
  let newFileName = originalName;
  if (deviceTypeMatch) {
    const deviceTypePart = deviceTypeMatch[0]; // Extract the matched part including the underscore
    newFileName = originalName.replace(deviceTypePart, ''); // Remove the deviceTypePart from the original name
  }
  callback(null, `${newFileName}${fileExtName}`)
}


//create diskStorage
const storage = diskStorage({
  destination: async (req: Request, file, callback) => {
    const fileName = file.originalname;
    const subFolderMatcher = matcherBeforeFileName(fileName); // Match characters until the first underscore
    const subFolderType = subFolderMatcher ? subFolderMatcher[1] : ''; //Extract the matched part

    //if matches CSV then store in database/imports folder else respectively
    const folderName = subFolderType === 'CSV' ? `app/database/imports/` :
      `script/configFiles/${subFolderType}/`;
    const uploadPath = await createSubFolders(folderName) as string
    callback(null, uploadPath);
  },
  filename: editFileName,
});

//upload middleware
const upload = multer({
  storage: storage,
});
const uploadMiddleware = upload.array('appFiles', 2); // only two files at once are allowed


// upload files controller
export const uploadSDKFile = async (req: Request, res: Response) => {
  uploadMiddleware(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send({ error: err.message });
    } else if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send('files uploaded successfully');
    }
  });
}
