<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reservierung – Gasthaus Alt Grieth</title>
  <meta name="robots" content="noindex" />

  <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>

  <style>
    * { box-sizing: border-box; }

    body {
      margin: 0;
      background: #fffdf8;
      color: #160520;
      font-family: Arial, sans-serif;
    }

    .wrap {
      max-width: 860px;
      margin: 0 auto;
      padding: 18px;
    }

    .page-topline {
      text-align: center;
      font-size: 13px;
      letter-spacing: 4px;
      margin-bottom: 10px;
      color: #6a5a36;
    }

    h1 {
      margin: 0 0 14px;
      text-align: center;
      letter-spacing: 2px;
      font-size: 32px;
      line-height: 1.2;
    }

    .intro {
      max-width: 760px;
      margin: 0 auto 20px;
      text-align: center;
      font-size: 15px;
      line-height: 1.7;
    }

    .status-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      max-width: 760px;
      margin: 0 auto 20px;
    }

    .status-box,
    .form-box,
    .sheet {
      background: #fff;
      border: 2px solid #bdad82;
    }

    .status-box {
      padding: 16px;
      text-align: center;
    }

    .status-label {
      display: block;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #6a5a36;
      margin-bottom: 8px;
    }

    .status-value {
      font-size: 30px;
      font-weight: 700;
    }

    .message {
      max-width: 760px;
      margin: 0 auto 16px;
      padding: 12px 14px;
      display: none;
      text-align: center;
      font-size: 14px;
      line-height: 1.5;
      border: 1px solid #bdad82;
      background: #fff;
    }

    .form-box {
      max-width: 760px;
      margin: 0 auto 24px;
      padding: 18px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px 16px;
    }

    label {
      display: block;
      margin: 0 0 6px;
      font-weight: 700;
      font-size: 14px;
    }

    input,
    select {
      width: 100%;
      min-height: 42px;
      padding: 9px 11px;
      font-size: 15px;
      color: #160520;
      border: 1px solid #bdad82;
      background: #fff;
      appearance: none;
    }

    .btn-row {
      display: flex;
      gap: 10px;
      margin-top: 16px;
    }

    button {
      flex: 1 1 0;
      min-height: 40px;
      padding: 8px 12px;
      font-size: 14px;
      border: none;
      cursor: pointer;
      border-radius: 0;
    }

    .btn-primary {
      background: #160520;
      color: #fff;
    }

    .btn-secondary {
      background: #bdad82;
      color: #160520;
    }

    button[disabled] {
      opacity: .5;
      cursor: not-allowed;
    }

    .preview-title {
      text-align: center;
      font-size: 20px;
      letter-spacing: 2px;
      margin: 8px 0 16px;
    }

    .sheet {
      width: 100%;
      max-width: 760px;
      margin: 0 auto 20px;
      padding: 14px;
      position: relative;
      background:
        linear-gradient(rgba(255,251,242,0.97), rgba(255,251,242,0.97)),
        repeating-linear-gradient(
          0deg,
          rgba(189,173,130,0.04),
          rgba(189,173,130,0.04) 2px,
          transparent 2px,
          transparent 8px
        );
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
      overflow: hidden;
    }

    .sheet::before {
      content: "";
      position: absolute;
      top: 10px;
      right: 10px;
      bottom: 10px;
      left: 10px;
      border: 1px solid rgba(189,173,130,0.9);
      pointer-events: none;
    }

    .sheet::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle at center, rgba(255,255,255,0.16) 0, rgba(255,255,255,0.16) 2px, transparent 2px);
      background-size: 30px 30px;
      opacity: 0.18;
      pointer-events: none;
    }

    .ticket-half {
      position: relative;
      z-index: 2;
      min-height: 490px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 4px 2px 0;
    }

    .ticket-header {
      text-align: center;
      padding: 2px 0 8px;
    }

    .ticket-house {
      font-size: 12px;
      letter-spacing: 4px;
      color: #6a5a36;
      margin-bottom: 8px;
    }

    .ticket-title {
      font-size: 28px;
      line-height: 1.1;
      letter-spacing: 3px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .ticket-eventline {
      font-size: 14px;
      letter-spacing: 2px;
      line-height: 1.5;
    }

    .divider {
      width: 110px;
      height: 1px;
      background: #bdad82;
      margin: 12px auto 14px;
    }

    .ticket-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 12px;
      margin-bottom: 12px;
    }

    .field-box {
      border: 1px solid #bdad82;
      padding: 7px 9px;
      background: rgba(255,255,255,0.78);
      min-height: 54px;
    }

    .field-box.full {
      grid-column: 1 / -1;
    }

    .field-label {
      display: block;
      font-size: 10px;
      letter-spacing: 2px;
      margin-bottom: 3px;
      color: #6a5a36;
      text-transform: uppercase;
    }

    .field-value {
      display: block;
      font-size: 14px;
      font-weight: 700;
      word-break: break-word;
      min-height: 17px;
    }

    .ticket-bottom {
      display: grid;
      grid-template-columns: 1fr 120px;
      gap: 12px;
      align-items: center;
      margin-top: 8px;
    }

    .ticket-number-box {
      border: 2px solid #bdad82;
      padding: 12px;
      text-align: center;
      background: rgba(255,255,255,0.72);
    }

    .ticket-number-label {
      font-size: 10px;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 5px;
      color: #6a5a36;
    }

    .ticket-number {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 2px;
      word-break: break-word;
      min-height: 22px;
    }

    .free-line {
      margin-top: 8px;
      text-align: center;
      font-size: 12px;
      letter-spacing: 2px;
      font-weight: 700;
    }

    .ticket-notes {
      margin-top: 10px;
      text-align: center;
      font-size: 12px;
      line-height: 1.5;
    }

    .qr-wrap {
      text-align: center;
    }

    .qr-wrap img {
      width: 104px;
      height: 104px;
      background: #fff;
      border: 1px solid #bdad82;
      padding: 6px;
      display: inline-block;
    }

    .cut-line {
      position: relative;
      z-index: 2;
      margin: 10px 0;
      border-top: 2px dashed #bdad82;
    }

    .cut-line span {
      position: absolute;
      left: 50%;
      top: -13px;
      transform: translateX(-50%);
      background: #fffdf8;
      padding: 0 10px;
      color: #6a5a36;
      font-size: 16px;
      line-height: 1;
    }

    @media (max-width: 720px) {
      .wrap { padding: 12px; }
      h1 { font-size: 28px; }
      .intro { font-size: 14px; margin-bottom: 18px; }
      .status-grid { grid-template-columns: 1fr; gap: 10px; }
      .status-value { font-size: 28px; }
      .form-box { padding: 14px; }
      .form-grid { grid-template-columns: 1fr; }
      button {
        min-height: 38px;
        font-size: 13px;
        padding: 8px 10px;
      }
      .sheet { padding: 10px; }
      .ticket-half { min-height: auto; }
      .ticket-title { font-size: 22px; letter-spacing: 2px; }
      .ticket-eventline { font-size: 13px; letter-spacing: 1px; }
      .ticket-grid { grid-template-columns: 1fr; }
      .ticket-bottom { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="page-topline">GASTHAUS ALT GRIETH</div>

    <h1>HEIMATLIEDER ABEND – TICKETS</h1>

    <div class="intro">
      Der Eintritt zum Heimatlieder Abend im Gasthaus Alt Grieth ist frei und eine Reservierung ist nicht erforderlich.<br><br>
      Wer sich jedoch einen Sitzplatz an einem Tisch sichern möchte, kann hier kostenlos ein Ticket bestellen.
    </div>

    <div class="status-grid">
      <div class="status-box">
        <span class="status-label">Noch verfügbare Tische</span>
        <span class="status-value" id="availableTables">-</span>
      </div>
      <div class="status-box">
        <span class="status-label">Noch verfügbare Sitzplätze</span>
        <span class="status-value" id="availableSeats">-</span>
      </div>
    </div>

    <div class="message" id="messageBox"></div>

    <div class="form-box">
      <div class="form-grid">
        <div>
          <label for="first_name">Vorname</label>
          <input id="first_name" type="text" placeholder="Vorname">
        </div>

        <div>
          <label for="last_name">Nachname</label>
          <input id="last_name" type="text" placeholder="Nachname">
        </div>

        <div>
          <label for="email">E-Mail</label>
          <input id="email" type="email" placeholder="E-Mail">
        </div>

        <div>
          <label for="phone">Telefonnummer</label>
          <input id="phone" type="text" placeholder="Telefonnummer">
        </div>

        <div>
          <label for="persons">Anzahl Personen</label>
          <input id="persons" type="number" min="1" value="1">
        </div>

        <div>
          <label for="food">Gehen Sie auch essen?</label>
          <select id="food">
            <option value="Ja">Ja</option>
            <option value="Nein" selected>Nein</option>
          </select>
        </div>
      </div>

      <div class="btn-row">
        <button class="btn-primary" id="reserveBtn" type="button">Reservieren</button>
        <button class="btn-secondary" id="pdfBtn" type="button">PDF herunterladen</button>
      </div>
    </div>

    <div id="ticketArea">
      <div class="preview-title">VORSCHAU IHRES TICKETS</div>

      <div class="sheet" id="ticketSheet">
        <div class="ticket-half">
          <div>
            <div class="ticket-header">
              <div class="ticket-house">GASTHAUS ALT GRIETH</div>
              <div class="ticket-title">HEIMATLIEDER ABEND</div>
              <div class="ticket-eventline">SAMSTAG · 6. JUNI · 20:00 UHR</div>
            </div>

            <div class="divider"></div>

            <div class="ticket-grid">
              <div class="field-box"><span class="field-label">Vorname</span><span class="field-value" id="t1_first_name">—</span></div>
              <div class="field-box"><span class="field-label">Nachname</span><span class="field-value" id="t1_last_name">—</span></div>
              <div class="field-box"><span class="field-label">E-Mail</span><span class="field-value" id="t1_email">—</span></div>
              <div class="field-box"><span class="field-label">Telefon</span><span class="field-value" id="t1_phone">—</span></div>
              <div class="field-box"><span class="field-label">Anzahl Personen</span><span class="field-value" id="t1_persons">1</span></div>
              <div class="field-box"><span class="field-label">Essen</span><span class="field-value" id="t1_food">Nein</span></div>
              <div class="field-box"><span class="field-label">Datum</span><span class="field-value">6. Juni</span></div>
              <div class="field-box"><span class="field-label">Uhrzeit</span><span class="field-value">20:00 Uhr</span></div>
              <div class="field-box full"><span class="field-label">Ticketnummer</span><span class="field-value" id="t1_number_inline">WIRD BEI RESERVIERUNG VERGEBEN</span></div>
            </div>
          </div>

          <div>
            <div class="ticket-bottom">
              <div class="ticket-number-box">
                <div class="ticket-number-label">Ticketnummer</div>
                <div class="ticket-number" id="t1_number">WIRD BEI RESERVIERUNG VERGEBEN</div>
                <div class="free-line">EINTRITT FREI</div>
              </div>
              <div class="qr-wrap"><img id="t1_qr" alt="QR Code" src="" /></div>
            </div>
            <div class="ticket-notes">
              Dieses Ticket sichert einen Sitzplatz an einem Tisch.<br>
              Bitte bringen Sie dieses Ticket digital oder ausgedruckt mit.
            </div>
          </div>
        </div>

        <div class="cut-line"><span>✂</span></div>

        <div class="ticket-half">
          <div>
            <div class="ticket-header">
              <div class="ticket-house">GASTHAUS ALT GRIETH</div>
              <div class="ticket-title">HEIMATLIEDER ABEND</div>
              <div class="ticket-eventline">SAMSTAG · 6. JUNI · 20:00 UHR</div>
            </div>

            <div class="divider"></div>

            <div class="ticket-grid">
              <div class="field-box"><span class="field-label">Vorname</span><span class="field-value" id="t2_first_name">—</span></div>
              <div class="field-box"><span class="field-label">Nachname</span><span class="field-value" id="t2_last_name">—</span></div>
              <div class="field-box"><span class="field-label">E-Mail</span><span class="field-value" id="t2_email">—</span></div>
              <div class="field-box"><span class="field-label">Telefon</span><span class="field-value" id="t2_phone">—</span></div>
              <div class="field-box"><span class="field-label">Anzahl Personen</span><span class="field-value" id="t2_persons">1</span></div>
              <div class="field-box"><span class="field-label">Essen</span><span class="field-value" id="t2_food">Nein</span></div>
              <div class="field-box"><span class="field-label">Datum</span><span class="field-value">6. Juni</span></div>
              <div class="field-box"><span class="field-label">Uhrzeit</span><span class="field-value">20:00 Uhr</span></div>
              <div class="field-box full"><span class="field-label">Ticketnummer</span><span class="field-value" id="t2_number_inline">WIRD BEI RESERVIERUNG VERGEBEN</span></div>
            </div>
          </div>

          <div>
            <div class="ticket-bottom">
              <div class="ticket-number-box">
                <div class="ticket-number-label">Ticketnummer</div>
                <div class="ticket-number" id="t2_number">WIRD BEI RESERVIERUNG VERGEBEN</div>
                <div class="free-line">EINTRITT FREI</div>
              </div>
              <div class="qr-wrap"><img id="t2_qr" alt="QR Code" src="" /></div>
            </div>
            <div class="ticket-notes">
              Dieses Ticket sichert einen Sitzplatz an einem Tisch.<br>
              Bitte bringen Sie dieses Ticket digital oder ausgedruckt mit.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    var latestTicketNumber = "";

    function sendHeight() {
      var body = document.body;
      var html = document.documentElement;
      var height = Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
      );
      window.parent.postMessage({ type: "altgrieth-ticket-height", height: height }, "*");
    }

    function showMessage(text, isError) {
      var box = document.getElementById("messageBox");
      box.style.display = "block";
      box.innerHTML = text;
      box.style.borderColor = isError ? "#9f3a38" : "#bdad82";
      box.style.background = isError ? "#fff4f4" : "#fff";
      box.style.color = isError ? "#7a1f1d" : "#160520";
      sendHeight();
    }

    function clearMessage() {
      var box = document.getElementById("messageBox");
      box.style.display = "none";
      box.innerHTML = "";
      sendHeight();
    }

    function setStatus(tables, seats) {
      document.getElementById("availableTables").textContent = tables;
      document.getElementById("availableSeats").textContent = seats;
      sendHeight();
    }

    function qrUrl(text) {
      return "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" + encodeURIComponent(text);
    }

    function buildQrText(data) {
      return [
        "Gasthaus Alt Grieth",
        "Heimatlieder Abend",
        "Ticketnummer: " + data.ticket_number,
        "Name: " + data.first_name + " " + data.last_name,
        "E-Mail: " + data.email,
        "Telefon: " + data.phone,
        "Personen: " + data.persons,
        "Essen: " + data.food,
        "Datum: 6. Juni 20:00 Uhr"
      ].join(" | ");
    }

    function getFormData() {
      return {
        first_name: document.getElementById("first_name").value.replace(/^\s+|\s+$/g, ""),
        last_name: document.getElementById("last_name").value.replace(/^\s+|\s+$/g, ""),
        email: document.getElementById("email").value.replace(/^\s+|\s+$/g, ""),
        phone: document.getElementById("phone").value.replace(/^\s+|\s+$/g, ""),
        persons: document.getElementById("persons").value,
        food: document.getElementById("food").value
      };
    }

    function fillHalf(prefix, data) {
      document.getElementById(prefix + "_first_name").textContent = data.first_name || "—";
      document.getElementById(prefix + "_last_name").textContent = data.last_name || "—";
      document.getElementById(prefix + "_email").textContent = data.email || "—";
      document.getElementById(prefix + "_phone").textContent = data.phone || "—";
      document.getElementById(prefix + "_persons").textContent = data.persons || "1";
      document.getElementById(prefix + "_food").textContent = data.food || "Nein";
      document.getElementById(prefix + "_number").textContent = data.ticket_number || "WIRD BEI RESERVIERUNG VERGEBEN";
      document.getElementById(prefix + "_number_inline").textContent = data.ticket_number || "WIRD BEI RESERVIERUNG VERGEBEN";

      var qrText = buildQrText({
        ticket_number: data.ticket_number || "WIRD BEI RESERVIERUNG VERGEBEN",
        first_name: data.first_name || "—",
        last_name: data.last_name || "—",
        email: data.email || "—",
        phone: data.phone || "—",
        persons: data.persons || "1",
        food: data.food || "Nein"
      });

      document.getElementById(prefix + "_qr").src = qrUrl(qrText);
    }

    function fillTicket(data) {
      fillHalf("t1", data);
      fillHalf("t2", data);
      sendHeight();
    }

    function updatePreview() {
      var form = getFormData();
      fillTicket({
        first_name: form.first_name || "—",
        last_name: form.last_name || "—",
        email: form.email || "—",
        phone: form.phone || "—",
        persons: form.persons || "1",
        food: form.food || "Nein",
        ticket_number: latestTicketNumber || "WIRD BEI RESERVIERUNG VERGEBEN"
      });
    }

    function apiGet(path, onSuccess, onError) {
      fetch(path, { method: "GET" })
        .then(function(res) {
          if (!res.ok) throw new Error("Request failed");
          return res.json();
        })
        .then(onSuccess)
        .catch(onError);
    }

    function loadStatus() {
      apiGet(
        "/api/status",
        function(data) {
          if (data && data.success) {
            setStatus(data.available_tables, data.available_seats);
          } else {
            showMessage("Status konnte nicht geladen werden.", true);
          }
        },
        function() {
          showMessage("Verbindung zum Reservierungssystem fehlgeschlagen.", true);
        }
      );
    }

    function reserve() {
      var form = getFormData();
      var personsNumber = parseInt(form.persons, 10);
      var btn = document.getElementById("reserveBtn");

      if (!form.first_name) return showMessage("Bitte geben Sie Ihren Vornamen ein.", true);
      if (!form.last_name) return showMessage("Bitte geben Sie Ihren Nachnamen ein.", true);
      if (!form.email) return showMessage("Bitte geben Sie Ihre E-Mail ein.", true);
      if (!form.phone) return showMessage("Bitte geben Sie Ihre Telefonnummer ein.", true);
      if (!personsNumber || personsNumber < 1) return showMessage("Bitte geben Sie eine gültige Personenzahl ein.", true);

      clearMessage();
      btn.disabled = true;
      btn.textContent = "Reservierung läuft...";

      var url = "/api/reserve"
        + "?first_name=" + encodeURIComponent(form.first_name)
        + "&last_name=" + encodeURIComponent(form.last_name)
        + "&email=" + encodeURIComponent(form.email)
        + "&phone=" + encodeURIComponent(form.phone)
        + "&persons=" + encodeURIComponent(personsNumber)
        + "&food=" + encodeURIComponent(form.food);

      apiGet(
        url,
        function(result) {
          if (result && result.success) {
            latestTicketNumber = result.ticket_number;
            fillTicket(result);
            setStatus(result.available_tables, result.available_seats);
            showMessage("Reservierung erfolgreich. Ihre Ticketnummer lautet: " + latestTicketNumber, false);
          } else {
            showMessage((result && result.message) ? result.message : "Reservierung nicht möglich.", true);
          }

          btn.disabled = false;
          btn.textContent = "Reservieren";
          loadStatus();
        },
        function() {
          btn.disabled = false;
          btn.textContent = "Reservieren";
          showMessage("Verbindung zum Reservierungssystem fehlgeschlagen.", true);
        }
      );
    }

    function downloadPdf() {
      updatePreview();

      var ticket = document.getElementById("ticketSheet");
      var clone = ticket.cloneNode(true);

      clone.style.width = "730px";
      clone.style.maxWidth = "730px";
      clone.style.margin = "0";
      clone.style.boxShadow = "none";

      var wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.left = "-99999px";
      wrapper.style.top = "0";
      wrapper.style.width = "730px";
      wrapper.style.background = "#ffffff";
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      html2canvas(clone, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true
      }).then(function(canvas) {
        document.body.removeChild(wrapper);

        var imgData = canvas.toDataURL("image/jpeg", 0.98);
        var pdf = new window.jspdf.jsPDF({
          orientation: "p",
          unit: "mm",
          format: "a4"
        });

        var pageWidth = 210;
        var pageHeight = 297;
        var margin = 8;
        var usableWidth = pageWidth - margin * 2;
        var usableHeight = pageHeight - margin * 2;

        var imgWidth = usableWidth;
        var imgHeight = canvas.height * imgWidth / canvas.width;

        if (imgHeight > usableHeight) {
          imgHeight = usableHeight;
          imgWidth = canvas.width * imgHeight / canvas.height;
        }

        var x = (pageWidth - imgWidth) / 2;
        var y = (pageHeight - imgHeight) / 2;

        pdf.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);

        var fileName = "Heimatlieder-Abend-" + (latestTicketNumber || "Ticket") + ".pdf";
        pdf.save(fileName);
      });
    }

    window.addEventListener("load", function() {
      loadStatus();
      updatePreview();

      var ids = ["first_name", "last_name", "email", "phone", "persons", "food"];
      for (var i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).addEventListener("input", updatePreview);
        document.getElementById(ids[i]).addEventListener("change", updatePreview);
      }

      document.getElementById("reserveBtn").addEventListener("click", reserve);
      document.getElementById("pdfBtn").addEventListener("click", downloadPdf);

      sendHeight();
      setTimeout(sendHeight, 300);
      setTimeout(sendHeight, 1000);
    });

    window.addEventListener("resize", sendHeight);
  </script>
</body>
</html>
