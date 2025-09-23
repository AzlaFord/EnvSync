import createClient from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request) {
  const body = await request.json()
  const { search } = body

  if (!search || search.length === 0) {
    return NextResponse.json({ message: "query-ul nu are valoare" }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: login, error } = await supabase.auth.getUser()

  if (error || !login) {
    return NextResponse.json({ message: "User nu e autentificat" }, { status: 401 })
  }

  const userLogin = login.user?.user_metadata?.user_name
  const queryString = `${search} user:${userLogin}`

  const query = `
    query($queryString: String!) {
      search(query: $queryString, type: REPOSITORY, first: 6) {
        edges {
          node {
            ... on Repository {
              id
              name
              owner { login }
              description
              primaryLanguage { name }
            }
          }
        }
      }
    }
  `

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      },
      body: JSON.stringify({ query, variables: { queryString } })
    })

    const data = await res.json()
    return NextResponse.json({ message: "a mers totul bine", data }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
