class PKGalleryMarquee {
    constructor(options) {
      this.containerSelector = options.containerSelector;
      this.imageItems = options.imageItems || [];
      this.width = options.width || 150;
      this.height = options.height || 100;
      this.speed = options.speed || 20; // 秒
  
      this._init();
    }
  
    _init() {
      const $container = $(this.containerSelector);
      $container.addClass('pk-marquee-container');
  
      const $track = $('<div class="pk-marquee-track"></div>').css({
        'animation-duration': `${this.speed}s`,
        'height': this.height + 20 + 'px'
      });
  
      const fullItems = this.imageItems.concat(this.imageItems);
  
      fullItems.forEach(item => {
        const $item = $('<div class="pk-marquee-item"></div>').css({
          width: this.width + 'px',
          height: this.height + 'px'
        });
  
        const $img = $(`<img src="${item.src}" alt="">`).attr('title', item.title || '');
  
        // Bootstrap 5 tooltip attribute
        $img.attr('data-bs-toggle', 'tooltip');
  
        if (item.link) {
          const $link = $('<a></a>').attr('href', item.link).attr('target', '_blank');
          $link.append($img);
          $item.append($link);
        } else {
          $item.append($img);
        }
  
        $track.append($item);
      });
  
      $container.append($track);
  
      // 滑鼠懸停時暫停
      $container.on('mouseenter', () => {
        $track.css('animation-play-state', 'paused');
      });
      $container.on('mouseleave', () => {
        $track.css('animation-play-state', 'running');
      });
  
      // 初始化 Bootstrap Tooltip
      setTimeout(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach(function (tooltipTriggerEl) {
          new bootstrap.Tooltip(tooltipTriggerEl);
        });
      }, 0);
    }
  }
  