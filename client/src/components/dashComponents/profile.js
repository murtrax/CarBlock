import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

export default class Collapse extends Component {
  render() {
    let title = null;
    if (this.props.user) {
      title = this.props.user;
    } else {
      title = "No User";
    }
    return (
      <div style={{ width: "20rem" }}>
        <div class="row ml-3">
          <div class="col s12 m6">
            <div class="card pl-3 pr-3 pt-2">
              <div class="card-image">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqtN71apw7WJuBbpFYcNPYmBSHiu9KrNZJ0y7q0BRgvlztLrwW" />
                <a class="btn-floating halfway-fab waves-effect waves-light blue">
                  <i class="material-icons">add</i>
                </a>
              </div>
              <div class="card-content text-center">
                <span class="card-title">{title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
