//====== Khai báo sử dụng thư viện hàm
const EXPRESS = require("express")
const SESSION = require("express-session")
const FILEUPLOAD = require("express-fileupload")
const Xu_ly = require("./XL_3L_QL")

//====== Khai báo và Cấu hình Ứng dụng 
var Ung_dung = EXPRESS()
Ung_dung.use(SESSION({ secret: '123456789' }))
Ung_dung.use(FILEUPLOAD())
Ung_dung.use(EXPRESS.urlencoded({ extended: false }))
Ung_dung.use("/Media", EXPRESS.static("./Media"))
Ung_dung.listen(3001)

//****************** Khi người dùng Khởi động - Đăng nhập

Ung_dung.get("/", (req, res) => {
    //===== Biến nguồn
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
        //=====Xử lý tạo giao diện
    var Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Dang_nhap("QLCN_3", "QLCN_3")
    Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    res.send(Chuoi_HTML)
})

Ung_dung.post("/Dang_nhap", (req, res) => {
    //===== Biến nguồn
    var Danh_sach_Nhan_vien = Xu_ly.Doc_Danh_sach_Nhan_vien()
    var Danh_sach_Quan_ly_Chi_nhanh = Xu_ly.Doc_Danh_sach_Quan_ly_Chi_nhanh()
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
    var Ten_Dang_nhap = req.body.Th_Ten_Dang_nhap
    var Mat_khau = req.body.Th_Mat_khau

    var Chuoi_HTML = ""
    var Hop_le = Danh_sach_Quan_ly_Chi_nhanh.some(x => x.Ten_Dang_nhap == Ten_Dang_nhap && x.Mat_khau == Mat_khau)
    if (Hop_le) {
        // Biến đích
        var Quan_ly = Danh_sach_Quan_ly_Chi_nhanh.find(x => x.Ten_Dang_nhap == Ten_Dang_nhap && x.Mat_khau == Mat_khau)
        req.session.Nguoi_dung = Quan_ly;
        var Danh_sach_Nhan_vien_Xem = Xu_ly.Tra_cuu_Nhan_vien(Danh_sach_Nhan_vien, Quan_ly.Don_vi.Chi_nhanh.Ten)
            //=====Xử lý tạo giao diện
        Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Chuc_nang_Cua_Quan_ly([Quan_ly]) +
            Xu_ly.Tao_Chuoi_HTML_Nhap_lieu_Tieu_chi_Tra_cuu_Nhan_vien("") +
            Xu_ly.Tao_Chuoi_HTML_Danh_sach_Nhan_vien(Danh_sach_Nhan_vien_Xem)
        Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    } else {
        //=====Xử lý tạo giao diện
        Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Dang_nhap("", "", 'Đăng nhập không hợp lệ')
        Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    }

    res.send(Chuoi_HTML)
})

// **********Khi người dùng click chọn chức năng
Ung_dung.post("/Tra_cuu", (req, res) => {
    //===== Biến nguồn
    var Danh_sach_Nhan_vien = Xu_ly.Doc_Danh_sach_Nhan_vien()
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
    var Quan_ly = req.session.Nguoi_dung
    var Danh_sach_Nhan_vien_Dang_Quan_ly = Xu_ly.Tra_cuu_Nhan_vien(Danh_sach_Nhan_vien, Quan_ly.Don_vi.Chi_nhanh.Ten)

    var Chuoi_Tra_cuu = req.body.Th_Chuoi_Tra_cuu
        //===Biến đích
    var Danh_sach_Nhan_vien_Xem = Xu_ly.Tra_cuu_Nhan_vien(Danh_sach_Nhan_vien_Dang_Quan_ly, Chuoi_Tra_cuu)
        //=======Xử lý tạo giao diện
    var Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Nhap_lieu_Tieu_chi_Tra_cuu_Nhan_vien(Chuoi_Tra_cuu) +
        Xu_ly.Tao_Chuoi_HTML_Danh_sach_Nhan_vien(Danh_sach_Nhan_vien_Xem)
    Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    res.send(Chuoi_HTML)
})
//======Chọn cập nhật điện thoại
Ung_dung.post("/Chon_Cap_nhat_Dien_thoai", (req, res) => {
    //===== Biến nguồn
    var Danh_sach_Nhan_vien = Xu_ly.Doc_Danh_sach_Nhan_vien()
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
    var Ma_so_Nhan_vien = req.body.Th_Ma_so_Nhan_vien
        //===Biến đích
    var Nhan_vien = Danh_sach_Nhan_vien.find(x => x.Ma_so == Ma_so_Nhan_vien)
        //=======Xử lý tạo giao diện
    Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Cap_nhat_Dien_thoai(Nhan_vien)
    Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    res.send(Chuoi_HTML)
})

