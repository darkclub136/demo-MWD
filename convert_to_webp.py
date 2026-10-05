from PIL import Image
from pathlib import Path
import os

# Các định dạng ảnh hỗ trợ
IMAGE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".bmp",
    ".tif", ".tiff", ".gif", ".webp"
}

current_dir = Path(__file__).parent

for image_path in current_dir.iterdir():
    if (
        image_path.is_file()
        and image_path.suffix.lower() in IMAGE_EXTENSIONS
        and image_path.suffix.lower() != ".webp"
    ):
        try:
            webp_path = image_path.with_suffix(".webp")

            with Image.open(image_path) as img:
                if img.mode in ("RGBA", "LA", "P"):
                    img = img.convert("RGBA")
                else:
                    img = img.convert("RGB")

                img.save(webp_path, "WEBP", quality=90, method=6)

            # Xóa file gốc sau khi convert thành công
            os.remove(image_path)

            print(f"✓ {image_path.name} -> {webp_path.name}")

        except Exception as e:
            print(f"✗ Lỗi xử lý {image_path.name}: {e}")

print("\nHoàn tất!")