console.log('Hello CFD');
// xử lý form footer
var $input;
function onInputFocus(event) {
  var $target = $(event.target);
  var $parent = $target.parent();
  $parent.addClass("input--filled");
}

function onInputBlur(event) {
  var $target = $(event.target);
  var $parent = $target.parent();

  if (event.target.value.trim() === "") {
    $parent.removeClass("input--filled");
  }
}

$(document).ready(function () {
    // form footer vaf form  rẻtal page
  $input = $(".input__field");

  // in case there is any value already
  $input.each(function () {
      if ($input.val().trim() !== "") {
          var $parent = $input.parent();
          $parent.addClass("input--filled");
        }
    });
    
    $input.on("focus", onInputFocus);
    $input.on("blur", onInputBlur);

});

// xử lý bật tắt nút menu 
const menu = document.querySelector('.menu-mobile')
const menuBtn = document.querySelector('.menuBtn')
let menuOpen = false
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('active')
        menuOpen = true
    } else {
        menuBtn.classList.remove('active')
        menuOpen = false
    }
})

menuBtn.addEventListener('click', function () {
    if (menu.classList.contains('active')) {
        menu.classList.remove('active')
    } else {
        menu.classList.add('active')
    }
    // menu.classList.toggle('active')
})

// xử lý laoding 
$(window).on('load', function () {
    $('.loader-wrapper').fadeOut('slow')
})


// xử lý khi scroll header-menu đổi màu 
let $menu = document.querySelector('.header__menu')
let header = document.querySelector('header')
window.addEventListener('scroll', function () {
    let scrollTop = document.querySelector('html').scrollTop
    if (scrollTop > $menu.offsetHeight) {
        $menu.classList.add('scroll')
    } else {
        $menu.classList.remove('scroll')
    }
})

// scroll xuống menu ẩn, scroll lên menu hiện
let prevScroll = $('html').scrollTop()
$(document).scroll(function () {
    if (prevScroll < window.pageYOffset) {
        $('header').css({
            top: -$('.header__top').height(),
            transition: 'all 0.4s ease-in-out'
        })
    } else {
        $('header').css({
            top: 0,
            transition: 'all 0.4s ease-in-out'
        })
    }
    prevScroll = window.pageYOffset
})

// xử lý click nút control trong rental
let controlBtns = document.querySelectorAll('.rental__right .rental__right-booking .rental__right-content .rental__control-item')
controlBtns.forEach(controlBtn => {
    controlBtn.addEventListener('click', function () {
        if (controlBtn.classList.contains('active')) {
            controlBtn.classList.remove('active')
        } else {    
            this.classList.add('active')
        }
    })
})
// xử lý nut backtotop
document.querySelector('.footer__bottom-logo').addEventListener('click', function (e) {
    e.preventDefault()
    window.scrollBy({
        top: -document.body.offsetHeight,
        behavior: 'smooth'
    })
})

