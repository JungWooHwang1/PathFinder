import React from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/PF_Nav.css';


const PF_Nav = () => {
  return (
    <nav className="PF_nav">
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"></link>
      <ul className="PF_nav_list">
        <li className="PF_nav_lost"><Link to="/PF_Lost">찾아주세요!(분실물)</Link></li>
        <li className="PF_nav_find"><Link to="/PF_Find">찾아가세요(습득물)</Link></li>
        <li className="PF_nav_animal"><Link to="/PF_Animal">사라졌어요!(반려동물)</Link></li>
        <li className="PF_nav_wanted"><Link to="/PF_Wanted">급해요!(현상수배)</Link></li>
      </ul>
    </nav>
  );
};

export default PF_Nav;
