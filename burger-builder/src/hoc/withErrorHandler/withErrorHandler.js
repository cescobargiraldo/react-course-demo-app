import React from 'react';
import useHttpErrorHandler from '../../hooks/http-error-handler'
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios)

        return (
            <Aux>
            <Modal 
                show={error}
                modalClosed={clearError}>
                <h3>Something went wrong!</h3>
                <p>{error ? error.message : null}</p>
            </Modal>
            <WrappedComponent {...props} />
        </Aux>
        )
    }
}

export default withErrorHandler;