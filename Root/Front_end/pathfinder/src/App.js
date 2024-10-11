
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PF_Main from "./HTML/PF_Main";
import PF_SigninForm from "./HTML/PF_SigninForm";
import PF_SignupForm from "./HTML/PF_SignupForm";
import PF_Lost from "./HTML/screen/PF_Lost";
import PF_Find from "./HTML/screen/PF_Find";
import PF_Wanted from "./HTML/screen/PF_Wanted";
import PF_Animal from "./HTML/screen/PF_Animal";
import PF_Lost_Upload from "./HTML/screen/PF_Lost_Upload";
import PF_Find_Upload from "./HTML/screen/PF_Find_Upload";
import PF_Animal_Upload from "./HTML/screen/PF_Animal_Upload";
import PF_Wanted_Upload from "./HTML/screen/PF_Wanted_Upload";
import PF_Find_Board from "./HTML/screen/PF_Find_Board";
import PF_Animal_Board from "./HTML/screen/PF_Animal_Board";
import PF_Wanted_Board from "./HTML/screen/PF_Wanted_Board";
import PF_Lost_Board from "./HTML/screen/PF_Lost_Board";
import SearchResults from "./HTML/SearchResults";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PF_Main />} />
        <Route path="/SearchResults" element={<SearchResults />} />
        <Route path="/PF_SigninForm" element={<PF_SigninForm />} />
        <Route path="/PF_SignupForm" element={<PF_SignupForm />} />
        <Route path="/PF_Lost" element={<PF_Lost />} />
        <Route path="/PF_Find" element={<PF_Find />} />
        <Route path="/PF_Animal" element={<PF_Animal />} />
        <Route path="/PF_Wanted" element={<PF_Wanted />} />
        <Route path="/PF_Lost_Upload" element={<PF_Lost_Upload />} />
        <Route path="/PF_Find_Upload" element={<PF_Find_Upload />} />
        <Route path="/PF_Animal_Upload" element={<PF_Animal_Upload />} />
        <Route path="/PF_Wanted_Upload" element={<PF_Wanted_Upload />} />
        <Route path="/PF_Find_Board" element={<PF_Find_Board />} />
        <Route path="/PF_Animal_Board" element={<PF_Animal_Board />} />
        <Route path="/PF_Wanted_Board" element={<PF_Wanted_Board />} />
        <Route path="/PF_Lost_Board" element={<PF_Lost_Board />} />
      </Routes>
    </Router>
  );
}

export default App;
