import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Image
        width={500}
        height={500}
        src="/static/bg.png"
        alt={''}
        style={{ position: 'absolute' }}
      />
    </>
  )
}
