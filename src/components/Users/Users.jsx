import "./Users.css";
import { useState, useEffect } from "react";
import CreateUser from "../CreateUser/CreateUser";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions";
import AdminUsers from "../AdminUsers/AdminUsers";

const Users = () => {
  const [createUser, setCreateUser] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const userByEmail = useSelector((state) => state.userByEmail);
  const stateRegisterUser = useSelector((state) => state.registerUser)
  const deleteUser = useSelector((state) => state.deleteUserSuccess)
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [stateRegisterUser, deleteUser]);
  /* Handlers */
  const handleCreateUser = () => {
    if (!createUser) setCreateUser(true);
    else {
      setCreateUser(false);
    }
  };
  return (
    <section className="container-users">
        {createUser ? (
          <CreateUser handleCreateUser={handleCreateUser} />
        ) : (
          <AdminUsers handleCreateUser={handleCreateUser} />
        )}
    </section>
  );
};

export default Users;
