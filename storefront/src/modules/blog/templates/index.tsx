import Image from "next/image"

type BlogPost = {
  title: string
  date: string
  author: string
  href: string
  /** Optional cover image path (e.g. "/blog/quiet-care.jpg" in /public). */
  image?: string
}

// Static preview content — the page is shown blurred behind "Coming Soon".
// Add `image` paths and real `href`s when the blog launches.
const POSTS: BlogPost[] = [
  { title: "Building Quiet Care", date: "Mar 31, 2026", author: "Ola Adebayo", href: "#" },
  { title: "When The World Becomes a Sauna", date: "Feb 3, 2026", author: "Ola Adebayo", href: "#" },
  {
    title: "A Year of Health, Intentionality, and Reimagining Maternal Health Systems",
    date: "Jan 8, 2026",
    author: "Ola Adebayo",
    href: "#",
  },
  { title: "Reproductive Health Goals for 2026", date: "Feb 26, 2026", author: "Ola Adebayo", href: "#" },
  { title: "When Maternal Health Systems Fail Women", date: "Dec 10, 2025", author: "Ola Adebayo", href: "#" },
  { title: "The Many Faces of Inequality In Maternal Health", date: "Apr 4, 2024", author: "Ola Adebayo", href: "#" },
]

const PLACEHOLDER_COLORS = ["bg-pink-100", "bg-blue-50", "bg-grey-20"]

export default function BlogTemplate() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 small:px-14 pb-16 small:pb-24">
      <h1 className="text-center font-heading font-bold text-[28px] small:text-[44px] leading-tight text-[#101010]">
        Little moments, helpful advice
      </h1>

      <ul className="mt-12 small:mt-[100px] grid grid-cols-1 xsmall:grid-cols-2 small:grid-cols-3 gap-6 small:gap-11">
        {POSTS.map((post, i) => (
          <li key={post.title}>
            <article className="h-full flex flex-col bg-grey-10 rounded-[20px] p-2.5 pb-8">
              <div
                className={`relative aspect-[483/352] w-full overflow-hidden rounded-[10px] ${
                  PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length]
                }`}
              >
                {post.image && (
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 512px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
              </div>
              <h2 className="mt-4 font-heading font-bold text-xl small:text-[22px] leading-snug text-[#101010]">
                {post.title}
              </h2>
              <p className="mt-3 text-sm small:text-base text-[#636363]">
                {post.date} - {post.author}
              </p>
              <a
                href={post.href}
                className="mt-auto pt-10 text-sm small:text-base uppercase underline underline-offset-2 text-obana-pink hover:opacity-80 transition-opacity self-start"
              >
                Read more
              </a>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
