'use server'
import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function registrarSesion(formData: FormData) {
  const supabase = await createClient()
  const curso_id = formData.get('curso_id') as string
  const minutos = parseInt(formData.get('minutos') as string)
  const notas = (formData.get('notas') as string) || null

  if (!curso_id || !minutos || minutos <= 0) return

  await supabase.from('sesiones').insert({ curso_id, minutos, notas })
  revalidatePath('/')
  revalidatePath('/notas')
}

export async function actualizarEstadoCurso(curso_id: string, estado: 'pendiente' | 'en_curso' | 'completado') {
  const supabase = await createClient()
  await supabase.from('cursos').update({ estado }).eq('id', curso_id)
  revalidatePath('/')
  revalidatePath('/roadmap')
}

export async function actualizarEstadoMes(mes_id: string, estado: 'bloqueado' | 'activo' | 'completado') {
  const supabase = await createClient()
  await supabase.from('meses').update({ estado }).eq('id', mes_id)
  revalidatePath('/')
  revalidatePath('/roadmap')
}
