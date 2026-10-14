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
      <section className="journal-container">
        {journals.docs.length === 0 ? (
          <p>No journals published yet</p>
        ) : (
          journals.docs.map((journal) => {
            const image = journal.image as Media | null
            return (
              <article key={journal.id} className="journal">
                {image?.url && (
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={200}
                    height={200}
                    loading="lazy"
                    className="journal-image"
                  />
                )}
                <div className="journal-info-container">
                  <h3>{journal.title}</h3>
                  <p>{journal.excerpt}</p>
                  <p>
                    <Link href={`/journals/${journal.slug}`}>continue reading</Link>
                  </p>
                </div>
              </article>
            )
          })
        )}
      </section>
    </main>
  )
}
