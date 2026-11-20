/*
  NỘI DUNG TRANG WEB
  Sửa chữ, thêm bài, thêm ảnh ở file này. Giao diện tự cập nhật theo.
*/
window.SITE = {
  version: "1.0.3",   // số phiên bản, tăng sau mỗi lần sửa (xem CHANGELOG.md)
  name: "Trang web của tôi",
  owner: "Bạn",
  email: "email-cua-ban@example.com",

  // Menu bên phải. Mỗi nhóm có tiêu đề và danh sách trang.
  // icon: home, article, image, info, mail, user, folder, star
  menu: [
    {
      title: "Khám phá",
      items: [
        { id: "", label: "Trang chủ", icon: "home" },
        { id: "bai-viet", label: "Bài viết", icon: "article" },
        { id: "thu-vien", label: "Thư viện", icon: "image" },
        { id: "tai-lieu", label: "Tài liệu", icon: "folder" }
      ]
    },
    {
      title: "Thông tin",
      items: [
        { id: "gioi-thieu", label: "Giới thiệu", icon: "info" },
        { id: "lien-he", label: "Liên hệ", icon: "mail" }
      ]
    },
    {
      title: "Cá nhân",
      items: [
        { id: "tai-khoan", label: "Tài khoản", icon: "user" }
      ]
    }
  ],

  home: {
    title: "Xin chào, đây là trang web của tôi",
    lead: "Nơi mình chia sẻ bài viết, hình ảnh và những gì mình đang làm. Đây là nội dung mẫu, mình sẽ thay bằng nội dung thật của bạn."
  },

  posts: [
    {
      id: "bat-dau",
      title: "Bắt đầu một trang web riêng",
      date: "2026-11-20",
      tag: "Ghi chép",
      excerpt: "Vì sao mình muốn có một chỗ riêng trên mạng, và mình chọn làm nó như thế nào.",
      body: "Đây là bài viết mẫu. Nội dung thật sẽ thay vào chỗ này.\n\nMỗi đoạn văn cách nhau bằng một dòng trống. Bài viết có thể dài hay ngắn tuỳ ý.",
      youtube: ""   // dán link YouTube để nhúng video vào cuối bài
    },
    {
      id: "nhung-dieu-hoc-duoc",
      title: "Ba điều học được trong tháng này",
      date: "2026-11-12",
      tag: "Học tập",
      excerpt: "Một vài ghi chú ngắn về những thứ mình tìm hiểu gần đây.",
      body: "Bài viết mẫu thứ hai.\n\nThay bằng nội dung của bạn."
    },
    {
      id: "goc-lam-viec",
      title: "Góc làm việc của mình",
      date: "2026-11-03",
      tag: "Cuộc sống",
      excerpt: "Bàn, ghế, ánh sáng và vài món đồ giúp mình tập trung hơn.",
      body: "Bài viết mẫu thứ ba.\n\nThay bằng nội dung của bạn."
    }
  ],

  // Ảnh: để src là đường dẫn ảnh, ví dụ "images/anh-1.jpg". Để "" sẽ hiện ô trống mẫu.
  gallery: [
    { src: "", caption: "Ảnh mẫu 1" },
    { src: "", caption: "Ảnh mẫu 2" },
    { src: "", caption: "Ảnh mẫu 3" },
    { src: "", caption: "Ảnh mẫu 4" },
    { src: "", caption: "Ảnh mẫu 5" },
    { src: "", caption: "Ảnh mẫu 6" }
  ],

  // Tài liệu để trên Google Drive (chia sẻ: "Bất kỳ ai có đường liên kết").
  // drive: dán link chia sẻ của file. type: PDF, Word, Excel, Slide, Ảnh gốc, Zip...
  documents: [
    { title: "Tài liệu mẫu 1", type: "PDF", date: "2026-11-20", note: "Mô tả ngắn về tài liệu.", drive: "" },
    { title: "Bảng tính mẫu", type: "Excel", date: "2026-11-18", note: "", drive: "" },
    { title: "Album ảnh gốc", type: "Thư mục", date: "2026-11-15", note: "Ảnh chất lượng đầy đủ.", drive: "" }
  ],

  about: {
    lead: "Vài dòng giới thiệu về bạn: bạn là ai, làm gì, quan tâm điều gì.",
    facts: [
      ["Đang sống ở", "Điền sau"],
      ["Công việc", "Điền sau"],
      ["Sở thích", "Điền sau"]
    ]
  }
};
