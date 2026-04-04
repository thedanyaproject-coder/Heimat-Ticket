module.exports = async function (req, res) {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzacbdB_CkW9qqq5-ABFB_5g8vatoJLsoN9MkgYCyFD--YYkxQGFSkuoZz_GZ8eyKQnZw/exec?action=status"
    );
    const text = await response.text();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Status proxy error",
      error: String(error)
    });
  }
};
