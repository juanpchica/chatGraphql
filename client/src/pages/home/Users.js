import React from "react";
import { Col, Image } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";

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
  //Fetching users
  const { loading, data, error } = useQuery(GET_USERS);

  //UserMarkup to validate what info show
  let usersMarkup;
  if (!data || loading) {
    usersMarkup = <p>Loading..</p>;
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user) => (
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
    <div>
      <Col xs={4} className='p-0 bg-secondary'>
        {usersMarkup}
      </Col>
    </div>
  );
};

export default Users;
