//====== Xử lý Lưu trữ =======
const FS = require("fs")
var Thu_muc_Du_lieu = '.\\Du_lieu'
var Thu_muc_Nhan_vien = Thu_muc_Du_lieu + "\\Nhan_vien"
var Thu_muc_HTML = Thu_muc_Du_lieu + "\\HTML"

class XL_3L_NV{
    //========XỬ LÝ LƯU TRỮ
    Doc_Khung_HTML() {
        var Duong_dan = Thu_muc_HTML + "\\Khung.html"
        var Chuoi_HTML = FS.readFileSync(Duong_dan, "utf-8")
        return Chuoi_HTML
    }

    Doc_Cong_ty() {
        var Duong_dan = Thu_muc_Du_lieu + "\\Cong_ty\\Cong_ty.json"
        var Chuoi_JSON = FS.readFileSync(Duong_dan, "utf-8")
        var Cong_ty = JSON.parse(Chuoi_JSON)
        return Cong_ty
    }

    Doc_Danh_sach_Nhan_vien() {
        var Danh_sach = []
        var Danh_sach_Ten = FS.readdirSync(Thu_muc_Nhan_vien)
        Danh_sach_Ten.forEach(Ten => {
            var Duong_dan = `${Thu_muc_Nhan_vien}\\${Ten}`
            var Chuoi_JSON = FS.readFileSync(Duong_dan, "utf8")
            var Nhan_vien = JSON.parse(Chuoi_JSON)
            Danh_sach.push(Nhan_vien)
        })
        return Danh_sach
    }

    Ghi_Nhan_vien(Nhan_vien) {
        var Duong_dan = `${Thu_muc_Nhan_vien}\\${Nhan_vien.Ma_so}.json`
        var Chuoi_JSON = JSON.stringify(Nhan_vien)
        FS.writeFileSync(Duong_dan, Chuoi_JSON)
    }

    Ghi_Hinh_Nhan_vien(Nhan_vien, Hinh) {
        var Duong_dan = `.\\Media\\${Nhan_vien.Ma_so}.png`;
        FS.writeFileSync(Duong_dan, Hinh)
    }

    //============XỬ LÝ NGHIỆP VỤ
    Tra_cuu_Nhan_vien(Danh_sach, Chuoi_Tra_cuu) {
        var Danh_sach_Kq = []
        Chuoi_Tra_cuu = Chuoi_Tra_cuu.toUpperCase()
        Danh_sach.forEach(Nhan_vien => {
            var Ho_ten = Nhan_vien.Ho_ten.toUpperCase()
            var Ten_Don_vi = Nhan_vien.Don_vi.Ten.toUpperCase()
            var Ten_Chi_nhanh = Nhan_vien.Don_vi.Chi_nhanh.Ten.toUpperCase()
            var Thoa_Dieu_kien_Tra_cuu = Ho_ten.includes(Chuoi_Tra_cuu) ||
                Ten_Don_vi.includes(Chuoi_Tra_cuu) ||
                Ten_Chi_nhanh.includes(Chuoi_Tra_cuu)
            if (Thoa_Dieu_kien_Tra_cuu)
                Danh_sach_Kq.push(Nhan_vien)
        })
        return Danh_sach_Kq
    }


