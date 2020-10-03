import React, {Fragment, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadRequirementList } from '../../../redux/actions/loadRequirementList';
import {User, UserState} from "../../../interfaces";
import {FormControl, InputGroup} from "react-bootstrap";
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {searchUserByKeyword} from "../../../redux/actions/searchUserByKeyword"; // ES2015

const UserListContainer = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const userState:UserState = useSelector(
        (state: RootStateOrAny) => state.user
    );

    const dispatch = useDispatch();

    const history = useHistory();

    const showModal = () => {
        setIsModalVisible(true);
    };
    //
    // const closeModal = () => {
    //   setIsModalVisible(false);
    // }

    const onModalClosed = () => {};

    const confirmRequirementList = () => {
        // dispatch an API action here
        history.push('/task');
    };
    //
    // const renderRequirementList = () => {
    //     let arr = [];
    //
    //     if (requirementState.list) {
    //         for (let item of requirementState.list) {
    //             arr.push(<li>{item.sDescription}</li>);
    //         }
    //
    //         return (
    //             <ul>
    //                 <li>{arr}</li>
    //             </ul>
    //         );
    //     }
    // };
    //
    // const onRequirementListChanged = () => {
    //     if (requirementState.list.length > 0) {
    //         showModal();
    //     }
    // };

    const handleSearch = (keyword:string) => {
        dispatch(searchUserByKeyword(keyword));
    }

    const onSearchResultsUpdated = () => {
        if (!userState.isSearching && userState.searchResults.length > 0) {

        }
    }


    useEffect(() => {
        showModal();
        // dispatch(loadRequirementList());
    }, [dispatch]);

    useEffect(onSearchResultsUpdated, [userState.isSearching])

    // useEffect(onRequirementListChanged, [requirementState.list]);

    return (
        <div className="ConfirmRequirementContainer">
            <Modal show={isModalVisible} onHide={onModalClosed}>
                <Modal.Header closeButton>
                    <Modal.Title>Requirement List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AsyncTypeahead
                        id="async-example"
                        isLoading={userState.isSearching}
                        minLength={1}
                        labelKey="username"
                        onSearch={handleSearch}
                        options={userState.searchResults}
                        placeholder="Search for a user..."
                        renderMenuItemChildren={(option, props) => (
                            <Fragment>
                                <span>{ option.username }</span>
                            </Fragment>
                        )}
                    />
                </Modal.Body>
                <Modal.Footer>
                    {/*<Button variant="secondary" onClick={closeModal}>*/}
                    {/*  Close*/}
                    {/*</Button>*/}
                    <Button variant="primary" onClick={confirmRequirementList}>
                        Confirm Users
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserListContainer;
