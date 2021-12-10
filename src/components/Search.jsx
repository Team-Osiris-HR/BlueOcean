import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
  }

  render() {
    return (
      <div>
        <input
          className="search"
          type="text"
          onChange={this.handleSearchInputChange}
          placeholder="Search Donations">
        </input>
      </div>
    )
  }
}

export default Search