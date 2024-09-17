import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ActiveBetsPage = () => {
  const activeBets = useSelector((state) => state.bets.activeBets);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_ACTIVE_BETS_REQUEST' });
  }, [dispatch]);

  const handleAddBet = () => {
    history.push('/add-bet');
  };

  const handleSeeHistory = () => {
    history.push('/bet-history');
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

