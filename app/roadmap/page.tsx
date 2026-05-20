import { createClient } from '@/lib/supabase-server'
import MonthCard from '@/components/month-card'
import type { MesConCursos } from '@/types'

export const revalidate = 0

async function getMeses(): Promise<MesConCursos[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('meses')
    .select('*, cursos(*)')
    .order('numero_mes', { ascending: true })
  return (data as MesConCursos[]) ?? []
}

export default async function RoadmapPage() {
  const meses = await getMeses()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Ruta de Ejecución</p>
        <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Roadmap Anual</h1>
        <p className="text-sm text-gray-500 mt-1">12 meses · Escuela de Data e Inteligencia Artificial · Platzi</p>
      </div>

      {meses.length === 0 ? (
        <p className="text-sm text-gray-400 py-8 text-center">Sin datos. Ejecuta el seed en Supabase para poblar el roadmap.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {meses.map((mes) => (
            <MonthCard key={mes.id} mes={mes} />
          ))}
        </div>
      )}
    </div>
  )
}
