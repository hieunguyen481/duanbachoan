# Hướng dẫn sử dụng và cập nhật trang web

- **Trang web:** https://duanbachoan.pages.dev
- **Mã nguồn:** https://github.com/hieunguyen481/duanbachoan (nhánh `main`)
- **Nơi chạy:** Cloudflare Pages, dự án `duanbachoan`

## 1. Trang được cập nhật thế nào

1. Có thay đổi mới được đưa lên nhánh `main` trên GitHub.
2. Cloudflare tự nhận và tự đăng lại trang sau khoảng 1 phút. **Không cần bấm deploy bằng tay.**
3. Tải lại trang để thấy bản mới (nếu vẫn thấy bản cũ: Ctrl + F5, trên Mac là Cmd + Shift + R).
4. Số phiên bản đang chạy hiện ở **cuối menu bên trái**, dòng "Phiên bản x.y.z".

## 2. Cách đánh số phiên bản

Dạng `LỚN.VỪA.NHỎ`, ví dụ `1.0.2`. Mỗi lần sửa tăng đúng một bậc:

| Mức thay đổi | Ví dụ | Số mới |
|---|---|---|
| Nhỏ: sửa chữ, đổi màu, thêm bài, sửa lỗi | 1.0.2 → | 1.0.3 |
| Vừa: thêm trang, thêm chức năng mới | 1.0.3 → | 1.1.0 |
| Lớn: đổi bố cục hoặc thiết kế toàn bộ | 1.1.0 → | 2.0.0 |

Tăng bậc vừa thì bậc nhỏ về 0; tăng bậc lớn thì cả hai bậc sau về 0.
Mọi thay đổi đều ghi trong `CHANGELOG.md`.

## 3. Quay về phiên bản cũ

**Cách A, dùng ngay trên Cloudflare (nhanh, tạm thời):**
1. Vào dash.cloudflare.com → Workers & Pages → `duanbachoan` → **Deployments**.
2. Tìm bản có tên bắt đầu bằng số phiên bản muốn quay về (ví dụ `v1.0.1`).
3. Bấm dấu **⋯** ở dòng đó → **Rollback to this deployment**.
4. Trang trở về bản cũ ngay. Lưu ý: lần cập nhật kế tiếp lên GitHub sẽ ghi đè lại.

**Cách B, quay về hẳn (lâu dài):**
Lấy lại mã của phiên bản cũ rồi đưa lên như một **phiên bản mới**. Ví dụ đang ở 1.0.5 muốn về giao diện 1.0.2, thì mã của 1.0.2 được đưa lên thành bản 1.0.6. Cách này giữ đủ lịch sử, không mất gì.

## 4. Sửa nội dung ở đâu

| Muốn sửa | File |
|---|---|
| Tên trang, menu, bài viết, ảnh, tài liệu, video | `js/content.js` |
| Màu, chữ, khoảng cách | `css/style.css` (khối `:root` ở đầu file) |
| Cách hiển thị, tìm kiếm | `js/app.js` |
| Ảnh | thư mục `images/`, nén nhẹ: cạnh dài tối đa 2560px, JPEG chất lượng 88% |

Quy ước lưu trữ: tài liệu và file gốc để trên **Google Drive** (chia sẻ "Bất kỳ ai có đường liên kết"), video để trên **YouTube**, ảnh trên trang chỉ nén nhẹ.

**Lưu ý:** kho GitHub và trang web là **công khai**. Không đưa lên giấy tờ riêng tư.
