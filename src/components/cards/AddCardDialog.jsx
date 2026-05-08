import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { X, Calendar } from 'lucide-react';
import { addCard } from '../../features/cards/cardsSlice';
import { useToast } from '../../hooks/useToast';
import { luhnCheck, isFutureDate, formatCardNumber } from '../../utils/cardValidators';

const schema = z.object({
  name:       z.string().min(1, 'Name is required').max(35, 'Max 35 characters'),
  bankName:   z.string().min(1, 'Bank name is required'),
  cardType:   z.enum(['credit', 'debit'], { errorMap: () => ({ message: 'Please select card type' }) }),
  cardNumber: z.string()
    .min(1, 'Card number is required')
    .refine(v => luhnCheck(v.replace(/\s/g, '')), 'Invalid card number'),
  validTill:  z.string()
    .min(1, 'Expiry date is required')
    .refine(isFutureDate, 'Must be a future date (MM/YYYY)'),
  cvv: z.string()
    .min(3, 'CVV is required')
    .max(4, 'Invalid CVV')
    .regex(/^\d+$/, 'CVV must be numeric'),
  isDefault: z.boolean().optional(),
  isGPay:    z.boolean().optional(),
});

export default function AddCardDialog({ onClose }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const allCards = useSelector(s => s.cards.cards);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { isDefault: false, isGPay: false },
  });

  const watchedNumber = watch('cardNumber');

  const handleCardNumberChange = (e) => {
    setValue('cardNumber', formatCardNumber(e.target.value));
  };

  const handleValidTillChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2, 6);
    setValue('validTill', val);
  };

  const onSubmit = (data) => {
    if (data.isDefault) {
      const existingDefault = allCards.find(
        c => c.cardType === data.cardType && c.isDefault
      );
      if (existingDefault) {
        showToast('The selected card type already have a default card.', 'error');
        return;
      }
    }

    dispatch(addCard({
      ...data,
      cardNumber: data.cardNumber.replace(/\s/g, ''), // spaces hata do
      isLocked: false,
      isArchived: false,
    }));

    showToast('Card added successfully!');
    onClose();
  };

  const inputStyle = (hasError) => ({
    width: '100%', padding: '10px 14px',
    borderRadius: 8, fontSize: 14,
    border: `1.5px solid ${hasError ? '#e53935' : '#e0e0e0'}`,
    outline: 'none', boxSizing: 'border-box',
    fontFamily: "'Nunito', sans-serif",
    transition: 'border-color 0.2s',
  });

  const labelStyle = {
    display: 'block', marginBottom: 6,
    fontSize: 13, fontWeight: 700, color: '#333',
    fontFamily: "'Nunito', sans-serif",
  };

  const errStyle = {
    color: '#e53935', fontSize: 12, marginTop: 4,
    fontFamily: "'Nunito', sans-serif",
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 1000, padding: 16,
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: 'white', borderRadius: 16,
        width: '100%', maxWidth: 500,
        boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
        maxHeight: '90vh', overflowY: 'auto',
      }}>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '20px 24px 16px',
          borderBottom: '1px solid #f0f0f0',
        }}>
          <h2 style={{
            margin: 0, fontSize: 20, fontWeight: 200,
            color: '#1a2744', fontFamily: "'Nunito', sans-serif",
          }}>
            New Card
          </h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none',
            cursor: 'pointer', color: '#666', padding: 4,
          }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '20px 24px' }}>

          <div style={{ marginBottom: 16 }}>
            <label style={{ ...labelStyle, color: errors.name ? '#e53935' : '#333' }}>
              Name:
            </label>
            <input
              {...register('name')}
              placeholder="i.e. James Carlon"
              style={inputStyle(errors.name)}
            />
            {errors.name && <p style={errStyle}>⚠ {errors.name.message}</p>}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Bank Name:</label>
            <input
              {...register('bankName')}
              placeholder="i.e. HDFC BANK"
              style={inputStyle(errors.bankName)}
            />
            {errors.bankName && <p style={errStyle}>⚠ {errors.bankName.message}</p>}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Card Type:</label>
            <div style={{ position: 'relative' }}>
              <select
                {...register('cardType')}
                style={{ ...inputStyle(errors.cardType), appearance: 'none', cursor: 'pointer' }}
              >
                <option value="">Select Card Type</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
              <span style={{
                position: 'absolute', right: 14, top: '50%',
                transform: 'translateY(-50%)', pointerEvents: 'none',
                color: '#666',
              }}>▾</span>
            </div>
            {errors.cardType && <p style={errStyle}>⚠ {errors.cardType.message}</p>}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Card Number:</label>
            <input
              value={watchedNumber || ''}
              onChange={handleCardNumberChange}
              placeholder="i.e. 5500 0055 5555 4444"
              maxLength={19}
              style={inputStyle(errors.cardNumber)}
            />
            {errors.cardNumber && <p style={errStyle}>⚠ {errors.cardNumber.message}</p>}
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: '1.5fr 1fr',
            gap: 12, marginBottom: 16,
          }}>
            <div>
              <label style={labelStyle}>Valid Till:</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={14} style={{
                  position: 'absolute', left: 10,
                  top: '50%', transform: 'translateY(-50%)',
                  color: '#999',
                }}/>
                <input
                  {...register('validTill')}
                  onChange={handleValidTillChange}
                  placeholder="MM/YYYY"
                  maxLength={7}
                  style={{ ...inputStyle(errors.validTill), paddingLeft: 30 }}
                />
              </div>
              {errors.validTill && <p style={errStyle}>⚠ {errors.validTill.message}</p>}
            </div>
            <div>
              <label style={labelStyle}>CVV:</label>
              <input
                {...register('cvv')}
                type="password"
                placeholder="•••"
                maxLength={4}
                style={inputStyle(errors.cvv)}
              />
              {errors.cvv && <p style={errStyle}>⚠ {errors.cvv.message}</p>}
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{
              display: 'flex', alignItems: 'center', gap: 10,
              cursor: 'pointer', fontSize: 14,
              fontFamily: "'Nunito', sans-serif",
            }}>
              <input type="checkbox" {...register('isDefault')}
                style={{ width: 16, height: 16, cursor: 'pointer' }}/>
              Set this card as Default
            </label>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: 'flex', alignItems: 'center', gap: 10,
              cursor: 'pointer', fontSize: 14,
              fontFamily: "'Nunito', sans-serif",
            }}>
              <input type="checkbox" {...register('isGPay')}
                style={{ width: 16, height: 16, cursor: 'pointer' }}/>
              Add this card to GPay?
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button type="button" onClick={onClose} style={{
              padding: '10px 24px', borderRadius: 8,
              border: '1.5px solid #e0e0e0', background: 'white',
              cursor: 'pointer', fontSize: 14, fontWeight: 600,
              color: '#555', fontFamily: "'Nunito', sans-serif",
            }}>
              Cancel
            </button>
            <button type="submit" style={{
              padding: '10px 28px', borderRadius: 8,
              border: 'none', background: '#1a2744',
              cursor: 'pointer', fontSize: 14, fontWeight: 700,
              color: 'white', fontFamily: "'Nunito', sans-serif",
              boxShadow: '0 4px 12px rgba(26,39,68,0.3)',
            }}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}