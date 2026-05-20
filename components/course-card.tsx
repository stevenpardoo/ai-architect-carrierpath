'use client'
import { useState } from 'react'
import { actualizarEstadoCurso } from '@/app/actions'
import type { Curso, CursoEstado } from '@/types'

const estadoLabel: Record<CursoEstado, string> = {
  pendiente: 'Pendiente',
  en_curso: 'En curso',
  completado: 'Completado',
}

const estadoClass: Record<CursoEstado, string> = {
  pendiente: 'bg-gray-100 text-gray-600',
  en_curso: 'bg-blue-100 text-blue-700',
  completado: 'bg-green-100 text-green-700',
}

export default function CourseCard({ curso }: { curso: Curso }) {
  const [loading, setLoading] = useState(false)

  async function handleComplete() {
    setLoading(true)
    await actualizarEstadoCurso(curso.id, 'completado')
    setLoading(false)
  }

  async function handleStart() {
    setLoading(true)
    await actualizarEstadoCurso(curso.id, 'en_curso')
    setLoading(false)
  }

  return (
    <div className={`rounded-lg border p-4 flex items-center justify-between gap-4 ${curso.estado === 'completado' ? 'opacity-60 bg-gray-50 border-gray-100' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-3 min-w-0">
        <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${estadoClass[curso.estado]}`}>
          {estadoLabel[curso.estado]}
        </span>
        <span className="text-sm font-medium text-gray-900 truncate">{curso.nombre}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a
          href={curso.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-200 rounded-md px-2.5 py-1 hover:bg-blue-50 transition-colors"
        >
          Abrir Platzi
        </a>
        {curso.estado === 'pendiente' && (
          <button
            onClick={handleStart}
            disabled={loading}
            className="text-xs font-medium text-gray-600 border border-gray-200 rounded-md px-2.5 py-1 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Iniciar
          </button>
        )}
        {curso.estado !== 'completado' && (
          <button
            onClick={handleComplete}
            disabled={loading}
            className="text-xs font-medium text-green-700 border border-green-200 rounded-md px-2.5 py-1 hover:bg-green-50 transition-colors disabled:opacity-50"
          >
            Completar Curso
          </button>
        )}
      </div>
    </div>
  )
}
