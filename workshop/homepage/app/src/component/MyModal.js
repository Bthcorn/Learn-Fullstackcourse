import React from 'react'

export default function MyModal(props) {
  return (
    <div>
      <div
      class="modal fade"
      id={props.id}
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {props.title}
            </h5>
            <button
              id={props.id + "_bthClose"}
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"

            >
            </button>
          </div>
          <div class="modal-body">{props.children}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
