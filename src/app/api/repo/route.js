import { NextResponse } from "next/server"

export async function POST(req) {
  const { login, cursor } = await req.json()
  const query = `
  query($login: String!, $cursor: String) {
    user(login: $login) {
      repositories(first: 10, after: $cursor) {
        edges {
          node {
            id
            name
            owner { login }
            description
            primaryLanguage { name }
            stargazerCount
            forkCount
            isArchived
            pushedAt
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }

  `

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables: { login, cursor }
    })
  })
  console.log("Login received in API:", login)

  const data = await res.json()
  return NextResponse.json({ message: "a mers totul bine", data }, { status: 200 })
}
