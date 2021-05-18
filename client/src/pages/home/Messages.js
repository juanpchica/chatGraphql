import React, { Fragment, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Col } from "react-bootstrap";

import { useMessageDispatch, useMessageState } from "../../context/message";
import Message from "./Message";

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;
const Messages = () => {
  const { users } = useMessageState();
  const dispatch = useMessageDispatch();

  const selectedUser = users?.find((u) => u.selected === true);
  const messages = selectedUser?.messages;

  const [getMessages, { loading: messagesLoading, data: messagesData }] =
    useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username } });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: "SET_USER_MESSAGES",
        payload: {
          username: selectedUser.username,
          messages: messagesData.getMessages,
        },
      });
    }
  }, [messagesData]);

  //Function to send messages
  const submitMessage = (e) => {
    e.preventDefault();

    if (content.trim() === "" || !selectedUser) return;

    setContent("");

    // mutation for sending the message
    sendMessage({ variables: { to: selectedUser.username, content } });
  };

  let selectedChatMarkup;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = <p className='info-text'>Select a friend</p>;
  } else if (messagesLoading) {
    selectedChatMarkup = <p className='info-text'>Loading..</p>;
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message, index) => (
      <Fragment key={message.uuid}>
        <Message message={message} />
        {index === messages.length - 1 && (
          <div className='invisible'>
            <hr className='m-0' />
          </div>
        )}
      </Fragment>
    ));
  } else if (messages.length === 0) {
    selectedChatMarkup = (
      <p className='info-text'>
        You are now connected! send your first message!
      </p>
    );
  }

  return (
    <Col xs={10} md={8}>
      <div className='messages-box d-flex flex-column-reverse'>
        {selectedChatMarkup}
      </div>
      <div>
        <Form onSubmit={submitMessage}>
          <Form.Group className='d-flex align-items-center'>
            <Form.Control
              type='text'
              className='p-4 border-0 message-input rounded-pill bg-secondary'
              placeholder='Type a message..'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <i
              className='ml-2 fas fa-paper-plane fa-2x text-primary'
              onClick={submitMessage}
              role='button'
            ></i>
          </Form.Group>
        </Form>
      </div>
    </Col>
  );
};

export default Messages;