// thư viện photoswipe
var initPhotoSwipeFromDOM = function(gallerySelector) {
  var parseThumbnailElements = function(el) {
      var thumbElements = el.childNodes,
          numNodes = thumbElements.length,
          items = [],
          figureEl,
          linkEl,
          size,
          item;
      for(var i = 0; i < numNodes; i++) {
          figureEl = thumbElements[i]; // <figure> element
          if(figureEl.nodeType !== 1) {
              continue;
          }
          linkEl = figureEl.children[0]; // <a> element
          size = linkEl.getAttribute('data-size').split('x');
          item = {
              src: linkEl.getAttribute('href'),
              w: parseInt(size[0], 10),
              h: parseInt(size[1], 10)
          };
          if(figureEl.children.length > 1) {
              item.title = figureEl.children[1].innerHTML; 
          }
          if(linkEl.children.length > 0) {
              // <img> thumbnail element, retrieving thumbnail url
              item.msrc = linkEl.children[0].getAttribute('src');
          } 
          item.el = figureEl; // save link to element for getThumbBoundsFn
          items.push(item);
      }
      return items;
  };
  var closest = function closest(el, fn) {
      return el && ( fn(el) ? el : closest(el.parentNode, fn) );
  };
  var onThumbnailsClick = function(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      var eTarget = e.target || e.srcElement;
      var clickedListItem = closest(eTarget, function(el) {
          return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
      });
      if(!clickedListItem) {
          return;
      }
      var clickedGallery = clickedListItem.parentNode,
          childNodes = clickedListItem.parentNode.childNodes,
          numChildNodes = childNodes.length,
          nodeIndex = 0,
          index;
      for (var i = 0; i < numChildNodes; i++) {
          if(childNodes[i].nodeType !== 1) { 
              continue; 
          }
          if(childNodes[i] === clickedListItem) {
              index = nodeIndex;
              break;
          }
          nodeIndex++;
      }
      if(index >= 0) {
          openPhotoSwipe( index, clickedGallery );
      }
      return false;
  };
  var photoswipeParseHash = function() {
      var hash = window.location.hash.substring(1),
      params = {};
      if(hash.length < 5) {
          return params;
      }
      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
          if(!vars[i]) {
              continue;
          }
          var pair = vars[i].split('=');  
          if(pair.length < 2) {
              continue;
          }           
          params[pair[0]] = pair[1];
      }
      if(params.gid) {
          params.gid = parseInt(params.gid, 10);
      }
      return params;
  };
  var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
      var pswpElement = document.querySelectorAll('.pswp')[0],
          gallery,
          options,
          items;
      items = parseThumbnailElements(galleryElement);
      options = {
          galleryUID: galleryElement.getAttribute('data-pswp-uid'),
          getThumbBoundsFn: function(index) {
              var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                  pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                  rect = thumbnail.getBoundingClientRect(); 

              return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
          },
          showAnimationDuration : 0,
          hideAnimationDuration : 0
      };
      if(fromURL) {
          if(options.galleryPIDs) {
              for(var j = 0; j < items.length; j++) {
                  if(items[j].pid == index) {
                      options.index = j;
                      break;
                  }
              }
          } else {
              options.index = parseInt(index, 10) - 1;
          }
      } else {
          options.index = parseInt(index, 10);
      }
      if( isNaN(options.index) ) {
          return;
      }
      if(disableAnimation) {
          options.showAnimationDuration = 0;
      }
      gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
  };
  var galleryElements = document.querySelectorAll( gallerySelector );
  for(var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i+1);
      galleryElements[i].onclick = onThumbnailsClick;
  }
  var hashData = photoswipeParseHash();
  if(hashData.pid && hashData.gid) {
      openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
  }
};

$( window ).on("load", function() {
  // Handler for .load() called.
  initPhotoSwipeFromDOM('.carousel-img');
});


// thư viện flickity

// details page
let $carousel = $('.slider__items');
$carousel.flickity({
    //options
    cellAlign:'left',
    contain: true,
    wrapAround: true,
    prevNextButtons: true,
    pageDots : false,
    fullscreen: true,
})
$('.slider__wrap-full').on('click', function() {
    $carousel.flickity('viewFullscreen');
})
// $carousel.on( 'fullscreenChange.flickity', function( event, isFullscreen ) {...} );
$('.details-prev').on('click' , function() {
    $carousel.flickity('previous');
    
})
$('.details-next').on('click' , function() {
    $carousel.flickity('next')
})  

// project page
let $project =$('.project__items')

$project.flickity({
    cellAlign:'left',
    contain: true,
    wrapAround: true,
    prevNextButtons: true,
    pageDots : false,
    fullscreen: true,
})
$('.project__full').on('click', function() {
    $project.flickity('viewFullscreen');
})
// cafe page 

let $cafe =$('.gallery__slider')

$cafe.flickity({
    cellAlign:'left',
    contain: true,
    wrapAround: true,
    prevNextButtons: true,
    pageDots : false,
    fullscreen: true
})

$('.cafe__buttonfull').on('click', function() {
    $cafe.flickity('viewFullscreen');
})

