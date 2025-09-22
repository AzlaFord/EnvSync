import { NextResponse } from "next/server";
import createClient from "@/utils/supabase/server";

export async function POST(request) {
    const body = await request.json()
    const { repositoryName, owner } = body

    if (!owner) {
        return NextResponse.json({ message: "Repo name sau owner e null" }, { status: 400 })
    }
    if (!repositoryName) {
        return NextResponse.json({ message: "Repo name e null" }, { status: 400 })
    }
    const supabase = await createClient()
    const { data: userData } = await supabase.auth.getSession()
    const userLogin = userData?.session?.user?.identities[0]?.identity_data?.user_name
    console.log("userLogin",userLogin)
    if (!userLogin) {
        return NextResponse.json({ message: "User nu e autentificat" }, { status: 401 })
    }

    const collabRes = await fetch(
        `https://api.github.com/repos/${owner}/${repositoryName}/collaborators/${userLogin}`,
        { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
    );

    if (collabRes.status === 204) return NextResponse.json({ message: true });

        const contribRes = await fetch(
        `https://api.github.com/repos/${owner}/${repositoryName}/commits?author=${userLogin}`,
        { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
    );

    const commits = await contribRes.json();
    if (commits.length > 0) return NextResponse.json({ message: true });

    return NextResponse.json({ message: false });
}
