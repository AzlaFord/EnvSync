import { NextResponse } from "next/server";
import createClient from "@/utils/supabase/server";

export async function POST(request) {
  const body = await request.json()
  const { repoName, owner } = body

  if (!repoName || !owner) {
    return NextResponse.json({ message: "Repo name sau owner e null" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getSession();
  const userLogin = userData?.session?.user?.identities[0]?.identity_data?.user_name;

  if (!userLogin) {
    return NextResponse.json({ message: "User nu e autentificat" }, { status: 401 });
  }

  const res = await fetch(`https://api.github.com/repos/${owner}/${repoName}/collaborators/${userLogin}`, {
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
  });

  const hasAccess = res.status === 204;
  if (hasAccess) {
    return NextResponse.json({ message: true }, { status: 200 });
  }

  return NextResponse.json({ message: false }, { status: 403 });
}
