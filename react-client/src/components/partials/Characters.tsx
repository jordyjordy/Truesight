import {getCharacters} from "../../utils/character"
import { useSelector, useDispatch} from 'react-redux'
import {setCharacters,SimpleCharacter} from "../../features/general/charactersSlice"
import "../../style/Partials/Characters.css"
import {RootState} from "../../store"
import { useEffect } from "react"
interface CharacterProps {
    columns?:Number,
    header?:Boolean,
    characters?:SimpleCharacter[]
}

export function Characters(props:CharacterProps) {
    const characters = useSelector((state:RootState) => state.characters.characters)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(props.characters === undefined) {
            getCharacters().then((data) => {
                dispatch(setCharacters(data))
            })
        }
    },[dispatch,props.characters])

    function header() {
        if(props.header) {
            return (<div className='section-header purple'>Characters</div>)
        }
        return null
    }
    return (
    <div className='characters'>
        {header()}
        {props.characters === undefined
        ? characters.map((char) => { return (<div className="char-el">{char.name}</div>)})
        : props.characters.map((char) => { return (<div className="char-el">{char.name}</div>)})
        }
        <div className="char-el create-char">Create a new Character</div>
    </div>)
}