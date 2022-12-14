import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionType } from '../action-types'
import { Action } from '../actions'

export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    console.log(term)
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES
    })

    try {
      const { data } = await axios.get(
        'https://registry.npmjs.org/-/v1/search',
        {
          params: { text: term }
        }
      )

      console.log(data)

      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: data.objects.map((result: any) => result.package.name)
      })
    } catch (e: any) {
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: e.message
      })
    }
  }
}
