'use client';

import { useState } from 'react';
import { Expediente } from '@/lib/api';

interface ExpedienteFormProps {
  expediente?: Expediente;
  onSubmit: (data: { nombre: string; descripcion: string; estado: 'Activo' | 'En progreso' | 'Cerrado' }) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

/**
 * Formulario para crear o editar expedientes
 */
export default function ExpedienteForm({ expediente, onSubmit, onCancel, loading }: ExpedienteFormProps) {
  const [nombre, setNombre] = useState(expediente?.nombre || '');
  const [descripcion, setDescripcion] = useState(expediente?.descripcion || '');
  const [estado, setEstado] = useState<'Activo' | 'En progreso' | 'Cerrado'>(expediente?.estado || 'Activo');
  const [errors, setErrors] = useState<{ nombre?: string; descripcion?: string }>({});

  const validate = (): boolean => {
    const newErrors: { nombre?: string; descripcion?: string } = {};

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    await onSubmit({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      estado,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="expediente-form">
      <div className="form-group">
        <label htmlFor="nombre">Nombre del Expediente *</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Caso Smith vs. Johnson"
          disabled={loading}
          className={errors.nombre ? 'error' : ''}
        />
        {errors.nombre && <span className="error-text">{errors.nombre}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="descripcion">Descripción *</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe el expediente..."
          rows={4}
          disabled={loading}
          className={errors.descripcion ? 'error' : ''}
        />
        {errors.descripcion && <span className="error-text">{errors.descripcion}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="estado">Estado *</label>
        <select
          id="estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value as 'Activo' | 'En progreso' | 'Cerrado')}
          disabled={loading}
        >
          <option value="Activo">Activo</option>
          <option value="En progreso">En progreso</option>
          <option value="Cerrado">Cerrado</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} disabled={loading} className="btn-secondary">
          Cancelar
        </button>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Guardando...' : expediente ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
}

