import { useState } from 'react'
import { useSelector } from '../hooks/use-typed-selector'
import { useActions } from '../hooks/use-actions'

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('')
  const { searchRepositories } = useActions()
  const { data, error, loading } = useSelector(state => state.repositories)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    searchRepositories(term)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={e => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error && !loading && data.map(name => <div>{name}</div>)}
    </div>
  )
}

export default RepositoriesList
