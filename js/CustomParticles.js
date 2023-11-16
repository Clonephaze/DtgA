particlesJS('particles-js',
{
 "particles": {
   "number": {
     "value": 120,
     "density": {
       "enable": false,
       "value_area": 1600
     }
   },
   "color": {
     "value": "#84ffe0"
   },
   "shape": {
     "type": "circle",
     "stroke": {
       "width": 0,
       "color": "#000000"
     },
     "polygon": {
       "nb_sides": 5
     },
     "image": {
       "src": "img/github.svg",
       "width": 100,
       "height": 100
     }
   },
   "opacity": {
     "value": 0.5,
     "random": true,
     "anim": {
       "enable": true,
       "speed": 0.3,
       "opacity_min": 0.5,
       "sync": false
     }
   },
   "size": {
     "value": 2.2,
     "random": true,
     "anim": {
       "enable": true,
       "speed": 0.6,
       "size_min": 0.6,
       "sync": false
     }
   },
   "line_linked": {
     "enable": false,
     "distance": 150,
     "color": "#ffffff",
     "opacity": 0.4,
     "width": 1
   },
   "move": {
     "enable": true,
     "speed": 0.8,
     "direction": "out",
     "random": false,
     "straight": false,
     "out_mode": "out",
     "bounce": false,
     "attract": {
       "enable": false,
       "rotateX": 600,
       "rotateY": 1200
     }
   }
 },
 "interactivity": {
   "detect_on": "canvas",
   "events": {
     "onhover": {
       "enable": false,
       "mode": "remove"
     },
     "onclick": {
       "enable": true,
       "mode": "push"
     },
     "resize": true
   },
   "modes": {
     "grab": {
       "distance": 40,
       "line_linked": {
         "opacity": 1
       }
     },
     "bubble": {
       "distance": 400,
       "size": 40,
       "duration": 2,
       "opacity": 8,
       "speed": 3
     },
     "repulse": {
       "distance": 30,
       "duration": 0.4
     },
     "push": {
       "particles_nb": 4
     },
     "remove": {
       "particles_nb": 2
     }
   }
 },
 "retina_detect": true
}
);
