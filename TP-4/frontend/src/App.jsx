import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import { userService } from './services/userService'
import './App.css'

const App = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await userService.getAll()
      setUsers(response.data.data || [])
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Erreur de connexion au serveur'
      )
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleCreate = async (formData) => {
    setError(null)
    try {
      const response = await userService.create(formData)
      const newUser = response.data.data
      setUsers((prev) => [...prev, newUser])
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Erreur lors de la création'
      )
    }
  }

  const handleDelete = async (id) => {
    setError(null)
    try {
      await userService.remove(id)
      setUsers((prev) => prev.filter((u) => u._id !== id))
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Erreur lors de la suppression'
      )
    }
  }

  return (
    <div>
      <Navbar count={users.length} />
      <UserForm onSubmit={handleCreate} />
      <UserList
        users={users}
        loading={loading}
        error={error}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App
