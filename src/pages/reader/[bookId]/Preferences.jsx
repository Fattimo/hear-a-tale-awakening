import Preferences from "../../../screens/Preferences"

export async function getServerSideProps(context) {
    let props = {bookId: context.params.bookId}
    return {props}
}

const P = (props) => <Preferences {...props}></Preferences>
export default P
