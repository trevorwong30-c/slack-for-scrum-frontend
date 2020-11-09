import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import mockRequirementList from '../../mockReponses/requirement/requirementList.json';
import {POST_COMMENT_ENDPOINT} from "../../services/taskServices";
import axios from "axios";
import {PostCommentRequestBody} from "../../interfaces/requestBody";
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const POST_COMMENT_FAIL = 'POST_COMMENT_FAIL';

export const postComment = (taskId: number, comment:string): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  Action
> => {
  return (dispatch) => {
    // TODO:: Should integrate with axios
    // const payload = require('../mockResponses/searchUserByKeyword.json');

    // let data: PostCommentRequestBody = {
    //   comment: comment
    // };
    //
    // return axios.post(POST_COMMENT_ENDPOINT, data).then((response) => {
    //   dispatch(postCommentSuccess());
    // }, (reason) => {
    //   dispatch(postCommentFailure(reason));
    // });
  };
};

export const postCommentSuccess = () => {
  return {
    type: POST_COMMENT_SUCCESS
  };
};

export const postCommentFailure = (error: any) => {
  return {
    type: POST_COMMENT_FAIL,
    error
  };
};
