import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function Footer() {
  return (
    <footer className="flex h-20 items-center justify-center text-center">
      <p className="inline-flex items-center gap-2">
        Desenvolvido por{' '}
        <Link
          target="_blank"
          rel="noopener"
          href="https://www.linkedin.com/in/eduassuncao"
          className="inline-flex items-center gap-2"
        >
          <Avatar className="w-5 h-5">
            <AvatarImage src="https://github.com/cunhaedu.png" alt="Eduardo Assunção" />
            <AvatarFallback>EA</AvatarFallback>
          </Avatar>
          Eduardo Assunção
        </Link>
      </p>
    </footer>
  )
}
