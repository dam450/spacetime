import Link from 'next/link'

export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="max-w-[360px] text-center text-base leading-relaxed text-gray-100">
        Você ainda não registrou nenhuma lembrança, comece a{' '}
        <Link className="underline hover:text-gray-50" href="/memories/new">
          criar agora
        </Link>
        !
      </p>
    </div>
  )
}