    //===========XỬ LÝ THỂ HIỆN
    Tao_Chuoi_HTML_Thong_bao(Thong_bao) {
        var Chuoi_HTML = `<div class='alert alert-info alert-dismissible' >
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        ${Thong_bao}
                    </div>`
        return Chuoi_HTML
    }
        //**********  Tạo Chuỗi HTML Danh sách 
    Tao_Chuoi_HTML_Danh_sach_Nhan_vien(Danh_sach) {
    var Cong_ty = this.Doc_Cong_ty()
    var Danh_sach_Ngoai_ngu_Cong_ty = Cong_ty.Danh_sach_Ngoai_ngu
    var Chuoi_HTML_Danh_sach = "<div  >"
    Danh_sach.forEach(Nhan_vien => {
        var Chuoi_Hinh = `<img src='/Media/${Nhan_vien.Ma_so}.png' style='width:120px;height:120px' />   `
        var Chuoi_Ngoai_ngu = ""
        Nhan_vien.Danh_sach_Ngoai_ngu.forEach(Ngoai_ngu => {
            Chuoi_Ngoai_ngu += Ngoai_ngu.Ten + ", "
        })
        Chuoi_Ngoai_ngu = Chuoi_Ngoai_ngu.slice(0, Chuoi_Ngoai_ngu.length - 2)
        var Chuoi_Thong_tin = `<div class='btn' style='text-align:left'> 
                        Họ và tên: ${Nhan_vien.Ho_ten}
                        <br />CMND: ${ Nhan_vien.CMND }
                        <br />Chi nhánh: ${Nhan_vien.Don_vi.Chi_nhanh.Ten }
                        <br />Đơn vị: ${Nhan_vien.Don_vi.Ten } 
                        <br />Số điện thoại: ${Nhan_vien.Dien_thoai }
                        <br />Địa chỉ: ${Nhan_vien.Dia_chi }
                        <br />Khả năng ngoại ngữ: ${Chuoi_Ngoai_ngu}
                        </div>`
        var Chuoi_HTML = `<div class='alert alert-primary' > ${Chuoi_Hinh} ${Chuoi_Thong_tin}
                        </div>`
        var Chuoi_Thuc_don = `<div class='row' style="background-color:white;margin:20px">
                                <form action="/Chon_Cap_nhat_Dien_thoai" method="post" >
                                              <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden' />
                                              <button class="btn btn-primary" type="submit">Cập nhật Điện thoại</button>
                                </form>
                                <form action="/Chon_Cap_nhat_Dia_chi" method="post" >
                                                <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden' />
                                                <button class="btn btn-primary" type="submit">Cập nhật Đia chỉ</button>
                                </form>
                                <form action="/Chon_Cap_nhat_Hinh" method="post" >
                                                <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden' />
                                                <button class="btn btn-primary" type="submit">Cập nhật Hình</button>
                                </form>
                                <form action="/Chon_Bo_sung_Ngoai_ngu" method="post" >
                                                <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden' />
                                                <button class="btn btn-primary" type="submit">Bổ sung Ngoại ngữ</button>
                                </form>
                            </div>`
        if (Danh_sach_Ngoai_ngu_Cong_ty.length == Nhan_vien.Danh_sach_Ngoai_ngu.length) {
            Chuoi_Thuc_don = `<div class='row' style="margin:10px">
                                <form action="/Chon_Cap_nhat_Dien_thoai" method="post" >
                                              <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden' />
                                              <button class="btn btn-primary" type="submit">Cập nhật Điện thoại</button>
                                </form>
                                <form action="/Chon_Cap_nhat_Dia_chi" method="post" >
                                                <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden' />
                                                <button class="btn btn-primary" type="submit">Cập nhật Đia chỉ</button>
                                </form>
                                <form action="/Chon_Cap_nhat_Hinh" method="post" >
                                                <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden' />
                                                <button class="btn btn-primary" type="submit">Cập nhật Hình</button>
                                </form>                                    
                            </div>`
        }
        Chuoi_HTML = Chuoi_Thuc_don + Chuoi_HTML
        Chuoi_HTML_Danh_sach += Chuoi_HTML
    })
    Chuoi_HTML_Danh_sach += "</div>"
    return Chuoi_HTML_Danh_sach
}


    //===========TẠO CHUỖI HTML CHỨC NĂNG
    Tao_Chuoi_HTML_Dang_nhap(Ten_Dang_nhap = '', Mat_khau = '', Thong_bao = '') {
        var Chuoi_HTML = `<form action="/Dang_nhap" method="post" >
                                <div class="alert" style="height:10px">
                                        Đăng nhập
                                </div>
                                <div class="alert" style="height:30px">
                                    <input name="Th_Ten_Dang_nhap" required="required"
                                      value='${Ten_Dang_nhap}'  spellcheck="false" autocomplete="off" />
                                </div>
                                <div class="alert" style="height:30px">
                                    <input name="Th_Mat_khau" type="password" required="required"
                                        value='${Mat_khau}' spellcheck="false" autocomplete="off" />
                                </div>
                                <div class="alert" style="height:30px">
                                   <button class="btn btn-danger" type="submit">Đồng ý</button>
                                </div>
                                <div>${Thong_bao}</div>
                        </form>`
        return Chuoi_HTML
    }

