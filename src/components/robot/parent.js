import React, { Component } from 'react';
import Post from "./Post";

export default class Parent extends Component {
    constructor() {
        super();
        this.pubcount = 0;
        this.state = {
            publishers: []
        }
    }

    delete = (index) => {
        const copyPublishers = Object.assign([], this.state.publishers);
        copyPublishers.splice(index, 1);
        this.setState({
            publishers: copyPublishers
        })
    }

    addPost = () => {
        this.pubcount = this.pubcount + 1;
        const copyPublishers = Object.assign([], this.state.publishers)
        copyPublishers.push({
            id:this.pubcount
        })
        this.setState({
            publishers:copyPublishers
        })
    }

    render() {
        return (
            <div>
                <input type="test" />
                <button onClick={this.addPost}>Add Post</button>
                <ul>
                    {
                        this.state.publishers.map((post, index) => {
                            return (
                                <Post
                                    key={post.id}
                                    id={post.id}
                                    delete={this.delete.bind(this, index)}
                                />
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}