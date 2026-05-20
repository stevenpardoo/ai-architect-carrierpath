export type MesEstado = 'bloqueado' | 'activo' | 'completado'
export type CursoEstado = 'pendiente' | 'en_curso' | 'completado'

export interface Mes {
  id: string
  numero_mes: number
  titulo: string
  estado: MesEstado
}

export interface Curso {
  id: string
  mes_id: string
  nombre: string
  url: string
  estado: CursoEstado
}

export interface Sesion {
  id: string
  curso_id: string
  fecha: string
  minutos: number
  notas: string | null
  cursos?: { nombre: string; meses?: { titulo: string } }
}

export interface MesConCursos extends Mes {
  cursos: Curso[]
}
