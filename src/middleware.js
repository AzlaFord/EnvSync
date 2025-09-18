import { NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { getDataUser } from '@/app/repository-table'
import createClient from './utils/supabase/server'
export async function middleware(request) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    //deci aici deci unde middleware o sa ruleze intre requesturi
    '/','/login','/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}