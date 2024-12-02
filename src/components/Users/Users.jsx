import "./Users.css";
import { useState, useEffect } from "react";
import CreateUser from "../CreateUser/CreateUser";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/userActions";
import AdminUsers from "../AdminUsers/AdminUsers";

const Users = () => {
  const [createUser, setCreateUser] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const userByEmail = useSelector((state) => state.user.userByEmail);
  const stateRegisterUser = useSelector((state) => state.user.registerUser)
  const deleteUser = useSelector((state) => state.user.deleteUserSuccess)
  
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
