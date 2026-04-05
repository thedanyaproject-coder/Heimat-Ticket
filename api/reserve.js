module.exports = async function (req, res) {
  try {
    const first_name = req.query.first_name || "";
    const last_name = req.query.last_name || "";
    const email = req.query.email || "";
    const phone = req.query.phone || "";
    const persons = req.query.persons || "";
    const food = req.query.food || "Nein";

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
      return res.status(500).json({
        success: false,
        message: "GOOGLE_SCRIPT_URL ontbreekt in Vercel environment variables."
      });
    }

    const url =
      GOOGLE_SCRIPT_URL +
      "?action=reserve" +
      "&first_name=" + encodeURIComponent(first_name) +
      "&last_name=" + encodeURIComponent(last_name) +
      "&email=" + encodeURIComponent(email) +
      "&phone=" + encodeURIComponent(phone) +
      "&persons=" + encodeURIComponent(persons) +
      "&food=" + encodeURIComponent(food);

    const response = await fetch(url);
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Ongeldige JSON van Google Script",
        raw_response: text
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("RESERVE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: String(error)
    });
  }
};
