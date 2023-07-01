CREATE DATABASE taskmanager;

--- Tabla colaboradores
CREATE TABLE IF NOT EXISTS public.colaborador
(
    id SERIAL NOT NULL ,
    nombre character varying(55)  NOT NULL,
    CONSTRAINT colaborador_pkey PRIMARY KEY (id)
);

--- Tabla estados
CREATE TABLE IF NOT EXISTS public.estado
(
    id SERIAL NOT NULL,
    descripcion character varying(15)NOT NULL,
    CONSTRAINT estado_pkey PRIMARY KEY (id)
);

--- Tabla prioridad
CREATE TABLE IF NOT EXISTS public.prioridad
(
    id SERIAL NOT NULL ,
    descripcion character varying(15) NOT NULL,
    CONSTRAINT prioridad_pkey PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS public.tarea
(
    id SERIAL NOT NULL,
    descripcion character varying(255),
    colab_id integer NOT NULL,
    estado_id integer NOT NULL,
    prioridad_id integer NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    notas character varying(255),
    CONSTRAINT tarea_pkey PRIMARY KEY (id),
    CONSTRAINT tarea_colab_id_fkey FOREIGN KEY (colab_id)
        REFERENCES public.colaborador (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT tarea_estado_id_fkey FOREIGN KEY (estado_id)
        REFERENCES public.estado (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT tarea_prioridad_id_fkey FOREIGN KEY (prioridad_id)
        REFERENCES public.prioridad (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


COMMENT ON COLUMN public.tarea.estado_id
    IS 'Estado de la tarea (1: Pendiente, 2: En proceso, 3: Finalizada)';

COMMENT ON COLUMN public.tarea.prioridad_id
    IS 'Prioridad de la tarea (1: Alta, 2: Media, 3: Baja)';

---- INSERTS


--- INSERTS inciales  para tabla colaboradores
INSERT INTO colaborador (Nombre)
VALUES
    ('sin asignar'),
    ('Juan Perez'),
    ('María López'),
    ('Carlos Gómez'),
    ('Laura Rodríguez'),
    ('Pedro Sánchez');


--- INSERTS iniciales de estados
INSERT INTO estado (descripcion) VALUES ('Pendiente');
INSERT INTO estado (descripcion) VALUES ('En Proceso');
INSERT INTO estado (descripcion) VALUES ('Finalizada');

--- INSERTS inicales de prioridad
INSERT INTO prioridad (descripcion) VALUES ('Alta');
INSERT INTO prioridad (descripcion) VALUES ('Media');
INSERT INTO prioridad (descripcion) VALUES ('Baja');


INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Preparar presentación para reunión', 3, 3, 3, CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', 'Hacerla en Canva');
INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Actualizar base de datos', 4, 2, 2, CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', 'Se requiere revisión adicional del diseño');
INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Planificar evento corporativo', 4, 1, 1, CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', 'Avance del informe casi completo');
INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Revisar los mensajes de ella', 2, 1, 1, CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', null);
INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Realizar informe mensual', 1, 2, 3, CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', 'Realizar análisis de datos y generar informe detallado con resultados.');
INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Enviar propuesta de proyecto', 2, 1, 1, CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', 'Preparar documento con descripción del proyecto, objetivos y presupuesto estimado.');
INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Revisar documentación técnica', 2, 3, 2, CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', 'Revisar manual de usuario y guía de instalación para identificar posibles mejoras y correcciones.');
INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Desarrollar nueva funcionalidad', 3, 2, 3, CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', 'Implementar la funcionalidad de chat en tiempo real utilizando tecnología WebSocket.');
INSERT INTO tarea (Descripcion, colab_id,estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Realizar seguimiento de ventas', 2, 1, 2, CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', 'Generar informe semanal con el estado de las ventas y proyecciones para el próximo mes.');
