interface PacingCardProps {
  totalCursos: number
  completados: number
}

export default function PacingCard({ totalCursos, completados }: PacingCardProps) {
  const today = new Date()
  const dayOfMonth = today.getDate()
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const pacingPct = Math.round((dayOfMonth / daysInMonth) * 100)
  const progressPct = totalCursos > 0 ? Math.round((completados / totalCursos) * 100) : 0
  const onTrack = progressPct >= pacingPct

  const expectedCompleted = Math.floor(totalCursos * (pacingPct / 100))
  const behind = Math.max(0, expectedCompleted - completados)
  const remainingDays = 7 - today.getDay() || 7
  const hoursNeeded = Math.ceil((behind * 6) / remainingDays)

  return (
    <div className={`rounded-xl border-2 p-5 ${onTrack ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Ritmo</p>
          <p className={`text-lg font-bold mt-0.5 ${onTrack ? 'text-green-700' : 'text-red-700'}`}>
            {onTrack ? 'Objetivo diario cumplido.' : `Atraso detectado: Requiere +${hoursNeeded}h esta semana.`}
          </p>
        </div>
        <div className={`w-3 h-3 rounded-full mt-1.5 ${onTrack ? 'bg-green-500' : 'bg-red-500'}`} />
      </div>
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Avance ({completados}/{totalCursos} cursos)</span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full">
            <div className={`h-1.5 rounded-full transition-all ${onTrack ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${progressPct}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Días transcurridos ({dayOfMonth}/{daysInMonth})</span>
            <span>{pacingPct}%</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full">
            <div className="h-1.5 rounded-full bg-gray-400 transition-all" style={{ width: `${pacingPct}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
