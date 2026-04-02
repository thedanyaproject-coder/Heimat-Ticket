export default async function handler(req, res) {
  try {
    const {
      first_name = "",
      last_name = "",
      email = "",
      phone = "",
      persons = "",
      food = "Nein"
    } = req.query;

    const url =
      "https://script.google.com/macros/s/AKfycbzURyof90tecaKRlR-iqmLwnDpq69xzT5L9Te7OKGsp35EcY1VtXWidLz092f6QLkd64g/exec"
      + "?action=reserve"
      + "&first_name=" + encodeURIComponent(first_name)
      + "&last_name=" + encodeURIComponent(last_name)
      + "&email=" + encodeURIComponent(email)
      + "&phone=" + encodeURIComponent(phone)
      + "&persons=" + encodeURIComponent(persons)
      + "&food=" + encodeURIComponent(food);

    const r = await fetch(url);
    const data = await r.json();

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ success: false, message: "Reserve proxy error" });
  }
}
