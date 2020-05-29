import { put } from 'redux-saga/effects'
import axios from '../../axios-orders';
import * as actions from '../actions'

export function* initSetIngredientsSaga(action) {
    try{
        const response = yield axios.get('https://react-burger-builder-34354.firebaseio.com/ingredients.json')
        yield put(actions.setIngredients(response.data));
    }catch(error){
        yield put(actions.setIngredientsFailed());
    }
};