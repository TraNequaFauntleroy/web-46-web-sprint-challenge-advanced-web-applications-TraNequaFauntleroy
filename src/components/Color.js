import React from 'react';

const Color = ({color, setEditColor, toggleEdit, deleteColor}) => {

    const handleDelete = (e) => {
        e.stopPropagation();
        deleteColor(color);
        toggleEdit(false);
    }

    const handleEdit = (e) => {
        toggleEdit(true);
        setEditColor(color);
    }

    return(<li data-testid="color" id="color" onClick={handleEdit}>

        <span>
            <span className="delete" data-testid="delete" onClick={handleDelete}>x</span>
            {` ${color.color}`}
        </span>
        <div 
            className="color-box"
            style={{ backgroundColor: color.code.hex }}
        />
    </li>);
}

export default Color;