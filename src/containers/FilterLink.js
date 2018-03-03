import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const {connect} = ReactRedux;

const mapStateToLinkProps = (state,ownProps) => ({
    active:
    ownProps.filter === state.visibilityFilter

});
const mapDispatchToLinkProps = (dispatch, ownProps) => ({
    onClick() {
        dispatch(setVisibilityFilter(ownProps.filter))
    }
});

const FilterLink = connect(
    mapStateToLinkProps, mapDispatchToLinkProps
)(Link);

export default FilterLink