import React, { createContext, useState, useContext } from 'react';

// UserContext 생성
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 초기 사용자 상태를 null로 설정

  // 로그인 시 사용자 정보를 설정하는 함수
  const login = (userInfo) => {
    console.log("로그인할 사용자 정보:", userInfo); // 로그로 확인
    setUser(userInfo);
  };
  // 로그아웃 시 사용자 정보를 초기화하는 함수
  const logout = () => {
    console.log("사용자 로그아웃"); // 로그아웃 로그
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// UserContext 사용을 위한 커스텀 훅
export const useUser = () => useContext(UserContext);
