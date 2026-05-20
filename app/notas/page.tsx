import { createClient } from '@/lib/supabase-server'
import NotesSearch from '@/components/notes-search'
import type { Sesion } from '@/types'

export const revalidate = 0

async function getSesionesConNotas(): Promise<Sesion[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('sesiones')
    .select('*, cursos(nombre, meses(titulo))')
    .not('notas', 'is', null)
    .neq('notas', '')
    .order('fecha', { ascending: false })
  return (data as Sesion[]) ?? []
}

export default async function NotasPage() {
  const sesiones = await getSesionesConNotas()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Documentación</p>
        <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Base de Conocimiento</h1>
        <p className="text-sm text-gray-500 mt-1">{sesiones.length} nota{sesiones.length !== 1 ? 's' : ''} registrada{sesiones.length !== 1 ? 's' : ''}</p>
      </div>
      {sesiones.length === 0 ? (
        <p className="text-sm text-gray-400 py-8 text-center">Sin sesiones registradas hoy.</p>
      ) : (
        <NotesSearch sesiones={sesiones} />
      )}
    </div>
  )
}
