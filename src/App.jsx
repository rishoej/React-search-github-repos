import React, {Component} from 'react';
import loadAPI from './loadAPI';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      repos: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    loadAPI('https://api.github.com/users/rishoej/repos',((response) => {
      console.log(response);
      this.setState({
        repos: response,
      });
    }))
  }
  handleChange(e) {
    this.setState({
      searchString: e.target.value,
    });
  }
  render() {
    let results = this.state.repos;
    let searchString = this.state.searchString.trim().toLowerCase();

    if (searchString.length > 0) {
      results = results.filter((repo) => {
        return repo.name.toLowerCase().match(searchString);
      });
    }
    return (
      <div>
        <input
          type="text"
          value={this.state.searchString}
          onChange={this.handleChange}
          placeholder="Search here"
        />
        <ul className="demo-list-two mdl-list">
          {results.map((repo) => {
            return (
              <li className="mdl-list__item mdl-list__item--two-line" key={repo.id}>
                <span className="mdl-list__item-primary-content">
                  <span><a href={repo.url}>{repo.name}</a> </span>
                  <span className="mdl-list__item-sub-title">{repo.description}</span>
                </span>
                <span className="mdl-list__item-secondary-content">
                  <span className="mdl-list__item-secondary-info">Owner: {repo.owner.login}</span>
                  <span className="mdl-list__item-secondary-info">Created date: {repo.created_at}</span>
                    <span className="mdl-list__item-secondary-info">Primary language: {repo.language}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
