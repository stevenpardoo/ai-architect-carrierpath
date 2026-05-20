import { createClient } from '@/lib/supabase-server'
import PacingCard from '@/components/pacing-card'
import QuickActionForm from '@/components/quick-action-form'
import CourseCard from '@/components/course-card'
import type { MesConCursos } from '@/types'

export const revalidate = 0

async function getActiveMes(): Promise<MesConCursos | null> {
  const supabase = await createClient()
  const { data: mes } = await supabase
    .from('meses')
    .select('*, cursos(*)')
    .eq('estado', 'activo')
    .single()
  return mes as MesConCursos | null
}

export default async function DashboardPage() {
  const mes = await getActiveMes()

  if (!mes) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Sin sesiones registradas hoy.</p>
        <p className="text-xs text-gray-300 mt-2">Configura Supabase y ejecuta el seed para comenzar.</p>
      </div>
    )
  }

  const completados = mes.cursos.filter((c) => c.estado === 'completado').length

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Estado Actual</p>
        <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Mes {mes.numero_mes}: {mes.titulo}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <PacingCard totalCursos={mes.cursos.length} completados={completados} />
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Enfoque</h2>
            <div className="space-y-2">
              {mes.cursos.length === 0 ? (
                <p className="text-sm text-gray-400">Sin cursos registrados en este mes.</p>
              ) : (
                mes.cursos.map((curso) => <CourseCard key={curso.id} curso={curso} />)
              )}
            </div>
          </div>
        </div>
        <div>
          <QuickActionForm cursos={mes.cursos} />
        </div>
      </div>
    </div>
  )
}
