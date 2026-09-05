from pathlib import Path

import fitz


SOURCE_DIR = Path("attached_assets")
OUTPUT_DIR = Path(".agents/outputs/certificates")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

for pdf_path in sorted(SOURCE_DIR.glob("*.pdf")):
    document = fitz.open(pdf_path)
    for page_number, page in enumerate(document, start=1):
        pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
        output_path = OUTPUT_DIR / f"{pdf_path.stem}-page-{page_number}.png"
        pixmap.save(output_path)
        print(f"{pdf_path.name}: page {page_number} -> {output_path}")