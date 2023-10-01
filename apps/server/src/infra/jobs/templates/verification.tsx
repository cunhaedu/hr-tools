import { Container } from '@react-email/container';
import { Heading } from '@react-email/heading';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Button } from '@react-email/button';
import { Head } from '@react-email/head';
import { Body } from '@react-email/body';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import { Img } from '@react-email/img';
import * as React from 'react';

type VerificationEmailData = {
  verificationUrl: string;
  userName: string;
};

export default function VerificationEmailTemplate({
  verificationUrl,
  userName,
}: VerificationEmailData) {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Confirme seu endereço de email</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={'../../../assets/logo.png'}
              width="120"
              height="36"
              alt="Ninebox"
            />
          </Section>
          <Heading style={h1}>Confirme seu endereço de email</Heading>
          <Text style={heroText}>
            Olá {userName}! Use o link abaixo para verificar seu email e iniciar
            sua jornada com o Ninebox.
          </Text>

          <Section style={verificationButtonSection}>
            <Button
              pX={20}
              pY={12}
              href={verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: '#2563eb', color: '#fff', margin: '0 auto' }}
            >
              Verificar email
            </Button>
          </Section>

          <Text style={text}>
            Se você não abriu uma conta no Ninebox por favor desconsidere este
            email ou entre em contato com nosso time!
          </Text>

          <Section>
            <Text style={footerText}>
              ©{currentYear} Ninebox, Todos os direitos reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const footerText = {
  fontSize: '12px',
  color: '#b7b7b7',
  lineHeight: '15px',
  textAlign: 'left' as const,
  marginBottom: '50px',
};

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '0 20px',
};

const logoContainer = {
  marginTop: '32px',
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px',
};

const heroText = {
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '30px',
};

const verificationButtonSection = {
  margin: '30px 0',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px',
};
