import UserCard from './UserCard'

const UserList = ({ users, loading, error, onDelete }) => {
  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        Chargement...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        padding: '1rem',
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        borderRadius: '8px',
        margin: '1rem',
      }}>
        {error}
      </div>
    )
  }

  if (!users || users.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
        Aucun utilisateur
      </div>
    )
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1rem',
      padding: '1rem',
    }}>
      {users.map((user) => (
        <UserCard key={user._id} user={user} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default UserList
