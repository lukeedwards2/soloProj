import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const BetHistoryPage = () => {
  const betHistory = useSelector((state) => state.bets.betHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_BET_HISTORY_REQUEST' });
  }, [dispatch]);

  return (
    <div>
      <h1>Bet History</h1>
      <ul>
        {betHistory.map((bet) => (
          <li key={bet.id}>
            {bet.sport} - {bet.player} - ${bet.amount}
            <span>{bet.status === 'won' ? '🏆' : '❌'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BetHistoryPage;

