//====== Xử lý Lưu trữ =======
const FS = require("fs")
var Thu_muc_Du_lieu = '.\\Du_lieu'
var Thu_muc_Nhan_vien = Thu_muc_Du_lieu + "\\Nhan_vien"
var Thu_muc_Quan_ly_Chi_nhanh = Thu_muc_Du_lieu + "\\Quan_ly_Chi_nhanh"
var Thu_muc_HTML = Thu_muc_Du_lieu + "\\HTML"

class XL_3L_QL {
    //==========Xử lý lưu trữ
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

    Doc_Danh_sach_Quan_ly_Chi_nhanh() {
        var Danh_sach = []

        var Danh_sach_Ten = FS.readdirSync(Thu_muc_Quan_ly_Chi_nhanh)
        Danh_sach_Ten.forEach(Ten => {
            var Duong_dan = `${Thu_muc_Quan_ly_Chi_nhanh}\\${Ten}`
            var Chuoi_JSON = FS.readFileSync(Duong_dan, "utf8")
            var Nhan_vien = JSON.parse(Chuoi_JSON)
            Danh_sach.push(Nhan_vien)
        })
        return Danh_sach
    }

    Doc_Danh_sach_Nhan_vien_Dang_Quan_ly(Quan_ly) {
        var Danh_sach_Nhan_vien_Cong_ty = this.Doc_Danh_sach_Nhan_vien();
        var Danh_sach_Nhan_vien_Dang_Quan_ly = [];
        Danh_sach_Nhan_vien_Cong_ty.forEach(Nhan_vien => {
            if (Nhan_vien.Don_vi.Chi_nhanh.Ma_so == Quan_ly.Don_vi.Chi_nhanh.Ma_so) {
                Danh_sach_Nhan_vien_Dang_Quan_ly.push(Nhan_vien);
            }
        })
        return Danh_sach_Nhan_vien_Dang_Quan_ly;
    }

    Doc_Danh_sach_Don_vi_Dang_Quan_ly(Quan_ly) {
        var Danh_sach_Don_vi_Cong_ty = this.Doc_Cong_ty().Danh_sach_Don_vi;
        var Danh_sach_Don_vi_Dang_Quan_ly = [];
        Danh_sach_Don_vi_Cong_ty.forEach(Don_vi => {
            if (Don_vi.Chi_nhanh.Ma_so == Quan_ly.Don_vi.Chi_nhanh.Ma_so) {
                Danh_sach_Don_vi_Dang_Quan_ly.push(Don_vi);
            }
        })
        return Danh_sach_Don_vi_Dang_Quan_ly;
    }

    Doc_Don_vi(Ma_so) {
        var Don_vi = [];
        var Cong_ty = this.Doc_Cong_ty();
        Cong_ty.Danh_sach_Don_vi.forEach(Dv => {
            if (Dv.Ma_so == Ma_so) {
                Don_vi = Dv;
            }
        })
        return Don_vi;
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

    //===========Xử lý nghiệp vụ
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

    //============Xử lý thể hiện
    Tao_Chuoi_HTML_Thong_bao(Thong_bao) {
        var Chuoi_HTML = `<div class='alert alert-info alert-dismissible' >
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            ${Thong_bao}
                        </div>`
        return Chuoi_HTML
    }

    //*********Tạo chuỗi HTML danh sách */
    Tao_Chuoi_HTML_Danh_sach_Nhan_vien(Danh_sach) {
        var Cong_ty = this.Doc_Cong_ty()
        var Danh_sach_Ngoai_ngu_Cong_ty = Cong_ty.Danh_sach_Ngoai_ngu
        var Chuoi_HTML_Danh_sach = "<div  >"
        Danh_sach.forEach(Nhan_vien => {
            var Chuoi_Hinh = `<img src='/Media/${Nhan_vien.Ma_so}.png' style='width:60px;height:60px' />   `
            var Chuoi_Ngoai_ngu = ""
            Nhan_vien.Danh_sach_Ngoai_ngu.forEach(Ngoai_ngu => {
                Chuoi_Ngoai_ngu += Ngoai_ngu.Ten + ", "
            })
            Chuoi_Ngoai_ngu = Chuoi_Ngoai_ngu.slice(0, Chuoi_Ngoai_ngu.length - 2)
            var Chuoi_Thong_tin = `<div class='btn' style='text-align:left'> 
                            Họ tên: ${Nhan_vien.Ho_ten}
                            <br />CMND: ${ Nhan_vien.CMND }
                            <br />Chi nhánh: ${Nhan_vien.Don_vi.Chi_nhanh.Ten }
                            <br />Đơn vị: ${Nhan_vien.Don_vi.Ten } 
                            <br />Số điện thoại: ${Nhan_vien.Dien_thoai }
                            <br />Địa chỉ: ${Nhan_vien.Dia_chi }
                            <br />Khả năng ngoại ngữ: ${Chuoi_Ngoai_ngu}
                            </div>`
            var Chuoi_HTML = `<div class='alert alert-primary' > ${Chuoi_Hinh} ${Chuoi_Thong_tin}
                            </div>`
            var Chuoi_Thuc_don = `<div class='row' style="margin:10px">
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
                                    <form action="/Chon_Chuyen_Don_vi" method="post" >
                                                    <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden' />
                                                    <button class="btn btn-primary" type="submit">Chuyển đơn vị</button>
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
                                    <form action="/Chon_Chuyen_Don_vi" method="post" >
                                                    <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden' />
                                                    <button class="btn btn-primary" type="submit">Chuyển đơn vị</button>
                                    </form>                                   
                                </div>`
            }
            Chuoi_HTML = Chuoi_Thuc_don + Chuoi_HTML
            Chuoi_HTML_Danh_sach += Chuoi_HTML
        })
        Chuoi_HTML_Danh_sach += "</div>"
        return Chuoi_HTML_Danh_sach
    }

