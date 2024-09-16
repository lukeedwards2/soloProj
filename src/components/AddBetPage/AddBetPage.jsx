import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddBetPage = () => {
  const [sportsbook, setSportsbook] = useState('');
  const [sport, setSport] = useState('');
  const [player, setPlayer] = useState('');
  const [propType, setPropType] = useState('');
  const [propNumber, setPropNumber] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddBet = () => {
    dispatch({
      type: 'ADD_BET_REQUEST',
      payload: { sportsbook, sport, player, propType, propNumber, amount },
    });
    navigate('/active-bets'); 
  };

  return (
    <div>
      <h1>Add a Bet</h1>
      <input
        type="text"
        placeholder="Sportsbook"
        value={sportsbook}
        onChange={(e) => setSportsbook(e.target.value)}
      />
      <input
        type="text"
        placeholder="Sport"
        value={sport}
        onChange={(e) => setSport(e.target.value)}
      />
      <input
        type="text"
        placeholder="Player"
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
      />
      <input
        type="text"
        placeholder="Prop Type"
        value={propType}
        onChange={(e) => setPropType(e.target.value)}
      />
      <input
        type="number"
        placeholder="Prop Number"
        value={propNumber}
        onChange={(e) => setPropNumber(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleAddBet}>Add Bet</button>
      <button onClick={() => navigate('/active-bets')}>Go Back to Home</button>
    </div>
  );
};

export default AddBetPage;

