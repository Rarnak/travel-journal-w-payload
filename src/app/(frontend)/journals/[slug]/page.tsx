import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Media } from '@/payload-types'

type PageProp = {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: PageProp) {
  const slug = (await params).slug

  const payload = await getPayload({ config })

  const journals = await payload.find({
    collection: 'journals',
    where: {
      and: [{ status: { equals: 'publish' } }, { slug: { equals: slug } }],
    },
    limit: 1,
  })

  const journal = journals.docs[0]

  const postDate = journal.createdAt.split('T')[0]

  const image = journal.image as Media | null

  return (
    <main>
      <article>
        <h2>{journal.title}</h2>
        {journal.endDate ? (
          <p>{`${journal.startDate.split('T')[0]} - ${journal.endDate.split('T')[0]}`}</p>
        ) : (
          <p>{`${journal.startDate.split('T')[0]}`}</p>
        )}
        <p>Created at: {postDate}</p>
        {image?.url && <Image src={image.url} alt={image.alt} width={400} height={400} />}
        <p>{journal.content}</p>
      </article>
    </main>
  )
}
