import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ActiveBetsPage from '../ActiveBetsPage/ActiveBetsPage';
import AddBetPage from '../AddBetPage/AddBetPage';
import BetHistoryPage from '../BetHistoryPage/BetHistoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/active-bets" element={<ActiveBetsPage />} />
        <Route path="/add-bet" element={<AddBetPage />} />
        <Route path="/bet-history" element={<BetHistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;