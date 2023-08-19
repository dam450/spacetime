import Image from 'next/image'

import { getUser } from '@/lib/auth'

export function Profile() {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3 text-left ">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <Image
          className="h-10 w-10 rounded-full "
          src={avatarUrl}
          alt="imagem do usuário"
          width={40}
          height={40}
        />
      </div>
      <p className="max-w-[140px] text-sm leading-snug ">
        {name}
        <a
          className="block text-red-400 hover:text-red-300"
          href="/api/auth/logout"
        >
          sair
        </a>
      </p>
    </div>
  )
}
