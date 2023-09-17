import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="flex h-[80px] items-center justify-center text-center">
      <p className="inline-flex items-center gap-2">
        Created by{' '}
        <Link
          target="_blank"
          href="https://twitter.com/bukinoshita"
          className="inline-flex items-center gap-2"
        >
          <Image
            className="border-slate-7 inline-block rounded-full border"
            src="/static/eduardo.png"
            alt="Imagem de perfil do Eduardo Assunção, criador do sistema"
            width="20"
            height="20"
          />
          Eduardo Assunção
        </Link>
      </p>
    </footer>
  )
}
