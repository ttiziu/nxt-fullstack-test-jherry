'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { removeAuthToken } from '@/lib/auth';
import {
  getExpedientes,
  createExpediente,
  updateExpediente,
  deleteExpediente,
  Expediente,
} from '@/lib/api';
import ExpedientesTable from '@/components/ExpedientesTable';
import ExpedienteForm from '@/components/ExpedienteForm';

/**
 * Página del dashboard con CRUD de expedientes
 */
export default function DashboardPage() {
  const router = useRouter();
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExpediente, setEditingExpediente] = useState<Expediente | undefined>();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Cargar expedientes al montar el componente
  useEffect(() => {
    loadExpedientes();
  }, []);

  const loadExpedientes = async () => {
    try {
      setLoading(true);
      const data = await getExpedientes();
      setExpedientes(data);
    } catch (error) {
      showMessage('error', 'Error al cargar los expedientes');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleLogout = () => {
    removeAuthToken();
    router.push('/login');
  };

  const handleCreate = async (data: { nombre: string; descripcion: string; estado: 'Activo' | 'En progreso' | 'Cerrado' }) => {
    try {
      setLoading(true);
      await createExpediente(data);
      await loadExpedientes();
      setShowForm(false);
      showMessage('success', 'Expediente creado correctamente');
    } catch (error) {
      showMessage('error', error instanceof Error ? error.message : 'Error al crear expediente');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: { nombre: string; descripcion: string; estado: 'Activo' | 'En progreso' | 'Cerrado' }) => {
    if (!editingExpediente) return;

    try {
      setLoading(true);
      await updateExpediente(editingExpediente.id, data);
      await loadExpedientes();
      setShowForm(false);
      setEditingExpediente(undefined);
      showMessage('success', 'Expediente actualizado correctamente');
    } catch (error) {
      showMessage('error', error instanceof Error ? error.message : 'Error al actualizar expediente');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (expediente: Expediente) => {
    setEditingExpediente(expediente);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este expediente?')) return;

    try {
      setLoading(true);
      await deleteExpediente(id);
      await loadExpedientes();
      showMessage('success', 'Expediente eliminado correctamente');
    } catch (error) {
      showMessage('error', error instanceof Error ? error.message : 'Error al eliminar expediente');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingExpediente(undefined);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Gestión de Expedientes</h1>
          <p className="subtitle">Sistema Legal Tech</p>
        </div>
        <button onClick={handleLogout} className="btn-secondary">
          Cerrar Sesión
        </button>
      </header>

      {message && (
        <div className={`message message-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="dashboard-content">
        {!showForm ? (
          <>
            <div className="actions-bar">
              <button
                onClick={() => setShowForm(true)}
                disabled={loading}
                className="btn-primary"
              >
                + Nuevo Expediente
              </button>
            </div>

            <ExpedientesTable
              expedientes={expedientes}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          </>
        ) : (
          <div className="form-container">
            <h2>{editingExpediente ? 'Editar Expediente' : 'Nuevo Expediente'}</h2>
            <ExpedienteForm
              expediente={editingExpediente}
              onSubmit={editingExpediente ? handleUpdate : handleCreate}
              onCancel={handleCancelForm}
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
}

