import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ActiveBetsPage = () => {
  const activeBets = useSelector((state) => state.bets.activeBets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'FETCH_ACTIVE_BETS_REQUEST' });
  }, [dispatch]);

  const handleAddBet = () => {
    navigate('/add-bet');
  };

  const handleSeeHistory = () => {
    navigate('/bet-history');
  };

  return (
    <div>
      <h1>Active Bets</h1>
      <ul>
        {activeBets.map((bet) => (
          <li key={bet.id}>
            {bet.sport} - {bet.player} - ${bet.amount}
            {/*  */}
            <button onClick={() => dispatch({ type: 'MARK_BET_AS_WON', payload: bet.id })}>
              Mark as Won
            </button>
            <button onClick={() => dispatch({ type: 'MARK_BET_AS_LOST', payload: bet.id })}>
              Mark as Lost
            </button>
            <button onClick={() => navigate(`/edit-bet/${bet.id}`)}>Edit</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddBet}>Add Bet</button>
      <button onClick={handleSeeHistory}>See Bet History</button>
    </div>
  );
};

export default ActiveBetsPage;

