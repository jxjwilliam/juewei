/**
 * Mobile testing helpers: event fire utilities for touch interactions.
 */

export function fireTouchStart(node: HTMLElement, x: number, y: number) {
  const touch = new Touch({ identifier: Date.now(), target: node, clientX: x, clientY: y })
  const event = new TouchEvent('touchstart', { touches: [touch], bubbles: true, cancelable: true })
  node.dispatchEvent(event)
}

export function fireTouchMove(node: HTMLElement, x: number, y: number) {
  const touch = new Touch({ identifier: Date.now(), target: node, clientX: x, clientY: y })
  const event = new TouchEvent('touchmove', { touches: [touch], bubbles: true, cancelable: true })
  node.dispatchEvent(event)
}

export function fireTouchEnd(node: HTMLElement) {
  const event = new TouchEvent('touchend', { bubbles: true, cancelable: true })
  node.dispatchEvent(event)
}

export default { fireTouchStart, fireTouchMove, fireTouchEnd }


