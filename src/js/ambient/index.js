import {
  O2_AMBIENT_CLASSNAME,
  O2_AMBIENT_CONFIG
} from '../utils/const'
import forEach from 'lodash/forEach'

class Particle {
  constructor() {
    this.isInited = false
    this.reset()
    this.init()
  }

  init() {
    this.isInited = true
    this.initDOM()
    this.create()
  }

  create() {
    particlesJS(this.className, {
      'particles': {
        'number': {
          'value': this.particleNumber,
          'density': {
            'enable': true,
            'value_area': 800
          }
        },
        'color': {
          'value': this.color
        },
        'shape': {
          'type': 'circle',
          'stroke': {
            'width': 0,
            'color': '#000000'
          },
          'polygon': {
            'nb_sides': 5
          }
        },
        'opacity': {
          'value': 0.5,
          'random': false,
          'anim': {
            'enable': false,
            'speed': 1,
            'opacity_min': 0.1,
            'sync': false
          }
        },
        'size': {
          'value': this.maxSize,
          'random': true,
          'anim': {
            'enable': false,
            'speed': 40,
            'size_min': 0.1,
            'sync': false
          }
        },
        'line_linked': {
          'enable': true,
          'distance': 150,
          'color': '#ffffff',
          'opacity': 0.4,
          'width': 1
        },
        'move': {
          'enable': true,
          'speed': 6,
          'direction': 'none',
          'random': false,
          'straight': false,
          'out_mode': 'out',
          'bounce': false,
          'attract': {
            'enable': false,
            'rotateX': 600,
            'rotateY': 1200
          }
        }
      },
      'interactivity': {
        'detect_on': 'window',
        'events': {
          'onhover': {
            'enable': true,
            'mode': 'grab'
          },
          'onclick': {
            'enable': false,
            'mode': 'push'
          },
          'resize': true
        },
        'modes': {
          'grab': {
            'distance': 140,
            'line_linked': {
              'opacity': 1
            }
          },
          'bubble': {
            'distance': 400,
            'size': 40,
            'duration': 2,
            'opacity': 8,
            'speed': 3
          },
          'repulse': {
            'distance': 200,
            'duration': 0.4
          },
          'push': {
            'particles_nb': 4
          },
          'remove': {
            'particles_nb': 2
          }
        }
      },
      'retina_detect': true
    })
  }

  initDOM() {
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.left = '0'
    container.style.top = '0'
    container.style.width = `${this.width}px`
    container.style.height = `${this.height}px`
    container.style.zIndex = -1
    container.style.pointerEvents = 'none'
    container.id = this.className
    this.parent.appendChild(container)
    this.container = container
  }

  reset() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.parent = document.querySelector('.o2team_ambient_main')
    this.particleNumber = window[O2_AMBIENT_CONFIG].particleNumber
    this.className = O2_AMBIENT_CLASSNAME
    this.color = window[O2_AMBIENT_CONFIG].color
    this.maxSize = window[O2_AMBIENT_CONFIG].maxSize
    // this.maxRadius = 5
    this.isInited && this.create()
  }

  bindEvents() {
    this.windowResizeHandleSelf = this.windowResizeHandle.bind(this)
    window.addEventListener('resize', this.windowResizeHandleSelf, false)
  }

  unbindEvents() {
    window.removeEventListener('resize', this.windowResizeHandleSelf, false)
  }

  windowResizeHandle(e) {
    const devicePixelRatio = this.devicePixelRatio

    this.width = window.innerWidth * devicePixelRatio
    this.height = window.innerHeight * devicePixelRatio
    this.container.style.width = `${this.width / devicePixelRatio}px`
    this.container.style.height = `${this.height / devicePixelRatio}px`
  }

  destroy() {
    this.unbindEvents()
    forEach(window.pJSDom, pJSDomItem => {
      pJSDomItem.pJS.fn.vendors.destroypJS()
    })
    window.pJSDom = []
  }
}

export default Particle