    Tao_Chuoi_HTML_Chuc_nang_Cua_Quan_ly(Danh_sach) {
        var Chuoi_HTML_Danh_sach = "<div  >"
        Danh_sach.forEach(Nhan_vien => {
            var Chuoi_HTML = "";
            var Chuoi_Thuc_don = `<div class='row' style="margin:10px">                                    
                                <form action="/Chon_Thong_ke_Don_vi" method="post" >
                                                <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden' />
                                                <button class="btn btn-primary" type="submit">Thống kê theo Đơn vị</button>
                                </form>
                                <form action="/Chon_Thong_ke_Ngoai_ngu" method="post" >
                                                <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden' />
                                                <button class="btn btn-primary" type="submit">Thống kê theo ngoại ngữ</button>
                                </form>
                            </div>`
            Chuoi_HTML = Chuoi_Thuc_don + Chuoi_HTML
            Chuoi_HTML_Danh_sach += Chuoi_HTML
        })
        Chuoi_HTML_Danh_sach += "</div>"
        return Chuoi_HTML_Danh_sach
    }

    //*********Tạo chuỗi HTML chức năng */
    Tao_Chuoi_HTML_Nhap_lieu_Tieu_chi_Tra_cuu_Nhan_vien(Chuoi_Tra_cuu) {
        var Chuoi_HTML = ` <div style="background-color:gray;margin:10px" >
                           <div class="btn ">
                               <form action='/Tra_cuu' method='post' >
                                    Tiêu chí tra cứu:
                                    <input name='Th_Chuoi_Tra_cuu' value='${Chuoi_Tra_cuu}' 
                                         autocomplete='off' />
                              </form>
                          </div>
                        </div>`
        return Chuoi_HTML
    }

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

    Tao_Chuoi_HTML_Chuyen_Don_vi(Nhan_vien, Quan_ly) {
        var Cong_ty = this.Doc_Cong_ty();
        var Danh_sach_Don_vi_Dang_Quan_ly = this.Doc_Danh_sach_Don_vi_Dang_Quan_ly(Quan_ly);
        var Chuoi_HTML = `<form action="/Chuyen_Don_vi" method="post" >
                            <div class="alert"">
                                <h2>Chuyển đơn vị</h2>
                            </div>
                            <div class="alert" style="height:50px">
                                <input name="Th_Ma_so_Nhan_vien" value="${Nhan_vien.Ma_so}"  type='hidden'/>
                                Nhân viên này đang ở đơn vị: ${Nhan_vien.Don_vi.Ten} </br>
                                Chuyển nhân viên này đến đơn vị: <select name="Th_Don_vi">`
        Danh_sach_Don_vi_Dang_Quan_ly.forEach(Don_vi => {
            if (Nhan_vien.Don_vi.Ma_so == Don_vi.Ma_so) {
                Chuoi_HTML = Chuoi_HTML + `<option value="${Don_vi.Ma_so}" selected>${Don_vi.Ten}</option>`
            } else {
                Chuoi_HTML = Chuoi_HTML + `<option value="${Don_vi.Ma_so}">${Don_vi.Ten}</option>`
            }

        })

        Chuoi_HTML = Chuoi_HTML + `</select>
                                    </div>
                                    <div class="alert" style="height:30px">
                                        <button class="btn btn-danger" type="submit">Đồng ý</button>
                                    </div>
                                </form>`
        return Chuoi_HTML
    }

