const Navbar = ({ count = 0 }) => {
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
      color: 'white',
      padding: '1rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <h2 style={{ margin: 0 }}>Gestion des utilisateurs</h2>
      <span>{count} utilisateur{count !== 1 ? 's' : ''}</span>
    </nav>
  )
}

export default Navbar
