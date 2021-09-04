import { FormEvent, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { parseCookies } from 'nookies';

import { Input } from '../components/Input';
import { OpacityButton } from '../components/OpacityButton';

import { AuthContext } from '../contexts/AuthContext';

import styles from '../styles/SignIn.module.scss';
import { Form } from '../components/Form';

type SignInData = {
  email: string;
  password: string;
}

export default function SignIn() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [doTheDataMacth, setDoTheDataMatch] = useState(true);

  async function handleSignIn(event: FormEvent, data: SignInData) {
    event.preventDefault();

    try {
      await signIn(data);
    } catch (error) {
      setDoTheDataMatch(false);
      console.log(error);
      return;
    }
  }

  return (
    <div className={styles.signInPage}>
      <Head>
        <title>Entrar | Recycle.it</title>
      </Head>

      <div className={styles.signInContainer}>
        <span className={styles.logo}>
          <Image src="/recycleit.svg" alt="Recycle.it" width="28" height="24" />
          <span>Recycle.it</span>
        </span>

        <Form onSubmit={event => {
          handleSignIn(event, { email, password })
        }}>
          <h1>Entrar</h1>

          <fieldset>
            <Input
              type="email"
              placeholder="E-mail"
              required
              onChange={event => setEmail(event.target.value)}
              value={email}
            />
            <Input
              type="password"
              placeholder="Senha"
              required
              onChange={event => setPassword(event.target.value)}
              value={password}
            />
          </fieldset>

          <div>
            {
              (!doTheDataMacth)
              &&
              <span className={styles.formAlert}>
                * E-mail e/ou senha incorreto(s)
              </span>
            }

            <OpacityButton>
              Continuar
            </OpacityButton>
          </div>

        </Form>

        <span>Não tem uma conta? <Link href="/signup"><a>Criar uma conta</a></Link></span>
      </div>

      <div className={styles.otherLinks}>
        <Link href="/"><a>Ir para o mapa</a></Link>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ['recycleit.token']: token } = parseCookies(context);

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return { props: {} }
}
