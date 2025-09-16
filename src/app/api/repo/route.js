import { NextResponse } from "next/server"

export async function POST(req) {
  const { user } = await req.json()

  const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=11`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  })

  const data = await res.json()
  return NextResponse.json(data)
}
