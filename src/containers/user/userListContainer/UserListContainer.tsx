import React, {Fragment, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {User, UserState} from "../../../interfaces";
import {Col, Form, Row} from "react-bootstrap";
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {searchUserByKeyword} from "../../../redux/actions/searchUserByKeyword"; // ES2015
import "./style.scss";
import { loadUserList } from 'redux/actions/loadUserList';
import { updateAllUsers } from "../../../redux/actions/updateUser";

const UserListContainer = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tmpUserList, setTmpUserList] = useState<Array<User>>([]);
    const [keyword, setKeyword] = useState<string>("");

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
        let list = JSON.parse(JSON.stringify(tmpUserList));
        dispatch(updateAllUsers(list));
    }

    const onSearch = (e: any) => {
        setKeyword(e.target.value);
    }

    const onUserChanged = (index:number) => {
        let list = JSON.parse(JSON.stringify(tmpUserList));
        list[index].isProjectUser = !list[index].isProjectUser;
        // dispatch(updateAllUsers([list[index]]));
        setTmpUserList(list);
    }

    const renderTmpUserList = () => {
        return (
            <div className="tmp-user-list">
                { tmpUserList.map((user, index) => (

                    keyword.trim() == "" || new RegExp(keyword.trim()).test(user.username) ? (
                        <Row key={`tmpUserList${index}`}>
                            <Col>{ user.username } ({ user.role })</Col>
                            <Col className={"col-checkbox"}><Form.Check
                                type="checkbox"
                                className="my-1 mr-sm-2"
                                id={`userCheckbox${user.id}`}
                                label=""
                                value={1}
                                defaultChecked={user.isProjectUser}
                                onChange={() => onUserChanged(index)}
                            /></Col>
                        </Row>
                    ) : null

                    
                )) }
            </div>
        );
    }

    useEffect(() => {
        if (!isModalVisible) {
            showModal();   
        }
    }, [tmpUserList]);

    useEffect(() => {
        if (userState.userList.length > 0) {
            setTmpUserList([...userState.userList]);
        }
    }, [userState.userList]);

    useEffect(() => {
        dispatch(loadUserList());
    }, []);

    // useEffect(onRequirementListChanged, [requirementState.list]);

    return (
        <div className="UserListContainer">
            <Modal show={isModalVisible} onHide={onModalClosed}>
                <Modal.Header>
                    <Modal.Title>Confirm User List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        value={keyword}
                        placeholder={'Search User...'}
                        onChange={onSearch}
                    >
                    </Form.Control>
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
