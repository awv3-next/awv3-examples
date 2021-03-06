import React from 'react';
import * as THREE from 'three';
import { View as ViewImpl } from 'awv3';

export default class View extends React.PureComponent {
    static propTypes = { up: React.PropTypes.array, stats: React.PropTypes.bool };
    static defaultProps = { up: [0, 0, 1], stats: false };
    static contextTypes = { canvas: React.PropTypes.object };
    getInterface() {
        return this.interface;
    }
    componentDidMount() {
        this.interface = new ViewImpl(this.context.canvas, {
            dom: this.refs.view,
            up: new THREE.Vector3().fromArray(this.props.up),
            ambientIntensity: 1.0,
            stats: this.props.stats
        });
    }
    componentWillUnmount() {
        if (this.interface) {
            this.interface.destroy();
            delete this.interface;
        }
    }
    render() {
        return (
            <div
                ref="view"
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    overflow: 'hidden',
                    ...this.props.style
                }}>
                {this.props.children}
            </div>
        );
    }
}
