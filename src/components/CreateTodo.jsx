import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Fab, TextField, colors } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add'

const addTodoBtnSytle={
  position:'fixed',
  bottom:32,
  right:32
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:4,
};

const PriorityOptions = [
    { label: 'High',Value:'high' },
    { label: 'Medium',Value:'medium' },
    { label: 'Low',Value:'low' }
]

export default function CreateTodo({fetchtodos}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


// form states
const [task,setTask] = React.useState("");
const [description,setDescription] = React.useState("");
const [priority,setPriority] = React.useState("");
const [date,setDate] = React.useState("");

// function that submits the form data to firebase and close the modal

const handleFormSubmit = async () => {
  // Form Validations
  validateForm()
  // api call to submit form data
  // axois - to make api call
  const response = await axios.post('https://jan-project-aa287-default-rtdb.asia-southeast1.firebasedatabase.app/todo.json',{task,description,priority,date})
  alert("To Do task created successfully")
  fetchtodos();
  //Reset values
  restFormValues()
  //modal closing
  handleClose()
}

function restFormValues()
{
  setTask('');
  setDescription('');
  setPriority('');
  setDate('')
}

function validateForm()
{
  if(task.length < 3 )
  {
    alert("Enter more than three characters");
    return;
  }
  if(description.length < 5 )
  {
    alert("Enter more than Five characters");
    return;
  }
  if(priority.length < 2)
  {
    alert("invalid priority");
    return;
  }
  if(date.length < 1)
  {
    alert("invalid Date");
    return;
  }
}

console.log(task,description,priority,date);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Fab color="primary" style={addTodoBtnSytle} onClick={handleOpen}>
      <AddIcon/>
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <TextField required id="standard-basic" label="Task" variant="standard" fullWidth sx = {{mb:2}}
          //  below function logs whenever there is a change in text box
            onChange={(e)=>{
              // console.log('event',e.target.value);
              setTask(e.target.value)
            }}
            value={task}
           />
           <TextField required id="standard-basic" label="Description" variant="standard" fullWidth sx = {{mb:2}}
            onChange={(e)=>{
              // console.log('event',e.target.value);
              setDescription(e.target.value)
            }}
            value={description}
           />
           <Autocomplete
                id="disable-clearable"
                disableClearable
                options={PriorityOptions}
                sx={{mb:2}}
                // for dropdown
                onChange={(e,value)=>setPriority(value.Value)}
                value={priority}
                renderInput={(params) => (
                <TextField {...params} label="Priority" variant="standard" required />
                )}
            />
           <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Select Date" sx={{mb:2,width:"100%"}} onChange={value=>setDate(value.format('YYYY-MM-DD'))}/>
           </LocalizationProvider>
           <Button variant='contained' fullWidth sx={{backgroundColor:"#7F00FF"}} onClick={handleFormSubmit}>
                Add to List
           </Button>
        </Box>
      </Modal>
    </div>
  );
}
