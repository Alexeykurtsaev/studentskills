import { 
    SET_JOBS, 
    INTEREST_JOB, 
    UNINTEREST_JOB, 
    LOADING_DATA, 
    ENDORSE_SKILL, 
    UNENDORSE_SKILL,
    DELETE_JOB,
    POST_JOB,
    SET_MESSAGES,
    SET_DIALOGUES
} from '../types';

const initialState = {
    jobs: [],
    skills: [],
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_JOBS:
            return {
                ...state,
                jobs: action.payload,
                loading: false
            }
        case UNINTEREST_JOB:
            let index = state.jobs.findIndex(
                (job) => job.jobId === action.payload.jobId
            );
            state.jobs[index] = action.payload;
            return {
                ...state
            }
        case ENDORSE_SKILL:
        case UNENDORSE_SKILL:
            let newIndex = state.skills.findIndex((skill) => skill.skillId === action.payload.skillId);
            state.skills[index] = action.payload;
            return {
                ...state
            }
        case DELETE_JOB:
            index = state.jobs.findIndex(
                (job) => job.jobId === action.payload
            );
            state.jobs.splice(index, 1);
            return {
                ...state
            };
        case POST_JOB:
            return {
                ...state,
                jobs: [
                    action.payload,
                    ...state.jobs
                ]
            };
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload,
                loading: false
            }
        case SET_DIALOGUES:
            return {
                ...state,
                dialogues: action.payload,
                loading: false
            }
        default:
            return state;
    }
}