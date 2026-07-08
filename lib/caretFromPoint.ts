/** Places the text caret at viewport coordinates (x, y) inside `el`. Used to
 *  restore the double-click's click point as the caret once an element flips
 *  from contentEditable=false to true a render later — by then the browser's
 *  own dblclick caret placement has already run against the old (non-editable)
 *  DOM and is lost. */
export function placeCaretFromPoint(el: HTMLElement, x: number, y: number) {
  const doc = document as Document & {
    caretRangeFromPoint?: (x: number, y: number) => Range | null
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null
  }

  let range: Range | null = null
  if (doc.caretRangeFromPoint) {
    range = doc.caretRangeFromPoint(x, y)
  } else if (doc.caretPositionFromPoint) {
    const pos = doc.caretPositionFromPoint(x, y)
    if (pos) {
      range = document.createRange()
      range.setStart(pos.offsetNode, pos.offset)
    }
  }

  if (range && el.contains(range.startContainer)) {
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
  } else {
    el.focus()
  }
}
