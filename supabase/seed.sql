-- Seed: Roadmap AI Architect (12 meses)
-- Mes 1 en estado 'activo', resto 'bloqueado'
-- Ejecutar DESPUÉS de schema.sql

WITH mes_1 AS (
  INSERT INTO meses (numero_mes, titulo, estado) VALUES (1, 'Terminal y Entorno', 'activo') RETURNING id
),
mes_2 AS (
  INSERT INTO meses (numero_mes, titulo, estado) VALUES (2, 'Python Backend', 'bloqueado') RETURNING id
),
mes_3 AS (
  INSERT INTO meses (numero_mes, titulo, estado) VALUES (3, 'Datos y Contenedores', 'bloqueado') RETURNING id
),
mes_4 AS (
  INSERT INTO meses (numero_mes, titulo, estado) VALUES (4, 'Fundamentos IA', 'bloqueado') RETURNING id
),
mes_5 AS (
  INSERT INTO meses (numero_mes, titulo, estado) VALUES (5, 'APIs LLM y Prompting', 'bloqueado') RETURNING id
),
mes_6 AS (
  INSERT INTO meses (numero_mes, titulo, estado) VALUES (6, 'Orquestación RAG (I)', 'bloqueado') RETURNING id
),
mes_7 AS (
  INSERT INTO meses (numero_mes, titulo, estado) VALUES (7, 'Orquestación RAG (II)', 'bloqueado') RETURNING id
),
mes_8 AS (
  INSERT INTO meses (numero_mes, titulo, estado) VALUES (8, 'Agentes Autónomos', 'bloqueado') RETURNING id
),
mes_9 AS (
  INSERT INTO meses (numero_mes, titulo, estado) VALUES (9, 'Inferencia Local', 'bloqueado') RETURNING id
),
mes_10 AS (
  INSERT INTO meses (numero_mes, titulo, estado) VALUES (10, 'Cloud AWS IA', 'bloqueado') RETURNING id
),
mes_11 AS (
  INSERT INTO meses (numero_mes, titulo, estado) VALUES (11, 'Operaciones (LLMOps)', 'bloqueado') RETURNING id
),
mes_12 AS (
  INSERT INTO meses (numero_mes, titulo, estado) VALUES (12, 'Seguridad y Arquitectura', 'bloqueado') RETURNING id
)
INSERT INTO cursos (mes_id, nombre, url)
SELECT id, nombre, url FROM (
  SELECT (SELECT id FROM mes_1) AS id, 'Curso de Introducción a la Terminal' AS nombre, 'https://platzi.com/cursos/terminal/' AS url
  UNION ALL SELECT (SELECT id FROM mes_1), 'Curso Profesional de Git y GitHub', 'https://platzi.com/cursos/git-github/'
  UNION ALL SELECT (SELECT id FROM mes_1), 'Curso de Entornos Virtuales en Python', 'https://platzi.com/cursos/entornos-python/'
  UNION ALL SELECT (SELECT id FROM mes_2), 'Curso Básico de Python', 'https://platzi.com/cursos/python/'
  UNION ALL SELECT (SELECT id FROM mes_2), 'Curso de FastAPI: Fundamentos', 'https://platzi.com/cursos/fastapi/'
  UNION ALL SELECT (SELECT id FROM mes_3), 'Curso de PostgreSQL', 'https://platzi.com/cursos/postgresql/'
  UNION ALL SELECT (SELECT id FROM mes_3), 'Curso de Docker', 'https://platzi.com/cursos/docker/'
  UNION ALL SELECT (SELECT id FROM mes_4), 'Curso de Fundamentos de LLMs', 'https://platzi.com/cursos/llms/'
  UNION ALL SELECT (SELECT id FROM mes_4), 'Curso de Bases de Datos Vectoriales', 'https://platzi.com/cursos/bd-vectoriales/'
  UNION ALL SELECT (SELECT id FROM mes_5), 'Curso de OpenAI API', 'https://platzi.com/cursos/openai/'
  UNION ALL SELECT (SELECT id FROM mes_5), 'Curso de Prompt Engineering', 'https://platzi.com/cursos/prompt-engineering/'
  UNION ALL SELECT (SELECT id FROM mes_6), 'Curso de LangChain', 'https://platzi.com/cursos/langchain/'
  UNION ALL SELECT (SELECT id FROM mes_7), 'Curso de LlamaIndex', 'https://platzi.com/cursos/llamaindex/'
  UNION ALL SELECT (SELECT id FROM mes_8), 'Curso de Creación de Agentes con IA', 'https://platzi.com/cursos/agentes-ia/'
  UNION ALL SELECT (SELECT id FROM mes_9), 'Curso de Modelos Abiertos con Hugging Face', 'https://platzi.com/cursos/huggingface/'
  UNION ALL SELECT (SELECT id FROM mes_10), 'Curso de AWS para Machine Learning', 'https://platzi.com/cursos/aws-ml/'
  UNION ALL SELECT (SELECT id FROM mes_11), 'Curso de MLOps: Despliegue de Modelos', 'https://platzi.com/cursos/mlops/'
  UNION ALL SELECT (SELECT id FROM mes_12), 'Curso de Seguridad en Inteligencia Artificial', 'https://platzi.com/cursos/seguridad-ia/'
) AS data;
