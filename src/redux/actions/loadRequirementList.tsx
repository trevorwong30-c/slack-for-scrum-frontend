import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import mockRequirementList from '../../mockReponses/requirement/requirementList.json';
import { Requirement } from '../../interfaces';
import { getRequirementList } from '../../services/requirementServices';
import { parseRequirementResponse } from '../../parsers/requirementParser';

export const LOAD_REQUIREMENT_LIST_SUCCESS = 'LOAD_REQUIREMENT_LIST_SUCCESS';
export const LOAD_REQUIREMENT_LIST_FAIL = 'LOAD_REQUIREMENT_LIST_FAIL';

export interface RequirementAction {
  type: string;
  requirements?: Requirement[];
  error?: string;
}

export const loadRequirementList = (): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  RequirementAction
> => {
  return async (dispatch) => {
    const response = await getRequirementList();
    if (response) {
      const requirements = parseRequirementResponse(response);
      dispatch(loadRequirementListSuccess(requirements));
    }
  };
};

export const loadRequirementListSuccess = (requirements: Requirement[]) => {
  return {
    type: LOAD_REQUIREMENT_LIST_SUCCESS,
    requirements
  };
};

export const loadRequirementListFailure = (error: any) => {
  return {
    type: LOAD_REQUIREMENT_LIST_FAIL,
    error
  };
};