    Lap_Thong_ke_Don_vi(Quan_ly) {
        var Danh_sach_Nhan_vien_Dang_Quan_ly = this.Doc_Danh_sach_Nhan_vien_Dang_Quan_ly(Quan_ly);
        var Danh_sach_Don_vi = this.Doc_Danh_sach_Don_vi_Dang_Quan_ly(Quan_ly);
        var Bao_cao = {};
        Bao_cao.Tieu_de = "Thống kê số nhân viên theo đơn vị";
        Bao_cao.Danh_sach_Chi_tiet = [];
        Danh_sach_Don_vi.forEach(Don_vi => {
            var Chi_tiet = {}
            Chi_tiet.Ten_Don_vi = Don_vi.Ten;
            var So_Nhan_vien = 0;
            Danh_sach_Nhan_vien_Dang_Quan_ly.forEach(Nhan_vien => {
                if (Nhan_vien.Don_vi.Ma_so == Don_vi.Ma_so) {
                    So_Nhan_vien++;
                }
            })
            Chi_tiet.So_Nhan_vien = So_Nhan_vien;
            var Ty_le = (Chi_tiet.So_Nhan_vien * 100.0) / Danh_sach_Nhan_vien_Dang_Quan_ly.length;
            Chi_tiet.Ty_le = Ty_le.toFixed(2);
            Bao_cao.Danh_sach_Chi_tiet.push(Chi_tiet);
        })
        return Bao_cao;
    }

    Tao_Chuoi_HTML_Thong_ke_Don_vi(Bao_cao) {
        var Chuoi_HTML = `<div class="alert">
                            <h2>${Bao_cao.Tieu_de}</h2>
                        </div>
                        <div class='row'>
                            <div class="col-md-2 btn btn-info">
                                Đơn vị
                            </div>
                            <div class="col-md-2 btn btn-info">
                                Số nhân viên
                            </div>
                            <div class="col-md-2 btn btn-info">
                                Tỷ lệ %
                            </div>
                        </div>`;
        Bao_cao.Danh_sach_Chi_tiet.forEach(Chi_tiet => {
            Chuoi_HTML += `<div class='row'>
                                <div class="col-md-2">
                                    ${Chi_tiet.Ten_Don_vi}
                                </div>
                                <div class="col-md-2">
                                    ${Chi_tiet.So_Nhan_vien}
                                </div>
                                <div class="col-md-2">
                                    ${Chi_tiet.Ty_le}
                                </div>
                            </div>`
        })
        return Chuoi_HTML
    }

    Lap_Thong_ke_Ngoai_ngu(Quan_ly) {
        var Danh_sach_Nhan_vien_Dang_Quan_ly = this.Doc_Danh_sach_Nhan_vien_Dang_Quan_ly(Quan_ly);
        var Danh_sach_Ngoai_ngu = this.Doc_Cong_ty().Danh_sach_Ngoai_ngu;
        var Bao_cao = {};
        Bao_cao.Tieu_de = "Thống kê số nhân viên theo Ngoại ngữ";
        Bao_cao.Danh_sach_Chi_tiet = [];
        Danh_sach_Ngoai_ngu.forEach(Ngoai_ngu => {
            var Chi_tiet = {}
            Chi_tiet.Ten_Ngoai_ngu = Ngoai_ngu.Ten;
            var So_Nhan_vien = 0;
            Danh_sach_Nhan_vien_Dang_Quan_ly.forEach(Nhan_vien => {
                if (Nhan_vien.Danh_sach_Ngoai_ngu.map(x => x.Ma_so).join("_").includes(Ngoai_ngu.Ma_so)) {
                    So_Nhan_vien++;
                }
            })
            Chi_tiet.So_Nhan_vien = So_Nhan_vien;
            var Ty_le = (Chi_tiet.So_Nhan_vien * 100.0) / Danh_sach_Nhan_vien_Dang_Quan_ly.length;
            Chi_tiet.Ty_le = Ty_le.toFixed(2);
            Bao_cao.Danh_sach_Chi_tiet.push(Chi_tiet);
        })
        return Bao_cao;
    }

    Tao_Chuoi_HTML_Thong_ke_Ngoai_ngu(Bao_cao) {
        var Chuoi_HTML = `<div class="alert">
                                <h2>${Bao_cao.Tieu_de}</h2>
                            </div>
                            <div class='row'>
                                <div class="col-md-2 btn btn-info">
                                    Ngoại ngữ
                                </div>
                                <div class="col-md-2 btn btn-info">
                                    Số nhân viên
                                </div>
                                <div class="col-md-2 btn btn-info">
                                    Tỷ lệ %
                                </div>
                            </div>`;

        Bao_cao.Danh_sach_Chi_tiet.forEach(Chi_tiet => {
            Chuoi_HTML += `<div class='row'>
                                <div class="col-md-2">
                                    ${Chi_tiet.Ten_Ngoai_ngu}
                                </div>
                                <div class="col-md-2">
                                    ${Chi_tiet.So_Nhan_vien}
                                </div>
                                <div class="col-md-2">
                                    ${Chi_tiet.Ty_le}
                                </div>
                            </div>`
        })
        return Chuoi_HTML
    }
}

module.exports = new XL_3L_QL()