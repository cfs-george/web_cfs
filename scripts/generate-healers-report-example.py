from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "reports" / "healers-seo-report-example.pdf"


def card(pdf, x, y, title, value, change):
    pdf.setStrokeColor(HexColor("#66A7B5"))
    pdf.setFillColor(HexColor("#F4F8F8"))
    pdf.roundRect(x, y, 158, 92, 8, fill=1, stroke=1)
    pdf.setFillColor(HexColor("#172126"))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(x + 12, y + 72, title)
    pdf.setFont("Helvetica-Bold", 22)
    pdf.drawString(x + 12, y + 48, value)
    pdf.setFillColor(HexColor("#478D52") if change.startswith("+") else HexColor("#A56A23"))
    pdf.setFont("Helvetica", 8)
    pdf.drawString(x + 12, y + 27, change)


def chart(pdf, y, title, values, color, note):
    x, width, height = 52, 490, 74
    pdf.setFillColor(HexColor("#182126"))
    pdf.setFont("Helvetica-Bold", 11)
    pdf.drawString(x, y + height + 27, title)
    pdf.setStrokeColor(HexColor("#D1DADD"))
    pdf.line(x, y, x + width, y)
    pdf.line(x, y, x, y + height)
    pdf.setStrokeColor(HexColor(color))
    pdf.setLineWidth(1.2)
    last = None
    for index, value in enumerate(values):
        point = (x + index * width / (len(values) - 1), y + value * height)
        if last:
            pdf.line(last[0], last[1], point[0], point[1])
        last = point
    pdf.setFillColor(HexColor("#667B83"))
    pdf.setFont("Helvetica", 7)
    pdf.drawString(x, y - 13, "22 Oct")
    pdf.drawCentredString(x + width / 2, y - 13, "31 Oct")
    pdf.drawRightString(x + width, y - 13, "19 Nov")
    pdf.setFont("Helvetica", 7)
    pdf.drawString(x, y - 36, note)


def generate():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=A4)
    page_width, page_height = A4
    pdf.setTitle("Example Monthly SEO Performance Report - Healers")
    pdf.setAuthor("Cyberfreak Software")
    pdf.setFillColor(white)
    pdf.rect(0, 0, page_width, page_height, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#5EA3B3"))
    pdf.setFont("Helvetica-Bold", 24)
    pdf.drawString(42, page_height - 84, "Monthly SEO Performance Report")
    pdf.setFillColor(HexColor("#172126"))
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(42, page_height - 132, "Healers")
    pdf.setFillColor(HexColor("#5E7BCE"))
    pdf.setFont("Helvetica", 8)
    pdf.drawString(42, page_height - 149, "healers.co.uk")
    pdf.setFillColor(HexColor("#667B83"))
    pdf.drawRightString(page_width - 42, page_height - 126, "Reporting period: 22 Oct 2026 to 19 Nov 2026")
    card(pdf, 42, page_height - 286, "Organic search clicks", "465", "-48 (-9.4%)")
    card(pdf, 217, page_height - 286, "Organic search impressions", "21,502", "+5,521 (+34.5%)")
    card(pdf, 392, page_height - 286, "Indexed pages", "7,766", "+226 (+3.0%)")
    pdf.setFillColor(HexColor("#667B83"))
    pdf.setFont("Helvetica", 7)
    pdf.drawString(42, page_height - 314, "Change versus previous reporting period.")
    pdf.drawString(42, page_height - 328, "Indexing data commonly lags. Latest available indexed-pages observation: 16 Nov 2026.")
    pdf.setFillColor(HexColor("#5EA3B3"))
    pdf.setFont("Helvetica-Bold", 19)
    pdf.drawString(42, page_height - 380, "Organic engagements and indexed pages")
    chart(pdf, page_height - 512, "Organic search clicks", [0.05, .14, .28, .38, .52, .61, .77, .86, 1], "#5EA3B3", "This represents clicks from Google Search results during the reporting period.")
    chart(pdf, page_height - 690, "Organic search impressions", [0.02, .12, .23, .35, .47, .60, .84, .92, 1], "#4D58F1", "An impression is when your website appears in a Google Search result.")
    pdf.setFillColor(HexColor("#667B83"))
    pdf.setFont("Helvetica", 7)
    pdf.drawRightString(page_width - 42, 28, "Example report - Cyberfreak Software")
    pdf.showPage()
    pdf.setFillColor(white)
    pdf.rect(0, 0, page_width, page_height, fill=1, stroke=0)
    chart(pdf, page_height - 188, "Indexed pages", [0.04, .17, .29, .37, .49, .63, .72, .87, 1], "#5EA3B3", "Indexed pages can appear in search results. Non-indexed URLs may become indexed with time.")
    pdf.setFillColor(HexColor("#5EA3B3"))
    pdf.setFont("Helvetica-Bold", 19)
    pdf.drawString(42, page_height - 305, "Keyword opportunities")
    pdf.setFillColor(HexColor("#596F76"))
    pdf.setFont("Helvetica", 8)
    pdf.drawString(42, page_height - 324, "The search terms below may be useful when planning new pages, articles or improvements to existing content.")
    keywords = [
        ("natural healer", "Position 12.3 - 101 impressions - 0 clicks"),
        ("healers near me", "Position 12.9 - 225 impressions - 1 click"),
        ("crystal healing kent", "Position 11.6 - 53 impressions - 0 clicks"),
        ("holistic therapies glastonbury", "Position 14.2 - 66 impressions - 0 clicks"),
        ("spiritual healers near me", "Position 13.7 - 43 impressions - 1 click"),
    ]
    y = page_height - 366
    for phrase, metrics in keywords:
        pdf.setStrokeColor(HexColor("#D5E0E2"))
        pdf.line(42, y - 11, page_width - 42, y - 11)
        pdf.setFillColor(HexColor("#172126"))
        pdf.setFont("Helvetica-Bold", 9)
        pdf.drawString(42, y, phrase)
        pdf.setFillColor(HexColor("#596F76"))
        pdf.setFont("Helvetica", 8)
        pdf.drawRightString(page_width - 42, y, metrics)
        y -= 34
    pdf.setFillColor(HexColor("#5EA3B3"))
    pdf.setFont("Helvetica-Bold", 19)
    pdf.drawString(42, y - 30, "Looking ahead")
    pdf.setFillColor(HexColor("#596F76"))
    pdf.setFont("Helvetica", 9)
    for index, line in enumerate([
        "Search visibility changes gradually and Google results change regularly.",
        "We will continue monitoring performance, indexing and emerging keyword opportunities,",
        "so you have a clear view of where improvements may be worthwhile.",
    ]):
        pdf.drawString(42, y - 54 - index * 16, line)
    pdf.setFillColor(HexColor("#EAF3F4"))
    pdf.roundRect(42, 80, page_width - 84, 102, 10, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#172126"))
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(62, 150, "Your feedback means a lot")
    pdf.setFont("Helvetica", 9)
    pdf.drawString(62, 130, "We hope you are finding your SEO reports useful. Thank you for choosing Cyberfreak Software.")
    pdf.setFillColor(HexColor("#5EA3B3"))
    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawString(62, 104, "cyberfreaksoftware.co.uk")
    pdf.save()


if __name__ == "__main__":
    generate()
