export default async function handler(req, res) {
  try {
    const { name = "", persons = "", food = "Nein" } = req.query;

    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbzURyof90tecaKRlR-iqmLwnDpq69xzT5L9Te7OKGsp35EcY1VtXWidLz092f6QLkd64g/exec"
      + "?action=reserve"
      + "&name=" + encodeURIComponent(name)
      + "&persons=" + encodeURIComponent(persons)
      + "&food=" + encodeURIComponent(food);

    const response = await fetch(scriptUrl);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({
      success: false,
      message: "Proxy reserve error"
    });
  }
}
