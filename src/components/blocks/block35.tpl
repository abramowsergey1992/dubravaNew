<section class="block35">
  <div class="item">
    <div class="swiper main br" data-swiper="gallery">
      <div class="swiper-wrapper">

                <div class="swiper-slide"><a data-fancybox="gallery" href="img/product/1.jpg"><img src="img/product/1.jpg" alt=""></a></div>
        <div class="swiper-slide"><a data-fancybox="gallery" href="img/product/2.jpg"><img src="img/product/2.jpg" alt=""></a></div>
        <div class="swiper-slide"><a data-fancybox="gallery" href="img/product/1.jpg"><img src="img/product/1.jpg" alt=""></a></div>
        <div class="swiper-slide"><a data-fancybox="gallery" href="img/product/2.jpg"><img src="img/product/2.jpg" alt=""></a></div>
        <div class="swiper-slide"><a data-fancybox="gallery" href="img/product/1.jpg"><img src="img/product/1.jpg" alt=""></a></div>
        <div class="swiper-slide"><a data-fancybox="gallery" href="img/product/2.jpg"><img src="img/product/2.jpg" alt=""></a></div>
        <div class="swiper-slide"><a data-fancybox="gallery" href="img/product/1.jpg"><img src="img/product/1.jpg" alt=""></a></div>
        <div class="swiper-slide"><a data-fancybox="gallery" href="img/product/2.jpg"><img src="img/product/2.jpg" alt=""></a></div>
        <div class="swiper-slide"><a data-fancybox="gallery" href="img/product/1.jpg"><img src="img/product/1.jpg" alt=""></a></div>
        <div class="swiper-slide"><a data-fancybox="gallery" href="img/product/2.jpg"><img src="img/product/2.jpg" alt=""></a></div>
      </div>
    </div>
    <div class="swiper thumb" data-swiper="gallery_thumb">
      <div class="swiper-wrapper"> 
        <div class="swiper-slide"><img src="img/product/1.jpg" alt=""></div>
        <div class="swiper-slide"><img src="img/product/2.jpg" alt=""></div>
        <div class="swiper-slide"><img src="img/product/1.jpg" alt=""></div>
        <div class="swiper-slide"><img src="img/product/2.jpg" alt=""></div>
        <div class="swiper-slide"><img src="img/product/1.jpg" alt=""></div>
        <div class="swiper-slide"><img src="img/product/2.jpg" alt=""></div>
        <div class="swiper-slide"><img src="img/product/1.jpg" alt=""></div>
        <div class="swiper-slide"><img src="img/product/2.jpg" alt=""></div>
        <div class="swiper-slide"><img src="img/product/1.jpg" alt=""></div>
        <div class="swiper-slide"><img src="img/product/2.jpg" alt=""></div>
      </div>
    </div>
    <div class="navs">
      <button class="gallery_thumb_prev" type="button">
        <svg><use xlink:href="theme/img/sprite.svg#arrow_gallery"></use></svg>
      </button>
      <button class="gallery_thumb_next" type="button">
        <svg><use xlink:href="theme/img/sprite.svg#arrow_gallery"></use></svg>
      </button>
    </div>
  </div>
  <div class="item">
    <h1>Антиперспирант Активная защита для мужчин</h1>
    <div class="type">Гель для наружного применения </div>
    <div class="article">артикул: 4 605 370 033 076 </div>
    <ul class="params">
      <li>
        <div class="desc">Фармакотерапевтическая группа:</div>
        <div class="value">Нестероидный противовоспалительный препарат</div>
      </li>
      <li>
        <div class="desc">МНН:</div>
        <div class="value">Кетопрофен 2,5%</div>
      </li>
    </ul>
    <div class="packaging">
      <div class="desc">Объем:</div>
      <div class="value">75 мл </div>
    </div>
    <button class="btn greenfill h50 p32 fs16 fw600" type="button">Где купить</button>
    <div class="orders">
      <div class="desc">Продукт можно приобрести</div>
      <ul>
        <li><a href=""><img src="img/product/1.svg" alt=""></a></li>
        <li><a href=""><img src="img/product/2.svg" alt=""></a></li>
        <li><a href=""><img src="img/product/3.svg" alt=""></a></li>
        <li><a href=""><img src="img/product/4.svg" alt=""></a></li>
        <li><a href=""><img src="img/product/5.svg" alt=""></a></li>
        <li><a href=""><img src="img/product/6.svg" alt=""></a></li>
      </ul>
    </div>
  </div>
</section>
<script>
  const btn = document.querySelector('.btn');
  const orders = document.querySelector('.orders');
  btn.addEventListener('click', (evt) => {
    btn.remove();
    orders.classList.toggle('active');
  });
</script>
