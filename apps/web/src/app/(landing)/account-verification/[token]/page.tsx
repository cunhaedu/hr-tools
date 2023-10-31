import Image from 'next/image';
import { AccountVerificationForm } from './account-verification-form';

interface AccountVerificationProps {
  params: {
    token: string
  }
}

export default function AccountVerification({ params }: AccountVerificationProps) {
  console.log(params.token);

  return (
    <>
      <div className="container h-[calc(100vh-6rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <aside className="hidden h-full lg:flex items-center justify-center p-2">
          <Image
            src="/static/illustrations/account_validation.png"
            alt='validation account image'
            width={400}
            height={400}
          />
        </aside>

        <main className="h-full mx-auto flex w-full flex-col justify-center sm:w-[350px]">
          <AccountVerificationForm token={params.token} />
        </main>
      </div>
    </>
  )
}
