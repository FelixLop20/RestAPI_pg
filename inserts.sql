--- INSERTS inciales  para tabla colaboradores
INSERT INTO colaborador (Nombre)
VALUES
    ('Sin colaborador'),
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


-- INSERTS inciales para tabla tareas
INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Preparar presentación para reunión', 3, 3, 3, '2023-06-10', '2023-06-11', 'Hacerla en Canva');
INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Actualizar base de datos', 4, 2, 2, '2023-06-07', '2023-06-20','Se requiere revisión adicional del diseño');
INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Planificar evento corporativo', 4, 1, 1, '2023-06-15', '2023-06-30','Avance del informe casi completo');
INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Revisar los mensajes de ella', 2, 1, 1, '2023-06-15', '2023-06-30',null);
INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Realizar informe mensual', 1, 2, 3, '2023-06-27', '2023-07-05', 'Realizar análisis de datos y generar informe detallado con resultados.');
INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Enviar propuesta de proyecto', 2, 1, 1, '2023-06-28', '2023-07-07', 'Preparar documento con descripción del proyecto, objetivos y presupuesto estimado.');
INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Revisar documentación técnica', 1, 3, 2, '2023-06-29', '2023-07-10', 'Revisar manual de usuario y guía de instalación para identificar posibles mejoras y correcciones.');
INSERT INTO tarea (Descripcion, colab_id, estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Desarrollar nueva funcionalidad', 3, 2, 3, '2023-06-30', '2023-07-15', 'Implementar la funcionalidad de chat en tiempo real utilizando tecnología WebSocket.');
INSERT INTO tarea (Descripcion, colab_id,estado_id, prioridad_id, Fecha_Inicio, Fecha_Fin, notas)
VALUES ('Realizar seguimiento de ventas', 2, 1, 2, '2023-07-01', '2023-07-08', 'Generar informe semanal con el estado de las ventas y proyecciones para el próximo mes.');
