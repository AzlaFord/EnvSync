import { NextResponse } from "next/server"

export async function POST(req) {
  const { login, cursor, direction = "next", pageSize = 10 } = await req.json()

  let pagination = ""
  if (direction === "next") {
    pagination = `first: ${pageSize}${cursor ? `, after: "${cursor}"` : ""}`
  } else if (direction === "prev") {
    pagination = `last: ${pageSize}${cursor ? `, before: "${cursor}"` : ""}`
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        repositories(${pagination}) {
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
      variables: { login },
    }),
  })

  const data = await res.json()
  return NextResponse.json({ message: "a mers totul bine", data }, { status: 200 })
}

