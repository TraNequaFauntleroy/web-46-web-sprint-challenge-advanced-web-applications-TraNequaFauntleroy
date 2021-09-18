import React, { useEffect, useState } from "react";
import {useHistory, useParams} from "react-router-dom"

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import {fetchColorService} from '../services/fetchColorService';
import axios from "axios";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    fetchColorService(setColors)
    
  }, [])


  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {

		axiosWithAuth().put(`http://localhost:5000/api/colors/${editColor.id}`, editColor)
			.then(res => {
        console.log(res.data)
        fetchColorService(setColors)
				push(`/colors`)
			})
			.catch(err => {
				console.log(err)
			})
  };

  const deleteColor = ({id}) => {
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${id}`)
            .then(res => {
               console.log(res.data)
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
