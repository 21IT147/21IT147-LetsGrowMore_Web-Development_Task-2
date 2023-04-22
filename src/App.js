import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const Navbar = styled.nav`
  background-color: pink;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;

const Logo = styled.h1`
  margin-left: 40%;
`;


const Button = styled.button`
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #4c4cff;
  }
`;

const UserCard = styled.div`
background-color:pink;
color:white;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding-left: 30%;
  margin-top:2rem;
  margin-bottom: 1rem;
  transition: all 0.4s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;


const UserCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #5d5dff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotate360} 2s linear infinite;
`;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://reqres.in/api/users?page=1");
      const data = await response.json();
      setUsers(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar>
        <Logo>Brand Name</Logo>
        <Button onClick={fetchUsers}>Get Users</Button>
      </Navbar>
      {isLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <UserCardGrid>
          {users.map((user) => (
            <UserCard key={user.id}>
              <h3>{`${user.first_name} ${user.last_name}`}</h3>
              <p>{user.email}</p>
              <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            </UserCard>
          ))}
        </UserCardGrid>
      )}
    </>
  );
}

export default App;
