import React, { Component } from 'react'

export default class AddUpdate extends Component {
    render() {
        return (
            <div>
                我是新增或修改组件{this.props.match.params.id}
            </div>
        )
    }
}
