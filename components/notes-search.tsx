'use client'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import type { Sesion } from '@/types'

interface NotesSearchProps {
  sesiones: Sesion[]
}

export default function NotesSearch({ sesiones }: NotesSearchProps) {
  const [query, setQuery] = useState('')

  const filtered = sesiones.filter((s) => {
    if (!query.trim()) return true
    const search = query.toLowerCase()
    return (
      s.notas?.toLowerCase().includes(search) ||
      s.cursos?.nombre.toLowerCase().includes(search)
    )
  })

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar en notas..."
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filtered.length === 0 && (
        <p className="text-sm text-gray-400 py-8 text-center">No hay notas para este filtro.</p>
      )}

      <div className="space-y-3">
        {filtered.map((sesion) => (
          <div key={sesion.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-semibold text-gray-500">{sesion.cursos?.nombre ?? '—'}</p>
                {sesion.cursos?.meses?.titulo && (
                  <p className="text-xs text-gray-400">{sesion.cursos.meses.titulo}</p>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-gray-400">{new Date(sesion.fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                <p className="text-xs font-mono text-gray-500">{sesion.minutos} min</p>
              </div>
            </div>
            {sesion.notas && (
              <div className="prose prose-sm max-w-none border-t border-gray-100 pt-3">
                <ReactMarkdown>{sesion.notas}</ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
