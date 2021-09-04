import Dropzone, { DropEvent } from 'react-dropzone';
import { MdMoveToInbox } from 'react-icons/md';
import Image from 'next/dist/client/image';

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
          className={styles.imageUploadContainer}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {(selectedFile && selectedFile[0]) ? (
            <div className={styles.pointImage}>
              <span>Imagem enviada com sucesso.</span>
            </div>
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
