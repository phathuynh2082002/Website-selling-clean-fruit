


const Carousel = () => {
    return (
        <div id="carouselExampleRide" class="carousel slide mb-5" data-bs-ride="true">
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img src="https://haitratancuong.com/vnt_upload/news/02_2023/tieu-chuan-vietgap.jpg" class="d-block w-100 h-100" alt="..."/>
            </div>
            <div class="carousel-item">
            <img src="https://vinacontrolce.vn/wp-content/uploads/2023/07/chung-nhan-vietgap-trong-trot-3.jpg" class="d-block w-100 h-100" alt="..."/>
            </div>
            <div class="carousel-item">
            <img src="https://sohanews.sohacdn.com/thumb_w/1000/160588918557773824/2023/2/16/photo-12-1676557701922383431389.jpg" class="d-block w-100 h-100" alt="..."/>
            </div>
            <div class="carousel-item">
            <img src="https://sutech.vn/wp-content/uploads/2021/07/tieu-chuan-globalgap-1.jpg" class="d-block w-100 h-100" alt="..."/>
            </div>
            <div class="carousel-item">
            <img src="https://quantri.thhg.vn/wp-content/uploads/2023/02/THAO-LOGO-1-scaled.jpg" class="d-block w-100 h-100" alt="..."/>
            </div>
            <div class="carousel-item">
            <img src="https://media.thuonghieucongluan.vn/uploads/2022/07/09/xoai-cat-chu-dong-thap-qua-ngon-12-1657323450.jpg" class="d-block w-100 h-100" alt="..."/>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>
    );
}

export default Carousel;