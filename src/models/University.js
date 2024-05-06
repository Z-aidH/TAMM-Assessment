export default class University {
  constructor({
    id,
    name,
    country,
    web_pages,
    domains,
    alpha_two_code,
    state_province,
  }) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.web_pages = web_pages;
    this.domains = domains;
    this.alpha_two_code = alpha_two_code;
    this.state_province = state_province;
  }
}
