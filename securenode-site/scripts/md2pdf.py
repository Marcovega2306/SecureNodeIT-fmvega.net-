"""Convierte un Markdown a PDF con fpdf2 usando una fuente Unicode (Arial).
Uso: python md2pdf.py entrada.md salida.pdf
"""
import sys
import re
import markdown
from fpdf import FPDF, HTMLMixin

FONT_DIR = "C:/Windows/Fonts"


class PDF(FPDF, HTMLMixin):
    def footer(self):
        self.set_y(-12)
        self.set_font("Arialu", size=8)
        self.set_text_color(150, 150, 150)
        self.cell(
            0, 8,
            f"SecureNode IT  -  Pendientes de revision  -  pag. {self.page_no()}",
            align="C",
        )


def main():
    src, out = sys.argv[1], sys.argv[2]
    with open(src, encoding="utf-8") as f:
        text = f.read()

    # Quita emojis fuera del BMP-latino para evitar tofu; conserva el resto.
    text = text.replace("⚠️", "!").replace("✅", "[OK]")

    html = markdown.markdown(
        text, extensions=["tables", "fenced_code", "sane_lists"]
    )
    html = html.replace("<hr />", "<br>")

    pdf = PDF(format="A4")
    # Familia Unicode principal + variantes.
    pdf.add_font("Arialu", "", f"{FONT_DIR}/arial.ttf")
    pdf.add_font("Arialu", "B", f"{FONT_DIR}/arialbd.ttf")
    pdf.add_font("Arialu", "I", f"{FONT_DIR}/ariali.ttf")
    # Monoespaciada para bloques de codigo (con variantes B/I).
    pdf.add_font("Couru", "", f"{FONT_DIR}/cour.ttf")
    pdf.add_font("Couru", "B", f"{FONT_DIR}/courbd.ttf")
    pdf.add_font("Couru", "I", f"{FONT_DIR}/couri.ttf")

    pdf.set_auto_page_break(auto=True, margin=16)
    pdf.set_margins(16, 16, 16)
    pdf.add_page()
    pdf.set_font("Arialu", size=11)
    pdf.write_html(
        html,
        font_family="Arialu",
        # mapea <code>/<pre> a la mono unicode
        pre_code_font="Couru",
    )
    pdf.output(out)
    print(f"PDF generado: {out}")


if __name__ == "__main__":
    main()