    Tao_Chuoi_HTML_Cap_nhat_Dien_thoai(Nhan_vien) {
        var Chuoi_HTML = `<form action="/Cap_nhat_Dien_thoai" method="post" >
                                <div class="alert" style="height:10px">
                                        Cập nhật Điện thoại
                                </div>
                                <div class="alert" style="height:30px">
                                    <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden' />
                                    <input name="Th_Dien_thoai" required="required"
                                      value='${Nhan_vien.Dien_thoai}'  spellcheck="false" autocomplete="off" />
                                </div>
                                <div class="alert" style="height:30px">
                                   <button class="btn btn-danger" type="submit">Đồng ý</button>
                                </div>
                        </form>`
        return Chuoi_HTML
    }
    
    Tao_Chuoi_HTML_Cap_nhat_Dia_chi(Nhan_vien) {
        var Chuoi_HTML = `<form action="/Cap_nhat_Dia_chi" method="post" >
                                <div class="alert" style="height:10px">
                                        Cập nhật Đia chỉ
                                </div>
                                <div class="alert" style="height:50px">
                                    <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden' />
                                    <textarea name="Th_Dia_chi" required="required" cols="25" rows="2" >${Nhan_vien.Dia_chi}</textarea>
                                </div>
                                <div class="alert" style="height:30px">
                                   <button class="btn btn-danger" type="submit">Đồng ý</button>
                                </div>
                        </form>`
        return Chuoi_HTML
    }

    Tao_Chuoi_HTML_Cap_nhat_Hinh(Nhan_vien) {
        var Chuoi_HTML = `<form action="/Cap_nhat_Hinh" method="post" enctype="multipart/form-data">
                                <div class="alert" style="height:10px">
                                        Cập nhật Hình
                                </div>
                                <div class="alert" style="height:50px">
                                    <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden' />
                                    <input type = "file" name="Th_Hinh" accept ="image/png" required="required" cols="25" rows="2">
                                </div>
                                <div class="alert" style="height:30px">
                                   <button class="btn btn-danger" type="submit">Đồng ý</button>
                                </div>
                        </form>`
        return Chuoi_HTML
    }

    Tao_Chuoi_HTML_Bo_sung_Ngoai_ngu(Nhan_vien){
        var Cong_ty = this.Doc_Cong_ty()
        var Danh_sach_Ngoai_ngu_Cong_ty = Cong_ty.Danh_sach_Ngoai_ngu
        var Danh_sach_Ngoai_ngu_Bo_sung = []
        var Danh_sach_Ngoai_ngu_Nhan_vien = Nhan_vien.Danh_sach_Ngoai_ngu
        Danh_sach_Ngoai_ngu_Cong_ty.forEach(Ngoai_ngu => {
            var Da_Bo_sung = Danh_sach_Ngoai_ngu_Nhan_vien.some(x => x.Ma_so == Ngoai_ngu.Ma_so)
            if (!Da_Bo_sung) {
                Danh_sach_Ngoai_ngu_Bo_sung.push(Ngoai_ngu)
            }
        })

        var Chuoi_HTML = `<form action="/Bo_sung_Ngoai_ngu" method="post" >
                            <div class="alert" style="height:10px">
                                    Bổ sung Ngoại ngữ
                            </div>
                            <div class="alert" style="height:50px">
                                <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden'/>`
        Danh_sach_Ngoai_ngu_Bo_sung.forEach(Ngoai_ngu => {
            Chuoi_HTML = Chuoi_HTML + `<input type="radio" id="Bo_sung_${Ngoai_ngu.Ma_so}" name="Bo_sung_Ngoai_ngu" value="${Ngoai_ngu.Ma_so}">
                                        <label for="Bo_sung_${Ngoai_ngu.Ma_so}"> ${Ngoai_ngu.Ten}</label>&nbsp;&nbsp;&nbsp;&nbsp;`
        })

        Chuoi_HTML = Chuoi_HTML + `</div>
                                    <div class="alert" style="height:30px">
                                        <button class="btn btn-danger" type="submit">Đồng ý</button>
                                    </div>
                                </form>`
        return Chuoi_HTML
    }
}

module.exports = new XL_3L_NV()