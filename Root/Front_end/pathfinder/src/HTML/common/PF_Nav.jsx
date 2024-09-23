import React from 'react';
import { Link } from 'react-router-dom';

const PF_Nav = () => {
  return (
    <nav className="PF_nav">
      <ul>
        <li><Link to="/PF_Lost">찾아주세요!(분실물)</Link></li>
        <li><Link to="/PF_Find">찾아가세요(습득물)</Link></li>
        <li><Link to="/PF_Animal">사라졌어요!(반려동물)</Link></li>
        <li><Link to="/PF_Wanted">급해요!(현상수배)</Link></li>
      </ul>
    </nav>
  );
};

export default PF_Nav;
