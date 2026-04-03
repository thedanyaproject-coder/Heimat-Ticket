module.exports = async function (req, res) {
  try {
    const first_name = req.query.first_name || "";
    const last_name = req.query.last_name || "";
    const email = req.query.email || "";
    const phone = req.query.phone || "";
    const persons = req.query.persons || "";
    const food = req.query.food || "Nein";

    const url =
      "https://script.google.com/macros/s/AKfycbzacbdB_CkW9qqq5-ABFB_5g8vatoJLsoN9MkgYCyFD--YYkxQGFSkuoZz_GZ8eyKQnZw/exec" +
      "?action=reserve" +
      "&first_name=" + encodeURIComponent(first_name) +
      "&last_name=" + encodeURIComponent(last_name) +
      "&email=" + encodeURIComponent(email) +
      "&phone=" + encodeURIComponent(phone) +
      "&persons=" + encodeURIComponent(persons) +
      "&food=" + encodeURIComponent(food);

    const response = await fetch(url);
    const text = await response.text();

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Reserve proxy error",
      error: String(error)
    });
  }
};
