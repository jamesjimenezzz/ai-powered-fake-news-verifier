import fitz
from PIL import Image
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_from_pdf(file_path: str) -> str:
    text = ""
    with fitz.open(file_path) as pdf:
        for page in pdf:
            text += page.get_text()
    
    return text



def extract_from_image(file_path: str) -> str:
    image = Image.open(file_path)
    return pytesseract.image_to_string(image)



