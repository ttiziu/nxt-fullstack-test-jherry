'use client';

import { Expediente } from '@/lib/api';

interface ExpedientesTableProps {
  expedientes: Expediente[];
  onEdit: (expediente: Expediente) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

/**
 * Tabla para mostrar la lista de expedientes
 */
export default function ExpedientesTable({ expedientes, onEdit, onDelete, loading }: ExpedientesTableProps) {
  if (expedientes.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay expedientes registrados</p>
        <p className="subtitle">Crea tu primer expediente para empezar</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="expedientes-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {expedientes.map((expediente) => (
            <tr key={expediente.id}>
              <td className="cell-nombre">{expediente.nombre}</td>
              <td className="cell-descripcion">{expediente.descripcion}</td>
              <td>
                <span className={`badge badge-${expediente.estado.toLowerCase().replace(' ', '-')}`}>
                  {expediente.estado}
                </span>
              </td>
              <td className="cell-actions">
                <button
                  onClick={() => onEdit(expediente)}
                  disabled={loading}
                  className="btn-icon btn-edit"
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(expediente.id)}
                  disabled={loading}
                  className="btn-icon btn-delete"
                  title="Eliminar"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

