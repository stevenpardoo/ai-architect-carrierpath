import { Lock } from 'lucide-react'
import type { MesConCursos } from '@/types'

interface MonthCardProps {
  mes: MesConCursos
}

const estadoCursoClass = {
  pendiente: 'bg-gray-200',
  en_curso: 'bg-blue-500',
  completado: 'bg-green-500',
}

export default function MonthCard({ mes }: MonthCardProps) {
  const isLocked = mes.estado === 'bloqueado'
  const isActive = mes.estado === 'activo'
  const isCompleted = mes.estado === 'completado'

  return (
    <div
      className={`rounded-xl border p-5 transition-all ${
        isActive
          ? 'border-blue-500 shadow-md bg-white'
          : isCompleted
          ? 'border-gray-200 bg-gray-50 opacity-50'
          : 'border-gray-200 bg-white opacity-70'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
            isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
          }`}>
            {mes.numero_mes}
          </span>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Mes {mes.numero_mes}</p>
            <h3 className="text-sm font-semibold text-gray-900 leading-tight">{mes.titulo}</h3>
          </div>
        </div>
        {isLocked && <Lock className="w-4 h-4 text-gray-300" />}
        {isCompleted && <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Completado</span>}
        {isActive && <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Activo</span>}
      </div>

      {/* Collapsed for locked, expanded for active/completed */}
      {isLocked ? (
        <div className="flex gap-1.5 mt-2">
          {mes.cursos.map((c) => (
            <div key={c.id} className="h-1.5 flex-1 rounded-full bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="space-y-1.5 mt-3">
          {mes.cursos.map((c) => (
            <div key={c.id} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full shrink-0 ${estadoCursoClass[c.estado]}`} />
              {isActive && !isLocked ? (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-700 hover:text-blue-600 hover:underline"
                >
                  {c.nombre}
                </a>
              ) : (
                <span className="text-xs text-gray-500">{c.nombre}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
