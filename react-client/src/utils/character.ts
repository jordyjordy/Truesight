import authentication from "./authentication"
import {SimpleCharacter} from '../features/general/charactersSlice'
interface characterResponse {
    data: SimpleCharacter[]
}
export async function getCharacters() {
    var res:characterResponse = await authentication.get(process.env.REACT_APP_SERVER_IP + "/characters/list")
    return res.data
}
