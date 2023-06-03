import {useReducer} from 'react'
export default function MainController(){
    const [] = useReducer(MainReducer,{})

}

function MainReducer(state,action){
    switch(action.type){
        case 'updateNav':{
            return {
                ...state,
                navtype: action.navType
            }
        }

    }
}