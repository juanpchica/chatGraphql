import React from "react";
import { Col, Image } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";

import { useMessageDispatch, useMessageState } from "../../context/message";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      createdAt
      imageUrl
      latestMessage {
        uuid
        from
        to
        content
        createdAt
      }
    }
  }
`;

const Users = ({ setSelectedUser }) => {
  const dispatch = useMessageDispatch(); //To dispatch functions
  const { users } = useMessageState(); //To get actual state

  //Fetching users
  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) => {
      dispatch({ type: "SET_USERS", payload: data.getUsers });
    },
  });

  //UserMarkup to validate what info show
  let usersMarkup;
  if (!users || loading) {
    usersMarkup = <p>Loading..</p>;
  } else if (users.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else if (users.length > 0) {
    usersMarkup = users.map((user) => (
      <div
        className='p-3 d-flex'
        key={user.username}
        onClick={() => setSelectedUser(user.username)}
      >
        <Image
          src={user.imageUrl}
          roundedCircle
          className='mr-2'
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
        <div>
          <p className='text-success'>{user.username}</p>
          <p className='font-weight-light'>
            {user.latestMessage
              ? user.latestMessage.content
              : "You are now connected!"}
          </p>
        </div>
      </div>
    ));
  }

  return (
    <Col xs={4} className='p-0 bg-secondary'>
      {usersMarkup}
    </Col>
  );
};

export default Users;
