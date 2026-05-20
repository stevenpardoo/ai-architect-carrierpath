'use client'
import { useRef, useState } from 'react'
import { registrarSesion } from '@/app/actions'
import type { Curso } from '@/types'

interface QuickActionFormProps {
  cursos: Curso[]
}

export default function QuickActionForm({ cursos }: QuickActionFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    await registrarSesion(formData)
    formRef.current?.reset()
    setLoading(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  const activeCursos = cursos.filter(c => c.estado !== 'completado')

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Registrar Sesión</h2>
      <form ref={formRef} action={handleSubmit} className="space-y-3">
        <select
          name="curso_id"
          required
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar curso...</option>
          {activeCursos.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
        <input
          type="number"
          name="minutos"
          placeholder="Minutos"
          min="1"
          required
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="notas"
          placeholder="Notas (Markdown soportado)"
          rows={3}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          type="submit"
          disabled={loading || activeCursos.length === 0}
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Guardando...' : success ? 'Guardado.' : 'Registrar Sesión'}
        </button>
      </form>
      {activeCursos.length === 0 && (
        <p className="text-xs text-gray-400 mt-2 text-center">Todos los cursos de este mes están completados.</p>
      )}
    </div>
  )
}
