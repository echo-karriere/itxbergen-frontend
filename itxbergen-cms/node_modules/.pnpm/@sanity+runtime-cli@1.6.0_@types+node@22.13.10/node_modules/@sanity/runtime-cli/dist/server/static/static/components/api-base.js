/* globals HTMLElement */
import apiConstructor from '../api.js'
const api = apiConstructor()

export class ApiBaseElement extends HTMLElement {
  constructor() {
    super()
    this.api = api
  }
}
