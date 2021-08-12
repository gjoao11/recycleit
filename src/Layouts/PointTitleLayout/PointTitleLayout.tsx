import { useRouter } from 'next/router';
import styles from './PointTitleLayout.module.scss';

type PointTitleLayoutProps = {
    title: String,
    hasAButton?: boolean,
    buttonText?: String,
    buttonLinkDirection?: String;
    children: any,

}

export function PointTitleLayout(props: PointTitleLayoutProps){
    const router = useRouter()

    return (
        <div className={styles.conteiner}>
            <div className={styles.contentPointTitle}>
                <h1>{props.title}</h1>
                {props.hasAButton ?
                    <> 
                        <button onClick={() => router.push(`${props.buttonLinkDirection}`)}>{props.buttonText}</button> 
                    </> 
                : null}
            </div>

            <hr></hr>
        </div>
    );
}