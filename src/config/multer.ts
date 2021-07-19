import { diskStorage, Options } from "multer"
import { resolve } from "path"
import { randomBytes } from 'crypto'

export const multerConfig = {
  dest: resolve(__dirname, '..', '..', 'tmp', 'uploads'),

  storage: diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    filename: (_req, file, callback) => {
      randomBytes(16, (error, hash) => {
        if (error) {
          callback(error, file.filename)
        }

        const fileName = `${hash.toString('hex')}-${file.originalname}`

        callback(null, fileName)
      })
    }
  }),

  limits: {
    files: 1,
  },

  fileFilter: (_req, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ]

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new Error('Invalid file type.'))
    }
  }
} as Options