import React, { useEffect, useState } from 'react';
import jsonData from './users_data.json';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

function Dashboard() {
  const navigation = useNavigate();
  useEffect(()=>{
    let user=localStorage.getItem('data')
  if(!user)
  {
    navigation('/login')
  }
  },[])
  const [data, setData] = useState(jsonData.mainusers);
  const [open, setOpen] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [userDataToEdit, setUserDataToEdit] = useState(null);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    mobilenumber: '',
  });
  // Add users start 
  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };
const handleAddUser = () => {
    const lastUserId = data.length > 0 ? data[data.length - 1].id : 0;
    const newUser = { ...newUserData, id: lastUserId + 1 };
    setData([...data, newUser]);
    setNewUserData({
      name: '',
      email: '',
      password: '',
      address: '',
      mobilenumber: '',
    });
    setOpenAddDialog(false);
  };
  // Add users end

  // Delete user start
const deleteData = (userToDelete) => {
    if(window.confirm('Are you want to delete this data'))
    {
      const newData = data.filter((user) => user.id !== userToDelete.id);
      setData(newData);
    }
   
  }
  //delete user end


  // edit user start
  const handleClickOpen = (user) => {
    setUserDataToEdit(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChanges = () => {
    if (userDataToEdit) {
      const newData = data.map((user) => {
        if (user.id === userDataToEdit.id) {
          return userDataToEdit;
        }
        return user;
      });
      setData(newData);
    }
    setOpen(false);
  };
  // edit user end
  return (
    <div>
      {/* UPDATE USER DIALOG BOX */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {userDataToEdit && (
            <div>
              <TextField
                margin="dense"
                label="Name"
                fullWidth
                variant="standard"
                value={userDataToEdit.name}
                onChange={(e) =>
                  setUserDataToEdit({
                    ...userDataToEdit,
                    name: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                variant="standard"
                value={userDataToEdit.email}
                onChange={(e) =>
                  setUserDataToEdit({
                    ...userDataToEdit,
                    email: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Password"
                fullWidth
                variant="standard"
                value={userDataToEdit.password}
                onChange={(e) =>
                  setUserDataToEdit({
                    ...userDataToEdit,
                    password: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Address"
                fullWidth
                variant="standard"
                value={userDataToEdit.address}
                onChange={(e) =>
                  setUserDataToEdit({
                    ...userDataToEdit,
                    address: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Mobile Number"
                fullWidth
                variant="standard"
                value={userDataToEdit.mobilenumber}
                onChange={(e) =>
                  setUserDataToEdit({
                    ...userDataToEdit,
                    mobilenumber: e.target.value,
                  })
                }
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* ADD USER DIALOG BOX */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            value={newUserData.name}
            onChange={(e) =>
              setNewUserData({
                ...newUserData,
                name: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
            value={newUserData.email}
            onChange={(e) =>
              setNewUserData({
                ...newUserData,
                email: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Password"
            fullWidth
            variant="standard"
            value={newUserData.password}
            onChange={(e) =>
              setNewUserData({
                ...newUserData,
                password: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            variant="standard"
            value={newUserData.address}
            onChange={(e) =>
              setNewUserData({
                ...newUserData,
                address: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Mobile Number"
            fullWidth
            variant="standard"
            value={newUserData.mobilenumber}
            onChange={(e) =>
              setNewUserData({
                ...newUserData,
                mobilenumber: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddUser}>Add User</Button>
        </DialogActions>
      </Dialog>

      <h2 style={{ textAlign: 'center' }}>Welcome To Data Dashboard</h2>
      <Button variant='primary' onClick={handleClickOpenAddDialog} style={{marginLeft:'3rem'}}>ADD USER</Button>

      <table id="customers">
        <thead>
          <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Address</th>
          <th>Mobile</th>
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>{user.address}</td>
            <td>{user.mobilenumber}</td>
            <td>
              <Button
                variant="warning"
                onClick={() => navigation(`/view`, { state: user })}
              >
                View
              </Button>
            </td>
            <td>
              <Button onClick={() => handleClickOpen(user)}>Edit</Button>
            </td>
            <td>
              <Button variant="danger" onClick={() => deleteData(user)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
