export default async function handler(req, res) {
  try {
    const url = "https://script.google.com/macros/s/AKfycbzURyof90tecaKRlR-iqmLwnDpq69xzT5L9Te7OKGsp35EcY1VtXWidLz092f6QLkd64g/exec?action=status";
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ success:false });
  }
}
