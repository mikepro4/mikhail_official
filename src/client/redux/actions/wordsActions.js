import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";

import {
    LOAD_WORD,
} from "./types";

export const getMainWord = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/words/main")
        .then(response => {

            dispatch({
                type: LOAD_WORD,
                payload: response.data[0]
            });

            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================

export const createWord = (wordItem, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/words/create", wordItem)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================



export const loadWord = (id, success) => async (
    dispatch,
	getState,
	api
) => {

   

    await api
        .post("/words/item", { wordId: id })
        .then(response => {
            if (success) {
                success(response.data);
            }

            dispatch({
                type: LOAD_WORD,
                payload: response.data
            });
        })
        .catch(() => {
            // dispatch(authError('Account with this email already exists'));
        });
}

// ===========================================================================


export const searchWords = (type, identifier, offset, limit, query, success) => async (
    dispatch,
	getState,
	api
) => {
    let criteria = {}

    if(type == "user") {
        criteria = {
            createdBy: identifier
        }
    }

    if(type == "featured_words") {
        criteria = {
            createdBy: "613422fe0ee5bd00212cd0a4"
        }
    }

    await api
        .post("/words/search", {
            criteria: criteria,
            sortProperty: "createdAt",
            offset: offset,
            limit: limit,
            order: "-1"
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const deleteWord = (wordId, wordItem, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/words/delete", { wordId: wordId, word: wordItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const updateWord = (word, data, success) => async (
    dispatch,
	getState,
	api
) => {

    let date

    if(data.main) {
        date = new Date()
    } else {
        date = null
    }

    let newMetadata = _.merge({}, word.metadata, {
        title: data.title,
        main: data.main,
        mainDate: date
    })

    let newSHape = _.merge({}, word.defaultViz.word, data.word)
    let newPoint = _.merge({}, word.defaultViz.point, data.point)
    let newOverlay = _.merge({}, word.defaultViz.point, data.overlay)

    let newWord = {
        ...word,
        metadata: newMetadata,
        defaultViz: {
            word: newSHape,
            point: newPoint,
            overlay: newOverlay,
            colors: data.colors
        }
    }


    await api
        .post("/word/update", { 
            wordId: newWord._id, 
            metadata: newWord.metadata,
            defaultViz: newWord.defaultViz,
            status: newWord.status
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}


// ===========================================================================

