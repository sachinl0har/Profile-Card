(function ($) {
    var Preloader = function () {
        $("html").addClass('preload');
        $(window).on('load', function () {
            $("#loader").fadeOut("slow", function () {
                $("#preloader").delay(300).fadeOut("slow");
            });
            $("html").removeClass('preload');
        });
    };
    var Animation = function () {
        var SEPARATION = 50,
            AMOUNTX = 60,
            AMOUNTY = 60;
        var camera, scene, renderer;
        var particles, particle, count = 0;
        var windowHalfX = window.innerWidth / 4;
        var windowHalfY = window.innerHeight / 4;
        var mouseX = -windowHalfX,
            mouseY = -windowHalfY;

        function init() {
            camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 1E5);
            camera.position.z = 1000;

            scene = new THREE.Scene();

            particles = new Array();
            var PI2 = Math.PI * 2;
            var material = new THREE.SpriteCanvasMaterial({
                color: 0xff0000,
                program: function (context) {
                    context.beginPath();
                    context.arc(0, 0, 0.15, 0, PI2, true);
                    context.fill();
                }
            });
            var i = 0;
            for (var ix = 0; ix < AMOUNTX; ix++) {
                for (var iy = 0; iy < AMOUNTY; iy++) {
                    particle = particles[i++] = new THREE.Sprite(material);
                    particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                    particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
                    scene.add(particle);
                }
            }
            renderer = new THREE.CanvasRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            $('#wave').prepend(renderer.domElement);
            $(document).on('mousemove', function (event) {
                mouseX = event.clientX * 1.5 - windowHalfX;
            }).trigger('mousemouve');
            $(window).on('resize', function () {
                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
            render();
        }

        function render() {
            camera.position.x += (mouseX - camera.position.x) * .05;
            camera.position.y += (-mouseY - camera.position.y) * .03;
            camera.position.z = 750;
            camera.lookAt(scene.position);

            var i = 0;
            for (var ix = 0; ix < AMOUNTX; ix++) {
                for (var iy = 0; iy < AMOUNTY; iy++) {
                    particle = particles[i++];
                    particle.position.y = (Math.sin((ix + count) * 0.25) * 50) + (Math.sin((iy + count) * 0.5) * 50);
                    particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.25) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4;
                }
            }
            renderer.render(scene, camera);
            count += 0.05;
            requestAnimationFrame(render);
        }
        return init();
    }
    var SmoothScroll = function () {
        $('.smoothscroll').on('click', function (e) {
            var $target = $(this.hash);
            e.preventDefault();
            e.stopPropagation();
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 800, 'swing');
        });
    };
    var AOSStart = function () {
        AOS.init({
            offset: 100,
            duration: 500,
            easing: 'ease-in-sine',
            delay: 250,
            once: true,
            disable: 'mobile'
        });
    };

    (function () {
        Preloader();
        Animation();
        SmoothScroll();
        AOSStart();
    })();
})(jQuery);
function play() {
            audio.play();
            audio.loop = true;
        }