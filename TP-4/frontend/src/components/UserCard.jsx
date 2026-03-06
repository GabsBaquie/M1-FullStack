const UserCard = ({ user, onDelete }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const isAdmin = user.role === 'admin'

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      backgroundColor: 'white',
    }}>
      <h3 style={{ margin: '0 0 0.5rem 0' }}>{user.name}</h3>
      <p style={{ margin: '0.25rem 0', color: '#6b7280' }}>{user.email}</p>
      <span style={{
        display: 'inline-block',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        fontSize: '0.875rem',
        marginTop: '0.5rem',
        backgroundColor: isAdmin ? '#ede9fe' : '#f3f4f6',
        color: isAdmin ? '#6d28d9' : '#374151',
      }}>
        {user.role}
      </span>
      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#9ca3af' }}>
        Créé le {formatDate(user.createdAt)}
      </p>
      <button
        onClick={() => onDelete(user._id)}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Supprimer
      </button>
    </div>
  )
}

export default UserCard
