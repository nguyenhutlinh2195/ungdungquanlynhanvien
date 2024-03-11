//====== Khai báo sử dụng thư viện hàm
const EXPRESS = require("express")
const FILEUPLOAD = require("express-fileupload")
const Xu_ly = require("./XL_3L_NV")

var Ung_dung=EXPRESS()
Ung_dung.use(FILEUPLOAD())
Ung_dung.use(EXPRESS.urlencoded({ extended: false }))
Ung_dung.use(EXPRESS.json())
Ung_dung.use("/Media",EXPRESS.static("./Media"))
Ung_dung.listen(3000)

//****************** Khi người dùng Khởi động - Đăng nhập

Ung_dung.get("/", (req, res) => {
    //===== Biến nguồn
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
        //=====Xử lý tạo giao diện
    var Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Dang_nhap("NV_1", "NV_1")
    Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    res.send(Chuoi_HTML)
})

Ung_dung.post("/Dang_nhap", (req, res) => {
    //===== Biến nguồn
    var Danh_sach_Nhan_vien = Xu_ly.Doc_Danh_sach_Nhan_vien()
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
    var Ten_Dang_nhap = req.body.Th_Ten_Dang_nhap
    var Mat_khau = req.body.Th_Mat_khau

    var Chuoi_HTML = ""
    var Hop_le = Danh_sach_Nhan_vien.some(x => x.Ten_Dang_nhap == Ten_Dang_nhap && x.Mat_khau == Mat_khau)
    if (Hop_le) {
        // Biến đích
        var Nhan_vien = Danh_sach_Nhan_vien.find(x => x.Ten_Dang_nhap == Ten_Dang_nhap && x.Mat_khau == Mat_khau)
        var Danh_sach_Nhan_vien_Xem = [Nhan_vien]
            //=====Xử lý tạo giao diện
        Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Danh_sach_Nhan_vien(Danh_sach_Nhan_vien_Xem)
        Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    } else {
        //=====Xử lý tạo giao diện
        Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Dang_nhap("", "", 'Đăng nhập không thành công')
        Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    }

    res.send(Chuoi_HTML)
})

//****************** Khi người dùng Click Chọn Chức năng 
//=============Chọn cập nhật điện thoại
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

//=============Chọn cập nhật địa chỉ
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

//=============Chọn cập nhật hình
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

//=============Chọn bổ sung ngoại ngữ
Ung_dung.post("/Chon_Bo_sung_Ngoai_ngu", (req, res) => {
    //===== Biến nguồn
    var Danh_sach_Nhan_vien = Xu_ly.Doc_Danh_sach_Nhan_vien()
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
    var Ma_so_Nhan_vien = req.body.Th_Ma_so_Nhan_vien
        //===Biến đích
    var Nhan_vien = Danh_sach_Nhan_vien.find(x => x.Ma_so == Ma_so_Nhan_vien)
        //=======Xử lý tạo giao diện
    Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Bo_sung_Ngoai_ngu(Nhan_vien)
    Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    res.send(Chuoi_HTML)
})

Ung_dung.post("/Bo_sung_Ngoai_ngu", (req, res) => {
    //===== Biến nguồn
    var Cong_ty = Xu_ly.Doc_Cong_ty()
    var Danh_sach_Ngoai_ngu_Cong_ty = Cong_ty.Danh_sach_Ngoai_ngu
    var Danh_sach_Nhan_vien = Xu_ly.Doc_Danh_sach_Nhan_vien()
    var Chuoi_HTML_Khung = Xu_ly.Doc_Khung_HTML()
    var Ma_so_Nhan_vien = req.body.Th_Ma_so_Nhan_vien
    var Ma_so_Ngoai_ngu = req.body.Bo_sung_Ngoai_ngu
    var Ngoai_ngu = Danh_sach_Ngoai_ngu_Cong_ty.find(x => x.Ma_so == Ma_so_Ngoai_ngu)
        //===Biến đích
    var Nhan_vien = Danh_sach_Nhan_vien.find(x => x.Ma_so == Ma_so_Nhan_vien)
    Nhan_vien.Danh_sach_Ngoai_ngu.push(Ngoai_ngu)
        //Nhan_vien.Dia_chi=Dia_chi
    var Danh_sach_Nhan_vien_Xem = [Nhan_vien]
        //=======Xử lý tạo kết xuất
    Xu_ly.Ghi_Nhan_vien(Nhan_vien)
    Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Danh_sach_Nhan_vien(Danh_sach_Nhan_vien_Xem)
    Chuoi_HTML = Chuoi_HTML_Khung.replace("Chuoi_HTML", Chuoi_HTML)
    res.send(Chuoi_HTML)
})