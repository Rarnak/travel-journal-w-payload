import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Media } from '@/payload-types'

export default async function Page() {
  const payload = await getPayload({ config })

  const journals = await payload.find({
    collection: 'journals',
    where: {
      status: {
        equals: 'publish',
      },
    },
    sort: '-createdAt',
    limit: 10,
  })
  return (
    <main>
      <section>
        {journals.docs.length === 0 ? (
          <p>No journals published yet</p>
        ) : (
          journals.docs.map((journal) => {
            const image = journal.image as Media | null
            return (
              <article key={journal.id}>
                {image?.url && <Image src={image.url} alt={image.alt} width={250} height={250} />}
                <h3>{journal.title}</h3>
                <p>{journal.excerpt}</p>
                <p>
                  <Link href={`/journals/${journal.slug}`}>continue reading</Link>
                </p>
              </article>
            )
          })
        )}
      </section>
    </main>
  )
}
