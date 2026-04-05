module.exports = async function (req, res) {
  try {
    const first_name = req.query.first_name || "";
    const last_name = req.query.last_name || "";
    const email = req.query.email || "";
    const phone = req.query.phone || "";
    const persons = req.query.persons || "";
    const food = req.query.food || "Nein";

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const MAIL_FROM = process.env.MAIL_FROM;

    if (!GOOGLE_SCRIPT_URL) {
      return res.status(500).json({
        success: false,
        message: "GOOGLE_SCRIPT_URL ontbreekt in Vercel environment variables."
      });
    }

    const reserveUrl =
      GOOGLE_SCRIPT_URL +
      "?action=reserve" +
      "&first_name=" + encodeURIComponent(first_name) +
      "&last_name=" + encodeURIComponent(last_name) +
      "&email=" + encodeURIComponent(email) +
      "&phone=" + encodeURIComponent(phone) +
      "&persons=" + encodeURIComponent(persons) +
      "&food=" + encodeURIComponent(food);

    const reserveResponse = await fetch(reserveUrl);
    const reserveText = await reserveResponse.text();

    let reserveData;
    try {
      reserveData = JSON.parse(reserveText);
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Ongeldige JSON van Google Script.",
        raw_response: reserveText
      });
    }

    if (!reserveData.success) {
      return res.status(200).json(reserveData);
    }

    let email_sent = false;
    let email_error = "";

    if (RESEND_API_KEY && MAIL_FROM && reserveData.email) {
      const subject = "Bestätigung Ihrer Reservierung – Heimatlieder Abend";

      const html = `
        <p>Hallo ${reserveData.first_name},</p>

        <p>vielen Dank für Ihre Reservierung für den</p>

        <p>
          <strong>HEIMATLIEDER ABEND</strong><br>
          Samstag, 6. Juni · 20:00 Uhr
        </p>

        <p>
          <strong>Ihre Reservierungsdaten:</strong><br>
          Name: ${reserveData.first_name} ${reserveData.last_name}<br>
          Personen: ${reserveData.persons}<br>
          Essen: ${reserveData.food}<br>
          Ticketnummer: <strong>${reserveData.ticket_number}</strong>
        </p>

        <p>
          <strong>Ihr Ticket herunterladen:</strong><br>
          <a href="https://heimat-ticket.vercel.app/ticket.html?ticket=${encodeURIComponent(reserveData.ticket_number)}&pdf=1">
            Hier klicken, um Ihr Ticket (PDF) zu öffnen
          </a>
        </p>

        <p>
          Dieses Ticket sichert Ihnen einen Sitzplatz an einem Tisch.<br>
          Bitte bringen Sie das Ticket digital oder ausgedruckt mit.
        </p>

        <p>
          Wir freuen uns auf einen schönen Abend!
        </p>

        <p>
          Mit freundlichen Grüßen<br>
          <strong>Gasthaus Alt Grieth</strong>
        </p>
      `;

      try {
        const mailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: MAIL_FROM,
            to: reserveData.email,
            subject,
            html
          })
        });

        const mailResultText = await mailResponse.text();

        if (mailResponse.ok) {
          email_sent = true;
        } else {
          email_error = mailResultText;
          console.error("MAIL ERROR:", mailResultText);
        }
      } catch (err) {
        email_error = String(err);
        console.error("MAIL EXCEPTION:", err);
      }
    } else {
      if (!RESEND_API_KEY) email_error += " RESEND_API_KEY ontbreekt.";
      if (!MAIL_FROM) email_error += " MAIL_FROM ontbreekt.";
      if (!reserveData.email) email_error += " Geen ontvanger-e-mail.";
    }

    return res.status(200).json({
      ...reserveData,
      email_sent,
      email_error
    });

  } catch (error) {
    console.error("RESERVE API ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Reserve proxy error",
      error: String(error)
    });
  }
};
