import axios from 'axios';

const Delete = async () => {
    const response = await axios.delete('http://localhost:3000/auth/delete-all?superKey=wabalaba1029')
    console.log(response)
}
Delete()