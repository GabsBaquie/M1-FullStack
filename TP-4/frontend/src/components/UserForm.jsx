import { useState } from 'react'

const UserForm = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('user')
  const [validationError, setValidationError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setValidationError(null)

    if (!name.trim()) {
      setValidationError('Le champ nom est requis')
      return
    }

    if (!email.trim()) {
      setValidationError('Le champ email est requis')
      return
    }

    onSubmit({ name: name.trim(), email: email.trim(), role })
    setName('')
    setEmail('')
    setRole('user')
  }

  return (
    <form onSubmit={handleSubmit} style={{
      padding: '1.5rem',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      margin: '1rem',
      maxWidth: '400px',
    }}>
      <h3 style={{ marginTop: 0 }}>Ajouter un utilisateur</h3>

      {validationError && (
        <div style={{
          padding: '0.5rem',
          backgroundColor: '#fef2f2',
          color: '#dc2626',
          borderRadius: '4px',
          marginBottom: '1rem',
          fontSize: '0.875rem',
        }}>
          {validationError}
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>
          Nom
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="role" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>
          Rôle
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            boxSizing: 'border-box',
          }}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </div>

      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Ajouter
      </button>
    </form>
  )
}

export default UserForm