$('.cafe-prev').on('click' , function() {
    $cafe.flickity('previous');
    
})
$('.cafe-next').on('click' , function() {
    $cafe.flickity('next')
})  


// validate form footer 

// Đối tượng
function Validator(options) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    let selectorRules = {}
    // hàm xử lý 
    function validate(inputElement,rule) {
        const errorElement = getParent(inputElement, options.formGroundSelector).querySelector(options.errorSelector)
        let errorMessage;

        // lấy ra các rule của selector
        const rules = selectorRules[rule.selector];

        // lặp qua từng rule ( check )
        for(let i = 0; i < rules.length ; i++ ) {
            switch (inputElement.type) {
                case 'radio':
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'))
                    break
                case 'checkbox':
                    if (!input.matches(':checked')) {
                        values[input.name] = ''
                        return values
                    }

                    if (!Array.isArray(values[input.name])) {
                        values[input.name] = []
                    }

                    values[input.name].push(input.value)

                    break
                case 'file':
                    values[input.name] = input.files
                default:
                    errorMessage = rules[i](inputElement.value)
            }
            // nếu có lỗi thì dừng lặp 
            if(errorMessage) break;
        }
        
        if(errorMessage) {
            errorElement.innerText = errorMessage
            getParent(inputElement, options.formGroundSelector).classList.add('invalid')
        } else {
            errorElement.innerText = ''
            getParent(inputElement, options.formGroundSelector).classList.remove('invalid')

        }
        return !!errorMessage
    }
    let formElement = document.querySelector(options.form);
    if(formElement) {
        //khi submit form
        formElement.onsubmit = function(e) {
            e.preventDefault()

            let isFormValid = true
            // lặp qua từng rule  và validate
            options.rules.forEach(function(rule) {
                const inputElement = formElement.querySelector(rule.selector);
                const isValid = validate(inputElement, rule);
                if(isValid) {
                    isFormValid = false;
                }
            })
            if(isFormValid) {
                // trường hợp với js
                if(typeof options.onSubmit === 'function') {
                    const enableInputs = formElement.querySelectorAll('[name]')
                    const formValues = Array.from(enableInputs).reduce(function(values,input) {
                        switch (input.type) {
                            case 'radio':
                            case 'checkbox':
                                if (input.matches(':checked')) {
                                    values[input.name] = formElement.querySelector(
                                        'input[name="' + input.name + '"]:checked'
                                    ).value
                                } else {
                                    values[input.name] = ''
                                }
                                break
                            default:
                                values[input.name] = input.value
                        }
                        return values;
                    }, {});
                    options.onSubmit(formValues)
                } else {
                    // trường hợp submit với hành vi mặc định
                    formElement.onsubmit()
                }
            }

        }
        // lặp qua mỗi rule và xử lý 
        options.rules.forEach( function(rule) {
            
            // lưu lại  các rule cho mỗi input
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test];
            }    
            
            var inputElements = formElement.querySelectorAll(rule.selector)
            Array.from(inputElements).forEach(function(inputElement) {
                // xử lý trường hợp blur ra khỏi input
                inputElement.onblur = function() {
                    validate(inputElement,rule)
                }
                // xử lý khi nhập vào input
                inputElement.oninput = function() {
                    const errorElement = getParent(inputElement, options.formGroundSelector).querySelector(options.errorSelector)
                    errorElement.innerText = ''
                    getParent(inputElement, options.formGroundSelector).classList.remove('invalid')    
                }
            })
       })
    }
}



// Định nghĩa các rules
Validator.isRequired = function(selector, message) {
    return {
        selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function(selector, message) {
    return {
        selector,
        test: function (value) {
            const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            return regex.test(value) ? undefined : message || 'Vui lòng nhập đúng email'
        }
    }
}

Validator.isPhone = function (selector , min , message) {
    return {
        selector,
        test : function (value) {
           
            return value.length == min ? undefined :  message || 'Vui lòng nhập đúng SĐT'     
        }
    }
}

