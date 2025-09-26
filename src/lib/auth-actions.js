'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import createClient from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') ,
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
export async function signInWithGitHub() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider:'github',
    options: {
      redirectTo: 'https://env-sync.vercel.app/auth/callback',
    },
  })

  if (data.url) {
    redirect(data.url) 
  }
}
export async function sighOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  redirect('/login')
}