import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";
import update from "immutability-helper";

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
        mainDate: date,
        shapeId: data.shapeId,
        audioUrl: data.audioUrl
    })


    await api
        .post("/word/update", { 
            wordId: word._id, 
            metadata: newMetadata,
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

// ===========================================================================


export const updateBlocks = (word, block, success) => async (
    dispatch,
	getState,
	api
) => {


    let newBlocks = []
    if(!word.blocks || word.blocks.length == 0) {
        newBlocks = [block]
    } else {

        let currentPosition = _.filter(word.blocks, { position: block.position})
        console.log(currentPosition)
        if(currentPosition.length > 0) {
            let keyToDeactivateIndex = _.findIndex(word.blocks, currentPosition[0]);
            newBlocks = update(word.blocks, {
                $splice: [[keyToDeactivateIndex, 1, block]] 
            })
        } else {
            newBlocks = _.concat(word.blocks, [block])
        }

        
    }

    await api
        .post("/word/updateBlocks", { 
            wordId: word._id, 
            blocks: newBlocks
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

