import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff } from 'lucide-react';
import CardItem from './CardItem';
import CardActions from './CardActions';
import { setActiveIndex, toggleShowNumber } from '../../features/cards/cardsSlice';

export default function CardCarousel({ cardType, title }) {
  const dispatch = useDispatch();
  const allCards  = useSelector(s => s.cards.cards);
  const activeIndex = useSelector(s => s.cards.activeIndex[cardType]);
  const showNumber  = useSelector(s => s.cards.showNumber[cardType]);

  const cards = allCards.filter(c => c.cardType === cardType);

  if (cards.length === 0) return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{
        color: '#1565c0', fontSize: 18, fontWeight: 700,
        borderBottom: '2px solid #1565c0', paddingBottom: 4,
        display: 'inline-block', marginBottom: 16,
        fontFamily: "'Nunito', sans-serif",
      }}>
        {title}
      </h2>
      <p style={{ color: '#aaa', fontSize: 14 }}>
        No {title.toLowerCase()} yet. Click "+ Add Card" to add one.
      </p>
    </div>
  );

  const safeIndex = Math.min(activeIndex, cards.length - 1);
  const activeCard = cards[safeIndex];

  return (
    <div style={{ marginBottom: 40 }}>

      <h2 style={{
        color: '#1565c0', fontSize: 18, fontWeight: 700,
        borderBottom: '2px solid #1565c0', paddingBottom: 4,
        display: 'inline-block', marginBottom: 16,
        fontFamily: "'Nunito', sans-serif",
      }}>
        {title}
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
        <button
          onClick={() => dispatch(toggleShowNumber(cardType))}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            backgroundColor:"rgb(188, 235, 241)",
            border: '1.5px solid #1565c0',
            borderRadius: 20, padding: '5px 16px',
            cursor: 'pointer', color: '#1565c0',
            fontSize: 13, fontWeight: 600,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          {showNumber ? <EyeOff size={14} /> : <Eye size={14} />}
          {showNumber ? 'Hide Card Number' : 'Show Card Number'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ overflow: 'hidden', borderRadius: 16 }}>
            <div style={{
              display: 'flex',
              transform: `translateX(-${safeIndex * 100}%)`,
              transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}>
              {cards.map(card => (
                <div key={card.id} style={{ minWidth: '100%' }}>
                  <CardItem card={card} showNumber={showNumber} />
                </div>
              ))}
            </div>
          </div>

          {cards.length > 1 && (
            <div style={{
              display: 'flex', justifyContent: 'center',
              gap: 8, marginTop: 12,
            }}>
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => dispatch(setActiveIndex({ cardType, index: i }))}
                  style={{
                    width: i === safeIndex ? 24 : 10,
                    height: 10, borderRadius: 5,
                    background: i === safeIndex ? '#1565c0' : '#b0bec5',
                    border: 'none', cursor: 'pointer',
                    padding: 0, transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <CardActions card={activeCard} cardType={cardType} />
      </div>
    </div>
  );
}