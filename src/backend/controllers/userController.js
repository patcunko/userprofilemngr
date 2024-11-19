import { query as _query } from '../../db/dbConfig';

const getUserProfile = async (req, res) => {
    const userId = req.params.userId;

    try {
        const query = `
            SELECT
                u.name,
                u.email,
                u.phone,
                c.company_name,
                c.position,
                l.points,
                p.card_number,
                p.expiration_date,
                v.vehicle_name
            FROM users u
            JOIN companies c ON u.company_id = c.id
            JOIN loyalty_points l ON u.id = l.user_id
            LEFT JOIN payment_info p ON u.id = p.user_id
            LEFT JOIN vehicles v ON v.user_id = u.id
            WHERE u.id = $1;
        `;
        const values = [userId];

        const { rows } = await _query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userProfile = rows[0];
        res.json(userProfile);
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePayment = async (req, res) => {
  const { userId } = req.params;
  const { card_number, cvv, expiration_date, provider, address } = req.body;

  try {
    const query = `
      UPDATE payment_info
      SET card_number = $1, cvv = $2, expiration_date = $3, provider = $4, address = $5
      WHERE user_id = $6
      RETURNING *;
    `;
    const values = [card_number, cvv, expiration_date, provider, address, userId];

    const { rows } = await _query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Payment credentials not found' });
    }

    res.json({ message: 'Payment information updated successfully', payment: rows[0] });
  } catch (error) {
    console.error('Error updating payment information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateContactInfo = async (req, res) => {
  const { userId } = req.params;
  const { email, phone_number } = req.body;

  try {
    const query = `
      UPDATE users
      SET email = $1, phone = $2
      WHERE id = $3
      RETURNING *;
    `;
    const values = [email, phone_number, userId];

    const { rows } = await _query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Contact information updated successfully', user: rows[0] });
  } catch (error) {
    console.error('Error updating contact information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  getUserProfile,
  updatePayment,
  updateContactInfo,
};