Ung_dung.post("/Cap_nhat_Dien_thoai", (req, res) => {
    //===== Biến nguồn
    var Danh_sach_Nhan_vien = Xu_ly.Doc_Danh_sach_Nhan_vien()
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
    var Ma_so_Nhan_vien = req.body.Th_Ma_so_Nhan_vien
    var Dien_thoai = req.body.Th_Dien_thoai
        //===Biến đích
    var Nhan_vien = Danh_sach_Nhan_vien.find(x => x.Ma_so == Ma_so_Nhan_vien)
    Nhan_vien.Dien_thoai = Dien_thoai
    var Danh_sach_Nhan_vien_Xem = [Nhan_vien]
        //=======Xử lý tạo kết xuất
    Xu_ly.Ghi_Nhan_vien(Nhan_vien)
    Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Danh_sach_Nhan_vien(Danh_sach_Nhan_vien_Xem)
    Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    res.send(Chuoi_HTML)
})

//========Chọn cập nhật địa chỉ
Ung_dung.post("/Chon_Cap_nhat_Dia_chi", (req, res) => {
    //===== Biến nguồn
    var Danh_sach_Nhan_vien = Xu_ly.Doc_Danh_sach_Nhan_vien()
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
    var Ma_so_Nhan_vien = req.body.Th_Ma_so_Nhan_vien
        //===Biến đích
    var Nhan_vien = Danh_sach_Nhan_vien.find(x => x.Ma_so == Ma_so_Nhan_vien)
        //=======Xử lý tạo giao diện
    Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Cap_nhat_Dia_chi(Nhan_vien)
    Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    res.send(Chuoi_HTML)
})

Ung_dung.post("/Cap_nhat_Dia_chi", (req, res) => {
    //===== Biến nguồn
    var Danh_sach_Nhan_vien = Xu_ly.Doc_Danh_sach_Nhan_vien()
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
    var Ma_so_Nhan_vien = req.body.Th_Ma_so_Nhan_vien
    var Dia_chi = req.body.Th_Dia_chi
        //===Biến đích
    var Nhan_vien = Danh_sach_Nhan_vien.find(x => x.Ma_so == Ma_so_Nhan_vien)
    Nhan_vien.Dia_chi = Dia_chi
    var Danh_sach_Nhan_vien_Xem = [Nhan_vien]
        //=======Xử lý tạo kết xuất
    Xu_ly.Ghi_Nhan_vien(Nhan_vien)
    Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Danh_sach_Nhan_vien(Danh_sach_Nhan_vien_Xem)
    Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    res.send(Chuoi_HTML)
})

//=========Chọn cập nhật hình
Ung_dung.post("/Chon_Cap_nhat_Hinh", (req, res) => {
    //===== Biến nguồn
    var Danh_sach_Nhan_vien = Xu_ly.Doc_Danh_sach_Nhan_vien()
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
    var Ma_so_Nhan_vien = req.body.Th_Ma_so_Nhan_vien
        //===Biến đích
    var Nhan_vien = Danh_sach_Nhan_vien.find(x => x.Ma_so == Ma_so_Nhan_vien)
        //=======Xử lý tạo giao diện
    Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Cap_nhat_Hinh(Nhan_vien)
    Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    res.send(Chuoi_HTML)
})

