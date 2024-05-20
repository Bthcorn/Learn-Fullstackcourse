import React from "react";

export default function MyModal(props) {
  return (
    // <div class="modal" tabindex="-1" id={props.id}>
    //   <div class="modal-dialog">
    //     <div class="modal-content">
    //       <div class="modal-header">
    //         <h5 class="modal-title">{props.title}</h5>
    //         <button
    //         id='{props.id}_bthClose'
    //           type="button"
    //           class="btn-close"
    //           data-dismiss="modal"
    //           aria-label="Close"
    //         ><i className="fa fa-times"></i></button>
    //       </div>
    //       <div class="modal-body">
    //         <p>{props.children}</p>
    //       </div>
    //       <div class="modal-footer">
    //         <button
    //           type="button"
    //           class="btn btn-secondary"
    //           data-bs-dismiss="modal"
    //         >
    //           Close
    //         </button>
    //         <button type="button" class="btn btn-primary">
    //           Save changes
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">{props.children}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            {/* <button type="button" class="btn btn-primary">
              Save changes
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
