export default (props) => {
    return (
        <div>
            <button onClick={() => props.validateUser('rostig', '1234456')}>Login</button>
        </div>
    )
}