import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            const that = this;
            this.reqInterceptor = axios.interceptors.request.use(req => {
                that.setState({
                    error: null
                });

                return req
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                that.setState({
                    error: error
                });
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            });
        }

        render() {
            return (
                <Aux>
                <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                    <h3>Something went wrong!</h3>
                    <p>{this.state.error ? this.state.error.message : null}</p>
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>
            );
        }
    }
}

export default withErrorHandler;