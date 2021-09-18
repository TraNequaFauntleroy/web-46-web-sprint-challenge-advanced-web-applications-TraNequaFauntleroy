import React, { useEffect, useState, useHistory, useParams } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axios from "axios";

const BubblePage = () => {
  const [colors, setColors] = useState(fetchColorService);
  const [editing, setEditing] = useState(false);

  const { id } = useParams();
  const { push } = useHistory();

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    editColor.preventDefault();
		axios.put(`http://localhost:5000/api/movies/${id}`, colors)
			.then(res => {
				setColors(res.data);
				push(`/colors/${id}`)
			})
			.catch(err => {
				console.log(err)
			})
  };

  const deleteColor = (colorToDelete) => {
    axios.delete(`http://localhost:5000/api/colors/${id}`)
            .then(res => {
               colorToDelete(id)
               push('/colors')
            })
            .catch(err => {
                console.log(err)
            })
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
