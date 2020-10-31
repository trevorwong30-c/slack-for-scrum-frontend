import React, {Fragment, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {User, UserState} from "../../../interfaces";
import {Col, Row} from "react-bootstrap";
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {searchUserByKeyword} from "../../../redux/actions/searchUserByKeyword"; // ES2015
import "./style.scss";

const UserListContainer = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tmpUserList, setTmpUserList] = useState<Array<User>>([]);

    const userState:UserState = useSelector(
        (state: RootStateOrAny) => state.user
    );

    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalVisible(true);
    };
    //
    // const closeModal = () => {
    //   setIsModalVisible(false);
    // }

    const addUserToTmpList = (user:User) => {
        setTmpUserList([...tmpUserList, user]);
    }

    const removeUserFromTmpList = (idx:number) => {
        let list = [...tmpUserList];
        list.splice(idx,1);
        setTmpUserList(list);
    }

    const onModalClosed = () => {};

    const confirmUserList = () => {

    }

    const onSearch = (keyword:string) => {
        dispatch(searchUserByKeyword(keyword));
    }

    const onSearchResultsUpdated = () => {
        if (!userState.isSearching && userState.searchResults.length > 0) {

        }
    }

    const renderTmpUserList = () => {
        return (
            <div className="tmp-user-list">
                { tmpUserList.map((user, index) => (
                    <Row key={`tmpUserList${index}`}>
                        <Col>{ user.username } ({ user.role })</Col>
                        <Col>
                            <button type="button" className="close" onClick={() => removeUserFromTmpList(index)}><span aria-hidden="true">×</span><span
                                className="sr-only">Close</span></button></Col>
                    </Row>
                )) }
            </div>
        );
    }

    useEffect(() => {
        showModal();
        // dispatch(loadRequirementList());
    }, [dispatch]);

    useEffect(onSearchResultsUpdated, [userState.isSearching])

    // useEffect(onRequirementListChanged, [requirementState.list]);

    return (
        <div className="UserListContainer">
            <Modal show={isModalVisible} onHide={onModalClosed}>
                <Modal.Header>
                    <Modal.Title>Confirm User List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AsyncTypeahead
                        id="async-example"
                        isLoading={userState.isSearching}
                        minLength={1}
                        labelKey="username"
                        onSearch={onSearch}
                        options={userState.searchResults}
                        placeholder="Search for a user..."
                        renderMenuItemChildren={(option, props) => (
                            <Fragment>
                                <span onClick={() => addUserToTmpList(option)}>{ option.username } ({ option.role })</span>
                            </Fragment>
                        )}
                    />
                    { renderTmpUserList() }
                </Modal.Body>
                <Modal.Footer>
                    {/*<Button variant="secondary" onClick={closeModal}>*/}
                    {/*  Close*/}
                    {/*</Button>*/}
                    <Button variant="primary" onClick={confirmUserList} disabled={tmpUserList.length === 0}>
                        Confirm Users
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserListContainer;
