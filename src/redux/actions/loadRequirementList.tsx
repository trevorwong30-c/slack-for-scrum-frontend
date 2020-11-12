import { ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
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
    const res = await getRequirementList();
    if (res && res.success) {
      console.log(res);
      const requirements = parseRequirementResponse(res.payload);
      dispatch(loadRequirementListSuccess(requirements));
    } else {
      dispatch(loadRequirementListFailure(res.message));
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
