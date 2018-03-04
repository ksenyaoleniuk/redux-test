// import Link from '../components/Link'
// import { setVisibilityFilter} from '../actions/index'
// const {connect} = ReactRedux;
// const mapStateToProps = (state, ownProps) => ({
//     active: ownProps.filter === state.visibilityFilter,
// });
//
// const mapDispatchToProps = (dispatch, ownProps) => ({
//     onClick() {
//         dispatch(setVisibilityFilter(ownProps.filter));
//     },
// });
//
// const FilterLink = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Link);
//
// export default FilterLink;

import React from 'react';
import { NavLink } from 'react-router-dom';

const FilterLink = ({ filter, children }) => (
    <NavLink
        exact
        to={'/' + (filter === 'all' ? '' : filter)}
        activeStyle={{
            textDecoration: 'none',
            color: 'black',
        }}
    >
        {children}
    </NavLink>
);

// FilterLink.propTypes = {
//     filter: PropTypes.oneOf(['all', 'completed', 'active']).isRequired,
//     children: PropTypes.node.isRequired,
// };

export default FilterLink