import React from "react";
import API from "../API";
import LinkStore from "../stores/LinkStore";

let _getAppState = () => {
  return { links: LinkStore.getAll() };
};

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = _getAppState(); // nothing at this point
    //this.state = { links: [] };
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState(_getAppState);
  }

  componentDidMount() {
    API.fetchLinks();
    LinkStore.on("change", this.onChange);
  }

  componentWillUnmount() {
    LinkStore.removeListener("change", this.onChange());
  }

  render() {
    let content = this.state.links.map(link => {
      return <li key={link._id}> <a href={link.url}> {link.title}</a> </li>;
    });
    return (
      <div>
        <h3>Hello Seb React</h3>
        <ul>
          {content}
        </ul>
      </div>
    );
  }
}

export default Main;