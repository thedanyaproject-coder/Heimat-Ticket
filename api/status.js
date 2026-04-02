module.exports = async function (req, res) {
  try {
    const response = await fetch("NIEUWE_EXEC_URL?action=status");
    const text = await response.text();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ success: false, message: "Status proxy error", error: String(error) });
  }
};
