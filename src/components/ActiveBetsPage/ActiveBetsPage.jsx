import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';

const ActiveBetsPage = () => {
  const activeBets = useSelector((state) => state.bets.activeBets);
  const dispatch = useDispatch();
  const history = useHistory();

  // State for managing which bet is being edited and the edit form data
  const [editBetId, setEditBetId] = useState(null);
  const [editBetData, setEditBetData] = useState({
    sportsbook: '',
    sport: '',
    player: '',
    prop_number: '',
    prop_type: '',
    amount: '',
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_ACTIVE_BETS_REQUEST' });
  }, [dispatch]);

  // Function to handle the "Edit" button click
  const handleEditClick = (bet) => {
    setEditBetId(bet.id);  // Set the ID of the bet being edited
    setEditBetData(bet);   // Populate edit form with the existing bet data
  };

  // Function to handle changes in the edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditBetData({ ...editBetData, [name]: value });
  };

  // Function to save the edited bet
  const handleSaveEdit = () => {
    dispatch({ type: 'UPDATE_BET_REQUEST', payload: { id: editBetId, updatedBetData: editBetData } });
    setEditBetId(null);  // Exit edit mode after saving
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditBetId(null);  // Exit edit mode without saving
  };

  const handleDeleteBet = (betId) => {
    dispatch({ type: 'DELETE_BET_REQUEST', payload: betId });
  };

  return (
    <div>
      <h1>Active Bets</h1>
      <ul>
        {activeBets.map((bet) => (
          <li key={bet.id}>
            {editBetId === bet.id ? (
              // Editing mode: display input fields for the bet
              <div>
                <input
                  type="text"
                  name="sportsbook"
                  value={editBetData.sportsbook || ''}
                  onChange={handleEditChange}
                  placeholder="Sportsbook"
                />
                <input
                  type="text"
                  name="sport"
                  value={editBetData.sport || ''}
                  onChange={handleEditChange}
                  placeholder="Sport"
                />
                <input
                  type="text"
                  name="player"
                  value={editBetData.player || ''}
                  onChange={handleEditChange}
                  placeholder="Player"
                />
                <input
                  type="text"
                  name="prop_type"
                  value={editBetData.prop_type || ''}
                  onChange={handleEditChange}
                  placeholder="Prop Type"
                />
                <input
                  type="number"
                  name="prop_number"
                  value={editBetData.prop_number || ''}
                  onChange={handleEditChange}
                  placeholder="Prop Number"
                />
                <input
                  type="number"
                  name="amount"
                  value={editBetData.amount || ''}
                  onChange={handleEditChange}
                  placeholder="Amount"
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              // Normal mode: display bet details
              <div>
                {bet.sport} | {bet.sportsbook} | {bet.player} | {bet.prop_number} | {bet.prop_type} | ${bet.amount}
                <button onClick={() => dispatch({ type: 'MARK_BET_AS_WON', payload: bet.id })}>
                  Won
                </button>
                <button onClick={() => dispatch({ type: 'MARK_BET_AS_LOST', payload: bet.id })}>
                  Lost
                </button>
                <button onClick={() => handleEditClick(bet)}>Edit Bet</button>
                <button onClick={() => handleDeleteBet(bet.id)}>Delete Bet</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => history.push('/add-bet')}>Add Bet</button>
      <button onClick={() => history.push('/bet-history')}>See Bet History</button>
      <LogOutButton />
    </div>
  );
};

export default ActiveBetsPage;











  