export async function POST(req) {
  const { user } = await req.json() // extrage username-ul din body

  const res = await fetch(`https://api.github.com/users/${user}/repos`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    cache: "no-store",
  })

  const data = await res.json()
  return Response.json(data)
}
