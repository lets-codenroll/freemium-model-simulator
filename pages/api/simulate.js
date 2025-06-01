import { simulateFreemiumModel } from '@/lib/simulator';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const simulation = simulateFreemiumModel(req.body);
    res.status(200).json({ success: true, simulation });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}
