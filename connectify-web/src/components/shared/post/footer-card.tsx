'use client'

import { Post } from '@/types/post'
import { ButtonLike } from '../like/button-like'
import { ButtonComment } from '../comment/button-comment'
import { useState } from 'react'
import { FormComment } from '../comment/form-comment'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { PiChatTeardropSlash } from 'react-icons/pi'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type FooterCardProps = {
  data: Post
}

export function FooterCard({ data }: FooterCardProps) {
  const [isOpenFormComment, setIsOpenFormComment] = useState<boolean>(false)

  return (
    <>
      <div className="flex justify-between gap-3">
        <ButtonLike data={data} />

        <ButtonComment
          isOpenFormComment={isOpenFormComment}
          setIsOpenFormComment={setIsOpenFormComment}
        />
      </div>

      {isOpenFormComment && (
        <>
          <FormComment
            postId={data.id}
            setIsOpenFormComment={setIsOpenFormComment}
          />

          {data.comments.length > 0 ? (
            <div className="flex flex-col items-center gap-2 mt-5">
              {data.comments.map((item) => (
                <article
                  key={item.id}
                  className="w-full p-2 bg-background rounded-md border border-foreground/20"
                >
                  <Link
                    href={`/${item.user.nickname}`}
                    className="flex items-center justify-between pb-1 whitespace-nowrap overflow-auto"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="z-0 w-8 h-8">
                        <AvatarImage
                          src={data.user.url_avatar ?? ''}
                          alt="Avatar"
                        />
                        <AvatarFallback>
                          {data.user.name.split(' ').map((item) => item[0])}
                        </AvatarFallback>
                      </Avatar>

                      <h2 className="font-bold text-sm text-foreground/80">
                        {item.user.nickname}
                      </h2>
                    </div>

                    <span className="text-sm text-foreground/80 whitespace-nowrap hidden sm:block">
                      {formatDistanceToNow(item.createdAt, {
                        locale: ptBR,
                        addSuffix: true,
                      })}
                    </span>
                  </Link>

                  <p className="m-auto text-foreground text-medium font-base pt-3 break-words overflow-auto">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <span className="text-sm mt-5 flex gap-3 items-center">
              <PiChatTeardropSlash />
              Nenhum comentário disponível
            </span>
          )}
        </>
      )}
    </>
  )
}
