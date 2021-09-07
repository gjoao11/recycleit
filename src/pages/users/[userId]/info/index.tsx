import { Layout } from "../../../../Layouts/Layout";
import { NextPage } from "next";
import Head from "next/head"

import styles from "../../../../styles/Info.module.scss";

export default function Info(){
  return (
    <div className={styles.conteiner}>
      <Head>
        <title>Sobre | Recycle.it</title>
      </Head>

      <div className={styles.title}>
        <h1>Sobre</h1>
        <hr></hr>
      </div>

      <div className={styles.content}>
        <p>
          Este site foi desenvolvido com o objetivo de atender as expectativas e os requisitos solicitados atribuídos ao nosso TCC
          (Trabalho de Conclusão de Curso), ofertado pelo Instituto Federal da Bahia/ Campus Euclides da Cunha, onde é necessário
          unir a pesquisa científica e os conhecimentos adquiridos durante o curso com um projeto.
        </p>
        <p>
          O TCC aborda os aspectos positivos que a reciclagem traz à sociedade brasileira e como sua adoção é mais vantajosa comparada 
          a outras que são utilizadas atualmente, apresentando informações como quantidade de lixo produzido por ano, porcentagem destes
          que são reciclados, tipos de lixos que recebem tal tratamento, aspectos positivos da reciclagem e negativos do atual modelo, entre outros.
        </p>
        <span>Alunos: João Gilberto e Pietro Rhyan.</span>
      </div>
    </div>
  )
}

// eslint-disable-next-line react/display-name
Info.getLayout = (page: NextPage) => (
  <Layout>
    {page}
  </Layout>
)