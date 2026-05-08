import { useDispatch, useSelector } from 'react-redux';
import { Lock, LockOpen, Archive, Check } from 'lucide-react';
import {
  toggleLock, toggleArchive,
  setDefault, removeDefault, toggleGPay,
} from '../../features/cards/cardsSlice';
import { useToast } from '../../hooks/useToast';

export default function CardActions({ card, cardType }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const cards = useSelector(s => s.cards.cards);

  const hasOtherDefault = cards.some(
    c => c.cardType === cardType && c.isDefault && c.id !== card.id
  );

  const handleLock = () => {
    dispatch(toggleLock(card.id));
    showToast(card.isLocked ? 'Card unlocked!' : 'Card locked successfully!');
  };

  const handleArchive = () => {
    dispatch(toggleArchive(card.id));
    showToast(card.isArchived ? 'Card unarchived!' : 'Card archived successfully!');
  };

  const handleDefault = () => {
    if (card.isDefault) {
      dispatch(removeDefault(card.id));
      showToast('Card removed from default.');
    } else {
      if (hasOtherDefault) {
        showToast('The selected card type already have a default card.', 'error');
        return;
      }
      dispatch(setDefault({ id: card.id, cardType }));
      showToast('Card set as default successfully!');
    }
  };

  const handleGPay = () => {
    dispatch(toggleGPay(card.id));
    showToast(card.isGPay ? 'Card removed from GPay.' : 'Card added to GPay!');
  };

  const iconBox = (active) => ({
  width: 44,
  height: 44,
  borderRadius: '50%',
  background: active ? '#051220' : 'rgb(41, 187, 206)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
  boxShadow: active ? '0 4px 12px rgba(21,101,192,0.35)' : 'none',
});

  const btnStyle = {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 6,
    cursor: 'pointer', padding: '10px 8px',
    borderRadius: 10, border: 'none',
    background: 'none', fontFamily: "'Nunito', sans-serif",
    transition: 'background 0.2s',
  };

  const labelStyle = {
    fontSize: 11, color: '#444',
    fontWeight: 600, textAlign: 'center',
  };

  return (
    <div style={{
      background: '#dce8f5', borderRadius: 12,
      padding: '10px', display: 'grid',
      gridTemplateColumns: '1fr 1fr', gap: 4,
      minWidth: 150,
    }}>

      <button style={btnStyle} onClick={handleLock}>
        <div style={iconBox(card.isLocked, '#1565c0')}>
          {card.isLocked
            ? <LockOpen size={20} color="white" />
            : <Lock size={20} color="#1565c0" />}
        </div>
        <span style={labelStyle}>{card.isLocked ? 'Unlock' : 'Lock Card'}</span>
      </button>

      <button style={btnStyle} onClick={handleArchive}>
        <div style={iconBox(card.isArchived, '#1565c0 ')}>
          <Archive size={20} color={card.isArchived ? 'white' : '#1565c0'} />
        </div>
        <span style={labelStyle}>{card.isArchived ? 'Unarchive' : 'Archive'}</span>
      </button>

      <button
        style={{
          ...btnStyle,
          opacity: (!card.isDefault && hasOtherDefault) ? 0.35 : 1,
          cursor: (!card.isDefault && hasOtherDefault) ? 'not-allowed' : 'pointer',
        }}
        onClick={handleDefault}
      >
        <div style={iconBox(card.isDefault, '#43a047')}>
          <Check size={20} color={card.isDefault ? 'white' : '#43a047'} />
        </div>
        <span style={labelStyle}>
          {card.isDefault ? 'Remove Default' : 'Set As Default'}
        </span>
      </button>

      <button style={btnStyle} onClick={handleGPay}>
        <div style={iconBox(card.isGPay, '#424242')}>
          {card.isGPay ? (
            <span style={{ fontSize: 11, fontWeight: 800, color: 'white' }}>G Pay</span>
          ) : (
            <span style={{ fontSize: 11, fontWeight: 800 }}>
              <span style={{ color: '#4285f4' }}>G</span>
              <span style={{ color: '#555' }}>Pay</span>
            </span>
          )}
        </div>
        <span style={labelStyle}>{card.isGPay ? 'Remove GPay' : 'Add to GPay'}</span>
      </button>

    </div>
  );
}