Ung_dung.post("/Cap_nhat_Hinh", (req, res) => {
    //===== Biến nguồn
    var Danh_sach_Nhan_vien = Xu_ly.Doc_Danh_sach_Nhan_vien()
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
    var Ma_so_Nhan_vien = req.body.Th_Ma_so_Nhan_vien
    var Tap_tin_Hinh = req.files.Th_Hinh;
    //===Biến đích
    var Nhan_vien = Danh_sach_Nhan_vien.find(x => x.Ma_so == Ma_so_Nhan_vien)

    var Danh_sach_Nhan_vien_Xem = [Nhan_vien]
        //=======Xử lý tạo kết xuất
    Xu_ly.Ghi_Hinh_Nhan_vien(Nhan_vien, Tap_tin_Hinh.data)
    Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Danh_sach_Nhan_vien(Danh_sach_Nhan_vien_Xem)
    Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    res.send(Chuoi_HTML)
})

//============Chọn chuyển đơn vị
Ung_dung.post("/Chon_Chuyen_Don_vi", (req, res) => {
    //===== Biến nguồn
    var Danh_sach_Nhan_vien = Xu_ly.Doc_Danh_sach_Nhan_vien()
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
    var Ma_so_Nhan_vien = req.body.Th_Ma_so_Nhan_vien;
    var Quan_ly = req.session.Nguoi_dung;
    //===Biến đích
    var Nhan_vien = Danh_sach_Nhan_vien.find(x => x.Ma_so == Ma_so_Nhan_vien)
        //=======Xử lý tạo giao diện
    Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Chuyen_Don_vi(Nhan_vien, Quan_ly)
    Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    res.send(Chuoi_HTML)
})

Ung_dung.post("/Chuyen_Don_vi", (req, res) => {
    //===== Biến nguồn
    var Danh_sach_Nhan_vien = Xu_ly.Doc_Danh_sach_Nhan_vien()
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
    var Ma_so_Nhan_vien = req.body.Th_Ma_so_Nhan_vien
    var Don_vi = req.body.Th_Don_vi
        //===Biến đích
    var Nhan_vien = Danh_sach_Nhan_vien.find(x => x.Ma_so == Ma_so_Nhan_vien)
    Nhan_vien.Don_vi = Xu_ly.Doc_Don_vi(Don_vi);
    var Danh_sach_Nhan_vien_Xem = [Nhan_vien]
        //=======Xử lý tạo kết xuất
    Xu_ly.Ghi_Nhan_vien(Nhan_vien)
    Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Danh_sach_Nhan_vien(Danh_sach_Nhan_vien_Xem)
    Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    res.send(Chuoi_HTML)
})

//============Chọn thống kê theo đơn vị
Ung_dung.post("/Chon_Thong_ke_Don_vi", (req, res) => {
    //===== Biến nguồn
    //var Danh_sach_Nhan_vien = Xu_ly.Doc_Danh_sach_Nhan_vien()
    var Danh_sach_Quan_ly_Chi_nhanh = Xu_ly.Doc_Danh_sach_Quan_ly_Chi_nhanh()
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
    var Ma_so_Nhan_vien = req.body.Th_Ma_so_Nhan_vien
        //===Biến đích
    var Quan_ly = Danh_sach_Quan_ly_Chi_nhanh.find(x => x.Ma_so == Ma_so_Nhan_vien)
        //=======Xử lý tạo giao diện
    var Bao_cao = Xu_ly.Lap_Thong_ke_Don_vi(Quan_ly);
    Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Thong_ke_Don_vi(Bao_cao);
    Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    res.send(Chuoi_HTML)
})
//===========Chọn thống kê theo ngoại ngữ
Ung_dung.post("/Chon_Thong_ke_Ngoai_ngu", (req, res) => {
    //===== Biến nguồn
    //var Danh_sach_Nhan_vien = Xu_ly.Doc_Danh_sach_Nhan_vien()
    var Danh_sach_Quan_ly_Chi_nhanh = Xu_ly.Doc_Danh_sach_Quan_ly_Chi_nhanh()
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
    var Ma_so_Nhan_vien = req.body.Th_Ma_so_Nhan_vien
        //===Biến đích
    var Quan_ly = Danh_sach_Quan_ly_Chi_nhanh.find(x => x.Ma_so == Ma_so_Nhan_vien)
        //=======Xử lý tạo giao diện
    var Bao_cao = Xu_ly.Lap_Thong_ke_Ngoai_ngu(Quan_ly);
    Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Thong_ke_Ngoai_ngu(Bao_cao)
    Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    res.send(Chuoi_HTML)
})