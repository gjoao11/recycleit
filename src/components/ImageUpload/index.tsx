import Dropzone from 'react-dropzone';
import { MdMoveToInbox, MdCheckCircle } from 'react-icons/md';

import styles from './ImageUpload.module.scss';

type ImageUploadProps = {
  onUpload: (file: any) => void;
  selectedFile: File[] | undefined;
}

export function ImageUpload({ onUpload, selectedFile }: ImageUploadProps) {
  return (
    <Dropzone accept="image/*" onDropAccepted={onUpload} maxFiles={1}>
      {({ getRootProps, getInputProps }) => (
        <div
          className={`
            ${styles.imageUploadContainer}
            ${(selectedFile && selectedFile[0]) ? styles.hasImage : ''}
          `}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {(selectedFile && selectedFile[0]) ? (
            <>
              <span>Imagem enviada com sucesso.</span>
              <div className={styles.icon}>
                <MdCheckCircle size={96} color={'#dedede'} />
              </div>
            </>
          ) : (
            <>
              <span>Arraste uma imagem até aqui.</span>
              <span>ou clique para selecionar</span>
              <div className={styles.icon}>
                <MdMoveToInbox size={144} color={'#dedede'} />
              </div>
            </>
          )}
        </div>
      )}
    </Dropzone>
  )
}
