import React, { Component } from "react";
import Isloading from "./Isloading";
import "./lcn.css";

export default class LifeClNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      isLoading: true,
      error: null,
      searchTerm: "",
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.fetchData("Popular");
  }

  fetchData(searchTerm) {
    fetch(
      `https://gnews.io/api/v4/search?q=${searchTerm}&lang=en&country=us&max=10&apikey=de6c315e52d7534595e6734df65e360c`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  handleSearch(event) {
    event.preventDefault();
    const searchTerm = this.state.searchTerm;
    this.fetchData(searchTerm);
  }

  render() {
    const { isLoading, articles, error, searchTerm } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <Isloading />;
    }
    return (
      <div className="content__container">
        <div>
          <form class="input-container" onSubmit={this.handleSearch}>
            <input
              type="text"
              name="text"
              class="input"
              placeholder="search..."
              value={searchTerm}
              onChange={(event) =>
                this.setState({ searchTerm: event.target.value })
              }
            />
            <button class="icon" type="submit">
              <svg
                width="19px"
                height="19px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    opacity="1"
                    d="M14 5H20"
                    stroke="#000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    opacity="1"
                    d="M14 8H17"
                    stroke="#000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                    stroke="#000"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    opacity="1"
                    d="M22 22L20 20"
                    stroke="#000"
                    stroke-width="3.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </button>
          </form>
        </div>

        <div className="row">
          {articles.map((article, index) => (
            <div className="col" key={index}>
              <div className="card">
                <img className="image" src={article.image} />
                <div className="content">
                  <span className="title">{article.title}</span>

                  <p className="desc">{article.description}</p>

                  <a href={article.url} className="action">
                    Find out more
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
