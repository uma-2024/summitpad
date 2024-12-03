import React, { useState } from 'react';
import './DropdownComponent.css';

const DropdownComponent = ({ StakingIds,step, selectedId, setSelectedId }) => {
    console.log("selectedId",selectedId);
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleClick =(el)=>{
        selectedId[`${step}`]=el
        setSelectedId(selectedId)
        setIsOpen(false)
    }
    return (
        <div className="detail-card">
            <div className="custom-dropdown">
                <button 
                    className="custom-dropdown-toggle" 
                    type="button" 
                    onClick={toggleDropdown}
                >
                  {selectedId[`${step}`]?selectedId[`${step}`]:" select"}
                </button>
                {isOpen && (
                    <ul className="custom-dropdown-menu">
                        {StakingIds.map((el, id) => (
                            <li key={id}>
                                <a className="custom-dropdown-item" onClick={()=>handleClick(el)}>{el}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DropdownComponent;
