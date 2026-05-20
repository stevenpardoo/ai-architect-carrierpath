-- Enums
CREATE TYPE estado_mes AS ENUM ('bloqueado', 'activo', 'completado');
CREATE TYPE estado_curso AS ENUM ('pendiente', 'en_curso', 'completado');

-- Tabla: meses
CREATE TABLE meses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_mes INTEGER UNIQUE NOT NULL CHECK (numero_mes BETWEEN 1 AND 12),
  titulo TEXT NOT NULL,
  estado estado_mes NOT NULL DEFAULT 'bloqueado'
);

-- Tabla: cursos
CREATE TABLE cursos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mes_id UUID NOT NULL REFERENCES meses(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  url TEXT NOT NULL,
  estado estado_curso NOT NULL DEFAULT 'pendiente'
);

-- Tabla: sesiones
CREATE TABLE sesiones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  curso_id UUID NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  minutos INTEGER NOT NULL CHECK (minutos > 0),
  notas TEXT
);

-- Índices
CREATE INDEX idx_cursos_mes_id ON cursos(mes_id);
CREATE INDEX idx_sesiones_curso_id ON sesiones(curso_id);
CREATE INDEX idx_sesiones_fecha ON sesiones(fecha DESC);

-- RLS (Row Level Security)
ALTER TABLE meses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE sesiones ENABLE ROW LEVEL SECURITY;

-- Políticas permisivas para uso single-user (ajustar con auth si se agrega login)
CREATE POLICY "allow_all_meses" ON meses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_cursos" ON cursos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_sesiones" ON sesiones FOR ALL USING (true) WITH CHECK (true);
