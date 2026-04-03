module.exports = async function (req, res) {
  try {
    const ticket = req.query.ticket || "";

    const url =
      "https://script.google.com/macros/s/AKfycbw4rZ7BqTOVG3vAayLDA7ipDs1VUX-hYxnukwCAgKQn9q6SpW940pSxm6s3YJ0KBGiErw/exec" +
      "?action=lookup" +
      "&ticket=" + encodeURIComponent(ticket);

    const response = await fetch(url);
    const text = await response.text();

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lookup proxy error",
      error: String(error)
    });
  }
};
